import React from 'react';
import '../styling/About.css';
import headshot from '../images/Headshot.png';

function About(){
    return(
        <section id="about" class="about-section">
            <h2>About Me</h2>
            <div class="aboutContent-container">
                <p class="paragraph">
                  Hi, my name is Vincent. I am a junior studying computer engineering with a minor in leadership at 
                  Christopher Newport University. Here at CNU, I am on the varisty tennis team and in the Pi Kappa 
                  Alpha fraternity. Outside of my extracirriculars, I enjoy reading, coding, and hanging out with friends.   
                </p>
                <div class="img-container">
                    <img src= {headshot} alt="headshot" />
                </div>
            </div>
        </section> 
    );
}

export default About;