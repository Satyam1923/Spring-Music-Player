import axios from "axios";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const album = req.query.query;
  console.log("Album name is: " + album);
  const apiUrl = `https://jio-savaan-new.vercel.app/api/search/albums?query=${encodeURIComponent(
    album
  )}`;
  try {
    const response = await axios.get(apiUrl);
    if (response.status !== 200) {
      throw new Error("Failed to fetch data from the external API");
    } else {
      const albumsArray = response.data.data.results.map((result) => ({
        id: result.id || "",
        name: result.name || "",
        year: result.year || "",
        type: result.type || "",
        playCount: result.playCount || "",
        language: result.language || "",
        primaryArtists: result.artists.primary.map((artist) => ({
          id: artist.id || "",
          name: artist.name || "",
          url: artist.url || "",
        })),
        images: result.image.map((image) => ({
          quality: image.quality || "",
          url: image.url || "",
        })),
      }));
      res.status(200).json(albumsArray);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
