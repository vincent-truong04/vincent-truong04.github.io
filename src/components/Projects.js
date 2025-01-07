import React from 'react';
import '../styling/Projects.css';
import JoystickIcon from '../images/Joystick_Icon.png';
import PorfolioPic from '../images/Portfolio.png';

function Projects(){
    return(
        <section classname="project-section" id="projects">
            <div class="project-header">
                <h>Projects</h>
            </div>
            <div className="allProjects">
                <div class="project1">
                    <h1>JoystickInsight</h1>
                    <div class="information1">
                        <img src= {JoystickIcon} alt="JoystickIcon" />  
                        <p>
                            A full-stack program used to quickly test joystick hardware functionality and assess usability of newly created configuration files. 
                            Coded in Java, alongside JavaFX and the JInput library.
                        </p>
                    </div>
                </div>

                <div class="project2">
                    <h1>Portfolio Website</h1>
                    <div class="information2">
                        <img src= {PorfolioPic} alt="PorfolioPic" />  
                        <p>
                            Created personal portfolio website deployed on GitHub Pages. Written in HTML and CSS, using React as well as Framer Motion for animations.
                        </p>
                 </div>
                </div>

                <div class="project3">
                    <h1>More in Progress!</h1>
                    <div class="information3">
                        <p>
                            More projects on the way!
                        </p>
                 </div>
                </div>
            </div>
        </section>
    );
}

export default Projects