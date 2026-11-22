import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/Section.css';

function NotFound() {
    return (
        <section className="section" aria-labelledby="not-found-title">
            <div className="container">
                <header className="section__head">
                    <span className="section__designator mono">404 · No such cell</span>
                    <h1 id="not-found-title" tabIndex={-1}>Page not found</h1>
                </header>
                <Link className="button" to="/">Back to home</Link>
            </div>
        </section>
    );
}

export default NotFound;
