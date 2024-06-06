const TrackItem = ({ track,id,playSong,setIsEnglishSong,setTopSong,isEnglishSong}) => {
   return (
      <div className="track-item">
         <div className="track-number">{id}</div>
         <div className="track-image">
            <img src={track.image[2].url} alt="" />
         </div>
         <div className="track-info">
            <div className="track-title">{track.name}</div>
            <div className="track-artist">{track.artists.primary[0].name}</div>
         </div>
         <div className="track-duration">{(track.duration/60).toFixed(2)}</div>
         <button className="play-button" onClick={()=>{
            setTopSong(false);
            // console.log("isEnglishSong");
            // console.log(isEnglishSong);
            setIsEnglishSong(true);
            playSong(id-1);
            console.log("clickedd : "+(id-1));
         }}>▶</button>
      </div>
   );
}

export default TrackItem;
