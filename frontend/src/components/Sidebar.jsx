import React, { useState } from 'react';
import { GoHomeFill, GoHome } from "react-icons/go";
import { MdOutlineFavoriteBorder, MdFavorite, MdLibraryMusic, MdOutlineLibraryMusic } from "react-icons/md";
import { RiPlayListLine, RiDeleteBin6Line, RiPlayListFill } from "react-icons/ri";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";

import './sidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState('');
  const [activePage, setActivePage] = useState('');
  const [playlists, setPlaylists] = useState([{ id: 'playlist1', name: 'Playlist-1' }, { id: 'playlist2', name: 'Playlist-2' }]);
  const [editMode, setEditMode] = useState({});
  const [hoveredDeleteIcon, setHoveredDeleteIcon] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [isNewPlaylistHovered, setNewPlaylistHovered] = useState(false);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const handleMouseEnter = (icon) => setHoveredIcon(icon);
  const handleMouseLeave = () => setHoveredIcon('');

  const handlePageChange = (page) => {
    setActivePage(page);
    setHoveredIcon('');
  };

  const handleDoubleClick = (playlistId) => {
    setEditMode({ ...editMode, [playlistId]: true });
  };

  const handleNameChange = (e, playlistId) => {
    setPlaylists(playlists.map(pl => pl.id === playlistId ? { ...pl, name: e.target.value } : pl));
  };

  const handleNameBlur = (playlistId) => {
    setEditMode({ ...editMode, [playlistId]: false });
  };

  const handleKeyPress = (e, playlistId) => {
    if (e.key === 'Enter') {
      setEditMode({ ...editMode, [playlistId]: false });
    }
  };

  const handleDelete = (playlistId) => {
    setPlaylists(playlists.filter(pl => pl.id !== playlistId));
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim() !== '') {
      const newPlaylistId = `playlist${playlists.length + 1}`;
      setPlaylists([...playlists, { id: newPlaylistId, name: newPlaylistName }]);
      setNewPlaylistName('');
      setIsCreatingPlaylist(false);
    }
  };

  const renderIcon = (Icon, FilledIcon, page, label) => (
    <div
      className='icon-text'
      onMouseEnter={() => handleMouseEnter(page)}
      onMouseLeave={handleMouseLeave}
      onClick={() => handlePageChange(page)}
    >
      <a href="javascript:void(0)">
        {activePage === page ? (
          <FilledIcon
            // fontSize={"50px"}
            fontSize={isExpanded ? "40px" : "40px"}
            className="icon"
            style={{
              fill: hoveredIcon === page || activePage === page ? "white" : "grey",
              transition: "fill 0.1s ease-in-out"
            }}
          />
        ) : (
          <Icon
            fontSize={isExpanded ? "40px" : "40px"}

            className="icon"
            style={{
              fill: hoveredIcon === page ? "white" : "grey",
              transition: "fill 0.1s ease-in-out"
            }}
          />
        )}
        {isExpanded && <p style={{ color: hoveredIcon === page || activePage === page ? "white" : "grey" }}>{label}</p>}
      </a>
    </div>
  );

  // const renderPlaylist = (playlist, deleteHover, setDeleteHover) => (
  const renderPlaylist = (playlist) => (

    <div
      key={playlist.id}
      className='icon-text'
      onMouseEnter={() => handleMouseEnter(playlist.id)}
      onMouseLeave={handleMouseLeave}
    // style={{ display: 'flex', alignItems: 'center' }}
    >
      <a href="javascript:void(0)" >
        {activePage === playlist.id ? (
          <RiPlayListFill
            // fontSize={"50px"}
            fontSize={isExpanded ? "40px" : "40px"}

            className="icon"
            style={{
              fill: hoveredIcon === playlist.id || activePage === playlist.id ? "white" : "grey",
              transition: "fill 0.1s ease-in-out"
            }}
            onClick={() => handlePageChange(playlist.id)}
          />
        ) : (
          <RiPlayListLine
            // fontSize={"50px"}
            fontSize={isExpanded ? "40px" : "40px"}

            className="icon"
            style={{
              fill: hoveredIcon === playlist.id ? "white" : "grey",
              transition: "fill 0.1s ease-in-out"
            }}
            onClick={() => handlePageChange(playlist.id)}
          />

        )
        }
        {isExpanded && (
          <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {editMode[playlist.id] ? (
              <input
                type="text"
                value={playlist.name}
                onChange={(e) => handleNameChange(e, playlist.id)}
                onBlur={() => handleNameBlur(playlist.id)}
                onKeyPress={(e) => handleKeyPress(e, playlist.id)}
                autoFocus
                style={{ flexGrow: 1, marginLeft: '15px', color: 'white', background: 'transparent', border: 'none', outline: 'none' }}
              />
            ) : (
              <p
                style={{ color: hoveredIcon === playlist.id || activePage === playlist.id ? "white" : "grey", flexGrow: 1 }}
                onDoubleClick={() => handleDoubleClick(playlist.id)}
              >
                {playlist.name}
              </p>

            )}
            <RiDeleteBin6Line
              style={{
                fill: hoveredDeleteIcon === playlist.id ? "red" : "grey",
                transform: hoveredDeleteIcon === playlist.id ? "scale(1.1)" : "scale(1)",
                transition: "fill 0.1s ease-in-out, transform 0.1s ease-in-out"
              }}
              className={hoveredDeleteIcon === playlist.id ? 'delete hovered' : 'delete'}
              onMouseEnter={() => setHoveredDeleteIcon(playlist.id)}
              onMouseLeave={() => setHoveredDeleteIcon(null)}
              onClick={() => handleDelete(playlist.id)}
            />
          </div>
        )}
      </a>
    </div>
  );

  return (
    <div className={`fixed top-0 left-0 h-full ${isExpanded ? 'w-64 bg-[#18181d]' : 'w-16'} transition-all duration-300 z-50`}>

      <div
        className="toggle-button cursor-pointer p-2 md:p-0"
        onMouseEnter={() => setHoveredIcon('toggle')}
        onMouseLeave={() => setHoveredIcon('')}
        onClick={toggleSidebar}
      >
        <IoReorderThreeOutline
          fontSize={"45px"}
          style={{
            fill: hoveredIcon === 'toggle' ? "white" : "grey",
            transition: "fill 0.1s ease-in-out",
          }}
        />
      </div>

      <div
        className={`searchbar ${isExpanded ? 'expanded' : 'invisible'} flex items-center p-2 md:p-0`}
        onMouseEnter={() => handleMouseEnter('search')}
        onMouseLeave={handleMouseLeave}
      >
        {!isExpanded ? (
          <div className="icon-text-container bg-[#18181d] mr-4 rounded-lg p-4 flex items-center">
            <FaSearch
              className="search-icon"
              style={{
                fontSize: "32px",
                fill: hoveredIcon === 'search' ? "white" : "grey",
                transition: "fill 0.1s ease-in-out",
              }}
            />
          </div>
        ) : (
          <div className="flex items-center w-full">
            <input
              type="search"
              placeholder="Search Song"
              className="bg-transparent text-white outline-none flex-grow p-2 border-[#000000]"
            />
            <FaSearch
              className="search-icon expanded-icon"
              style={{
                fontSize: "30px",
                fill: hoveredIcon === 'search' ? "white" : "grey",
                transition: "fill 0.1s ease-in-out",
              }}
            />
          </div>
        )}
      </div>
      <div className={`option1 p-2 ${isExpanded ? 'expanded mb-2 md:mb-0' : 'invisible'}`}>
        <div className={`icon-text-container bg-[#18181d] mr-2 rounded-lg flex flex-col `}>
          {renderIcon(GoHome, GoHomeFill, 'home', 'Home')}
          {renderIcon(MdOutlineFavoriteBorder, MdFavorite, 'favorite', 'Favorite')}
          {renderIcon(MdOutlineLibraryMusic, MdLibraryMusic, 'albums', 'Albums')}
        </div>
      </div>
      <div className={`option1 p-2 ${isExpanded ? 'expanded' : 'invisible'}`}>
        <div className="icon-text-container bg-[#18181d] mr-2 rounded-lg flex flex-col">
          {playlists.map(playlist => renderPlaylist(playlist))}
          {isCreatingPlaylist ? (
            <div className="flex items-center ml-4">
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                onBlur={handleCreatePlaylist}
                placeholder="New Playlist"
                onKeyPress={(e) => e.key === 'Enter' && handleCreatePlaylist()}
                autoFocus
                className="flex-grow text-white bg-transparent border-none outline-none"
              />
              <button
                className="bg-transparent border-none outline-none text-white ml-2 cursor-pointer"
                onClick={handleCreatePlaylist}
              >
                Create
              </button>
            </div>
          ) : (
            <div
              className="icon-text cursor-pointer"
              onMouseEnter={() => handleMouseEnter('newPlaylist')}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsCreatingPlaylist(true)}
            >
              <a href="javascript:void(0)" className='my-6 md:my-1'>
                {isExpanded && (
                  <p className={`text-${hoveredIcon === 'newPlaylist' ? "white" : "grey"}`}>
                    Create Playlist
                  </p>
                )}
                {isExpanded && (
                  <BsPlusCircleFill
                    className={`fill-${hoveredIcon === 'newPlaylist' ? "white" : "grey"} transition-all`}
                    onMouseEnter={() => setNewPlaylistHovered(true)}
                    onMouseLeave={() => setNewPlaylistHovered(false)}
                    onClick={() => setNewPlaylistHovered(true)}
                  />
                )}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default Sidebar;
