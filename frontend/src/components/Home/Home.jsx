import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { FaPlayCircle } from "react-icons/fa";
import "react-h5-audio-player/lib/styles.css";
import MusicPlayer from "../MusicPlayer";
import UserIconSection from "../UserIconSection";
import Footer from "../Footer";
import { fetchTopSongs, fetchSonsgByName, secIntoMinSec } from "../../Utils";
import { Link } from "react-router-dom";

function Main() {
  const [currentArtist, setCurrentArtist] = useState(null);
  const [currentSong, setCurrentSong] = useState([]);
  return (
    <div className="flex flex-col h-full gap-4 w-full">
      {/* Top user section */}
      <UserIconSection />
      {/* Middle */}
      <div className="w-full  mb-6  h-[25%]">
        <RecentlyPlayed />
      </div>

      {/* Bottom */}
      <div className="h-[75%]  w-full">
        <div className="flex h-full gap-4">
          {/* Left section */}
          <div className="flex flex-col gap-4 w-full h-full">
            <div className="h-[40%]">
              <TopArtists setCurrentArtist={setCurrentArtist} />
            </div>
            <div className="flex h-[60%]  gap-4 w-full">
              <Genres />
              <TopCharts
                currentArtist={currentArtist}
                setCurrentSong={setCurrentSong}
              />
            </div>
          </div>
          {/* Right section */}
          <div className="w-[30%]  min-w-[300px] h-[80%]  relative">
            <MusicPlayer currSong={currentSong} shouldAutoPlay={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentlyPlayedElement({ name, image }) {
  return (
    <div className="flex gap-4 flex-1 items-center justify-start bg-[#18181D] rounded-md min-w-[150px] max-h-[70px] hover:cursor-pointer">
      <img
        src={image}
        className="max-h-full aspect-square  rounded-md object-fill "
      />
      <h1 className="text-white font-medium">{name}</h1>
    </div>
  );
}

function RecentlyPlayed() {
  return (
    <div className=" w-full h-full rounded-lg flex flex-col gap-2">
      <h1 className="text-2xl w-[40%] font-medium text-left ml-1 text-white p-1">
        Recently Played
      </h1>
      <div className="flex flex-col gap-2 p-1 h-[80%] justify-between">
        <div className="flex justify-between gap-4 flex-wrap">
          <RecentlyPlayedElement
            name="Deja Vu"
            image={
              "https://i.scdn.co/image/ab67616d00001e02a91c10fe9472d9bd89802e5a"
            }
          />
          <RecentlyPlayedElement
            name="Deja Vu"
            image={
              "https://images.unsplash.com/photo-1523169054-66018b90af5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
          <RecentlyPlayedElement
            name="Deja Vu"
            image={
              "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96"
            }
          />
          <RecentlyPlayedElement
            name="Deja Vu"
            image={
              "https://images.unsplash.com/photo-1523169054-66018b90af5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
        </div>
        <div className="flex justify-between gap-4 flex-wrap">
          <RecentlyPlayedElement
            name="Deja Vu"
            image={
              "https://images.unsplash.com/photo-1523169054-66018b90af5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
          <RecentlyPlayedElement
            name="Deja Vu"
            image={
              "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4"
            }
          />
          <RecentlyPlayedElement
            name="Deja Vu"
            image={
              "https://images.unsplash.com/photo-1523169054-66018b90af5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
          <RecentlyPlayedElement
            name="Deja Vu"
            image={
              "https://images.unsplash.com/photo-1523169054-66018b90af5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
        </div>
      </div>
    </div>
  );
}

function Genres() {
  return (
    <div className="bg-[#18181D] w-full h-full rounded-lg">
      <div className="h-full w-full flex flex-col p-2">
        <div className="flex h-[15%] justify-between items-center text-center pl-4 pr-4">
          <h1 className="text-2xl text-white font-medium">Genres</h1>
          <h3 className="text-white text-lg">See all</h3>
        </div>
        <div className="h-full p-2">
          <div className="flex gap-4 h-full flex-col flex-1 p-2 pl-4 pr-4">
            {/* Genre boxes */}
            <div className="flex h-full gap-4">
              <div className="bg-[#E76E67] flex flex-1 justify-center text-xl font-medium items-center rounded-lg">
                Dance/Electric
              </div>
              <div className="bg-[#8CBB5D] flex flex-1 justify-center text-xl font-medium items-center rounded-lg">
                Rock
              </div>
            </div>
            <div className="flex h-full gap-4">
              <div className="bg-[#4BA892] flex flex-1 justify-center text-xl font-medium items-center rounded-lg">
                Party
              </div>
              <div className="bg-[#C0EA7B] flex flex-1 justify-center text-xl font-medium items-center rounded-lg">
                Afro
              </div>
              <div className="bg-[#BA70C6] flex flex-1 justify-center text-xl font-medium items-center rounded-lg">
                Pop
              </div>
            </div>
            <div className="flex h-full gap-4">
              <div className="bg-[#BFD539] flex flex-1 justify-center text-xl font-medium items-center rounded-lg">
                Chill
              </div>
              <div className="bg-[#C55778] flex flex-1 justify-center text-xl font-medium items-center rounded-lg">
                Classic/Retro
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TopChartsElement({
  index,
  song,
  img,
  artistName,
  songDuration,
  setCurrentSong,
}) {
  // console.log(song)
  return (
    <div
      onClick={() => setCurrentSong(song)}
      className="flex justify-between items-center p-2 hover:cursor-pointer"
    >
      <div className="flex gap-4">
        <div>{index}</div>
        <img src={img} className="w-10 h-10 object-cover" />
        <div className="text-sm">
          <div>{song.name}</div>
          <div>{artistName}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>{songDuration}</div>
        <FaPlayCircle />
      </div>
    </div>
  );
}

function TopCharts({ currentArtist, setCurrentSong }) {
  const [topSongs, setTopSongs] = useState([]);
  const [title, setTitle] = useState("Top Songs");

  useEffect(() => {
    const fetchData = async () => {
      if (currentArtist) {
        await fetchSonsgByName(currentArtist, setTopSongs);
        setTitle(currentArtist);
      } else {
        await fetchTopSongs(setTopSongs);
        // setTopSongs(topSongsData);
        setTitle("Top Songs");
      }
    };

    fetchData();
  }, [currentArtist]);
  // console.log(currentArtist)
  // console.log(topSongs)

  return (
    <div className="bg-[#18181D]  w-full h-full rounded-lg">
      <div className="w-full h-full flex flex-col">
        <div className="flex h-[15%] justify-between items-center text-center p-1 ml-4 mr-4 mt-2">
          <h1 className="text-2xl text-white font-medium">{title}</h1>
          <h3 className="text-white text-lg">See all</h3>
        </div>
        {/* Top chart list */}
        <div className="flex flex-col gap-2 overflow-scroll  p-2">
          {topSongs.map((song, index) => (
            <TopChartsElement
              key={index}
              index={index + 1}
              song={song}
              img={song.img}
              artistName={song.artist}
              songDuration={secIntoMinSec(song.duration)}
              setCurrentSong={setCurrentSong}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TopArtistElement({
  id,
  name,
  weeks_on_chart,
  img,
  onClick,
  key,
  album,
}) {
  return (
    <div
      key={id}
      className="flex flex-1 p-2 flex-col gap-2 hover:cursor-pointer"
      onClick={() => onClick(name)}
    >
      <img src={img} className="h-[60%] aspect-square rounded-lg object-fill" />
      <div className="flex h-[20%] flex-col gap-1">
        <h2 className="font-medium text-white text-[1em]">
          {name.toUpperCase()}
        </h2>
        {/* <h4 className="text-white font-medium text-[0.9em]">top charts: {weeks_on_chart} </h4> */}
      </div>
    </div>
  );
}

function TopArtists({ setCurrentArtist }) {
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://spring-music-player-3hyj.vercel.app/top-artists")
        .then((res) => {
          return res.json();
        })
        .then((data) => setArtists(data));
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#18181D]  w-full h-full rounded-lg">
      <div className="flex flex-col h-[100%] pl-4 pr-4 gap-2 pt-2">
        <div className="flex h-[15%] justify-between items-center text-center p-1">
          <h1 className="text-2xl text-white font-medium">Top Artists</h1>
          <h3 className="text-white text-lg">See all</h3>
        </div>
        <div className="flex h-[85%] gap-4">
          {artists &&
            artists.songs
              .slice(0, 8)
              .map((artist) => (
                <TopArtistElement
                  key={artist.rank}
                  id={artist.id}
                  name={artist.artist}
                  weeks_on_chart={artist.position.weeksOnChart}
                  img={artist.cover}
                  onClick={setCurrentArtist}
                  album={artist}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

function Home({ setCurrPage }) {
  return (
    <div className="w-screen h-screen p-4 text-center">
      <div className="w-full h-full flex gap-4">
        <Navbar setCurrPage={setCurrPage} />
        <Main />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
