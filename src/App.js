
import About from './components/About';
import Hero from './components/Hero';
import Header from './components/Header';
import Projects from './components/Projects';
import './styling/App.css';

function App() {
  return (
    <div className="app-section">
      <Hero />
      <Header />
      <About />
      <Projects />
    </div>
  );
}

export default App;
