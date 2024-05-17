import React from "react";
import { IoSearch } from "react-icons/io5";
import HomeIcon from "../Assets/HomeIcon";
import PlaylistIcon from "../Assets/PlaylistIcon";
import DeleteIcon from "../Assets/DeleteIcon";
import AlbumIcon from "../Assets/AlbumIcon";
import ArtistIcon from "../Assets/ArtistIcon";
import SongsIcon from "../Assets/SongsIcon";

function NavBar() {
    return (
        <div className="flex flex-col text-xl bg-slate-500 max-w-[280px] w-[25vw] text-center justify-center gap-[8%]">
            <SearchBar />
            <Nav />
        </div>
    );
}

function SearchBar() {
    return (
        <div className="bg-slate-600 p-2 rounded-2xl text-white ml-8 mr-8">
            <div className="relative">
                <input className="bg-transparent text-md outline-none w-[80%] pl-6" type="text" placeholder="search..." />
                <IoSearch className="w-30 text-white absolute top-[50%] translate-y-[-50%] left-2" />
            </div>
        </div>
    );
}

function Nav() {
    return (
        <div className="w-full text-xl flex text-white flex-col gap-14 p-12 pb-20">
            <div className="flex flex-col gap-5">
                <label className="text-left pl-3 font-bold">MENU</label>
                <div className="flex w-full justify-start gap-5 hover:cursor-pointer">
                    <div className="w-30"><HomeIcon /></div>
                    <p>Home</p>
                </div>
            </div>
            <div className="flex w-full flex-col gap-5">
                <label className="text-left pl-3 font-bold">LIBRARY</label>
                <div className="flex flex-col gap-4">
                    <div className="flex w-full justify-start gap-5 hover:cursor-pointer">
                        <div className="w-30"><AlbumIcon /></div>
                        <p className="text-left">Albums</p>
                    </div>
                    <div className="flex w-full justify-start gap-5 hover:cursor-pointer">
                        <div className="w-30"><SongsIcon /></div>
                        <p className="text-left">Songs</p>
                    </div>
                    <div className="flex w-full justify-start gap-5 hover:cursor-pointer">
                        <div className="w-30"><ArtistIcon /></div>
                        <p className="text-left">Artist</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <label className="text-left pl-3 font-bold">PLAYLIST</label>
                <div className="flex flex-col gap-4 justify-center">
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
        <div className="relative w-full flex justify-start gap-6">
            <div className="flex gap-4 hover:cursor-pointer">
                <div className="w-30"><PlaylistIcon /></div>
                <p>{playlistName}</p>
            </div>
            <div className="absolute right-0 hover:cursor-pointer">
                <div className="w-30"><DeleteIcon /></div>
            </div>
        </div>
    );
}

export default NavBar;
