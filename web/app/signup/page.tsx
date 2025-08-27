"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  registerWithEmail,
  loginWithGoogle,
} from "@/store/features/auth/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { FcGoogle } from "react-icons/fc";
import { BiShow, BiHide } from "react-icons/bi";
import Image from "next/image";

export default function SignupPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, status, error } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSignup = () => {
    if (!name.trim()) return alert("Please enter your name.");
    dispatch(registerWithEmail({ email, password, name }));
  };

  const handleGoogleLogin = () => dispatch(loginWithGoogle());
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden">
      {/* Glass Signup Card */}
      <div className="z-10 w-[400px] bg-neutral-900/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-8 space-y-6 transition hover:shadow-[0_0_35px_rgba(255,255,255,0.15)]">
        {/* Logo & Title */}
        <div className="text-center">
          <h1 className="text-white font-extrabold text-3xl">
            Create an Account
          </h1>
          <p className="text-sm text-neutral-400">
            Sign up to continue your journey
          </p>
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="text-white/80 text-sm font-medium block mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-3 rounded-lg bg-white/5 text-white placeholder-neutral-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="text-white/80 text-sm font-medium block mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 rounded-lg bg-white/5 text-white placeholder-neutral-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="text-white/80 text-sm font-medium block mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full p-3 rounded-lg bg-white/5 text-white placeholder-neutral-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-pink-400"
            >
              {showPassword ? <BiHide size={22} /> : <BiShow size={22} />}
            </button>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={status === "loading"}
          className="w-full p-3 rounded-lg bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {status === "loading" ? "Processing..." : "Sign Up"}
        </button>

        {/* Login Link */}
        <p className="text-sm text-neutral-400 text-center">
          Already have an account?
          <button
            onClick={() => router.push("/login")}
            className="ml-1 text-pink-300 hover:text-pink-400 font-medium underline underline-offset-2"
          >
            Login
          </button>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <span className="flex-1 h-px bg-white/10"></span>
          <span className="text-white/50 text-xs uppercase">OR</span>
          <span className="flex-1 h-px bg-white/10"></span>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 p-3 border border-white/10 bg-white/5 rounded-lg text-white hover:bg-white/10 transition"
        >
          <FcGoogle size={22} /> Continue with Google
        </button>
      </div>
    </div>
  );
}
