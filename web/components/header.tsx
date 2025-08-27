"use client";
import { useEffect, useState, useRef } from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [hasMounted, setHasMounted] = useState(false);
  const [userSettingsVisible, setUserSettingsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setUserSettingsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleSearch = (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-black border-b border-neutral-800 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-1 text-left">
          <h1 className="text-[#F695C5] text-xl font-bold tracking-tight">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              Spring
            </Link>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <form onSubmit={handleSearch} className="w-full max-w-md">
            <input
              type="search"
              name="gsearch"
              id="gsearch"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              className="w-full px-4 py-2 bg-neutral-800/50 border border-neutral-700 rounded-full text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#F695C5]/50 focus:border-transparent transition-all duration-200"
            />
          </form>
        </div>

        {/* User Profile */}
        <div className="flex-1 flex justify-end relative">
          <div
            className="cursor-pointer p-2 rounded-full hover:bg-neutral-800/50 transition-colors"
            onClick={() => setUserSettingsVisible(!userSettingsVisible)}
            aria-label="User settings"
          >
            {hasMounted && user?.photoURL ? (
              <Image
                src={user.photoURL}
                alt={`${user.displayName || "User"}'s profile picture`}
                width={32}
                height={32}
                className="rounded-full object-cover w-8 h-8"
                onError={(e) => (e.currentTarget.src = "/fallback-profile.png")}
              />
            ) : (
              <FaUser size={24} className="text-neutral-300" />
            )}
          </div>

          {/* User Settings Dropdown */}
          <AnimatePresence>
            {hasMounted && user && userSettingsVisible && (
              <motion.div
                ref={settingsRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 w-48 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl z-50 p-2"
              >
                <div className="px-4 py-2 text-sm text-neutral-300 border-b border-neutral-700">
                  {user.displayName || "User"}
                </div>
                <button
                  onClick={() => dispatch(logout())}
                  className="w-full text-left px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-800 hover:text-[#F695C5] rounded-md transition-colors"
                >
                  Log Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
