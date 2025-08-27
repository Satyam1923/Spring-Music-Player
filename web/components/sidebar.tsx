"use client";

import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <div className="w-42 h-full pb-20 bg-black text-white p-6 flex flex-col">
      <nav className="flex flex-col gap-4 mb-8">
        <Link href="/" className="hover:text-pink-400 transition-colors">
          Home
        </Link>
        <Link href="/search " className="hover:text-pink-400 transition-colors">
          Search
        </Link>
      </nav>
      <nav className="flex flex-col gap-4">
        <Link href="#" className="hover:text-pink-400 transition-colors">
          Library
        </Link>
        <Link href="#" className="hover:text-pink-400 transition-colors">
          Liked Songs
        </Link>
        <Link href="#" className="hover:text-pink-400 transition-colors">
          Recent
        </Link>
        <Link href="#" className="hover:text-pink-400 transition-colors">
          Playlists
        </Link>
        <Link href="#" className="hover:text-pink-400 transition-colors">
          Albums
        </Link>
      </nav>
      <div className="flex-grow" />
      <div className="flex flex-col gap-4 pt-6 border-t border-gray-700">
        <Link href="#" className="hover:text-pink-400 transition-colors">
          Settings
        </Link>
      </div>
    </div>
  );
}
