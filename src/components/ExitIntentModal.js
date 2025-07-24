import React, { useEffect, useState } from 'react';

export default function ExitIntentModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) setShow(true);
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 10000
    }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
        <h3>Wait! Don't Leave Yet</h3>
        <p>Sign up now to start getting jobs near you.</p>
        <a href="/signup">Join Fixlo</a>
      </div>
    </div>
  );
}