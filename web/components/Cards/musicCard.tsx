import Image from "next/image";
import { FaPlay } from "react-icons/fa";
interface MusicCardProps {
  imageUrl: string;
  songName: string;
  artistName: string;
  onPlayClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MusicCard({
  imageUrl,
  songName,
  artistName,
  onPlayClick,
}: MusicCardProps) {
  return (
    <div className="w-48 rounded-xl p-2 flex flex-col on items-center text-center transition-transform duration-300 hover:scale-105 group cursor-pointer">
      <div className="relative h-42 w-42 mb-2 flex items-center justify-center text-white overflow-hidden rounded-xl bg-neutral-800">
        <Image
          src={imageUrl}
          alt={songName}
          width={168}
          height={168}
          className="object-cover"
        />

        <div
          className="
            absolute bottom-0 left-0 right-0
            h-35
            pointer-events-none
            bg-gradient-to-t
            from-black
            via-transparent
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
          "
        />

        <button
          onClick={onPlayClick}
          className="
          absolute left-2 bottom-2
          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
        transition-all duration-200
       bg-white
       p-2
      rounded-full
      shadow-lg
       text-black
      flex items-center justify-center
      w-10 h-10
      cursor-pointer
      hover:scale-110
  "
          aria-label={`Play ${songName}`}
        >
          <FaPlay />
        </button>
      </div>
      <p>{songName}</p>
      <p className="text-sm text-gray-400">{artistName}</p>
    </div>
  );
}
