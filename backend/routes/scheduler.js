import axios from "axios";
import admin from "firebase-admin";
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function fetchDataAndStore() {
  try {
    const response = await axios.get('https://billboard-api2.p.rapidapi.com/artist-100', {
      headers: {
        'x-rapidapi-key': '8d51528d8emsh4c55c96fb71ae0fp1c6811jsnf5e56f9801fe',
        'x-rapidapi-host': 'billboard-api2.p.rapidapi.com'
      },
      params: {
        'date': '2024-06-15',
        'range': '1-10'
      }
    });

    const { content } = response.data;
    const batch = db.batch();
    Object.entries(content).forEach(([rank, artistData]) => {
      const docRef = db.collection('topArtists').doc(rank);
      batch.set(docRef, artistData);
    });

    await batch.commit();
    console.log('Data fetched and stored');
  } catch (error) {
    console.error('Error in fetching data', error);
  }
}


export { fetchDataAndStore };
