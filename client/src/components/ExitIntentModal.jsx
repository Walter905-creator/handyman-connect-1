import React, { useEffect, useState } from 'react';

const ExitIntentModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 50) {
        setShowModal(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClose = () => setShowModal(false);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-4">Wait! Before You Go...</h2>
        <p className="mb-4">Join Fixlo now and get job leads in your area.</p>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          onClick={() => window.location.href = '/signup'}
        >
          Join Now
        </button>
        <button
          className="text-sm text-gray-600 mt-3 block"
          onClick={handleClose}
        >
          No thanks
        </button>
      </div>
    </div>
  );
};

export default ExitIntentModal;
