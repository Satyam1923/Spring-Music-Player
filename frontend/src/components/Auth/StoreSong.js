// StoreSong.js
import { collection, addDoc, setDoc, doc, writeBatch } from "firebase/firestore";
import { db } from "./firebase";

async function storeSong(song) {
  try {
    if (song.id) {
      const songRef = doc(db, "songs", song.id);
      await setDoc(songRef, song);
      console.log("Song added with ID: ", song.id);
    } else {
      const docRef = await addDoc(collection(db, "songs"), song);
      console.log("Song added with ID: ", docRef.id);
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

export { storeSong, storeAlbum };
