import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { fetchSonsgByName ,fetchAlbumsbySongName,fetchArtistsbySongName } from "../../Utils";

function SearchBar({ setTopSongs ,setAlbums ,setArtist , topSongs}) {
  const inputElement = useRef(null);
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = async () => {
    if (searchValue.trim() !== '') {
      await fetchSonsgByName(searchValue, setTopSongs);
      await fetchAlbumsbySongName(searchValue, setAlbums);
      await fetchArtistsbySongName(searchValue, setArtist);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setSearchValue('');
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(handleSearch, 200);
  }, [searchValue, setTopSongs, setAlbums, setArtist]);


  return (
    <div className="flex gap-2 w-full h-full">
      <div className="flex rounded-lg items-center max-w-[150px] bg-[#18181D] h-full">
        <div className="w-[90%] h-[90%] p-2 pl-4 hover:cursor-pointer">
          <FaAngleLeft className="w-full h-full" />
        </div>
        <div className="w-[90%] h-[90%] p-2 pr-4 hover:cursor-pointer">
          <FaAngleRight className="w-full h-full" />
        </div>
      </div>
      {/* Search bar */}
      <div className="relative text-center rounded-lg border-4 border-[#18181D] bg-transparent">
        <div className="absolute top-1/2 -translate-y-1/2 left-5 scale-[1.6] bg-transparent">
          <IoSearch />
        </div>
        <input
          ref={inputElement}
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="rounded-lg w-full h-full bg-transparent text-white pl-14"
          placeholder="What do you want to play?"
        />
      </div>
    </div>
  );
}

export default SearchBar;
