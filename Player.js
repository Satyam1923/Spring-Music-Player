// Player.js
import React, { useState } from 'react';

const Player = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const renderPlayer = () => {
    if (!data || !data.length) {
      return <div className="player">No data available</div>;
    }

    const currentTrack = data[0];

    return (
      <div className="player">
        <div className="imgBx">
          <img src={currentTrack.img} height="250px" width="250px" alt="Album cover" />
        </div>

        <ul className="details">
          <li className="name">{currentTrack.name}</li>
          <li className="author">{currentTrack.artist} - {currentTrack.year}</li>
        </ul>

        <div className="controls">
          <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
          {/* Add more controls like seek, next, previous, etc. */}
        </div>
      </div>
    );
  };

  return renderPlayer();
};

export default Player;
