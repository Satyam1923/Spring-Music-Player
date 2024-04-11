import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const cache = new Map();

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs", { data: null });
});

app.get("/search", async (req, res) => {
    try {
        const name = req.query.song;
        if (cache.has(name)) {
            console.log("Fetching from cache...");
            const music = cache.get(name);
            res.render("index.ejs", { data: music });
        } else {
            const response = await axios.get(
                `http://jiosaavn-olj6ym1v4-thesumitkolhe.vercel.app/api/search/songs?query=${name}`
            );
            if (response.data.data.results && response.data.data.results.length > 0) {
                const music = {
                    url: response.data.data.results[0].downloadUrl[4].url,
                    name: response.data.data.results[0].name,
                    year: response.data.data.results[0].year,
                    artist: response.data.data.results[0].artists.primary[0].name,
                    img: response.data.data.results[0].image[2].url,
                };
                cache.set(name, music);
                res.render("index.ejs", { data: music });
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

