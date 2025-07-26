// client/src/pages/PaymentSuccess.jsx
import React, { useEffect } from 'react';

const PaymentSuccess = () => {
  useEffect(() => {
    // ✅ Google Ads Purchase Conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-XXXXXXXXX/XXXXXXXXXXX', // 🔁 Replace with your actual Google Ads conversion ID/label
        value: 59.99,
        currency: 'USD',
      });
    }
  }, []);

  return (
    <div className="text-center py-12 px-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful</h1>
      <p className="text-lg">Thanks for subscribing to Fixlo Pro. You're officially connected to new job leads.</p>
    </div>
  );
};

export default PaymentSuccess;