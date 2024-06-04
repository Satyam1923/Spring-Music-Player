import React from "react";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";

function NavElement({ children }) {
  return <div className="w-full aspect-square bg-[#D9D9D9] rounded-md text-white hover:cursor-pointer p-2">{children ? children : ""}</div>;
}

function Navbar() {
  return (
    <div className="w-[5%] min-w-[70px] max-w-[80px] h-full rounded-lg">
      <div className="flex flex-col gap-2 w-full h-full">
        <div className="bg-[#18181D] flex p-4 flex-col gap-6 rounded-xl items-center justify-center">
          <IoMdHome className="w-full h-full hover:cursor-pointer" />
          <FaSearch className="w-full h-full scale-[0.8] hover:cursor-pointer" />
        </div>
        <div className="bg-[#18181D] flex p-3 pt-4 pb-4 flex-col gap-6 rounded-xl justify-start h-full">
          <NavElement>
            <BiSolidLike className="w-full h-full" style={{color:'#5773FF'}} />
          </NavElement>
          <NavElement />
          <NavElement />
          <NavElement />
          <NavElement />
          <NavElement />
          <NavElement />
          <NavElement />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
