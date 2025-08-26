// API Configuration for DHgate Monitor
export const API_CONFIG = {
  // Regional endpoints for DHgate API
  regions: {
    global: {
      name: 'Global',
      baseUrl: 'https://www.dhgate.com',
      priority: 1,
      timeout: 10000,
      retryCount: 3
    },
    'us-east': {
      name: 'US-East',
      baseUrl: 'https://us-east.dhgate.com',
      priority: 2,
      timeout: 8000,
      retryCount: 2
    },
    'us-west': {
      name: 'US-West',
      baseUrl: 'https://us-west.dhgate.com',
      priority: 3,
      timeout: 8000,
      retryCount: 2
    },
    europe: {
      name: 'Europe',
      baseUrl: 'https://eu.dhgate.com',
      priority: 4,
      timeout: 12000,
      retryCount: 2
    },
    'asia-pacific': {
      name: 'Asia-Pacific',
      baseUrl: 'https://ap.dhgate.com',
      priority: 5,
      timeout: 15000,
      retryCount: 3
    }
  },

  // API endpoints
  endpoints: {
    search: '/api/search/stores',
    health: '/api/health',
    products: '/api/products',
    stores: '/api/stores'
  },

  // Retry configuration
  retry: {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    backoffMultiplier: 2,
    jitter: 0.1
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

  // Headers for API requests
  headers: {
    'User-Agent': 'DHgate-Monitor/2.0.0',
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'X-Requested-With': 'XMLHttpRequest'
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
