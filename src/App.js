import Header from './components/Header';
import About from './components/About';
import Hero from './components/Hero';
import './styling/App.css';

function App() {
  return (
    <div className="app-section">
      <Header />
      <Hero />
      <About />
    </div>
  );
}

export default App;
