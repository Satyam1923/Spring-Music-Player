import React from 'react'
import { PiPlaylistBold } from "react-icons/pi";
import { AiFillLike } from "react-icons/ai";
import AudioPlayer from "react-h5-audio-player";

function MusicPlayer({ songName, artistName, audioUrl }) {
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
              <img
                src="https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452"
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
              className="rounded-lg bg-[#5773FF] text-white h-full"
              autoPlay
              src={audioUrl}
            />
          </div>
        </div>
      </div>
    );
  }
  
export default MusicPlayer;