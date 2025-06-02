"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdRepeat, IoMdShuffle } from "react-icons/io";
import {
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
} from "react-icons/tb";
import { HiDotsHorizontal } from "react-icons/hi";

const tracks = [
  {
    title: "Ishq Hai",
    album: "Mismatched",
    photo:
      "https://c.saavncdn.com/839/Mismatched-Season-3-Soundtrack-from-the-Netflix-Series-Hindi-2024-20241217204803-500x500.jpg",
    url: "https://aac.saavncdn.com/839/3fa043cef3f8a211a0a6115711ae2f6b_160.mp4",
  },
  {
    title: "Agar Tum Saath ho",
    album: "Tamasha",
    photo: "https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg",
    url: "https://aac.saavncdn.com/994/2e6b47719cea3e7c9f971a3f1ddc9b0a_160.mp4",
  },
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekbarRef = useRef<HTMLDivElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = seekbarRef.current?.getBoundingClientRect();
    if (!rect || !audioRef.current) return;
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progressPercent =
    duration > 0 ? `${(currentTime / duration) * 100}%` : "0%";

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <>
      <audio ref={audioRef} src={currentTrack.url} />

      {/* Seekbar */}
      <div
        className="w-full h-1 bg-black relative cursor-pointer"
        onClick={handleSeek}
        ref={seekbarRef}
      >
        <div
          className="absolute top-0 left-0 h-1 bg-[#EFCADF]"
          style={{ width: progressPercent }}
        />
      </div>

      {/* Music Player Main Panel */}
      <div className="h-16 w-full bg-[#202020] text-white flex justify-between items-center px-6">
        {/* Track Info */}
        <div className="flex items-center gap-4">
          <img
            src={currentTrack.photo}
            alt={currentTrack.album}
            className="w-12 h-12 rounded"
          />
          <div className="flex flex-col gap-1">
            <div className="text-sm font-semibold">{currentTrack.title}</div>
            <div className="text-xs text-gray-300">{currentTrack.album}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button>
            <IoMdRepeat size={25} />
          </button>
          <button onClick={playPrev}>
            <TbPlayerSkipBackFilled size={25} />
          </button>
          <button onClick={togglePlayPause} className="p-2">
            {isPlaying ? <FaPause size={25} /> : <FaPlay size={25} />}
          </button>
          <button onClick={playNext}>
            <TbPlayerSkipForwardFilled size={25} />
          </button>
          <button>
            <IoMdShuffle size={25} />
          </button>
        </div>

        {/* Extras: HiDots + Time */}
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <span>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <button>
            <HiDotsHorizontal size={25} />
          </button>
        </div>
      </div>
    </>
  );
}
