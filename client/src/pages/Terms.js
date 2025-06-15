import React from "react";

function Terms() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", lineHeight: "1.6" }}>
      <h1>Terms and Conditions</h1>
      {/* Add your terms here */}
     <h2>🛠️ For Service Providers (Pros)</h2>
<ul>
  <li><strong>Eligibility:</strong> You must be at least 18 years old and authorized to work in your region.</li>
  <li><strong>Background Checks:</strong> By applying, you authorize verification of your identity and history.</li>
  <li><strong>Payments:</strong> Stripe handles all payouts. Handyman Connect takes a small service fee.</li>
  <li><strong>Conduct:</strong> No fraudulent claims, harassment, or impersonation is allowed.</li>
</ul>

<h2>🏡 For Homeowners (Clients)</h2>
<ul>
  <li><strong>Platform Use:</strong> You may browse, contact, and hire verified professionals.</li>
  <li><strong>Payments:</strong> All payments are processed securely via Stripe.</li>
  <li><strong>Refunds:</strong> Refunds are only granted if agreed by the professional you hired.</li>
  <li><strong>Disclaimers:</strong> We verify basic identity and background info, but cannot guarantee service outcomes.</li>
</ul>

<p>By using Handyman Connect, you agree to these terms.</p>
    </div>
  );
}

export default Terms;
