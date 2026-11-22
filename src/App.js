import React, { useRef } from 'react';
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
import Footer, { Contact } from './components/Footer';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  const root = useRef(null);

  // Fade sections in as they scroll into view. Opacity only (not visibility) so
  // links inside stay in the tab order; tabbing to one scrolls it in and reveals it.
  // With reduced motion nothing is hidden.
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
  }, { scope: root });

  return (
    <div ref={root}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Research />
        <Coursework />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
