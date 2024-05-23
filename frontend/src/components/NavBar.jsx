import React from "react";
import { IoSearch } from "react-icons/io5";
import HomeIcon from "../../Assets/HomeIcon";
import PlaylistIcon from "../../Assets/PlaylistIcon";
import DeleteIcon from "../../Assets/DeleteIcon";
import AlbumIcon from "../../Assets/AlbumIcon";
import ArtistIcon from "../../Assets/ArtistIcon";
import SongsIcon from "../../Assets/SongsIcon";

function NavBar() {
    return (
        <div className="flex flex-col h-[100vh] text-md bg-transparent max-w-[280px] w-[25vw] text-center justify-center gap-[8%] border-r border-r-1"
            style={{ borderRightColor: 'rgba(255, 255, 255, 0.279)', borderRightWidth: '1px' }}
        >
            <SearchBar />
            <Nav />
        </div>
    );
}

function SearchBar() {
    return (
        <div className="bg-[#afafaf3f] p-2 rounded-2xl text-white ml-8 mr-8 sm:block hidden">
            <div className="relative">
                <input className="bg-transparent text-md outline-none w-[80%] pl-5" type="text" placeholder="search..." />
                <IoSearch className="w-30 text-white absolute top-[50%] translate-y-[-50%] left-1 text-xl" />
            </div>
        </div>
    );
}

function NavElement(props) {
    return (
        <div className="flex w-full justify-center sm:justify-start gap-5 hover:cursor-pointer hover:bg-[#afafaf3f] hover:scale-105 pt-2 pb-2 rounded-xl">
            <div className="w-30">{props.icon}</div>
            <p className="text-left sm:block hidden">{props.name}</p>
        </div>
    );
}

function Nav() {
    return (
        <div className="w-full text-mdl flex text-white flex-col gap-14 p-12 pb-20">
            <div className="flex flex-col gap-5">
                <label className="sm:block hidden text-left pl-3 font-bold">MENU</label>
                <NavElement icon={<HomeIcon />} name="Home" />
            </div>
            <div className="flex w-full flex-col gap-5">
                <label className="sm:block hidden text-left pl-3 font-bold">LIBRARY</label>
                <div className="flex flex-col">
                    <NavElement icon={<AlbumIcon />} name="Albums" />
                    <NavElement icon={<SongsIcon />} name="Songs" />
                    <NavElement icon={<ArtistIcon />} name="Artist" />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <label className="sm:block hidden text-left pl-3 font-bold">PLAYLIST</label>
                <div className="flex flex-col justify-center">
                    <NavPlaylist playlistName="playlist1"/>
                    <NavPlaylist playlistName="playlist2"/>
                    <NavPlaylist playlistName="playlist3"/>
                </div>
            </div>
        </div>
    );
}

function NavPlaylist({ playlistName }) {
    return (
        <div className="relative w-full flex justify-center sm:justify-start gap-6 hover:scale-105 hover:bg-[#afafaf3f] pt-2 pb-2 rounded-xl">
            <div className="flex gap-4 hover:cursor-pointer">
                <div className="w-30"><PlaylistIcon /></div>
                <p className="sm:block hidden">{playlistName}</p>
            </div>
            <div className="absolute right-0 hover:cursor-pointer invisible xl:visible">
                <div className="w-30"><DeleteIcon /></div>
            </div>
        </div>
    );
}

export default NavBar;
