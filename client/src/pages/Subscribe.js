import React, { useState } from "react";

export default function Subscribe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const API_URL = process.env.REACT_APP_API_URL || 'https://handyman-connect-1-1.onrender.com';
    
    // Try subscription first, then fallback to simple payment
    const endpoints = [
      '/api/stripe/create-checkout-session',
      '/api/stripe/create-payment-session'
    ];
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Trying ${endpoint}...`);
        const response = await fetch(`${API_URL}${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });
        
        const data = await response.json();
        
        if (response.ok && data.url) {
          console.log('Redirecting to Stripe checkout...');
          window.location.href = data.url;
          return; // Success, stop trying other endpoints
        } else {
          console.warn(`${endpoint} failed:`, data.message);
          // Continue to next endpoint
        }
      } catch (error) {
        console.warn(`${endpoint} error:`, error.message);
        // Continue to next endpoint
      }
    }
    
    // If we get here, all endpoints failed
    setError('Unable to create payment session. Please contact support.');
    setLoading(false);
  };

  return (
    <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Join Handyman Connect as a Pro
      </h2>
      <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
        Access premium features and connect with clients. 
        <br />
        Monthly subscription: <strong>$29/month</strong>
      </p>

      {error && (
        <div style={{ 
          backgroundColor: "#f8d7da", 
          color: "#721c24", 
          padding: "1rem", 
          borderRadius: "8px", 
          marginBottom: "2rem",
          border: "1px solid #f5c6cb"
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubscribe}>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#6c757d" : "#1f6feb",
            color: "white",
            padding: "1rem 2rem",
            fontSize: "1rem",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Creating checkout..." : "Join Now"}
        </button>
      </form>

      <p style={{ fontSize: "0.9rem", color: "#6c757d", marginTop: "2rem" }}>
        You'll be redirected to Stripe for secure payment processing.
      </p>
    </section>
  );
}
