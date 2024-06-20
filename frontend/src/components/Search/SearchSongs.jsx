import React from "react";
import { useOutletContext } from "react-router-dom";
import { secIntoMinSec } from "../../Utils";
import { FaPlayCircle } from "react-icons/fa";

function SearchSongs() {
  const context = useOutletContext();

  const topSongs = context.topSongs;
  const setCurrSong = context.setCurrSong;
  const setShouldAutoPlay = context.setShouldAutoPlay;

  return (
    <div className="bg-[#18181D] w-full h-full rounded-lg flex items-center justify-center">
      <div className="w-full h-full flex flex-col gap-1 p-2 pt-4 pb-4">
        <div className="flex flex-col gap-2 h-full p-4 pr-6 rounded-xl overflow-auto">
          {topSongs.map((song, index) => {
            if (index > 0) {
              return (
                <SongElement
                  key={index}
                  number={index}
                  song={song}
                  albumName={song.album.name}
                  setCurrSong={setCurrSong}
                  setShouldAutoPlay={setShouldAutoPlay}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

function SongElement({ song, setCurrSong, albumName, number, setShouldAutoPlay }) {
  const duration = secIntoMinSec(song.duration);

  return (
    <div
      className="flex h-[12%] justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-700 hover:shadow-lg"
      onClick={() => {
        setCurrSong(song);
        setShouldAutoPlay(true);
      }}
    >
      <div className="flex gap-4 w-[300px]">
        <div className="flex items-center">{number}</div>
        <div className="flex h-full  items-center">
          <img src={song.img || ""} className="h-10 w-10  rounded-md object-fill" />
        </div>
        <div className="flex h-full justify-center flex-col gap-1">
          <h2 className="font-medium text-left text-white text-[0.9em]">{song.name}</h2>
          <h4 className="text-white  text-left text-[0.7em]">{song.artist || "Unknown artist"}</h4>
        </div>
      </div>

      <div className="flex items-center justify-center w-[200px]">
          <h1 className="text-[0.9em]">{albumName}</h1>
        </div>

      <div className="flex items-center gap-20 justify-between">

        <div className="flex gap-4 items-center">
          <h2 className="text-white">{duration}</h2>
          <FaPlayCircle />
        </div>
      </div>
    </div>
  );
}

export default SearchSongs;
