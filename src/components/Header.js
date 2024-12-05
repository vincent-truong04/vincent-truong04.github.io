import React from 'react';
import '../styling/Header.css';
import logo from '../images/VT_logo.png';

function Header(){
    return(
        <header>
            <div className="logo">
                <img src= {logo} alt="Logo" />
                <h1>Vincent Truong</h1>
            </div>
            <nav>
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
    );
}

export default Header;