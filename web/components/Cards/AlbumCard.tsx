"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AlbumCardProps {
  id: string; 
  imageUrl: string;
  albumName: string;
  artistName: string;
  onPlayClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AlbumCard({
  id,
  imageUrl,
  albumName,
  artistName,
  onPlayClick,
}: AlbumCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/search/album/${id}`);
  };

  return (
    <div
      onClick={handleClick} 
      className="w-48 rounded-xl p-2 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 group cursor-pointer"
    >
      <div className="relative h-42 w-42 mb-2 flex items-center justify-center text-white overflow-hidden rounded-xl bg-neutral-800">
        <Image
          src={imageUrl}
          alt={albumName}
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
      </div>
      <p>{albumName}</p>
      <p className="text-sm text-gray-400">{artistName}</p>
    </div>
  );
}
