import "./App.css";
import axios from "axios";
import he from "he";
import Sidebar from "./components/Sidebar";
import Section3 from "./components/Section3";
import Genres from "./components/Genres";
import TopCharts from "./components/TopCharts";
import Aboutus from "./pages/Aboutus";
import Terms from "./pages/Terms";

import { FaUser } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PagenotFound from "./components/PagenotFound";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import TopArtists from "./components/TopArtists";
import Settings from "./components/Settings";
import Search from "./components/Search/Search";
import Footer from "./components/Footer";
import Contactus from "./pages/Contactus";
import LikedSong from "./components/LikedSong";

import Home from "./components/Home/Home";
import Blog from "./pages/Blog";
import Culture from "./pages/Culture";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PagenotFound />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/liked-song" element={<LikedSong />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/culture" element={<Culture />} />
      </Routes>
    </Router>
  );
};

export default App;
