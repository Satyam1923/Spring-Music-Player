import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3030;
const cache = {};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to the music search API");
});

function checkUndefinedFields(result) {
    return {
        url: result.downloadUrl[4]?.url || "",
        name: result.name || "",
        year: result.year || "",
        album: result.album || " ",
        artist: result.artists.primary[0]?.name.replace(/&amp;/g, "&") || "",
        img: result.image[2]?.url || "",
        language: result.language || " ",
        duration: result.duration || " "
    };
}

app.get('/search', async (req, res) => {
    try {
        const { song } = req.query;
        console.log("Name is", song);
        if (cache[song]) {
            console.log("Returning cached data");
            return res.json(cache[song]);
        }
        const apiUrl = `https://jio-savaan-private.vercel.app/api/search/songs?query=${encodeURIComponent(song)}`;
        console.log(apiUrl);
        try {
            const response = await axios.get(apiUrl);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data from the external API');
            }
            const data = response.data;
            if (
                data &&
                data.data &&
                data.data.results &&
                data.data.results.length > 0
            ) {
                const musicArray = data.data.results.map(result => checkUndefinedFields(result));
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
        console.error('Error occurred while processing the request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
