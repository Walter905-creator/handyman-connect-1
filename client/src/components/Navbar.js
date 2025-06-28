import React from 'react';
import { Link } from 'react-router-dom';
import handymanLogo from '../assets/handyman_logo.png';

export default function Navbar() {
  return (
    <nav style={{ 
      padding: '1rem', 
      background: '#333', 
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Link to="/" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        color: 'white', 
        textDecoration: 'none',
        fontSize: '1.2rem',
        fontWeight: 'bold'
      }}>
        <img 
          src={handymanLogo} 
          alt="Handyman Connect Logo" 
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            marginRight: "0.75rem"
          }}
        />
        Handyman Connect
      </Link>
      
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/terms" style={{ color: 'white', textDecoration: 'none' }}>Terms</Link>
        <Link to="/subscribe" style={{ color: 'white', textDecoration: 'none' }}>Subscribe</Link>
      </div>
    </nav>
  );
}
