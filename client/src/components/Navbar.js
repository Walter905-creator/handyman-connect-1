import React from 'react';
import { Link } from 'react-router-dom';
import fixloLogo from '../assets/fixlo-logo.svg';

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
          src={fixloLogo} 
          alt="Fixlo Logo" 
          style={{
            height: "40px",
            width: "auto",
            marginRight: "0.75rem"
          }}
        />
        Fixlo
      </Link>
      
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/eureka" style={{ color: 'white', textDecoration: 'none' }}>💡 Eureka</Link>
        <Link to="/how-it-works" style={{ color: 'white', textDecoration: 'none' }}>How It Works</Link>
        <Link to="/pricing" style={{ color: 'white', textDecoration: 'none' }}>Pricing</Link>
        <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Sign Up</Link>
        <Link to="/download" style={{ color: 'white', textDecoration: 'none' }}>Download App</Link>
        <Link to="/support" style={{ color: 'white', textDecoration: 'none' }}>Support</Link>
      </div>
    </nav>
  );
}
