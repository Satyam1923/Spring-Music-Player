"use client";
import { useState, useEffect } from "react";
import MusicCard from "@/components/Cards/musicCard";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import MusicCardPlaceholder from "@/components/Cards/musicCardPlaceHolder";
import {
  setTracks,
  setCurrentTrackIndex,
  play,
} from "@/store/features/musicPlayer/musicPlayer";
import type { RootState } from "@/store/store";
import { decode } from "he";

interface Image {
  quality: string;
  url: string;
}

interface DownloadUrl {
  quality: string;
  url: string;
}

interface Artist {
  name: string;
}

interface Album {
  name: string;
}

interface MusicItem {
  id: string;
  name: string;
  image: Image[];
  type: string;
  primaryArtists?: string; 
  artists?: { primary: Artist[] };
  url: string;
  language: string;
  album?: Album;
  downloadUrl?: DownloadUrl[];
}

interface SearchResponse {
  success: boolean;
  data: {
    results: MusicItem[];
  };
}

interface Track {
  title: string;
  album: string;
  photo: string;
  url: string;
}

export default function Search() {
  const searchParams = useSearchParams();
  const query: string = searchParams.get("q")?.trim().toLowerCase() || "";
  const filters: string[] = ["Top Results", "Songs"];
  const [activeFilter, setActiveFilter] = useState<string>("Top Results");
  const [searchResults, setSearchResults] = useState<MusicItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const tracks = useSelector((state: RootState) => state.musicPlayer.tracks);
  const musicData: MusicItem[] = [];

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setSearchResults(musicData);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      const url = process.env.NEXT_PUBLIC_API_URL;
      try {
        const response = await axios.get<SearchResponse>(
          `${url}/songs?song=${encodeURIComponent(query)}`
        );

        const songResults: MusicItem[] = response.data.data.results || [];

        const uniqueResults = Array.from(
          new Map(
            songResults.map((item) => [`${item.type}-${item.id}`, item])
          ).values()
        );

        setSearchResults(uniqueResults.length > 0 ? uniqueResults : musicData);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch search results.";
        console.error("Error fetching search results:", err);
        setError(errorMessage);
        setSearchResults(musicData);
      } finally {
        setIsLoading(false);
      }
    };

    if (query && activeFilter === "Top Results") {
      setActiveFilter("Songs");
    }

    fetchSearchResults();
  }, [query]);

  const handleSongClick = (item: MusicItem) => {
    const track: Track = {
      title: decode(item.name || "Unknown Title"),
      album: decode(item.album?.name || "Unknown Album"),
      photo: item.image?.[2]?.url || "",
      url: item.downloadUrl?.[4]?.url || "",
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

  const handlePlayClick = (e: React.MouseEvent, item: MusicItem) => {
    e.stopPropagation();
    handleSongClick(item);
  };


const filteredData: MusicItem[] = searchResults.filter((item) => {
  const decodedName = decode(item.name || "").toLowerCase();
  const decodedPrimaryArtist = decode(
    item.artists?.primary[0]?.name || ""
  ).toLowerCase();
  const decodedPrimaryArtists = decode(item.primaryArtists || "").toLowerCase();
  const matchesFilter =
    activeFilter === "Top Results" || item.type.toLowerCase() === "song";

  const matchesQuery =
    !query ||
    decodedName.includes(query.toLowerCase()) ||
    decodedPrimaryArtist.includes(query.toLowerCase()) ||
    decodedPrimaryArtists.includes(query.toLowerCase());

  return matchesFilter && matchesQuery;
});


  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar />
        <div className="h-full w-px bg-neutral-800" />
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.map((label) => (
              <Link
                href="#"
                key={label}
                onClick={() => setActiveFilter(label)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeFilter === label
                    ? "bg-[#F695C5] text-black"
                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white"
                }`}
                aria-current={activeFilter === label ? "true" : "false"}
              >
                {label}
              </Link>
            ))}
          </div>

          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 18 }).map((_, idx) => (
                <MusicCardPlaceholder key={idx} />
              ))}
            </div>
          )}
          {error && (
            <p className="text-red-500 col-span-full text-center py-8">
              {error}
            </p>
          )}

          {query && !isLoading && !error && (
            <h2 className="text-lg font-semibold mb-4">
              Search Results for &quot;{query}&quot;
            </h2>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredData.length > 0 ? (
              filteredData.map((item) => {
                const handlePlayClick = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleSongClick(item);
                };
                return (
                  <MusicCard
                    key={`${item.type}-${item.id}`}
                    imageUrl={
                      item.image.find((img) => img.quality === "500x500")
                        ?.url || ""
                    }
                    songName={decode(item.name || "Unknown Title")}
                    artistName={decode(
                      item.artists?.primary[0]?.name ||
                        item.primaryArtists ||
                        "Unknown Artist"
                    )}
                    onPlayClick={handlePlayClick}
                  />
                );
              })
            ) : (
              <p className="text-neutral-400 col-span-full text-center py-8">
                {query
                  ? `No results found for "${query}" in ${activeFilter}.`
                  : `Select a filter to see results.`}
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
