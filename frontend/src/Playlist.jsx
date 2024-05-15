import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase config here
  apiKey: "",
  authDomain: "spring-music-player-e7c5e.firebaseapp.com",
  projectId: "",
  storageBucket: ".appspot.com",
  messagingSenderId: "",
  appId: ":web:",
  measurementId: ""
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const PlaylistCreator = ({ currentUser }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [songs, setSongs] = useState([]);

  const handleAddSong = (song) => {
    setSongs([...songs, song]);
  };

  const handleSavePlaylist = () => {
    db.collection('playlists').add({
      userId: currentUser.uid,
      playlistName,
      songs,
    })
    .then(() => {
      console.log('Playlist saved successfully!');
      setPlaylistName('');
      setSongs([]);
    })
    .catch((error) => {
      console.error('Error saving playlist: ', error);
    });
  };

  return (
    <div>
      <h2>Create Playlist</h2>
      <input
        type="text"
        placeholder="Playlist Name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <button onClick={handleSavePlaylist}>Save Playlist</button>
      {/* Component to add songs to playlist */}
    </div>
  );
};

const PlaylistViewer = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('playlists').onSnapshot((snapshot) => {
      const updatedPlaylists = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlaylists(updatedPlaylists);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Other People's Playlists</h2>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            {playlist.playlistName} - {playlist.userId}
            {/* Display playlist songs here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {currentUser ? (
        <div>
          <h1>Welcome, {currentUser.displayName}!</h1>
          <PlaylistCreator currentUser={currentUser} />
          <PlaylistViewer />
        </div>
      ) : (
        <h1>Please sign in to use the app</h1>
      )}
    </div>
  );
};

export default App;
