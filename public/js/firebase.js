import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
        apiKey: "AIzaSyBo-E55_DKsy3aWVfJ-at1ii3xIushJhyU",
        authDomain: "spring-be933.firebaseapp.com",
        databaseURL: "https://Spring.<region>.firebasedatabase.app",
        projectId: "spring-be933",
        storageBucket: "https://console.firebase.google.com/project/spring-be933/storage/spring-be933.appspot.com/files",
        messagingSenderId: "388003796059",
        appId: "1:388003796059:web:38ede641ecd1f98f7cdb7e"

};

firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();