import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import search from "./routes/search.js";
import getAlbum from "./routes/getAlbums.js";
import getAlbumById from "./routes/getAlbumById.js";
import getPlaylist from "./routes/getPlaylist.js";
import getPlaylistById from "./routes/getPlaylistById.js";
import getArtists from "./routes/getArtists.js";
import getArtistsById from "./routes/getArtistById.js";
// import schedulerRouter from './routes/schedulerRouter.js';
import cron from "node-cron";
import axios from "axios";
import admin from "firebase-admin"


const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const db = admin.firestore();




const app = express();
const PORT = 3030;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the music search API");
});

//search songs
app.use("/search", search);

//get albums
app.use("/search/albums", getAlbum);

//get album by id
app.use("/search/album", getAlbumById);

//get playlists
app.use("/search/playlists", getPlaylist);

//get playlist by id
app.use("/search/playlist", getPlaylistById);

//get artists
app.use("/search/artists", getArtists);

//get artist by id
app.use("/search/artist", getArtistsById);

//Use the scheduler router
app.get('/scheduler', (req, res) => {
  schedulerRouter.get('/start', () => {}); 
  res.send('Cron job started manually.');
});


app.get('/putData', async (req, res) => {
  try {
    const response = await axios.get('https://billboard-api2.p.rapidapi.com/artist-100', {
      headers: {
        'x-rapidapi-key': '8d51528d8emsh4c55c96fb71ae0fp1c6811jsnf5e56f9801fe',
        'x-rapidapi-host': 'billboard-api2.p.rapidapi.com'
      },
      params: {
        'date': '2024-06-15',
        'range': '1-10'
      }
    });

    const { content } = response.data;
    const batch = db.batch();
    Object.entries(content).forEach(([rank, artistData]) => {
      const docRef = db.collection('topArtists').doc(rank);
      batch.set(docRef, artistData);
    });

    await batch.commit();
    console.log('Data fetched and stored');
    res.status(200).json({ message: "Data is sent successfully" });
  } catch (error) {
    console.error('Error in fetching data', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
