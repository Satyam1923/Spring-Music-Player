// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyCMIbOoUlPpVNZPLkWOxv9c4ViC7yJ782c",

  authDomain: "spring-music-player-2f810.firebaseapp.com",

  databaseURL: "https://spring-music-player-2f810-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "spring-music-player-2f810",

  storageBucket: "spring-music-player-2f810.appspot.com",

  messagingSenderId: "1010732987805",

  appId: "1:1010732987805:web:5c2b2576972483ee102b74",

  measurementId: "G-FE4NT1YPRP"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;