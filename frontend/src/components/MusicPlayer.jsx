import { useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";
import "./styles.scss";
import "./MusicPlayer.css";

import {
  CirclePlay,
  CirclePause,
  Rewind,
  VolumeX,
  Volume2,
  FastForward,
  Repeat2,
} from "lucide-react"; 

function MusicPlayer({ currSong, shouldAutoPlay }) {
  const songName = currSong.name || "Reminder";
  const songImage =
    currSong.img ||
    "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452";
  const artistName = currSong.artist || "The Weeknd";
  const audioUrl = currSong.url || "";
  const audioPlayerRef = useRef(null);

  useEffect(() => {
    if (audioPlayerRef.current && !shouldAutoPlay) {
      audioPlayerRef.current.audio.current.pause();
    }
  }, [currSong]);

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
    <div className="player ">
      <div className="wrapper">
        <a target="_blank" href="https://www.instagram.com/correiamendsss/">
          <img className="playerimg" src={songImage} alt="LogoMusicImage" />
        </a>
        <div className="info">
          <h1>{songName}</h1>
          <p>{artistName}</p>
        </div>

        <div className="controls">
          <AudioPlayer
            ref={audioPlayerRef}
            autoPlay={false}
            className="bg-[#18181D] text-white h-full w-full shadow-none "
            src={audioUrl}
            customIcons={customIcons}
          />
        </div>
      </div>
    </div>

  );
}

export default MusicPlayer;
