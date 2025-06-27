import React from "react";

export default function Subscribe() {
  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/stripe/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Failed to start subscription process. Please try again.");
    }
  };

  return (
    <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Join Handyman Connect as a Pro
      </h2>
      <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
        Access premium features and connect with clients. 
        <br />
        First month: <strong>$79</strong> (includes background check). Then just <strong>$29/month</strong>.
      </p>

      <form onSubmit={handleSubscribe}>
        <button
          type="submit"
          style={{
            background: "#1f6feb",
            color: "white",
            padding: "1rem 2rem",
            fontSize: "1rem",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Join Now
        </button>
      </form>
    </section>
  );
}
