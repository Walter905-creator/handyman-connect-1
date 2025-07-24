import React from 'react';
import Header from '../components/Header';

const services = [
  "🚰 Plumbing", "💡 Electrical", "🪚 Carpentry", "🧹 House Cleaning",
  "🗑️ Junk Removal", "🌿 Landscaping", "🏠 Roofing", "❄️ HVAC", "🎨 Painting"
];

export default function Home() {
  return (
    <div>
      <Header />
      <main className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Select a Service</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {services.map(service => (
            <button
              key={service}
              className="p-4 bg-blue-100 hover:bg-blue-200 rounded-xl text-lg font-medium"
            >
              {service}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}