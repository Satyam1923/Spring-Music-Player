"use client";
import { useState, useEffect } from "react";
import MusicCard from "@/components/Cards/musicCard";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import MusicCardPlaceholder from "@/components/Cards/musicCardPlaceHolder";
import AlbumCard from "@/components/Cards/AlbumCard";
import ArtistCard from "@/components/Cards/ArtistCard";
import PlaylistCard from "@/components/Cards/PlaylistCard";
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

interface AlbumItem {
  id: string;
  name: string;
  image: Image[];
  artists?: { primary: Artist[] };
  type: string;
}

interface ArtistItem {
  id: string;
  name: string;
  image: Image[];
  type: string;
}

interface PlaylistItem {
  id: string;
  name: string;
  image: Image[];
  type: string;
}

interface SearchResponse<T> {
  success: boolean;
  data: {
    results: T[];
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
  const query: string = searchParams?.get("q")?.trim().toLowerCase() || "";
  const filters: string[] = ["Songs", "Albums", "Artists", "Playlists"];
  const [activeFilter, setActiveFilter] = useState<string>("Songs");
  const [searchResults, setSearchResults] = useState<
    (MusicItem | AlbumItem | ArtistItem | PlaylistItem)[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const tracks = useSelector((state: RootState) => state.musicPlayer.tracks);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setSearchResults([]);
        setError(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const endpoints: Record<string, string> = {
        Songs: `${baseUrl}/songs?song=${encodeURIComponent(query)}`,
        Albums: `${baseUrl}/albums?album=${encodeURIComponent(query)}`,
        Artists: `${baseUrl}/artists?artist=${encodeURIComponent(query)}`,
        Playlists: `${baseUrl}/playlists?playlist=${encodeURIComponent(query)}`,
      };

      const endpoint = endpoints[activeFilter];

      try {
        let results: (MusicItem | AlbumItem | ArtistItem | PlaylistItem)[] = [];

        if (activeFilter === "Songs") {
          const response = await axios.get<SearchResponse<MusicItem>>(endpoint);
          results = response.data.data.results || [];
        } else if (activeFilter === "Albums") {
          const response = await axios.get<SearchResponse<AlbumItem>>(endpoint);
          results = response.data.data.results || [];
        } else if (activeFilter === "Artists") {
          const response = await axios.get<SearchResponse<ArtistItem>>(
            endpoint
          );
          results = response.data.data.results || [];
        } else if (activeFilter === "Playlists") {
          const response = await axios.get<SearchResponse<PlaylistItem>>(
            endpoint
          );
          results = response.data.data.results || [];
        }

        const uniqueResults = Array.from(
          new Map(
            results.map((item) => [`${item.type}-${item.id}`, item])
          ).values()
        );
        setSearchResults(uniqueResults);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch search results.";
        console.error("Error fetching search results:", err);
        setError(errorMessage);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, activeFilter]);

  const handleSongClick = (item: MusicItem) => {
    const track: Track = {
      title: decode(item.name || "Unknown Title"),
      album: decode(item.album?.name || "Unknown Album"),
      photo: item.image?.find((img) => img.quality === "500x500")?.url || "",
      url: item.downloadUrl?.find((dl) => dl.quality === "320kbps")?.url || "",
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

  const filteredData = searchResults.filter((item) => {
    const name = "name" in item ? item.name : "";
    const decodedName = decode(name).toLowerCase();

    let matchesQuery = !query || decodedName.includes(query.toLowerCase());

    if (activeFilter === "Songs" && "primaryArtists" in item) {
      const artistName =
        item.primaryArtists || item.artists?.primary?.[0]?.name || "";
      const decodedPrimaryArtist = decode(artistName).toLowerCase();
      matchesQuery =
        matchesQuery || decodedPrimaryArtist.includes(query.toLowerCase());
    } else if (activeFilter === "Albums" && "artists" in item) {
      const artistName = item.artists?.primary?.[0]?.name || "";
      const decodedPrimaryArtist = decode(artistName).toLowerCase();
      matchesQuery =
        matchesQuery || decodedPrimaryArtist.includes(query.toLowerCase());
    }
    const itemType = item.type.toLowerCase();
    const filterType = activeFilter.toLowerCase();
    const matchesFilter =
      itemType === filterType ||
      (filterType === "songs" && itemType === "song") ||
      (filterType === "albums" && itemType === "album") ||
      (filterType === "artists" && itemType === "artist") ||
      (filterType === "playlists" && itemType === "playlist");
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
          {!isLoading && error && (
            <p className="text-red-500 col-span-full text-center py-8">
              {error}
            </p>
          )}
          {!isLoading && !error && query && (
            <h2 className="text-lg font-semibold mb-4">
              Search Results for &quot;{query}&quot;
            </h2>
          )}
          {!isLoading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredData.length > 0 ? (
                <>
                  {activeFilter === "Songs" &&
                    filteredData.map((item) => {
                      const handlePlayClick = (e: React.MouseEvent) => {
                        e.stopPropagation();
                        if (
                          ["song", "track"].includes(item.type.toLowerCase())
                        ) {
                          handleSongClick(item as MusicItem);
                        }
                      };

                      const name = "name" in item ? item.name : "Unknown Title";
                      const artistName =
                        "primaryArtists" in item && item.primaryArtists
                          ? item.primaryArtists
                          : ("artists" in item &&
                              item.artists?.primary?.[0]?.name) ||
                            "Unknown Artist";

                      return (
                        <MusicCard
                          key={`${item.type}-${item.id}`}
                          imageUrl={
                            item.image.find((img) => img.quality === "500x500")
                              ?.url || ""
                          }
                          songName={decode(name)}
                          artistName={decode(artistName)}
                          onPlayClick={
                            ["song", "track"].includes(item.type.toLowerCase())
                              ? handlePlayClick
                              : undefined
                          }
                        />
                      );
                    })}
                  {activeFilter === "Albums" &&
                    filteredData.map((item) => {
                      const name = "name" in item ? item.name : "Unknown Title";
                      const artistName =
                        "primaryArtists" in item && item.primaryArtists
                          ? item.primaryArtists
                          : ("artists" in item &&
                              item.artists?.primary?.[0]?.name) ||
                            "Unknown Artist";

                      return (
                        <AlbumCard
                          key={`${item.type}-${item.id}`}
                          id={item.id}
                          imageUrl={
                            item.image.find((img) => img.quality === "500x500")
                              ?.url || ""
                          }
                          albumName={decode(name)}
                          artistName={decode(artistName)}
                        />
                      );
                    })}
                  {activeFilter === "Artists" &&
                    filteredData.map((item) => {
                      const name = "name" in item ? item.name : "Unknown Title";
                      console.log(
                        item.image.find((img) => img.quality === "500x500")?.url
                      );
                      return (
                        <ArtistCard
                          key={`${item.type}-${item.id}`}
                          id={item.id}
                          imageUrl={
                            item.image.find((img) => img.quality === "500x500")
                              ?.url || ""
                          }
                          artistName={decode(name)}
                        />
                      );
                    })}

                  {activeFilter === "Playlists" &&
                    filteredData.map((item) => {
                      const name =
                        "name" in item ? item.name : "Unknown Playlist";
                      return (
                        <PlaylistCard
                          key={`${item.type}-${item.id}`}
                          imageUrl={
                            item.image.find((img) => img.quality === "500x500")
                              ?.url || ""
                          }
                          name={decode(name)}
                        />
                      );
                    })}
                </>
              ) : (
                <p className="text-neutral-400 col-span-full text-center py-8">
                  {query
                    ? `No ${activeFilter.toLowerCase()} found for "${query}".`
                    : `Enter a search query to see ${activeFilter.toLowerCase()}.`}
                </p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
