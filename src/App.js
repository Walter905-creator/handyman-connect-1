// src/App.js
import React from 'react';
import './App.css';
import UrgencyPopup from './components/UrgencyPopup';
import ExitIntentModal from './components/ExitIntentModal';
import StickyCTA from './components/StickyCTA';

function App() {
  return (
    <>
      <UrgencyPopup />
      <ExitIntentModal />
      <StickyCTA />
      <div className="app">
        <header className="header">
          <img src="/assets/fixlo-logo.png" alt="Fixlo Logo" className="logo" />
          <h1>Welcome to Fixlo</h1>
          <p>Your one-stop hub for trusted professionals and home projects</p>
        </header>

        <section className="services">
          <h2>Select a Service</h2>
          <div className="service-buttons">
            <button>🚰 Plumbing</button>
            <button>💡 Electrical</button>
            <button>🪚 Carpentry</button>
            <button>🧹 House Cleaning</button>
            <button>🗑️ Junk Removal</button>
            <button>🌿 Landscaping</button>
            <button>🏠 Roofing</button>
            <button>❄️ HVAC</button>
            <button>🎨 Painting</button>
          </div>
        </section>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Fixlo. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
