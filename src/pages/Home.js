import React from 'react';
import Header from '../components/Header';

const services = [
  "🚰 Plumbing", "💡 Electrical", "🪚 Carpentry", "🧹 House Cleaning",
  "🗑️ Junk Removal", "🌿 Landscaping", "🏠 Roofing", "❄️ HVAC", "🎨 Painting"
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Connect with Local Service Professionals
          </h1>
          <p className="text-xl mb-8">
            Get matched with trusted professionals for all your home service needs
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <span className="text-2xl">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tell us what you need</h3>
              <p className="text-gray-600">Describe your project and we'll match you with the right professional</p>
            </div>
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get matched</h3>
              <p className="text-gray-600">We connect you with qualified professionals in your area</p>
            </div>
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get it done</h3>
              <p className="text-gray-600">Work with your chosen professional to complete your project</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}