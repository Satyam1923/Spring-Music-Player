import React from 'react';
import './Aboutus.css';

function AboutUs() {
  return (
    <div>
      <h1>About Us</h1>
      <div className="con">
        <div className="con1">
          <div className="con2" id="vision">
            <h2>Our Vision</h2>
            <p>
              Our vision is to transform the way music lovers interact with their favorite tracks. We aim to create an intuitive and powerful music player application that caters to the diverse needs of our users, ensuring they have the best possible experience while enjoying their music.
            </p>
          </div>
          <div className="con2" id="offer">
            <h2>What We Offer</h2>
            <p>
              We provide access to a vast collection of songs from various genres and languages, seamless streaming with high-quality audio, and personalized playlists. Discover new music and enjoy an elevated listening experience with The Spring Player.
            </p>
          </div>
        </div>
        <div className="con1">
          <div className="con2" id="team">
            <h2>Our Team</h2>
            <p>
              Our team consists of passionate developers, designers, and music enthusiasts committed to delivering an outstanding product. We believe in the power of music to bring people together and strive to make it accessible and enjoyable for everyone.
            </p>
          </div>
          <div className="con2" id="join">
            <h2>Join Us on Our Journey</h2>
            <p>
              We are constantly working on improving The Spring Player and adding new features to enhance your experience. Join us on this exciting journey and be a part of our growing community of music lovers. Together, let's create the ultimate music experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
