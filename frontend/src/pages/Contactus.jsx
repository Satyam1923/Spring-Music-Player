import React from "react";
import contactimg from "../Images/image.png";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

function Contactus() {
  return (
    <>
      <div id="contact" className="p-5">
        <div className="">
          <h2 className="text-center text-white text-3xl font-bold">
            Contact Us
          </h2>
          <p className="text-center m-5 text-xl">
            Get in touch with us in case of any queries, suggestions or
            feedback.
          </p>
          <div className="border-4 mx-auto my-5 bg-slate-900 p-5 max-w-4xl">
            <div className="flex md:flex-col justify-center items-center">
              <div className="w-full p-5 order-1 lg:order-1">
                <form action="" className="w-full">
                  <label
                    htmlFor="name-icon"
                    className="block mb-2 text-sm py-3 font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 448 512"
                      >
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="name-icon"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John Gomes"
                    />
                  </div>
                  <label
                    htmlFor="email-address-icon"
                    className="block mb-2 text-sm py-3 font-medium text-gray-900 dark:text-white"
                  >
                    Your Email
                  </label>
                  <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                      >
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="email-address-icon"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="johngomes@user.com"
                    />
                  </div>

                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm py-3 font-medium text-gray-900 dark:text-white"
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                  <div className="text-center py-7">
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-full p-5 flex flex-col items-center order-2 lg:order-2">
                <img
                  src={contactimg}
                  alt="contact-us"
                  className="my-14 mx-4 w-full max-w-xs lg:max-w-none"
                />
                <div className="flex flex-wrap justify-center items-center gap-5 lg:gap-2">
                  <span className="icons">
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <AiOutlineInstagram
                        color="white"
                        fontSize={25}
                        className="ico"
                      />
                    </a>
                  </span>
                  <span className="icons">
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <FaXTwitter color="white" fontSize={27} className="ico" />
                    </a>
                  </span>
                  <span className="icons">
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <BsYoutube color="white" size={26} className="ico" />
                    </a>
                  </span>
                  <span className="icons">
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <FaLinkedinIn color="white" size={26} className="ico" />
                    </a>
                  </span>
                  <span className="icons">
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <FaFacebookF color="white" size={26} className="ico" />
                    </a>
                  </span>
                  <span className="icons">
                    <a href="https://github.com/Satyam1923/Spring-Music-Player">
                      <FaGithub color="white" size={26} className="ico" />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contactus;
