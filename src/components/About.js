import React from 'react';
import '../styling/About.css';
import content, { asset } from '../content';
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
                    <ul className="skills">
                        {profile.skills.map((skill) => (
                            <li key={skill.name} className="skills__pin">
                                <img src={asset(skill.icon)} alt="" width="20" height="20" />
                                <span className="mono">{skill.name}</span>
                            </li>
                        ))}
                    </ul>

                    <a className="button" href={profile.resumeUrl} target="_blank" rel="noreferrer">Resume</a>
                </div>
            </div>
        </Section>
    );
}

export default About;
