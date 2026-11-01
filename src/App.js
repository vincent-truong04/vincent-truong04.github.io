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

  // Fade sections in as they scroll into view. With reduced motion nothing is hidden.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const items = gsap.utils.toArray('main [data-reveal]');
      gsap.set(items, { autoAlpha: 0, y: 24 });
      ScrollTrigger.batch(items, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 }),
      });
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
