// Simple in-memory cache for AI responses
class AICache {
  constructor(maxSize = 100, ttl = 30 * 60 * 1000) { // 30 minutes TTL
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  // Generate cache key from message
  generateKey(message) {
    return message.toLowerCase().trim().replace(/\s+/g, ' ');
  }

  // Get cached response
  get(message) {
    const key = this.generateKey(message);
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    // Check if cache entry has expired
    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.response;
  }

  // Set cached response
  set(message, response) {
    const key = this.generateKey(message);
    
    // If cache is at max size, remove oldest entry
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      response,
      timestamp: Date.now()
    });
  }

  // Get cache stats
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      ttl: this.ttl
    };
  }

  // Clear expired entries
  cleanup() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

module.exports = AICache;
