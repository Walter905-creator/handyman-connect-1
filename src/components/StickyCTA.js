import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StickyCTA() {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 w-full bg-blue-600 text-white text-center p-3 z-50">
      <button
        onClick={() => navigate('/subscribe')}
        className="text-lg font-bold"
      >
        🚀 Pros: Start Getting Jobs Now – $59.99/mo
      </button>
    </div>
  );
}