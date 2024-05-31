import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import fetch from 'node-fetch';

import cors from "cors";


const cache = new Map();

const app = express();
const PORT = 3030;


app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to the music search API");
});



app.get('/search', async (req, res) => {
    try {
        const { song } = req.query;
        const language = req.query.language;
        console.log("Name is", song);
        // console.log("Language is", language);

        const apiUrl = `https://jio-savaan-private.vercel.app/api/search/songs?query=${encodeURIComponent(song)}`;
        console.log(apiUrl);


        //correct till here,now manipulate data and send it:
        try {

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('Failed to fetch data from the external API');
            }

            const data = await response.json();

            if (
                response && response.data && response.data.data &&
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
                    language: result.language || ""
                }));
                // cache.set(song, musicArray);
                const filteredMusic = language === "all" ? musicArray : musicArray.filter(m => m.language === language);
                res.json(filteredMusic);
            } else {
                console.log("response.data.data");
                console.log(response);
                res.json([]);
            }

        } catch (error) {
            console.log("gjdjss error");
            console.log(error);
            res.json([]);
        }


        // res.json(data);
    } catch (error) {
        // Handle errors
        console.error('Error occurred while processing the request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});                                                                                                                                                 