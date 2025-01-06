import React from 'react';
import '../styling/Hero.css';

function Hero() {
    return(
        <section className="hero-section" id="hero">
            <p>Welcome, my name is <span class="name">Vincent</span>.</p>
            <p>I'm a <span class="major">Computer Engineering</span> Student.</p>

        </section>
    )
}

export default Hero;