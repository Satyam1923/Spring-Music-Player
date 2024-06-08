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

// fetch top songs
export const fetchTopSongs = (setTopSongs, count = 6) => {
  try {
    axios
      .get("https://jio-savaan-private.vercel.app/api/search/songs?query=top songs")
      .then((response) => {
        const topSongs = [];
        for (let i = 0; i < count; i++) {
          topSongs.push(response.data.data.results[i]);
        }
        setTopSongs(topSongs);
      });
  } catch (error) {
    console.error(error);
  }
};
