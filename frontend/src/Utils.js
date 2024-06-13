import axios from "axios";

export function secIntoMinSec(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${formattedSeconds}`;
}

// fetch song by its name
export const fetchSongData = async (songName, setCurrSong) => {
  fetch(
    `https://jio-savaan-private.vercel.app/api/search/songs?query=${encodeURIComponent(songName)}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      setCurrSong(data.data.results[0]);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

// fetch song by its name
export const fetchSongsByName = async (songName, setSongs, count = 6) => {
  fetch(
    `https://jio-savaan-private.vercel.app/api/search/songs?query=${encodeURIComponent(songName)}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        return response.json();
      }
    })
    .then((response) => {
      const songs = [];
      for (let i = 0; i < count; i++) {
        songs.push(response.data.results[i]);
      }
      setSongs(songs);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

// fetch top songs
export const fetchTopSongs = async (setTopSongs, count = 20) => {
  try {
    const response = await axios.get("https://jio-savaan-private.vercel.app/api/search/songs?query=top songs");
    console.log(response);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return setTopSongs(response.data.data.results.slice(0, count));
  } catch (error) {
    console.error(error);
    throw error;
  }
};
