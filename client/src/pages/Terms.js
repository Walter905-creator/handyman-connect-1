import React from 'react';

const Terms = () => {
  return (
    <div style={{ padding: '6rem 2rem 4rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem', color: '#333' }}>
        📜 Terms of Service (Quick Version)
      </h1>
      
      <div style={{ 
        background: '#f8f9fa', 
        padding: '2rem', 
        borderRadius: '15px', 
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#667eea', marginBottom: '1rem' }}>Simple Terms for Fixlo</h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
          By using Fixlo, you agree to use our platform respectfully and lawfully. 
          We connect homeowners with professionals but aren't responsible for the work performed. 
          All payments are secure through Stripe. Be nice, pay fairly, and we'll all get along great! 
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        
        <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', border: '2px solid #e9ecef' }}>
          <h3 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>🏠 For Homeowners</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li>Use the service to find qualified professionals</li>
            <li>Provide accurate information about your needs</li>
            <li>Pay for completed work as agreed</li>
            <li>Rate and review professionals fairly</li>
            <li>Report any issues promptly</li>
          </ul>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', border: '2px solid #e9ecef' }}>
          <h3 style={{ color: '#4ecdc4', marginBottom: '1rem' }}>🔧 For Professionals</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li>Maintain proper licensing and insurance</li>
            <li>Provide quality service to customers</li>
            <li>Be honest about your capabilities</li>
            <li>Communicate professionally</li>
            <li>Follow safety protocols</li>
          </ul>
        </div>
      </div>

      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white',
        padding: '2rem', 
        borderRadius: '15px', 
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>🛡️ What We Guarantee</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>✅ Background-checked professionals</div>
          <div>✅ Secure payment processing</div>
          <div>✅ 24/7 customer support</div>
          <div>✅ Satisfaction guarantee</div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '2rem', color: '#666' }}>
          Need the full legal version? Check out our comprehensive Terms of Service.
        </p>
        <a href="/terms-of-service" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '12px 25px',
          borderRadius: '25px',
          textDecoration: 'none',
          fontWeight: 'bold',
          display: 'inline-block',
          margin: '0 10px'
        }}>
          📄 Full Terms of Service
        </a>
        <a href="/contact" style={{
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
          color: 'white',
          padding: '12px 25px',
          borderRadius: '25px',
          textDecoration: 'none',
          fontWeight: 'bold',
          display: 'inline-block',
          margin: '0 10px'
        }}>
          💬 Questions?
        </a>
      </div>
    </div>
  );
};

export default Terms;
