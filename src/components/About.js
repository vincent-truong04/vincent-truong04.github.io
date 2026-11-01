import React from 'react';
import '../styling/About.css';
import { motion } from 'framer-motion';
import content, { asset } from '../content';

const { profile } = content;

// Skill icons are laid out in three staggered columns.
const COLUMN_SIZES = [2, 3, 2];
const COLUMN_MOTION = [
    { x: "100%", delay: 0 },
    { x: "100%", delay: 0.5 },
    { x: "50%", delay: 1 },
];

// The last column takes any skills beyond the first seven.
const skillColumns = COLUMN_SIZES.map((size, col) => {
    const start = COLUMN_SIZES.slice(0, col).reduce((sum, n) => sum + n, 0);
    const end = col === COLUMN_SIZES.length - 1 ? undefined : start + size;
    return profile.skills.slice(start, end);
});

function About() {
    return (
        <section id="about" className="about-section">
            <div className="about-header">
                <h2 className="section-title">About Me</h2>
            </div>
            <div className="aboutContent-container">
                <div className="about-description">
                    <motion.div initial={{ y: "100%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }} className="img-container">
                        <img src={asset(profile.headshot.src)} alt={profile.headshot.alt} />
                    </motion.div>
                    <motion.a initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut", delay: 1 }} viewport={{ once: true, amount: 0.3 }} href={profile.resumeUrl} target="_blank" rel="noreferrer" className="button">
                        <span className="button_lg">
                            <span className="button_sl"></span>
                            <span className="button_text">Resume</span>
                        </span>
                    </motion.a>
                    {profile.about.map((paragraph) => (
                        <motion.p key={paragraph} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }} viewport={{ once: true, amount: 0.3 }}>
                            {paragraph}
                        </motion.p>
                    ))}
                </div>
                <div className="skill-icons">
                    {skillColumns.map((skills, col) => (
                        <motion.div key={col} initial={{ x: COLUMN_MOTION[col].x, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut", delay: COLUMN_MOTION[col].delay }} viewport={{ once: true, amount: 0.3 }} className={`col${col + 1}`}>
                            {skills.map((skill) => (
                                <figure key={skill.name}>
                                    <img src={asset(skill.icon)} alt="" />
                                    <figcaption className="caption">{skill.name}</figcaption>
                                </figure>
                            ))}
                        </motion.div>
                    ))}
                    <a href="#hero" className="Btn" aria-label="Back to top">
                        <svg className='arrow' xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="m12 6.414 7.293 7.293 1.414-1.414L12 3.586l-8.707 8.707 1.414 1.414L12 6.414z" /><path d="m3.293 18.293 1.414 1.414L12 12.414l7.293 7.293 1.414-1.414L12 9.586l-8.707 8.707z" /></svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default About;