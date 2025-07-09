import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: '6rem 2rem 4rem', maxWidth: '1000px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>
        🔒 Privacy Policy
      </h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '10px', marginBottom: '2rem' }}>
        <h2>1. Information We Collect</h2>
        <p><strong>Personal Information:</strong></p>
        <ul>
          <li>Name, email address, phone number</li>
          <li>Address and location information</li>
          <li>Payment information (processed securely through Stripe)</li>
          <li>Profile photos and service photos</li>
          <li>Professional licenses and certifications</li>
        </ul>
        <p><strong>Usage Information:</strong></p>
        <ul>
          <li>App usage patterns and preferences</li>
          <li>Service requests and booking history</li>
          <li>Communication with support and professionals</li>
          <li>Device information and IP addresses</li>
        </ul>
      </div>

      <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', marginBottom: '2rem', border: '1px solid #e9ecef' }}>
        <h2>2. How We Use Your Information</h2>
        <ul>
          <li><strong>Service Provision:</strong> Connect you with qualified professionals</li>
          <li><strong>Communication:</strong> Send updates, notifications, and support messages</li>
          <li><strong>Payment Processing:</strong> Facilitate secure transactions</li>
          <li><strong>Safety & Security:</strong> Verify identities and conduct background checks</li>
          <li><strong>Improvement:</strong> Analyze usage to enhance our platform</li>
          <li><strong>Legal Compliance:</strong> Meet regulatory and legal requirements</li>
        </ul>
      </div>

      <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '10px', marginBottom: '2rem' }}>
        <h2>3. Information Sharing</h2>
        <p>We share your information only in these circumstances:</p>
        <ul>
          <li><strong>With Service Professionals:</strong> To facilitate service delivery</li>
          <li><strong>Payment Processors:</strong> Stripe for secure payment processing</li>
          <li><strong>Background Check Providers:</strong> Checkr for professional verification</li>
          <li><strong>Legal Requirements:</strong> When required by law or legal process</li>
          <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale</li>
        </ul>
        <p><strong>We never sell your personal information to third parties.</strong></p>
      </div>

      <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', marginBottom: '2rem', border: '1px solid #e9ecef' }}>
        <h2>4. Data Security</h2>
        <p>We implement industry-standard security measures:</p>
        <ul>
          <li>🔐 SSL encryption for all data transmission</li>
          <li>🛡️ Secure server infrastructure with regular security audits</li>
          <li>🔑 Multi-factor authentication options</li>
          <li>💳 PCI DSS compliant payment processing</li>
          <li>🚨 24/7 monitoring for suspicious activity</li>
          <li>📱 Secure mobile app with biometric authentication</li>
        </ul>
      </div>

      <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '10px', marginBottom: '2rem' }}>
        <h2>5. Your Privacy Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of your personal data</li>
          <li><strong>Correction:</strong> Update or correct inaccurate information</li>
          <li><strong>Deletion:</strong> Request deletion of your account and data</li>
          <li><strong>Portability:</strong> Export your data in a portable format</li>
          <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
          <li><strong>Restriction:</strong> Limit how we process your information</li>
        </ul>
        <p>Contact us at <strong>privacy@fixloapp.com</strong> to exercise these rights.</p>
      </div>

      <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', marginBottom: '2rem', border: '1px solid #e9ecef' }}>
        <h2>6. Cookies and Tracking</h2>
        <p>We use cookies and similar technologies to:</p>
        <ul>
          <li>Remember your preferences and settings</li>
          <li>Analyze site traffic and usage patterns</li>
          <li>Provide personalized content and recommendations</li>
          <li>Enable security features and fraud prevention</li>
        </ul>
        <p>You can control cookie settings through your browser preferences.</p>
      </div>

      <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '10px', marginBottom: '2rem' }}>
        <h2>7. Data Retention</h2>
        <p>We retain your information for as long as:</p>
        <ul>
          <li>Your account is active</li>
          <li>Needed to provide services</li>
          <li>Required for legal or regulatory compliance</li>
          <li>Necessary for safety and security purposes</li>
        </ul>
        <p>After account deletion, we may retain some information for legal and safety purposes.</p>
      </div>

      <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', marginBottom: '2rem', border: '1px solid #e9ecef' }}>
        <h2>8. Children's Privacy</h2>
        <p>
          Fixlo is not intended for children under 13. We do not knowingly collect personal information 
          from children under 13. If we become aware that we have collected such information, we will 
          delete it immediately.
        </p>
      </div>

      <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '10px', marginBottom: '2rem' }}>
        <h2>9. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than your own. 
          We ensure appropriate safeguards are in place to protect your data in accordance with 
          applicable privacy laws.
        </p>
      </div>

      <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', marginBottom: '2rem', border: '1px solid #e9ecef' }}>
        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by 
          posting the new policy on this page and updating the "Last updated" date. For significant 
          changes, we may also send you a notification.
        </p>
      </div>

      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white',
        padding: '2rem', 
        borderRadius: '15px', 
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h2>Questions About Your Privacy?</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          We're committed to protecting your privacy. If you have any questions or concerns, please reach out.
        </p>
        <a href="mailto:privacy@fixloapp.com" style={{
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          padding: '10px 25px',
          borderRadius: '25px',
          textDecoration: 'none',
          fontWeight: 'bold',
          display: 'inline-block',
          margin: '0 10px'
        }}>
          📧 privacy@fixloapp.com
        </a>
        <a href="/contact" style={{
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          padding: '10px 25px',
          borderRadius: '25px',
          textDecoration: 'none',
          fontWeight: 'bold',
          display: 'inline-block',
          margin: '0 10px'
        }}>
          📝 Contact Form
        </a>
      </div>

      <div style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
        <p>© 2024 Fixlo. All rights reserved.</p>
        <p>
          <a href="/privacy" style={{ color: '#667eea', textDecoration: 'none' }}>Privacy Policy</a> | 
          <a href="/terms" style={{ color: '#667eea', textDecoration: 'none', margin: '0 5px' }}>Terms of Service</a> | 
          <a href="/contact" style={{ color: '#667eea', textDecoration: 'none' }}>Contact</a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
