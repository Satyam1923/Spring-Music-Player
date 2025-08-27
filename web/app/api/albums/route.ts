import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("album");
    if (!query) {
        return Response.json({ error: "Missing 'song' query parameter" }, { status: 400 });
      }
    
      const baseUrl = process.env.JIO_SAAVAN_API_BASE_URL;
    
      if (!baseUrl) {
        return Response.json({ error: "API base URL not configured" }, { status: 500 });
      }
    
      const apiUrl = `${baseUrl}/search/albums?query=${encodeURIComponent(query)}&limit=60`;
    
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        return Response.json(data);
      } catch (error) {
        console.error("Error fetching from external API:", error);
        return Response.json({ error: "Failed to fetch from external API" }, { status: 500 });
      }
}