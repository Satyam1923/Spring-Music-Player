"use client";

import React, { useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdRepeat, IoMdShuffle } from "react-icons/io";
import {
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
} from "react-icons/tb";
import { HiDotsHorizontal } from "react-icons/hi";
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
} from "@/store/features/musicPlayer/musicPlayer"; 
import type { RootState } from "@/store/store";

export default function MusicPlayer() {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekbarRef = useRef<HTMLDivElement>(null);

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
    return <div className="text-white p-4">No tracks loaded</div>;
  }

  return (
    <>
      <audio ref={audioRef} src={currentTrack.url} />
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
      <div className="h-16 w-full bg-neutral-950 text-white flex items-center justify-between px-6 gap-4">
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

        <div className="flex items-center gap-4">
          <button onClick={repeatClickHandler}>{getRepeatIcon()}</button>
          <button onClick={playPrevHandler}>
            <TbPlayerSkipBackFilled size={25} />
          </button>
          <button onClick={togglePlayPauseHandler} className="p-2">
            {isPlaying ? <FaPause size={25} /> : <FaPlay size={25} />}
          </button>
          <button onClick={playNextHandler}>
            <TbPlayerSkipForwardFilled size={25} />
          </button>
          <button onClick={shuffleClickHandler}>
            <IoMdShuffle size={25} />
          </button>
        </div>
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
