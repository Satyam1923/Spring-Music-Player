"use client";
import { useEffect, useState, useRef } from "react";
import { FaUser, FaSearch } from "react-icons/fa";
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
      setSearchQuery("");
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-neutral-800 bg-black/70 backdrop-blur-md shadow-lg">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-1 text-left">
          <h1 className="text-[#F695C5] text-xl sm:text-2xl font-extrabold tracking-tighter">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              Spring
            </Link>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <form onSubmit={handleSearch} className="w-full max-w-lg relative">
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              className="w-full px-4 py-2 pl-10 bg-neutral-900/60 border border-neutral-700 rounded-full 
                         text-white placeholder-neutral-400 focus:outline-none focus:ring-2 
                         focus:ring-[#F695C5]/60 focus:border-transparent transition-all duration-200"
            />
            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500" />
          </form>
        </div>

        {/* User Profile */}
        <div className="flex-1 flex justify-end relative">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer p-2 rounded-full hover:bg-neutral-800/50 transition-colors"
            onClick={() => setUserSettingsVisible(!userSettingsVisible)}
            aria-label="User settings"
          >
            {hasMounted && user?.photoURL ? (
              <Image
                src={user.photoURL}
                alt={`${user.displayName || "User"}'s profile picture`}
                width={34}
                height={34}
                className="rounded-full object-cover w-9 h-9"
                onError={(e) => (e.currentTarget.src = "/fallback-profile.png")}
              />
            ) : (
              <FaUser size={22} className="text-neutral-300" />
            )}
          </motion.div>

          {/* Dropdown */}
          <AnimatePresence>
            {hasMounted && user && userSettingsVisible && (
              <motion.div
                ref={settingsRef}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-14 w-56 bg-neutral-950/95 border border-neutral-700 
                           rounded-xl shadow-xl z-50 overflow-hidden"
              >
                <div className="px-5 py-3 text-sm text-neutral-300 border-b border-neutral-700 bg-neutral-900/40">
                  <p className="truncate">{user.displayName || "User"}</p>
                </div>
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => dispatch(logout())}
                  className="w-full text-left px-5 py-3 text-sm text-neutral-200 
                             hover:bg-neutral-800 hover:text-[#F695C5] transition-colors"
                >
                  Log Out
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
