import React from "react";
import { Link } from "react-router-dom";
import TradeServices from "../components/TradeServices";

export default function Home() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
      `}</style>
      <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Hero Section */}
      <section
        style={{
          background: "#0f172a",
          color: "white",
          padding: "6rem 2rem",
          textAlign: "center",
        }}
      >
        {/* Handyman Connect Logo */}
        <div 
          style={{
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 50%, #1d4ed8 100%)",
              borderRadius: "20px",
              padding: "1.5rem 2rem",
              marginBottom: "1rem",
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
              border: "3px solid rgba(255, 255, 255, 0.1)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                animation: "shimmer 3s infinite"
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span 
                style={{ 
                  fontSize: "3rem", 
                  marginRight: "0.5rem",
                  filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))"
                }}
              >
                🛠️
              </span>
              <span 
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  letterSpacing: "-0.02em"
                }}
              >
                Handyman Connect
              </span>
            </div>
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              color: "#94a3b8",
              fontWeight: "500",
              letterSpacing: "0.1em",
              textTransform: "uppercase"
            }}
          >
            Professional • Trusted • Reliable
          </div>
        </div>

        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Welcome to Handyman Connect
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            maxWidth: "600px",
            margin: "0 auto 2rem",
          }}
        >
          Your one-stop hub for finding trusted professionals and managing your home projects effortlessly.
        </p>
        <Link to="/subscribe">
          <button
            style={{
              backgroundColor: "#3b82f6",
              padding: "1rem 2rem",
              borderRadius: "8px",
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
              color: "white",
            }}
          >
            Join Handyman Connect as a Pro
          </button>
        </Link>
      </section>

      {/* Service Selection Form */}
      <TradeServices />

      {/* Highlights Section */}
      <section
        style={{
          backgroundColor: "#f8fafc",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "2rem",
            color: "#0f172a",
          }}
        >
          Explore Our Features
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          {[
            {
              title: "Verified Pros",
              emoji: "✅",
              desc: "Background-checked and reliable tradespeople.",
            },
            {
              title: "Live Chat",
              emoji: "💬",
              desc: "Chat with pros in real time.",
            },
            {
              title: "Secure Payments",
              emoji: "💳",
              desc: "Handled by Stripe. Simple & safe.",
            },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "12px",
                width: "250px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ fontSize: "2rem" }}>{f.emoji}</div>
              <h3 style={{ marginTop: "1rem", color: "#0f172a" }}>{f.title}</h3>
              <p style={{ color: "#64748b" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
