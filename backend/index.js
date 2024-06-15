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

//search songs
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



//get albums
app.get('/search/albums', async (req, res) => {
    const album = req.query.query; 
    console.log("Album name is: " + album);
    const apiUrl = `https://saavn.dev/api/search/albums?query=${encodeURIComponent(album)}`;
    try {
        const response = await axios.get(apiUrl);
        if (response.status !== 200) {
            throw new Error('Failed to fetch data from the external API');
        } else {
            const albumsArray = response.data.data.results.map(result => ({
                id: result.id||'',
                name: result.name||'',
                year: result.year||'',
                type: result.type||'',
                playCount: result.playCount||'',
                language: result.language||'',
                primaryArtists: result.artists.primary.map(artist => ({
                    id: artist.id||'',
                    name: artist.name||'',
                    url: artist.url||'',
                })),
                images: result.image.map(image => ({
                    quality: image.quality||'',
                    url: image.url||'',
                })),
            }));
            res.status(200).json(albumsArray);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


//get album by id
app.get('/search/album',async(req,res)=>{
    const id= req.query.id;
    console.log("Song id is "+id);
    const apiUrl = `https://saavn.dev/api/albums?id=${encodeURIComponent(id)}`;
    try{
        const respone = await axios.get(apiUrl);
        if (respone.status!=200){
            throw new Error('Failed to fetch data from the external API');
        }
        else{
            res.status(200).json(respone.data);
        }
    }catch(error){
        res.status(500).json({error:'Internal server error'});
    }
})


//get playlists
app.get('/search/playlists',async(req,res)=>{
    const playlist = req.query.query;
    const apiUrl = `https://saavn.dev/api/search/playlists?query=${encodeURIComponent(playlist)}`;
    try{
        const respone = await axios.get(apiUrl);
        if (respone.status!=200){
            throw new Error('Failed to fetch data from the external API');
        }
        else{
            res.status(200).json(respone.data);
        }
    } catch(error){
        res.status(500).json({error:'Internal server error'});
    }
})

//get playlist by id

app.get('/search/playlist',async(req,res)=>{
    const id = req.query.id;
    const apiUrl = `https://saavn.dev/api/playlists?id=${encodeURIComponent(id)}`;
    try{
        const respone = await axios.get(apiUrl);
        if (respone.status!=200){
            throw new Error('Failed to fetch data from the external API');
        }
        else{
            res.status(200).json(respone.data);
        }
    } catch(error){
        res.status(500).json({error:'Internal server error'});
    }
})

//get artists
app.get('/search/artists',async(req,res)=>{
    const artist = req.query.query;
    const apiUrl = `https://saavn.dev/api/search/artists?query=${encodeURIComponent(artist)}`;
    try{
        const respone = await axios.get(apiUrl);
        if (respone.status!=200){
            throw new Error('Failed to fetch data from the external API');
        }
        else{
            res.status(200).json(respone.data);
        }
    } catch(error){
        res.status(500).json({error:'Internal server error'});
    }
})


//get artist by id
app.get('/search/artist',async(req,res)=>{
    const id = req.query.id;
    const apiUrl = `https://saavn.dev/api/artists/${encodeURIComponent(id)}`;
    try{
        const respone = await axios.get(apiUrl);
        if (respone.status!=200){
            throw new Error('Failed to fetch data from the external API');
        }
        else{
            res.status(200).json(respone.data);
        }
    } catch(error){
        res.status(500).json({error:'Internal server error'});
    }
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
