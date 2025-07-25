import React from 'react';

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
  maxWidth: '400px',
  width: '90%',
  maxHeight: '90vh',
  overflow: 'auto'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
};

const inputStyle = {
  width: '100%',
  border: '1px solid #d1d5db',
  padding: '8px 12px',
  borderRadius: '4px',
  fontSize: '14px'
};

const buttonRowStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  marginTop: '8px'
};

const cancelButtonStyle = {
  color: '#6b7280',
  textDecoration: 'underline',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '8px 12px'
};

const submitButtonStyle = {
  backgroundColor: '#2563eb',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px'
};

export default function ServiceRequestModal({ service, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit logic
    alert(`Requested ${service.name}`);
    onClose();
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
          {service.icon} {service.name} Request
        </h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            placeholder="Your Name"
            required
            style={inputStyle}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            style={inputStyle}
          />
          <textarea
            placeholder="Describe your issue"
            required
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
          />
          <div style={buttonRowStyle}>
            <button
              type="button"
              onClick={onClose}
              style={cancelButtonStyle}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={submitButtonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}