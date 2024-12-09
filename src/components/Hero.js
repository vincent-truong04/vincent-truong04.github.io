import React from 'react'
import '../styling/Hero.css';
import Header from '../components/Header';

function Hero() {
    return(
        <section className="hero-section" id="hero">
            <Header />
            <p>Welcome!</p>
        </section>
    )
}

export default Hero;