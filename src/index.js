/**
 * DHgate Monitor - Modular Architecture Entry Point
 * 
 * This file imports and orchestrates all the modular components
 * for better code organization and maintainability.
 */

// Import utility modules
import { SecurityUtils, SECURITY_CONFIG } from './utils/security.js';
import { CacheUtils, PerformanceUtils, createPerformanceTracker, PERFORMANCE_CONFIG } from './utils/performance.js';
import { DatabaseUtils } from './utils/database.js';
import { getEnhancedHeaders, buildResponseHeaders } from './utils/headers.js';
import { MonitoringService } from './utils/monitoring.js';

// Re-export for main application
export {
  SecurityUtils,
  SECURITY_CONFIG,
  CacheUtils,
  PerformanceUtils,
  createPerformanceTracker,
  PERFORMANCE_CONFIG,
  DatabaseUtils,
  getEnhancedHeaders,
  buildResponseHeaders,
  MonitoringService
};

/**
 * Main application configuration
 */
export const APP_CONFIG = {
  version: '2.1.0',
  environment: 'production',
  features: {
    advancedMonitoring: true,
    performanceOptimizations: true,
    enhancedSecurity: true,
    modularArchitecture: true
  }
};

/**
 * Enhanced fetch handler with modular utilities
 */
export async function createEnhancedFetchHandler(originalHandler) {
  return async (request, env, ctx) => {
    const startTime = Date.now();
    const url = new URL(request.url);
    const operation = `${request.method} ${url.pathname}`;
    
    // Performance tracking
    const perf = createPerformanceTracker(operation);
    
    // Security checks
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateLimitPassed = await SecurityUtils.checkRateLimit(clientIP, env);
    
    if (!rateLimitPassed) {
      perf.end();
      return new Response('Rate limit exceeded', { 
        status: 429,
        headers: buildResponseHeaders({
          contentType: 'text/plain',
          cacheControl: 'no-cache',
          startTime,
          operation: 'rate_limit_exceeded'
        })
      });
    }
    
    // Monitor system health periodically
    if (Math.random() < 0.01) { // 1% of requests
      ctx.waitUntil(MonitoringService.collectSystemHealth(env));
    }
    
    // Collect RUM data
    const rumData = MonitoringService.collectRUMData(request);
    
    try {
      // Execute original handler
      perf.checkpoint('handler_start');
      const response = await originalHandler(request, env, ctx);
      perf.checkpoint('handler_complete');
      
      // Collect performance metrics
      const metrics = MonitoringService.collectPerformanceMetrics(
        request, 
        response, 
        startTime, 
        operation
      );
      
      // Track business events based on response
      if (response.status >= 200 && response.status < 300) {
        MonitoringService.trackBusinessEvent('successful_request', {
          path: url.pathname,
          method: request.method
        });
      }
      
      perf.end();
      return response;
      
    } catch (error) {
      // Error tracking
      MonitoringService.trackError(error, {
        operation,
        path: url.pathname,
        method: request.method,
        userAgent: request.headers.get('User-Agent')
      });
      
      perf.end();
      
      // Return enhanced error response
      return new Response('Internal Server Error', {
        status: 500,
        headers: buildResponseHeaders({
          contentType: 'text/plain',
          cacheControl: 'no-cache',
          startTime,
          operation: 'error_response',
          isAPI: true
        })
      });
    }
  };
}

/**
 * Database connection with enhanced utilities
 */
export function enhanceDatabase(db) {
  return {
    // Enhanced query execution
    query: async (sql, params = [], operation = 'query') => {
      return await DatabaseUtils.executeQuery(db, sql, params, operation);
    },
    
    // Cached queries
    cachedQuery: async (sql, params, cacheKey, ttl, env) => {
      return await DatabaseUtils.getCachedQuery(db, sql, params, cacheKey, ttl, env);
    },
    
    // Batch operations
    batchInsert: async (table, records, batchSize = 100) => {
      return await DatabaseUtils.batchInsert(db, table, records, batchSize);
    },
    
    // Health checks
    healthCheck: async () => {
      return await DatabaseUtils.healthCheck(db);
    },
    
    // Original database access
    raw: db
  };
}

/**
 * Cache with enhanced utilities  
 */
export function enhanceCache(kv) {
  return {
    // Smart caching
    set: async (key, data, ttl) => {
      return await CacheUtils.setCache(key, data, ttl, { DHGATE_MONITOR_KV: kv });
    },
    
    // Smart retrieval
    get: async (key, maxAge = null) => {
      return await CacheUtils.getCache(key, { DHGATE_MONITOR_KV: kv }, maxAge);
    },
    
    // Cache invalidation
    invalidate: async (pattern) => {
      return await CacheUtils.invalidateCache(pattern, { DHGATE_MONITOR_KV: kv });
    },
    
    // Original KV access
    raw: kv
  };
}

console.log('🚀 [INIT] DHgate Monitor modular architecture loaded', APP_CONFIG);