// import React from 'react';
import React, { useState, useEffect } from "react";
import { HoverEffect } from "../components/aboutcard";
function Aboutus() {
  const items = [
    {
      title: "Our Vision",
      description:
        "Our vision is to transform the way music lovers interact with their favorite tracks. We aim to create an intuitive and powerful music player application that caters to the diverse needs of our users, ensuring they have the best possible experience while enjoying their music.",
      link: "/",
    },
    {
      title: "What We Offer",
      description:
        " We provide access to a vast collection of songs from various genres and languages, seamless streaming with high-quality audio, and personalized playlists. Discover new music and enjoy an elevated listening experience with The Spring Player.",
      link: "/",
    },
    {
      title: "Our Team",
      description:
        "Our team consists of passionate developers, designers, and music enthusiasts committed to delivering an outstanding product. We believe in the power of music to bring people together and strive to make it accessible and enjoyable for everyone.",
      link: "/",
    },
    {
      title: "Join Us on Our Journey",
      description:
        "We are constantly working on improving The Spring Player and adding new features to enhance your experience. Join us on this exciting journey and be a part of our growing community of music lovers. Together, let's create the ultimate music experience.",
      link: "/",
    },
  ];
  return (
    <div>
      <h1 className="text-center text-aliceblue text-4xl mb-10">About Us</h1>
      <div>
        <HoverEffect items={items} />
      </div>
    </div>
  );
}

export default Aboutus;
