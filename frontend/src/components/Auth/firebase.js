import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   databaseURL: import.meta.env.VITE_DATABASE_URL, 
// };


const firebaseConfig = {
  apiKey: "AIzaSyBNZqJmtwAqYuE0zrtdSMdgcoXZSoRdMew",
  authDomain: "opensource-2faad.firebaseapp.com",
  projectId: "opensource-2faad",
  storageBucket: "opensource-2faad.appspot.com",
  messagingSenderId: "1060453831050",
  appId: "1:1060453831050:web:4e94554bd4ec6e9f37f873",
  measurementId: "G-QL0FTXFWEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

