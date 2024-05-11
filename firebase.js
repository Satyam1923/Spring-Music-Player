import * as firebase from 'firebase/app';
import 'firebase/installations';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.Database_URL,
  projectId: process.env.Project_Id,
  storageBucket: process.env.Storage_Bucket,
  messagingSenderId: process.env.Messaging_SenderId,
  appId: process.env.App_Id,

};

const FirebaseApp= initializeApp(firebaseConfig);
const analytics = getAnalytics(FirebaseApp);
const auth = getAuth(FirebaseApp)
const firestore= getFirestore(FirebaseApp);
const storage = getStorage(FirebaseApp);


export { auth, firestore, storage, analytics };

export default FirebaseApp;
