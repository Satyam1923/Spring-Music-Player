import Image from "next/image";

interface MusicCardProps {
  imageUrl: string;
  songName: string;
  artistName: string;
}

export default function MusicCard({
  imageUrl,
  songName,
  artistName,
}: MusicCardProps) {
  return (
    <div className="w-48 p-2 flex flex-col items-center text-center">
      <div className="h-36 w-36 bg-neutral-800 mb-2 flex items-center justify-center text-white overflow-hidden rounded">
        <Image
          src={imageUrl}
          alt={songName}
          width={144}
          height={144}
          className="object-cover"
        />
      </div>
      <p >{songName}</p>
      <p className="text-sm text-gray-400">{artistName}</p>
    </div>
  );
}
