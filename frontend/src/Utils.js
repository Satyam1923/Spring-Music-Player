import axios from "axios";

export function secIntoMinSec(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${formattedSeconds}`;
}


export const fetchSongData = async (songName, setCurrSong) => {
  try {
    const response = await axios.get(`http://localhost:3030/api/search/songs?query=${encodeURIComponent(songName)}`);
    setCurrSong(response.data.data.results[0]);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const fetchSonsgByName = async (songName, setSongs, count = 6) => {
  try {
    const response = await axios.get(`http://localhost:3030/api/search/songs?query=${encodeURIComponent(songName)}`);
    const songs = response.data.data.results.slice(0, count);
    setSongs(songs);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const fetchTopSongs = async (setTopSongs, count = 6) => {
  try {
    const response = await axios.get("http://localhost:3030/api/search/songs?query=top songs");
    const topSongs = response.data.data.results.slice(0, count);
    setTopSongs(topSongs);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
