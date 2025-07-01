import React from "react";

export default function PrivacyPolicy() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Inter, sans-serif", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
      <h1>Fixlo Privacy Policy</h1>
      <p><em>Last Updated: June 30, 2025</em></p>

      <h2>1. Introduction</h2>
      <p>
        Fixlo ("we", "us", or "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use Fixlo's website, mobile app, and services.
      </p>

      <h2>2. Information We Collect</h2>
      <ul>
        <li><strong>Account Information:</strong> Name, email, phone number, and address.</li>
        <li><strong>Payment Information:</strong> Processed securely through Stripe (we don't store payment details).</li>
        <li><strong>Service Requests:</strong> Details about the type of service requested or offered.</li>
        <li><strong>Communication Data:</strong> Messages exchanged on the platform.</li>
        <li><strong>Device & Usage Data:</strong> IP address, browser type, location data, and app usage statistics.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <ul>
        <li>To provide and improve our services.</li>
        <li>To process payments and manage subscriptions.</li>
        <li>To match homeowners with appropriate pros.</li>
        <li>To send important updates and notifications.</li>
        <li>For customer support and communication.</li>
      </ul>

      <h2>4. Data Sharing</h2>
      <ul>
        <li>We share necessary data with service pros when homeowners submit job requests.</li>
        <li>We use third-party services (like Stripe for payments and Expo for notifications).</li>
        <li>We never sell or rent your personal information to third parties.</li>
      </ul>

      <h2>5. Data Security</h2>
      <p>
        We implement industry-standard measures to protect your data. However, no system can guarantee 100% security.
      </p>

      <h2>6. Your Rights</h2>
      <ul>
        <li>You may access, update, or delete your personal information by contacting us.</li>
        <li>You may unsubscribe from promotional emails at any time.</li>
        <li>You can disable push notifications in your device settings.</li>
      </ul>

      <h2>7. Cookies and Tracking</h2>
      <p>
        We may use cookies and similar technologies to analyze site traffic and improve your experience.
      </p>

      <h2>8. Children's Privacy</h2>
      <p>
        Fixlo is not intended for users under 18 years old. We do not knowingly collect information from minors.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The latest version will always be available at fixloapp.com/privacy.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at: <strong>privacy@fixloapp.com</strong>
      </p>
    </div>
  );
}
