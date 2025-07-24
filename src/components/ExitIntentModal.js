import React, { useState, useEffect } from 'react';

export default function ExitIntentModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleMouseLeave = e => {
      if (e.clientY < 50) setShow(true);
    };
    document.addEventListener('mouseout', handleMouseLeave);
    return () => document.removeEventListener('mouseout', handleMouseLeave);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">Wait! Don't Miss Out</h2>
        <p className="mb-4">Join Fixlo now and start getting leads today.</p>
        <button onClick={() => setShow(false)} className="bg-blue-600 text-white px-4 py-2 rounded">Join Now</button>
      </div>
    </div>
  );
}