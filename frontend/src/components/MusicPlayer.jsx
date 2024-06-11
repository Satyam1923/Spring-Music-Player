import React, { useState, useRef, useEffect } from "react";
import { PiPlaylistBold } from "react-icons/pi";
import { AiFillLike } from "react-icons/ai";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const songs = [
  {
    name: "Reminder",
    image: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
    artist: "The Weeknd",
    url: "/audios/Remainder.mp3",
  },
  {
    name: "Perfect",
    image: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
    artist: "Ed Sheeran",
    url: "/audios/perfect.mp3",
  },
  {
    name: "Deja Vu",
    image: "https://img.youtube.com/vi/cii6ruuycQA/maxresdefault.jpg",
    artist: "Olivia Rodrigo",
    url: "/audios/dejaVu.mp3",
  },
  // Add more songs as needed
];

function MusicPlayer({ shouldAutoPlay }) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayerRef = useRef(null);

  const handleClickPrevious = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  const handleClickNext = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === songs.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (audioPlayerRef.current && !shouldAutoPlay) {
      audioPlayerRef.current.audio.current.pause();
      audioPlayerRef.current.audio.current.load();
      audioPlayerRef.current.audio.current.play();
    }
  }, [currentSongIndex]);


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
            <img src={songs[currentSongIndex].image} alt="song image" className="rounded-2xl w-full aspect-square" />
            <div className="flex flex-col gap-1">
              <h2 className="text-white font-medium text-2xl">{songs[currentSongIndex].name}</h2>
              <h3 className="text-white">{songs[currentSongIndex].artist}</h3>
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
            src={songs[currentSongIndex].url}
            onClickPrevious={handleClickPrevious}
            onClickNext={handleClickNext}
            showSkipControls
            onClickPlay={() => setIsPlaying(true)}
            onClickPause={() => setIsPlaying(false)}
            playing={isPlaying}
          />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
