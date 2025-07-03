import React, { useState } from "react";
import axios from "axios";

export default function Subscribe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/stripe/create-checkout-session`
      );
      window.location.href = response.data.url;
    } catch (err) {
      console.error("❌ Stripe checkout error:", err);
      setError("Something went wrong with payment setup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <section
        style={{
          background: "#0f172a",
          color: "white",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Subscribe to Fixlo Pro
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#94a3b8" }}>
          Get unlimited access to professional handyman services
        </p>
      </section>

      {/* Subscription Plans */}
      <section style={{ padding: "4rem 2rem", background: "#f8fafc" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "3rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
              Pro Membership
            </h2>
            <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#3b82f6", marginBottom: "1rem" }}>
              $59.99/month
            </div>
            <p style={{ color: "#64748b", marginBottom: "2rem" }}>
              Unlimited access to our network of professional handymen
            </p>

            <ul style={{ textAlign: "left", marginBottom: "2rem", padding: "0 2rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>✅ 24/7 Service Availability</li>
              <li style={{ marginBottom: "0.5rem" }}>✅ Verified Professional Network</li>
              <li style={{ marginBottom: "0.5rem" }}>✅ Priority Booking</li>
              <li style={{ marginBottom: "0.5rem" }}>✅ Quality Guarantee</li>
              <li style={{ marginBottom: "0.5rem" }}>✅ Mobile App Access</li>
            </ul>

            {error && (
              <div
                style={{
                  color: "#dc2626",
                  background: "#fef2f2",
                  padding: "1rem",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              >
                {error}
              </div>
            )}

            <button
              onClick={handleSubscribe}
              disabled={loading}
              style={{
                background: loading ? "#9ca3af" : "#3b82f6",
                color: "white",
                padding: "1rem 2rem",
                fontSize: "1.1rem",
                fontWeight: "bold",
                border: "none",
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.3s ease",
              }}
            >
              {loading ? "Processing..." : "Subscribe Now"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
