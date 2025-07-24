import React from 'react';
import Home from './pages/Home';
import UrgencyPopup from './components/UrgencyPopup';
import ExitIntentModal from './components/ExitIntentModal';
import StickyCTA from './components/StickyCTA';

function App() {
  return (
    <div>
      <Home />
      <UrgencyPopup />
      <ExitIntentModal />
      <StickyCTA />
    </div>
  );
}

export default App;
