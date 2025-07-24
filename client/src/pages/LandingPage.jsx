// src/pages/LandingPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const capitalize = (str) =>
  str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const LandingPage = () => {
  const { service, city } = useParams();
  const formattedService = capitalize(service);
  const formattedCity = capitalize(city);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>
        {formattedService} in {formattedCity}
      </h1>
      <p>
        Looking for trusted <strong>{formattedService}</strong> pros in{' '}
        <strong>{formattedCity}</strong>? Fixlo connects you instantly with licensed,
        background-checked professionals near you.
      </p>
      <ul>
        <li>✔️ Licensed and insured contractors</li>
        <li>📍 Local to the {formattedCity} area</li>
        <li>💬 Free estimates — no obligations</li>
        <li>📅 Same-day availability</li>
      </ul>
      <a
        href="/signup"
        style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '1rem 2rem',
          backgroundColor: '#2ecc71',
          color: '#fff',
          borderRadius: '6px',
          textDecoration: 'none',
        }}
      >
        Get Started Now →
      </a>
    </div>
  );
};

export default LandingPage;