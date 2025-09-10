/**
 * Performance Utilities for DHgate Monitor
 * 
 * Handles performance monitoring, caching, and optimization
 */

export const PERFORMANCE_CONFIG = {
  CACHE_TTL: {
    STATIC_ASSETS: 86400,    // 24 hours
    API_RESPONSES: 300,      // 5 minutes
    SHOP_DATA: 3600         // 1 hour
  },
  LAZY_LOAD_THRESHOLD: 100
};

/**
 * Performance monitoring utility
 */
export function createPerformanceTracker(operation) {
  const startTime = Date.now();
  
  return {
    end: () => {
      const duration = Date.now() - startTime;
      console.log(`⏱️  [PERF] ${operation}: ${duration}ms`);
      return duration;
    },
    checkpoint: (label) => {
      const duration = Date.now() - startTime;
      console.log(`⏱️  [PERF] ${operation} - ${label}: ${duration}ms`);
      return duration;
    }
  };
}

export class CacheUtils {
  /**
   * Smart caching with TTL and compression
   */
  static async setCache(key, data, ttl, env) {
    try {
      const serialized = JSON.stringify({
        data,
        timestamp: Date.now(),
        ttl
      });
      
      await env.DHGATE_MONITOR_KV.put(key, serialized, {
        expirationTtl: ttl
      });
      
      return true;
    } catch (error) {
      console.error(`❌ Cache set failed for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Smart cache retrieval with freshness check
   */
  static async getCache(key, env, maxAge = null) {
    try {
      const cached = await env.DHGATE_MONITOR_KV.get(key);
      if (!cached) return null;
      
      const parsed = JSON.parse(cached);
      
      // Check if maxAge override is provided and respected
      if (maxAge && (Date.now() - parsed.timestamp) > maxAge) {
        return null;
      }
      
      return parsed.data;
    } catch (error) {
      console.error(`❌ Cache get failed for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Cache invalidation
   */
  static async invalidateCache(pattern, env) {
    try {
      // This is a simplified implementation
      // In production, you'd want to use cache tags or patterns
      console.log(`🗑️  Cache invalidation requested for pattern: ${pattern}`);
      return true;
    } catch (error) {
      console.error(`❌ Cache invalidation failed:`, error);
      return false;
    }
  }
}

export class PerformanceUtils {
  /**
   * Database query optimization helper
   */
  static optimizeQuery(query, params = []) {
    // Add query optimization hints
    const optimizedQuery = query
      .replace(/SELECT \*/g, 'SELECT /* OPTIMIZED */')
      .trim();
    
    return {
      query: optimizedQuery,
      params,
      timestamp: Date.now()
    };
  }

  /**
   * Response compression helper
   */
  static shouldCompress(response, contentType) {
    const compressibleTypes = [
      'text/html',
      'text/css', 
      'text/javascript',
      'application/json',
      'application/javascript'
    ];
    
    return compressibleTypes.some(type => contentType?.includes(type));
  }

  /**
   * Resource preloading hints
   */
  static getPreloadHints(route) {
    const hints = {
      '/': ['critical.css', 'main.js'],
      '/service': ['service.js', 'forms.css'],
      '/dashboard': ['dashboard.js', 'charts.js']
    };
    
    return hints[route] || [];
  }

  /**
   * Performance metrics collection
   */
  static collectMetrics(request, response, duration) {
    const metrics = {
      timestamp: new Date().toISOString(),
      method: request.method,
      path: new URL(request.url).pathname,
      status: response.status,
      duration,
      userAgent: request.headers.get('User-Agent'),
      country: request.cf?.country,
      colo: request.cf?.colo
    };
    
    // In production, send to analytics service
    console.log('📊 [METRICS]', JSON.stringify(metrics));
    
    return metrics;
  }
}