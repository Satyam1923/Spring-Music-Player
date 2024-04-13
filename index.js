import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";

const cache = new Map();

const app = express();
const port = 3000;
let name = "";
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs", { data: null });
});

app.get("/search", async (req, res) => {
  name = req.query.song;
  try {
    if (cache.has(name)) {
      console.log("Fetching from cache...");
      const music = cache.get(name);
      res.render("index.ejs", { data: music });
    } else {
      const response = await axios.get(
        `http://jiosaavn-olj6ym1v4-thesumitkolhe.vercel.app/api/search/songs?query=${name}`
      );
      if (response.data.data.results && response.data.data.results.length > 0) {
        const musicArray = response.data.data.results
          .map((result) => ({
            url: result.downloadUrl[4].url,
            name: result.name,
            year: result.year,
            artist: result.artists.primary[0].name,
            img: result.image[2].url,
          }));
        cache.set(name, musicArray);
        res.render("index.ejs", { data: musicArray });
      } else {
        res.render("index.ejs", { data: null });
      }
    }
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "Error fetching song. Please try again later.",
      data: null,
    });
  }
});

app.get("/search1", async (req, res) => {
  console.log(name);
  try {
    if (cache.has(name)) {
      console.log("Fetching from cache...");
      const music = cache.get(name);
      res.send(music);
    } else {
      const response = await axios.get(
        `http://jiosaavn-olj6ym1v4-thesumitkolhe.vercel.app/api/search/songs?query=${name}`
      );
      if (response.data.data.results && response.data.data.results.length > 0) {
        const musicArray = response.data.data.results
          .slice(0, 5)
          .map((result) => ({
            url: result.downloadUrl[4].url,
            name: result.name,
            year: result.year,
            artist: result.artists.primary[0].name,
            img: result.image[2].url,
          }));
        cache.set(name, musicArray);
        res.send(musicArray)
      } else {
        res.send(null);
      }
    }
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "Error fetching song. Please try again later.",
      data: null,
    });
  }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

