import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import {
  fetchSonsgByName,
  fetchAlbumsbySongName,
  fetchArtistsbySongName,
} from "../../Utils";
import "./SearchBar.css";

function SearchBar({ setTopSongs, setAlbums, setArtist, topSongs }) {
  const inputElement = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = async () => {
    if (searchValue.trim() !== "") {
      await fetchSonsgByName(searchValue, setTopSongs);
      await fetchAlbumsbySongName(searchValue, setAlbums);
      await fetchArtistsbySongName(searchValue, setArtist);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      setSearchValue("");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(handleSearch, 200);
  }, [searchValue, setTopSongs, setAlbums, setArtist]);

  return (
    <div className="flex items-center  gap-2 w-full h-full">
      
        <button className="search-button mx-2">
          <FaAngleLeft className="w-[50%] h-[50%]" />
        </button>
        <button className="search-button mx-2">
          <FaAngleRight className="w-[50%] h-[50%]" />
        </button> 
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
