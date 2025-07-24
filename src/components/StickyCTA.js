import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Show sticky CTA after scrolling down 500px or after 10 seconds
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      }
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Hide on non-home pages
  if (location.pathname !== '/') {
    return null;
  }

  if (!isVisible) return null;

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: isMinimized ? '-60px' : '20px',
      right: '20px',
      background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)',
      color: 'white',
      borderRadius: '16px',
      padding: isMinimized ? '10px 20px' : '20px',
      boxShadow: '0 10px 30px rgba(255, 107, 107, 0.4)',
      zIndex: 9999,
      transition: 'all 0.3s ease',
      maxWidth: isMinimized ? '200px' : '320px',
      cursor: isMinimized ? 'pointer' : 'default'
    }}
    onClick={isMinimized ? handleMinimize : undefined}
    >
      {!isMinimized ? (
        <>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '15px'
          }}>
            <div style={{
              fontSize: '1.8rem',
              marginRight: '10px'
            }}>
              🔧
            </div>
            
            <div style={{
              display: 'flex',
              gap: '10px'
            }}>
              <button
                onClick={handleMinimize}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                −
              </button>
              <button
                onClick={handleClose}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h3 style={{
              margin: '0 0 8px 0',
              fontSize: '1.1rem',
              fontWeight: '700'
            }}>
              Need a Handyman?
            </h3>
            <p style={{
              margin: 0,
              fontSize: '14px',
              opacity: 0.9,
              lineHeight: '1.4'
            }}>
              Get matched with verified professionals in your area instantly!
            </p>
          </div>

          <button
            onClick={handleGetStarted}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255,255,255,0.2)',
              border: '2px solid rgba(255,255,255,0.3)',
              color: 'white',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backdropFilter: 'blur(10px)'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.3)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🚀 Find My Handyman
          </button>

          <div style={{
            marginTop: '10px',
            textAlign: 'center',
            fontSize: '12px',
            opacity: 0.8
          }}>
            ⚡ Average response: 2 minutes
          </div>
        </>
      ) : (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '1.2rem' }}>🔧</span>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>
            Need Help?
          </span>
        </div>
      )}
    </div>
  );
}

export default StickyCTA;