import TrackItem from './TrackItem';

const TopCharts = () => {
  const tracks = [
    { number: '01', title: 'Havanna', artist: 'Camila Cabello', duration: '3:00' },
    { number: '02', title: 'Song 2', artist: 'Artist 2', duration: '4:00' },
    { number: '03', title: 'Song 3', artist: 'Artist 3', duration: '2:30' },
    { number: '03', title: 'Song 3', artist: 'Artist 3', duration: '2:30' },
  ];
  return (
    <div className='topCharts'>
      <div className='topCharts-header'>
        <p>TopCharts</p>
        <p>See all</p>
      </div>
      <div>
        {tracks.map((track, index) => (
          <TrackItem key={index} track={track} />
        ))}
      </div>
    </div>
  )
}

export default TopCharts