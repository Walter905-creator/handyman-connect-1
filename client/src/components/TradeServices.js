// client/src/components/TradeServices.js
import React, { useState } from "react";

const trades = [
  { name: "Plumbing", emoji: "🚰" },
  { name: "Electrical", emoji: "💡" },
  { name: "Carpentry", emoji: "🪚" },
  { name: "Painting", emoji: "🎨" },
  { name: "HVAC", emoji: "❄️" },
  { name: "Roofing", emoji: "🏠" }
];

export default function TradeServices() {
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notify/text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ trade: selectedTrade, ...formData })
      });

      if (response.ok) {
        alert(`✅ Your request for a ${selectedTrade} pro has been sent via text!`);
      } else {
        alert("❌ Failed to send request. Please try again.");
      }

      setSelectedTrade(null);
      setFormData({ name: "", email: "", phone: "", address: "", description: "" });
    } catch (err) {
      console.error("❌ Text message error:", err);
      alert("An error occurred while sending your request.");
    }
  };

  return (
    <section style={{ padding: "4rem 2rem", backgroundColor: "#fff", textAlign: "center" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Select a Service</h2>

      {!selectedTrade ? (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
          {trades.map((trade, idx) => (
            <button
              key={idx}
              style={{
                fontSize: "1.25rem",
                padding: "1rem 2rem",
                borderRadius: "10px",
                border: "1px solid #ccc",
                backgroundColor: "#f1f5f9",
                cursor: "pointer"
              }}
              onClick={() => setSelectedTrade(trade.name)}
            >
              {trade.emoji} {trade.name}
            </button>
          ))}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            background: "#f9fafb",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        >
          <h3 style={{ marginBottom: "1rem" }}>Request a {selectedTrade} Pro</h3>

          {["name", "email", "phone", "address", "description"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              placeholder={
                field === "description"
                  ? "What do you need help with?"
                  : `Your ${field.charAt(0).toUpperCase() + field.slice(1)}`
              }
              value={formData[field]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              required
              style={{
                display: "block",
                width: "100%",
                padding: "0.75rem",
                marginBottom: "1rem",
                border: "1px solid #ccc",
                borderRadius: "6px"
              }}
            />
          ))}

          <button
            type="submit"
            style={{
              background: "#1f6feb",
              color: "white",
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Submit Request
          </button>
        </form>
      )}
    </section>
  );
}
