import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Style.css";
import Sidebar from "../components/Share_UI/Sidebar";
import Header from "../components/Share_UI/Header";
import MusicCard from "../components/Share_UI/MusicCard";
import { CircleDashed } from "phosphor-react";

const SearchResultPage = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioid, setAudioid] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleSidebar, settoggleSidebar] = useState(false);

  // For the Developement mode
  // const fetchSongData = async () => {
  //   settoggleSidebar(false);
  //   setloading(true);
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_BACKEND_URL}search`,
  //       {
  //         params: { song: searchQuery },
  //       }
  //     );
  //     setData(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setloading(false);
  // };

  // For Produiction mode
  const fetchSongData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL, {
        params: { song: searchQuery },
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlay = (songUrl, songId) => {
    if (audioid == songId) {
      setAudioid(null);
    } else {
      setAudioid(songId);
    }

    if (currentSongUrl === songUrl && audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      if (audio) {
        audio.pause(); // Pause the current audio
      }
      const newAudio = new Audio(songUrl);
      console.log(newAudio);
      newAudio.play();
      setAudio(newAudio);
      setCurrentSongUrl(songUrl);
    }
  };

  return (
    <div className="main">
      <div className="gradient pink"></div>
      <div className="gradient blue"></div>

      <div className="content">
        <Sidebar
          toggleSidebar={toggleSidebar}
          fetchSongData={fetchSongData}
          searchQuery={searchQuery}
          settoggleSidebar={settoggleSidebar}
          setSearchQuery={setSearchQuery}
        />

        <div className="hero">
          <Header settoggleSidebar={settoggleSidebar} />

          <div className="search-content">
            <h1>Search Result</h1>
            <div className="result-grid">
              {data.length > 0 ? (
                data?.map((song) => (
                  <MusicCard
                    key={song.id}
                    song={song}
                    isPlaying={audioid === song.id}
                    handlePlay={() => handlePlay(song.url, song.id)}
                  />
                ))
              ) : loading ? (
                <div className="loading">
                  <CircleDashed className="i" />
                </div>
              ) : (
                <h1 className="no">No Song</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
