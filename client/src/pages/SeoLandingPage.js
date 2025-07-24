// src/pages/SeoLandingPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

export default function SeoLandingPage() {
  const { serviceName, cityName } = useParams();

  const formatText = (text) => {
    return text.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const service = formatText(serviceName);
  const city = formatText(cityName);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{service} in {city}</h1>
      <p>Find trusted {service.toLowerCase()} professionals in {city} today with Fixlo.</p>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Why Choose Fixlo for {service} in {city}?</h2>
        <ul>
          <li>Vetted and trusted professionals</li>
          <li>Quick response times</li>
          <li>Competitive pricing</li>
          <li>Customer satisfaction guaranteed</li>
        </ul>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Get Started Today</h3>
        <p>Ready to connect with {service.toLowerCase()} professionals in {city}?</p>
        <a 
          href="/signup" 
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            marginTop: '10px'
          }}
        >
          Get Started
        </a>
      </div>
    </div>
  );
}