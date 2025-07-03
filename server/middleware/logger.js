// Request logging middleware for Fixlo backend
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl || req.url;
  const userAgent = req.get('User-Agent') || 'Unknown';
  const ip = req.ip || req.connection.remoteAddress || 'Unknown';

  // Log the incoming request
  console.log(`📝 ${method} ${url} - ${ip} - ${timestamp}`);
  
  // Log user agent for debugging (but keep it short)
  if (process.env.NODE_ENV === 'development') {
    console.log(`   User-Agent: ${userAgent.substring(0, 100)}...`);
  }

  // Continue to next middleware
  next();
};

module.exports = requestLogger;
