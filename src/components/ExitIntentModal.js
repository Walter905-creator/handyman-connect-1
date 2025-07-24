import React, { useState, useEffect } from 'react';

export default function ExitIntentModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        setShow(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4">Wait! Don't leave yet!</h2>
        <p className="text-gray-600 mb-6">
          Get 20% off your first service when you sign up now!
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => setShow(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Get Discount
          </button>
          <button
            onClick={() => setShow(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}