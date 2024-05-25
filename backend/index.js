import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

import cors from "cors"  ; 


const cache = new Map();

const app = express();
const PORT = 3030;
let name = "";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to the music search API");
});

app.get("/search", async (req, res) => {
    name = req.query.song;
    console.log("Name is", name);
    try {
        if (cache.has(name)) {
            console.log("Fetching from cache...");
            const music = cache.get(name);
            res.json(music);
        } else {
            const response = await axios.get(
                `https://jio-savaan-private.vercel.app/api/search/songs?query=${name}`
            );
            if (
                response.data.data.results &&
                response.data.data.results.length > 0
            ) {
                const musicArray = response.data.data.results.map((result) => ({
                    url: result.downloadUrl[4]?.url || "",
                    name: result.name || "",
                    year: result.year || "",
                    artist:
                        result.artists.primary[0]?.name.replace(
                            /&amp;/g,
                            "&"
                        ) || "",
                    img: result.image[2]?.url || "",
                }));
                cache.set(name, musicArray);
                res.json(musicArray);
            } else {
                res.json([]);
            }
        }
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.status(500).json({
            error: "Error fetching song. Please try again later.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
