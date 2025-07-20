import React from "react";
import { Link } from "react-router-dom";
import TradeServices from "../components/TradeServices";
import GeoHeader from "../components/GeoHeader";
import LiveJobFeed from "../components/LiveJobFeed";
import fixloLogo from "../assets/logo.png";

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
        <img 
          src={fixloLogo} 
          alt="Fixlo Logo" 
          style={{ maxWidth: "300px", marginBottom: "1rem" }}
        />

        <GeoHeader />
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
            Join Fixlo as a Pro
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
        
        {/* Live Job Feed for conversion */}
        <div style={{ maxWidth: "600px", margin: "3rem auto 0" }}>
          <LiveJobFeed />
        </div>
      </section>
    </div>
    </>
  );
}
