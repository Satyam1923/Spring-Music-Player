import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { fetchSonsgByName ,fetchAlbumsbySongName,fetchArtistsbySongName } from "../../Utils";
import './SearchBar.css'

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
      <div className="w-[400px] p-2">
        <div className="custom-input-group">
          <input
            ref={inputElement}
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="input-searchbar"
          />
          <label className="input-label">Search Songs</label>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
