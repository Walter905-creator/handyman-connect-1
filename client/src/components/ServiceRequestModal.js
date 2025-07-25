import React from 'react';

const ServiceRequestModal = ({ service, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownloadApp = () => {
    // This would typically redirect to app store
    alert(`Download the Fixlo app to request ${service.name} service!`);
    onClose();
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
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            {service.emoji}
          </div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem' 
          }}>
            {service.name} Service
          </h2>
          <p style={{ 
            color: '#6b7280', 
            marginBottom: '1.5rem' 
          }}>
            Ready to get your {service.name.toLowerCase()} project started? Download the Fixlo app to connect with verified professionals in your area.
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '0.75rem', 
            justifyContent: 'center' 
          }}>
            <button
              onClick={handleDownloadApp}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '0.5rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1d4ed8';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2563eb';
              }}
            >
              Download App
            </button>
            <button
              onClick={onClose}
              style={{
                backgroundColor: '#d1d5db',
                color: '#374151',
                padding: '0.5rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#9ca3af';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#d1d5db';
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestModal;