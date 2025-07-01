// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log the request
  console.log(`📝 ${req.method} ${req.url} - ${req.ip} - ${new Date().toISOString()}`);
  
  // Log the response when it finishes
  const originalSend = res.send;
  res.send = function(data) {
    const duration = Date.now() - start;
    console.log(`📤 ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
    originalSend.call(this, data);
  };
  
  next();
};

module.exports = requestLogger;
