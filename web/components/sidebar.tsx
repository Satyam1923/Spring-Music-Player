export default function Sidebar() {
  return (
    <div className="w-56 h-full bg-neutral-900 text-white p-4 flex flex-col">
      <div className="flex flex-col gap-3 mb-6">
        <a href="#">Home</a>
        <a href="#">Explore</a>
        <a href="#">Search</a>
      </div>
      <div className="flex flex-col gap-3">
        <a href="#">Library</a>
        <a href="#">Liked Songs</a>
        <a href="#">Recent</a>
        <a href="#">Playlists</a>
        <a href="#">Albums</a>
      </div>
      <div className="flex-grow" />
      <div className="flex flex-col gap-3 pt-4 border-t border-neutral-700">
        <a href="#">Settings</a>
        <a href="#">Log out</a>
      </div>
    </div>
  );
}
