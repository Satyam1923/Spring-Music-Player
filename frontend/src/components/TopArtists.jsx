const TopArtists = ({ topsongs, setTopSong, playSong }) => {
   return (
      <div className="topArtistsContainer">
         <div className="topArtistsHeader">
            <p>Top Artists</p>
            <p>See all</p>
         </div>
         <div className="topArtists">
            {
               topsongs.map((element, index) => (
                  <div
                     className="result-item"
                     key={element.id}
                     onClick={() => {
                        setTopSong(true);
                        playSong(index);
                     }}
                  >
                     <div className="songresult">
                        <div>
                           <img
                              src={element.image[2].url}
                              alt={element.name}
                              height="15px"
                              width="15px"
                           />
                        </div>
                        <div className="search-details">
                           <p>
                              {element.name}
                           </p>
                        </div>
                     </div>
                  </div>
               ))
            }
         </div>
      </div>
   )
}

export default TopArtists