import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("song");

  if (!query) {
    return Response.json(
      { error: "Missing 'query' parameter" },
      { status: 400 }
    );
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
      const apiUrl = `${baseUrl}/search/songs?query=${encodeURIComponent(
        query
      )}&page=${page}&limit=${limitPerPage}`;
      const response = await axios.get(apiUrl);
      const songs = response.data?.data?.results || [];
      allSongs = allSongs.concat(songs);
      if (songs.length < limitPerPage) break;
    }

    const uniqueSongsMap = new Map<string, any>();
    for (const song of allSongs) {
      if (song.id && !uniqueSongsMap.has(song.id)) {
        uniqueSongsMap.set(song.id, song);
      }
    }
    const uniqueSongs = Array.from(uniqueSongsMap.values()).slice(
      0,
      totalSongsToFetch
    );

    return Response.json({ songs: uniqueSongs });
  } catch (error: any) {
    console.error(
      "Error searching songs:",
      error?.response?.data || error.message
    );
    return Response.json(
      { error: "Failed to search songs" },
      { status: error?.response?.status || 500 }
    );
  }
}
