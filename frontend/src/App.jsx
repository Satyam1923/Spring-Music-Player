import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./App.css";
import axios from "axios";
import he from "he";
import Sidebar from "./components/Sidebar";
import Section3 from "./components/Section3";
import { CiSearch } from "react-icons/ci";
import waiting from "./Images/neo-sakura-girl-and-dog-waiting-for-the-bus-in-the-rain.gif";
import waiting2 from "./Images/waiting2.gif";
import { GrLanguage } from "react-icons/gr";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const App = () => {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [timePassed, setTimePassed] = useState(0);
  const [currplaying, setCurrplaying] = useState(0);
  const [topsongs, setTopsongs] = useState([]);
  const [swiperRef, setSwiperRef] = useState(null);
  const [language, setLanguage] = useState("all");

  const decodeEntities = (str) => {
    return he.decode(str);
  };
  useEffect(() => {
    console.log("Selected language:", language);
  }, [language]);

  const fetchSongData = async () => {
    try {
      console.log("Fetching data for language:", language);
      const response = await axios.get(
        "https://spring-music-player-3hyj.vercel.app/search",
        {
          params: { song: searchQuery, language: language },
        }
      );
      setData(response.data.length ? response.data : []);
    } catch (error) {
      console.error("Sorry, an error occurred:", error);
      setData([]);
    }
  };

  useEffect(() => {
    const fetchTopSong = async () => {
      try {
        const response = await axios.get(
          "https://spring-music-player-3hyj.vercel.app/search",
          {
            params: { song: "top songs" },
          }
        );
        setTopsongs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopSong();
  }, []);

  const nextPlay = () => {
    setCurrplaying(currplaying + 1 >= globalData.length ? 0 : currplaying + 1);
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
    <div className="w-screen">
      <div className="flex">
        {/* sidebar */}
        <div className="h-fit w-max">
          <Sidebar />
        </div>
        <div className="flex w-full md:flex-row flex-col justify-evenly">
          {/* section 2 */}
          <div className={`section2 md:w-[50%] w-full `}>
            <div className="searchbar searchbar2">
              <input
                type="search"
                placeholder="Search Song"
                name="song"
                className="box1"
                required
                onChange={(e) => {
                  e.preventDefault();
                  setSearchQuery(e.target.value);
                }}
              />
              <div className="custom-dropdown">
                <GrLanguage color="white" fontSize={20} className="dropico" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="dropdown"
                >
                  <option value="all">All Languages</option>
                  <option value="hindi">Hindi</option>
                  <option value="english">English</option>
                  <option value="punjabi">Punjabi</option>
                  <option value="tamil">Tamil</option>
                  <option value="gujarati">Gujarati</option>
                  <option value="telugu">Telugu</option>
                  <option value="bhojpuri">Bhojpuri</option>
                </select>
              </div>

              <button
                id="get"
                type="image"
                src="search.svg"
                alt="search"
                className="w-fit ml-2 md:px-2 flex items-center md:justify-around justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  if (searchQuery !== "") fetchSongData();
                }}
              >
                <CiSearch fontSize={"30px"} />{" "}
                <h2 className="lg:flex hidden">Search</h2>
              </button>
            </div>
            <div className="song_content w-full">
              <b className="search_results">Search Results</b>

              <Swiper
                onSwiper={setSwiperRef}
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                pagination={{
                  type: "fraction",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {data == null ? (
                  <SwiperSlide
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img src={waiting} alt="" />
                  </SwiperSlide>
                ) : data.length === 0 ? (
                  <SwiperSlide
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {" "}
                    No data Found
                  </SwiperSlide>
                ) : (
                  data.map((element, index) => (
                    <div key={index} onClick={() => playSong(index)}>
                      <SwiperSlide className="song">
                        <img
                          src={element.img}
                          height={"60%"}
                          alt={element.name}
                          onClick={() => playSong(index)}
                        />
                        <div>
                          <p onClick={() => playSong(index)}>
                            {decodeEntities(element.name)}
                          </p>
                          <p className="capitalize">{element.language}</p>
                        </div>
                      </SwiperSlide>
                    </div>
                  ))
                )}
              </Swiper>

              <h3 className="recent">Recents</h3>
              <Swiper
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                pagination={{ type: "fraction" }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {data == null ? (
                  <SwiperSlide
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img src={waiting2} alt="" />
                  </SwiperSlide>
                ) : data.length === 0 ? (
                  <SwiperSlide
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {" "}
                    No data Found
                  </SwiperSlide>
                ) : (
                  data.map((element, index) => (
                    <div key={index} onClick={() => playSong(index)}>
                      <SwiperSlide className="song">
                        <img
                          src={element.img}
                          height={"60%"}
                          alt={element.name}
                          onClick={() => playSong(index)}
                        />
                        <div>
                          <p onClick={() => playSong(index)}>
                            {decodeEntities(element.name)}
                          </p>
                          <p className="capitalize">{element.language}</p>
                        </div>
                      </SwiperSlide>
                    </div>
                  ))
                )}
              </Swiper>
            </div>
          </div>
          {/* section 3 */}
          <div className={`md:w-[40%] w-full`}>
            <Section3
              data={data}
              currplaying={currplaying}
              topsongs={topsongs}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
