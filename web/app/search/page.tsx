"use client";
import { useState } from "react";
import MusicCard from "@/components/Cards/musicCard";
import MusicPlayer from "@/components/musicPlayer/musicPlayer";
import Sidebar from "@/components/sidebar";
import Link from "next/link";

export default function Home() {
  const filters = ["Top Results", "Songs", "Albums", "Artists", "Playlist"];
  const [activeFilter, setActiveFilter] = useState("Top Results");

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar />
        <div className="h-full w-px bg-neutral-800" />
        <div className="flex-1 bg-black p-5 text-white overflow-y-auto">
          <div className="flex gap-2 p-2 flex-wrap">
            {filters.map((label) => (
              <Link
                href="#"
                key={label}
                onClick={() => setActiveFilter(label)}
                className={`h-10 flex justify-center items-center px-4 rounded-xl transition-colors ${
                  activeFilter === label
                    ? "bg-white text-black"
                    : "bg-neutral-800 text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {activeFilter === "Songs" ? (
              <>
                <MusicCard
                  imageUrl="https://c.saavncdn.com/839/Mismatched-Season-3-Soundtrack-from-the-Netflix-Series-Hindi-2024-20241217204803-500x500.jpg"
                  songName="Ishq Hai"
                  artistName="Mismatched"
                />
                <MusicCard
                  imageUrl="https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg"
                  songName="Agar Tum Saath Ho"
                  artistName="Tamasha"
                />
              </>
            ) : (
              <p className="text-gray-400">Select a filter to see results.</p>
            )}
          </div>
        </div>
      </div>

      <MusicPlayer />
    </div>
  );
}
