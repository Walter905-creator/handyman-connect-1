import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-50 shadow-md">
      <Link to="/" className="text-2xl font-bold text-blue-700">
        Fixlo
      </Link>
      <nav className="flex space-x-6">
        <Link to="/" className="text-gray-700 hover:text-blue-700">Home</Link>
        <Link to="/subscribe" className="text-gray-700 hover:text-blue-700">Subscribe</Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-700">Contact</Link>
      </nav>
    </header>
  );
}
