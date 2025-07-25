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

  const openModal = (service) => setSelectedService(service);
  const closeModal = () => setSelectedService(null);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {services.map(service => (
          <button
            key={service.name}
            onClick={() => openModal(service)}
            className="border border-gray-300 p-4 rounded-lg text-center hover:bg-blue-100 transition"
          >
            <div className="text-3xl mb-2">{service.icon}</div>
            <div>{service.name}</div>
          </button>
        ))}
      </div>

      {selectedService && (
        <ServiceRequestModal
          service={selectedService}
          onClose={closeModal}
        />
      )}
    </div>
  );
}