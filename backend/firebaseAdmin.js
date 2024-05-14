// backend/firebaseAdmin.js
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://spring-music-player-default-rtdb.firebaseio.com"
  });

export default admin;
