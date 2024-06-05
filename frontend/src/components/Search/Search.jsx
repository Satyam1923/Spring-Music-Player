import React from "react";
import Navbar from "../Navbar";
import SearchBar from "./SearchBar";
import UserIconSection from "../UserIconSection";
import MusicPlayer from "../MusicPlayer";

function MainElement({ name, color }) {
  return (
    <div
      className="row-span-1 col-span-1 rounded-md text-left font-medium text-xl pt-6 pl-6"
      style={{ backgroundColor: color }}
    >
      <div>{name}</div>
    </div>
  );
}

function Main() {
  return (
    <div className="w-full h-full flex gap-4">
      <div className="w-[75%] h-full bg-[#18181D] rounded-lg">
        <div className="grid gap-6 p-6 h-full grid-cols-4 grid-rows-3">
          <MainElement name="Pop" color="#F12E2E" />
          <MainElement name="Pop" color="#D98131" />
          <MainElement name="Pop" color="#7BB94A" />
          <MainElement name="Pop" color="#2EB1C3" />
          <MainElement name="Pop" color="#1B6FEE" />
          <MainElement name="Pop" color="#985AE7" />
          <MainElement name="Pop" color="#2A8152" />
          <MainElement name="Pop" color="#05658E" />
          <MainElement name="Pop" color="#000000" />
          <MainElement name="Pop" color="#000000" />
          <MainElement name="Pop" color="#000000" />
          <MainElement name="Pop" color="#000000" />
        </div>
      </div>
      <div className="w-[25%] h-full rounded-lg flex flex-col">
        <div className="w-full h-[60%]"></div>
        <MusicPlayer songName="Reminder" artistName="The Weeknd" />
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="w-screen h-screen p-4 text-center">
      <div className="w-full h-full flex gap-4">
        <Navbar />
        <div className="w-full h-full flex flex-col gap-4">
          {/* Search bar */}
          <div className="rounded-lg flex w-full">
            <SearchBar />
            <UserIconSection username="Agent47" />
          </div>
          {/* Main section */}
          <div className="w-full h-full">
            <Main />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
