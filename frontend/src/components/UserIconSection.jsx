import React from "react";
import { Link } from "react-router-dom";

function UserIconSection({ username }) {
  return (
    <div className="w-full min-h-12 relative hover:cursor-pointer">
      <div className="h-full flex justify-end">
        <div className="flex h-full bg-[#18181D] rounded-md">
          <div className="bg-[#343440] h-full aspect-square rounded-md"></div>
          <div className="bg-[#18181D] pl-5 pr-5 h-full max-w-[200px] basis-24 flex rounded-lg items-center justify-center">
            <h2 className="text-white">{username}</h2>
          </div>
        </div>
      </div>
      <div className="justify-end flex space-x-4">
        <Link to="/login">
          <button className="text-white bg-black-500 hover:bg-white hover:text-black font-bold py-2 px-4 rounded">
            Log in
          </button>
        </Link>
        <Link to="/signup">
          <button className="text-white bg-black-500 hover:bg-white hover:text-black font-bold py-2 px-4 rounded">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default UserIconSection;
