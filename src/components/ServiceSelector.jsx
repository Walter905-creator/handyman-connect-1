import React, { useState } from 'react';
import ServiceRequestModal from './ServiceRequestModal';

const services = [
  { icon: "🚰", name: "Plumbing" },
  { icon: "💡", name: "Electrical" },
  { icon: "🪚", name: "Carpentry" },
  { icon: "🧹", name: "House Cleaning" },
  { icon: "🗑️", name: "Junk Removal" },
  { icon: "🌿", name: "Landscaping" },
  { icon: "🏠", name: "Roofing" },
  { icon: "❄️", name: "HVAC" },
  { icon: "🎨", name: "Painting" }
];

export default function ServiceSelector() {
  const [selectedService, setSelectedService] = useState(null);

  const handleSelect = (service) => {
    setSelectedService(service);
  };

  const handleClose = () => setSelectedService(null);

  return (
    <div>
      <div className="service-buttons">
        {services.map(service => (
          <button
            key={service.name}
            onClick={() => handleSelect(service)}
          >
            <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>{service.icon}</span>
            {service.name}
          </button>
        ))}
      </div>

      {selectedService && (
        <ServiceRequestModal
          service={selectedService}
          onClose={handleClose}
        />
      )}
    </div>
  );
}