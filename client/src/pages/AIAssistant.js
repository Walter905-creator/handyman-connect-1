import React, { useState } from 'react';
import api from '../api';

export default function AIAssistant() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    try {
      const res = await api.post('/api/ai/ask', { message: input });
      setResponse(res.data.reply);
    } catch (err) {
      setResponse('Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Ask the AI Assistant</h2>
      <form onSubmit={askAI}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your home project..."
          rows={4}
          cols={50}
        /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </form>
      <div style={{ marginTop: 20 }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}
