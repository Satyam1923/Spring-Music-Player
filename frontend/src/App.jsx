import { useState, useEffect, useRef } from "react";
import "react-h5-audio-player/lib/styles.css";
import "./App.css";
import axios from "axios";
import he from "he";
import Sidebar from "./components/Sidebar";
import Section3 from "./components/Section3";
import { FaUser } from 'react-icons/fa';


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import TopArtists from "./components/TopArtists";

const App = () => {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currplaying, setCurrplaying] = useState(0);
  const [topsongs, setTopsongs] = useState([]);
  const [swiperRef, setSwiperRef] = useState(null);
  const [searchVisiblity, setSearchVisiblity] = useState(true);

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
    // fetchSuggestions();
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
    setSearchVisiblity(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  return (
    <div className="ui">
      <Sidebar handleFocus={handleFocus} setSearchVisiblity={setSearchVisiblity} />
      
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
            </div> : ''
          }
        </div>

        <TopArtists topsongs={topsongs} setTopSong={setTopSong} playSong={playSong}></TopArtists>
        <div className="song_content">
          <b>Search Results</b>

          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={4}
            spaceBetween={30}
            pagination={false}
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

          {/* <b>Recents</b>
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={4}
            // centeredSlides={true}
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
          </Swiper> */}
        </div>


      </div>

      <Section3 data={data} index={currplaying} playSong={playSong} topsongs={topsongs} isTopSong={isTopSong} setTopSong={setTopSong} />
    </div>
  );
};

export default App;
