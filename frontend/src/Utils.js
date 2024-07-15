
import axios from "axios";

export function secIntoMinSec(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${formattedSeconds}`;
}

export const fetchSongData = async (songName, setCurrSong) => {
  try {
    const response = await axios.get(`https://spring-music-player-3hyj.vercel.app/search?song=${encodeURIComponent(songName)}`);
    const jsonData = response.data;
    setCurrSong(jsonData[0]);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const fetchSonsgByName = async (songName, setSongs) => {
  try {
    const response = await axios.get(`https://spring-music-player-3hyj.vercel.app/search?song=${encodeURIComponent(songName)}`);
    const jsonData = response.data;
    const songs = jsonData;
    setSongs(songs);
    return songs;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const fetchTopSongs = async (setTopSongs) => {
  try {
    const response = await axios.get("https://spring-music-player-3hyj.vercel.app/search?song=top songs");
    const jsonData = response.data.slice(0,20);
    const topSongs = jsonData;
    setTopSongs(topSongs);
    return topSongs
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const fetchAlbumsbySongName = async (songName,setAlbums)=>{
  try{
    const response = await axios.get(`https://spring-music-player-3hyj.vercel.app/search/albums?query=${encodeURIComponent(songName)}`);
    const jsonData = response.data.slice(0, 20);
    setAlbums(jsonData);
  }catch(error){
    console.error("There was a problem with the fetch operation:", error);
  }
}

export const fetchArtistsbySongName = async (artistName,setArtists)=>{
  try{
    const response = await axios.get(`https://spring-music-player-3hyj.vercel.app/search/artists?query=${encodeURIComponent(artistName)}`);
    const jsonData = response.data.data.results.slice(0,6);
    setArtists(jsonData);
    return jsonData;
  }catch(error){
    console.error("There was a problem with the fetch operation:", error);
  }
}
