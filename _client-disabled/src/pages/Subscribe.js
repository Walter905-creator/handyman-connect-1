// client/src/pages/Subscribe.js
import React, { useState } from "react";
import axios from "axios";

export default function Subscribe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubscribe = async () => {
    setLoading(true);
    setError("");
    console.log('🔗 Using API URL:', API_URL);

    try {
      const response = await axios.post(
        `${API_URL}/api/stripe/create-checkout-session`
      );
      window.location.href = response.data.url;
    } catch (err) {
      console.error("❌ Stripe checkout error:", err);
      console.error("❌ Attempted URL:", `${API_URL}/api/stripe/create-checkout-session`);
      setError("Something went wrong with payment setup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: "4rem 2rem", textAlign: "center", fontFamily: "Inter, sans-serif" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Join Fixlo as a Pro</h2>
      <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
        Get unlimited leads and access to exclusive pro tools.
      </p>

      <h3 style={{ marginBottom: "1rem" }}>Pricing:</h3>
      <p style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "2rem" }}>
        $59.99/month - Unlimited Leads
      </p>

      {error && (
        <div style={{
          backgroundColor: "#f8d7da",
          color: "#721c24",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1rem",
          border: "1px solid #f5c6cb"
        }}>
          {error}
        </div>
      )}

      <button
        onClick={handleSubscribe}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#6c757d" : "#1f6feb",
          color: "white",
          padding: "1rem 2rem",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "1rem"
        }}
      >
        {loading ? "Processing..." : "Join Now"}
      </button>

      <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#6c757d" }}>
        You'll be redirected to Stripe for secure payment.
      </p>
    </section>
  );
}
