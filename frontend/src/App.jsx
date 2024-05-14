import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./App.css";
import axios from "axios";

const App = () => {
    const [data, setData] = useState(null);
    // const [playlist, setPlaylist] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currplaying, setCurrplaying] = useState(0);
    const [shuffle, setShuffle] = useState(false); // State for shuffle play

    const fetchSongData = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL, {
                params: { song: searchQuery },
            });
            setData(response.data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Function to shuffle the playlist
    const shufflePlaylist = () => {
        if (data) {
            const shuffledData = [...data];
            for (let i = shuffledData.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledData[i], shuffledData[j]] = [
                    shuffledData[j],
                    shuffledData[i],
                ];
            }
            setData(shuffledData);
            setCurrplaying(0);
        }
    };

    const nextPlay = () => {
        setCurrplaying(currplaying + 1 >= data.length ? 0 : currplaying + 1);
    };

    const previousPlay = () => {
        setCurrplaying(currplaying - 1 < 0 ? data.length - 1 : currplaying - 1);
    };

    const playSong = (index) => {
        setCurrplaying(index);
    };

    return (
        <div className="ui">
            <div className="player">
                <div className="imgBx">
                    {data && data.length > 0 ? (
                        <img
                            src={data[currplaying].img}
                            height="250px"
                            width="250px"
                        />
                    ) : (
                        "Choose a song to play"
                    )}
                </div>
                <ul className="details">
                    <li className="name">
                        {data && data.length > 0 && data[currplaying].name}
                    </li>
                    <li className="author">
                        {data && data.length > 0 && data[currplaying].artist}{" "}
                        {data && data.length > 0 && data[currplaying].year}
                    </li>
                </ul>
                {data && (
                    <AudioPlayer
                        className="rounded-lg py-5 px-8"
                        autoPlay
                        src={data[currplaying].url}
                        preload="metadata"
                        id="audio"
                        showSkipControls
                        onClickNext={nextPlay}
                        onClickPrevious={previousPlay}
                        onEnded={nextPlay}
                        onError={(error) => {
                            console.log("Error :", error);
                        }}
                    />
                )}
            </div>

            <div className="search-box">
                <div className="search">
                    <form className="flex justify-between px-6 mb-4">
                        <input
                            type="text"
                            name="song"
                            className="box1 w-[50%]"
                            required
                            onChange={(e) => {
                                e.preventDefault();
                                setSearchQuery(e.target.value);
                            }}
                        />
                        <button
                            id="get"
                            alt="search"
                            className="flex items-center justify-center p-3 px-6 rounded-xl"
                            onClick={(e) => {
                                e.preventDefault();
                                if (searchQuery !== "") fetchSongData();
                            }}
                        >
                            <img src="/search.svg" className="w-4 h-4" alt="" />
                        </button>
                        <button
                            className="bg-gray-400 p-2 px-6 rounded-lg"
                            onClick={(e) => {
                                e.preventDefault()
                                shufflePlaylist();
                            }}
                        >
                            Shuffle
                        </button>
                    </form>
                </div>

                <div className="results">
                    {data &&
                        data.map((element, index) => (
                            <div
                                className="result-item"
                                key={index}
                                onClick={() => playSong(index)}
                            >
                                <div className="songresult">
                                    <img
                                        src={element.img}
                                        alt={element.name}
                                        height="20px"
                                        width="20px"
                                    />
                                    <div className="search-details">
                                        <h4 id="elementname">{element.name}</h4>
                                        <p>
                                            {element.artist} - {element.year}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default App;
