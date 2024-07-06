// StoreSong.js
import { collection, addDoc, setDoc, doc, writeBatch, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";
import { useState } from "react";

async function storeSong(song) {
  try {
    let songId;
    if (song.id) {
      const songRef = doc(db, "songs", song.id);
      await setDoc(songRef, song);
      songId = song.id;
    } else {
      const docRef = await addDoc(collection(db, "songs"), song);
      songId = docRef.id;
    }

    let userData = localStorage.getItem('user'); 
    
    const user = JSON.parse(userData);

    console.log("user found", user)
    if (user) {
      console.log("inside ")

      const userRef = doc(db, "Users", user.uid);
      await updateDoc(userRef, {
        songIds: arrayUnion(songId)
      });
      console.log("Song added with ID: ", songId);
    } else {
      console.log("User details not available, cannot update song IDs");
    }
  } catch (e) {
    console.error("Error adding song: ", e);
  }
}

async function storeAlbum(album) {
  try {
    const batch = writeBatch(db);
    album.forEach(song => {
      const songRef = song.id ? doc(db, "songs", song.id) : doc(collection(db, "songs"));
      batch.set(songRef, song);
    });
    await batch.commit();
    console.log("Album songs added");
  } catch (e) {
    console.error("Error adding album songs: ", e);
  }
}


async function LikesSong(song) {
  try {
    const docRef = await addDoc(collection(db, 'liked-songs'), {
      name: song.name || "Song Name",
      artist: song.artist || "Artist Name",
      img: song.img || "https://example.com/default-image.jpg",
      url: song.url || ""
    });

    console.log('Song added to liked-songs with ID: ', docRef.id);
    return docRef.id; // Optionally return the document ID if needed
  } catch (error) {
    console.error("Error adding song to liked-songs: ", error);
    throw new Error("Failed to add song to liked-songs. Please try again later.");
  }
}
export { storeSong, storeAlbum ,LikesSong};
