
import React from 'react'
import TrueFocus from '../components/truefocus/Truefocus.jsx';
import './about.css'
import profile from './../assets/profile20.jpg'
import TiltedCard from '../components/tiltedcard/Tiltedcard.jsx';
import TechCertShowcase from '../components/Profileshow/Profileshow.jsx';
import EducationTimeline from '../components/study/EducationTimeline.jsx';


const About = () => {
    return (
        <>
            <div className='truefocus'>
                <TrueFocus
                    sentence="ABOUT ME"
                    manualMode={true}
                    blurAmount={3}
                    borderColor="red"
                    animationDuration={2}
                    pauseBetweenAnimations={1}
                />
            </div>
            <div className="img-desc">
                <div className="img-p">
                    <div className='tilted'>
                        <TiltedCard
                            imageSrc={profile}
                            altText="janme"
                            captionText="Janmenjay - SDE"
                            containerHeight="300px"
                            containerWidth="300px"
                            imageHeight="220px"
                            imageWidth="220px"
                            rotateAmplitude={12}
                            scaleOnHover={1.2}
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}
                            overlayContent={
                                <p className="tilted-card-demo-text">
                                    Janmenjay - SDE
                                </p>
                            }
                        />
                    </div>
                </div>
                <p className='desc'>A creative thinker and passionate frontend developer who loves transforming ideas into interactive,
                    visually stunning web experiences. With a strong foundation in React.js, JavaScript, and Tailwind CSS, the focus lies
                    in building interfaces that feel intuitive, fast, and alive. Coding isn’t just about solving problems — 
                    it’s about crafting stories through design, motion, and functionality.
                    Each project is an opportunity to experiment, learn, and push the boundaries of what the web can do.
                     Driven by curiosity and innovation, there’s a constant pursuit of simplicity in complexity — writing clean code,
                    exploring new technologies, and designing experiences that leave a lasting impression. Always learning,
                     always evolving, always creating something meaningful.
                </p>
            </div>
            
            <div className="educa">
                 <EducationTimeline/>
            </div>
            
            <div className="tech-tools">
                <h2>My Technical Expertise</h2>
                <TechCertShowcase />
            </div>
            
            

        </>



    )
}

export default About

