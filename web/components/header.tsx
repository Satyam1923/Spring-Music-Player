"use client";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";

export default function Header() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="fixed top-0 z-50 w-full bg-black">
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
        <div className="flex-1 text-right px-2">
          {hasMounted && user?.photoURL ? (
            <Image
              src={user.photoURL}
              alt="User profile"
              width={35}
              height={35}
              className="inline-block w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <FaUser size={22} className="inline-block text-white" />
          )}
        </div>
      </div>
    </div>
  );
}
