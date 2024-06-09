import React, { useState } from 'react';
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import he from "he";
import { IoIosLogIn } from "react-icons/io";
import { RiNotification3Fill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import both FaHeart and FaRegHeart
import { Link } from "react-router-dom";

const Section3 = ({ data, setIsEnglishSong, index, topsongs, playSong, isTopSong, setTopSong, isEnglishSong, topEnglishsongs, favorites, setFavorites }) => {
  const decodeEntities = (str) => {
    return he.decode(str);
  };

  const isFavorite = (song) => {
    return favorites.some((fav) => fav.id === song.id);
  };

  const toggleFavorite = (song) => {
    setFavorites((prevFavorites) => {
      if (isFavorite(song)) {
        return prevFavorites.filter((fav) => fav.id !== song.id);
      } else {
        return [...prevFavorites, song];
      }
    });
  };

  return (
    <div className='section3'>
      <div className="links">
        <div className="link"><IoIosLogIn fontSize={"25px"} color={"white"} /></div>
        <div className="link"><RiNotification3Fill fontSize={"25px"} color={"white"} /></div>
        <Link to="/settings">
          <div className="link"><IoSettings fontSize={"25px"} color={"white"} /></div>
        </Link>
      </div>

      <div className="Card1">
        <p style={{ marginLeft: "10px" }}>Top Artist</p>
        {topsongs !== null &&
          topsongs !== undefined &&
          topsongs.slice(0, 3).map((element, index) => (
            <div
              className="result-item"
              key={element.id}
              onClick={() => {
                setTopSong(true);
                setIsEnglishSong(false);
                playSong(index);
              }}
            >
              <div className="songresult">
                <img
                  src={element.image[2].url}
                  alt={element.name}
                  height="15px"
                  width="15px"
                />
                <div className="search-details">
                  <p>{element.name}</p>
                  <p>{element.artists.primary[0].name}</p>
                </div>
                <div className="favorite-icon" onClick={(e) => { e.stopPropagation(); toggleFavorite(element); }}>
        {isFavorite(element) ? <FaHeart className="heart-icon" style={{ color: "red" }} /> : <FaRegHeart className="heart-icon" style={{ color: "gray" }} />}
      </div>
              </div>
            </div>
          ))}
      </div>

      <hr />

      {
        isTopSong || data || isEnglishSong ?
          <div className="Card2">
            <div className="details2">
              {
                isTopSong ?
                  <>
                    <div className="song-info">
                      <img
                        src={topsongs && topsongs[index].image[2].url}
                        height="100px"
                        width="100px"
                      />
                      <div className="favorite-icon" onClick={() => toggleFavorite(topsongs[index])}>
                        {isFavorite(topsongs[index]) ? <FaHeart className="heart-icon" style={{ color: "white" }} /> : <FaRegHeart className="heart-icon" style={{ color: "gray" }} />}
                      </div>
                    </div>
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
                  isEnglishSong ? <>
                    <div className="song-info">
                      <img
                        src={topEnglishsongs && topEnglishsongs[index].image[2].url}
                        height="100px"
                        width="100px"
                      />
                      <div className="favorite-icon" onClick={(e) => { e.stopPropagation(); toggleFavorite(element); }}>
                  {isFavorite(element) ? <FaHeart className="heart-icon" style={{ color: "red" }} /> : <FaRegHeart className="heart-icon" style={{ color: "gray" }} />}
                </div>
                    </div>
                    <p>
                      {topEnglishsongs &&
                        topEnglishsongs.length > 0 &&
                        topEnglishsongs[index] &&
                        decodeEntities(topEnglishsongs[index].name)}
                    </p>
                    <p>
                      {topEnglishsongs &&
                        topEnglishsongs.length > 0 &&
                        topEnglishsongs[index] &&
                        topEnglishsongs[index].artists.primary[0].name
                      }
                    </p>
                  </> :
                    <>
                      <div className="song-info">
                        <img
                          src={data && data[index].image[2].url}
                          height="100px"
                          width="100px"
                        />
                        <div className="favorite-icon" onClick={() => toggleFavorite(data[index])}>
                          {isFavorite(data[index]) ? <FaHeart className="heart-icon" style={{ color: "white" }} /> : <FaRegHeart className="heart-icon" style={{ color: "gray" }} />}
                        </div>
                      </div>
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
              {
                isTopSong ? <AudioPlayer
                  autoPlay
                  src={topsongs && topsongs[index].downloadUrl[4].url}
                  preload="metadata"
                  onError={() => {
                    console.log("error playing audio");
                  }}
                  style={{ height: "110px", backgroundColor: "#5773ff", color: "white", borderRadius: "7px" }}
                /> :
                  isEnglishSong ? <AudioPlayer
                    autoPlay
                    src={topEnglishsongs && topEnglishsongs[index].downloadUrl[4].url}
                    preload="metadata"
                    onError={() => {
                      console.log("error playing audio");
                    }}
                    style={{ height: "110px", backgroundColor: "#5773ff", color: "white", borderRadius: "7px" }}
                  /> :
                    <AudioPlayer
                      autoPlay
                      src={data && data[index].downloadUrl[4].url}
                      preload="metadata"
                      onError={() => {
                        console.log("error playing audio");
                      }}
                      style={{ height: "110px", backgroundColor: "#5773ff", color: "white", borderRadius: "7px" }}
                    />
              }
            </div>
          </div>
          : null
      }
    </div>
  );
};

export default Section3;
