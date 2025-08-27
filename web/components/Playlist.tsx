"use client";
import { decode } from "he";
import MusicCard from "@/components/Cards/musicCard";
import Sidebar from "@/components/sidebar";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTracks,
  setCurrentTrackIndex,
  play,
} from "@/store/features/musicPlayer/musicPlayer";
import type { RootState } from "@/store/store";
import MusicCardPlaceholder from "@/components/Cards/musicCardPlaceHolder";

export default function Playlist({ id }: { id: string }) {
  const dispatch = useDispatch();
  const tracks = useSelector((state: RootState) => state.musicPlayer.tracks);

  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAlbumSongs() {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/playlist/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch album");
        const data = await res.json();
        setSongs(data.songs || []);
        console.log(data.songs);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadAlbumSongs();
  }, [id]);

  const handleSongClick = (song: any) => {
    const track = {
      title: decode(song.name || "Unknown Title"),
      album: decode(song.album?.name || song.albumName || "Unknown Album"),
      photo: song.image?.[2]?.url || "",
      url: song.downloadUrl?.[4]?.url || "",
    };

    if (!track.url) {
      console.warn("No audio URL found for track:", track);
      return;
    }

    const updatedTracks = [...tracks, track];
    dispatch(setTracks(updatedTracks));
    dispatch(setCurrentTrackIndex(updatedTracks.length - 1));
    dispatch(play());
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar />
        <div className="flex-1 bg-black p-5 text-white overflow-y-auto">
          <h1 className="text-2xl mb-4">Playlist</h1>
          {error && <p className="text-red-500">Error: {error}</p>}

          <div className="m-2 flex flex-wrap gap-4">
            {loading
              ? Array.from({ length: 18 }).map((_, idx) => (
                  <MusicCardPlaceholder key={idx} />
                ))
              : songs.map((song: any) => {
                  const imageUrl = song.image?.[2]?.url || "";
                  const songName = decode(song.name || "Unknown Title");
                  const artistName = decode(
                    song.artists?.primary?.[0]?.name || "Unknown Artist"
                  );
                  return (
                    <div key={song.id}>
                      <MusicCard
                        imageUrl={imageUrl}
                        songName={songName}
                        artistName={artistName}
                        onPlayClick={() => handleSongClick(song)}
                      />
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}
