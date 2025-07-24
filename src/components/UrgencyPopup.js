import React, { useEffect, useState } from 'react';

export default function UrgencyPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '20%', right: '20px',
      backgroundColor: '#222', color: 'white', padding: '1rem',
      borderRadius: '6px', zIndex: 10000
    }}>
      ⚡ 3 homeowners are looking for help in your area now!
    </div>
  );
}