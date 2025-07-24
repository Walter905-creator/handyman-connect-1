import React, { useEffect, useState } from 'react';

const ExitIntentModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (hasShown) return;

    const handleMouseLeave = (e) => {
      if (e.clientY < 20) {
        setShowModal(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  if (!showModal) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{
        background: '#fff',
        padding: '24px',
        borderRadius: '12px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      }}>
        <h2 style={{ marginBottom: '12px' }}>⚠️ Leaving already?</h2>
        <p>Homeowners are waiting. Sign up now and start earning with Fixlo.</p>
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a
            href="/signup"
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            🚀 Sign Up & Start Earning
          </a>
          <button
            onClick={() => setShowModal(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#555',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentModal;
