import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1>Contact Fixlo</h1>
          <p>
            Get in touch with our team - we're here to help you find the perfect professional 
            for your home service needs.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="services">
        <div className="contact-container">
          <div className="contact-form">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1f2937' }}>
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="professional">Professional Account</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', marginTop: '1rem' }}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem', 
            marginTop: '4rem' 
          }}>
            <div className="service-card">
              <div className="service-icon">📧</div>
              <h3>Email</h3>
              <p>support@fixloapp.com</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3>Phone</h3>
              <p>(555) 123-FIXLO</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">⏰</div>
              <h3>Hours</h3>
              <p>Monday - Friday: 8am - 8pm EST<br />
                 Saturday: 9am - 5pm EST</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;