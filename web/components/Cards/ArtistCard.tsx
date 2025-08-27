"use client";

import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { useState } from "react";

interface ArtistCardProps {
  imageUrl: string;
  artistName: string;
  onPlayClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ArtistCard({
  imageUrl,
  artistName,
}: ArtistCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-48 rounded-xl p-2 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 group cursor-pointer">
      <div className="relative w-40 h-40 mb-2 flex items-center justify-center overflow-hidden rounded-full bg-neutral-800">
        {!imgError && imageUrl ? (
          <Image
            src={imageUrl}
            alt={artistName}
            width={160}
            height={160}
            className="object-cover w-full h-full rounded-full"
            onError={() => setImgError(true)}
          />
        ) : (
          <FaUser className="w-20 h-20 text-gray-500" />
        )}

        <div
          className="
            absolute bottom-0 left-0 right-0
            h-1/2
            pointer-events-none
            bg-gradient-to-t
            from-black
            via-transparent
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
            rounded-b-full
          "
        />
      </div>
      <p className="text-sm text-gray-400 truncate w-full">{artistName}</p>
    </div>
  );
}
