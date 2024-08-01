import React, { useEffect, useRef, useState } from "react";
import { PiPlaylistBold } from "react-icons/pi";
import { AiFillLike } from "react-icons/ai";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";
import "./styles.scss";
import "../App.css";
import { CirclePlay, CirclePause, Rewind, VolumeX, Volume2, FastForward, Repeat2 } from "lucide-react";

function MusicPlayer({ currSong, shouldAutoPlay, setSongHasEnded }) {
  const [isLiked, setIsLiked] = useState(false);
  const songName = currSong.name || "Reminder";
  const songImage =
    currSong.img || "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452";
  const artistName = currSong.artist || "The Weeknd";
  const audioUrl = currSong.url || "";
  const audioPlayerRef = useRef(null);

  useEffect(() => {
    if (audioPlayerRef.current && !shouldAutoPlay) {
      audioPlayerRef.current.audio.current.pause();
    } else {
      audioPlayerRef.current.audio.current.play();
    }
  }, [currSong]);

  const handleLikeClick = () => {
    setIsLiked(true);
    setTimeout(() => setIsLiked(false), 1000); // Reset after 1 second
  };

  const customIcons = {
    play: <CirclePlay />,
    pause: <CirclePause />,
    rewind: <Rewind />,
    forward: <FastForward />,
    loop: <Repeat2 />,
    volume: <Volume2 />,
    volumeMute: <VolumeX />,
  };

  return (
    <div className="bg-[#18181D] w-full h-full rounded-lg mt-8 ">
      <div className="flex flex-col h-full justify-between p-2">
        {/* Image and like details */}
        <div className="flex h-full pt-6">
          <div
            className={`flex justify-center likeIconOuter w-[20%] h-[20%] ${
              isLiked ? "clicked" : ""
            }`}
          >
            <AiFillLike
              className={` mt-2 likeIcon ${isLiked ? "clicked" : ""}`}
              onClick={handleLikeClick}
              style={{
                color: isLiked ? "red" : "currentColor",
                fontSize: "27px",
              }}
            />
            <div className="vertical-line vertical-line-1"></div>
            <div className="vertical-line vertical-line-2"></div>
            <div className="vertical-line vertical-line-3"></div>
            <div className="vertical-line vertical-line-4"></div>
            <div className="vertical-line vertical-line-5"></div>
          </div>
          {/* Song Image */}
          <div className="flex flex-col justify-start gap-4 h-full w-[60%]">
            <img
              src={songImage}
              alt="song image"
              className="rounded-2xl w-full aspect-square"
            />
            <div className="flex flex-col gap-1">
              <h2 className="text-white font-medium text-2xl">{songName}</h2>
              <h3 className="text-white">{artistName}</h3>
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
            autoPlay={false}
            className="rounded-lg bg-[#83ce89] text-black h-full"
            src={audioUrl}
            customIcons={customIcons}
            onEnded={() => {
              setSongHasEnded(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
