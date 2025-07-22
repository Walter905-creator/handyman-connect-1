import React, { useEffect, useState } from 'react';

export default function ExitIntentModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleMouseLeave = e => {
      if (e.clientY < 20) setShow(true);
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

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
        <h2>Wait! 👋</h2>
        <p>Get your first 3 leads for free when you sign up now!</p>
        <button onClick={() => setShow(false)}>Close</button>
      </div>
    </div>
  );
}
  }, [hasShown]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm text-center">
        <h2 className="text-xl font-bold">⚠️ Leaving already?</h2>
        <p className="mt-2 text-gray-700">Homeowners are waiting. Sign up now and start earning with Fixlo.</p>
        <div className="mt-4 space-y-2">
          <a href="/pro-support" className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            🚀 Sign Up & Start Earning
          </a>
          <button 
            onClick={() => setShow(false)} 
            className="block w-full text-sm text-gray-500 underline hover:text-gray-700"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
