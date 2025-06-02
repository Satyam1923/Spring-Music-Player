import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMIbOoUlPpVNZPLkWOxv9c4ViC7yJ782c",
  authDomain: "spring-music-player-2f810.firebaseapp.com",
  databaseURL: "https://spring-music-player-2f810-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "spring-music-player-2f810",
  storageBucket: "spring-music-player-2f810.firebasestorage.app",
  messagingSenderId: "1010732987805",
  appId: "1:1010732987805:web:74dfaec68f9cc2dc102b74",
  measurementId: "G-47GWS81QYV"
};


if (
  !firebaseConfig.apiKey ||
  !firebaseConfig.authDomain ||
  !firebaseConfig.projectId ||
  !firebaseConfig.storageBucket ||
  !firebaseConfig.messagingSenderId ||
  !firebaseConfig.appId
) {
  throw new Error("Missing Firebase configuration environment variables.");
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
