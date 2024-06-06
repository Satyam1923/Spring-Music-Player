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
    <div className={isExpanded ? "sidebar expanded" : "sidebar collapsed"}>
      <div className="toggle-button" 
      onMouseEnter={() => setHoveredIcon('toggle')}
      onMouseLeave={() => setHoveredIcon('')}
      onClick={toggleSidebar}
      >
        <IoReorderThreeOutline 
        fontSize={"45px"} 
        style={{
          fill: hoveredIcon === 'toggle' ? "white" : "grey",
          transition: "fill 0.1s ease-in-out"
        }}
        />
      </div>
      <div
        className={`searchbar ${isExpanded ? 'expanded' : ''}`}
        onMouseEnter={() => handleMouseEnter('search')}
        onMouseLeave={handleMouseLeave}
      >
        {!isExpanded ? (
          // <div className="search-home-container" style={{ background: "#18181D", marginRight: "7px", borderRadius: "6px", }}>
          // <div className="icon-text-container" style={{ background: "#18181D", marginRight: "7px", borderRadius: "6px"}}>
            // <div  className="option1">
            <div className="icon-text-container" style={{ background: "#18181D", marginRight: "16px", borderRadius: "6px", padding: "19px"}}>

            <FaSearch
              className="search-icon"
              style={{
                fontSize: "32px",
                fill: hoveredIcon === 'search' ? "white" : "grey",
                transition: "fill 0.1s ease-in-out"
              }}
            />
          </div>
        ) : (
          // <div className="input-container" style={{ background: "#18181D", marginRight: "-25px", borderRadius: "16px" }}>
          // <div className="icon-text-container" style={{ background: "#18181D", marginRight: "7px", borderRadius: "6px"}}> 
         <div > 
            <input type="search" placeholder="Search Song" />
            <FaSearch
              className="search-icon expanded-icon"
              style={{
                fontSize: "30px",
                fill: hoveredIcon === 'search' ? "white" : "grey",
                transition: "fill 0.1s ease-in-out"
              }}
            />
          </div>
        )}
        
      </div>
      <div className="option1">
        <div className="icon-text-container" style={{ background: "#18181D", marginRight: "7px", borderRadius: "6px"}}>
          {renderIcon(GoHome, GoHomeFill, 'home', 'Home')}
          {renderIcon(MdOutlineFavoriteBorder, MdFavorite, 'favorite', 'Favorite')}
          {renderIcon(MdOutlineLibraryMusic, MdLibraryMusic, 'albums', 'Albums')}
        </div>
      </div>
      <div className="option1">
        <div className="icon-text-container" style={{ background: "#18181D", marginRight: "7px", borderRadius: "6px" }}>
          {playlists.map(playlist => renderPlaylist(playlist))}
          {isCreatingPlaylist ? (
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                onBlur={handleCreatePlaylist}
                placeholder="New Playlist"
                onKeyPress={(e) => e.key === 'Enter' && handleCreatePlaylist()}
                autoFocus
                style={{ flexGrow: 1, color: 'white', background: 'transparent', border: 'none', outline: 'none' }}
              />
              <button
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', marginLeft: '5px', cursor: 'pointer' }}
                onClick={handleCreatePlaylist}
              >
                Create
              </button>
            </div>
          ) : (
            <div className='icon-text' onMouseEnter={() => handleMouseEnter('newPlaylist')} onMouseLeave={handleMouseLeave} onClick={() => setIsCreatingPlaylist(true)}>
              <a href="javascript:void(0)">
                {isExpanded && <p style={{ color: hoveredIcon === 'newPlaylist' ? "white" : "grey" }}>Create Playlist</p>}
                {isExpanded && <BsPlusCircleFill
                  style={{
                    fill: hoveredIcon === 'newPlaylist' ? "white" : "grey",
                    transition: "fill 0.1s ease-in-out",
                    
                  }}
                  className={isNewPlaylistHovered ? 'delete hovered' : 'delete'} 
                  onMouseEnter={() => setNewPlaylistHovered(true)} 
                  onMouseLeave={() => setNewPlaylistHovered(false)}
                  onClick={() => setNewPlaylistHovered(true)}
                />}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
