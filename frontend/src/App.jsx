import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./App.css";
import axios from "axios";
import he from "he";

const App = () => {
    const [data, setData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [totalTime, setTotalTime] = useState(0);
    const [timePassed, setTimePassed] = useState(0);
    const [currplaying, setCurrplaying] = useState(0);

    const decodeEntities = (str) => {
        return he.decode(str);
    };

    const fetchSongData = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL, {
                params: { song: searchQuery },
            });
            setData(response.data);
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
                            src={data && data[currplaying].img}
                            height="200px"
                            width="200px"
                        />
                    ) : (
                        "Choose a song to play"
                    )}
                </div>
                <ul className="details">
                    <li className="name">
                        {data &&
                            data.length > 0 &&
                            data[currplaying] &&
                            decodeEntities(data[currplaying].name)}
                    </li>
                    <li className="author">
                        {data &&
                            data.length > 0 &&
                            data[currplaying] &&
                            decodeEntities(data[currplaying].artist)}{" "}
                        {data &&
                            data.length > 0 &&
                            data[currplaying] &&
                            data[currplaying].year}
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
                <div className="w-full">
                    <form className="flex items-center gap-4 ">
                        <input
                            type="text"
                            name="song"
                            id="song"
                            className="p-2 px-6 rounded-lg"
                            required
                            onChange={(e) => {
                                e.preventDefault();
                                setSearchQuery(e.target.value);
                            }}
                        />
                        <button
                            id="get"
                            alt="search"
                            className="p-2 px-6 rounded-lg"
                            onClick={(e) => {
                                e.preventDefault();
                                if (searchQuery !== "") fetchSongData();
                            }}
                        >
                            Search
                        </button>
                        <button
                            className="bg-gray-400 p-2 px-6 rounded-lg"
                            onClick={(e) => {
                                e.preventDefault();
                                shufflePlaylist();
                            }}
                        >
                            Shuffle
                        </button>
                    </form>
                </div>

                <div className="results">
                    {data !== null &&
                        data !== undefined &&
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
                                        <h4 id="elementname">
                                            {decodeEntities(element.name)}
                                        </h4>
                                        <p>
                                            {decodeEntities(element.artist)} -{" "}
                                            {element.year}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
        //{" "}
        // </div>
    );
};

export default App;
