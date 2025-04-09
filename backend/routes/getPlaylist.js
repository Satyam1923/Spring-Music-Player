import axios from "axios";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const playlist = req.query.query;
  const apiUrl = `https://jio-savaan-new.vercel.app/api/search/playlists?query=${encodeURIComponent(
    playlist
  )}`;
  try {
    const respone = await axios.get(apiUrl);
    if (respone.status != 200) {
      throw new Error("Failed to fetch data from the external API");
    } else {
      res.status(200).json(respone.data);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
