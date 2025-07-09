import React from 'react';

const TermsOfService = () => {
  return (
    <div style={{ padding: '6rem 2rem 4rem', maxWidth: '1000px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>
        📜 Terms of Service
      </h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '10px', marginBottom: '2rem' }}>
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing and using Fixlo ("Service"), you accept and agree to be bound by the terms 
          and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
        </p>
      </div>

      <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', marginBottom: '2rem', border: '1px solid #e9ecef' }}>
        <h2>2. Service Description</h2>
        <p>
          Fixlo is a platform that connects homeowners with verified service professionals for home repairs, 
          maintenance, and improvement services. We facilitate connections but are not directly responsible 
          for the work performed by independent contractors.
        </p>
      </div>

      <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '10px', marginBottom: '2rem' }}>
        <h2>3. User Responsibilities</h2>
        <ul>
          <li>Provide accurate information when creating an account</li>
          <li>Use the service lawfully and respectfully</li>
          <li>Pay for services as agreed upon</li>
          <li>Maintain the security of your account credentials</li>
          <li>Report any issues or disputes promptly</li>
        </ul>
      </div>

      <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', marginBottom: '2rem', border: '1px solid #e9ecef' }}>
        <h2>4. Professional Standards</h2>
        <p>
          All service professionals on our platform must:
        </p>
        <ul>
          <li>Pass background checks through Checkr</li>
          <li>Maintain proper licensing and insurance</li>
          <li>Provide quality service to customers</li>
          <li>Follow safety protocols and local regulations</li>
          <li>Communicate professionally and respectfully</li>
        </ul>
      </div>

      <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '10px', marginBottom: '2rem' }}>
        <h2>5. Payment Terms</h2>
        <ul>
          <li>Payments are processed securely through Stripe</li>
          <li>Payment is due upon completion of satisfactory work</li>
          <li>Disputes must be reported within 24 hours</li>
          <li>Refunds are handled on a case-by-case basis</li>
          <li>Service fees are clearly disclosed before booking</li>
        </ul>
      </div>

      <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', marginBottom: '2rem', border: '1px solid #e9ecef' }}>
        <h2>6. Limitation of Liability</h2>
        <p>
          Fixlo acts as a platform to connect users with service professionals. While we screen our professionals, 
          we are not liable for the quality of work performed, property damage, or personal injury that may occur 
          during service provision. Users engage professionals at their own risk.
        </p>
      </div>

      <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '10px', marginBottom: '2rem' }}>
        <h2>7. Privacy and Data</h2>
        <p>
          Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
          use, and protect your personal information. By using our service, you consent to the collection 
          and use of information in accordance with our Privacy Policy.
        </p>
      </div>

      <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', marginBottom: '2rem', border: '1px solid #e9ecef' }}>
        <h2>8. Dispute Resolution</h2>
        <ul>
          <li>We encourage direct communication to resolve issues</li>
          <li>Unresolved disputes may be mediated by Fixlo support</li>
          <li>Serious disputes may require legal arbitration</li>
          <li>We maintain a satisfaction guarantee for eligible services</li>
        </ul>
      </div>

      <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '10px', marginBottom: '2rem' }}>
        <h2>9. Termination</h2>
        <p>
          We reserve the right to terminate or suspend accounts that violate these terms, engage in fraudulent 
          activity, or pose a risk to other users. Users may also terminate their accounts at any time through 
          the app settings or by contacting support.
        </p>
      </div>

      <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', marginBottom: '2rem', border: '1px solid #e9ecef' }}>
        <h2>10. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Changes will be posted on this page and 
          users will be notified of significant changes. Continued use of the service after changes indicates 
          acceptance of the new terms.
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
        <h2>Questions About Our Terms?</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          If you have any questions about these Terms of Service, please contact us.
        </p>
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
          📝 Contact Us
        </a>
        <a href="mailto:legal@fixloapp.com" style={{
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          padding: '10px 25px',
          borderRadius: '25px',
          textDecoration: 'none',
          fontWeight: 'bold',
          display: 'inline-block',
          margin: '0 10px'
        }}>
          📧 legal@fixloapp.com
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

export default TermsOfService;
