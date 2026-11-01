import React from 'react';
import '../styling/Footer.css';
import content from '../content';
import contactIcons from './contactIcons';
import Section from './Section';

// Visible text for each link: the address without its scheme or trailing slash.
const display = (url) => url.replace(/^mailto:|^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export function Contact() {
    return (
        <Section id="contact">
            <ul className="contact" data-reveal>
                {content.contact.map((link) => {
                    const external = !link.url.startsWith('mailto:');
                    return (
                        <li key={link.icon}>
                            <a className="contact__link" href={link.url} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d={contactIcons[link.icon]} />
                                </svg>
                                <span className="contact__label">{link.label}</span>
                                <span className="contact__url mono">{display(link.url)}</span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </Section>
    );
}

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="site-footer">
            <div className="container site-footer__inner">
                <p className="mono">{content.profile.name} ©{currentYear}</p>
                <a className="mono" href="#hero">Back to top ↑</a>
            </div>
        </footer>
    );
}

export default Footer;
