import { useState } from 'react';

const Culture = () => {
  // Static data for demonstration purposes
  const genres = [
    { name: 'Rock', description: 'Rock music is characterized by guitar riffs, drums, and strong rhythms.' },
    { name: 'Pop', description: 'Pop music is known for catchy melodies, upbeat rhythms, and relatable lyrics.' },
    { name: 'Hip-Hop', description: 'Hip-hop music features rap vocals, rhythmic beats, and DJ scratching.' },
    { name: 'Electronic', description: 'Electronic music utilizes synthesizers, drum machines, and digital production techniques.' },
    { name: 'Jazz', description: 'Jazz music emphasizes improvisation, syncopation, and complex harmonic structures.' },
    { name: 'Classical', description: 'Classical music includes compositions by Mozart, Beethoven, and other classical composers.' },
    { name: 'Blues', description: 'Blues music is characterized by soulful vocals, guitar solos, and a 12-bar blues structure.' },
    { name: 'Country', description: 'Country music features storytelling lyrics, acoustic guitars, and fiddles.' },
    { name: 'Reggae', description: 'Reggae music originated in Jamaica and is known for its offbeat rhythms and social commentary lyrics.' },
    { name: 'Folk', description: 'Folk music encompasses traditional songs, acoustic instrumentation, and storytelling.' },
    { name: 'R&B', description: 'R&B (Rhythm and Blues) is a genre that combines elements of soul, funk, and pop, known for its smooth vocals and soulful melodies.' },
    { name: 'Metal', description: 'Metal music is characterized by its aggressive sound, distorted guitars, and powerful vocals, often featuring complex arrangements and themes.' },
  ];

  const trendingArtistsIndia = [
    {
      name: 'Arijit Singh',
      imageUrl: 'https://pbs.twimg.com/profile_images/1387822869619478540/lhocXKtV_400x400.jpg', // Replace with actual image URL
      bio: 'Arijit Singh is an Indian playback singer known for his soulful voice and romantic Bollywood hits.',
      genres: ['Pop', 'Bollywood'],
    },
    {
      name: 'Sunidhi Chauhan',
      imageUrl: 'https://static.toiimg.com/thumb/msid-108363193,width-1280,height-720,resizemode-4/108363193.jpg', // Replace with actual image URL
      bio: 'Sunidhi Chauhan is an Indian playback singer known for her powerful voice and versatility across various genres in Bollywood music.',
      genres: ['Bollywood', 'Pop', 'Rock'],
    },
    {
      name: 'A.R. Rahman',
      imageUrl: 'https://cdn.siasat.com/wp-content/uploads/2023/06/BeFunky-collage-23.jpg', // Replace with actual image URL
      bio: 'A.R. Rahman is an Indian composer and singer known for his groundbreaking work in film music.',
      genres: ['Pop', 'Bollywood', 'World'],
    },
    {
      name: 'Atif Aslam',
      imageUrl: 'https://static.toiimg.com/thumb/msid-80172462,width-400,resizemode-4/80172462.jpg', // Replace with actual image URL
      bio: 'Atif Aslam is a Pakistani playback singer known for his melodious voice and romantic songs.',
      genres: ['Pop', 'Bollywood', 'Sufi'],
    },
    {
      name: 'Krsna',
      imageUrl: 'https://www.allaboutmusic.in/wp-content/uploads/2023/08/KRNA-1.jpg', // Replace with actual image URL
      bio: 'Krsna is an Indian rapper known for his lyrical prowess and versatile style. He is celebrated for his sharp wordplay and insightful lyrics, making him a respected figure in the Indian hip-hop scene.',
      genres: ['Hip-Hop', 'Indian Rap', 'Desi Hip-Hop'],
    },
    {
      name: 'Sonu Nigam',
      imageUrl: 'https://rukminim2.flixcart.com/image/850/1000/l1whaq80/poster/z/z/0/small-poster-bollywood-singer-sonu-nigam-wall-poster-300gsm-matt-original-imagddykyy3sghuh.jpeg?q=90&crop=false', // Replace with actual image URL
      bio: 'Sonu Nigam is an Indian playback singer known for his melodious voice and versatility in singing various genres.',
      genres: ['Pop', 'Bollywood', 'Ghazals'],
    },
    {
      name: 'Shreya Ghoshal',
      imageUrl: 'https://blackhattalent.com/wp-content/uploads/2023/08/Shreya-Ghoshal5-scaled.jpg', // Replace with actual image URL
      bio: 'Shreya Ghoshal is an Indian playback singer known for her soulful voice and numerous Bollywood hits.',
      genres: ['Bollywood', 'Indian Classical'],
    },
    {
      name: 'Mohit Chauhan',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb16691117e2ba803946b203ba', // Replace with actual image URL
      bio: 'Mohit Chauhan is an Indian playback singer known for his unique voice and popular Bollywood songs.',
      genres: ['Pop', 'Bollywood', 'Indie'],
    },
    {
      name: 'Mohammad Rafi',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Mohammed_Rafi_2016_postcard_of_India_crop-flip.jpg', // Replace with actual image URL
      bio: 'Mohammad Rafi was an Indian playback singer known for his versatility and soulful renditions in Bollywood.',
      genres: ['Bollywood', 'Indian Classical'],
    },
    {
      name: 'Lata Mangeshkar',
      imageUrl: 'https://cdn.britannica.com/59/165759-050-30812DEE/Lata-Mangeshkar.jpg', // Replace with actual image URL
      bio: 'Lata Mangeshkar is an Indian playback singer and music director known for her iconic voice and contribution to Indian music.',
      genres: ['Bollywood', 'Indian Classical'],
    },
    {
      name: 'Diljit Dosanjh',
      imageUrl: 'https://images.indianexpress.com/2024/04/Diljit-edited-1-1.jpg?w=414', // Replace with actual image URL
      bio: 'Diljit Dosanjh is an Indian singer and actor known for his Punjabi and Hindi songs, blending traditional Punjabi music with modern beats.',
      genres: ['Punjabi', 'Bollywood', 'Pop'],
    },
    {
      name: 'Badshah',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAlKfaREs37aDzRR9yGh_ImnZet6UQQp2jLA&s', // Replace with actual image URL
      bio: 'Badshah is an Indian rapper and singer known for his Hindi, Punjabi, and Hinglish songs, recognized for his catchy beats and energetic performances.',
      genres: ['Hip-Hop', 'Pop', 'Bollywood'],
    },
    
  ];

  const trendingArtistsWorld = [
    {
      name: 'Rihanna',
      imageUrl: 'https://assets.vogue.com/photos/63e67c2653cf7705e1e06f3a/4:3/w_2560%2Cc_limit/GettyImages-1246958447.jpg', // Replace with actual image URL
      bio: 'Rihanna is a Barbadian singer, actress, and businesswoman known for her distinctive voice and international pop hits.',
      genres: ['Pop', 'R&B', 'Dancehall'],
    },
    {
      name: 'Drake',
      imageUrl: 'https://www.billboard.com/wp-content/uploads/2023/02/Drake-2022-billboard-1548.jpg?w=942&h=623&crop=1', // Replace with actual image URL
      bio: 'Drake is a Canadian rapper, singer, songwriter, and actor known for his introspective lyrics and chart-topping albums.',
      genres: ['Hip-Hop', 'R&B'],
    },
    {
      name: 'Coldplay',
      imageUrl: 'https://www.billboard.com/wp-content/uploads/2022/09/Coldplay-2022-cr-James-Marcus-Haney-billboard-1548.jpg?w=942&h=623&crop=1', // Replace with actual image URL
      bio: 'Coldplay is a British rock band known for their anthemic songs and global appeal in alternative and pop-rock genres.',
      genres: ['Rock', 'Alternative', 'Pop'],
    },
    {
      name: 'Eminem',
      imageUrl: 'https://www.rollingstone.com/wp-content/uploads/2024/05/eminem-teaser-slim-shady.jpg?w=1581&h=1054&crop=1', // Replace with actual image URL
      bio: 'Eminem is an American rapper, songwriter, and record producer known for his technical prowess and controversial lyrics.',
      genres: ['Hip-Hop', 'Rap'],
    },
    {
      name: 'The Weeknd',
      imageUrl: 'https://www.billboard.com/wp-content/uploads/2023/03/the-weeknd-avatar-premiere-2022-billboard-1548.jpg?w=942&h=623&crop=1', // Replace with actual image URL
      bio: 'The Weeknd is a Canadian singer, songwriter, and record producer known for his distinctive voice and dark, atmospheric R&B music.',
      genres: ['R&B', 'Pop', 'Alternative'],
    },
    {
      name: 'Maroon 5',
      imageUrl: 'https://media.npr.org/assets/music/news/2010/09/maroon-5af6f2c1145368cf09ec543767a4db98644a297f.jpg', // Replace with actual image URL
      bio: 'Maroon 5 is an American pop rock band known for their catchy songs and frontman Adam Levine\'s vocals.',
      genres: ['Pop', 'Rock'],
    },
    {
      name: 'Bruno Mars',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd', // Replace with actual image URL
      bio: 'Bruno Mars is an American singer, songwriter, and record producer known for his versatile musical style encompassing pop, R&B, and funk.',
      genres: ['Pop', 'R&B', 'Funk'],
    },
    {
      name: 'Taylor Swift',
      imageUrl: 'https://media.wired.com/photos/6621be351ebbf4d79be15691/16:9/w_2400,h_1350,c_limit/GettyImages-1987932445.jpg', // Replace with actual image URL
      bio: 'Taylor Swift is an American singer-songwriter known for her narrative songwriting, catchy melodies, and crossover success in pop and country music.',
      genres: ['Pop', 'Country'],
    },
    {
      name: 'Kanye West',
      imageUrl: 'https://img.etimg.com/thumb/width-1600,height-900,imgsize-92208,resizemode-75,msid-107605636/news/international/us/fans-slam-kanye-west-for-name-dropping-taylor-swift-in-new-song-carnivalknow-about-the-controversy.jpg', // Replace with actual image URL
      bio: 'Kanye West is an American rapper, record producer, and fashion designer known for his innovative approach to music and outspoken personality.',
      genres: ['Hip-Hop', 'Rap'],
    },
    {
      name: 'Ed Sheeran',
      imageUrl: 'https://ew.com/thmb/kP34ASX1oi2K4epH2aSa1h-1fIY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ed-Sheeran-091923-f2c47324787042218aaba2ab888b0835.jpg', // Replace with actual image URL
      bio: 'Ed Sheeran is a British singer-songwriter known for his heartfelt acoustic pop songs and chart-topping albums.',
      genres: ['Pop', 'Folk', 'Acoustic'],
    },
    {
      name: 'Beyoncé',
      imageUrl: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2022-03/220323-beyonce-ew-510p-86a49a.jpg', // Replace with actual image URL
      bio: 'Beyoncé is an American singer, songwriter, actress, and record producer known for her powerful vocals and influence in pop and R&B music.',
      genres: ['Pop', 'R&B'],
    },
    {
      name: 'Billie Eilish',
      imageUrl: 'https://media.pitchfork.com/photos/608839f84c67840074db8afb/1:1/w_450%2Cc_limit/Billie-Eilish-Happier-Than-Ever.jpeg', // Replace with actual image URL
      bio: 'Billie Eilish is an American singer-songwriter known for her distinctive voice, dark lyrics, and success in alternative pop and electropop music.',
      genres: ['Pop', 'Alternative'],
    },
    
  ];


  const [startIndexGenres, setStartIndexGenres] = useState(0);
  const [startIndexIndia, setStartIndexIndia] = useState(0);
  const [startIndexWorld, setStartIndexWorld] = useState(0);
  const artistsPerPage = 4; // Number of artists to display per page

  // Handle pagination for genres
  const handlePrevGenres = () => {
    if (startIndexGenres - artistsPerPage >= 0) {
      setStartIndexGenres(startIndexGenres - artistsPerPage);
    }
  };

  const handleNextGenres = () => {
    if (startIndexGenres + artistsPerPage < genres.length) {
      setStartIndexGenres(startIndexGenres + artistsPerPage);
    }
  };

  // Handle pagination for trending artists in India
  const handlePrevIndia = () => {
    if (startIndexIndia - artistsPerPage >= 0) {
      setStartIndexIndia(startIndexIndia - artistsPerPage);
    }
  };

  const handleNextIndia = () => {
    if (startIndexIndia + artistsPerPage < trendingArtistsIndia.length) {
      setStartIndexIndia(startIndexIndia + artistsPerPage);
    }
  };

  // Handle pagination for trending artists worldwide
  const handlePrevWorld = () => {
    if (startIndexWorld - artistsPerPage >= 0) {
      setStartIndexWorld(startIndexWorld - artistsPerPage);
    }
  };

  const handleNextWorld = () => {
    if (startIndexWorld + artistsPerPage < trendingArtistsWorld.length) {
      setStartIndexWorld(startIndexWorld + artistsPerPage);
    }
  };

  return (
    <div className="text-white p-8 text-center">
      <div className="text-3xl font-bold mb-4">Culture</div>
      <div className="text-xl">Explore the culture of music!</div>
      <div className="text-lg text-gray-400 mt-2">Discover new genres, artists, and more.</div>

      {/* Display top genres */}
      <div className="mt-8">
        <div className="text-xl font-bold mb-4">Top Genres</div>
        <div className="flex flex-wrap justify-center">
          {genres.slice(startIndexGenres, startIndexGenres + artistsPerPage).map((genre) => (
            <div key={genre.name} className="max-w-xs bg-gray-800 rounded-lg overflow-hidden mb-4 mr-4">
              <div className="p-4">
                <div className="text-lg font-semibold text-white">{genre.name}</div>
                <div className="text-sm text-gray-400 mt-2">{genre.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons for genres */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handlePrevGenres}
            className={`bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l ${
              startIndexGenres === 0 ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={startIndexGenres === 0}
          >
            Prev
          </button>
          <button
            onClick={handleNextGenres}
            className={`bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r ${
              startIndexGenres + artistsPerPage >= genres.length ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={startIndexGenres + artistsPerPage >= genres.length}
          >
            Next
          </button>
        </div>
      </div>

      {/* Display top trending artists in India */}
      <div className="mt-8">
        <div className="text-xl font-bold mb-4">Top Trending Artists in India</div>
        <div className="flex flex-wrap justify-center">
          {trendingArtistsIndia.slice(startIndexIndia, startIndexIndia + artistsPerPage).map((artist) => (
            <div key={artist.name} className="max-w-xs bg-gray-800 rounded-lg overflow-hidden mb-4 mr-4">
              <img src={artist.imageUrl} alt={artist.name} className="w-full h-64 object-cover rounded-t-lg" />
              <div className="p-4">
                <div className="text-lg font-semibold text-white">{artist.name}</div>
                <div className="text-sm text-gray-400 mt-2">{artist.bio}</div>
                <div className="text-xs text-gray-500 mt-2">{artist.genres.join(', ')}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons for India */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handlePrevIndia}
            className={`bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l ${
              startIndexIndia === 0 ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={startIndexIndia === 0}
          >
            Prev
          </button>
          <button
            onClick={handleNextIndia}
            className={`bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r ${
              startIndexIndia + artistsPerPage >= trendingArtistsIndia.length ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={startIndexIndia + artistsPerPage >= trendingArtistsIndia.length}
          >
            Next
          </button>
        </div>
      </div>

      {/* Display top trending artists worldwide */}
      <div className="mt-8">
        <div className="text-xl font-bold mb-4">Top Trending Artists Worldwide</div>
        <div className="flex flex-wrap justify-center">
          {trendingArtistsWorld.slice(startIndexWorld, startIndexWorld + artistsPerPage).map((artist) => (
            <div key={artist.name} className="max-w-xs bg-gray-800 rounded-lg overflow-hidden mb-4 mr-4">
              <img src={artist.imageUrl} alt={artist.name} className="w-full h-64 object-cover rounded-t-lg" />
              <div className="p-4">
                <div className="text-lg font-semibold text-white">{artist.name}</div>
                <div className="text-sm text-gray-400 mt-2">{artist.bio}</div>
                <div className="text-xs text-gray-500 mt-2">{artist.genres.join(', ')}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons for worldwide */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handlePrevWorld}
            className={`bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l ${
              startIndexWorld === 0 ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={startIndexWorld === 0}
          >
            Prev
          </button>
          <button
            onClick={handleNextWorld}
            className={`bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r ${
              startIndexWorld + artistsPerPage >= trendingArtistsWorld.length ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={startIndexWorld + artistsPerPage >= trendingArtistsWorld.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
   
}

export default Culture;
