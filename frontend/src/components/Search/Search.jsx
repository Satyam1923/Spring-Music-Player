import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import SearchBar from "./SearchBar";
import UserIconSection from "../UserIconSection";
import { FaPlayCircle } from "react-icons/fa";
import MusicPlayer from "../MusicPlayer";
import { FaPlay } from "react-icons/fa6";
import {
  fetchSongData,
  fetchTopSongs,
  secIntoMinSec,
  fetchAlbumsbySongName,
  fetchArtistsbySongName,
} from "../../Utils";
import Footer from "../Footer";
import { storeAlbum, storeSong } from "../Auth/StoreSong";
import { Link, NavLink, Outlet, useOutletContext } from "react-router-dom";

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

function AlbumElement({ album }) {
  const imageUrl = album.images && album.images[2] ? album.images[2].url : "defaultImageUrl";
  const artistName =
    album.primaryArtists && album.primaryArtists[0]
      ? album.primaryArtists[0].name
      : "Unknown Artist";
  return (
    <div className="flex flex-1 flex-col max-w-full min-w-0 gap-3 hover:cursor-pointer">
      <Link to={`/album/${album.id}`} onClick={() => console.log(album)}>
        <div className="flex justify-center rounded-lg">
          <img
            className="h-32 w-32 rounded-lg"
            src={imageUrl}
            alt={`${album.name} album cover`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm text-white">{album.name}</h2>
          <h4 className="text-xs text-white">{`${artistName} - ${album.year}`}</h4>
        </div>
      </Link>
    </div>
  );
}

function Albums({ albums }) {
  return (
    <div className="bg-[#18181D] p-2 w-full h-full rounded-lg">
      <div className="flex flex-col p-2 gap-5 w-full h-full">
        <div className="flex h-[5%] justify-between items-center text-center p-1">
          <h1 className="text-2xl md:text-2xl text-white font-medium">
            Albums
          </h1>
        </div>
        <div className="flex h-[90%] gap-4 md:gap-8 flex-wrap">
          {albums.slice(0, 6).map((album, index) => (
            <AlbumElement key={index} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArtistElement({ artist }) {
  return (
    <div className="flex flex-1 flex-col gap-3 hover:cursor-pointer">
      <Link to={`/artist/${artist.name}`}>
        <div className="flex justify-center rounded-lg">
          <img
            className="h-32 w-32 rounded-lg"
            src={artist.image[1].url}
            alt=""
          />
        </div>
        <div className="flex  flex-col gap-1">
          <h2 className=" text-sm text-white ">{artist.name}</h2>
        </div>
      </Link>
    </div>
  );
}

function Artists({ artists }) {
  //console.log(artists);
  return (
    <div className="bg-[#18181D] p-2  w-full h-full rounded-lg">
      <div className="flex flex-col p-2 gap-5 w-full h-full">
        <div className="flex h-[5%] justify-between items-center text-center p-1">
          <h1 className="text-2xl md:text-2xl text-white font-medium">
            Artists
          </h1>
        </div>
        <div className="flex h-[90%] gap-4 md:gap-8 flex-warp">
          {artists.map((artist, index) => (
            <ArtistElement key={index} artist={artist} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SongElement({ song, setCurrSong, number, setShouldAutoPlay, currSongIdx }) {
  const duration = secIntoMinSec(song.duration);

  return (
    <div
      className="flex h-[18%] justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-700 hover:shadow-lg"
      onClick={() => {
        currSongIdx.current = number;
        setCurrSong(song);
        setShouldAutoPlay(true);
        storeSong(song);
        console.log("song", song);
      }}
    >
      <div className="flex gap-4">
        <div className="flex items-center">{number}</div>
        <div className="flex h-full  items-center">
          <img
            src={song.img || ""}
            className="h-10 w-10  rounded-md object-fill"
          />
        </div>
        <div className="flex h-full justify-center flex-col gap-1">
          <h2 className="font-medium text-left text-white text-[0.9em]">
            {song.name}
          </h2>
          <h4 className="text-white  text-left text-[0.7em]">
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

function Songs({ topSongs, setCurrSong, setShouldAutoPlay, currSongIdx }) {
  return (
    <div className="bg-[#18181D] w-full h-full rounded-lg">
      <div className="w-full h-full flex flex-col gap-1 pr-8 pb-3">
        <div className="flex h-[15%] justify-between items-center text-center p-1 ml-4 mr-4 mt-2">
          <h1 className="text-2xl text-white font-medium">Songs</h1>
        </div>
        <div className="flex flex-col gap-2 h-[82%] justify-between p-4 pr-6 rounded-xl bg-[#0E0C0C] overflow-auto">
          {topSongs.map((song, index) => {
            if (index > 0) {
              return (
                <SongElement
                  currSongIdx={currSongIdx}
                  key={index}
                  number={index}
                  song={song}
                  setCurrSong={setCurrSong}
                  setShouldAutoPlay={setShouldAutoPlay}
                  onClick={() => storeSong(song)}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export function SearchResultAll() {
  const context = useOutletContext();
  const topSongs = context.topSongs;
  const setCurrSong = context.setCurrSong;
  const setShouldAutoPlay = context.setShouldAutoPlay;
  const albums = context.albums;
  const artists = context.artists;
  const songHasEnded = context.songHasEnded;
  const setSongHasEnded = context.setSongHasEnded;

  let currSongIdx = useRef(0); // TODO: maybe this should be a state variable as well

  // auto play next song when song ends
  useEffect(() => {
    if (songHasEnded) {
      if (currSongIdx.current < topSongs.length - 1) {
        currSongIdx.current++;
        setCurrSong(topSongs[currSongIdx.current]); // next song it not playing as current index is not updating
        setSongHasEnded(false);
      }
    }
  }, [songHasEnded]);

  return (
    <div className="w-full h-full rounded-xl flex flex-col gap-4">
      {/*Results section*/}
      <div className="flex flex-col w-full h-[77vh] gap-5 ">
        <div className="flex gap-4 w-full h-[44vh]  rounded-lg bg-[#18181D]">
          {/* Top Results section */}
          <div className="flex flex-col w-[30%] mb-auto h-full p-3 gap-2">
            <h2 className="w-full text-2xl h-[10%] ml-3 text-left font-medium">
              Top Results
            </h2>
            <div className="bg-[#0E0C0C] w-full h-[88%] rounded-xl flex flex-col gap-4 p-4">
              {/* Song Image */}
              <div className="h-[70%] w-full">
                {/* replace this with the image */}
                {/* <div className="h-full rounded-xl aspect-square bg-[#D9D9D9]"></div> */}
                <img
                  src={topSongs[0]?.img}
                  className="h-full rounded-xl aspect-square bg-[#D9D9D9]"
                />
              </div>
              <div className="flex justify-between h-[30%] w-full items-center">
                <div className="text-left">
                  <h1 className="text-xl text-md font-semibold">
                    {topSongs[0]?.name || "Song name"}
                  </h1>
                  <h2 className="text-base font-medium">
                    Song . {topSongs[0]?.album.name || "Album Name"}
                  </h2>
                </div>
                <div
                  className="h-12 aspect-square bg-[#83CE89] flex items-center justify-center rounded-[50%] hover:cursor-pointer"
                  onClick={() => {
                    const newSong = { ...topSongs[0] };
                    setCurrSong(newSong);
                    setShouldAutoPlay(true);
                    storeAlbum(topSongs);
                  }}
                >
                  <FaPlay className="w-[50%] h-[50%]" />
                </div>
              </div>
            </div>
          </div>
          {/* Songs */}
          <div className="w-[70%] h-full ">
            <div className="w-full h-full ">
              <Songs
                currSongIdx={currSongIdx}
                topSongs={topSongs}
                setCurrSong={setCurrSong}
                setShouldAutoPlay={setShouldAutoPlay}
              />
            </div>
          </div>
        </div>
        {/* Albums */}
        <div className="w-full h-1/2">
          <div className="w-full h-full">
            <Albums albums={albums} />
          </div>
        </div>
        <div className="w-full h-1/2">
          {artists.length > 0 && (
            <div className="w-full h-full">
              <Artists artists={artists} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Search({ setCurrPage }) {
  const [currSong, setCurrSong] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtist] = useState([]);
  let [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const [songHasEnded, setSongHasEnded] = useState(false);

  const searchAllNavLinkElement = useRef(null);

  function removeAllAsActive() {
    if (searchAllNavLinkElement) {
      searchAllNavLinkElement.current.classList.remove("active");
    }
  }

  useEffect(() => {
    fetchTopSongs(setTopSongs);
    fetchSongData("top songs", setCurrSong);
    fetchAlbumsbySongName("top songs", setAlbums);
    fetchArtistsbySongName("arijit singh", setArtist);
    if (searchAllNavLinkElement) {
      searchAllNavLinkElement.current.classList.add("active");
      console.log(searchAllNavLinkElement.current);
    }
  }, []);

  return (
    <div className="w-screen h-screen p-4 text-center ">
      <div className="w-full h-full flex gap-4">
        <Navbar setCurrPage={setCurrPage} />
        <div className="w-full h-full flex flex-col gap-3">
          {/* Search bar */}
          <div className="rounded-lg flex w-full">
            <SearchBar
              setTopSongs={setTopSongs}
              setAlbums={setAlbums}
              setArtist={setArtist}
              topSongs={topSongs}
            />
            <UserIconSection username="user" />
          </div>
          {/* Main section */}
          <div className="w-full h-full">
            <div className="w-full h-full flex gap-4">
              <div className="w-full h-full flex flex-col gap-2">
                {/* Search main section */}
                <div className="w-full h-full gap-2 flex flex-col">
                  <div className="w-full p-2">
                    {/* Search filters */}
                    <div className="search-filter-nav w-full h-14 flex justify-start gap-6">
                      <div className="bg-[#18181D] flex items-center justify-center hover:cursor-pointer min-w-[70px] rounded-lg pl-4 pr-4">
                        <NavLink ref={searchAllNavLinkElement} to="all">
                          <h2 className="text-3xl bg-transparent text-center w-full font-medium">
                            All
                          </h2>
                        </NavLink>
                      </div>
                      <div className="bg-[#18181D] flex items-center justify-center hover:cursor-pointer min-w-[70px] rounded-lg pl-4 pr-4">
                        <NavLink onClick={() => removeAllAsActive()} to="songs">
                          <h2 className="text-2xl bg-transparent text-center w-full font-medium">
                            Songs
                          </h2>
                        </NavLink>
                      </div>
                      <div className="bg-[#18181D] flex items-center justify-center hover:cursor-pointer min-w-[70px] rounded-lg pl-4 pr-4">
                        <NavLink
                          onClick={() => removeAllAsActive()}
                          to="albums"
                        >
                          <h2 className="text-2xl bg-transparent text-center w-full font-medium">
                            Albums
                          </h2>
                        </NavLink>
                      </div>
                      <div className="bg-[#18181D] flex items-center justify-center hover:cursor-pointer min-w-[70px] rounded-lg pl-4 pr-4">
                        <NavLink
                          onClick={() => removeAllAsActive()}
                          to="playlist"
                        >
                          <h2 className="text-2xl bg-transparent text-center w-full font-medium">
                            Playlist
                          </h2>
                        </NavLink>
                      </div>
                      <div className="bg-[#18181D] flex items-center justify-center hover:cursor-pointer min-w-[70px] rounded-lg pl-4 pr-4">
                        <NavLink
                          onClick={() => removeAllAsActive()}
                          to="artists"
                        >
                          <h2 className="text-2xl bg-transparent text-center w-full font-medium">
                            Artists
                          </h2>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-full overflow-scroll ">
                    <Outlet
                      context={{
                        topSongs,
                        setCurrSong,
                        shouldAutoPlay,
                        setShouldAutoPlay,
                        albums,
                        artists,
                        songHasEnded,
                        setSongHasEnded,
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Music player */}
              <div className="w-[30%] min-w-[300px] h-[64vh] rounded-lg mt-[20vh]">
                <MusicPlayer
                  currSong={currSong}
                  shouldAutoPlay={shouldAutoPlay}
                  setSongHasEnded={setSongHasEnded}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className=" fixed bottom-0 w-full p-4 " />
    </div>
  );
}

export default Search;
