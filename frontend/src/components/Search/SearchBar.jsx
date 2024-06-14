import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { fetchSonsgByName } from "../../Utils";
import debounce from "lodash/debounce";


function SearchBar({ setTopSongs }) {
  const inputElement = useRef(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const storedSearchValue = localStorage.getItem('searchValue');
    if (storedSearchValue) {
      setSearchValue(storedSearchValue);
      fetchSonsgByName(storedSearchValue,setTopSongs);
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    localStorage.setItem('searchValue', value);
  };

  useEffect(() => {
    const searchSong = (e) => {
      if (e.key === "Enter" && document.activeElement === inputElement.current) {
        fetchSonsgByName(searchValue, setTopSongs);
      }
    };

    window.addEventListener("keypress", searchSong);
    return () => {
      window.removeEventListener("keypress", searchSong);
    };
  }, [searchValue, setTopSongs]);

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
          onChange={handleChange}
          className="rounded-lg w-full h-full bg-transparent text-white pl-14"
          placeholder="What do you want to play?"
        />
      </div>
    </div>
  );
}

export default SearchBar;
