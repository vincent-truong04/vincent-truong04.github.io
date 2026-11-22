import React from 'react';
import '../styling/About.css';
import content, { asset, resumeHref } from '../content';
import Section from './Section';
import Pins from './Pins';

const { profile } = content;

// Skills read like a datasheet pin list: one bank per resume category,
// pins numbered continuously across banks.
function Skills() {
    let pin = 0;
    const total = profile.skills.reduce((sum, group) => sum + group.items.length, 0);

    return (
        <div className="macro pinout" data-reveal>
            <Pins />
            <header className="pinout__head">
                <h3 id="skills-title">Skills</h3>
                <span className="pinout__count mono" aria-hidden="true">{total} pins</span>
            </header>
            <div className="pinout__banks">
                {profile.skills.map((group) => (
                    <div key={group.group} className="bank">
                        <h4 className="bank__title mono">{group.group}</h4>
                        <ul className="bank__pins">
                            {group.items.map((item) => {
                                pin += 1;
                                return (
                                    <li key={item} className="bank__pin">
                                        <span className="bank__num mono" aria-hidden="true">{String(pin).padStart(2, '0')}</span>
                                        {item}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

function About() {
    return (
        <Section id="about">
            <div className="about">
                <figure className="macro about__portrait" data-reveal>
                    <Pins />
                    <img src={asset(profile.headshot.src)} alt={profile.headshot.alt} width="256" height="385" />
                </figure>

                <div className="about__body" data-reveal>
                    {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    <a className="button" href={resumeHref} target="_blank" rel="noreferrer">Resume</a>
                </div>
            </div>

            <Skills />
        </Section>
    );
}

export default About;
