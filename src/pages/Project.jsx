import ChromaGrid from '../components/card/Card.jsx';
import { Routes, Route, Link } from "react-router-dom";
import './Project.css'
import React from 'react'
import TrueFocus from './../components/truefocus/Truefocus.jsx';
import page from '../assets/STACKPAGE.png';
import weather from './../assets/WEATHER.png';
import food from './../assets/FOOD.png';
import quiz from './../assets/QUIZ.png';


const items = [
  {
    image: page,
    title: "STACKpage",
    subtitle: "E-commerce",
    handle: "React, JSON-Server",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/JANMENJAY-0/StackPage"
  },
  {
    image: weather,
    title: "Weather App",
    subtitle: "Weather api",
    handle: "React,Tailwind CSS",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: ""
  },

  {
    image: food,
    title: 'Recipe App',
    subtitle: 'API Integration',
    handle: 'React',
    borderColor: '#F59E0B',
    gradient: 'linear-gradient(165deg, #F59E0B, #000)',
    url: 'https://github.com/JANMENJAY-0/food-recipe-app'
  },
  {
    image: quiz,
    title: 'Quiz App',
    subtitle: 'Basic JavaScript',
    handle: 'JavaScript,HTML,CSS',
    borderColor: '#EF4444',
    gradient: 'linear-gradient(195deg, #EF4444, #000)',
    url: 'https://github.com/JANMENJAY-0/quiz-app'
  },

];

function Project() {
  return (
    <>
      <div className="project">
        <TrueFocus
          sentence="Personal Projects"
          manualMode={true}
          blurAmount={2}
          borderColor="red"
          animationDuration={2}
          pauseBetweenAnimations={1}
        />
      </div>
      <div className="parag">
        <p><span className='start-p'>Welcome to my project showcase!🚀</span>
          Here, you’ll find a collection of web applications I’ve built using React.js, Tailwind CSS, JavaScript, and JSON Server.
          Each project reflects my focus on creating responsive, dynamic, and user-friendly interfaces while implementing clean code practices and efficient data handling.<br />
        </p>
      </div>

      <div className='cursor-tar' style={{ height: '600px', position: '' }}>
        <ChromaGrid
          items={items}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
    </>

  )
}

export default Project
