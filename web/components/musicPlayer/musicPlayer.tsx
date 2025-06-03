"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";
import { IoMdRepeat, IoMdShuffle } from "react-icons/io";
import { HiMiniQueueList } from "react-icons/hi2";
import {
  TbRepeat,
} from "react-icons/tb";
import {
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
} from "react-icons/tb";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdClearAll } from "react-icons/md";
import { HiOutlineQueueList } from "react-icons/hi2";
import { MdRepeatOne } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  playNext,
  playPrev,
  togglePlayPause,
  setCurrentTime,
  setDuration,
  toggleRepeatMode,
  shuffle,
  setCurrentTrackIndex,
  clearQueue
} from "@/store/features/musicPlayer/musicPlayer";
import type { RootState } from "@/store/store";
import { useState } from "react";

export default function MusicPlayer() {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekbarRef = useRef<HTMLDivElement>(null);
  const [queueVisible, setQueueVisible] = useState<boolean>(false);
  const {
    tracks,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    repeatMode,
  } = useSelector((state: RootState) => state.musicPlayer);

  const currentTrack =
    currentTrackIndex !== -1 ? tracks[currentTrackIndex] : null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      dispatch(setCurrentTime(audio.currentTime));
    };
    const onLoadedMetadata = () => {
      dispatch(setDuration(audio.duration || 0));
    };

    const onEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play();
      } else if (repeatMode === "all") {
        dispatch(playNext());
      } else {
        if (currentTrackIndex < tracks.length - 1) {
          dispatch(playNext());
        }
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [dispatch, repeatMode, currentTrackIndex, tracks.length]);

  const togglePlayPauseHandler = () => {
    dispatch(togglePlayPause());
  };

  const playNextHandler = () => {
    dispatch(playNext());
  };

  const playPrevHandler = () => {
    dispatch(playPrev());
  };

  const shuffleClickHandler = () => {
    dispatch(shuffle());
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!seekbarRef.current || !audioRef.current) return;
    const rect = seekbarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    dispatch(setCurrentTime(newTime));
  };

  const repeatClickHandler = () => {
    dispatch(toggleRepeatMode());
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case "off":
        return <IoMdRepeat size={25} className="text-gray-400" />;
      case "all":
        return <IoMdRepeat size={25} className="text-white" />;
      case "one":
        return (
          <div className="relative">
            <MdRepeatOne size={25} className="text-white" />
          </div>
        );
    }
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

  if (!currentTrack) {
    return (
      <div
        className="w-full h-16 flex items-center justify-between px-6 gap-4 rounded-lg text-gray-500 select-none cursor-not-allowed"
        style={{
          background: "rgba(10, 10, 10, 0.3)",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderRadius: "15px",
          border: "1px solid rgba(255, 255, 255, 0.07)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-neutral-700 rounded animate-pulse" />
          <div className="flex flex-col gap-1">
            <div className="w-32 h-4 bg-neutral-700 rounded animate-pulse" />
            <div className="w-20 h-3 bg-neutral-600 rounded animate-pulse" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            disabled
            aria-label="Repeat"
            className="opacity-50 cursor-not-allowed"
          >
            <TbRepeat size={25} />
          </button>
          <button disabled className="opacity-50 cursor-not-allowed">
            <TbPlayerSkipBackFilled size={25} />
          </button>
          <button disabled className="p-2 opacity-50 cursor-not-allowed">
            <FaPlay size={25} />
          </button>
          <button disabled className="opacity-50 cursor-not-allowed">
            <TbPlayerSkipForwardFilled size={25} />
          </button>
          <button disabled className="opacity-50 cursor-not-allowed">
            <IoMdShuffle size={25} />
          </button>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="opacity-50 select-none">--:-- / --:--</span>
          <button disabled className="opacity-50 cursor-not-allowed">
            <HiOutlineQueueList size={25} />
          </button>
          <button disabled className="opacity-50 cursor-not-allowed">
            <HiDotsHorizontal size={25} />
          </button>
        </div>
      </div>
    );
  }
  
  
  return (
    <>
      <audio ref={audioRef} src={currentTrack.url} />
      <div
        className="w-full h-1 bg-neutral-900 relative cursor-pointer"
        onClick={handleSeek}
        ref={seekbarRef}
      >
        <div
          className="absolute top-0 left-0 h-1 bg-[#EFCADF]"
          style={{ width: progressPercent }}
        />
      </div>
      <AnimatePresence>
        {queueVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "rgba(10, 10, 10, 0.3)",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.9)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              borderRadius: "15px",
              border: "1px solid rgba(255, 255, 255, 0.07)",
            }}
            className="absolute bottom-20 w-72 right-4 text-white p-4 rounded-2xl shadow-lg z-50"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Queue</h2>
              <button
                className="text-gray-300 hover:text-white transition-colors duration-200 p-1 rounded-md hover:bg-neutral-800"
                aria-label="Clear Queue"
              >
                <MdClearAll size={22} onClick={()=>{
                  dispatch(clearQueue());
                }} />
              </button>
            </div>
            <ul className="max-h-60 overflow-y-auto text-sm space-y-2">
              {tracks.map((track, index) => (
                <li
                  key={index}
                  className="p-2 flex items-center gap-3 rounded cursor-pointer hover:bg-neutral-800"
                  onClick={() => dispatch(setCurrentTrackIndex(index))}
                >
                  <div className="relative w-10 h-10">
                    <Image
                      src={track.photo}
                      alt={track.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                    {index === currentTrackIndex && (
                      <div className="absolute inset-0 flex items-center justify-center rounded">
                        <FaPlay className="text-white text-xs" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{track.title}</span>
                    <span className="text-xs font-extralight text-white">
                      {track.album}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="h-16 w-full text-white flex items-center justify-between px-6 gap-4 rounded-lg"
        style={{
          background: "rgba(10, 10, 10, 0.3)",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderRadius: "15px",
          border: "1px solid rgba(255, 255, 255, 0.07)",
        }}
      >
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

        <div className="flex items-center gap-4 cursor-pointer">
          <button className="cursor-pointer" onClick={repeatClickHandler}>
            {getRepeatIcon()}
          </button>
          <button onClick={playPrevHandler}>
            <TbPlayerSkipBackFilled size={25} className="cursor-pointer" />
          </button>
          <button
            onClick={togglePlayPauseHandler}
            className="p-2 cursor-pointer"
          >
            {isPlaying ? <FaPause size={25} /> : <FaPlay size={25} />}
          </button>
          <button onClick={playNextHandler} className="cursor-pointer">
            <TbPlayerSkipForwardFilled size={25} />
          </button>
          <button className="cursor-pointer" onClick={shuffleClickHandler}>
            <IoMdShuffle size={25} />
          </button>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-300">
          <span>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              setQueueVisible(!queueVisible);
            }}
          >
            {queueVisible ? (
              <HiMiniQueueList size={25} />
            ) : (
              <HiOutlineQueueList size={25} />
            )}
          </motion.button>
          <button className="cursor-pointer"></button>
          <button className="cursor-pointer">
            <HiDotsHorizontal size={25} />
          </button>
        </div>
      </div>
    </>
  );
}
