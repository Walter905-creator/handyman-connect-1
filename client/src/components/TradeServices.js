import React, { useState } from "react";

export default function TradeServices() {
  const [selectedService, setSelectedService] = useState("");

  const services = [
    { id: "plumbing", name: "Plumbing", emoji: "🚰", color: "#3b82f6" },
    { id: "electrical", name: "Electrical", emoji: "💡", color: "#f59e0b" },
    { id: "carpentry", name: "Carpentry", emoji: "🪚", color: "#8b5cf6" },
    { id: "painting", name: "Painting", emoji: "🎨", color: "#ef4444" },
    { id: "hvac", name: "HVAC", emoji: "❄️", color: "#06b6d4" },
    { id: "roofing", name: "Roofing", emoji: "🏠", color: "#84cc16" },
    { id: "cleaning", name: "House Cleaning", emoji: "🧹", color: "#ec4899" },
    { id: "junk-removal", name: "Junk Removal", emoji: "🗑️", color: "#6b7280" },
  ];

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    // Show feedback to user
    const serviceName = services.find(s => s.id === serviceId)?.name;
    alert(`${serviceName} selected! Download the Fixlo app to request this service.`);
  };

  return (
    <section
      style={{
        padding: "4rem 2rem",
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#0f172a",
        }}
      >
        What service do you need?
      </h2>
      <p
        style={{
          fontSize: "1.1rem",
          color: "#64748b",
          marginBottom: "3rem",
          maxWidth: "600px",
          margin: "0 auto 3rem",
        }}
      >
        Select from our professional home services. All contractors are verified and background-checked.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1000px",
          margin: "0 auto 3rem",
        }}
      >
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceSelect(service.id)}
            style={{
              backgroundColor: selectedService === service.id ? service.color : "white",
              color: selectedService === service.id ? "white" : "#0f172a",
              border: `2px solid ${service.color}`,
              borderRadius: "12px",
              padding: "1.5rem 1rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              minHeight: "120px",
              justifyContent: "center",
              boxShadow: selectedService === service.id 
                ? `0 8px 25px ${service.color}40` 
                : "0 2px 10px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={(e) => {
              if (selectedService !== service.id) {
                e.target.style.backgroundColor = `${service.color}10`;
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = `0 8px 25px ${service.color}30`;
              }
            }}
            onMouseLeave={(e) => {
              if (selectedService !== service.id) {
                e.target.style.backgroundColor = "white";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
              }
            }}
          >
            <span style={{ fontSize: "2.5rem" }}>{service.emoji}</span>
            <span>{service.name}</span>
          </button>
        ))}
      </div>

      {/* Professional signup section */}
      <div
        style={{
          backgroundColor: "#f8fafc",
          padding: "3rem 2rem",
          borderRadius: "16px",
          marginTop: "3rem",
        }}
      >
        <h3
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "#0f172a",
          }}
        >
          Are you a professional?
        </h3>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#64748b",
            marginBottom: "2rem",
          }}
        >
          Join Fixlo and connect with homeowners in your area
        </p>
        
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {[
            { name: "Handyman", emoji: "🔧", color: "#ef4444" },
            { name: "Contractor", emoji: "🏗️", color: "#3b82f6" },
            { name: "Plumber", emoji: "🚰", color: "#06b6d4" },
            { name: "Electrician", emoji: "💡", color: "#f59e0b" },
            { name: "Cleaner", emoji: "🧹", color: "#ec4899" },
          ].map((pro) => (
            <button
              key={pro.name}
              onClick={() => alert(`${pro.name} registration coming soon! Email professionals@fixloapp.com for early access.`)}
              style={{
                backgroundColor: pro.color,
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "1rem 1.5rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = `0 8px 25px ${pro.color}40`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <span>{pro.emoji}</span>
              <span>Join as {pro.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
