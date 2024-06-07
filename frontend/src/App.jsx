import { useState, useEffect, useRef } from "react";
import "react-h5-audio-player/lib/styles.css";
import "./App.css";
import axios from "axios";
import he from "he";
import Sidebar from "./components/Sidebar";
import Section3 from "./components/Section3";
import Genres from "./components/Genres";
import TopCharts from "./components/TopCharts";
import Aboutus from "./pages/Aboutus";
import Terms from "./pages/Terms";

import { FaUser } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PagenotFound from "./components/PagenotFound";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import TopArtists from "./components/TopArtists";
import Settings from "./components/Settings";
import Search from "./components/Search/Search";
import Footer from "./components/Footer";
import Contactus from "./pages/Contactus";


const App = () => {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currplaying, setCurrplaying] = useState(0);
  const [topsongs, setTopsongs] = useState([]);
  const [searchVisiblity, setSearchVisiblity] = useState(true);
  const [songSuggestion,setSongSuggestion]=useState([])
  const [isTopSong, setTopSong] = useState(false);
  const inputRef = useRef(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [topEnglishsongs, setTopEnglishsongs] = useState([]);
  const [isEnglishSong, setIsEnglishSong] = useState(false);

  // this is for debugging the ui
  const [debug, setDebug] = useState(false)
  useEffect(() => {
    // Event handler function
    const handleKeypress = (e) => {
      console.log(e.key);
      if (e.key === '`') {
        setDebug((prevDebug) => !prevDebug);
      }
    };
    window.addEventListener('keypress', handleKeypress);
    return () => {
      window.removeEventListener('keypress', handleKeypress);
    };
  }, []);
  useEffect(()=>{
    const searchSongSuggestions=()=>{
      fetch(`https://jio-savaan-private.vercel.app/api/search/songs?query=${encodeURIComponent(searchQuery)}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            } else {
              return response.json();
            }
          })
          .then(data => {
            setSongSuggestion(data.data.results);
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          })
    }
    if(searchQuery.length===1){
      searchSongSuggestions()
    }
    else if(searchQuery.length>1){
      let filtering=songSuggestion.filter(ele=>ele.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setSongSuggestion(filtering)
    }
    else{
      setSongSuggestion([])
    }
    },[searchQuery])
  const decodeEntities = (str) => {
    return he.decode(str);
  };

  const fetchSongData = async () => {

    fetch(`https://jio-savaan-private.vercel.app/api/search/songs?query=${encodeURIComponent(searchQuery)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          return response.json();
        }
      })
      .then(data => {
        console.log("data");
        console.log(data.data.results);
        setData(data.data.results);
        setShowSearchResults(true);
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
    const fetchTopEnglish = async () => {
      try {
        const response = await axios.get("https://jio-savaan-private.vercel.app/api/search/songs?query=top english songs");
        setTopEnglishsongs(response.data.data.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTopEnglish();
  }, []);

  

  const playSong = (index) => {
    setCurrplaying(index);
  };

  const handleFocus = () => {
    setSearchVisiblity(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };


  if (debug) {
    return <Search />
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={
            <div>
            <div className="ui">
              <Sidebar handleFocus={handleFocus} setSearchVisiblity={setSearchVisiblity} />
              <div className="avatar">
                <div className="logo">
                  <FaUser fontSize="15px" color="white" />

                </div>
                <div className="text">Username</div>
              </div>
              <div className="section2">
                <div className="searchbar searchbar2">
                  {
                    searchVisiblity ? <div className="search-container">
                      <i className="fas fa-search search-icon"></i>
                      <input
                        type="search"
                        placeholder="What do you want to play?"
                        name="song"
                        ref={inputRef}
                        className="box1"
                        required
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            if (searchQuery !== "") {
                              console.log("started fetching song....")
                              fetchSongData();
                            } else {
                              console.log("empty input query");
                            }
                          }
                        }}
                        onChange={(e) => {
                          e.preventDefault();
                          setSearchQuery(e.target.value);
                        }}
                      />
                          
<div id="searchResultsSuggestion">
{
  songSuggestion?.map((item,index)=>(
    <p  key={`song_name${index}`} onClick={()=>{setSearchQuery(item.name);setSongSuggestion([]);fetchSongData();}}>{item.name}</p>
  ))
}
</div>
                    </div> : ''
                  }
                </div>

                <TopArtists topsongs={topsongs} setTopSong={setTopSong} playSong={playSong}></TopArtists>
                {
                  showSearchResults ?
                    <div className="song_content">
                      <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
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
                              setIsEnglishSong(false);
                              playSong(index)
                            }}>
                              <SwiperSlide className="song">
                                <img
                                  src={element.image[1].url}
                                  alt={element.name}
                                  onClick={() => {
                                    setTopSong(false);
                                    setIsEnglishSong(false);
                                    playSong(index)
                                  }}
                                />
                                <p onClick={() => {
                                  setTopSong(false);
                                  setIsEnglishSong(false);
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
                    : <div className="genresAndTopcharts">
                      <Genres />
                      <TopCharts setTopSong={setTopSong} isEnglishSong={isEnglishSong} setIsEnglishSong={setIsEnglishSong} topEnglishsongs={topEnglishsongs} playSong={playSong} />
                    </div>
                }

              </div>
              <Section3 setIsEnglishSong={setIsEnglishSong} data={data} index={currplaying} playSong={playSong} topsongs={topsongs} isTopSong={isTopSong} setTopSong={setTopSong} isEnglishSong={isEnglishSong} topEnglishsongs={topEnglishsongs} />
            </div>
             <Footer/>
            </div>
          } />
          <Route path="/aboutus" element={<Aboutus/>}/>
          <Route path="/terms" element={<Terms/>}/>
          <Route path="/contactus" element={<Contactus/>}/>
          <Route path="*" element={<PagenotFound />} />
        </Routes>
      </Router>
    );
  }

};

export default App;
