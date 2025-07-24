import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignupForm from './components/SignupForm';
import ContactPage from './components/ContactPage';
import AdminLogin from './components/AdminLogin';
import ExitIntentModal from './components/ExitIntentModal';
import StickyCTA from './components/StickyCTA';
import UrgencyPopup from './components/UrgencyPopup';

function App() {
  return (
    <Router>
      <ExitIntentModal />
      <UrgencyPopup />
      <StickyCTA />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
