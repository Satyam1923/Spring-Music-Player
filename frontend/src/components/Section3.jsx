import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import he from "he";
import { IoIosLogIn } from "react-icons/io";
import { RiNotification3Fill } from "react-icons/ri";
import empty from "../Images/empty.png"
import { useState } from "react";

const Section3 = ({ data, index, topsongs, playSong, isTopSong, setTopSong }) => {

    // const [isTopSong, setTopSong] = useState(false);
    const decodeEntities = (str) => {
        return he.decode(str);
    };

    return (
        <div className='section3'>
            <div className="links">
                <div className="link"><IoIosLogIn fontSize={"25px"} color={"white"} /></div>
                <div className="link"><RiNotification3Fill fontSize={"25px"} color={"white"} /></div>
            </div>


            <div className="Card1">
                <p>Top Artist</p>
                {topsongs !== null &&
                    topsongs !== undefined &&
                    topsongs.slice(0, 3).map((element, index) => (
                        <div
                            className="result-item"
                            key={element.id}
                            onClick={() => {
                                setTopSong(true);
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
                                    <p>
                                        {element.name}
                                    </p>

                                </div>
                            </div>
                        </div>
                    ))}
            </div>




            <hr />
            <div className="Card2">
                {data && data.length > 0 ? (

                    isTopSong ?
                        <img
                            src={topsongs && topsongs[index].image[2].url}
                            height="100px"
                            width="100px"
                        /> : <img
                            src={data && data[index].image[2].url}
                            height="100px"
                            width="100px"
                        />


                    // <img
                    //     src={data && data[index].image[0].url}
                    //     height="100px"
                    //     width="100px"
                    // />
                ) : (
                    <div style={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
                        <p>Choose a song to play</p>
                        <img src={empty} alt="" height={"50%"} style={{ maxHeight: "18rem" }} />
                    </div>



                )}


                <div className="details2">

                    {
                        isTopSong ?
                            <>
                                <p >
                                    {topsongs &&
                                        topsongs.length > 0 &&
                                        topsongs[index] &&
                                        decodeEntities(topsongs[index].name)}
                                </p>
                                <p >
                                    {topsongs &&
                                        topsongs.length > 0 &&
                                        topsongs[index] &&
                                        topsongs[index].artists.primary[0].name
                                    }

                                    {topsongs &&
                                        topsongs.length > 0 &&
                                        topsongs[index] &&
                                        topsongs[index].year}
                                </p>
                            </> :
                            <>
                                <p >
                                    {data &&
                                        data.length > 0 &&
                                        data[index] &&
                                        decodeEntities(data[index].name)}
                                </p>
                                <p >
                                    {data &&
                                        data.length > 0 &&
                                        data[index] &&
                                        data[index].artists.primary[0].name
                                    }

                                    {data &&
                                        data.length > 0 &&
                                        data[index] &&
                                        data[index].year}
                                </p>
                            </>
                    }
                    {/* <p >
                        {data &&
                            data.length > 0 &&
                            data[index] &&
                            decodeEntities(data[index].name)}
                    </p>
                    <p >
                        {data &&
                            data.length > 0 &&
                            data[index] &&
                            data[index].artists.primary[0].name
                        }

                        {data &&
                            data.length > 0 &&
                            data[index] &&
                            data[index].year}
                    </p> */}

                </div>

                {
                    isTopSong ? <AudioPlayer
                        autoPlay
                        src={topsongs && topsongs[index].downloadUrl[0].url}
                        preload="metadata"
                        onPlay={() => {
                            console.log("playing top song");
                        }}
                        onError={() => {
                            console.log("error playing audio");
                        }}
                        style={{ backgroundColor: "transparent", color: "white" }}
                    /> :
                        data && data.length > 0 && data[index] && (
                            <AudioPlayer
                                autoPlay
                                src={data && data[index].downloadUrl[0].url}
                                preload="metadata"
                                onPlay={() => {
                                    console.log("playing..");
                                }}
                                onError={() => {
                                    console.log("error playing audio");
                                }}
                                style={{ backgroundColor: "transparent", color: "white" }}
                            />
                        )
                }



                {/* {data && data.length > 0 && data[index] && (

                    <AudioPlayer
                        autoPlay
                        src={data && data[index].downloadUrl[0].url}
                        preload="metadata"
                        onPlay={() => {
                            console.log("playing..");
                        }}
                        onError={() => {
                            console.log("error playing audio");
                        }}
                        style={{ backgroundColor: "transparent", color: "white" }}
                    />
                )} */}

            </div>


        </div>
    )
}

export default Section3