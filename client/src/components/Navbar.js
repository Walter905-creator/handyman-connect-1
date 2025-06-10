import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#333', color: 'white' }}>
      <Link to="/" style={{ marginRight: 20, color: 'white' }}>Home</Link>
      <Link to="/ai" style={{ marginRight: 20, color: 'white' }}>AI Assistant</Link>
      <Link to="/terms" style={{ marginRight: 20, color: 'white' }}>Terms</Link>
      <Link to="/subscribe" style={{ marginRight: 20, color: 'white' }}>Subscribe</Link>
    </nav>
  );
}
