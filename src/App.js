import About from './components/About';
import Hero from './components/Hero';
import Projects from './components/Projects';
import './styling/App.css';

function App() {
  return (
    <div className="app-section">
      <Hero />
      <About />
      <Projects />
    </div>
  );
}

export default App;
