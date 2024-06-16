import cron from "node-cron";
import axios from "axios";
import admin from "firebase-admin"
import serviceAccount from "../spring-music-player-2f810-firebase-adminsdk-qrwgq-25bf782565.json" assert{type:'json'};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const db = admin.firestore();

cron.schedule('50 0 * * 1',async()=>{
    try{
      // const today = new Date();
      // const daysUntilSaturday = 6 - today.getDay(); 
      // const nextSaturday = new Date(today.getTime() + daysUntilSaturday * 24 * 60 * 60 * 1000);
      // const formattedDate = `${nextSaturday.getFullYear()}-${(nextSaturday.getMonth() + 1)
        // .toString()
        // .padStart(2, '0')}-${nextSaturday.getDate().toString().padStart(2, '0')}`;
      const response = await axios.get('https://billboard-api2.p.rapidapi.com/artist-100?date=2024-06-15&range=1-10',{
        headers:{
         'x-rapidapi-key':'8d51528d8emsh4c55c96fb71ae0fp1c6811jsnf5e56f9801fe',
         'x-rapidapi-host':'billboard-api2.p.rapidapi.com'
        },
        params:{
          'date':'2024-06-15',
          'range':'1-10'
        }
      })
      const {content} = response.data;
      const batch = db.batch();
      Object.entries(content).forEach(([rank, artistData]) => {
        const docRef = db.collection('topArtists').doc(rank);
        batch.set(docRef, artistData);
      });
      await batch.commit();
      console.log('Data fetched and stored');
    }
    catch(error){
      console.error('Error in fetching in data',error);
    }
  })

  export default cron;