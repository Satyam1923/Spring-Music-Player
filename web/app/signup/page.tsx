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
    <div className="flex">
      <div className="h-screen justify-center w-156 bg-black flex flex-col p-15 space-y-4">
        <div className="text-white text-2xl mb-6">Create an Account</div>

        <label htmlFor="name" className="text-white">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded"
          placeholder="Enter your name"
        />

        <label htmlFor="email" className="text-white">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded"
          placeholder="Enter your email"
        />

        <label htmlFor="password" className="text-white">
          Password
        </label>
        <div className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded w-full"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-2 top-2 text-sm text-white"
          >
            {showPassword ? <BiHide size={25} /> : <BiShow size={25} />}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleSignup}
          className="bg-[#EFCADF] text-black p-2 rounded hover:bg-[#F695C5]"
        >
          Sign Up
        </button>

        <div className="text-sm text-white font-light mt-4">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-blue-400 hover:text-blue-600 font-medium underline ml-1"
          >
            Login
          </button>
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <div className="text-white">Or sign up with</div>
          <button
            onClick={handleGoogleLogin}
            className="text-white rounded-full p-2 bg-neutral-700 hover:bg-neutral-600 flex items-center justify-center"
          >
            <FcGoogle size={20} />
          </button>
        </div>

        {status === "loading" && <p className="text-white">Processing...</p>}
      </div>

      <div className="h-screen w-full bg-white flex items-center justify-center">
        <div>left bar</div>
      </div>
    </div>
  );
}
