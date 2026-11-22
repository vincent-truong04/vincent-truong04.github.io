import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/Section.css';
import { HOME, sectionById, sections } from '../content';

// A page with its floorplan designator ("U2 · Projects"), its title, and links
// to the previous and next pages so visitors can click through in order.
function Section({ id, headRef, className = '', children }) {
    const section = sectionById(id);
    if (!section) return null;

    const index = sections.indexOf(section);
    const prev = index === 0 ? HOME : sections[index - 1];
    const next = sections[index + 1];

    return (
        <section id={id} className={`section ${className}`} aria-labelledby={`${id}-title`}>
            <div className="container">
                <header className="section__head" data-reveal ref={headRef}>
                    <span className="section__designator mono">
                        {section.designator} · {section.label}
                    </span>
                    <h1 id={`${id}-title`} tabIndex={-1}>{section.title}</h1>
                </header>
                {children}
                <nav className="pager" aria-label="Previous and next page">
                    <Link className="pager__link pager__link--prev" to={prev.path}>
                        <span className="mono">← {prev.designator ?? '(0, 0)'}</span>
                        {prev.label}
                    </Link>
                    {next && (
                        <Link className="pager__link pager__link--next" to={next.path}>
                            <span className="mono">{next.designator} →</span>
                            {next.label}
                        </Link>
                    )}
                </nav>
            </div>
        </section>
    );
}

export default Section;
