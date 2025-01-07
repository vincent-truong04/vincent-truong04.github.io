import React from 'react';
import '../styling/About.css';
import headshot from '../images/Headshot.png';

function About(){
    return(
        <section id="about" class="about-section">
            <div class="about-header">
                <h>About Me</h>
            </div>
            <div class="aboutContent-container">
                <p>
                  Hello! My name is Vincent Truong, and I am a junior at Christopher Newport University pursuing a degree in Computer Engineering with a minor in Leadership. 
                  My academic journey combines technical expertise with strong leadership skills, preparing me to tackle complex challenges in engineering and technology. 
                  Outside of the classroom, I am an active member of Pi Kappa Alpha and a captain of men's varsity tennis, both of which have honed my teamwork, 
                  discipline, and perseverance. I am passionate about leveraging my skills to contribute to innovative projects and am eager to make an impact in the field of 
                  computer engineering, especially in the area of embedded systems.
                </p>
                <div class="img-container">
                    <img src= {headshot} alt="headshot" />
                </div>
            </div>
        </section> 
    );
}

export default About;