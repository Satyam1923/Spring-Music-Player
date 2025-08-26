"use client";
import { decode } from "he";
import { fetchSongs } from "@/lib/fetchSong";
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
export default function Home() {
  const dispatch = useDispatch();
  const tracks = useSelector((state: RootState) => state.musicPlayer.tracks);
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTrendingSongs() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSongs("top songs");
        setSongs(data.data.results || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadTrendingSongs();
  }, []);

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
          <h1 className="text-2xl mb-4">Trending Now</h1>
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
                  const handlePlayClick = (e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleSongClick(song);
                  };
                  return (
                    <div key={song.id}>
                      <MusicCard
                        imageUrl={imageUrl}
                        songName={songName}
                        artistName={artistName}
                        onPlayClick={handlePlayClick}
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
