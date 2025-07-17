import React, { useState, useEffect } from 'react';
import './RurekaCelebration.css';

const RurekaCelebration = ({ proId, onCelebrationComplete }) => {
  const [celebrations, setCelebrations] = useState([]);
  const [currentCelebration, setCurrentCelebration] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'https://fixloapp.onrender.com';

  useEffect(() => {
    if (proId) {
      fetchUnviewedCelebrations();
    }
  }, [proId]);

  useEffect(() => {
    if (celebrations.length > 0 && !currentCelebration) {
      showNextCelebration();
    }
  }, [celebrations, currentCelebration]);

  const fetchUnviewedCelebrations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/rureka/celebrations/${proId}?unviewedOnly=true`);
      const data = await response.json();
      
      if (data.success && data.celebrations.length > 0) {
        setCelebrations(data.celebrations);
      }
    } catch (error) {
      console.error('Error fetching celebrations:', error);
    }
  };

  const showNextCelebration = () => {
    if (celebrations.length === 0) return;

    const nextCelebration = celebrations[0];
    setCurrentCelebration(nextCelebration);
    setIsVisible(true);

    // Auto-hide after duration
    setTimeout(() => {
      hideCelebration();
    }, nextCelebration.celebration.duration || 3000);
  };

  const hideCelebration = async () => {
    if (!currentCelebration) return;

    setIsVisible(false);
    
    // Mark as viewed
    try {
      await fetch(`${API_URL}/api/rureka/celebrations/${currentCelebration._id}/viewed`, {
        method: 'PATCH'
      });
    } catch (error) {
      console.error('Error marking celebration as viewed:', error);
    }

    // Remove from queue and show next
    setTimeout(() => {
      const remainingCelebrations = celebrations.slice(1);
      setCelebrations(remainingCelebrations);
      setCurrentCelebration(null);
      
      if (remainingCelebrations.length > 0) {
        setTimeout(showNextCelebration, 500); // Brief pause between celebrations
      } else if (onCelebrationComplete) {
        onCelebrationComplete();
      }
    }, 300); // Wait for fade out animation
  };

  const manualClose = () => {
    hideCelebration();
  };

  const triggerTestCelebration = async (type = 'custom') => {
    try {
      const response = await fetch(`${API_URL}/api/rureka/celebrations/trigger`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type,
          proId,
          customMessage: 'Rureka! 🎉 This is a test celebration!'
        })
      });
      
      const data = await response.json();
      if (data.success) {
        // Refresh celebrations
        setTimeout(fetchUnviewedCelebrations, 500);
      }
    } catch (error) {
      console.error('Error triggering test celebration:', error);
    }
  };

  if (!currentCelebration || !isVisible) {
    return (
      <div className="rureka-debug">
        {proId && (
          <button 
            onClick={() => triggerTestCelebration()} 
            className="test-celebration-btn"
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              background: '#4ECDC4',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '14px',
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            🎉 Test Rureka
          </button>
        )}
      </div>
    );
  }

  const celebration = currentCelebration.celebration;
  const animationClass = `rureka-${celebration.animation}`;

  return (
    <div className={`rureka-celebration ${isVisible ? 'visible' : ''}`}>
      <div 
        className={`rureka-card ${animationClass}`}
        style={{ 
          backgroundColor: celebration.color,
          borderColor: celebration.color
        }}
      >
        <button 
          className="rureka-close" 
          onClick={manualClose}
          aria-label="Close celebration"
        >
          ×
        </button>
        
        <div className="rureka-emoji">
          {celebration.emoji}
        </div>
        
        <div className="rureka-content">
          <h3 className="rureka-title">
            {currentCelebration.title}
          </h3>
          <p className="rureka-message">
            {currentCelebration.message}
          </p>
          
          {currentCelebration.achievement && (
            <div className="rureka-achievement">
              <span className="achievement-badge">
                🏆 {currentCelebration.achievement.milestone?.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        {celebration.animation === 'confetti' && (
          <div className="confetti-container">
            {Array.from({length: 50}).map((_, i) => (
              <div key={i} className="confetti-piece" />
            ))}
          </div>
        )}
      </div>
      
      <div className="rureka-overlay" onClick={manualClose} />
    </div>
  );
};

export default RurekaCelebration;