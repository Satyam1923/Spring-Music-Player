import React from 'react';

const SongCard = ({ song }) => {
  return (
    <div className="flex flex-col w-[180px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer m-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-24 group rounded-lg overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
        ></div>
        <img alt="song_img" src={song.albumCover} className="w-full h-full object-cover rounded-lg" />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-md text-white truncate">
          {song.title}
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          {song.artist}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
