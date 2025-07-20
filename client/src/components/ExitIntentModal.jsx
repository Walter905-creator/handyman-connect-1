import { useEffect, useState } from 'react';

export default function ExitIntentModal() {
  const [show, setShow] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Trigger when mouse moves to top of screen (exit intent)
      if (e.clientY < 50 && !hasShown) {
        setShow(true);
        setHasShown(true);
      }
    };

    const leaveHandler = (e) => {
      // Also trigger when mouse leaves the document
      if (!e.relatedTarget && !hasShown) {
        setShow(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mousemove', handler);
    document.addEventListener('mouseleave', leaveHandler);
    
    return () => {
      document.removeEventListener('mousemove', handler);
      document.removeEventListener('mouseleave', leaveHandler);
    };
  }, [hasShown]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm text-center">
        <h2 className="text-xl font-bold">⚠️ Leaving already?</h2>
        <p className="mt-2 text-gray-700">Homeowners are waiting. Sign up now and start earning with Fixlo.</p>
        <div className="mt-4 space-y-2">
          <a href="/pro-support" className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            🚀 Sign Up & Start Earning
          </a>
          <button 
            onClick={() => setShow(false)} 
            className="block w-full text-sm text-gray-500 underline hover:text-gray-700"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
