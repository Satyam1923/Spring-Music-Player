import TrackItem from './TrackItem';

const TopCharts = ({ topEnglishsongs ,playSong,setIsEnglishSong,setTopSong,isEnglishSong}) => {
  return (
    <div className='topCharts'>
      <div className='topCharts-header'>
        <p>TopCharts</p>
        <p>See all</p>
      </div>
      <div>
        {topEnglishsongs.slice(0,5).map((track, index) => (
          <TrackItem isEnglishSong={isEnglishSong} setTopSong={setTopSong} setIsEnglishSong={setIsEnglishSong} key={index} id={index+1} track={track} playSong={playSong}/>
        ))}
      </div>
    </div>
  )
}

export default TopCharts