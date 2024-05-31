import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import he from "he";
import { IoIosLogIn } from "react-icons/io";
import { RiNotification3Fill } from "react-icons/ri";

const Section3 = ({ data, index, topsongs, playSong, isTopSong, setTopSong }) => {

    // const [isTopSong, setTopSong] = useState(false);
    const decodeEntities = (str) => {
        return he.decode(str);
    };

  return (
    <div className='section3'> 
     <div className="links">
        <div className="link transition-all duration-300 ease-in-out hover:scale-110"><IoIosLogIn fontSize={"25px"} color={"white"}/></div>
        <div className="link transition-all duration-300 ease-in-out hover:scale-110"><RiNotification3Fill  fontSize={"25px"} color={"white"}/></div>
        <div className="link transition-all duration-300 ease-in-out hover:scale-110"><FaUser fontSize={"25px"} color={"white"} /></div> 
     </div>


    <div className="Card1">
    <p className="px-3 py-2">Top Artist</p>
    {topsongs !== null &&
        topsongs !== undefined &&
        topsongs.slice(0, 3).map((element, index) => (
    <div
        className="result-item"
        key={index}
        onClick={() => playSong(index)}
    >
        <div className="songresult">
            <img
                src={element.img}
                alt={element.name}
                height="15px"
                width="15px"
            />
            <div className="search-details">
            
                <p>
                    {decodeEntities(element.artist)} -{" "}
                    {element.year}
                </p>
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

            {
                isTopSong || data ?
                    <div className="Card2">
                        <div className="details2">

                            {
                                isTopSong ?
                                    <>
                                        <img
                                            src={topsongs && topsongs[index].image[2].url}
                                            height="100px"
                                            width="100px"
                                        />
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

                                        </p>
                                    </> :
                                    <>
                                        <img
                                            src={data && data[index].image[2].url}
                                            height="100px"
                                            width="100px"
                                        />
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
                                        </p>
                                    </>
                            }
                        </div>
                        <div className="audioplayer">
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
                                    style={{ backgroundColor: "#5773ff", color: "white", borderRadius: "7px" }}
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
                                            style={{ backgroundColor: "#5773ff", color: "white", borderRadius: "7px" }}
                                        />
                                    )
                            }
                        </div>
                    </div>
                    : <div></div>
            }
        </div>
    )
}

export default Section3