import React from 'react';
import '../styling/Entries.css';
import content from '../content';
import Section from './Section';
import { formatRange } from './dates';

function Experience() {
    return (
        <Section id="experience">
            <ol className="entries">
                {content.experience.map((job) => (
                    <li key={job.slug} className="entry" data-reveal>
                        <p className="entry__meta mono">{formatRange(job.start, job.end)}{job.location && ` · ${job.location}`}</p>
                        <div className="entry__main">
                            <h3>{job.title}{job.org && <span> · {job.org}</span>}</h3>
                            {job.summary && <p>{job.summary}</p>}
                            {job.bullets?.length > 0 && (
                                <ul className="entry__bullets">
                                    {job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                                </ul>
                            )}
                            {job.tags?.length > 0 && <p className="entry__tags mono">{job.tags.join(' · ')}</p>}
                        </div>
                    </li>
                ))}
            </ol>
        </Section>
    );
}

export default Experience;
