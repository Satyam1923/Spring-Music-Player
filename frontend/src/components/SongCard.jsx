import React from 'react';


import img from "../Images/empty.png"

const SongCard = () => {


  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer m-3 over">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex`}
        >
         
        </div>
        <img alt="song_img" src={img} className="w-full h-full rounded-lg" />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          Teri yaad
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
         Shivam Gupta
        </p>
      </div>
    </div>
  );
};

export default SongCard;