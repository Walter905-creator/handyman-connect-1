import React, { useEffect, useState } from 'react';

export default function JoinNowModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show modal after 10 seconds of inactivity
    const timer = setTimeout(() => setShow(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}>
      <div style={{
        background: 'white', padding: '32px', borderRadius: '16px',
        textAlign: 'center', maxWidth: '500px', position: 'relative'
      }}>
        <button 
          onClick={() => setShow(false)}
          style={{
            position: 'absolute', top: '10px', right: '15px',
            background: 'none', border: 'none', fontSize: '24px',
            cursor: 'pointer', color: '#999'
          }}
        >
          ×
        </button>
        
        <h2 style={{ color: '#0f172a', marginBottom: '16px' }}>
          🎯 Join 5,000+ Professionals
        </h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>
          Start earning with verified leads in your area. Background checks included.
        </p>
        
        <div style={{
          display: 'flex', gap: '12px', justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a href="/subscribe" style={{
            display: 'inline-block', background: '#3b82f6', color: 'white',
            padding: '12px 24px', borderRadius: '8px', textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            Join Now - Free Trial
          </a>
          <button 
            onClick={() => setShow(false)}
            style={{
              background: 'transparent', border: '1px solid #d1d5db',
              color: '#6b7280', padding: '12px 24px', borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
}