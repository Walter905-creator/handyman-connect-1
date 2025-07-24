import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import servicesData from '../data/services.json';

const ServiceLandingPage = () => {
  const { service, city } = useParams();
  const [serviceInfo, setServiceInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Convert URL parameters to display format
    const formattedService = service?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const formattedCity = city?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    // Find matching service in data
    const matchedService = servicesData.services.find(s => 
      s.service.toLowerCase() === formattedService?.toLowerCase() && 
      s.city.toLowerCase() === formattedCity?.toLowerCase()
    );

    if (matchedService) {
      setServiceInfo({
        ...matchedService,
        displayService: formattedService,
        displayCity: formattedCity
      });
    }
    setLoading(false);
  }, [service, city]);

  useEffect(() => {
    // Set page title for SEO
    if (serviceInfo) {
      document.title = `${serviceInfo.displayService} in ${serviceInfo.displayCity} | Fixlo - Find Trusted Professionals`;
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = `Find trusted ${serviceInfo.displayService.toLowerCase()} professionals in ${serviceInfo.displayCity}. Get quotes, reviews, and book appointments with vetted experts through Fixlo.`;
      if (!document.querySelector('meta[name="description"]')) {
        document.head.appendChild(metaDescription);
      }
    }
  }, [serviceInfo]);

  if (loading) {
    return (
      <div style={{ 
        padding: '6rem 2rem 4rem', 
        textAlign: 'center',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>Loading service information...</div>
      </div>
    );
  }

  if (!serviceInfo) {
    return (
      <div style={{ 
        padding: '6rem 2rem 4rem', 
        textAlign: 'center',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>
          Service Not Found
        </h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          We couldn't find the service you're looking for.
        </p>
        <a href="/" style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '12px 24px',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: 'bold'
        }}>
          Return to Home
        </a>
      </div>
    );
  }

  const getServiceIcon = (service) => {
    const icons = {
      'Plumbing': '🔧',
      'Electrical': '⚡',
      'Carpentry': '🪚',
      'House Cleaning': '🧹',
      'Junk Removal': '🗑️',
      'Landscaping': '🌿',
      'Roofing': '🏠',
      'Hvac': '❄️',
      'Painting': '🎨',
      'Handyman': '🔨'
    };
    return icons[service] || '🛠️';
  };

  return (
    <div style={{ padding: '6rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '4rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem 2rem',
        borderRadius: '15px'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          {getServiceIcon(serviceInfo.displayService)}
        </div>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          {serviceInfo.displayService} in {serviceInfo.displayCity}
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
          Find trusted {serviceInfo.displayService.toLowerCase()} professionals in {serviceInfo.displayCity} with Fixlo
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            🚀 Get Free Quotes
          </button>
          <button style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid white',
            padding: '15px 30px',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            📞 Call Now
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem', 
        marginBottom: '4rem' 
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Vetted Professionals</h3>
          <p style={{ color: '#666' }}>
            All {serviceInfo.displayService.toLowerCase()} experts in {serviceInfo.displayCity} are background-checked and verified
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Top Rated</h3>
          <p style={{ color: '#666' }}>
            Read reviews and ratings from real customers for {serviceInfo.displayService.toLowerCase()} services
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Best Prices</h3>
          <p style={{ color: '#666' }}>
            Compare quotes from multiple {serviceInfo.displayService.toLowerCase()} contractors in {serviceInfo.displayCity}
          </p>
        </div>
      </div>

      {/* Service Description */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '3rem 2rem', 
        borderRadius: '15px',
        marginBottom: '4rem'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center', color: '#333' }}>
          Professional {serviceInfo.displayService} Services in {serviceInfo.displayCity}
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem',
          textAlign: 'center'
        }}>
          <div>
            <h4 style={{ color: '#333', marginBottom: '1rem' }}>📅 Easy Booking</h4>
            <p style={{ color: '#666' }}>
              Schedule your {serviceInfo.displayService.toLowerCase()} appointment online or by phone
            </p>
          </div>
          <div>
            <h4 style={{ color: '#333', marginBottom: '1rem' }}>🛡️ Insured & Licensed</h4>
            <p style={{ color: '#666' }}>
              All professionals carry proper licensing and insurance coverage
            </p>
          </div>
          <div>
            <h4 style={{ color: '#333', marginBottom: '1rem' }}>🎯 Local Experts</h4>
            <p style={{ color: '#666' }}>
              Experienced {serviceInfo.displayService.toLowerCase()} specialists serving {serviceInfo.displayCity}
            </p>
          </div>
          <div>
            <h4 style={{ color: '#333', marginBottom: '1rem' }}>💯 Satisfaction Guaranteed</h4>
            <p style={{ color: '#666' }}>
              100% satisfaction guarantee on all {serviceInfo.displayService.toLowerCase()} work
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #28a745 0%, #155724 100%)',
        color: 'white',
        padding: '3rem 2rem',
        borderRadius: '15px'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Ready to Find {serviceInfo.displayService} Experts in {serviceInfo.displayCity}?
        </h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
          Get connected with top-rated professionals today
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/signup" style={{
            backgroundColor: 'white',
            color: '#28a745',
            padding: '15px 30px',
            textDecoration: 'none',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            🚀 Get Started Now
          </a>
          <a href="/pro-support" style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            padding: '15px 30px',
            textDecoration: 'none',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            border: '2px solid white'
          }}>
            👷‍♂️ Join as Professional
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceLandingPage;