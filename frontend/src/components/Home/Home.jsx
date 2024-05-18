import React from "react";
import { CiSearch } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { HiMiniMusicalNote } from "react-icons/hi2";
import { TbPlaylist } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import axios from "axios";
import "react-h5-audio-player/lib/styles.css";
import "./Home.css";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';


const Home = () => {
    const [data, setData] = useState(null);
    const [currplaying, setCurrplaying] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const fetchSongData = async () => {
        try {
            const response = await axios.get(
                "https://spring-music-player-3hyj.vercel.app/search",
                {
                    params: { song: searchQuery },
                }
            );
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const playSong = (index) => {
        setCurrplaying(index);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % data.length);
    };

    let currentItems;

    if (data !== null) currentItems = data.slice(currentIndex, currentIndex + itemsPerPage);



    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-20 mx-auto ">

             {/* Hamburger Icon */}
             <div className="hamburger p-4">
                <AiOutlineMenu size={35} color="white" onClick={() => setIsSidebarOpen(true)} />
                {/* <CiSearch size={30} color={"white"}
                           
                        />

                <CiHome 
                size={30} color={"white"}
                />
                <IoMdPhotos size={30} color={"white"} />
                <MdOutlineLibraryMusic size={30} color={"white"} />
                <HiMiniMusicalNote size={30} color={"white"} />
                <TbPlaylist size={30} color={"white"} /> */}
            </div>

            {/* Sidebar */}
            <div className={` w-1/5 h-full  text-white transition-transform transform ${isSidebarOpen ? 'block' : 'sidebar'} lg:translate-x-0 fixed lg:static z-50 lg:z-auto`}>
                {/* Close Icon for Sidebar */}
                <div className="sm:block lg:hidden p-4">
                    <AiOutlineClose size={30} color="white" onClick={() => setIsSidebarOpen(false)} />
                </div>

       

                {/* Navigation Links */}
                <div className="navs w-full h-full ">
                    <div className="menu-library w-full h-1/2 flex flex-col items-left justify-around text-white text-xl">
                        <h1 className="px-8 font-bold">MENU</h1>
                        <div className="flex justify-left items-center px-8">
                            <CiHome />
                            <span className="p-2"></span>Home
                        </div>
                        <h1 className="px-8 font-bold">LIBRARY</h1>
                        <div className="flex justify-left items-center px-8">
                            <IoMdPhotos />
                            <span className="p-2"></span>Albums
                        </div>
                        <div className="flex justify-left items-center px-8">
                            <MdOutlineLibraryMusic />
                            <span className="p-2"></span>Songs
                        </div>
                        <div className="flex justify-left items-center px-8">
                            <HiMiniMusicalNote />
                            <span className="p-2"></span>Artists
                        </div>
                    </div>

                    <div className="playlist w-full h-2/5 text-white text-xl flex flex-col justify-around items-left lg:max-xl:text-lg md:max-lg:text-md">
                        <h1 className="px-8 font-bold">PLAYLISTS</h1>
                        <div className="px-8 flex justify-left items-center">
                            <TbPlaylist />
                            <span className="px-2">playlist 1</span>
                            <RiDeleteBin6Line />
                        </div>
                        <div className="px-8 flex justify-left items-center">
                            <TbPlaylist />
                            <span className="px-2">playlist 2</span>
                            <RiDeleteBin6Line />
                        </div>
                        <div className="px-8 flex justify-left items-center">
                            <TbPlaylist />
                            <span className="px-2">playlist 3</span>
                            <RiDeleteBin6Line />
                        </div>
                    </div>
                </div>
            </div>

            <div className="main w-3/5 h-full flex-col justify-around items-left sm:max-lg:px-4">

                <div className="top-left-icons flex justify-left items-center p-4">
                    <div className="left-icon bg-white bg-opacity-35 rounded-full flex justify-center items-center p-2 ">
                        <FaChevronLeft size={30} color={"white"} />
                    </div> <span className="p-2"></span>
                    <div className="right-icon bg-white bg-opacity-35 rounded-full flex justify-center items-center p-2">
                        <FaChevronRight size={30} color={"white"} />
                    </div>
                    <div className="w-3/5 h-2/5 bg-white bg-opacity-35 rounded-full border-none flex justify-center items-center p-2 lg:h-1/4 mx-2">
                        <CiSearch size={25} color={"white"}
                            onClick={(e) => {
                                e.preventDefault();
                                if (searchQuery !== "") fetchSongData();
                            }}
                        />
                        <input
                            type="text"
                            name="song"
                            id="song"
                            required
                            onChange={(e) => {
                                e.preventDefault();
                                setSearchQuery(e.target.value);
                            }}
                            placeholder="Search"
                            className="search-bar w-full h-full bg-transparent p-2 font-bold focus:outline-none mx-2 focus:bg-transparent focus:text-white"
                        />
                    </div>
                </div>

                <div className="w-full h-2/5">

                    <div className="head flex justify-stretch items-center w-full h-auto">
                        <h1 className="text-white text-3xl font-bold w-1/2 h-auto recents">Recently Played</h1>
                        <h1 className="text-white text-2xl font-bold w-1/2 h-auto text-right">See All</h1>
                    </div>


                    <div className="recents-card w-full h-4/5 bg-white bg-opacity-35 rounded-2xl flex justify-center items-center p-2 mt-2">

                    </div>

                </div>

                <div className="w-full h-2/5 mt-4">

                    <div className="head flex justify-stretch items-center w-full h-auto">
                        <div className="w-1/2 h-auto">
                            <h1 className="text-white text-2xl font-bold w-full h-auto ">Search Results</h1></div>
                        <h1 className="text-white text-2xl font-bold w-1/2 h-auto text-right"
                            onClick={handleNext}       >See More</h1>
                    </div>


                    <div className="recents-card w-full h-4/5 bg-white bg-opacity-35 rounded-2xl flex justify-evenly items-center p-2 mt-2">
                        {currentItems !== null &&
                            currentItems !== undefined &&
                            currentItems.map((element, index) => (
                                <div
                                    className="h-full w-1/4 rounded-lg hover:shadow-xl flex flex-col justify-center items-center cursor-pointer shadow-lg"
                                    key={index}
                                    onClick={() => playSong(index)}
                                >
                                    <div className="w-4/5 h-3/5">
                                        <img
                                            src={element.img}
                                            alt={element.name}
                                            className="w-full h-full"
                                        />

                                    </div>
                                    <div className=" text-white w-4/5 h-2/5 items-center flex justify-center">
                                        <h4 className=" font-bold text-center text-lg">{element.name}</h4>
                                        {/* <p className = "text-center">
                                            {element.artist} - {element.year}
                                        </p> */}
                                    </div>
                                </div>
                            ))}
                    </div>

                </div>






            </div>

            <div className="home-player w-2/5 h-full flex flex-col justify-center items-center">
                <div className="top-right-icons w-full h-1/5 flex justify-end items-start p-4 ">
                    <div className="left-icon bg-white bg-opacity-35 rounded-full flex justify-center items-center p-2 ">
                        <MdAccountCircle size={40} color={"white"} />
                    </div> <span className="p-2"></span>
                    <div className="right-icon bg-white bg-opacity-35 rounded-full flex justify-center items-center p-2 ">
                        <IoIosNotifications size={40} color={"white"} />
                    </div>
                </div>

                <div className="h-4/5 w-full flex flex-col justify-evenly items-center">

                    <div className=" w-3/4 h-1/4 bg-white bg-opacity-35 rounded-2xl flex flex-col justify-center items-center p-2">
                        <h1 className="text-lg font-bold text-white w-full text-left p-2">Top Artists</h1>
                        <div className="list w-full h-4/5"></div>
                    </div>
                    <div className=" w-3/4 h-4/5 bg-white bg-opacity-35 rounded-2xl flex flex-col justify-center items-center p-2 m-2">
                        <div className="w-4/5 h-3/5">
                            {data && data.length > 0 ? (
                                <img
                                    src={data && data[currplaying].img}
                                    className="w-full h-full"
                                />
                            ) : (
                                "Choose a song to play"
                            )}
                        </div>
                        <ul className="txt w-4/5 h-1/5 text-black bg-white p-2">
                            <li className="t text-3xl font-bold text-center bg-white">
                                {data && data.length > 0 && data[currplaying].name}
                            </li>
                            <li className="p text-lg text-center ">
                                {data && data[currplaying].artist}{" "}
                                {data && data[currplaying].year}
                            </li>
                        </ul>

                        <div className="w-4/5 h-1/5">
                            {data && (
                                <AudioPlayer
                                    autoPlay
                                    src={data && data[currplaying].url}
                                    preload="metadata"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;