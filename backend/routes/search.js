import express from "express";
import axios from "axios";

import { checkUndefinedFields } from "../utils.js";

const router = express.Router();

const cache = {};

router.get("/", async (req, res) => {
  try {
    const { song } = req.query;
    console.log("Name is", song);
    if (cache[song]) {
      console.log("Returning cached data");
      return res.json(cache[song]);
    }
    const apiUrl = `https://jio-savaan-new.vercel.app/api/search/songs?query=${encodeURIComponent(
      song
    )}&limit=30`;
    console.log(apiUrl);
    try {
      const response = await axios.get(apiUrl);
      if (response.status !== 200) {
        throw new Error("Failed to fetch data from the external API");
      }
      const data = response.data;
      if (
        data &&
        data.data &&
        data.data.results &&
        data.data.results.length > 0
      ) {
        const musicArray = data.data.results.map((result) =>
          checkUndefinedFields(result)
        );
        cache[song] = musicArray;
        res.json(musicArray);
      } else {
        console.log("No data found");
        console.log(data);
        res.json([]);
      }
    } catch (error) {
      console.log("Error occurred while fetching data:");
      console.log(error);
      res.status(404).json([]);
    }
  } catch (error) {
    console.error("Error occurred while processing the request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
