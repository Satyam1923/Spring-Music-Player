import React from 'react';

const TrackItem = ({ track }) => {
   return (
      <div className="track-item">
         <div className="track-number">{track.number}</div>
         <div className="track-image"></div>
         <div className="track-info">
            <div className="track-title">{track.title}</div>
            <div className="track-artist">{track.artist}</div>
         </div>
         <div className="track-duration">{track.duration}</div>
         <button className="play-button">▶</button>
      </div>
   );
}

export default TrackItem;
