import React from 'react';
import '../styling/Projects.css';
import JoystickInsight from '../images/Joystick_tester.jpeg';

function Projects(){
    return(
        <section classname="project-section" id="projects">
            <div class="header">
             <h3>Projects</h3>
            </div>
            <div class="project1">
                <div class="description1">
                    <h4>JoystickInsight</h4>
                    <p>
                        A full-stack program used to quickly test joystick hardware functionality and assess usability of newly created configuration files. 
                        Coded in Java, alongside JavaFX and the JInput library.
                    </p>
                </div>

  
            </div>
        </section>
    );
}

export default Projects