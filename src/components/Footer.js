import React from 'react';
import '../styling/Footer.css';
import content from '../content';
import contactIcons from './contactIcons';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer id="contact">
            <div className="footer-header">
                <h2 className="section-title">Contact Me</h2>
            </div>
            <ul className="link-bar">
                {content.contact.map((link) => {
                    const external = !link.url.startsWith('mailto:');
                    return (
                        <li className="icon-content" key={link.icon}>
                            <a href={link.url} aria-label={link.label} data-social={link.icon} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
                                <div className="filled"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d={contactIcons[link.icon]} fill="currentColor"></path>
                                </svg>
                            </a>
                            <div className="tooltip">{link.label}</div>
                        </li>
                    );
                })}
            </ul>

            <p className="copyright">{content.profile.name} ©{currentYear}</p>
        </footer>
    );
}

export default Footer;
