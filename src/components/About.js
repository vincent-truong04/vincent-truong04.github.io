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
import { motion } from 'framer-motion';

function About() {
    return (
        <section id="about" className="about-section">
            <div className="about-header">
                <h2 className="section-title">About Me</h2>
            </div>
            <div className="aboutContent-container">
                <div className="about-description">
                    <motion.div initial={{ y: "100%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }} className="img-container">
                        <img src={headshot} alt="Portrait of Vincent Truong" />
                    </motion.div>
                    <motion.a initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut", delay: 1 }} viewport={{ once: true, amount: 0.3 }} href='https://drive.google.com/file/d/1YJVYz7YWyI3NxR4hYKI01S-Bu0gT_1oU/view?usp=sharing' target="_blank" rel="noreferrer" className="button">
                        <span className="button_lg">
                            <span className="button_sl"></span>
                            <span className="button_text">Resume</span>
                        </span>
                    </motion.a>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }} viewport={{ once: true, amount: 0.3 }}>
                        Hello! My name is Vincent Truong, and I am a junior at Christopher Newport University pursuing a degree in Computer Engineering with a minor in Leadership.
                        My academic journey combines technical expertise with strong leadership skills, preparing me to tackle complex challenges in engineering and technology.
                        Outside of the classroom, I am an active member of Pi Kappa Alpha and a captain of men's varsity tennis. I am passionate about leveraging my skills to contribute to innovative projects and am eager to make an impact in the field of
                        computer engineering, especially in the area of embedded systems.
                    </motion.p>
                </div>
                <div className="skill-icons">
                    <motion.div initial={{ x: "100%", opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }} className="col1">
                        <figure className="html-icon">
                            <img src={html} alt="" />
                            <figcaption className="caption">HTML</figcaption>
                        </figure>
                        <figure className="python-icon">
                            <img src={python} alt="" />
                            <figcaption className="caption">PYTHON</figcaption>
                        </figure>
                    </motion.div>
                    <motion.div initial={{ x: "100%", opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }} viewport={{ once: true, amount: 0.3 }} className="col2">
                        <figure className="matlab-icon">
                            <img src={matlab} alt="" />
                            <figcaption className="caption">MATLAB</figcaption>
                        </figure>
                        <figure className="java-icon">
                            <img src={java} alt="" />
                            <figcaption className="caption">JAVA</figcaption>
                        </figure>
                        <figure className="react-icon">
                            <img src={react} alt="" />
                            <figcaption className="caption">REACT</figcaption>
                        </figure>

                    </motion.div>
                    <motion.div initial={{ x: "50%", opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut", delay: 1 }} viewport={{ once: true, amount: 0.3 }} className="col3">
                        <figure className="css-icon">
                            <img src={css} alt="" />
                            <figcaption className="caption">CSS</figcaption>
                        </figure>
                        <figure className="cplusplus-icon">
                            <img src={cplusplus} alt="" />
                            <figcaption className="caption">C++</figcaption>
                        </figure>
                    </motion.div>
                    <a href="#hero" className="Btn" aria-label="Back to top">
                        <svg className='arrow' xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="m12 6.414 7.293 7.293 1.414-1.414L12 3.586l-8.707 8.707 1.414 1.414L12 6.414z" /><path d="m3.293 18.293 1.414 1.414L12 12.414l7.293 7.293 1.414-1.414L12 9.586l-8.707 8.707z" /></svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default About;