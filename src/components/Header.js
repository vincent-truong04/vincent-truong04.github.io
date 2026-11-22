import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
                <Link to="/" className="site-header__logo">V.T.</Link>
                <nav className="site-header__nav" aria-label="Main">
                    {sections.map((section) => (
                        <NavLink key={section.id} to={section.path}>{section.label}</NavLink>
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
