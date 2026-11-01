import React, { useEffect, useState } from "react";
import '../styling/Hero.css';
import { motion } from "framer-motion";

const Hero = () => {
    const [isActive, setIsActive] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setIsActive(true), 500); // Wait for 500ms before starting animation
      return () => clearTimeout(timer); // Cleanup timeout if component unmounts
    }, []);

    return (
        <section className="hero-section" id="hero">
            <motion.p className="hero-greeting" initial={{ y: "-100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }}>
                Welcome!
            </motion.p>

            <motion.h1 initial={{opacity: 0 }} animate={{opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay:1.75}} className={isActive ? "hero-name typing-active" : "hero-name"}>
                My name is <span className='name'>Vincent Truong</span>
            </motion.h1>

            <motion.a initial={{ y: "500%", opacity: 0 }} animate={{ y: [0, -8, 0], opacity: 1 }} transition={{ y: { duration: 1, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }, opacity: { duration: 3, ease: "easeOut" }, }} href="#about" className="animated-button">
                <span>Learn More ⬇</span>
                <span></span>
            </motion.a>
        </section>
    )
}

export default Hero;