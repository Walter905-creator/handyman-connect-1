import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* Hero Section */}
      <section style={{ padding: "4rem 2rem", textAlign: "center", background: "#f0f4f8" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#222" }}>
          🛠️ Handyman Connect
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#444", maxWidth: "600px", margin: "0 auto 2rem" }}>
          Connect with verified professionals, plan your projects with AI, and manage everything in one place.
        </p>
        <Link to="/signup">
          <button style={{
            background: "#1f6feb",
            color: "white",
            fontSize: "1rem",
            padding: "0.75rem 2rem",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>
            Get Started
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section style={{ padding: "4rem 2rem", background: "#fff", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "2rem", color: "#222" }}>
          Why Handyman Connect?
        </h2>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          {[
            {
              title: "Verified Pros",
              desc: "All service providers are background-checked through Checkr.",
              emoji: "✅"
            },
            {
              title: "Smart Planning",
              desc: "Ask our AI assistant for help with home project ideas and planning.",
              emoji: "🤖"
            },
            {
              title: "Real-Time Chat",
              desc: "Message professionals instantly with built-in live chat.",
              emoji: "💬"
            },
            {
              title: "Secure Payments",
              desc: "Pay safely using Stripe monthly subscriptions.",
              emoji: "💳"
            },
          ].map((feature, idx) => (
            <div key={idx} style={{
              flex: "1 1 200px",
              background: "#f9fafb",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
            }}>
              <div style={{ fontSize: "2rem" }}>{feature.emoji}</div>
              <h3 style={{ marginTop: "1rem" }}>{feature.title}</h3>
              <p style={{ color: "#666", fontSize: "0.95rem" }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "2rem", background: "#1f2937", color: "white", textAlign: "center" }}>
        <p>© {new Date().getFullYear()} Handyman Connect. All rights reserved.</p>
      </footer>
    </div>
  );
}
