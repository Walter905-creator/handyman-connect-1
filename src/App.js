import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    { name: 'Plumbing', emoji: '🚰', description: 'Professional plumbing repairs and installations' },
    { name: 'Electrical', emoji: '💡', description: 'Licensed electrical services and wiring' },
    { name: 'Carpentry', emoji: '🪚', description: 'Custom woodwork and repairs' },
    { name: 'House Cleaning', emoji: '🧹', description: 'Thorough residential cleaning services' },
    { name: 'Junk Removal', emoji: '🗑️', description: 'Fast and eco-friendly junk removal' },
    { name: 'Landscaping', emoji: '🌿', description: 'Professional lawn care and garden design' },
    { name: 'Roofing', emoji: '🏠', description: 'Expert roofing repairs and replacements' },
    { name: 'HVAC', emoji: '❄️', description: 'Heating, ventilation, and air conditioning' },
    { name: 'Painting', emoji: '🎨', description: 'Interior and exterior painting services' }
  ];

  const testimonials = [
    { name: 'Sarah M.', text: 'Fixlo found me an amazing plumber who fixed my leak in just 2 hours!', rating: 5 },
    { name: 'Mike R.', text: 'The electrical work was done professionally and on time. Highly recommend!', rating: 5 },
    { name: 'Lisa K.', text: 'Great service for house cleaning. My home has never looked better!', rating: 5 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBookNow = () => {
    // Scroll to contact section or handle booking
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <span className="logo-text">Fixlo</span>
            <span className="logo-tagline">Professional Home Services</span>
          </div>
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#testimonials">Reviews</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Get Your Home Fixed by <span className="highlight">Trusted Professionals</span>
          </h1>
          <p className="hero-subtitle">
            Connect with verified local experts for all your home repair and maintenance needs. 
            From plumbing to painting, we've got you covered.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Verified Pros</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
          <button className="cta-button" onClick={handleBookNow}>
            Book Service Now
          </button>
        </div>
        <div className="hero-visual">
          <div className="hero-image-placeholder">
            🏠✨
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Professional home services at your fingertips</p>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-emoji">{service.emoji}</div>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-description">{service.description}</p>
                <button className="service-button">Get Quote</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Describe Your Need</h3>
              <p>Tell us what you need fixed or maintained in your home</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Get Matched</h3>
              <p>We connect you with verified local professionals</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Get It Done</h3>
              <p>Your chosen professional completes the job to your satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonial-slider">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`testimonial ${index === currentSlide ? 'active' : ''}`}
              >
                <div className="stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-author">- {testimonial.name}</p>
              </div>
            ))}
          </div>
          <div className="slider-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Ready to Get Started?</h2>
          <p className="section-subtitle">Contact us today for a free quote</p>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>(555) 123-FIXLO</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>hello@fixloapp.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Serving Your Local Area</span>
              </div>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="tel" placeholder="Your Phone" required />
              <select required>
                <option value="">Select Service</option>
                {services.map((service, index) => (
                  <option key={index} value={service.name}>
                    {service.emoji} {service.name}
                  </option>
                ))}
              </select>
              <textarea placeholder="Describe your project" rows="4" required></textarea>
              <button type="submit" className="submit-button">Get Free Quote</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Fixlo</h3>
              <p>Your trusted partner for all home services. Quality work, reliable professionals, guaranteed satisfaction.</p>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li>Plumbing</li>
                <li>Electrical</li>
                <li>Carpentry</li>
                <li>Cleaning</li>
                <li>& More</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li>About Us</li>
                <li>How It Works</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li>Help Center</li>
                <li>Safety</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Fixlo. All rights reserved. | Professional Home Services Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
