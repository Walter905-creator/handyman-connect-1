const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

// Initialize OpenAI with better error handling
let openai = null;
try {
  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️ OPENAI_API_KEY not found - AI features will be disabled');
  } else {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    console.log('✅ OpenAI client initialized');
  }
} catch (err) {
  console.error('❌ Failed to initialize OpenAI:', err.message);
}

// Health check for AI service
router.get('/health', (req, res) => {
  res.json({
    status: openai ? 'available' : 'unavailable',
    hasApiKey: !!process.env.OPENAI_API_KEY,
    apiKeyPrefix: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 7) + '...' : 'none'
  });
});

router.post('/ask', async (req, res) => {
  const { message } = req.body;

  // Validate input
  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Check if OpenAI is available
  if (!openai) {
    return res.status(503).json({ 
      error: 'AI service unavailable', 
      message: 'OpenAI API key not configured' 
    });
  }

  try {
    console.log('🤖 Processing AI request:', message.substring(0, 50) + '...');
    
    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Using gpt-3.5-turbo instead of gpt-4 for better availability
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant for home improvement and handyman services. Provide practical, safe, and helpful advice.'
        },
        {
          role: 'user', 
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = chat.choices[0].message.content;
    console.log('✅ AI response generated successfully');
    
    res.json({ reply });
  } catch (err) {
    console.error('❌ AI error details:', {
      message: err.message,
      status: err.status,
      code: err.code,
      type: err.type
    });
    
    // Handle specific OpenAI errors
    if (err.status === 401) {
      res.status(500).json({ 
        error: 'AI service authentication failed',
        message: 'Invalid OpenAI API key'
      });
    } else if (err.status === 429) {
      res.status(429).json({ 
        error: 'AI service rate limited',
        message: 'Too many requests, please try again later'
      });
    } else if (err.status === 404) {
      res.status(500).json({ 
        error: 'AI model not found',
        message: 'The requested AI model is not available'
      });
    } else {
      res.status(500).json({ 
        error: 'AI assistant failed',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
      });
    }
  }
});

module.exports = router;
