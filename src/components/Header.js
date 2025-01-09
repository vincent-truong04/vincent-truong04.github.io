import React from 'react';
import '../styling/Header.css';

function Header(){
    return(
        <header>
            <div className="logo">
                <h>V.T.</h>
            </div>
            <nav classname="header-nav">
                <a href="#hero">Home</a>
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
    );
}

export default Header;