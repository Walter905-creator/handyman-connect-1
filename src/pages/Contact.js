import React from 'react';
import Header from '../components/Header';

export default function Contact() {
  return (
    <div>
      <Header />
      <main className="p-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600">Get in touch with the Fixlo team</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
            <div className="space-y-3">
              <p className="flex items-center">
                <span className="font-semibold">📧 Email:</span>
                <span className="ml-2">support@fixlo.com</span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold">📱 Phone:</span>
                <span className="ml-2">(555) 123-4567</span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold">🕒 Hours:</span>
                <span className="ml-2">Mon-Fri 9AM-6PM EST</span>
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Send Message</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}