import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          
          {/* Company Info */}
          <div className="footer-section">
            <h3>Fixlo</h3>
            <p>
              Professional home services made simple. Connect with verified professionals 
              for all your home repair and maintenance needs.
            </p>
            <p style={{ fontSize: '0.9rem' }}>
              📍 Serving the United States<br/>
              📞 (555) 123-FIXLO<br/>
              📧 support@fixloapp.com
            </p>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3>Services</h3>
            <ul className="footer-links">
              <li>🔧 Handyman Services</li>
              <li>🚰 Plumbing</li>
              <li>⚡ Electrical</li>
              <li>🌡️ HVAC</li>
              <li>🧹 Cleaning</li>
              <li>🌿 Landscaping</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">For Professionals</a></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="footer-section">
            <h3>Legal & Contact</h3>
            <ul className="footer-links">
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="mailto:support@fixloapp.com">Email Support</a></li>
              <li><a href="tel:+15551234596">Call Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2024 Fixlo. All rights reserved. | Made with ❤️ for homeowners and professionals.</p>
          <p style={{ marginTop: '0.5rem' }}>
            🔒 Secure payments | 🛡️ Background checked professionals | ⭐ Satisfaction guaranteed
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;