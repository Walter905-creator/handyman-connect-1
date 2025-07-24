
import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <header style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <img src="/assets/fixlo-logo.png" alt="Fixlo Logo" style={{ height: '80px' }} />
        <h1>Welcome to Fixlo</h1>
        <p>Your one-stop hub for home projects</p>
      </header>

      <section style={{ padding: '2rem' }}>
        <h2>Select a Service</h2>
        <ul>
          <li>🚰 Plumbing</li>
          <li>💡 Electrical</li>
          <li>🪚 Carpentry</li>
          <li>🧹 House Cleaning</li>
          <li>🗑️ Junk Removal</li>
          <li>🌿 Landscaping</li>
          <li>🏠 Roofing</li>
        </ul>
      </section>

      <footer style={{ padding: '2rem', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} Fixlo. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
