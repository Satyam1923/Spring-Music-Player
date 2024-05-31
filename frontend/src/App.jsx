import { useState, useEffect, useRef } from "react";
import "react-h5-audio-player/lib/styles.css";
import "./App.css";
import axios from "axios";
import he from "he";
import Sidebar from "./components/Sidebar";
import Section3 from "./components/Section3";
import waiting from "./Images/neo-sakura-girl-and-dog-waiting-for-the-bus-in-the-rain.gif";
import waiting2 from "./Images/waiting2.gif";
import { FaSearch, FaUser } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import Settings from "./components/Settings";

const App = () => {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [timePassed, setTimePassed] = useState(0);
  const [currplaying, setCurrplaying] = useState(0);
  const [topsongs, setTopsongs] = useState([]);
  const [swiperRef, setSwiperRef] = useState(null);

  const [isTopSong, setTopSong] = useState(false);
  const inputRef = useRef(null);

  const decodeEntities = (str) => {
    return he.decode(str);
  };

  const fetchSongData = async () => {

    fetch(`https://jio-savaan-private.vercel.app/api/search/songs?query=${encodeURIComponent(searchQuery)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          console.log("response.json()")
          return response.json();
        }
      })
      .then(data => {
        console.log("data");
        console.log(data.data.results);
        setData(data.data.results);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      })

  };

  useEffect(() => {
    const fetchTopSong = async () => {
      try {
        const response = await axios.get("https://jio-savaan-private.vercel.app/api/search/songs?query=top songs");
        setTopsongs(response.data.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopSong();

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get("http://jiosaavn-olj6ym1v4-thesumitkolhe.vercel.app/api/albums?link=https://www.jiosaavn.com/album/houdini/OgwhbhtDRwM");
        console.log("suggestions songs");
        console.log(response);

      } catch (error) {
        console.log(error)
      }
    }
    fetchSuggestions();
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
    console.log("index");
    console.log(index);
    setCurrplaying(index);
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={
          <div className="ui">
            <Sidebar handleFocus={handleFocus} />
            <div className="avatar">
              <div className="logo">
                <FaUser fontSize="15px" color="white" />
              </div>
              <div className="text">Username</div>
            </div>
            <div className="section2">

              <div className="searchbar searchbar2">
                <input
                  type="search"
                  placeholder="Search Song"
                  name="song"
                  ref={inputRef}
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
                    if (searchQuery !== "") {
                      console.log("started fetching song....")
                      fetchSongData();
                    } else {
                      console.log("empty input query");
                    }
                  }}
                >
                  <div className="homesearchbar">
                    <FaSearch className="homesearchlogo" />
                    <p>Search</p>
                  </div>
                </button>
              </div>

              <div className="song_content">
                <b>Song Results</b>

                <Swiper
                  onSwiper={setSwiperRef}
                  slidesPerView={4}
                  spaceBetween={30}
                  pagination={{
                    type: "fraction",
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  {data == null ? (
                    ''
                  ) : (
                    data !== null &&
                    data !== undefined &&
                    data.map((element, index) => (
                      <div key={element.id} onClick={() => {
                        setTopSong(false);
                        playSong(index)
                      }}>
                        <SwiperSlide className="song">
                          <img
                            src={element.image[1].url}
                            alt={element.name}
                            onClick={() => {
                              setTopSong(false);
                              playSong(index)
                            }}
                          />
                          <p onClick={() => {
                            setTopSong(false);
                            playSong(index)
                          }}>
                            {decodeEntities(element.name)}
                          </p>
                        </SwiperSlide>
                      </div>
                    ))
                  )}
                </Swiper>

                <b>Recents</b>
                <Swiper
                  onSwiper={setSwiperRef}
                  slidesPerView={4}
                  spaceBetween={30}
                  pagination={{
                    type: "fraction",
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  {data == null ? (
                    ''
                  ) : (
                    data !== null &&
                    data !== undefined &&
                    data.map((element, index) => (
                      <div key={element.id} onClick={() => {
                        setTopSong(false);
                        playSong(index)
                      }}>
                        <SwiperSlide className="song">
                          <img
                            src={element.image[2].url}
                            height={"60%"}
                            alt={element.name}
                            onClick={() => {
                              setTopSong(false);
                              playSong(index)
                            }}
                          />
                          <p onClick={() => {
                            setTopSong(false);
                            playSong(index)
                          }}>
                            {decodeEntities(element.name)}
                          </p>
                        </SwiperSlide>
                      </div>
                    ))
                  )}
                </Swiper>
              </div>
            </div>
            <Section3 data={data} index={currplaying} playSong={playSong} topsongs={topsongs} isTopSong={isTopSong} setTopSong={setTopSong} />
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
