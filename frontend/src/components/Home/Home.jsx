import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { FaPlayCircle } from "react-icons/fa";
import "react-h5-audio-player/lib/styles.css";
import MusicPlayer from "../MusicPlayer";
import UserIconSection from "../UserIconSection";
import Footer from "../Footer";
import { fetchTopSongs, fetchSonsgByName, secIntoMinSec } from "../../Utils";
import { db } from "../Auth/firebase";
import { doc, getDoc } from "firebase/firestore";

function Main() {
  const [currentArtist, setCurrentArtist] = useState(null);
  const [currentSong, setCurrentSong] = useState([]);
  const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState([]);

  useEffect(() => {
    const fetchRecentlyPlayedSongs = async () => {
      try {
        let userData = localStorage.getItem("user");
        const user = JSON.parse(userData);

        if (user) {
          const userDocRef = doc(db, "Users", user.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            const songIds = userData.songIds || [];

            const songsPromises = songIds.map(async (songId) => {
              const songRef = doc(db, "songs", songId);
              const songDocSnapshot = await getDoc(songRef);

              if (songDocSnapshot.exists()) {
                return songDocSnapshot.data();
              } else {
                console.log(`Song with ID ${songId} not found`);
                return null;
              }
            });

            const songs = await Promise.all(songsPromises);
            console.log("Recently played songs:", songs);
            setRecentlyPlayedSongs(songs.filter((song) => song !== null));
          } else {
            console.log("User document does not exist");
          }
        } else {
          console.log("User details not available");
        }
      } catch (error) {
        console.error("Error fetching recently played songs:", error);
      }
    };

    fetchRecentlyPlayedSongs();
  }, []);

  return (
    <div
      className="flex flex-col h-auto gap-4 w-full"
      style={{ maxWidth: "calc(100vw - 80px)" }}
    >
      {/* Top user section */}
      <UserIconSection />
      {/* Middle */}
      <div className="w-full mb-6 h-auto">
        <RecentlyPlayed
          setCurrentSong={setCurrentSong}
          recentlyPlayedSongs={recentlyPlayedSongs}
        />
      </div>

      {/* Bottom */}
      <div className="flex flex-row xs:flex-col-reverse h-auto w-full gap-4  ">
        {/* Left section */}
        <div className="flex flex-col gap-4  w-auto sm:w-[50%] xs:w-full  ">
          <div className=" w-full h-auto">
            <TopArtists setCurrentArtist={setCurrentArtist} />
          </div>
          <div className="flex h-auto flex-row sm:flex-col gap-4 w-full">
            <Genres />
            <TopSongs
              currentArtist={currentArtist}
              setCurrentSong={setCurrentSong}
            />
          </div>
        </div>
        {/* Right section */}
        <div className="w-[30%] md:w-[40%] sm:w-[50%] max-w-[300px]  sm:max-w-none xs:w-full ">
          <MusicPlayer currSong={currentSong} shouldAutoPlay={true} />
        </div>
      </div>
    </div>
  );
}

function RecentlyPlayed({ setCurrentSong, recentlyPlayedSongs }) {
  return (
    <div className="w-full h-full rounded-lg flex flex-col gap-2">
      <h1 className="text-2xl w-[40%] font-medium text-left ml-1 text-white p-1">
        Recently Played
      </h1>
      <div className="flex flex-col gap-2 p-1 h-[80%] justify-between">
        {recentlyPlayedSongs.length > 0 ? (
          <div className="flex  gap-4 flex-wrap">
            {recentlyPlayedSongs.map((song, index) => (
              <RecentlyPlayedElement
                song={song}
                key={index}
                name={song.name}
                image={song.img}
                setCurrentSong={setCurrentSong}
                singer={song.artist}
              />
            ))}
          </div>
        ) : (
          <p className="text-white">No songs played recently.</p>
        )}
      </div>
    </div>
  );
}

function RecentlyPlayedElement({ setCurrentSong, song, name, image, singer }) {
  console.log(song);
  console.log(setCurrentSong);
  return (
    <div className="bg-[#18181D] p-4 rounded-[20px]">
      <div className="flex items-center gap-5 flex-wrap ">
        <img
          onClick={() => setCurrentSong(song)}
          src={image}
          alt="LogoMusicImage"
          className="w-20 h-20 object-cover rounded-[10px] cursor-pointer"
        />

        <div>
          <h1>{name}</h1>
          <p className="opacity-65">{singer}</p>
        </div>
      </div>
    </div>
  );
}

function Genres() {
  return (
    <div className="bg-[#18181D]  w-[45%] sm:w-full max-h-fit  rounded-lg">
      <div className="w-full flex flex-col p-4">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl text-white font-medium">Genres</h1>
          <h3 className="text-white text-lg">See all</h3>
        </div>
        <div className="flex w-full">
          <div className="flex gap-4 w-full flex-col pt-4">
            {/* Genre boxes */}
            <div className="flex w-full  gap-4">
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

export function TopSongsElement({
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
      <div className="flex gap-4 justify-start">
        <div className="text-center m-auto">{index}</div>
        <div className="flex gap-2">
          <img src={img} className="w-10 h-10 object-cover rounded-sm" />
          <div className="text-sm text-start">
            <div>{song.name}</div>
            <div className="text-xs">{artistName}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div>{songDuration}</div>
        <FaPlayCircle />
      </div>
    </div>
  );
}

function TopSongs({ currentArtist, setCurrentSong }) {
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
    <div className="bg-[#18181D] w-full max-h-80  py-4 px-1 rounded-lg">
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between items-center px-4 mb-2">
          <h1 className="text-2xl text-white font-medium">{title}</h1>
          <h3 className="text-white text-lg">See all</h3>
        </div>
        {/* Top chart list */}
        <div className="flex flex-col gap-2 overflow-y-auto ">
          {topSongs.slice(0, 10).map((song, index) => (
            <TopSongsElement
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
      className="flex p-2  flex-col gap-2 hover:cursor-pointer"
      onClick={() => onClick(name)}
    >
      <img src={img} className=" w-14 h-14 object-cover rounded-lg " />
      <div className="flex h-[20%] flex-col gap-1">
        <h2 className="font-medium text-white text-sm">{name.toUpperCase()}</h2>
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
    <div className="bg-[#18181D] w-full h-auto  rounded-lg mt-8 p-4">
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-white font-medium">Top Artists</h1>
          <h3 className="text-white text-lg">See all</h3>
        </div>
        <div className="flex overflow-x-auto w-full gap-4">
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
    <div className="max-w-screen h-auto p-4 text-center">
      <div className="max-w-screen  h-auto flex gap-4">
        <Navbar setCurrPage={setCurrPage} />
        <Main />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
