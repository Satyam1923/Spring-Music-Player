import React from "react";
import { Link, useOutletContext } from "react-router-dom";

function SearchAlbums() {
  const context = useOutletContext();
  const albums = context.albums;

  return (
    <div className="bg-[#18181D] p-2 w-full h-full rounded-lg">
      <div className="flex flex-col p-2 gap-5 w-full h-full">
        <div className="flex h-[90%] gap-4 md:gap-8 flex-wrap">
          {albums.slice(0, 5).map((album, index) => (
            <AlbumElement key={index} album={album} />
          ))}
        </div>
        <div className="flex h-[90%] gap-4 md:gap-8 flex-wrap">
          {albums.slice(5, 10).map((album, index) => (
            <AlbumElement key={index} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AlbumElement({ album }) {
  const imageUrl =
    album.images && album.images[2] ? album.images[2].url : "defaultImageUrl";
  const artistName =
    album.primaryArtists && album.primaryArtists[0]
      ? album.primaryArtists[0].name
      : "Unknown Artist";
  return (
    <div className="flex flex-1 flex-col max-w-full justify-center  gap-3 hover:cursor-pointer">
      <Link to={`/album/${album.id}`}>
        <div className="flex justify-center rounded-lg p-4">
          <img
            className="h-full w-full rounded-lg"
            src={imageUrl}
            alt={`${album.name} album cover`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm text-white">{album.name}</h2>
          <h4 className="text-xs text-white">{`${artistName} - ${album.year}`}</h4>
        </div>
      </Link>
    </div>
  );
}

export default SearchAlbums;
