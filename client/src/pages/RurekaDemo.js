import React, { useState } from 'react';
import RurekaCelebration from '../components/RurekaCelebration';
import LocalRurekaDemo from '../components/LocalRurekaDemo';

const RurekaDemo = () => {
  const [demoProId] = useState("demo-pro-123");
  const [celebrationMessage, setCelebrationMessage] = useState("");
  const [showLocalDemo, setShowLocalDemo] = useState(false);

  const triggerCelebration = async (type) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'https://fixloapp.onrender.com';
      
      const response = await fetch(`${API_URL}/api/rureka/celebrations/trigger`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type,
          proId: demoProId,
          customMessage: 'Rureka! 🎉 This is a demo celebration showing the new feature!'
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setCelebrationMessage(`✅ ${type} celebration triggered!`);
      } else {
        setCelebrationMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setCelebrationMessage(`❌ Error: ${error.message}`);
    }
  };

  if (showLocalDemo) {
    return <LocalRurekaDemo />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '40px 20px',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '20px',
          textShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}>
          🎉 Rureka! 🎉
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '30px',
          opacity: 0.9
        }}>
          The new celebration system for Fixlo! 
        </p>

        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setShowLocalDemo(true)}
            style={{
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              border: 'none',
              color: '#8B4513',
              padding: '15px 25px',
              borderRadius: '25px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 20px rgba(255, 215, 0, 0.4)',
              animation: 'pulse 2s infinite'
            }}
          >
            🌟 Try Live Demo!
          </button>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <button
            onClick={() => triggerCelebration('custom')}
            style={{
              background: '#FF6B6B',
              border: 'none',
              color: 'white',
              padding: '15px 20px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            🎉 Custom Celebration
          </button>
          
          <button
            onClick={() => triggerCelebration('job_completed')}
            style={{
              background: '#4ECDC4',
              border: 'none',
              color: 'white',
              padding: '15px 20px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            🏆 Job Completed
          </button>
          
          <button
            onClick={() => triggerCelebration('job_matched')}
            style={{
              background: '#45B7D1',
              border: 'none',
              color: 'white',
              padding: '15px 20px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            🎯 Job Matched
          </button>
          
          <button
            onClick={() => triggerCelebration('welcome_pro')}
            style={{
              background: '#96CEB4',
              border: 'none',
              color: 'white',
              padding: '15px 20px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            🎊 Welcome Pro
          </button>
        </div>
        
        {celebrationMessage && (
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '40px',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <p style={{ margin: 0, fontSize: '16px' }}>
              {celebrationMessage}
            </p>
          </div>
        )}
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          padding: '30px',
          borderRadius: '15px',
          border: '1px solid rgba(255,255,255,0.2)',
          textAlign: 'left'
        }}>
          <h3 style={{ marginTop: 0, color: '#FFE66D' }}>✨ What is Rureka?</h3>
          <ul style={{ lineHeight: '1.6', opacity: 0.9 }}>
            <li><strong>🎯 Job Match Celebrations:</strong> When a homeowner's request is matched with a professional</li>
            <li><strong>🏆 Job Completion Celebrations:</strong> When a job is successfully completed</li>
            <li><strong>🌟 Milestone Celebrations:</strong> First job, rating achievements, job count milestones</li>
            <li><strong>🎊 Welcome Celebrations:</strong> When new professionals join and get verified</li>
            <li><strong>⭐ Rating Celebrations:</strong> When professionals achieve 4.5+ or 5.0 star ratings</li>
          </ul>
          
          <p style={{ marginBottom: 0, fontStyle: 'italic', opacity: 0.8 }}>
            "Rureka!" - The moment of joy and discovery when great connections are made on Fixlo! 🎉
          </p>
        </div>
      </div>
      
      {/* The Rureka celebration component */}
      <RurekaCelebration 
        proId={demoProId}
        onCelebrationComplete={() => setCelebrationMessage("🎉 Celebration completed!")}
      />
      
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 8px 25px rgba(255, 215, 0, 0.6); }
          100% { transform: scale(1); box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4); }
        }
      `}</style>
    </div>
  );
};

export default RurekaDemo;