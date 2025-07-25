import React, { useState } from 'react';

export default function ServiceRequestModal({ service, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  if (!service) return null; // Safety check

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl">
        <h2 className="text-xl font-bold mb-4">Request {service.name}</h2>

        {submitted ? (
          <p className="text-green-600 text-center">
            ✅ Thanks! We received your {service.name} request.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="tel"
              placeholder="Your Phone Number"
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Request {service.name}
            </button>
          </form>
        )}

        <button
          onClick={onClose}
          className="text-sm text-gray-600 mt-4 block mx-auto"
        >
          Close
        </button>
      </div>
    </div>
  );
}
