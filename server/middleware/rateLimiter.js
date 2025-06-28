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
  15 * 60 * 1000, // 15 minutes
  100, // limit each IP to 100 requests per windowMs
  'Too many requests from this IP, please try again later'
);

const aiRateLimit = createRateLimit(
  60 * 1000, // 1 minute
  10, // limit each IP to 10 AI requests per minute
  'Too many AI requests, please wait a moment'
);

const notificationRateLimit = createRateLimit(
  60 * 60 * 1000, // 1 hour
  20, // limit each IP to 20 job requests per hour
  'Too many job requests, please wait before submitting another'
);

module.exports = {
  authRateLimit,
  generalRateLimit,
  aiRateLimit,
  notificationRateLimit
};
