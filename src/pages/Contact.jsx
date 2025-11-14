import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Mail, Phone, MapPin, Send, Github } from 'lucide-react'; // Using lucide-react for icons
import './Contact.css';

// --- ENHANCED THREE.JS COMPONENT: Interactive Particle Field ---
const ThreeJSCanvas = () => {
    const mountRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const particleCount = 1500; // Increased particle count for denser effect

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        // 1. SCENE SETUP
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 25;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        const clock = new THREE.Clock();

        // Particle System
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const originalPositions = []; // Store original positions for mouse interaction
        const sizes = []; // Store sizes for each particle

        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;
            positions.push(x, y, z);
            originalPositions.push(x, y, z); // Store for reset
            sizes.push(Math.random() * 2 + 0.5); // Random sizes for variety
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1)); // Add size attribute

        const material = new THREE.PointsMaterial({
            color: 0x6a00ff, // Purple base color
            size: 0.2, // Base size
            sizeAttenuation: true, // Make size dependent on distance
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Mouse interaction
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();
        let currentIntersect = null; // To track hovered particles

        const onMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', onMouseMove);


        // 3. ANIMATION LOOP
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Gentle rotation
            particles.rotation.y = elapsedTime * 0.03;
            particles.rotation.x = elapsedTime * 0.01;

            // Subtle camera movement
            camera.position.x = Math.sin(elapsedTime * 0.05) * 3;
            camera.position.y = Math.cos(elapsedTime * 0.05) * 3;
            camera.lookAt(scene.position);

            // Raycasting for mouse interaction
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(particles);

            if (intersects.length > 0) {
                if (currentIntersect !== intersects[0].index) {
                    // Particle hovered, make it glow/enlarge
                    const hoveredIndex = intersects[0].index;
                    const positionAttribute = particles.geometry.attributes.position;
                    const sizeAttribute = particles.geometry.attributes.size;

                    // Temporarily move the particle out or make it larger
                    // Example: Make it "jump" towards the camera
                    const originalX = originalPositions[hoveredIndex * 3];
                    const originalY = originalPositions[hoveredIndex * 3 + 1];
                    const originalZ = originalPositions[hoveredIndex * 3 + 2];

                    positionAttribute.array[hoveredIndex * 3 + 2] = originalZ + Math.sin(elapsedTime * 10) * 5; // Move towards camera
                    sizeAttribute.array[hoveredIndex] = originalPositions[hoveredIndex * 3] + 5; // Enlarge

                    positionAttribute.needsUpdate = true;
                    sizeAttribute.needsUpdate = true;

                    currentIntersect = hoveredIndex;
                }
            } else {
                if (currentIntersect !== null) {
                    // No longer hovering over previous particle, reset it
                    const resetIndex = currentIntersect;
                    const positionAttribute = particles.geometry.attributes.position;
                    const sizeAttribute = particles.geometry.attributes.size;

                    positionAttribute.array[resetIndex * 3] = originalPositions[resetIndex * 3];
                    positionAttribute.array[resetIndex * 3 + 1] = originalPositions[resetIndex * 3 + 1];
                    positionAttribute.array[resetIndex * 3 + 2] = originalPositions[resetIndex * 3 + 2];
                    sizeAttribute.array[resetIndex] = sizes[resetIndex]; // Reset size

                    positionAttribute.needsUpdate = true;
                    sizeAttribute.needsUpdate = true;
                    currentIntersect = null;
                }
            }


            renderer.render(scene, camera);
        };

        // 4. RESIZE HANDLER
        const handleResize = () => {
            const width = currentMount.clientWidth;
            const height = currentMount.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);
        animate();
        setIsLoaded(true);

        // CLEANUP
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove); // Remove mouse listener
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className={`threejs-container ${isLoaded ? 'loaded' : ''}`}
            aria-label="Interactive 3D particle background animation"
        />
    );
};

// --- MAIN CONTACT PAGE COMPONENT ---
const ContactPage = () => {
    const ContactInfoItem = ({ Icon, title, value }) => (
        <div className="contact-info-item">
            <div className="item-icon-container">
                <Icon size={20} className="item-icon" />
            </div>
            <div className="item-details">
                <span className="item-title">{title}</span>
                <span className="item-value">{value}</span>
            </div>
        </div>
    );

    return (
        <div className="contact-page-new">
            <ThreeJSCanvas />
            <div className="content-container">
                <div className="header-section">
                    <h1>Contact</h1>
                    <p>Let's create something amazing together. I'm always open to discussing new opportunities and interesting projects.</p>
                </div>

                <div className="contact-grid">
                    <div className="contact-info-panel glass-panel">
                        <h2>Get In Touch</h2>
                        <p>I'd love to hear from you. Send me a message and I'll respond as soon as possible.</p>
                        
                        <div className="info-list">
                            <ContactInfoItem 
                                Icon={Mail} 
                                title="Email" 
                                value="janmenjaybehera2017@gmail.com" 
                            />
                            <ContactInfoItem 
                                Icon={Phone} 
                                title="Phone" 
                                value="+91 8249416639" 
                            />
                            <ContactInfoItem 
                                Icon={MapPin} 
                                title="Location" 
                                value="Bengaluru, India" 
                            />
                            <ContactInfoItem 
                                Icon={Github} 
                                title="GitHub" 
                                value="JANMENJAY-0" 
                            />
                        </div>
                    </div>

                    <div className="message-form-panel glass-panel">
                        <h2>Send Message</h2>
                        <form className="contact-form-new">
                            <div className="input-group">
                                <i className="icon-placeholder">👤</i>
                                <input type="text" placeholder="Your Name" required />
                            </div>
                            <div className="input-group">
                                <i className="icon-placeholder">✉️</i>
                                <input type="email" placeholder="Your Email" required />
                            </div>
                            <div className="input-group textarea-group">
                                <i className="icon-placeholder">💬</i>
                                <textarea placeholder="Your Message" rows="4" required></textarea>
                            </div>

                            <button type="submit" className="submit-button-new ">
                                <Send size={20} className="send-icon" /> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;