import React from 'react';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <img 
            src="/assets/fixlo-logo.png" 
            alt="Fixlo Logo" 
            style={{ maxWidth: "200px", marginBottom: "2rem" }}
          />
          <h1>Your Trusted Home Service Partner</h1>
          <p>
            Connect with verified professionals for all your home repair and maintenance needs. 
            From plumbing to electrical, handyman to HVAC - we've got you covered.
          </p>
          <div className="hero-buttons">
            <a href="/contact" className="btn-primary">
              Get Started
            </a>
            <a href="#services" className="btn-secondary">
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="services-container">
          <h2>All Fixlo Services</h2>
          <p className="services-subtitle">
            Professional, reliable, and verified experts for every home service need
          </p>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Handyman Services</h3>
              <p>General repairs, furniture assembly, mounting, and small maintenance tasks around your home.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🚿</div>
              <h3>Plumbing</h3>
              <p>Leak repairs, pipe installation, drain cleaning, and emergency plumbing services.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Electrical</h3>
              <p>Wiring, outlet installation, lighting fixtures, and electrical troubleshooting.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>HVAC Services</h3>
              <p>Heating and cooling system installation, maintenance, and repair services.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>Painting</h3>
              <p>Interior and exterior painting, wallpaper installation, and surface preparation.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🏗️</div>
              <h3>Home Improvement</h3>
              <p>Kitchen and bathroom remodeling, flooring, and major renovation projects.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🧹</div>
              <h3>Cleaning Services</h3>
              <p>Regular housekeeping, deep cleaning, and post-construction cleanup.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🌿</div>
              <h3>Landscaping</h3>
              <p>Garden maintenance, lawn care, tree trimming, and outdoor beautification.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3>Smart Home Setup</h3>
              <p>Home automation, security system installation, and smart device configuration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <div className="features-content">
            <div className="features-text">
              <h2>Why Choose Fixlo?</h2>
              <p>
                We make finding and hiring trusted professionals simple, safe, and stress-free. 
                Our platform connects you with verified experts who deliver quality work every time.
              </p>
              <ul className="features-list">
                <li>Verified and background-checked professionals</li>
                <li>Real-time chat and communication</li>
                <li>Secure payments through Stripe</li>
                <li>24/7 customer support</li>
                <li>Satisfaction guarantee</li>
                <li>Transparent pricing</li>
              </ul>
            </div>
            <div className="features-image">
              <div style={{
                width: '100%',
                height: '400px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                textAlign: 'center'
              }}>
                🏠 Professional Home Services<br/>
                Made Simple
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Get Started?</h2>
          <p>
            Join thousands of satisfied homeowners who trust Fixlo for their home service needs. 
            Get matched with the perfect professional today.
          </p>
          <div className="hero-buttons">
            <a href="/contact" className="btn-primary">
              Contact Us Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;