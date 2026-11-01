import React, { useState } from 'react';
import '../styling/Header.css';
import { sections } from '../content';

const readTheme = () => document.documentElement.dataset.theme
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function Header() {
    const [theme, setTheme] = useState(readTheme);

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        try {
            localStorage.setItem('theme', next);
        } catch (e) {
            // Storage can be blocked; the choice then lasts for this visit only.
        }
        setTheme(next);
    };

    return (
        <header className="site-header">
            <div className="container site-header__inner">
                <a href="#hero" className="site-header__logo">V.T.</a>
                <nav className="site-header__nav" aria-label="Sections">
                    {sections.map((section) => (
                        <a key={section.id} href={`#${section.id}`}>{section.label}</a>
                    ))}
                </nav>
                <button
                    type="button"
                    className="theme-toggle mono"
                    onClick={toggleTheme}
                    aria-pressed={theme === 'dark'}
                >
                    Dark
                </button>
            </div>
        </header>
    );
}

export default Header;
