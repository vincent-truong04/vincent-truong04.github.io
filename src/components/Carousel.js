import '../styling/Carousel.css';
import JoystickIcon from '../images/Joystick_Icon.png';
import PortfolioPic from '../images/Portfolio.png';
import React, { useRef, useState, useEffect } from 'react';

function Carousel() {
    const carouselListRef = useRef(null);
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const isClickInProgress = useRef(false); // Ref to track if click is being processed
    const carouselItemsRef = useRef([]);

    useEffect(() => {
        const carouselList = carouselListRef.current;
        const elems = carouselItemsRef.current;

        const handleClick = (event) => {
            // If a click is already in progress, ignore the new click
            if (isClickInProgress.current) return;

            // Debounce: Ignore clicks within 500ms after the last click
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }

            // Set debounce timeout to process the click after 500ms
            const newDebounceTimeout = setTimeout(() => {
                processClick(event);
            }, 100);

            setDebounceTimeout(newDebounceTimeout);
        };

        const processClick = (event) => {
            // Mark that a click is being processed
            isClickInProgress.current = true;

            if (!event.target) return;

            // Find the closest carousel item
            var newActive = event.target.closest('.carousel__item');

            // If no item found or invalid target, reset and return
            if (!newActive) {
                isClickInProgress.current = false; // Reset flag
                return;
            }

            // Avoid processing if the clicked item is already active
            if (newActive.classList.contains('carousel__item_active')) {
                isClickInProgress.current = false; // Reset flag
                return;
            }

            update(newActive);

            // Reset the flag after the action completes
            isClickInProgress.current = false;
        };

        const update = (newActive) => {
            const newActivePos = newActive.dataset.pos;

            const current = elems.find((elem) => elem.dataset.pos == 0);
            const prev = elems.find((elem) => elem.dataset.pos == -1);
            const next = elems.find((elem) => elem.dataset.pos == 1);
            const first = elems.find((elem) => elem.dataset.pos == -2);
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

            // Cleanup timeout if the component unmounts
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
                        <h1>JoystickInsight</h1>
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
                            <p>
                                Created personal portfolio website deployed on GitHub Pages.
                                Written in HTML and CSS, using React as well as Framer Motion for
                                animations.
                            </p>
                        </div>
                    </div>
                    <div className="carousel__item" data-pos={0} ref={(el) => (carouselItemsRef.current[2] = el)}>
                        <h1>More in Progress!</h1>
                        <div className="PowerV2GInfo">
                            <p>More projects on the way!</p>
                        </div>
                    </div>
                    <div className="carousel__item" data-pos={1} ref={(el) => (carouselItemsRef.current[3] = el)}>
                        <h1>More in Progress!</h1>
                        <div className="PowerV2GInfo">
                            <p>More projects on the way!</p>
                        </div>
                    </div>
                    <div className="carousel__item" data-pos={2} ref={(el) => (carouselItemsRef.current[4] = el)}>
                        <h1>More in Progress!</h1>
                        <div className="PowerV2GInfo">
                            <p>More projects on the way!</p>
                        </div>
                    </div>
                </ul>
            </div>
        </section>
    );
}

export default Carousel;