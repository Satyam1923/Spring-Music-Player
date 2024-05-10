// App.js

import React, { useState, useEffect } from 'react';
import Player from './Player';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';

const App = () => {
  const [data, setData] = useState(null);
  const [audio] = useState(new Audio());
  const [globalData, setGlobalData] = useState(null);
  const [currplaying, setCurrplaying] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/search1");
      const data = await response.json();
      setGlobalData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const togglePlayPause = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const updateProgress = () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    // Update seek slider value and current time display
  };

  const seek = (e) => {
    const seekTime = (audio.duration / 100) * e.target.value;
    audio.currentTime = seekTime;
  };

  const seekForward = () => {
    audio.currentTime += 10;
  };

  const seekBackward = () => {
    audio.currentTime -= 10;
  };

  const nextPlay = () => {
    setCurrplaying(currplaying + 1 >= globalData.length ? 0 : currplaying + 1);
    const selectedMusic = globalData[currplaying];
    updateAudio(selectedMusic);
  };

  const previousPlay = () => {
    setCurrplaying(currplaying - 1 < 0 ? globalData.length - 1 : currplaying - 1);
    const selectedMusic = globalData[currplaying];
    updateAudio(selectedMusic);
  };

  const updateAudio = (selectedMusic) => {
    audio.src = selectedMusic.url;
    audio.play();
    // Update other elements like image, name, author, etc.
  };

  // Add event listeners and other necessary setup
  useEffect(() => {
    audio.addEventListener("timeupdate", updateProgress);
    // Add other event listeners
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      // Remove other event listeners
    };
  }, [audio]);

  return (
    <div className="ui">
      <Player 
        audio={audio} 
        globalData={globalData} 
        currplaying={currplaying} 
        updateAudio={updateAudio} 
        togglePlayPause={togglePlayPause} 
        seekForward={seekForward} 
        seekBackward={seekBackward} 
        nextPlay={nextPlay} 
        previousPlay={previousPlay} 
        updateProgress={updateProgress} 
        seek={seek} 
      />
      <SearchBox fetchData={fetchData} />
      <SearchResults data={data} />
    </div>
  );
};

export default App;
