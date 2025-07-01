let rateLimit;
try {
  rateLimit = require('express-rate-limit');
} catch (err) {
  console.warn('⚠️ express-rate-limit package not found - rate limiting disabled');
  // Fallback middleware that does nothing
  rateLimit = () => (req, res, next) => next();
}

// Rate limiting middleware for API endpoints
const createRateLimit = (windowMs, max, message) => {
  if (typeof rateLimit !== 'function') {
    return (req, res, next) => next();
  }
  
  return rateLimit({
    windowMs: windowMs,
    max: max,
    message: {
      error: 'Too many requests',
      message: message,
      retryAfter: Math.ceil(windowMs / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      console.log(`🚦 Rate limit exceeded for ${req.path} from IP: ${req.ip}`);
      res.status(429).json({
        error: 'Too many requests',
        message: message,
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }
  });
};

// Different rate limits for different endpoints
const authRateLimit = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  5, // limit each IP to 5 requests per windowMs
  'Too many login attempts, please try again later'
);

const generalRateLimit = createRateLimit(
  1 * 60 * 1000, // 1 minute
  100, // limit each IP to 100 requests per minute
  'Too many requests from this IP, please try again later'
);

// AI rate limiting - more restrictive to protect OpenAI API
const aiRateLimit = createRateLimit(
  1 * 60 * 1000, // 1 minute
  10, // limit each IP to 10 AI requests per minute
  'Too many AI requests. Please wait a minute before trying again.'
);

// Admin rate limiting
const adminRateLimit = createRateLimit(
  5 * 60 * 1000, // 5 minutes
  50, // limit each IP to 50 admin requests per 5 minutes
  'Too many admin requests, please try again later'
);

module.exports = {
  authRateLimit,
  generalRateLimit,
  aiRateLimit,
  adminRateLimit
};