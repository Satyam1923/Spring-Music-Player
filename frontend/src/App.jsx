import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./App.css";
import axios from "axios";

const App = () => {
    const [data, setData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [totalTime, setTotalTime] = useState(0);
    const [timePassed, setTimePassed] = useState(0);
    const [currplaying, setCurrplaying] = useState(0);
    const audioElement = useRef(null);

    const fetchSongData = async () => {
        try {
            const response = await axios.get(
                "https://spring-music-player-backend.vercel.app/search",
                {
                    params: { song: searchQuery },
                }
            );
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const nextPlay = () => {
        setCurrplaying(
            currplaying + 1 >= globalData.length ? 0 : currplaying + 1
        );
        const selectedMusic = globalData[currplaying];
        updateAudio(selectedMusic);
    };

    const previousPlay = () => {
        setCurrplaying(
            currplaying - 1 < 0 ? globalData.length - 1 : currplaying - 1
        );
        const selectedMusic = globalData[currplaying];
        updateAudio(selectedMusic);
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
                        {data && data[currplaying].artist}{" "}
                        {data && data[currplaying].year}
                    </li>
                </ul>
                {data && (
                    <AudioPlayer
                        autoPlay
                        src={data && data[currplaying].url}
                        preload="metadata"
                        id="audio"
                        ref={audioElement}
                        onEnded={() => {
                            currplaying + 1 < data.length
                                ? setCurrplaying(currplaying + 1)
                                : setCurrplaying(0);
                        }}
                    />
                )}
            </div>

            <div className="search-box">
                <div className="search">
                    <form className="box">
                        <input
                            type="text"
                            name="song"
                            id="song"
                            className="box1"
                            required
                            onChange={(e) => {
                                e.preventDefault();
                                setSearchQuery(e.target.value);
                            }}
                        />
                        <button
                            id="get"
                            type="image"
                            src="search.svg"
                            alt="search"
                            className="button"
                            onClick={(e) => {
                                e.preventDefault();
                                if (searchQuery !== "") fetchSongData();
                            }}
                        >
                            <img src="/seach.svg" className="w-4 h-4" alt="" />
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
        //{" "}
        // </div>
    );
};

export default App;
