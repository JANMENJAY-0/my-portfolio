


import { useState } from 'react'
import CardNav from './components/navbar/Navbar.jsx'
import logo from './assets/react.svg';
import Particles from './components/background/Background.jsx';
import './App.css'
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Project = lazy(() => import("./pages/Project.jsx"));




const items = [
  {
    label: "About",
    href: "/about",
    bgColor: "#0D0716",
    textColor: "#ffffffff",
    links: [
      { label: "Company", ariaLabel: "About Company" },
      { label: "Careers", ariaLabel: "About Careers" }
    ]
  },
  {
    label: "Projects",
    href: "/projects",
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      { label: "Featured", ariaLabel: "Featured Projects" },
      { label: "Case Studies", ariaLabel: "Project Case Studies" }
    ]
  },
  {
    label: "Contact",
    href: "/contact",
    bgColor: "#271E37",
    textColor: "#fff",
    links: [
      { label: "Email", ariaLabel: "Email us" },
      { label: "Twitter", ariaLabel: "Twitter" },
      { label: "LinkedIn", ariaLabel: "LinkedIn" }
    ]
  }
];

function App() {
  return (
    <>
      <div className="app-root">

        <div className='bg-layer'>
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={700}
            particleSpread={20}
            speed={0.08}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        <CardNav
          logo={logo}
          logoAlt="MY Logo"
          items={items}
          baseColor="#3f4974ff"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
          className='nav'
        />
        {/* route views */}
        <Suspense fallback={<div className="loading">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/contact" element={<Contact />} />

           
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>


      </div>


    </>

  );

}

export default App


