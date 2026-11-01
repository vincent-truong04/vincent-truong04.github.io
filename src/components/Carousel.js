import '../styling/Carousel.css';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import content, { asset } from '../content';

const { projects, projectsEmptyState } = content;

// Projects plus a closing "more to come" card.
const ITEM_COUNT = projects.length + 1;
const HALF = Math.floor(ITEM_COUNT / 2);

// Offset of item i from the active item, wrapped around the ring.
// Only offsets -2..2 are styled; anything further out is hidden.
const positionOf = (i, active) => {
    const pos = ((i - active + ITEM_COUNT + HALF) % ITEM_COUNT) - HALF;
    return Math.abs(pos) > 2 ? 'hidden' : pos;
};

function Carousel() {
    const [active, setActive] = useState(HALF);

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
                    {projects.map((project, i) => (
                        <li key={project.slug} {...itemProps(i)}>
                            <h3>{project.title}</h3>
                            <div className={`project-info project-info--${project.slug}`}>
                                {project.images[0] && <img src={asset(project.images[0].src)} alt={project.images[0].alt} />}
                                {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                            </div>
                        </li>
                    ))}
                    <li {...itemProps(projects.length)}>
                        <h3>{projectsEmptyState.title}</h3>
                        <div className="project-info project-info--more">
                            <p>{projectsEmptyState.text}</p>
                        </div>
                    </li>
                </ul>
            </motion.div>
        </section>
    );
}

export default Carousel;
