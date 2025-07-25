import React from 'react';

export default function ServiceRequestModal({ service, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks! We received your ${service.name} request.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {service.icon} {service.name} Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Describe your issue"
            required
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="text-gray-600 underline">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}