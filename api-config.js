// API Configuration for DHgate Monitor
export const API_CONFIG = {
  // Regional endpoints for DHgate API - Updated with working endpoints
  regions: {
    global: {
      name: 'Global',
      baseUrl: 'https://www.dhgate.com',
      priority: 1,
      timeout: 15000,
      retryCount: 3,
      healthCheckUrl: '/',
      circuitBreaker: {
        failureThreshold: 3,
        recoveryTimeMs: 30000,
        monitorWindowMs: 300000
      }
    },
    'us-east': {
      name: 'US-East',
      baseUrl: 'https://www.dhgate.com',
      priority: 2,
      timeout: 12000,
      retryCount: 3,
      healthCheckUrl: '/',
      circuitBreaker: {
        failureThreshold: 3,
        recoveryTimeMs: 30000,
        monitorWindowMs: 300000
      }
    },
    'us-west': {
      name: 'US-West',
      baseUrl: 'https://www.dhgate.com',
      priority: 3,
      timeout: 12000,
      retryCount: 3,
      healthCheckUrl: '/',
      circuitBreaker: {
        failureThreshold: 3,
        recoveryTimeMs: 30000,
        monitorWindowMs: 300000
      }
    },
    europe: {
      name: 'Europe',
      baseUrl: 'https://www.dhgate.com',
      priority: 4,
      timeout: 15000,
      retryCount: 3,
      healthCheckUrl: '/',
      circuitBreaker: {
        failureThreshold: 3,
        recoveryTimeMs: 30000,
        monitorWindowMs: 300000
      }
    },
    'asia-pacific': {
      name: 'Asia-Pacific',
      baseUrl: 'https://www.dhgate.com',
      priority: 2,
      timeout: 20000, // Increased timeout for Asia-Pacific latency
      retryCount: 5, // Increased retry count for reliability
      healthCheckUrl: '/',
      circuitBreaker: {
        failureThreshold: 5, // More tolerant for Asia-Pacific
        recoveryTimeMs: 60000, // Longer recovery time
        monitorWindowMs: 600000 // 10 minutes monitoring window
      }
    }
  },

  // API endpoints
  endpoints: {
    search: '/api/search/stores',
    health: '/api/health',
    products: '/api/products',
    stores: '/api/stores'
  },

  // Enhanced retry configuration with Asia-Pacific optimization
  retry: {
    maxAttempts: 6, // Increased for better reliability
    baseDelay: 2000, // Increased base delay
    maxDelay: 30000, // Increased max delay for Asia-Pacific
    backoffMultiplier: 1.5, // Less aggressive backoff
    jitter: 0.2, // Increased jitter for better distribution
    retryOn: [408, 429, 500, 502, 503, 504, 522, 524], // Added Cloudflare errors
    exponentialBackoff: true,
    regionalDelays: {
      'asia-pacific': {
        baseDelay: 3000, // Longer base delay for Asia-Pacific
        maxDelay: 45000, // Longer max delay
        backoffMultiplier: 1.3 // Gentler backoff
      }
    }
  },

  // Rate limiting
  rateLimit: {
    requestsPerMinute: 60,
    burstLimit: 10,
    windowMs: 60000
  },

  // Monitoring thresholds
  monitoring: {
    failureThresholds: {
      critical: 5, // failures per 5 minutes
      warning: 3,  // failures per 5 minutes
      degraded: 2  // failures per 5 minutes
    },
    responseTimeThresholds: {
      slow: 5000,    // 5 seconds
      verySlow: 10000 // 10 seconds
    },
    healthCheckInterval: 60000 // 1 minute
  },

  // Cache configuration
  cache: {
    searchResults: 1800,    // 30 minutes
    healthCheck: 60,        // 1 minute
    storeDatabase: 21600,   // 6 hours
    apiResponses: 300       // 5 minutes
  },

  // Headers for API requests - Enhanced for better compatibility
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; DHgate-Monitor/2.0.0; +https://dhgate-monitor.com)',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9,nl;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'X-Requested-With': 'XMLHttpRequest',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
  },

  // Error messages
  errorMessages: {
    timeout: 'Request timed out',
    rateLimit: 'Rate limit exceeded',
    serverError: 'Server error occurred',
    networkError: 'Network error occurred',
    invalidResponse: 'Invalid response received'
  }
};

// Helper function to get region configuration
export function getRegionConfig(regionKey) {
  return API_CONFIG.regions[regionKey] || API_CONFIG.regions.global;
}

// Helper function to get all regions sorted by priority
export function getRegionsByPriority() {
  return Object.entries(API_CONFIG.regions)
    .sort(([,a], [,b]) => a.priority - b.priority)
    .map(([key, config]) => ({ key, ...config }));
}

// Helper function to calculate retry delay with exponential backoff
export function calculateRetryDelay(attempt, baseDelay = API_CONFIG.retry.baseDelay) {
  const delay = baseDelay * Math.pow(API_CONFIG.retry.backoffMultiplier, attempt);
  const jitter = delay * API_CONFIG.retry.jitter * Math.random();
  return Math.min(delay + jitter, API_CONFIG.retry.maxDelay);
}

// Circuit breaker implementation for regional endpoints
export class CircuitBreaker {
  constructor(region, options = {}) {
    this.region = region;
    this.failureCount = 0;
    this.lastFailureTime = 0;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.options = {
      failureThreshold: options.failureThreshold || 3,
      recoveryTimeMs: options.recoveryTimeMs || 30000,
      monitorWindowMs: options.monitorWindowMs || 300000
    };
  }

  canExecute() {
    if (this.state === 'CLOSED') return true;
    if (this.state === 'OPEN') {
      const timeSinceLastFailure = Date.now() - this.lastFailureTime;
      if (timeSinceLastFailure >= this.options.recoveryTimeMs) {
        this.state = 'HALF_OPEN';
        return true;
      }
      return false;
    }
    if (this.state === 'HALF_OPEN') return true;
    return false;
  }

  recordSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  recordFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.options.failureThreshold) {
      this.state = 'OPEN';
      console.warn(`🔴 Circuit breaker OPEN for ${this.region} region after ${this.failureCount} failures`);
    }
  }

  getState() {
    return {
      region: this.region,
      state: this.state,
      failureCount: this.failureCount,
      lastFailureTime: this.lastFailureTime
    };
  }
}
