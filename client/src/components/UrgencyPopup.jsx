import { useEffect, useState } from 'react';

export default function UrgencyPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('fixlo_seen_popup');
    if (!seen) {
      const timer = setTimeout(() => {
        setVisible(true);
        localStorage.setItem('fixlo_seen_popup', 'true');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm text-center">
        <h2 className="text-xl font-bold">🚨 2 new job requests in your area!</h2>
        <p className="mt-2 text-gray-700">Join Fixlo Pro to claim jobs before they're gone.</p>
        <a href="/pro-support" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">Claim Jobs</a>
        <button onClick={() => setVisible(false)} className="block mt-3 text-sm text-gray-500 underline">No thanks</button>
      </div>
    </div>
  );
}
