import React, { useEffect, useState } from "react";
import "./likedsong.css";

import { FaPlay } from "react-icons/fa";
import { IoPlaySkipForwardSharp, IoPlaySkipBack } from "react-icons/io5";
import { TbPlaylistAdd } from "react-icons/tb";
import { FaThumbsUp } from "react-icons/fa6";
import { RiPlayListLine } from "react-icons/ri";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MusicPlayer from "./MusicPlayer";
import { fetchAlbumsbySongName, fetchArtistsbySongName, fetchSongData, fetchTopSongs } from "../Utils";

const LikedSong = () => {
  const playlist = {
    tracks: {
      items: [
        {
          title: "Song 1",
          album: "Album 1",
          dateAdded: "2023-06-01",
          duration: "3:45",
        },
        {
          title: "Song 2",
          album: "Album 2",
          dateAdded: "2023-06-02",
          duration: "4:30",
        },
        {
          title: "Song 3",
          album: "Album 3",
          dateAdded: "2023-06-03",
          duration: "5:00",
        },
        // Add more songs as needed
      ],
    },
  };

  const [currSong, setCurrSong] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtist] = useState([]);
  let [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  useEffect(() => {
    fetchTopSongs(setTopSongs);
    fetchSongData("top songs", setCurrSong);
    fetchAlbumsbySongName("top songs", setAlbums);
    fetchArtistsbySongName("arijit singh", setArtist);
  }, []);

  return (
    <div className="flex w-full min-h-screen">
      <div className="w-0/6">
        <Navbar />
      </div>

      <div className="w-5/6 p-6">
        <div className="btns flex gap-5 bg-neutral-800 rounded-md w-max p-5">
          <FaAngleLeft className="cursor-pointer" />
          <FaAngleRight />
        </div>

        <div className=" mt-3 bg-neutral-800 rounded-md p-6 min-h-[92%]">
          <div className="flex bg-cyan-500 rounded-xl">
            <div className="playlist-img px-3 py-4">
              <img
                src={
                  "https://i.pinimg.com/564x/69/b7/70/69b770366d3c4a22e33885b5b3c58668.jpg"
                }
                className="rounded-xl object-cover"
                alt=""
                height={250}
                width={250}
              />
            </div>
            <div className="playlist-info text-white w-full mt-auto mb-4">
              <h1 className="text-8xl font-sans font-bold mb-4">Liked Songs</h1>
              <div className="flex items-center mt-2 justify-between">
                <div className="flex px-2">
                  <h1 className="font-bold hover:underline hover:cursor-pointer">
                    The WeekEnd
                  </h1>
                  <li className="hover:underline hover:cursor-pointer ml-5">
                    2020
                  </li>
                  <li className="hover:underline hover:cursor-pointer ml-5">
                    200 songs ,
                  </li>
                  <h1 className=" hover:underline hover:cursor-pointer ml-2">
                    About 2 hours 3 minutes
                  </h1>
                </div>
                <div className="mr-2 flex gap-4">
                  <RiPlayListLine size={30} />
                  <FaPlay size={30} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full text-white">
                <thead className="border-b border-gray-600">
                  <tr>
                    <th className="px-4 py-2 text-left">#</th>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Album</th>
                    <th className="px-4 py-2 text-left">Date Added</th>
                    <th className="px-4 py-2 text-left">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v8m4-4H8"
                        ></path>
                      </svg>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {playlist.tracks.items.map((song, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-600 hover:bg-gray-700"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <div className="flex items-center">
                        <div className="img">
                          <img
                            src="https://i.pinimg.com/564x/69/b7/70/69b770366d3c4a22e33885b5b3c58668.jpg"
                            height={50}
                            width={50}
                            alt=""
                          />
                        </div>
                        <div className="detail flex flex-col py-2 mr-40">
                          <td className="px-4 ">{song.title}</td>
                          <td className="px-4">artist</td>
                        </div>
                      </div>
                      <td className="px-4 py-2">{song.album}</td>
                      <td className="px-4 py-2">{song.dateAdded}</td>
                      <td className="px-4 py-2">{song.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/6 relative bottom-0 right-0 mt-auto rounded-md bg-neutral-800 mb-10">
        {/* <div className="p-5">
          <div className="flex justify-between">
            <FaThumbsUp size={30} />
            <RiPlayListLine size={30} />
          </div>
          <div className="flex flex-col items-center mb-6 justify-center py-3">
            <img
              src={
                "https://i.pinimg.com/564x/69/b7/70/69b770366d3c4a22e33885b5b3c58668.jpg"
              }
              className="rounded-xl object-cover"
              alt=""
              height={250}
              width={250}
            />
            <div className="mt-3">
              <h1>Song Name</h1>
              <h1>Artist Name Name</h1>
            </div>
          </div>

          <div className="action-buttons flex flex-col justify-center items-center min-h-[100px] mt-5 rounded-lg bg-green-500">
            <div className="px-6 w-full">
              <div className="bg-white p-1 w-full px-5 mb-3"></div>
            </div>
            <div className="flex gap-4">
              <TbPlaylistAdd size={30} />
              <IoPlaySkipBack size={30} />
              <FaPlay size={25} />
              <IoPlaySkipForwardSharp size={30} />
              <TbPlaylistAdd size={30} />
            </div>
          </div>
        </div> */}
            <MusicPlayer currSong={currSong} shouldAutoPlay={true} />
            </div>
    </div>
  );
};

export default LikedSong;
