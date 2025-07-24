import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          textDecoration: 'none',
          color: '#333'
        }}>
          <img 
            src="/assets/fixlo-logo.png" 
            alt="Fixlo Logo" 
            className="logo"
          />
          <span style={{ 
            marginLeft: '0.75rem', 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            color: '#3b82f6'
          }}>
            Fixlo
          </span>
        </div>
        
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="#" className="cta-button">Join as Pro</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;