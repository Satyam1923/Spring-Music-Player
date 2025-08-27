import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "Missing artist id" }, { status: 400 });
  }

  const baseUrl = process.env.JIO_SAAVAN_API_BASE_URL;
  if (!baseUrl) {
    return Response.json(
      { error: "API base URL not configured" },
      { status: 500 }
    );
  }

  try {
    const limitPerPage = 10;        
    const totalSongsToFetch = 50;    
    const pagesNeeded = Math.ceil(totalSongsToFetch / limitPerPage);

    let allSongs: any[] = [];

    for (let page = 0; page < pagesNeeded; page++) {
      const apiUrl = `${baseUrl}/artists/${encodeURIComponent(
        id
      )}/songs?page=${page}&sortBy=popularity&sortOrder=desc`;
      const response = await axios.get(apiUrl);

      if (response.data?.data?.songs) {
        allSongs = allSongs.concat(response.data.data.songs);
      }
      if (
        !response.data?.data?.songs ||
        response.data.data.songs.length < limitPerPage
      ) {
        break;
      }
    }

    return Response.json({ songs: allSongs });
  } catch (error: any) {
    console.error(
      "Error fetching artist songs:",
      error?.response?.data || error.message
    );
    return Response.json(
      { error: "Failed to fetch artist songs" },
      { status: error?.response?.status || 500 }
    );
  }
}
