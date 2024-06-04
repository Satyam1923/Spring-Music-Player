import React from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

function SearchBar() {
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
        <input type="text" className="rounded-lg w-full h-full bg-transparent text-white pl-14" placeholder="What do you want to play?" />
      </div>
    </div>
  );
}

export default SearchBar;
