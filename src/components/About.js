import React from 'react';
import '../styling/About.css';
import headshot from '../images/Headshot.png';
import html from "../svg/html.svg";
import python from "../svg/python.svg";
import matlab from "../svg/matlab.svg";
import java from "../svg/java.svg";
import react from "../svg/react.svg";
import css from "../svg/css.svg";
import cplusplus from "../svg/cplusplus.svg";

function About() {
    return (
        <section id="about" class="about-section">
            <div class="about-header">
                <h>About Me</h>
            </div>
            <div class="aboutContent-container">
                <div class="about-description">
                    <div class="img-container">
                        <img src={headshot} alt="headshot" />
                    </div>
                    <a href='https://drive.google.com/file/d/1YthN8CGM-z-IedFAOombgqULHRla6-ml/view?usp=sharing' target="_blank" rel="noreferrer" class="button">
                        <span class="button_lg">
                            <span class="button_sl"></span>
                            <span class="button_text">Resume</span>
                        </span>
                    </a>
                    <p>
                        Hello! My name is Vincent Truong, and I am a junior at Christopher Newport University pursuing a degree in Computer Engineering with a minor in Leadership.
                        My academic journey combines technical expertise with strong leadership skills, preparing me to tackle complex challenges in engineering and technology.
                        Outside of the classroom, I am an active member of Pi Kappa Alpha and a captain of men's varsity tennis. I am passionate about leveraging my skills to contribute to innovative projects and am eager to make an impact in the field of
                        computer engineering, especially in the area of embedded systems.
                    </p>
                </div>
                <div class="skill-icons">
                    <div class="col1">
                        <figure class="html-icon">
                            <img src={html} alt="html icon" />
                            <figcaption class="caption">HTML</figcaption>
                        </figure>
                        <figure class="python-icon">
                            <img src={python} alt="python icon" />
                            <figcaption class="caption">PYTHON</figcaption>
                        </figure>
                    </div>
                    <div class="col2">
                        <figure class="matlab-icon">
                            <img src={matlab} alt="matlab icon" />
                            <figcaption class="caption">MATLAB</figcaption>
                        </figure>
                        <figure class="java-icon">
                            <img src={java} alt="java icon" />
                            <figcaption class="caption">JAVA</figcaption>
                        </figure>
                        <figure class="react-icon">
                            <img src={react} alt="react icon" />
                            <figcaption class="caption">REACT</figcaption>
                        </figure>

                    </div>
                    <div class="col3">
                        <figure class="css-icon">
                            <img src={css} alt="css icon" />
                            <figcaption class="caption">CSS</figcaption>
                        </figure>
                        <figure class="cplusplus-icon">
                            <img src={cplusplus} alt="cplusplus icon" />
                            <figcaption class="caption">C++</figcaption>
                        </figure>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default About;