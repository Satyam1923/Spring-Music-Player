import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "Missing playlist id" }, { status: 400 });
  }

  const baseUrl = process.env.JIO_SAAVAN_API_BASE_URL;
  if (!baseUrl) {
    return Response.json({ error: "API base URL not configured" }, { status: 500 });
  }

  try {
    const limit = 10; // API allows max per page (you can adjust if higher allowed)
    const totalSongsToFetch = 50;
    const pagesNeeded = Math.ceil(totalSongsToFetch / limit);

    let allSongs: any[] = [];

    for (let page = 0; page < pagesNeeded; page++) {
      const apiUrl = `${baseUrl}/playlists?id=${encodeURIComponent(
        id
      )}&page=${page}&limit=${limit}`;

      const response = await axios.get(apiUrl);

      if (response.data?.data?.songs) {
        allSongs = allSongs.concat(response.data.data.songs);
      }
 
      if (
        !response.data?.data?.songs ||
        response.data.data.songs.length < limit
      ) {
        break;
      }
    }

    return Response.json({ songs: allSongs });
  } catch (error: any) {
    console.error(
      "Error fetching playlist songs:",
      error?.response?.data || error.message
    );
    return Response.json(
      { error: "Failed to fetch playlist songs" },
      { status: error?.response?.status || 500 }
    );
  }
}
