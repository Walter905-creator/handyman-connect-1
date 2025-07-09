import React from 'react';

const DownloadApp = () => {
  const handleDownload = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      alert('Fixlo App Coming Soon!\n\nWe\'re launching on iOS App Store and Google Play Store.\n\nFor now, you can request services through our website.');
    } else {
      alert('Fixlo is Mobile-First!\n\nScan QR code with your phone or visit fixloapp.com on mobile to get started.\n\nApp launching soon on App Store and Google Play!');
    }
  };

  return (
    <div style={{ 
      padding: '6rem 2rem 4rem', 
      textAlign: 'center', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>📱 Download the Fixlo App</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
        The Fixlo app is coming soon to the App Store and Google Play Store.
      </p>
      
      <div style={{ marginBottom: '4rem' }}>
        <button 
          onClick={handleDownload}
          style={{
            background: '#ff6b6b',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            fontSize: '1.2rem',
            borderRadius: '50px',
            cursor: 'pointer',
            margin: '10px'
          }}
        >
          📱 Get Mobile App
        </button>
      </div>

      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        padding: '3rem', 
        borderRadius: '15px', 
        maxWidth: '800px', 
        margin: '0 auto',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ marginBottom: '2rem' }}>Features Coming Soon:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>📍 GPS Location Matching</div>
          <div>💬 Real-time Chat</div>
          <div>📸 Photo Upload</div>
          <div>⭐ Review System</div>
          <div>💳 In-app Payments</div>
          <div>📅 Scheduling Tools</div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
