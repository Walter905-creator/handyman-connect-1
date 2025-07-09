import React from 'react';

const Pricing = () => {
  return (
    <div style={{ padding: '6rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '1rem', color: '#333' }}>
        💰 Transparent Pricing
      </h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '4rem', color: '#666' }}>
        No hidden fees. Pay only for quality work completed to your satisfaction.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)', 
          color: 'white', 
          padding: '2rem', 
          borderRadius: '15px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔧</div>
          <h3>Basic Handyman</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>$75-125</div>
          <p style={{ marginBottom: '1.5rem' }}>Per hour</p>
          <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
            <li>✅ Small repairs</li>
            <li>✅ Furniture assembly</li>
            <li>✅ Picture hanging</li>
            <li>✅ Basic maintenance</li>
            <li>✅ 1-year guarantee</li>
          </ul>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          padding: '2rem', 
          borderRadius: '15px',
          textAlign: 'center',
          position: 'relative',
          border: '3px solid #ffd700'
        }}>
          <div style={{ 
            position: 'absolute', 
            top: '-10px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            background: '#ffd700', 
            color: '#333', 
            padding: '5px 15px', 
            borderRadius: '15px',
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}>
            MOST POPULAR
          </div>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
          <h3>Specialized Services</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>$125-200</div>
          <p style={{ marginBottom: '1.5rem' }}>Per hour</p>
          <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
            <li>✅ Plumbing repairs</li>
            <li>✅ Electrical work</li>
            <li>✅ HVAC maintenance</li>
            <li>✅ Appliance installation</li>
            <li>✅ 2-year guarantee</li>
          </ul>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)', 
          color: 'white', 
          padding: '2rem', 
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
          <h3>Project-Based</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>Custom</div>
          <p style={{ marginBottom: '1.5rem' }}>Fixed price quotes</p>
          <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
            <li>✅ Kitchen renovations</li>
            <li>✅ Bathroom remodels</li>
            <li>✅ Landscaping projects</li>
            <li>✅ Large installations</li>
            <li>✅ 5-year guarantee</li>
          </ul>
        </div>
      </div>

      <div style={{ 
        background: '#f8f9fa', 
        padding: '3rem', 
        borderRadius: '15px', 
        marginBottom: '3rem' 
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>💡 How Pricing Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📋</div>
            <h4>1. Get Quote</h4>
            <p>Receive transparent pricing upfront based on your specific needs and location.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔒</div>
            <h4>2. Work Completion</h4>
            <p>Payment is held securely until work is completed to your satisfaction.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💳</div>
            <h4>3. Secure Payment</h4>
            <p>Pay securely through Stripe with all major credit cards and payment methods.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛡️</div>
            <h4>4. Satisfaction Guarantee</h4>
            <p>Not happy? We'll make it right or provide a full refund within 24 hours.</p>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white',
        padding: '3rem', 
        borderRadius: '15px', 
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>🎯 What's Included in Every Service?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          <div>✅ Background-checked professionals</div>
          <div>✅ Fully insured and licensed</div>
          <div>✅ Quality guarantee</div>
          <div>✅ 24/7 customer support</div>
          <div>✅ Secure payment processing</div>
          <div>✅ No hidden fees</div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '2rem' }}>Ready to Get Your Quote?</h2>
        <a href="/signup" style={{
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
          📝 Get Free Quote
        </a>
        <a href="/contact" style={{
          background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '50px',
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          display: 'inline-block',
          margin: '0 10px'
        }}>
          💬 Ask Questions
        </a>
      </div>
    </div>
  );
};

export default Pricing;
