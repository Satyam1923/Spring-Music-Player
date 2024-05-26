import React, { useState } from "react";
import LinkText from "./LinkText";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Background from "./Background";

function SectionTellerElement({ activeSection, number, text }) {
  let classNameValue =
    "w-5 h-5 text-[0.8rem] text-white flex justify-center items-center rounded-[50%] ";
  if (number < activeSection) classNameValue += " bg-[#87FC93]";
  else if (activeSection == number) classNameValue += " bg-[#4285F4]";
  else classNameValue += " bg-[#cfcfcf]";

  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      <div className={classNameValue}>{number}</div>
      <p
        className={
          activeSection == number ? "text-white sm:block hidden" : "text-[#cfcfcf] sm:block hidden"
        }
      >
        {text}
      </p>
    </div>
  );
}

function SectionTeller({ activeSection }) {
  return (
    <div className="flex text-center gap-10 scale-[0.9]">
      <SectionTellerElement
        activeSection={activeSection}
        number={1}
        text="Enter your email address"
      />
      <SectionTellerElement
        activeSection={activeSection}
        number={2}
        text="Provide your basic info"
      />
      <SectionTellerElement activeSection={activeSection} number={3} text="Create your password" />
    </div>
  );
}

function SignUpFirst() {
  return (
    <>
      <div className="mt-4 flex flex-col gap-4 justify-center items-center">
        <div className="flex flex-col gap-1 w-full">
          <label className="pl-1">What's your email?</label>
          <input
            className="bg-[#00000015] outline-none w-full pl-4 pr-4 border border-[#CF00A3] rounded-xl min-h-[42px]"
            type="email"
            placeholder="Enter your email address"
          ></input>
        </div>
        <button className="bg-[#0902221C] font-bold mt-2 border w-[80%] text-[#78A9FA] border-[#FFFFFFaf] rounded-3xl min-h-[42px]">
          Next
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-center">
          <hr className="h-[1px] w-full text-[#E4A0D5ef]" />
          <p className="text-center text-[0.8rem] w-full text-[#E4A0D5ef]">OR</p>
          <hr className="h-[1px] w-full text-[#E4A0D5ef]" />
        </div>
        <div className="flex justify-between text-center">
          <button className="bg-[#0902221C] pl-4 pr-4 flex gap-2 justify-center items-center border w-[48%] text-white border-[#FFFFFFaf] rounded-3xl min-h-[42px]">
            <FaFacebookSquare />
            <p className="md:block hidden">Sign up with Facebook</p>
          </button>
          <button className="bg-[#0902221C] pl-4 pr-4 flex gap-2 justify-center items-center  border w-[48%] text-white border-[#FFFFFFaf] rounded-3xl min-h-[42px]">
            <FaGoogle />
            <p className="md:block hidden">Sign up with Google</p>
          </button>
        </div>
      </div>
    </>
  );
}

function SignUpSecond() {
  return (
    <>
      <div className="mt-3 gap-5 flex flex-col w-full justify-center items-center">
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          <div className="flex flex-col gap-1 w-full">
            <label className="pl-1">First Name</label>
            <input
              className="bg-[#00000015] outline-none w-full pl-4 pr-4 border border-[#CF00A3] rounded-xl min-h-[42px]"
              type="email"
              placeholder="Enter your First Name"
            ></input>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="pl-1">Last Name</label>
            <input
              className="bg-[#00000015] outline-none w-full pl-4 pr-4 border border-[#CF00A3] rounded-xl min-h-[42px]"
              type="email"
              placeholder="Enter your Last Name"
            ></input>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="pl-1">Username</label>
            <input
              className="bg-[#00000015] outline-none w-full pl-4 pr-4 border border-[#CF00A3] rounded-xl min-h-[42px]"
              type="email"
              placeholder="Enter your username"
            ></input>
          </div>
        </div>
        <button className="bg-[#0902221C] font-bold mt-2 border w-[80%] text-[#78A9FA] border-[#FFFFFFaf] rounded-3xl min-h-[42px]">
          Next
        </button>
      </div>
    </>
  );
}

function SignUpThird() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between pl-1 pr-1">
          <label>Password</label>
          <div className="flex items-center gap-2 hover:cursor-pointer">
            <FaEyeSlash />
            <p>Hide</p>
          </div>
        </div>
        <input
          className="bg-[#48212111] outline-none w-full pl-4 pr-4 border border-[#CF00A3] rounded-xl min-h-[40px]"
          type="password"
        ></input>
      </div>
      <button className="bg-[#0902221C] font-semibold w-[75%] mt-2 border text-[#87FC93] border-[#FFFFFFaf] rounded-3xl min-h-[42px]">
        Create an account
      </button>
    </div>
  );
}

function SignUp() {
  const [activeSection, setActiveSection] = useState(1);

  return (
    <div>
      <Background />
      <div className="absolute gap-4 min-w-[420px] md:min-w-[520px] justify-center items-center bg-[#0902222f] backdrop-blur-xl flex p-4 pt-8 pb-8 sm:p-14 md:pl-18 md:pr-18 flex-col rounded-3xl border border-[#CF00A3] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
        <div className="m-4 flex flex-col text-center justify-center items-center gap-4">
          <h1 className="text-white text-[2.3rem] sm:text-[2.8rem] font-[700]">
            Create an account
          </h1>
          <div className="flex gap-2 items-center justify-center">
            <p className="font-semibold text-[#78A9FA]">Already have an account?</p>
            <LinkText link="#" text="Log in" />
          </div>
        </div>

        <SectionTeller activeSection={activeSection} />

        {/* This section changes with respect to current activeSection user is in */}
        <div className="w-[80%] flex flex-col gap-12">
          <SignUpFirst />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
