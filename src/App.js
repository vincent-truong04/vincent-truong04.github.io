import React, { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Research from './components/Research';
import Coursework from './components/Coursework';
import NotFound from './components/NotFound';
import Footer, { Contact } from './components/Footer';
import content, { sections } from './content';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PAGES = { about: About, experience: Experience, projects: Projects, research: Research, coursework: Coursework, contact: Contact };

function App() {
  const root = useRef(null);
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  // Each page sets the tab title. After a page change, start at the top and move
  // focus to the page heading so screen readers announce the new page.
  useEffect(() => {
    const page = sections.find((section) => section.path === pathname);
    document.title = page ? `${page.label} · ${content.profile.name}` : `${content.profile.name} · Portfolio`;

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.querySelector('main h1')?.focus({ preventScroll: true });
  }, [pathname]);

  // Fade content in as it scrolls into view, set up again for each page. Opacity
  // only (not visibility) so links inside stay in the tab order; tabbing to one
  // scrolls it in and reveals it. With reduced motion nothing is hidden.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const items = gsap.utils.toArray('main [data-reveal]');
      gsap.set(items, { opacity: 0, y: 24 });
      ScrollTrigger.batch(items, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 }),
      });

      // Anything that takes keyboard focus is shown at once, even before its trigger.
      const revealFocused = (event) => {
        const item = event.target.closest('[data-reveal]');
        if (item) gsap.to(item, { opacity: 1, y: 0, duration: 0.2, overwrite: 'auto' });
      };
      document.addEventListener('focusin', revealFocused);
      return () => document.removeEventListener('focusin', revealFocused);
    });
  }, { scope: root, dependencies: [pathname], revertOnUpdate: true });

  return (
    <div ref={root} className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Hero />} />
          {sections.map((section) => {
            const Page = PAGES[section.id];
            return <Route key={section.id} path={section.path} element={<Page />} />;
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
