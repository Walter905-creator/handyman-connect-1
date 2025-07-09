import React from 'react';

const HowItWorks = () => {
  return (
    <div style={{ padding: '6rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '3rem', color: '#333' }}>
        🔧 How Fixlo Works
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          padding: '2rem', 
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
          <h3>1. Request Service</h3>
          <p>Describe your home repair or improvement need. Upload photos and specify your location.</p>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)', 
          color: 'white', 
          padding: '2rem', 
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👷</div>
          <h3>2. Get Matched</h3>
          <p>We connect you with verified, background-checked professionals in your area within minutes.</p>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)', 
          color: 'white', 
          padding: '2rem', 
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h3>3. Get It Done</h3>
          <p>Your professional arrives on time, completes the work, and you pay securely through the app.</p>
        </div>
      </div>

      <div style={{ 
        background: '#f8f9fa', 
        padding: '3rem', 
        borderRadius: '15px', 
        marginBottom: '3rem' 
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>🔐 Why Choose Fixlo?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div>
            <h4>🛡️ Background Checked</h4>
            <p>All professionals are verified through Checkr for your safety and peace of mind.</p>
          </div>
          <div>
            <h4>⚡ Fast Response</h4>
            <p>Get matched with available professionals in your area within minutes, not days.</p>
          </div>
          <div>
            <h4>💰 Fair Pricing</h4>
            <p>Transparent pricing with no hidden fees. Pay securely through Stripe integration.</p>
          </div>
          <div>
            <h4>⭐ Quality Guaranteed</h4>
            <p>Read reviews, rate services, and enjoy our satisfaction guarantee.</p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '2rem' }}>Ready to Get Started?</h2>
        <a href="/signup" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '50px',
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          display: 'inline-block'
        }}>
          🚀 Start Your Project
        </a>
      </div>
    </div>
  );
};

export default HowItWorks;
