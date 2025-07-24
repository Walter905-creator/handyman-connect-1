import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div style={{ 
      minHeight: '80vh', 
      padding: '4rem 2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        color: '#0f172a'
      }}>
        Contact Us
      </h1>
      
      <div style={{
        background: '#f8fafc',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#0f172a', marginBottom: '1rem' }}>
          Get in Touch
        </h2>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>
          Have questions about Fixlo? We're here to help!
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link to="/subscribe" style={{
            display: 'inline-block',
            background: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            Join as Professional
          </Link>
          
          <a href="mailto:support@fixloapp.com" style={{
            display: 'inline-block',
            background: 'white',
            color: '#3b82f6',
            border: '2px solid #3b82f6',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            Email Support
          </a>
        </div>
      </div>
    </div>
  );
}