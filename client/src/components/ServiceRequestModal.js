import React from 'react';

export default function ServiceRequestModal({ service, onClose }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={handleBackdropClick}
    >
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        maxWidth: '28rem',
        width: '100%',
        margin: '0 1rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        textAlign: 'center',
      }}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem' 
        }}>
          {service.name} Service
        </h2>
        <p style={{ 
          marginBottom: '1rem' 
        }}>
          Sign up now to claim jobs in your area and start earning with Fixlo.
        </p>
        
        <a
          href="/signup"
          style={{
            display: 'inline-block',
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.5rem 1.5rem',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            marginBottom: '1rem',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#1d4ed8';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#2563eb';
          }}
        >
          🚀 Sign Up & Start Earning
        </a>
        
        <button
          onClick={onClose}
          style={{
            display: 'block',
            margin: '0 auto',
            marginTop: '1rem',
            fontSize: '0.875rem',
            color: '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          onMouseEnter={(e) => {
            e.target.style.textDecoration = 'underline';
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}