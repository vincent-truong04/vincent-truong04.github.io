import React from 'react';
import '../styling/Projects.css';
import JoystickIcon from '../images/Joystick_Icon.png';
import PortfolioPic from '../images/Portfolio.png';

function Projects() {
    return (
        <section classname="project-section" id="projects">
            <div class="project-header">
                <h>Projects</h>
            </div>
            <div className="allProjects">
                <div class="joystickInsight">
                    <h1>JoystickInsight</h1>
                    <div class="joystickInfo">
                        <img src={JoystickIcon} alt="JoystickIcon" />
                        <p>
                            A full-stack program used to quickly test joystick hardware functionality and assess usability of newly created configuration files.
                            Coded in Java, alongside JavaFX and the JInput library.
                        </p>
                    </div>
                </div>

                <div class="portfolio">
                    <h1>Portfolio Website</h1>
                    <div class="portfolioInfo">
                        <img src={PortfolioPic} alt="PorfolioPic" />
                        <p>
                            Created personal portfolio website deployed on GitHub Pages. Written in HTML and CSS, using React as well as Framer Motion for animations.
                        </p>
                    </div>
                </div>

                <div class="PowerV2G">
                    <h1>More in Progress!</h1>
                    <div class="PowerV2GInfo">
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