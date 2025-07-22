import React, { useState } from 'react';
import './LocalRurekaDemo.css';

const LocalRurekaDemo = () => {
  const [currentCelebration, setCurrentCelebration] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const triggerLocalCelebration = (type) => {
    const celebrations = {
      custom: {
        title: '🎉 Custom Celebration!',
        message: 'Rureka! This is a test celebration showing the new feature!',
        emoji: '🎉',
        color: '#FF6B6B',
        animation: 'confetti'
      },
      job_completed: {
        title: '🏆 Job Completed!',
        message: 'Great work! Another job completed successfully!',
        emoji: '🏆',
        color: '#45B7D1',
        animation: 'bounce'
      },
      job_matched: {
        title: '🎯 Job Match Success!',
        message: 'Congratulations! You\'ve been matched with a new plumbing job!',
        emoji: '🎯',
        color: '#4ECDC4',
        animation: 'sparkle'
      },
      welcome_pro: {
        title: '🎊 Welcome to Fixlo!',
        message: 'Welcome! You\'re now verified and ready to receive job notifications!',
        emoji: '🎊',
        color: '#A8E6CF',
        animation: 'confetti'
      },
      first_job: {
        title: '🌟 First Job Completed!',
        message: 'Amazing! You\'ve completed your first job on Fixlo!',
        emoji: '🌟',
        color: '#96CEB4',
        animation: 'confetti'
      },
      milestone: {
        title: '🚀 10 Jobs Milestone!',
        message: 'Incredible! You\'ve completed 10 jobs!',
        emoji: '🚀',
        color: '#FFEAA7',
        animation: 'confetti'
      }
    };

    const celebration = celebrations[type];
    setCurrentCelebration(celebration);
    setIsVisible(true);

    // Auto-hide after 4 seconds
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setCurrentCelebration(null), 300);
    }, 4000);
  };

  const closeCelebration = () => {
    setIsVisible(false);
    setTimeout(() => setCurrentCelebration(null), 300);
  };

  return (
    <div className="local-rureka-demo">
      <div className="demo-content">
        <h1>🎉 Rureka! Live Demo 🎉</h1>
        <p>Click any button below to see the celebration animations in action!</p>
        
        <div className="demo-buttons">
          <button 
            onClick={() => triggerLocalCelebration('custom')}
            className="demo-btn custom"
          >
            🎉 Custom Celebration
          </button>
          
          <button 
            onClick={() => triggerLocalCelebration('job_completed')}
            className="demo-btn job-completed"
          >
            🏆 Job Completed
          </button>
          
          <button 
            onClick={() => triggerLocalCelebration('job_matched')}
            className="demo-btn job-matched"
          >
            🎯 Job Matched
          </button>
          
          <button 
            onClick={() => triggerLocalCelebration('welcome_pro')}
            className="demo-btn welcome"
          >
            🎊 Welcome Pro
          </button>
          
          <button 
            onClick={() => triggerLocalCelebration('first_job')}
            className="demo-btn first-job"
          >
            🌟 First Job
          </button>
          
          <button 
            onClick={() => triggerLocalCelebration('milestone')}
            className="demo-btn milestone"
          >
            🚀 10 Jobs Milestone
          </button>
        </div>

        <div className="demo-info">
          <h3>✨ Rureka Features</h3>
          <ul>
            <li><strong>🎯 Job Match Celebrations:</strong> When homeowners connect with pros</li>
            <li><strong>🏆 Job Completion:</strong> Success celebrations for completed work</li>
            <li><strong>🌟 Milestones:</strong> First job, rating achievements, job counts</li>
            <li><strong>🎊 Welcome:</strong> New professional onboarding celebrations</li>
            <li><strong>⭐ Ratings:</strong> 4.5+ and 5.0 star achievement celebrations</li>
          </ul>
          <p><em>"Rureka!" - The moment of joy when great connections happen! 🎉</em></p>
        </div>
      </div>

      {/* Local Celebration Display */}
      {currentCelebration && (
        <div className={`local-celebration ${isVisible ? 'visible' : ''}`}>
          <div className="celebration-overlay" onClick={closeCelebration} />
          <div 
            className={`celebration-card ${currentCelebration.animation}`}
            style={{ 
              backgroundColor: currentCelebration.color,
              borderColor: currentCelebration.color
            }}
          >
            <button className="celebration-close" onClick={closeCelebration}>×</button>
            
            <div className="celebration-emoji">
              {currentCelebration.emoji}
            </div>
            
            <h3 className="celebration-title">
              {currentCelebration.title}
            </h3>
            
            <p className="celebration-message">
              {currentCelebration.message}
            </p>
            
            {currentCelebration.animation === 'confetti' && (
              <div className="confetti-container">
                {Array.from({length: 50}).map((_, i) => (
                  <div key={i} className="confetti-piece" />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalRurekaDemo;