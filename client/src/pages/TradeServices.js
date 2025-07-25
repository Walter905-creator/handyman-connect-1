import React, { useState } from 'react';
import ServiceRequestModal from '../components/ServiceRequestModal';

const services = [
  { name: 'Plumbing', emoji: '🚰' },
  { name: 'Electrical', emoji: '💡' },
  { name: 'Carpentry', emoji: '🪚' },
  { name: 'Painting', emoji: '🎨' },
  { name: 'HVAC', emoji: '❄️' },
  { name: 'Roofing', emoji: '🏠' },
  { name: 'House Cleaning', emoji: '🧹' },
  { name: 'Junk Removal', emoji: '🗑️' },
  { name: 'Landscaping', emoji: '🌿' },
];

export default function TradeServices() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div style={{ padding: '1.5rem' }}>
      <h1 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        marginBottom: '1rem', 
        textAlign: 'center' 
      }}>
        What service do you need?
      </h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '1rem' 
      }}>
        {services.map((service) => (
          <button
            key={service.name}
            onClick={() => setSelectedService(service)}
            style={{
              border: '1px solid #d1d5db',
              padding: '1rem',
              borderRadius: '0.5rem',
              textAlign: 'center',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#dbeafe';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
            }}
          >
            <div style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>
              {service.emoji}
            </div>
            <div style={{ fontWeight: '500' }}>{service.name}</div>
          </button>
        ))}
      </div>

      {selectedService && (
        <ServiceRequestModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}