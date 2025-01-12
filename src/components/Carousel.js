import '../styling/Carousel.css';
import JoystickIcon from '../images/Joystick_Icon.png';
import PortfolioPic from '../images/Portfolio.png';
import CanvasCraft from '../images/CanvasCraft.png';
import V2G from '../images/V2G.png';
import React, { useRef, useState, useEffect } from 'react';

function Carousel() {
    const carouselListRef = useRef(null);
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const isClickInProgress = useRef(false);
    const carouselItemsRef = useRef([]);

    useEffect(() => {
        const carouselList = carouselListRef.current;
        const elems = carouselItemsRef.current;

        const handleClick = (event) => {
            if (isClickInProgress.current) return;

            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }

            const newDebounceTimeout = setTimeout(() => {
                processClick(event);
            }, 100);

            setDebounceTimeout(newDebounceTimeout);
        };

        const processClick = (event) => {
            isClickInProgress.current = true;

            if (!event.target) return;

            var newActive = event.target.closest('.carousel__item');

            if (!newActive) {
                isClickInProgress.current = false;
                return;
            }

            if (newActive.classList.contains('carousel__item_active')) {
                isClickInProgress.current = false;
                return;
            }

            update(newActive);

            isClickInProgress.current = false;
        };

        const update = (newActive) => {
            const newActivePos = newActive.dataset.pos;

            // eslint-disable-next-line
            const current = elems.find((elem) => elem.dataset.pos == 0); // eslint-disable-next-line
            const prev = elems.find((elem) => elem.dataset.pos == -1); // eslint-disable-next-line
            const next = elems.find((elem) => elem.dataset.pos == 1); // eslint-disable-next-line
            const first = elems.find((elem) => elem.dataset.pos == -2); // eslint-disable-next-line
            const last = elems.find((elem) => elem.dataset.pos == 2);

            if (!current) return;
            current.classList.remove('carousel__item_active');

            [current, prev, next, first, last].forEach(item => {
                var itemPos = item.dataset.pos;
                item.dataset.pos = getPos(itemPos, newActivePos);
            });
        };

        const getPos = (current, active) => {
            const diff = current - active;

            if (Math.abs(current - active) > 2) {
                return -current;
            }

            return diff;
        };

        if (carouselList) {
            carouselList.addEventListener('click', handleClick);
        }

        return () => {
            if (carouselList) {
                carouselList.removeEventListener('click', handleClick);
            }

            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
        };
    }, [debounceTimeout]);

    return (
        <section classname="project-section" id="projects">
            <div className="project-header">
                <h>Projects</h>
            </div>
            <div className="carousel">
                <ul className="carousel__list" ref={carouselListRef}>
                    <div className="carousel__item" data-pos={-2} ref={(el) => (carouselItemsRef.current[0] = el)}>
                        <h1>Joystick Insight</h1>
                        <div className="joystickInfo">
                            <img src={JoystickIcon} alt="JoystickIcon" />
                            <p>
                                A full-stack program used to quickly test joystick hardware
                                functionality and assess usability of newly created configuration
                                files. Coded in Java, alongside JavaFX and the JInput library.
                            </p>
                        </div>
                    </div>
                    <div className="carousel__item" data-pos={-1} ref={(el) => (carouselItemsRef.current[1] = el)}>
                        <h1>Portfolio Website</h1>
                        <div className="portfolioInfo">
                            <img src={PortfolioPic} alt="PortfolioPic" />
                            <p>
                                Created personal portfolio website deployed on GitHub Pages.
                                Written in HTML and CSS, using React as well as Framer Motion for
                                animations.
                            </p>
                        </div>
                    </div>
                    <div className="carousel__item" data-pos={0} ref={(el) => (carouselItemsRef.current[2] = el)}>
                        <h1>Power Vehicle-to-grid (V2G) Model</h1>
                        <div className="PowerV2GInfo">
                            <img src={V2G} alt="V2G" />
                            <p>
                                Modeled a vehicle-to-grid (V2G) system in Simulink. Analyzed the system by examining outputted active power from renewable
                                energy sources and residential loads alongside different regulations for charging and discharging cycles.
                            </p>
                        </div>
                    </div>
                    <div className="carousel__item" data-pos={1} ref={(el) => (carouselItemsRef.current[3] = el)}>
                        <h1>Canvas Craft</h1>
                        <div className="canvasCraftInfo">
                            <img src={CanvasCraft} alt="CanvasCraft" />
                            <p>
                                Developed a paint program using Python and Tkinter, designed to emulate the functionality of MS Paint. 
                                Features include adjustable brush sizes and shapes with a visual indicator, color selection 
                                and essential file operations such as New, Save As, and Exit via a file menu.
                                Users can clear the canvas and save artwork as PNG file, utilizing the PIL library for image processing.</p>
                        </div>
                    </div>
                    <div className="carousel__item" data-pos={2} ref={(el) => (carouselItemsRef.current[4] = el)}>
                        <h1>More in Progress!</h1>
                        <div className="moreToCome">
                            <p>More projects on the way!</p>
                        </div>
                    </div>
                </ul>
            </div>
        </section>
    );
}

export default Carousel;