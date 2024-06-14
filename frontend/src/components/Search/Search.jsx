import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import SearchBar from "./SearchBar";
import UserIconSection from "../UserIconSection";
import { FaPlayCircle } from "react-icons/fa";
import MusicPlayer from "../MusicPlayer";
import { FaPlay } from "react-icons/fa6";
import { fetchSongData, fetchTopSongs, secIntoMinSec } from "../../Utils";
import Footer from "../Footer";



function MusicTypeBlock({ name, color }) {
  return (
    <div
      className="row-span-1 col-span-1 rounded-md text-left font-medium text-xl pt-6 pl-6"
      style={{ backgroundColor: color }}
    >
      <div>{name}</div>
    </div>
  );
}

function SearchDefault() {
  return (
    <div className="w-full h-full bg-[#18181D] rounded-lg">
      <div className="grid gap-6 p-6 h-full grid-cols-4 grid-rows-3">
        <MusicTypeBlock name="Pop" color="#F12E2E" />
        <MusicTypeBlock name="Rock" color="#D98131" />
        <MusicTypeBlock name="Jazz" color="#7BB94A" />
        <MusicTypeBlock name="Hip-Hop" color="#2EB1C3" />
        <MusicTypeBlock name="Classical" color="#1B6FEE" />
        <MusicTypeBlock name="EDM" color="#985AE7" />
        <MusicTypeBlock name="Country" color="#2A8152" />
        <MusicTypeBlock name="Reggae" color="#05658E" />
        <MusicTypeBlock name="Blues" color="#000000" />
        <MusicTypeBlock name="Soul" color="#000000" />
        <MusicTypeBlock name="Metal" color="#000000" />
        <MusicTypeBlock name="Folk" color="#000000" />
      </div>
    </div>
  );
}

function AlbumElement({ name, playCount }) {
  return (
    <div className="flex flex-1 flex-col gap-2 hover:cursor-pointer">
      <div className="h-[70%] rounded-lg bg-[#D9D9D9]"></div>
      <div className="flex h-[20%] flex-col gap-1">
        <h2 className="font-medium text-white text-[1em]">{name}</h2>
        <h4 className="text-white font-medium text-[0.9em]">year. artist name</h4>
      </div>
    </div>
  );
}

function Albums() {
  return (
    <div className="bg-[#18181D] p-2 md:pl-6 md:pr-6 w-full h-full rounded-lg">
      <div className="flex flex-col pl-4 pr-4 gap-2 pt-2 w-full h-full">
        <div className="flex h-[5%] justify-between items-center text-center p-1">
          <h1 className="text-lg md:text-2xl text-white font-medium">Albums</h1>
        </div>
        <div className="flex h-[90%] gap-4 md:gap-8 flex-wrap overflow-y-auto">
          <AlbumElement name="Album Name" />
          <AlbumElement name="Album Name" />
          <AlbumElement name="Album Name" />
          <AlbumElement name="Album Name" />
          <AlbumElement name="Album Name" />
        </div>
      </div>
    </div>
  );
}


function SongElement({ song, setCurrSong, number, setShouldAutoPlay }) {
  const duration = secIntoMinSec(song.duration);

  return (
    <div
      className="flex h-[18%] justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-700 hover:shadow-lg"
      onClick={() => {
        setCurrSong(song);
        setShouldAutoPlay(true);
      }}
    >
      <div className="flex gap-4">
        <div className="flex items-center">{number}</div>
        <div className="flex h-full aspect-square items-center">
          <img
            src={song.img || ""}
            className="h-26 w-26  rounded-lg object-fill bg-gray-900"
          />
        </div>
        <div className="flex h-full justify-center flex-col gap-1">
          <h2 className="font-medium text-left text-white text-[0.9em]">{song.name}</h2>
          <h4 className="text-white font-medium text-left text-[0.7em]">
            {song.artist || "Unknown artist"}
          </h4>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <h2 className="text-white">{duration}</h2>
        <FaPlayCircle />
      </div>
    </div>
  );
}


function Songs({ topSongs, setCurrSong, setShouldAutoPlay }) {
  return (
    <div className="bg-[#18181D] w-full h-full rounded-lg">
      <div className="w-full h-full flex flex-col gap-1 pr-8 pb-3">
        <div className="flex h-[15%] justify-between items-center text-center p-1 ml-4 mr-4 mt-2">
          <h1 className="text-2xl text-white font-medium">Songs</h1>
        </div>
        <div className="flex flex-col gap-2 h-[82%] justify-between p-4 pr-6 rounded-xl bg-[#0E0C0C]">
          {topSongs.map((song, index) => {
            if (index > 0) {
              return (
                <SongElement
                  key={index}
                  number={index}
                  song={song}
                  setCurrSong={setCurrSong}
                  setShouldAutoPlay={setShouldAutoPlay}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}


function SearchResultAll({ topSongs, setCurrSong, setShouldAutoPlay }) {
  return (
    <div className="w-full h-full rounded-xl flex flex-col gap-4">
      {/* Search filters */}
      <div className="w-full h-20 flex justify-start gap-6">
        <div className="bg-white flex items-center justify-center hover:cursor-pointer min-w-[70px] rounded-lg pl-4 pr-4">
          <h2 className="text-3xl bg-transparent text-black text-center w-full font-medium">All</h2>
        </div>
        <div className="bg-[#18181D] flex items-center justify-center hover:cursor-pointer min-w-[70px] rounded-lg pl-4 pr-4">
          <h2 className="text-2xl bg-transparent text-center w-full font-medium">Songs</h2>
        </div>
        <div className="bg-[#18181D] flex items-center justify-center hover:cursor-pointer min-w-[70px] rounded-lg pl-4 pr-4">
          <h2 className="text-2xl bg-transparent text-center w-full font-medium">Albums</h2>
        </div>
        <div className="bg-[#18181D] flex items-center justify-center hover:cursor-pointer min-w-[70px] rounded-lg pl-4 pr-4">
          <h2 className="text-2xl bg-transparent text-center w-full font-medium">Playlist</h2>
        </div>
        <div className="bg-[#18181D] flex items-center justify-center hover:cursor-pointer min-w-[70px] rounded-lg pl-4 pr-4">
          <h2 className="text-2xl bg-transparent text-center w-full font-medium">Artists</h2>
        </div>
      </div>

      <div className="flex gap-4 w-full h-1/2  bg-[#18181D]">
        {/* Top Results section */}
        <div className="flex flex-col w-[30%] h-full p-4 gap-4">
          <h2 className="w-full text-2xl h-[10%] ml-4 text-left font-medium">Top Results</h2>
          <div className=" bg-[#0E0C0C] w-full h-[90%] rounded-xl flex flex-col gap-4 p-6">
            {/* Song Image */}
            <div className="h-[70%] w-full">
              {/* replace this with the image */}
              {/* <div className="h-full rounded-xl aspect-square bg-[#D9D9D9]"></div> */}
              <img
                src={topSongs[0]?.img }
                className="h-full rounded-xl aspect-square bg-[#D9D9D9]"
              />
            </div>
            <div className="flex justify-between h-[30%] w-full items-center">
              <div className="text-left">
                <h1 className="text-2xl text-md font-medium">{topSongs[0]?.name || "Song name"}</h1>
                <h2 className="text-lg font-medium">Song . {topSongs[0]?.album.name || "Album Name"}</h2>
              </div>
              <div
                className="md:h-[70%] h-[50%]  aspect-square bg-[#83CE89] flex items-center justify-center rounded-[50%] hover:cursor-pointer"
                onClick={() => {
                  setCurrSong(topSongs[0]);
                  setShouldAutoPlay(true);
                }}
              >
                <FaPlay className="w-[50%] h-[50%]" />
              </div>
            </div>
          </div>
        </div>
        {/* Songs */}
        <div className="w-[70%] h-full">
          <div className="w-full h-full">
            <Songs topSongs={topSongs} setCurrSong={setCurrSong} setShouldAutoPlay={setShouldAutoPlay} />
          </div>
        </div>
      </div>
      {/* Albums */}
      <div className="w-full h-1/2">
        <div className="w-full h-full">
          <Albums />
        </div>
      </div>
    </div>
  );
}

function Search({ setCurrPage }) {
  const [currSong, setCurrSong] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  let [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  useEffect(() => {
    fetchTopSongs(setTopSongs);
    fetchSongData("top songs", setCurrSong);
    
  }, []);

  return (
    <div className="w-screen h-screen p-4 text-center">
      <div className="w-full h-full flex gap-4">
        <Navbar setCurrPage={setCurrPage} />
        <div className="w-full h-full flex flex-col gap-4">
          {/* Search bar */}
          <div className="rounded-lg flex w-full">
            <SearchBar setTopSongs={setTopSongs} />
            <UserIconSection username="user" />
          </div>
          {/* Main section */}
          <div className="w-full h-full">
            <div className="w-full h-full flex gap-4">
              <div className="w-full h-full flex flex-col gap-2">
                {/* Search main section */}
                <div className="w-full h-full">
                  <SearchResultAll topSongs={topSongs} setCurrSong={setCurrSong} setShouldAutoPlay={setShouldAutoPlay} />
                </div>
              </div>
              {/* Music player */}
              <div className="w-[30%] min-w-[300px] h-[64vh] rounded-lg mt-56">
                <MusicPlayer currSong={currSong} shouldAutoPlay={shouldAutoPlay} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;
