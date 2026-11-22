import React from 'react';
import '../styling/About.css';
import content, { asset, resumeHref } from '../content';
import Section from './Section';
import Pins from './Pins';

const { profile } = content;

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

                    <h3 className="about__skills-title mono">Skills</h3>
                    <div className="skill-groups">
                        {profile.skills.map((group) => (
                            <div key={group.group} className="skill-group">
                                <h4 className="skill-group__title mono">{group.group}</h4>
                                <ul className="skills">
                                    {group.items.map((item) => (
                                        <li key={item} className="skills__pin mono">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <a className="button" href={resumeHref} target="_blank" rel="noreferrer">Resume</a>
                </div>
            </div>
        </Section>
    );
}

export default About;
