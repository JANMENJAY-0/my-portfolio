

import React from "react";
import TargetCursor from "../components/cursor/Cursor.jsx";
import "./Home.css";
import myResume from "../assets/Janmenjay_sde_recent.pdf";
import TextType from "../components/texttype/Texttype.jsx";
import EarthCanvas from "../components/earth/Earth.jsx";

const Home = () => {
  const handleDownloadCV = () => {
    window.open(myResume, "_blank");
  };

  return (
    <div className="home-content">


      {/* Greeting / Typing effect */}
      <section className="greet">
        <h1>HELLO, I am <span className="accent">JANMENJAY</span></h1>
        <h2>I DEVELOP</h2>
        <TextType
          text={["User Interfaces",
            "Web Applications",
            "Responsive Designs",
            "Interactive Experiences",
            "Scalable Frontends",
            "Clean & Efficient Code",
            "Seamless User Journeys",
            "Dynamic Digital Solutions"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          className="text"
        />
      </section>
      {/* Visual / Canvas area */}
      <section className="home-visual">
        <EarthCanvas />
      </section>

      {/* Custom cursor component */}
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />

      {/* Description / Body copy */}
      <div className="home-description">
        <h2>Overview.</h2>
        <p>
          A passionate Frontend Developer crafting clean, efficient, and responsive web applications
           using React.js, JavaScript,
          and Tailwind CSS, dedicated to building responsive, dynamic, and user-centric web
          applications. Combining technical expertise with creativity, I focus on designing
          clean, efficient, and visually appealing interfaces that deliver seamless user
          experiences. With a background in Information Technology Management from Ravenshaw
          University, my approach emphasizes scalable architecture, clean coding practices,
          and performance optimization. Constantly driven by curiosity and innovation, I
          strive to craft impactful digital solutions that merge design, functionality, and
          technology to bring ideas to life. 🚀
        </p>
      </div>

      {/* CTA */}
      <div className="home-ct">
        <button className="cursor-target home-cta"
          onClick={handleDownloadCV}>
          Download CV
        </button>
      </div>


    </div>
  );
};

export default Home;
