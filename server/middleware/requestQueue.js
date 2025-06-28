// Request queue manager for AI requests to handle high concurrency
class RequestQueue {
  constructor(maxConcurrent = 3, timeout = 30000) {
    this.maxConcurrent = maxConcurrent;
    this.timeout = timeout;
    this.queue = [];
    this.active = 0;
  }

  async add(requestFn) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Request timeout'));
      }, this.timeout);

      this.queue.push({
        requestFn,
        resolve: (result) => {
          clearTimeout(timeoutId);
          resolve(result);
        },
        reject: (error) => {
          clearTimeout(timeoutId);
          reject(error);
        }
      });

      this.processQueue();
    });
  }

  async processQueue() {
    if (this.active >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    this.active++;
    const { requestFn, resolve, reject } = this.queue.shift();

    try {
      const result = await requestFn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.active--;
      this.processQueue(); // Process next item in queue
    }
  }

  getStats() {
    return {
      queueLength: this.queue.length,
      activeRequests: this.active,
      maxConcurrent: this.maxConcurrent
    };
  }
}

// Circuit breaker pattern for OpenAI API
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000, monitorTimeout = 10000) {
    this.threshold = threshold;
    this.timeout = timeout;
    this.monitorTimeout = monitorTimeout;
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
  }

  async execute(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN - too many failures');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
    }
  }

  getStats() {
    return {
      state: this.state,
      failureCount: this.failureCount,
      threshold: this.threshold,
      lastFailureTime: this.lastFailureTime
    };
  }
}

module.exports = {
  RequestQueue,
  CircuitBreaker
};
