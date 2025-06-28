const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const { RequestQueue, CircuitBreaker } = require('../middleware/requestQueue');
const AICache = require('../middleware/aiCache');

// Initialize request management
const aiQueue = new RequestQueue(3, 30000); // Max 3 concurrent requests, 30s timeout
const aiCircuitBreaker = new CircuitBreaker(5, 60000); // 5 failures, 1 minute timeout
const aiCache = new AICache(100, 30 * 60 * 1000); // Cache 100 responses for 30 minutes

// Cleanup cache every 10 minutes
setInterval(() => {
  aiCache.cleanup();
}, 10 * 60 * 1000);

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
  const queueStats = aiQueue.getStats();
  const circuitStats = aiCircuitBreaker.getStats();
  const cacheStats = aiCache.getStats();
  
  res.json({
    status: openai ? 'available' : 'unavailable',
    hasApiKey: !!process.env.OPENAI_API_KEY,
    apiKeyPrefix: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 7) + '...' : 'none',
    queue: queueStats,
    circuitBreaker: circuitStats,
    cache: cacheStats
  });
});

router.post('/ask', async (req, res) => {
  const { message } = req.body;
  const startTime = Date.now();

  // Validate input
  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Validate message length (prevent abuse)
  if (message.length > 1000) {
    return res.status(400).json({ error: 'Message too long. Please keep it under 1000 characters.' });
  }

  // Check if OpenAI is available
  if (!openai) {
    return res.status(503).json({ 
      error: 'AI service unavailable', 
      message: 'OpenAI API key not configured' 
    });
  }

  try {
    console.log(`🤖 Processing AI request: ${message.substring(0, 50)}...`);
    
    // Check cache first
    const cachedResponse = aiCache.get(message);
    if (cachedResponse) {
      console.log('💾 Returning cached response');
      return res.json({ 
        reply: cachedResponse,
        cached: true,
        processingTime: Date.now() - startTime
      });
    }
    
    // Add request to queue with circuit breaker
    const result = await aiQueue.add(async () => {
      return await aiCircuitBreaker.execute(async () => {
        console.log(`🔄 Processing AI request: ${message.substring(0, 50)}...`);
        
        const chat = await openai.chat.completions.create({
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
          temperature: 0.7,
        });

        return chat.choices[0].message.content;
      });
    });

    // Cache the response
    aiCache.set(message, result);

    const processingTime = Date.now() - startTime;
    console.log(`✅ AI response generated in ${processingTime}ms`);
    
    res.json({ 
      reply: result,
      cached: false,
      processingTime: processingTime,
      queueStats: aiQueue.getStats()
    });

  } catch (err) {
    const processingTime = Date.now() - startTime;
    console.error('❌ AI error details:', {
      message: err.message,
      status: err.status,
      code: err.code,
      type: err.type,
      processingTime: processingTime
    });
    
    // Handle specific errors
    if (err.message === 'Request timeout') {
      res.status(408).json({ 
        error: 'Request timeout',
        message: 'The AI request took too long to process. Please try again with a shorter message.'
      });
    } else if (err.message === 'Circuit breaker is OPEN - too many failures') {
      res.status(503).json({ 
        error: 'AI service temporarily unavailable',
        message: 'The AI service is experiencing issues. Please try again in a few minutes.'
      });
    } else if (err.status === 401) {
      res.status(500).json({ 
        error: 'AI service authentication failed',
        message: 'Invalid OpenAI API key'
      });
    } else if (err.status === 429) {
      res.status(429).json({ 
        error: 'AI service rate limited',
        message: 'Too many requests to OpenAI. Please try again in a moment.',
        retryAfter: 60
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
