import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/fixlo-logo.png';

function Header() {
  const navigate = useNavigate();
  return (
    <header style={{
      padding: '1rem',
      background: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div 
          onClick={() => navigate('/')}
          style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer'
        }}>
          <img 
            src={logo} 
            alt="Fixlo Logo" 
            style={{ height: '40px', width: 'auto' }}
          />
          <span style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#667eea'
          }}>
            Fixlo
          </span>
        </div>
        
        <nav>
          <ul style={{
            display: 'flex',
            gap: '30px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            alignItems: 'center'
          }}>
            <li><a href="/" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Home</a></li>
            <li><a href="/contact" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Contact</a></li>
            <li>
              <button 
                onClick={() => navigate('/signup')}
                style={{ 
                  background: '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  padding: '8px 16px', 
                  borderRadius: '20px', 
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Get Started
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
