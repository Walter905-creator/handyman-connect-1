import React, { useState } from 'react';
import axios from 'axios';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'https://fixloapp.onrender.com';
      
      const response = await axios.post(`${API_URL}/api/subscribe`, { email });

      if (response.data.success) {
        setMessage('Successfully subscribed! Check your email for confirmation.');
        setEmail('');
      }
    } catch (error) {
      setMessage('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '6rem 2rem 4rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#333' }}>
        💳 Professional Subscription
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '3rem', color: '#666' }}>
        Join Fixlo as a verified professional for just $59.99/month and start connecting with homeowners.
      </p>

      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white',
        padding: '3rem', 
        borderRadius: '15px', 
        marginBottom: '3rem'
      }}>
        <h2 style={{ marginBottom: '2rem' }}>What's Included:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>✅ Unlimited job notifications</div>
          <div>✅ Background check included</div>
          <div>✅ Secure payment processing</div>
          <div>✅ Professional profile</div>
          <div>✅ Customer review system</div>
          <div>✅ 24/7 priority support</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email to get started"
            required
            style={{
              padding: '15px 20px',
              borderRadius: '25px',
              border: '2px solid #ddd',
              fontSize: '1rem',
              minWidth: '300px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              minWidth: '150px'
            }}
          >
            {loading ? 'Subscribing...' : 'Subscribe Now'}
          </button>
        </div>
      </form>

      {message && (
        <div style={{
          padding: '1rem',
          borderRadius: '10px',
          backgroundColor: message.includes('Successfully') ? '#d4edda' : '#f8d7da',
          color: message.includes('Successfully') ? '#155724' : '#721c24',
          marginBottom: '2rem'
        }}>
          {message}
        </div>
      )}

      <div style={{ 
        background: '#f8f9fa', 
        padding: '2rem', 
        borderRadius: '15px'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>Ready to Join?</h3>
        <p style={{ marginBottom: '2rem' }}>
          Already have an account? Sign in to manage your subscription and start receiving job notifications.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/signup" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '12px 25px',
            borderRadius: '25px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block'
          }}>
            👷‍♂️ Sign Up as Professional
          </a>
          <a href="/contact" style={{
            background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
            color: 'white',
            padding: '12px 25px',
            borderRadius: '25px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block'
          }}>
            💬 Have Questions?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
