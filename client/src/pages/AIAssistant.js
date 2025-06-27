import React, { useState, useEffect } from 'react';
import api from '../api';

export default function AIAssistant() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [aiStatus, setAiStatus] = useState(null);

  // Check AI service status on component mount
  useEffect(() => {
    checkAIStatus();
  }, []);

  const checkAIStatus = async () => {
    try {
      const res = await api.get('/api/ai/health');
      setAiStatus(res.data);
    } catch (err) {
      console.error('Failed to check AI status:', err);
      setAiStatus({ status: 'error', hasApiKey: false });
    }
  };

  const askAI = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse('');
    setError('');

    try {
      const res = await api.post('/api/ai/ask', { message: input });
      setResponse(res.data.reply);
    } catch (err) {
      console.error('AI request failed:', err);
      if (err.response?.data?.message) {
        setError(`AI Error: ${err.response.data.message}`);
      } else if (err.response?.status === 503) {
        setError('AI service is currently unavailable. Please check if OpenAI API key is configured.');
      } else {
        setError('Something went wrong with the AI assistant. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
      <h2>🤖 AI Assistant</h2>
      
      {/* AI Status Indicator */}
      {aiStatus && (
        <div style={{ 
          padding: 10, 
          marginBottom: 20, 
          borderRadius: 5, 
          backgroundColor: aiStatus.status === 'available' ? '#d4edda' : '#f8d7da',
          border: `1px solid ${aiStatus.status === 'available' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          <strong>AI Status:</strong> {aiStatus.status === 'available' ? '✅ Available' : '❌ Unavailable'}
          {!aiStatus.hasApiKey && ' (OpenAI API key not configured)'}
        </div>
      )}

      <form onSubmit={askAI}>
        <div style={{ marginBottom: 15 }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your home project, repairs, or improvements..."
            rows={4}
            style={{ 
              width: '100%', 
              padding: 10, 
              borderRadius: 5, 
              border: '1px solid #ccc',
              fontSize: 16
            }}
            disabled={loading || aiStatus?.status !== 'available'}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading || !input.trim() || aiStatus?.status !== 'available'}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: 16
          }}
        >
          {loading ? 'Thinking...' : 'Ask AI Assistant'}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div style={{ 
          marginTop: 20, 
          padding: 15, 
          backgroundColor: '#f8d7da', 
          border: '1px solid #f5c6cb',
          borderRadius: 5,
          color: '#721c24'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Response Display */}
      {response && (
        <div style={{ 
          marginTop: 20, 
          padding: 15, 
          backgroundColor: '#f8f9fa', 
          border: '1px solid #dee2e6',
          borderRadius: 5
        }}>
          <strong>AI Response:</strong>
          <div style={{ marginTop: 10, lineHeight: 1.6 }}>
            {response}
          </div>
        </div>
      )}

      {/* Help Text */}
      <div style={{ marginTop: 30, fontSize: 14, color: '#6c757d' }}>
        <h4>💡 Try asking about:</h4>
        <ul>
          <li>How to fix a leaky faucet</li>
          <li>Best paint for kitchen cabinets</li>
          <li>How to install a ceiling fan</li>
          <li>Electrical safety tips</li>
          <li>Home maintenance schedules</li>
        </ul>
      </div>
    </div>
  );
}
