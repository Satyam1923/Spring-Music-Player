import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PagenotFound from "./components/PagenotFound";
import Search from "./components/Search/Search";
import Home from "./components/Home/Home";
import Aboutus from "./pages/Aboutus";
import Blog from "./pages/Blog";
import Terms from "./pages/Terms";
import Contactus from "./pages/Contactus";
import Culture from "./pages/Culture";
import { FaSun, FaMoon } from "react-icons/fa";
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <Router>
        <div className="theme-toggle">
          <label className="switch" style={{"marginRight":"170px"}}>
            <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
            <span className="slider round">
              <FaSun className="sun-icon" />
              <FaMoon className="moon-icon" />
            </span>
          </label>
        </div>
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PagenotFound />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/culture" element={<Culture />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
