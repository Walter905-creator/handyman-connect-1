import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function UrgencyPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const notifications = [
    {
      icon: '🔥',
      message: 'John from San Francisco just found a plumber!',
      time: '2 minutes ago',
      color: '#ff6b6b'
    },
    {
      icon: '⚡',
      message: 'Sarah in Miami booked an electrician!',
      time: '5 minutes ago',
      color: '#4ecdc4'
    },
    {
      icon: '🏠',
      message: 'Mike got his roof fixed in Chicago!',
      time: '8 minutes ago',
      color: '#45b7d1'
    },
    {
      icon: '🔧',
      message: 'Lisa found a handyman in Austin!',
      time: '12 minutes ago',
      color: '#96ceb4'
    },
    {
      icon: '🎨',
      message: 'David hired a painter in Seattle!',
      time: '15 minutes ago',
      color: '#ffeaa7'
    }
  ];

  useEffect(() => {
    // Don't show on non-home pages
    if (location.pathname !== '/') {
      return;
    }

    // Show first notification after 15 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 15000);

    return () => clearTimeout(initialTimer);
  }, [location.pathname]);

  useEffect(() => {
    if (!isVisible) return;

    // Cycle through notifications every 8 seconds
    const cycleTimer = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % notifications.length);
    }, 8000);

    // Auto hide after 45 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 45000);

    return () => {
      clearInterval(cycleTimer);
      clearTimeout(hideTimer);
    };
  }, [isVisible, notifications.length]);

  // Don't show on non-home pages
  if (location.pathname !== '/' || !isVisible) {
    return null;
  }

  const current = notifications[currentNotification];

  const handleClick = () => {
    navigate('/signup');
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '100px',
      left: '20px',
      background: 'white',
      borderRadius: '12px',
      padding: '16px 20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      border: `2px solid ${current.color}`,
      zIndex: 9998,
      maxWidth: '300px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      animation: 'slideInLeft 0.5s ease-out'
    }}
    onClick={handleClick}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '8px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '1.2rem' }}>
            {current.icon}
          </span>
          <span style={{
            background: current.color,
            color: 'white',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: '600'
          }}>
            LIVE
          </span>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#999',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '0',
            lineHeight: 1
          }}
        >
          ×
        </button>
      </div>

      <div style={{ marginBottom: '8px' }}>
        <p style={{
          margin: 0,
          fontSize: '14px',
          fontWeight: '600',
          color: '#333',
          lineHeight: '1.3'
        }}>
          {current.message}
        </p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{
          fontSize: '12px',
          color: '#666'
        }}>
          {current.time}
        </span>
        
        <div style={{
          fontSize: '12px',
          color: current.color,
          fontWeight: '600'
        }}>
          Click to join! →
        </div>
      </div>

      {/* Animated pulse effect */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        width: '8px',
        height: '8px',
        background: current.color,
        borderRadius: '50%',
        animation: 'pulse 2s infinite'
      }} />

      <style>
        {`
          @keyframes slideInLeft {
            from {
              transform: translateX(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.5);
              opacity: 0.5;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default UrgencyPopup;