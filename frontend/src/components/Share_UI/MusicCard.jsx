import React from "react";
import "./Style.css";
import { Pause, Play } from "phosphor-react";

const MusicCard = ({ song, isPlaying, handlePlay }) => {
  return (
    <div className="music-card">
      <img src={song?.img} alt="name" />
      <div className="song-details">
        <div className="text">
          <p>
            {song?.name.length > 20
              ? song.name.substring(0, 20) + "..."
              : song.name}
          </p>
          <span>
            {song.artist.length > 20
              ? song.artist.substring(0, 20) + "..."
              : song.artist}
          </span>
        </div>
        <button onClick={handlePlay}>
          {isPlaying ? <Pause className="i" /> : <Play className="i" />}
        </button>
      </div>
    </div>
  );
};

export default MusicCard;
