import React from 'react';
import '../styling/Projects.css';
import headshot from '../images/Headshot.png';

function Projects(){
    return(
        <section classname="project-section" id="projects">
            <div class="header">
             <h3>Projects</h3>
            </div>
            <div class="project1">
                <div class="project1-image">
                    <img src= {headshot} alt="headshot" />
                </div>
                <h4>JoystickInsight</h4>

  
            </div>
        </section>
    );
}

export default Projects