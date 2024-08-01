import React from "react";
import { IoIosAlbums, IoMdHome } from "react-icons/io";
import { GoHomeFill, GoHome } from "react-icons/go";
import { MdOutlineFavoriteBorder, MdFavorite, MdLibraryMusic, MdOutlineLibraryMusic } from "react-icons/md";
import { FaHeart, FaSearch } from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";
import { PiPlaylistBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { AiFillLike } from "react-icons/ai"
import { IoAlbums } from "react-icons/io5";
import { RiHome5Fill } from "react-icons/ri";


function Navbar() {

  return (
    <div className="min-w-[70px] max-w-[80px] h-full rounded-lg">
      <div className="flex flex-col gap-3 w-full h-full">
        <div className="flex p-4 flex-col gap-6 rounded-lg items-center justify-center hover:bg-gray-800">
          <IoReorderThreeOutline className="w-full h-full scale-[1.2] hover:cursor-pointer" />
        </div>
        <Link
          to="/search"
          className="bg-[#18181D] flex p-4 flex-col gap-6 rounded-lg items-center justify-center hover:bg-gray-800"
        >
          <FaSearch className="w-full h-full scale-[0.8] hover:cursor-pointer" />
        </Link>
        <div className="bg-[#18181D] flex p-4 pt-6 pb-6 flex-col gap-8 rounded-lg items-center justify-center hover:bg-gray-800">
          <Link to="/" className="w-full h-full hover:cursor-pointer">
            <HiHome className="w-full h-full" />
          </Link>
          <Link to="/liked-song" className="w-full h-full hover:cursor-pointer">
            <FaHeart className="w-full h-full scale-[0.8] hover:cursor-pointer" />
          </Link>
          <IoIosAlbums className="w-full h-full scale-[0.8] hover:cursor-pointer" />
        </div>
        <div className="bg-[#18181D] flex p-4 pt-6 pb-6 flex-col gap-8 rounded-lg items-center justify-center hover:bg-gray-800">
          <PiPlaylistBold className="w-full h-full scale-[0.8] hover:cursor-pointer" />
          <PiPlaylistBold className="w-full h-full scale-[0.8] hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
export default Navbar;
