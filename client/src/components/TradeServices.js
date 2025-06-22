import React from "react";
import { useNavigate } from "react-router-dom";

const trades = [
  { name: "Plumbing", icon: "🚰" },
  { name: "Electrical", icon: "💡" },
  { name: "Painting", icon: "🎨" },
  { name: "Cleaning", icon: "🧼" },
  { name: "Carpentry", icon: "🔨" },
  { name: "Landscaping", icon: "🌿" },
];

export default function TradeServices() {
  const navigate = useNavigate();

  const handleClick = (trade) => {
    navigate(`/request?trade=${encodeURIComponent(trade)}`);
  };

  return (
    <section style={{ padding: "4rem 2rem", background: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>What Do You Need Help With?</h2>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1.5rem"
      }}>
        {trades.map((trade) => (
          <div
            key={trade.name}
            onClick={() => handleClick(trade.name)}
            style={{
              width: 180,
              height: 180,
              background: "white",
              borderRadius: 12,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1.2rem",
              fontWeight: "bold"
            }}
          >
            <div style={{ fontSize: "2.5rem" }}>{trade.icon}</div>
            <div style={{ marginTop: "1rem" }}>{trade.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
