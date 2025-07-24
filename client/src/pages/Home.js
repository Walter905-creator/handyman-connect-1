import React from "react";
import { Link } from "react-router-dom";
import TradeServices from "../components/TradeServices";
import GeoHeader from "../components/GeoHeader";
import LiveJobFeed from "../components/LiveJobFeed";
import UrgencyPopup from "../components/UrgencyPopup";
import ExitIntentModal from "../components/ExitIntentModal";
import StickySignupBar from "../components/StickySignupBar";
import StickyMobileCTA from "../components/StickyMobileCTA";
import fixloLogo from "../assets/logo.png";

export default function Home() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        .service-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 15px 10px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.3s ease;
          text-align: center;
          font-weight: 500;
          cursor: pointer;
          display: block;
        }
        
        .service-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
          color: white;
          text-decoration: none;
        }
        
        .cta-button {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
          border: none;
          padding: 18px 40px;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
          text-decoration: none;
          display: inline-block;
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
          color: white;
          text-decoration: none;
        }
        
        .btn {
          padding: 15px 30px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          display: inline-block;
          cursor: pointer;
          border: none;
        }
        
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          text-decoration: none;
        }
        
        .btn-primary {
          background: #ff6b6b;
          color: white;
        }
        
        .btn-primary:hover {
          color: white;
        }
        
        .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid white;
        }
        
        .btn-secondary:hover {
          color: white;
        }
        
        .btn-handyman {
          background: #28a745;
          color: white;
        }
        
        .btn-handyman:hover {
          color: white;
        }
      `}</style>
      
      <div style={{ fontFamily: "Inter, sans-serif" }}>
        {/* Conversion Components */}
        <UrgencyPopup />
        <ExitIntentModal />
        <StickySignupBar />
        <StickyMobileCTA />
        
        {/* Hero Section */}
        <section
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            padding: "6rem 2rem",
            textAlign: "center",
          }}
        >
          <img 
            src={fixloLogo} 
            alt="Fixlo Logo" 
            style={{ 
              maxWidth: "300px", 
              marginBottom: "2rem", 
              filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))" 
            }}
          />

          <GeoHeader />
          
          <h1 style={{ 
            fontSize: "3.5rem", 
            marginBottom: "1rem", 
            fontWeight: "700",
            lineHeight: "1.2"
          }}>
            Welcome to Fixlo
          </h1>
          
          <p style={{
            fontSize: "1.3rem",
            maxWidth: "600px",
            margin: "0 auto 2rem",
            lineHeight: "1.6"
          }}>
            Your one-stop hub for finding trusted professionals and managing your home projects effortlessly.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "3rem"
          }}>
            <Link to="/download" className="btn btn-primary">
              📱 Download App
            </Link>
            <Link to="/signup" className="btn btn-handyman">
              🔧 Join Now
            </Link>
            <Link to="/pricing" className="btn btn-secondary">
              💰 View Pricing
            </Link>
          </div>

          {/* Service Selection */}
          <div style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "30px",
            borderRadius: "15px",
            maxWidth: "800px",
            margin: "0 auto",
            backdropFilter: "blur(10px)"
          }}>
            <h3 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>
              Select a Service
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "15px"
            }}>
              <button className="service-btn">🚰 Plumbing</button>
              <button className="service-btn">💡 Electrical</button>
              <button className="service-btn">🪚 Carpentry</button>
              <button className="service-btn">🎨 Painting</button>
              <button className="service-btn">❄️ HVAC</button>
              <button className="service-btn">🏠 Roofing</button>
              <button className="service-btn">🌿 Landscaping</button>
              <button className="service-btn">🧹 House Cleaning</button>
              <button className="service-btn">🗑️ Junk Removal</button>
            </div>
          </div>
        </section>

        {/* Trade Services Component */}
        <TradeServices />

        {/* How It Works Section */}
        <section style={{
          padding: "80px 2rem",
          background: "#f8f9fa",
          textAlign: "center"
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            marginBottom: "20px",
            color: "#2c3e50",
            fontWeight: "700"
          }}>
            🛠️ How Fixlo Works
          </h2>
          <p style={{
            fontSize: "1.2rem",
            marginBottom: "3rem",
            color: "#666",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            Fixlo is your one-stop connection to trusted professionals. Here's how it works:
          </p>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto"
          }}>
            {[
              {
                icon: "📋",
                title: "1. Submit a Request",
                desc: "Choose your service, describe your needs, and provide your location.",
                color: "#dbeafe"
              },
              {
                icon: "🔔",
                title: "2. Get Matched Instantly", 
                desc: "We'll notify qualified professionals near you immediately.",
                color: "#dcfce7"
              },
              {
                icon: "📞",
                title: "3. Connect & Hire",
                desc: "Pros will contact you directly. Review, compare, and hire the right one!",
                color: "#f3e8ff"
              }
            ].map((step, i) => (
              <div key={i} style={{
                background: "white",
                padding: "2rem",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease"
              }}>
                <div style={{
                  width: "64px",
                  height: "64px",
                  margin: "0 auto 24px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  background: step.color
                }}>
                  {step.icon}
                </div>
                <h3 style={{ 
                  fontSize: "1.25rem", 
                  fontWeight: "600", 
                  marginBottom: "16px", 
                  color: "#1f2937" 
                }}>
                  {step.title}
                </h3>
                <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section style={{
          backgroundColor: "white",
          padding: "4rem 2rem",
          textAlign: "center",
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            marginBottom: "2rem",
            color: "#2c3e50",
          }}>
            Why Choose Fixlo?
          </h2>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "center",
            maxWidth: "1200px",
            margin: "0 auto"
          }}>
            {[
              {
                title: "Verified Pros",
                emoji: "✅",
                desc: "All contractors are background-checked and verified for quality and reliability.",
              },
              {
                title: "Instant Notifications",
                emoji: "💬",
                desc: "Get notified immediately when professionals respond to your job requests.",
              },
              {
                title: "Secure Payments",
                emoji: "💳",
                desc: "Safe and secure payment processing through Stripe for all transactions.",
              },
              {
                title: "Mobile First",
                emoji: "📱",
                desc: "Designed for your phone - request services on the go, anywhere, anytime.",
              },
              {
                title: "All Home Services",
                emoji: "🏠",
                desc: "Plumbing, electrical, HVAC, carpentry, painting, house cleaning, junk removal, and more all in one app.",
              },
              {
                title: "Fast Response",
                emoji: "⚡",
                desc: "Get quotes and responses from multiple professionals within minutes.",
              },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "white",
                  padding: "2rem",
                  borderRadius: "12px",
                  width: "300px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease"
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{f.emoji}</div>
                <h3 style={{ marginTop: "1rem", color: "#2c3e50", fontSize: "1.3rem" }}>{f.title}</h3>
                <p style={{ color: "#64748b", lineHeight: "1.6" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Live Job Feed */}
        <section style={{ 
          maxWidth: "600px", 
          margin: "3rem auto", 
          padding: "0 2rem" 
        }}>
          <LiveJobFeed />
        </section>

        {/* Pricing Section */}
        <section style={{
          padding: "80px 2rem",
          textAlign: "center",
          background: "#f8f9fa"
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            marginBottom: "3rem",
            color: "#2c3e50"
          }}>
            Simple Pricing
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            <div style={{
              background: "white",
              padding: "2rem",
              borderRadius: "15px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#2c3e50" }}>
                Homeowners
              </h3>
              <div style={{ 
                fontSize: "3rem", 
                fontWeight: "700", 
                color: "#667eea", 
                marginBottom: "1rem" 
              }}>
                Free
              </div>
              <p>Submit unlimited job requests and connect with professionals at no cost.</p>
            </div>
            <div style={{
              background: "white",
              padding: "2rem",
              borderRadius: "15px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              border: "3px solid #667eea",
              transform: "scale(1.05)"
            }}>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#2c3e50" }}>
                Professionals
              </h3>
              <div style={{ 
                fontSize: "3rem", 
                fontWeight: "700", 
                color: "#667eea", 
                marginBottom: "1rem" 
              }}>
                $59.99
                <span style={{ fontSize: "1rem", color: "#7f8c8d" }}>/month</span>
              </div>
              <p>Receive job notifications, connect with homeowners, and grow your business.</p>
            </div>
          </div>
        </section>

        {/* Professional Signup CTA Section */}
        <section style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "80px 2rem",
          textAlign: "center"
        }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Join as a Professional
          </h2>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
            Start earning more by connecting with customers who need your skills
          </p>
          
          <div style={{
            display: "flex",
            gap: "40px",
            justifyContent: "center",
            marginBottom: "3rem",
            flexWrap: "wrap"
          }}>
            {[
              { num: "1", title: "Sign Up", desc: "Create your professional profile and showcase your skills" },
              { num: "2", title: "Get Verified", desc: "Complete our verification process to build trust with customers" },
              { num: "3", title: "Start Earning", desc: "Receive job requests and grow your business" }
            ].map((step, i) => (
              <div key={i} style={{ textAlign: "center", maxWidth: "200px" }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  margin: "0 auto 20px"
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>{step.title}</h3>
                <p style={{ fontSize: "1rem", opacity: "0.9" }}>{step.desc}</p>
              </div>
            ))}
          </div>
          
          <Link to="/signup" className="cta-button">
            Sign Up as Professional
          </Link>
        </section>
      </div>
    </>
  );
}
