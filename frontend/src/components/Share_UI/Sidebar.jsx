import React from "react";
import "./Style.css";
import {
  MagnifyingGlass,
  House,
  Image,
  MusicNotesPlus,
  SmileyWink,
  Playlist,
  Trash,
  X,
} from "phosphor-react";
const data = [
  {
    heading: "Menu",
    data: [
      {
        icon: <House size={25} className="i" />,
        text: "Home",
      },
    ],
  },
  {
    heading: "LIBRARY",
    data: [
      {
        icon: <Image size={25} className="i" />,
        text: "Albums",
      },
      {
        icon: <MusicNotesPlus size={25} className="i" />,
        text: "Songs",
      },
      {
        icon: <SmileyWink size={25} className="i" />,
        text: "Artist",
      },
    ],
  },
  {
    heading: "PLAYLIST",
    data: [
      {
        icon: <Playlist size={25} className="i" />,
        text: "Playlist1",
        deleteicon: <Trash size={25} className="delete i" />,
      },
      {
        icon: <Playlist size={25} className="i" />,
        text: "Playlist2",
        deleteicon: <Trash size={25} className="delete i" />,
      },
    ],
  },
];
export default function Sidebar({
  fetchSongData,
  searchQuery,
  setSearchQuery,
  toggleSidebar,
  settoggleSidebar,
}) {
  const handleSearch = (e) => {
    if (e.code === "Enter") {
      fetchSongData();
    }
  };
  return (
    <div className={`sidebar ${toggleSidebar ? "sidebar--active" : ""}`}>
      <X
        className="close"
        onClick={() => {
          settoggleSidebar((prev) => !prev);
        }}
      />

      <div className="search">
        <div className="search-container">
          <MagnifyingGlass size={25} className="search-icon" />
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            onKeyDown={handleSearch}
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="menu">
        {data.map((ele) => (
          <div className="menu-card">
            <h1>{ele.heading}</h1>
            {ele.data.map((el) => (
              <div className="menu-icons">
                {el.icon}
                <span>{el.text}</span>
                {el?.deleteicon && el?.deleteicon}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
