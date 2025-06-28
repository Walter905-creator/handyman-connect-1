// Simple fallback AI handler without dependencies
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

// Simple in-memory rate limiting per IP
const requestCounts = new Map();
const REQUEST_LIMIT = 5; // 5 requests per minute per IP
const WINDOW_MS = 60 * 1000; // 1 minute

// Clean up old entries every 2 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now - data.firstRequest > WINDOW_MS) {
      requestCounts.delete(ip);
    }
  }
}, 2 * 60 * 1000);

// Simple rate limiting middleware
const simpleLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, { count: 1, firstRequest: now });
    return next();
  }
  
  const data = requestCounts.get(ip);
  
  // Reset if window has passed
  if (now - data.firstRequest > WINDOW_MS) {
    requestCounts.set(ip, { count: 1, firstRequest: now });
    return next();
  }
  
  // Check if limit exceeded
  if (data.count >= REQUEST_LIMIT) {
    return res.status(429).json({
      error: 'Too many requests',
      message: 'Please wait a minute before making more AI requests',
      retryAfter: 60
    });
  }
  
  // Increment count
  data.count++;
  next();
};

// Initialize OpenAI
let openai = null;
try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    console.log('✅ Fallback OpenAI client initialized');
  }
} catch (err) {
  console.error('❌ Fallback OpenAI init failed:', err.message);
}

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: openai ? 'available' : 'unavailable',
    hasApiKey: !!process.env.OPENAI_API_KEY,
    mode: 'fallback',
    activeConnections: requestCounts.size
  });
});

// Simple AI endpoint with basic rate limiting
router.post('/ask', simpleLimiter, async (req, res) => {
  const { message } = req.body;
  
  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  if (message.length > 1000) {
    return res.status(400).json({ error: 'Message too long. Keep it under 1000 characters.' });
  }
  
  if (!openai) {
    return res.status(503).json({ 
      error: 'AI service unavailable', 
      message: 'OpenAI API key not configured' 
    });
  }
  
  try {
    console.log(`🤖 Processing AI request: ${message.substring(0, 50)}...`);
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant for home improvement and handyman services. Provide practical, safe, and helpful advice. Keep responses under 500 words.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });
    
    const reply = completion.choices[0].message.content;
    console.log('✅ AI response generated successfully');
    
    res.json({ 
      reply,
      mode: 'fallback'
    });
    
  } catch (err) {
    console.error('❌ AI error:', err.message);
    
    if (err.status === 429) {
      res.status(429).json({
        error: 'OpenAI rate limit exceeded',
        message: 'Too many requests to OpenAI. Please try again in a moment.',
        retryAfter: 60
      });
    } else if (err.status === 401) {
      res.status(500).json({
        error: 'AI authentication failed',
        message: 'Invalid OpenAI API key'
      });
    } else {
      res.status(500).json({
        error: 'AI assistant failed',
        message: 'Please try again'
      });
    }
  }
});

module.exports = router;
