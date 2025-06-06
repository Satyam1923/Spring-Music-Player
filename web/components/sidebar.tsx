"use client";

import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <div className="w-56 h-full pb-20 bg-black text-white p-6 flex flex-col">
      <nav className="flex flex-col gap-4 mb-8">
        <a href="/" className="hover:text-pink-400 transition-colors">
          Home
        </a>
        <a href="#" className="hover:text-pink-400 transition-colors">
          Explore
        </a>
      </nav>
      <nav className="flex flex-col gap-4">
        <a href="#" className="hover:text-pink-400 transition-colors">
          Library
        </a>
        <a href="#" className="hover:text-pink-400 transition-colors">
          Liked Songs
        </a>
        <a href="#" className="hover:text-pink-400 transition-colors">
          Recent
        </a>
        <a href="#" className="hover:text-pink-400 transition-colors">
          Playlists
        </a>
        <a href="#" className="hover:text-pink-400 transition-colors">
          Albums
        </a>
      </nav>
      <div className="flex-grow" />
      <div className="flex flex-col gap-4 pt-6 border-t border-gray-700">
        <a href="#" className="hover:text-pink-400 transition-colors">
          Settings
        </a>
      </div>
    </div>
  );
}
