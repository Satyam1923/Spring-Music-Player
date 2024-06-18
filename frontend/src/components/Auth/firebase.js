// Import the functions you need from the SDKs you need
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
// };

const firebaseConfig = {
  apiKey: "AIzaSyBNZA0qNQvFqIBldfpTZZ-S3Kskqs9Ek7o",
  authDomain: "test-440db.firebaseapp.com",
  projectId: "test-440db",
  storageBucket: "test-440db.appspot.com",
  messagingSenderId: "73436872823",
  appId: "1:73436872823:web:d43271ee2e97391cc84672"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;