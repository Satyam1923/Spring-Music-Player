"use client";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "@/store/features/auth/authSlice";

export default function Header() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [hasMounted, setHasMounted] = useState(false);
  const [userSettingsVisible, setUserSettingsVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <div className="fixed top-0 z-50 w-full bg-black border-b border-neutral-800">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex-1 text-left">
            <h1 className="text-[#F695C5] text-lg font-semibold">
              <Link href="/">Spring</Link>
            </h1>
          </div>
          <div className="flex-1 flex justify-center">
            <input
              type="search"
              name="gsearch"
              id="gsearch"
              placeholder="Search..."
              className="px-5 py-1 bg-neutral-800 rounded-2xl w-96 text-white focus:outline-none"
            />
          </div>
          <div className="flex-1 flex justify-end px-2 relative">
            <div
              className="cursor-pointer"
              onClick={() => setUserSettingsVisible(!userSettingsVisible)}
            >
              {hasMounted && user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="User profile"
                  width={35}
                  height={35}
                  className="rounded-full object-cover w-8 h-8"
                />
              ) : (
                <FaUser size={22} className="text-white" />
              )}
            </div>

            <AnimatePresence>
              {hasMounted && user && userSettingsVisible && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-14 w-48 bg-neutral-900 border border-neutral-700 rounded-md shadow-lg z-50 p-2"
                  style={{
                    background: "rgba(10, 10, 10, 0.3)",
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.9)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    borderRadius: "15px",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                  }}
                >
                  <button
                    onClick={() => dispatch(logout())}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-800 rounded-md transition-colors"
                  >
                    Log Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
