import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Subscribe from './pages/Subscribe';
import Contact from './pages/Contact';
import StickyCTA from './components/StickyCTA';
import ExitIntentModal from './components/ExitIntentModal';

function App() {
  return (
    <div className="App">
      <ExitIntentModal />
      <StickyCTA />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
