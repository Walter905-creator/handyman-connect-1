import React from "react";
import api from "../api"; // ✅ CORRECT path from /pages folder

export default function Subscribe() {
  const startSubscription = async () => {
    try {
      const res = await api.post("/api/stripe/create-checkout-session");
      window.location.href = res.data.url;
    } catch (err) {
      alert("Failed to start subscription");
      console.error("Stripe error:", err);
    }
  };

  return (
    <div>
      <h2>Subscribe to Pro Plan</h2>
      <p>Access premium features for $29/month.</p>
      <button onClick={startSubscription}>Subscribe</button>
    </div>
  );
}
