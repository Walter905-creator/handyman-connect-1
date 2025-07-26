import React, { useEffect } from "react";

const PaymentSuccess = () => {
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-XXXXXXXXXX/abc123xyz456',
        value: 59.99,
        currency: 'USD',
      });
    }
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">✅ Payment Successful!</h1>
      <p>Thank you for subscribing to Fixlo Pro. You're now receiving job leads!</p>
    </div>
  );
};

export default PaymentSuccess;