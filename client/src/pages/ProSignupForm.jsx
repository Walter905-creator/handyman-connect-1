import React, { useState } from 'react';

export default function ProSignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    trade: '',
    location: '',
    dob: '',
    optIn: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.optIn) {
      alert("You must agree to receive SMS updates.");
      return;
    }

    // TODO: Send formData to backend
    console.log("📬 Pro application submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold mb-2">✅ Application Received!</h2>
        <p>We'll review your details and get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Join Fixlo as a Pro</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        required
        value={formData.phone}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
      />
      <input
        type="text"
        name="trade"
        placeholder="Type of Trade (e.g., Plumber)"
        required
        value={formData.trade}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
      />
      <input
        type="text"
        name="location"
        placeholder="City, State"
        required
        value={formData.location}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
      />
      <input
        type="date"
        name="dob"
        required
        value={formData.dob}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
      />

      <label className="flex items-start space-x-2 text-sm text-gray-700">
        <input
          type="checkbox"
          name="optIn"
          checked={formData.optIn}
          onChange={handleChange}
          className="mt-1"
        />
        <span>
          I agree to receive SMS updates about job leads and platform updates from Fixlo. Reply STOP to unsubscribe.
        </span>
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        🚀 Submit Application
      </button>
    </form>
  );
}