import { collection } from 'firebase/firestore';

// Collection name, data and document Id can be added from UI Id's
// Since my issue is only to prepare the firebase database for users

// Adding data to firebase
const addData = async (collectionName, data) => {
  try {
    await collection(collectionName).add(data);
    console.log('Data added successfully');
  } catch (error) {
    console.error('Error adding data:', error.message);
  }
};
// Getting data from firebase
const getData = async (collectionName, documentId) => {
  try {
    const document = await collection(collectionName).doc(documentId).get();
    return document.data();
  } catch (error) {
    console.error('Error getting data:', error.message);
  }
};
// Update
const updateData = async (collectionName, documentId, data) => {
  try {
    await collection(collectionName).doc(documentId).update(data);
    console.log('Data updated successfully');
  } catch (error) {
    console.error('Error updating data:', error.message);
  }
};
// Delete
const deleteData = async (collectionName, documentId) => {
  try {
    await collection(collectionName).doc(documentId).delete();
    console.log('Data deleted successfully');
  } catch (error) {
    console.error('Error deleting data:', error.message);
  }
};

export { addData, getData, updateData, deleteData };