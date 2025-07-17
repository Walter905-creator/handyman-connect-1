import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Eureka() {
  const [problem, setProblem] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [discovery, setDiscovery] = useState(null);
  const [error, setError] = useState(null);

  const handleDiscovery = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDiscovery(null);

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'https://fixloapp.onrender.com';
      const response = await axios.post(`${API_URL}/api/ai/eureka`, {
        problem,
        location,
        budget
      });

      if (response.data.success) {
        setDiscovery(response.data.discovery);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze your problem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          💡 Eureka Discovery
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Describe your home problem and discover the perfect solution with AI-powered recommendations
        </p>
      </section>

      {/* Discovery Form */}
      <section style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "1.5rem", color: "#1f2937", fontSize: "1.8rem" }}>
            Tell us about your home issue
          </h2>
          
          <form onSubmit={handleDiscovery}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                What's the problem? *
              </label>
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Describe your home issue in detail... (e.g., 'My kitchen faucet is leaking water constantly')"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  minHeight: "120px",
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Location (City, State)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Austin, TX"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Estimated Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              >
                <option value="">Select budget range</option>
                <option value="100">Under $100</option>
                <option value="500">$100 - $500</option>
                <option value="1000">$500 - $1,000</option>
                <option value="2000">$1,000 - $2,000</option>
                <option value="5000">$2,000+</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || !problem.trim()}
              style={{
                width: "100%",
                padding: "1rem",
                backgroundColor: loading ? "#9ca3af" : "#667eea",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {loading ? "🔍 Analyzing..." : "🚀 Discover Solutions"}
            </button>
          </form>

          {error && (
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                color: "#dc2626",
              }}
            >
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Discovery Results */}
      {discovery && (
        <section style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              border: "2px solid #10b981",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "2rem",
                padding: "1rem",
                backgroundColor: "#f0fdf4",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ color: "#059669", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                {discovery.eurekaInsight}
              </h3>
              <p style={{ color: "#065f46" }}>{discovery.analysis}</p>
            </div>

            <h3 style={{ marginBottom: "1rem", color: "#1f2937" }}>
              🎯 Recommended Professionals
            </h3>
            
            {discovery.recommendations.map((rec, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "1.5rem",
                  padding: "1rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  backgroundColor: "#f9fafb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h4 style={{ color: "#1f2937", fontSize: "1.2rem" }}>{rec.type}</h4>
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      backgroundColor: rec.urgency === 'High' ? '#fef2f2' : rec.urgency === 'Medium' ? '#fffbeb' : '#f0f9ff',
                      color: rec.urgency === 'High' ? '#dc2626' : rec.urgency === 'Medium' ? '#d97706' : '#2563eb',
                    }}
                  >
                    {rec.urgency} Priority
                  </span>
                </div>
                <p style={{ marginBottom: "0.5rem", color: "#6b7280" }}>{rec.description}</p>
                <p style={{ marginBottom: "1rem", fontWeight: "600", color: "#059669" }}>
                  Estimated Cost: {rec.estimatedCost}
                </p>
                <div>
                  <h5 style={{ marginBottom: "0.5rem", color: "#374151" }}>Recommended Steps:</h5>
                  <ul style={{ paddingLeft: "1.5rem", color: "#6b7280" }}>
                    {rec.steps.map((step, stepIndex) => (
                      <li key={stepIndex} style={{ marginBottom: "0.25rem" }}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <div
              style={{
                marginTop: "2rem",
                padding: "1rem",
                backgroundColor: "#eff6ff",
                borderRadius: "8px",
              }}
            >
              <h4 style={{ marginBottom: "0.5rem", color: "#1e40af" }}>Next Steps</h4>
              <ul style={{ paddingLeft: "1.5rem", color: "#1e40af" }}>
                {discovery.nextSteps.map((step, index) => (
                  <li key={index} style={{ marginBottom: "0.25rem" }}>{step}</li>
                ))}
              </ul>
            </div>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Link to="/signup">
                <button
                  style={{
                    padding: "1rem 2rem",
                    backgroundColor: "#059669",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginRight: "1rem",
                  }}
                >
                  Connect with Pros
                </button>
              </Link>
              <button
                onClick={() => {
                  setProblem("");
                  setLocation("");
                  setBudget("");
                  setDiscovery(null);
                  setError(null);
                }}
                style={{
                  padding: "1rem 2rem",
                  backgroundColor: "#6b7280",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                New Discovery
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}