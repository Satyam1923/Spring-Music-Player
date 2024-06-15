import React, { useState, useRef, useEffect } from "react";
import { PiPlaylistBold } from "react-icons/pi";
import { AiFillLike } from "react-icons/ai";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { fetchTopSongs } from "../Utils";

function MusicPlayer({ currSong, shouldAutoPlay, handleClickPrevious, handleClickNext }) {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioPlayerRef = useRef(null);

  useEffect(() => {
    const loadTopSongs = async () => {
      try {
        setIsLoading(true);
        await fetchTopSongs(setSongs);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    if (!currSong) {
      loadTopSongs();
    } else {
      setIsLoading(false);
    }
  }, [currSong]);

  useEffect(() => {
    if (audioPlayerRef.current && shouldAutoPlay) {
      audioPlayerRef.current.audio.current.play();
    }
  }, [currSong, shouldAutoPlay]);

  useEffect(() => {
    if (audioPlayerRef.current && songs.length > 0) {
      audioPlayerRef.current.audio.current.pause();
      audioPlayerRef.current.audio.current.load();
      audioPlayerRef.current.audio.current.play();
    }
  }, [currentSongIndex, songs]);

  const handlePrevClick = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex === 0 ? songs.length - 1 : prevIndex - 1));
    handleClickPrevious();
  };

  const handleNextClick = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex === songs.length - 1 ? 0 : prevIndex + 1));
    handleClickNext();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const songToDisplay = currSong || songs[currentSongIndex];

  return (
    <div className="bg-[#18181D] w-full h-full rounded-lg">
      <div className="flex flex-col h-full justify-between p-2">
        {/* Image and like details */}
        <div className="flex h-full pt-6">
          <div className="flex justify-center h-full w-[20%]">
            <AiFillLike className="scale-[1.5] mt-2 hover:cursor-pointer" />
          </div>
          {/* Song Image */}
          <div className="flex flex-col justify-start gap-4 h-full w-[60%]">
            {songToDisplay?.image && (
              <img src={songToDisplay.image[2].url} alt="song image" className="rounded-2xl w-full aspect-square" />
            )}
            <div className="flex flex-col gap-1">
              <h2 className="text-white font-medium text-2xl">{songToDisplay?.name || "Unknown Song"}</h2>
              <h3 className="text-white">{songToDisplay?.artists?.primary?.[0]?.name || "Unknown Artist"}</h3>
              <h4 className="text-white">{songToDisplay?.year || "Unknown Year"}</h4>
            </div>
          </div>
          <div className="flex justify-center h-full w-[20%]">
            <PiPlaylistBold className="scale-[1.5] mt-2 hover:cursor-pointer" />
          </div>
        </div>
        {/* Audio Player */}
        <div className="h-[30%] rounded-lg">
          <AudioPlayer
            ref={audioPlayerRef}
            autoPlay={shouldAutoPlay}
            className="rounded-lg bg-[#5773FF] text-white h-full"
            src={songToDisplay?.downloadUrl?.[0]?.url || ""}
            onClickPrevious={handlePrevClick}
            onClickNext={handleNextClick}
            showSkipControls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            isPlaying={isPlaying}
          />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;


