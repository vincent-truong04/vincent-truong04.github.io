import React from 'react';
import '../styling/Hero.css';
import { motion } from "framer-motion";

function Hero() {
    return(
        <section className="hero-section" id="hero">
            <motion.p1 initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }}>
                Welcome, my name is <span class="name">Vincent</span>.
            </motion.p1>

            <motion.p2 initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }}>
                I'm a <span class="major">Computer Engineering</span> Student.
            </motion.p2>

            <motion.a initial={{ y: "500%", opacity: 0 }}  animate={{ y: [0, -8 , 0], opacity: 1 }} transition={{ y:{ duration: 1, repeat: Infinity, repeatType: "loop", ease: "easeInOut"}, opacity: {duration: 3, ease: "easeOut"},}} href="#about" class="animated-button">
                <span>Learn More ⬇</span>
                <span></span>
            </motion.a>
        </section>
    )
}

export default Hero;