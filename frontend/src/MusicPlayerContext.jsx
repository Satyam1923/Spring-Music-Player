// MusicPlayerContext.js
import React, { createContext, useState, useContext } from "react";

const MusicPlayerContext = createContext();

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export const MusicPlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState([]);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  return (
    <MusicPlayerContext.Provider value={{ currentSong, setCurrentSong, shouldAutoPlay, setShouldAutoPlay }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};
