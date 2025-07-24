import React, { useEffect, useState } from 'react';

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 200px
      setVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', 
      top: '50%', 
      right: '20px',
      transform: 'translateY(-50%)',
      background: '#3b82f6',
      color: 'white',
      padding: '16px 20px',
      borderRadius: '50px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 9998,
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }}>
      <a href="/subscribe" style={{
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '14px'
      }}>
        🚀 Join Pro
      </a>
    </div>
  );
}