import React from 'react';

const ProSupport = () => {
  return (
    <div style={{ padding: '6rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '1rem', color: '#333' }}>
        👷‍♂️ Professional Support Hub
      </h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '4rem', color: '#666' }}>
        Resources, support, and tools for Fixlo service professionals
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          padding: '2rem', 
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
          <h3>Training Resources</h3>
          <p>Access training materials, best practices, and certification programs to enhance your skills.</p>
          <button style={{ 
            background: 'rgba(255,255,255,0.2)', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '25px', 
            cursor: 'pointer',
            marginTop: '1rem'
          }}>
            Access Training
          </button>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)', 
          color: 'white', 
          padding: '2rem', 
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💼</div>
          <h3>Business Tools</h3>
          <p>Manage your bookings, track earnings, handle invoicing, and grow your business.</p>
          <button style={{ 
            background: 'rgba(255,255,255,0.2)', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '25px', 
            cursor: 'pointer',
            marginTop: '1rem'
          }}>
            Business Dashboard
          </button>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)', 
          color: 'white', 
          padding: '2rem', 
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🆘</div>
          <h3>Pro Support</h3>
          <p>Get priority customer support, technical assistance, and account management help.</p>
          <button style={{ 
            background: 'rgba(255,255,255,0.2)', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '25px', 
            cursor: 'pointer',
            marginTop: '1rem'
          }}>
            Contact Support
          </button>
        </div>
      </div>

      <div style={{ 
        background: '#f8f9fa', 
        padding: '3rem', 
        borderRadius: '15px', 
        marginBottom: '3rem' 
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>📞 Professional Support Contacts</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          
          <div style={{ textAlign: 'center', padding: '1.5rem', background: 'white', borderRadius: '10px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📞</div>
            <h4>Pro Hotline</h4>
            <p><strong>(555) 123-PROS</strong></p>
            <p>24/7 support for working professionals</p>
          </div>

          <div style={{ textAlign: 'center', padding: '1.5rem', background: 'white', borderRadius: '10px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📧</div>
            <h4>Pro Email</h4>
            <p><strong>pros@fixloapp.com</strong></p>
            <p>Priority response within 1 hour</p>
          </div>

          <div style={{ textAlign: 'center', padding: '1.5rem', background: 'white', borderRadius: '10px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</div>
            <h4>Pro Chat</h4>
            <p><strong>In-App Messaging</strong></p>
            <p>Real-time chat with dispatch team</p>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white',
        padding: '3rem', 
        borderRadius: '15px', 
        marginBottom: '3rem'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>🎯 Professional Benefits</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💰</div>
            <h4>Competitive Rates</h4>
            <p>Earn $75-200+ per hour based on your expertise and service type</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📅</div>
            <h4>Flexible Schedule</h4>
            <p>Work when you want, where you want. Full control over your availability</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
            <h4>Fast Payments</h4>
            <p>Get paid within 24 hours of completing jobs through Stripe</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛡️</div>
            <h4>Insurance Coverage</h4>
            <p>Work with confidence knowing you're covered for liability and damages</p>
          </div>
        </div>
      </div>

      <div style={{ 
        background: '#fff3cd', 
        border: '1px solid #ffeaa7',
        padding: '2rem', 
        borderRadius: '15px', 
        marginBottom: '3rem'
      }}>
        <h3 style={{ color: '#856404', marginBottom: '1rem' }}>📋 Getting Started Checklist</h3>
        <div style={{ color: '#856404' }}>
          <p>✅ Complete professional registration</p>
          <p>✅ Pass background check (Checkr)</p>
          <p>✅ Upload licenses and insurance</p>
          <p>✅ Complete skills assessment</p>
          <p>✅ Set up payment information</p>
          <p>✅ Download the Pro app</p>
          <p>✅ Complete first training module</p>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '2rem' }}>Ready to Join Our Team?</h2>
        <a href="/signup" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '50px',
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          display: 'inline-block',
          margin: '0 10px'
        }}>
          👷‍♂️ Sign Up as Pro
        </a>
        <a href="mailto:pros@fixloapp.com" style={{
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '50px',
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          display: 'inline-block',
          margin: '0 10px'
        }}>
          📧 Email Pro Team
        </a>
      </div>
    </div>
  );
};

export default ProSupport;
