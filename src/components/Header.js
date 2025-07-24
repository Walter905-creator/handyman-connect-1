import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-50 shadow-md">
      <img src="/fixlo-logo.png" alt="Fixlo" className="h-10" />
      <nav className="space-x-4">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <Link to="/subscribe" className="text-blue-600 hover:underline">Subscribe</Link>
        <Link to="/contact" className="text-blue-600 hover:underline">Contact</Link>
      </nav>
    </header>
  );
}
