import React from 'react';
import Header from '../components/Header';

export default function Subscribe() {
  return (
    <div>
      <Header />
      <main className="p-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Subscribe to Fixlo Pro</h1>
          <div className="bg-blue-50 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">🚀 Professional Plan</h2>
            <p className="text-4xl font-bold mb-4">$59.99<span className="text-lg font-normal">/month</span></p>
            <ul className="text-left mb-6 space-y-2">
              <li className="flex items-center">✅ Unlimited job leads</li>
              <li className="flex items-center">✅ Direct customer contact</li>
              <li className="flex items-center">✅ Featured profile listing</li>
              <li className="flex items-center">✅ 24/7 customer support</li>
            </ul>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700">
              Start Getting Jobs Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}