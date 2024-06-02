import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import he from "he";
import { IoIosLogIn } from "react-icons/io";
import { RiNotification3Fill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";

const Section3 = ({ data, index, topsongs, playSong, isTopSong, setTopSong }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications] = useState([
        "New song added to your playlist!",
        "Your favorite artist just released a new album.",
        "Don't miss the live concert tomorrow.",
        "Your subscription will expire in 3 days.",
        "Update: App version 1.2.3 is now available.",
        "New podcast episode: 'The Future of Music'",
        "Exclusive: Behind-the-scenes with top artists.",
        "Get 20% off on your next subscription renewal.",
        "Daily mix: Your personalized playlist is ready.",
        "Concert alert: Tickets available for sale now."
    ]);

    const decodeEntities = (str) => {
        return he.decode(str);
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const notificationRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [notificationRef]);

    return (
        <div className="section3 p-4 bg-gray-800 text-white">
            <div className="links flex justify-between items-center mb-4">
                <div className="link"><IoIosLogIn fontSize={"25px"} color={"white"} /></div>
                <div className="relative" ref={notificationRef}>
                    <div className="link cursor-pointer" onClick={toggleNotifications}>
                        <RiNotification3Fill fontSize={"25px"} color={"white"} />
                    </div>
                    {showNotifications && (
                        <div className={`absolute top-8 right-0 mt-2 w-80 bg-gray-900 text-black border border-gray-300 rounded-lg shadow-lg z-10 transition-opacity duration-300 ${showNotifications ? 'opacity-100' : 'opacity-0'}`}>
                            {notifications.map((notification, idx) => (
                                <div key={idx} className="p-2 border-b last:border-none hover:bg-gray-800 cursor-pointer">
                                    {notification}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <Link to="/settings">
                    <div className="link"><IoSettings fontSize={"25px"} color={"white"} /></div>
                </Link>
            </div>

            <div className="Card1 mb-4">
                <p className="mb-2">Top Artist</p>
                {topsongs !== null &&
                    topsongs !== undefined &&
                    topsongs.slice(0, 3).map((element, index) => (
                        <div
                            className="result-item flex items-center mb-2 cursor-pointer"
                            key={element.id}
                            onClick={() => {
                                setTopSong(true);
                                playSong(index);
                            }}
                        >
                            <div className="songresult flex items-center">
                                <img
                                    src={element.image[2].url}
                                    alt={element.name}
                                    className="h-6 w-6 mr-2"
                                />
                                <div className="search-details">
                                    <p>{element.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <hr className="mb-4" />

            {isTopSong || data ?
                <div className="Card2">
                    <div className="details2 mb-4 flex flex-col items-center">
                        {isTopSong ?
                            <>
                                <img
                                    src={topsongs && topsongs[index].image[2].url}
                                    className="h-24 w-24 mb-2"
                                />
                                <p>
                                    {topsongs &&
                                        topsongs.length > 0 &&
                                        topsongs[index] &&
                                        decodeEntities(topsongs[index].name)}
                                </p>
                                <p>
                                    {topsongs &&
                                        topsongs.length > 0 &&
                                        topsongs[index] &&
                                        topsongs[index].artists.primary[0].name
                                    }
                                </p>
                            </> :
                            <>
                                <img
                                    src={data && data[index].image[2].url}
                                    className="h-24 w-24 mb-2"
                                />
                                <p>
                                    {data &&
                                        data.length > 0 &&
                                        data[index] &&
                                        decodeEntities(data[index].name)}
                                </p>
                                <p>
                                    {data &&
                                        data.length > 0 &&
                                        data[index] &&
                                        data[index].artists.primary[0].name
                                    }
                                </p>
                            </>
                        }
                    </div>
                    <div className="audioplayer">
                        {isTopSong ?
                            <AudioPlayer
                                autoPlay
                                src={topsongs && topsongs[index].downloadUrl[0].url}
                                preload="metadata"
                                onPlay={() => {
                                    console.log("playing top song");
                                }}
                                onError={() => {
                                    console.log("error playing audio");
                                }}
                                style={{ backgroundColor: "#5773ff", color: "white", borderRadius: "7px" }}
                            /> :
                            data && data.length > 0 && data[index] && (
                                <AudioPlayer
                                    autoPlay
                                    src={data && data[index].downloadUrl[0].url}
                                    preload="metadata"
                                    onPlay={() => {
                                        console.log("playing..");
                                    }}
                                    onError={() => {
                                        console.log("error playing audio");
                                    }}
                                    style={{ backgroundColor: "#5773ff", color: "white", borderRadius: "7px" }}
                                />
                            )
                        }
                    </div>
                </div>
                : <div></div>
            }
        </div>
    );
}

export default Section3;
