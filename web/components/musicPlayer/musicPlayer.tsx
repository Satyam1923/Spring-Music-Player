"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdRepeat, IoMdShuffle } from "react-icons/io";
import { HiMiniQueueList, HiOutlineQueueList } from "react-icons/hi2";
import {
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
} from "react-icons/tb";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdClearAll, MdRepeatOne } from "react-icons/md";
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
  clearQueue,
} from "@/store/features/musicPlayer/musicPlayer";
import type { RootState } from "@/store/store";

export default function MusicPlayer() {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekbarRef = useRef<HTMLDivElement>(null);

  const [queueVisible, setQueueVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);

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

  /** ---- Auto Play/Pause ---- */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play();
    else audio.pause();
  }, [isPlaying, currentTrackIndex]);

  /** ---- Audio Event Listeners ---- */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => dispatch(setCurrentTime(audio.currentTime));
    const onLoadedMetadata = () => dispatch(setDuration(audio.duration || 0));
    const onEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play();
      } else if (repeatMode === "all") {
        dispatch(playNext());
      } else if (currentTrackIndex < tracks.length - 1) {
        dispatch(playNext());
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

  /** ---- Handlers ---- */
  const togglePlayPauseHandler = () => dispatch(togglePlayPause());
  const playNextHandler = () => dispatch(playNext());
  const playPrevHandler = () => dispatch(playPrev());
  const shuffleClickHandler = () => dispatch(shuffle());
  const repeatClickHandler = () => dispatch(toggleRepeatMode());

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!seekbarRef.current || !audioRef.current) return;
    const rect = seekbarRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    dispatch(setCurrentTime(newTime));
  };

  /** ---- Helpers ---- */
  const getRepeatIcon = () => {
    switch (repeatMode) {
      case "off":
        return (
          <IoMdRepeat size={22} className="text-gray-500 hover:text-white" />
        );
      case "all":
        return <IoMdRepeat size={22} className="text-pink-400" />;
      case "one":
        return <MdRepeatOne size={22} className="text-pink-400" />;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const progressPercent =
    duration > 0 ? `${(currentTime / duration) * 100}%` : "0%";

  /** ---- Empty Player ---- */
  if (!currentTrack) {
    return (
      <div
        className="w-full h-16 flex items-center justify-between px-6 gap-4 text-gray-400 cursor-not-allowed rounded-lg"
        style={{
          background: "rgba(20, 20, 20, 0.35)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-neutral-700 rounded animate-pulse" />
          <div className="flex flex-col gap-1">
            <div className="w-28 h-3 bg-neutral-700 rounded animate-pulse" />
            <div className="w-16 h-2 bg-neutral-600 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <audio ref={audioRef} src={currentTrack.url} />

      {/* ---- Progress Bar ---- */}
      <div
        className="w-full h-1 bg-neutral-900 relative cursor-pointer"
        onClick={handleSeek}
        ref={seekbarRef}
      >
        <div
          className="absolute top-0 left-0 h-1 bg-pink-400 rounded-full"
          style={{ width: progressPercent }}
        />
      </div>

      {/* ---- Queue Popup (Right) ---- */}
      <AnimatePresence>
        {queueVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-20 right-4 w-72 text-white p-4 rounded-xl shadow-lg z-50"
            style={{
              background: "rgba(20,20,20,0.5)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold">Queue</h2>
              <button
                className="text-gray-300 hover:text-red-400"
                onClick={() => dispatch(clearQueue())}
              >
                <MdClearAll size={22} />
              </button>
            </div>
            <ul className="max-h-60 overflow-y-auto space-y-2">
              {tracks.map((track, index) => (
                <li
                  key={index}
                  className={`p-2 flex items-center gap-3 rounded cursor-pointer hover:bg-neutral-800 transition ${
                    index === currentTrackIndex ? "bg-neutral-800" : ""
                  }`}
                  onClick={() => dispatch(setCurrentTrackIndex(index))}
                >
                  <div className="relative w-10 h-10">
                    <Image
                      src={track.photo}
                      alt={track.title}
                      fill
                      className="rounded object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{track.title}</span>
                    <span className="text-xs text-gray-400">{track.album}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Track Details Popup (Left) ---- */}
      <AnimatePresence>
        {detailsVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-20 left-4 w-80 text-white p-4 rounded-xl shadow-lg z-50"
            style={{
              background: "rgba(20,20,20,0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Cover Image */}
            <div className="w-full h-44 relative mb-3">
              <Image
                src={currentTrack.photo}
                alt={currentTrack.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Info */}
            <h2 className="text-lg font-bold">{currentTrack.title}</h2>
            <p className="text-sm text-gray-400">{currentTrack.album}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Bottom Controls ---- */}
      <div
        className="h-16 w-full px-6 flex items-center justify-between gap-4 text-white rounded-lg"
        style={{
          background: "rgba(20,20,20,0.45)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Left: Track Info (Click to open details popup) */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => setDetailsVisible(!detailsVisible)}
        >
          <img
            src={currentTrack.photo}
            alt={currentTrack.album}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex flex-col">
            <div className="text-sm font-semibold">{currentTrack.title}</div>
            <div className="text-xs text-gray-400">{currentTrack.album}</div>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={repeatClickHandler}
            className="cursor-pointer"
          >
            {getRepeatIcon()}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={playPrevHandler}
            className="cursor-pointer"
          >
            <TbPlayerSkipBackFilled size={22} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={togglePlayPauseHandler}
            className="px-3 py-2 rounded-full bg-pink-500 hover:bg-pink-600 cursor-pointer"
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={playNextHandler}
            className="cursor-pointer"
          >
            <TbPlayerSkipForwardFilled size={22} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={shuffleClickHandler}
            className="cursor-pointer"
          >
            <IoMdShuffle size={22} />
          </motion.button>
        </div>

        {/* Right: Timer + Queue */}
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="cursor-pointer">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setQueueVisible(!queueVisible)}
            className="cursor-pointer"
          >
            {queueVisible ? (
              <HiMiniQueueList size={22} />
            ) : (
              <HiOutlineQueueList size={22} />
            )}
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} className="cursor-pointer">
            <HiDotsHorizontal size={22} />
          </motion.button>
        </div>
      </div>
    </>
  );
}
