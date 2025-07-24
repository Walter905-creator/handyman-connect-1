import React, { useEffect, useState } from 'react';

export default function ExitIntentModal() {
  const [show, setShow] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (hasShown) return;

    const handleMouseLeave = e => {
      if (e.clientY < 20 && !hasShown) {
        setShow(true);
        setHasShown(true);
      }
    };
    
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}>
      <div style={{
        background: 'white', padding: '24px', borderRadius: '12px',
        textAlign: 'center', maxWidth: '400px'
      }}>
        <h2>⚠️ Leaving already?</h2>
        <p>Homeowners are waiting. Sign up now and start earning with Fixlo.</p>
        <div style={{ marginTop: '16px' }}>
          <a 
            href="/signup" 
            style={{
              display: 'inline-block', background: '#007bff', color: 'white',
              padding: '12px 24px', borderRadius: '8px', textDecoration: 'none',
              marginRight: '8px'
            }}
          >
            🚀 Sign Up & Start Earning
          </a>
          <button 
            onClick={() => setShow(false)}
            style={{
              background: 'none', border: 'none', color: '#666',
              textDecoration: 'underline', cursor: 'pointer'
            }}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}