import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import he from "he";
import { IoIosLogIn } from "react-icons/io";
import { RiNotification3Fill } from "react-icons/ri";
import empty from "../Images/empty.png";
import axios from "axios";

const Section3 = ({ data, currplaying }) => {
    const [topArtists, setTopArtists] = useState([]);
    const [token, setToken] = useState("");
  
    useEffect(() => {
        // Function to get the access token
        const getToken = async () => {
          const clientId = 'ea0565133c404169ba2d7570aa10f75b'; 
          const clientSecret = '1b0a383640f64d0ca13d14ad4ce65051';
          const authUrl = 'https://accounts.spotify.com/api/token';
          
          const authOptions = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`) // Ensure correct usage of btoa
            }
          };
      
          try {
            const response = await axios.post(authUrl, 'grant_type=client_credentials', authOptions);
            setToken(response.data.access_token);
          } catch (error) {
            console.error('Error fetching the token:', error);
          }
        };
      
        getToken();
      }, []);
      
  
      useEffect(() => {
        const fetchTopArtists = async () => {
          if (token) {
            try {
              // Corrected the endpoint to fetch new releases
              const response = await axios.get(
                "https://api.spotify.com/v1/browse/new-releases",
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                  params: {
                    limit: 5,
                  },
                }
              );
      
              // Adjusted the data extraction to match the API response
              const artistDetails = response.data.albums.items.slice(0, 5).map((album) => ({
                id: album.id,
                name: album.artists[0].name,
                image: album.images.length > 0 ? album.images[0].url : null,
              }));
      
              setTopArtists(artistDetails);
            } catch (error) {
              console.error("Error fetching top artists:", error);
            }
          }
        };
      
        fetchTopArtists();
      }, [token]);
      
  
    const decodeEntities = (str) => {
      return he.decode(str);
    };
  

  return (
    <div className="section3">
      <div className="links">
        <div className="link">
          <IoIosLogIn fontSize={"25px"} color={"white"} />
        </div>
        <div className="link">
          <RiNotification3Fill fontSize={"25px"} color={"white"} />
        </div>
      </div>

      <div className="Card1 p-4">
  <p className="text-xl font-bold mb-4">Top Artist</p>
  {topArtists &&
    topArtists.map((element) => (
      <div className="result-item flex items-center mb-4" key={element.id}>
        {element.image ? (
          <img
            src={element.image}
            alt={element.name}
            className="rounded-full h-16 w-16 mr-4"
          />
        ) : (
          <div className="flex items-center justify-center rounded-full h-16 w-16 bg-gray-300 text-white mr-4">
            No Image
          </div>
        )}
        <div className="search-details">
          <p className="text-lg font-semibold">{decodeEntities(element.name)}</p>
        </div>
      </div>
    ))}
</div>


      <hr />
      <div className="Card2">
        {data && data.length > 0 ? (
          <img
            src={data[currplaying].img}
            height="100px"
            width="100px"
            alt={decodeEntities(data[currplaying].name)}
          />
        ) : (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p>"Choose a song to play"</p>
            <img src={empty} alt="" height={"50%"} />
          </div>
        )}

        <div className="details2">
          <p>
            {data &&
              data.length > 0 &&
              data[currplaying] &&
              decodeEntities(data[currplaying].name)}
          </p>
          <p>
            {data &&
              data.length > 0 &&
              data[currplaying] &&
              decodeEntities(data[currplaying].artist)}{" "}
            {data &&
              data.length > 0 &&
              data[currplaying] &&
              data[currplaying].year}
          </p>
        </div>

        {data && (
          <AudioPlayer
            autoPlay
            src={data && data[currplaying].url}
            preload="metadata"
            style={{ backgroundColor: "transparent", color: "white" }}
          />
        )}
      </div>
    </div>
  );
};

export default Section3;
