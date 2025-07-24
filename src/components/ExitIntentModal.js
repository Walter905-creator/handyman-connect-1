import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseLeave = (e) => {
      // Only trigger if mouse leaves from the top of the window
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // Add event listener for mouse leave
    document.addEventListener('mouseleave', handleMouseLeave);

    // Also show modal after 30 seconds if not shown yet
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, 30000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleGetStarted = () => {
    navigate('/signup');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
      animation: 'fadeIn 0.3s ease-in-out'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '500px',
        width: '90%',
        position: 'relative',
        boxShadow: '0 25px 75px rgba(0,0,0,0.3)',
        textAlign: 'center',
        animation: 'slideIn 0.3s ease-out'
      }}>
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#999',
            padding: '5px',
            lineHeight: 1
          }}
        >
          ×
        </button>

        {/* Modal content */}
        <div style={{
          marginBottom: '30px'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '20px'
          }}>
            🛠️
          </div>
          
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '15px',
            color: '#333',
            fontWeight: '700'
          }}>
            Wait! Don't Leave Yet
          </h2>
          
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            lineHeight: '1.6',
            marginBottom: '25px'
          }}>
            Join thousands of homeowners who found their perfect handyman through Fixlo. 
            Get started today and experience the difference!
          </p>

          <div style={{
            background: '#f8f9fa',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '25px'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              marginBottom: '15px',
              color: '#333'
            }}>
              🎁 Special Offer for New Users
            </h3>
            <p style={{
              color: '#28a745',
              fontWeight: '600',
              fontSize: '1.1rem',
              margin: 0
            }}>
              First job request is FREE!
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleGetStarted}
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #28a745, #20c997)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
            }}
          >
            🚀 Get Started Now
          </button>
          
          <button
            onClick={handleClose}
            style={{
              padding: '15px 30px',
              background: 'transparent',
              color: '#6c757d',
              border: '2px solid #e9ecef',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Maybe Later
          </button>
        </div>

        {/* Trust indicators */}
        <div style={{
          marginTop: '25px',
          padding: '15px',
          borderTop: '1px solid #e9ecef',
          fontSize: '14px',
          color: '#6c757d'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <span>⭐ 4.9/5 Rating</span>
            <span>🔒 Secure & Safe</span>
            <span>⚡ Instant Matching</span>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideIn {
            from { 
              transform: translateY(-50px);
              opacity: 0;
            }
            to { 
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default ExitIntentModal;