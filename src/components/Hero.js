import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import '../styling/Hero.css';
import content, { sections } from '../content';
import Pins from './Pins';

const { profile } = content;

function Hero() {
    const root = useRef(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.timeline({ defaults: { duration: 0.5, ease: 'power2.out' } })
                .from('[data-hero]', { y: 16, autoAlpha: 0, stagger: 0.08 })
                .from('.floorplan__block', { autoAlpha: 0, scale: 0.96, stagger: 0.05 }, 0.15);
        });
    }, { scope: root });

    return (
        <section className="hero" id="hero" ref={root}>
            <svg className="hero__grid" aria-hidden="true">
                <defs>
                    <pattern id="placement-rows" width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M0 0.5H24" />
                        <circle cx="12" cy="12" r="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#placement-rows)" />
            </svg>

            <div className="container hero__inner">
                <div className="die">
                    <span className="die__coord die__coord--start mono" aria-hidden="true">(0, 0)</span>
                    <span className="die__coord die__coord--end mono" aria-hidden="true">VT · TOP</span>

                    <div className="macro hero__macro">
                        <Pins />
                        <p className="hero__greeting mono" data-hero>{profile.greeting}</p>
                        <h1 className="hero__name" data-hero>
                            My name is <span>{profile.name}</span>
                        </h1>
                        {profile.headline && <p className="hero__headline" data-hero>{profile.headline}</p>}
                        <div className="hero__actions" data-hero>
                            <a className="button" href={profile.resumeUrl} target="_blank" rel="noreferrer">Resume</a>
                            <a className="button button--ghost" href="#about">Learn More</a>
                        </div>
                    </div>

                    <nav className="floorplan" aria-label="Floorplan">
                        {sections.map((section) => (
                            <a key={section.id} className="floorplan__block" href={`#${section.id}`}>
                                <span className="mono">{section.designator}</span>
                                {section.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </section>
    );
}

export default Hero;
