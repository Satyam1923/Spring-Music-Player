"use client";

import React, { useEffect, useState } from "react";
import MusicPlayer from "./MusicPlayer";
import Navbar from "./Navbar";
import { FaAngleLeft, FaAngleRight, FaPlay } from "react-icons/fa";
import { RiPlayListLine } from "react-icons/ri";
import {
  fetchAlbumsbySongName,
  fetchArtistsbySongName,
  fetchSongData,
  fetchTopSongs,
} from "../Utils";
import { useParams } from "react-router-dom";
import axios from "axios";

// when user click on particular album, this page will be rendered
const Album = () => {
  const params = useParams();

  const [currSong, setCurrSong] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    fetchAlbumsbySongName("top songs", setAlbums);

    const fetchData = async () => {
      // const response = await fetchTopSongs(setTopSongs);
      // console.log("res", response);

      console.log("Song id is " + params.id);

      const apiUrl = `https://jio-savaan-private.vercel.app/api/albums?id=${encodeURIComponent(
        params.id
      )}`;

      try {
        const respone = await axios.get(apiUrl);
        setArtists(respone.data.data);
        console.log("another", respone.data);
        setTopSongs(respone.data.data.songs);
      } catch (error) {
        response.json({ error: "Internal server error" });
      }
    };

    fetchData();
    // getAlbumsSong();
  }, [params.id]);

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
                src={artists && artists.image[1].url}
                className="rounded-xl object-cover"
                alt=""
                height={250}
                width={250}
              />
            </div>
            <div className="playlist-info text-white w-full mt-auto mb-4">
              <h1 className="text-8xl font-sans font-bold mb-4">
                {artists && artists.name}
              </h1>
              <div className="flex items-center mt-2 justify-between">
                <div className="flex px-2">
                  <h1 className="font-bold hover:underline hover:cursor-pointer">
                    {artists && artists.artist}
                  </h1>
                  <li className="hover:underline hover:cursor-pointer ml-5">
                    {artists && artists.description}
                  </li>
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
                    <th className="px-4 py-2 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {topSongs.slice(0, 10).map((song, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-600 py-2 hover:bg-gray-700"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <div className="flex items-center">
                        <div className="img">
                          <img
                            src={song.image[0].url}
                            height={50}
                            width={50}
                            alt=""
                          />
                        </div>
                        <div className="detail flex flex-col py-2 mr-40">
                          <td className="px-4 ">{song.name}</td>
                          <td className="px-4">{song.artist}</td>
                        </div>
                      </div>
                      <td className="px-4 py-2">{song.album.name}</td>
                      <td className="px-4 py-2">{song.year}</td>
                      <td className="px-4 py-2">{song.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[30%] min-w-[300px] h-[64vh] rounded-lg mt-[20vh]">
                <MusicPlayer
                  currSong={currSong}
                  shouldAutoPlay={true}
                />
              </div>
    </div>
  );
};

export default Album;
