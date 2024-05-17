
import React from 'react';
import './Style.css';
import { NavLink } from 'react-router-dom';

const HomePage = () => {

  const handleClick = () => {
    window.open('/app', '_blank');
  };

  return (
    <>
      <header className="navbar sticky z-50 top-0">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/faq">FAQs</NavLink>
        <NavLink to="">Log In</NavLink>
  </header>
  <div className="main">
    <h1 id="heading">Let the rhythm of the music move your soul</h1>
  </div>
  <button id="btn" onClick={handleClick}>Get Started</button>
</>

);
};

export default HomePage;
