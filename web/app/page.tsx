import MusicCard from "@/components/Cards/musicCard";
import MusicPlayer from "@/components/musicPlayer/musicPlayer";
import Sidebar from "@/components/sidebar";
export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar />
        <div className="h-full w-px bg-neutral-800"></div>
        <div className="flex-1 bg-black p-5 text-white overflow-y-auto">
          <h1 className="text-2xl">Trending Now</h1>
          <div className="m-2 flex flex-wrap gap-4">
            <MusicCard
              imageUrl="https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg"
              songName="Agar Tum Saath Ho"
              artistName="Arijit Singh"
            />
            <MusicCard
              imageUrl="https://c.saavncdn.com/839/Mismatched-Season-3-Soundtrack-from-the-Netflix-Series-Hindi-2024-20241217204803-500x500.jpg"
              songName="Ishq Hai"
              artistName="Arijit Singh"
            />
            <MusicCard
              imageUrl="https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg"
              songName="Agar Tum Saath Ho"
              artistName="Arijit Singh"
            />
            <MusicCard
              imageUrl="https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg"
              songName="Agar Tum Saath Ho"
              artistName="Arijit Singh"
            />
            <MusicCard
              imageUrl="https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg"
              songName="Agar Tum Saath Ho"
              artistName="Arijit Singh"
            />
            <MusicCard
              imageUrl="https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg"
              songName="Agar Tum Saath Ho"
              artistName="Arijit Singh"
            />
            <MusicCard
              imageUrl="https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg"
              songName="Agar Tum Saath Ho"
              artistName="Arijit Singh"
            />
          </div>
          <h1 className="text-2xl">Recent Played</h1>
          <div className="m-2 flex flex-wrap gap-4">
            <MusicCard
              imageUrl="https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg"
              songName="Agar Tum Saath Ho"
              artistName="Arijit Singh"
            />
            <MusicCard
              imageUrl="https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg"
              songName="Agar Tum Saath Ho"
              artistName="Arijit Singh"
            />
            <MusicCard
              imageUrl="https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg"
              songName="Agar Tum Saath Ho"
              artistName="Arijit Singh"
            />
            <MusicCard
              imageUrl="https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg"
              songName="Agar Tum Saath Ho"
              artistName="Arijit Singh"
            />
            <MusicCard
              imageUrl="https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg"
              songName="Agar Tum Saath Ho"
              artistName="Arijit Singh"
            />
            <MusicCard
              imageUrl="https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg"
              songName="Agar Tum Saath Ho"
              artistName="Arijit Singh"
            />
            <MusicCard
              imageUrl="https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg"
              songName="Agar Tum Saath Ho"
              artistName="Arijit Singh"
            />
          </div>
          <div className="m-2 flex flex-wrap gap-4"></div>
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
}
