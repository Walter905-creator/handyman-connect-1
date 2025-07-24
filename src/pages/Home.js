import React from 'react';

export default function Home() {
  const handleServiceClick = (service) => {
    alert(`Request submitted for ${service}`);
  };

  const services = [
    "Plumbing", "Electrical", "Carpentry", "Painting",
    "HVAC", "Roofing", "Landscaping", "House Cleaning", "Junk Removal"
  ];

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to Fixlo</h1>
      <p>Your one-stop hub for trusted pros</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        {services.map((service, i) => (
          <button key={i} onClick={() => handleServiceClick(service)}
            style={{ padding: '1rem', fontSize: '1rem', cursor: 'pointer' }}>
            {service}
          </button>
        ))}
      </div>
    </div>
  );
}