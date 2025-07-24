import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Subscribe from './pages/Subscribe';
import Contact from './pages/Contact';
import StickyCTA from './components/StickyCTA';
import ExitIntentModal from './components/ExitIntentModal';

function App() {
  return (
    <div className="bg-white min-h-screen text-gray-800">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <StickyCTA />
      <ExitIntentModal />
    </div>
  );
}

export default App;
