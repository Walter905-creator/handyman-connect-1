import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '80px 20px 40px 20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          color: 'white'
        }}>
          <h1 style={{
            fontSize: '3rem',
            marginBottom: '20px',
            fontWeight: '700'
          }}>
            Contact Us
          </h1>
          <p style={{
            fontSize: '1.2rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Have questions or need support? We're here to help you get the most out of Fixlo.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Contact Form */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              marginBottom: '30px',
              color: '#333',
              fontSize: '1.8rem'
            }}>
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  color: '#555'
                }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  color: '#555'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  color: '#555'
                }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  color: '#555'
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '8px',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '15px',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '20px'
                }}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '12px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              marginBottom: '30px',
              color: '#333',
              fontSize: '1.8rem'
            }}>
              Get in Touch
            </h2>

            <div style={{ marginBottom: '30px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <span style={{
                  fontSize: '1.5rem',
                  marginRight: '15px'
                }}>📧</span>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>Email</h3>
                  <p style={{ margin: 0, color: '#666' }}>support@fixloapp.com</p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <span style={{
                  fontSize: '1.5rem',
                  marginRight: '15px'
                }}>📞</span>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>Phone</h3>
                  <p style={{ margin: 0, color: '#666' }}>(555) 123-FIXLO</p>
                </div>
              </div>

              <div style={{
                display: 'flex',             
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <span style={{
                  fontSize: '1.5rem',
                  marginRight: '15px'
                }}>🏢</span>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>Office</h3>
                  <p style={{ margin: 0, color: '#666' }}>
                    123 Main Street<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              borderTop: '2px solid #e1e5e9',
              paddingTop: '30px'
            }}>
              <h3 style={{
                marginBottom: '15px',
                color: '#333'
              }}>
                Business Hours
              </h3>
              <p style={{ margin: '5px 0', color: '#666' }}>
                Monday - Friday: 8:00 AM - 6:00 PM
              </p>
              <p style={{ margin: '5px 0', color: '#666' }}>
                Saturday: 9:00 AM - 4:00 PM
              </p>
              <p style={{ margin: '5px 0', color: '#666' }}>
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '15px 30px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;