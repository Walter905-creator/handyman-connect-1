import React from 'react';

export default function StickyCTA() {
  return (
    <div style={{
      position: 'fixed', bottom: '10px', left: '0', right: '0',
      backgroundColor: '#1e90ff', color: 'white', textAlign: 'center',
      padding: '1rem', zIndex: 9999
    }}>
      🚨 Get Leads Now – <a href="/signup" style={{ color: '#fff', textDecoration: 'underline' }}>Join Fixlo</a>
    </div>
  );
}