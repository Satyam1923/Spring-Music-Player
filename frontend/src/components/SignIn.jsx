import React from "react";
import LinkText from "./LinkText";
import Background from "./Background";
import { FaEyeSlash } from "react-icons/fa";

function SignIn() {
  return (
    <>
      <Background />
      {/* Sign In */}
      <div className="absolute bg-[#0902222f] backdrop-blur-xl flex p-12 flex-col gap-6 rounded-3xl border border-[#CF00A3] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
        <div className="bg-[#0902222f] backdrop-blur-xl pl-4 pr-4 flex flex-col gap-6 min-w-[380px] p-6 rounded-xl border border-[#CF00A3] items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-7 mt-1 pl-4 pr-4">
            <h1 className="text-[#efefefef] text-3xl font-semibold m-3">Sign in</h1>
            {/* --- Sign In form --- */}
            <div className="flex flex-col gap-8">
              <form className="flex flex-col gap-7">
                <div className="flex flex-col gap-1">
                  <label className="pl-1">Email or mobile phone number</label>
                  <input
                    className="bg-[#00000015] outline-none w-full pl-4 pr-4 border border-[#CF00A3] rounded-xl min-h-[40px]"
                    type="email"
                  ></input>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between pl-1 pr-1">
                    <label>Your password</label>
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
                <div className="flex flex-col gap-1">
                  <button className="bg-[#0902221C] mt-2 border text-[#87FC93] font-semibold border-[#FFFFFFaf] rounded-3xl min-h-[42px]">
                    Log in
                  </button>
                  <p className="p-2 text-[0.8rem] font-light">
                    By continuing, you agree to the <LinkText text="Terms of use" link="#" /> and{" "}
                    <LinkText text="Privacy Policy." link="#" />
                  </p>
                </div>
              </form>
              {/* Other Issue & Forgot password section */}
              <div className="flex justify-between text-[0.8rem] pl-1 pr-1 mb-1">
                <LinkText link="#" text="Other issue with sign in" />
                <LinkText link="#" text="Forgot your password " />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <div className="flex w-full items-center justify-center">
            <hr className="mr-2 h-[1px] w-full text-[#E4A0D5ef]" />
            <p className="text-center text-[0.8rem] w-full text-[#E4A0D5ef]">
              New to our community
            </p>
            <hr className="ml-2 h-[1px] w-full text-[#E4A0D5ef]" />
          </div>
          <button className="bg-[#0902221C] font-semibold w-[90%] mt-2 border text-[#87FC93] border-[#FFFFFFaf] rounded-3xl min-h-[42px]">
            Create an account
          </button>
        </div>
      </div>
    </>
  );
}

export default SignIn;
