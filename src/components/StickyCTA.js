import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StickyCTA() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => navigate('/subscribe')}
        className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 animate-pulse"
      >
        Get Started 🚀
      </button>
    </div>
  );
}