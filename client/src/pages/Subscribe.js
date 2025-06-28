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
        // Create timeout controller for better error handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(`${API_URL}${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.url) {
          // Use window.location for better compatibility
          window.location.href = data.url;
          return; // Success, stop trying other endpoints
        } else {
          throw new Error(data.message || 'No checkout URL received');
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.warn(`${endpoint} timed out`);
        } else {
          console.warn(`${endpoint} failed:`, error.message);
        }
        // Continue to next endpoint only if it's not the last one
        if (endpoint === endpoints[endpoints.length - 1]) {
          setError(`Payment system temporarily unavailable: ${error.message}. Please try again in a moment.`);
        }
      }
    }
    
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
