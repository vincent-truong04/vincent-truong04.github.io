import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import '../styling/Projects.css';
import content, { asset, sectionById } from '../content';
import Section from './Section';
import Pins from './Pins';

const { projects, projectsEmptyState } = content;

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function ProjectCard({ project, designator, onRoute, onUnroute }) {
    const cover = project.images[0];
    return (
        <article
            className="macro project"
            data-reveal
            onPointerEnter={onRoute}
            onPointerLeave={onUnroute}
            onFocus={onRoute}
            onBlur={onUnroute}
        >
            <Pins />
            <header className="project__head">
                <span className="project__designator mono">{designator}</span>
                <h3>{project.title}</h3>
                {project.context && <p className="project__context mono">{project.context}</p>}
            </header>
            {cover && (
                <div className="project__image">
                    <img src={asset(cover.src)} alt={cover.alt} loading="lazy" />
                </div>
            )}
            <div className="project__body">
                {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {project.links.length > 0 && (
                <ul className="project__links">
                    {project.links.map((link) => (
                        <li key={link.url}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                        </li>
                    ))}
                </ul>
            )}
            {project.tags.length > 0 && (
                <ul className="project__tags" aria-label="Tools">
                    {project.tags.map((tag) => <li key={tag} className="mono">{tag}</li>)}
                </ul>
            )}
        </article>
    );
}

function Projects() {
    const root = useRef(null);
    const head = useRef(null);
    const wire = useRef(null);
    const designator = sectionById('projects').designator;

    const { contextSafe } = useGSAP({ scope: root });

    // Draw a Manhattan route from under the section heading, through the gap
    // above the cards, to the hovered card's top edge.
    const route = contextSafe((event) => {
        const box = root.current.getBoundingClientRect();
        const from = head.current.getBoundingClientRect();
        const to = event.currentTarget.getBoundingClientRect();
        const x0 = from.left - box.left + 4;
        const y0 = from.bottom - box.top + 8;
        const x1 = to.left - box.left + 32;
        const y1 = to.top - box.top;
        const yMid = Math.min(y0 + 16, y1);

        const path = wire.current;
        path.setAttribute('d', `M${x0} ${y0} V${yMid} H${x1} V${y1}`);
        const length = path.getTotalLength();
        gsap.killTweensOf(path);
        gsap.set(path, { autoAlpha: 1, strokeDasharray: length });
        gsap.fromTo(path, { strokeDashoffset: length }, {
            strokeDashoffset: 0,
            duration: reduceMotion() ? 0 : 0.45,
            ease: 'power2.out',
        });
    });

    const unroute = contextSafe(() => {
        gsap.to(wire.current, { autoAlpha: 0, duration: reduceMotion() ? 0 : 0.2 });
    });

    return (
        <div ref={root} className="projects-root">
            <svg className="projects__wire" aria-hidden="true">
                <path ref={wire} />
            </svg>
            <Section id="projects" headRef={head}>
                <div className="projects">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.slug}
                            project={project}
                            designator={`${designator}.${i + 1}`}
                            onRoute={route}
                            onUnroute={unroute}
                        />
                    ))}
                    <article className="macro project project--empty" data-reveal>
                        <h3>{projectsEmptyState.title}</h3>
                        <p>{projectsEmptyState.text}</p>
                    </article>
                </div>
            </Section>
        </div>
    );
}

export default Projects;
