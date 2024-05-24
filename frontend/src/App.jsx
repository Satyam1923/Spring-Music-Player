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
    const [language, setLanguage] = useState("");

    const decodeEntities = (str) => {
        return he.decode(str);
    };

useEffect(() => {
    console.log("Selected language:", language);
}, [language]);

const fetchSongData = async () => {
    try {
        console.log("Fetching data for language:", language);
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL, {
            params: { song: searchQuery, language: language },
        });
        setData(response.data.length ? response.data : []);
    } catch (error) {
        console.error("Sorry, an error occurred:", error);
        setData([]); 
    }
};

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
        <div className="ui ">
            <div className="player ">
                <div className="imgBx ">
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
                {data && data[currplaying] && (
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

            <div className="search-box w-[70vw] ">
                <div className="w-full">
                    <form className="flex items-center gap-4 ">
                        <input
                            type="text"
                            name="song"
                            id="song"
                            className="  rounded-sm"
                            required
                            onChange={(e) => {
                                e.preventDefault();
                                setSearchQuery(e.target.value);
                            }}
                        />
                  <select value={language}  onChange={(e) => setLanguage(e.target.value)} className="sel">
                  <option value="" disabled >
                  Select Language
                  </option>
                    <option value="all" >All Languages</option>
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                    <option value="punjabi">Punjabi</option>
                    <option value="tamil">Tamil</option>
                    <option value="gujarati">Gujarati</option>
                    <option value="telugu">Telugu</option>
                    <option value="bhojpuri">Bhojpuri</option>
                   
                </select>
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
    {data !== null && data !== undefined && data.length > 0 ? (
        data.map((element, index) => (
            <div className="result-item" key={index} onClick={() => playSong(index)}>
                <div className="songresult">
                    <img src={element.img} alt={element.name} height="20px" width="20px" />
                    <div className="search-details">
                        <h4 id="elementname">{decodeEntities(element.name)}</h4>
                        <p>{decodeEntities(element.artist)} - {element.year}</p>
                        <p className="capitalize">{decodeEntities(element.language)} </p>
                    </div>
                </div>
            </div>
        ))
    ) : (
        <div className="no-data-message">No songs found in the selected language</div>
    )}
</div>

            </div>
        </div>
 
    );
};

export default App;
