import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; 

  if (!id) {
    return Response.json({ error: "Missing album id" }, { status: 400 });
  }

  const baseUrl = process.env.JIO_SAAVAN_API_BASE_URL;
  if (!baseUrl) {
    return Response.json({ error: "API base URL not configured" }, { status: 500 });
  }

  const apiUrl = `${baseUrl}/albums?id=${encodeURIComponent(id)}`;

  try {
    const response = await axios.get(apiUrl);
    return Response.json(response.data);
  } catch (error) {
    console.error("Error fetching from external API:", error);
    return Response.json({ error: "Failed to fetch from external API" }, { status: 500 });
  }
}
