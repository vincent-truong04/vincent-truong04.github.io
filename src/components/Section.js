import React from 'react';
import '../styling/Section.css';
import { sectionById } from '../content';

// A page section with its floorplan designator ("U2 · Projects") and title.
function Section({ id, headRef, className = '', children }) {
    const section = sectionById(id);
    if (!section) return null;

    return (
        <section id={id} className={`section ${className}`} aria-labelledby={`${id}-title`}>
            <div className="container">
                <header className="section__head" data-reveal ref={headRef}>
                    <span className="section__designator mono">
                        {section.designator} · {section.label}
                    </span>
                    <h2 id={`${id}-title`}>{section.title}</h2>
                </header>
                {children}
            </div>
        </section>
    );
}

export default Section;
