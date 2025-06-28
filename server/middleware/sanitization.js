// Input sanitization middleware
let validator;
try {
  validator = require('validator');
} catch (err) {
  console.warn('⚠️ Validator package not found - basic sanitization only');
  validator = {
    escape: (str) => str.replace(/[&<>"']/g, (match) => {
      const escape = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;'
      };
      return escape[match];
    })
  };
}

const sanitizeInput = (req, res, next) => {
  // Sanitize string inputs
  const sanitizeObject = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        // Trim whitespace
        obj[key] = obj[key].trim();
        
        // Escape HTML to prevent XSS
        obj[key] = validator.escape(obj[key]);
        
        // Remove any potential script tags
        obj[key] = obj[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitizeObject(obj[key]);
      }
    }
  };

  if (req.body && typeof req.body === 'object') {
    sanitizeObject(req.body);
  }

  if (req.query && typeof req.query === 'object') {
    sanitizeObject(req.query);
  }

  if (req.params && typeof req.params === 'object') {
    sanitizeObject(req.params);
  }

  next();
};

module.exports = sanitizeInput;
