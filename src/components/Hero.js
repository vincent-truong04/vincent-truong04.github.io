import React from 'react';
import '../styling/Hero.css';

function Hero() {
    return(
        <section className="hero-section" id="hero">
            <p1>Welcome, my name is <span class="name">Vincent</span>.</p1>
            <p2>I'm a <span class="major">Computer Engineering</span> Student.</p2>
            <a href="#about" class="animated-button">
                <span>Learn More</span>
                <span></span>
            </a>
        </section>
    )
}

export default Hero;