import { useEffect, useState } from 'react';

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
        textAlign: 'center', maxWidth: '400px', margin: '20px'
      }}>
        <h2 style={{ margin: '0 0 16px 0', color: '#333' }}>⚠️ Leaving already?</h2>
        <p style={{ margin: '0 0 20px 0', color: '#666' }}>
          Homeowners are waiting. Sign up now and start earning with Fixlo.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a 
            href="/pro-support" 
            style={{
              background: '#2563eb', color: 'white', padding: '12px 24px',
              borderRadius: '6px', textDecoration: 'none', fontSize: '16px',
              fontWeight: '500'
            }}
          >
            🚀 Sign Up & Start Earning
          </a>
          <button 
            onClick={() => setShow(false)} 
            style={{
              background: 'transparent', border: 'none', color: '#666',
              fontSize: '14px', textDecoration: 'underline', cursor: 'pointer'
            }}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
