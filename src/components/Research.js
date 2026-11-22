import React from 'react';
import '../styling/Entries.css';
import content, { asset } from '../content';
import Section from './Section';
import { formatDate } from './dates';

function Research() {
    return (
        <Section id="research">
            <ol className="entries">
                {content.research.map((item) => (
                    <li key={item.slug} className="entry" data-reveal>
                        <p className="entry__meta mono">{formatDate(item.date)}{item.kind && ` · ${item.kind}`}</p>
                        <div className="entry__main">
                            <h3>{item.title}</h3>
                            {(item.authors?.length > 0 || item.venue) && (
                                <p className="entry__byline">
                                    {item.authors?.join(', ')}{item.authors?.length > 0 && item.venue && '. '}
                                    {item.venue && <em>{item.venue}</em>}
                                </p>
                            )}
                            {item.summary && <p>{item.summary}</p>}
                            {item.description?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                            {item.images?.[0] && (
                                <img className="entry__image" src={asset(item.images[0].src)} alt={item.images[0].alt} loading="lazy" />
                            )}
                            {item.links?.length > 0 && (
                                <ul className="entry__links">
                                    {item.links.map((link) => (
                                        <li key={link.url}>
                                            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </Section>
    );
}

export default Research;
