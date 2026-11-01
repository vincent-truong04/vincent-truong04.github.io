import '../styling/Carousel.css';
import JoystickIcon from '../images/Joystick_Icon.png';
import PortfolioPic from '../images/Portfolio.png';
import CanvasCraft from '../images/CanvasCraft.png';
import V2G from '../images/V2G.png';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ITEM_COUNT = 5;

// Offset of item i from the active item, wrapped into -2..2.
const positionOf = (i, active) => ((i - active + ITEM_COUNT + 2) % ITEM_COUNT) - 2;

function Carousel() {
    const [active, setActive] = useState(2);

    const step = (delta) => setActive((a) => (a + delta + ITEM_COUNT) % ITEM_COUNT);

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowLeft') step(-1);
        if (event.key === 'ArrowRight') step(1);
    };

    const itemProps = (i) => ({
        className: i === active ? 'carousel__item carousel__item_active' : 'carousel__item',
        'data-pos': positionOf(i, active),
        'aria-current': i === active ? 'true' : undefined,
        onClick: () => setActive(i),
    });

    return (
        <section className="project-section" id="projects">
            <div className="project-header">
                <h2 className="section-title">Projects</h2>
            </div>
            <motion.div initial={{ y: "10%", opacity: 0 }} whileInView={{y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut"}} viewport={{ once: true, amount: 0.3}} className="carousel">
                <div className="carousel__controls">
                    <button type="button" onClick={() => step(-1)} aria-label="Previous project">‹</button>
                    <button type="button" onClick={() => step(1)} aria-label="Next project">›</button>
                </div>
                <ul className="carousel__list" tabIndex={0} aria-label="Projects, use left and right arrow keys to browse" onKeyDown={handleKeyDown}>
                    <li {...itemProps(0)}>
                        <h3>Joystick Insight</h3>
                        <div className="joystickInfo">
                            <img src={JoystickIcon} alt="Illustration of an arcade-style joystick" />
                            <p>
                                Developed a full-stack program used to quickly test joystick hardware functionality during my internship position at Trident Systems. 
                                For each new joystick, new configurtion files were written to map each button to a program function.
                                The program analyzed event data in real time by parsing through raw binary data and mapped it to the config files to confirm the accuracy of newly created configs.
                                The tester utilized Java for backend and JavaFX for frontend, and also used JInput library to aid in object-oriented programming.
                            </p>
                        </div>
                    </li>
                    <li {...itemProps(1)}>
                        <h3>Portfolio Website</h3>
                        <div className="portfolioInfo">
                            <img src={PortfolioPic} alt="Screenshot of this portfolio's About section with headshot and skill icons" />
                            <p>

                                Designed and developed a personal portfolio website to showcase my skills, projects, and experiences.
                                The website was created using modern web technologies, including HTML, CSS, and React, to ensure a dynamic and responsive user experience. 
                                Integrated Framer Motion to add smooth and visually appealing animations, and deployed the website on GitHub Pages for easy sharing and continuous access, 
                                utilizing version control through Git to manage updates and improvements.
                            </p>
                        </div>
                    </li>
                    <li {...itemProps(2)}>
                        <h3>Power Vehicle-to-grid (V2G) Model</h3>
                        <div className="PowerV2GInfo">
                            <img src={V2G} alt="Simulink model of a 24-hour vehicle-to-grid simulation with PV farm, wind farm, diesel generator, V2G block and residential load" />
                            <p>
                                Modeled a vehicle-to-grid (V2G) system in Simulink during my research position at Christopher Newport University. Analyzed the system by comparing outputted active power from renewable
                                energy sources and residential loads alongside different regulations set for charging and discharging cycles.
                            </p>
                        </div>
                    </li>
                    <li {...itemProps(3)}>
                        <h3>Canvas Craft</h3>
                        <div className="canvasCraftInfo">
                            <img src={CanvasCraft} alt="Canvas Craft window with color, shape and brush-size controls and a yellow star drawn on the canvas" />
                            <p>
                                Developed a paint program using Python and Tkinter, designed to emulate the functionality of MS Paint.
                                Features include adjustable brush sizes and shapes with a visual indicator, color selection
                                and essential file operations such as New, Save As, and Exit via a file menu.
                                Users can clear the canvas and save artwork as PNG file, utilizing the PIL library for image processing.</p>
                        </div>
                    </li>
                    <li {...itemProps(4)}>
                        <h3>More in Progress!</h3>
                        <div className="moreToComeInfo">
                            <p>There are many more projects to come, thank you for checking out my website!</p>
                        </div>
                    </li>
                </ul>
            </motion.div>
        </section>
    );
}

export default Carousel;