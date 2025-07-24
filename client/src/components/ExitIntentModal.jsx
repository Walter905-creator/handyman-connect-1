import React, { useEffect, useState } from 'react';

const ExitIntentModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (hasShown) return;

    const handleMouseLeave = (e) => {
      if (e.clientY < 20) {
        setShowModal(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => setShowModal(false);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-4">⚠️ Leaving already?</h2>
        <p className="mb-4">Homeowners are waiting. Sign up now and start earning with Fixlo.</p>
        <a
          href="/signup"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 inline-block"
        >
          🚀 Sign Up & Start Earning
        </a>
        <button
          className="text-sm text-gray-600 mt-3 block"
          onClick={handleClose}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
};

export default ExitIntentModal;
