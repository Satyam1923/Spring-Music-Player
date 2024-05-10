import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { registerUser, signInUser } from './public/js/firebase';    //Firebse Added
import { registerUser, signInUser, signOutUser } from './public/js/auth'; //imported auth
import { addData, getData, updateData, deleteData } from './public/js/database';  //imported database

const { database, auth } = require('./public/js/firebase');
const firebase = require('firebase/app');  //firebase intitialized

const cache = new Map();

const app = express();
const port = 3030;

// Here we have to add email and password in UI and give them Id then it will run

let name = "";
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
        res.render("index.ejs", { data: musicArray});
      } else {
        res.render("index.ejs", { data: null });
      }
    }
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "Error fetching song. Please try again later.",
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

// So Firebase Authentication and Error Handling here->

// Handle user registration
const registerUser = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Add user data to the database
      database.ref('users').push({
        email: user.email,
        createdAt: user.metadata.creationTime
      });

      console.log('User registered successfully');
    })
    .catch((error) => {
      console.error('Error registering user:', error.message);
    });
};

// Handle user sign-in
const signInUser = (email, password) => {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      console.log('User signed in successfully');
    })
    .catch((error) => {
      console.error('Error signing in user:', error.message);
    });
};

// Handle user sign-out
const signOutUser = () => {
  auth.signOut()
    .then(() => {
      console.log('User signed out successfully');
    })
    .catch((error) => {
      console.error('Error signing out user:', error.message);
    });
};

// Add data to the database
const addData = (path, data) => {
  database.ref(path).push(data);
};

// Get data from the database
const getData = (path) => {
  return database.ref(path).once('value');
};

// Update data in the database
const updateData = (path, data) => {
  database.ref(path).update(data);
};

// Delete data from the database
const deleteData = (path) => {
  database.ref(path).remove();
};


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


