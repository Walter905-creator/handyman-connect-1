import React, { useState } from 'react';

export default function ServiceRequestModal({ service, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [optIn, setOptIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!optIn) {
      alert("Please check the box to receive SMS updates.");
      return;
    }

    // You'd handle the actual submission logic here
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
            <textarea
              placeholder="Describe your project"
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
            <label className="flex items-start space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={optIn}
                onChange={(e) => setOptIn(e.target.checked)}
                className="mt-1"
              />
              <span>
                I agree to receive SMS updates related to job leads, appointments, and service updates.
                Reply STOP to unsubscribe.
              </span>
            </label>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
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