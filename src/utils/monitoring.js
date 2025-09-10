/**
 * Advanced Monitoring and Metrics System for DHgate Monitor
 * 
 * Handles performance monitoring, error tracking, and business metrics
 */

export class MonitoringService {
  /**
   * Performance metrics collection
   */
  static collectPerformanceMetrics(request, response, startTime, operation) {
    const duration = Date.now() - startTime;
    const url = new URL(request.url);
    
    const metrics = {
      timestamp: new Date().toISOString(),
      
      // Request metadata
      method: request.method,
      path: url.pathname,
      query: url.search,
      operation,
      
      // Response metadata
      status: response?.status || 200,
      duration,
      
      // Client metadata
      userAgent: request.headers.get('User-Agent'),
      country: request.cf?.country || 'unknown',
      city: request.cf?.city || 'unknown',
      colo: request.cf?.colo || 'unknown',
      
      // Performance categorization
      category: this.categorizePerformance(duration),
      isSlowRequest: duration > 1000,
      
      // Business metrics
      isBot: this.detectBot(request.headers.get('User-Agent')),
      language: this.extractLanguage(request),
      theme: this.extractTheme(request)
    };
    
    // Log different levels based on performance
    if (duration > 2000) {
      console.error('🚨 [CRITICAL SLOW]', JSON.stringify(metrics));
    } else if (duration > 1000) {
      console.warn('⚠️  [SLOW]', JSON.stringify(metrics));
    } else {
      console.log('📊 [METRICS]', JSON.stringify(metrics));
    }
    
    return metrics;
  }

  /**
   * Error tracking with context
   */
  static trackError(error, context = {}) {
    const errorMetrics = {
      timestamp: new Date().toISOString(),
      error: {
        message: error.message,
        stack: error.stack?.split('\n').slice(0, 5), // First 5 lines
        name: error.name
      },
      context: {
        operation: context.operation || 'unknown',
        userId: context.userId || 'anonymous',
        requestId: context.requestId || this.generateRequestId(),
        ...context
      },
      severity: this.categorizeError(error)
    };
    
    console.error('💥 [ERROR]', JSON.stringify(errorMetrics));
    return errorMetrics;
  }

  /**
   * Business metrics tracking
   */
  static trackBusinessEvent(eventName, data = {}) {
    const businessMetrics = {
      timestamp: new Date().toISOString(),
      event: eventName,
      data,
      
      // Business categorization
      category: this.categorizeBusinessEvent(eventName),
      revenue_impact: this.calculateRevenueImpact(eventName, data),
      user_journey_stage: this.determineJourneyStage(eventName)
    };
    
    console.log('💰 [BUSINESS]', JSON.stringify(businessMetrics));
    return businessMetrics;
  }

  /**
   * System health monitoring
   */
  static async collectSystemHealth(env) {
    const healthMetrics = {
      timestamp: new Date().toISOString(),
      
      // Database health
      database: await this.checkDatabaseHealth(env.DB),
      
      // Cache health
      cache: await this.checkCacheHealth(env.DHGATE_MONITOR_KV),
      
      // Memory usage (approximated)
      memory: {
        usage: process.memoryUsage?.() || { heapUsed: 0, heapTotal: 0 },
        timestamp: Date.now()
      },
      
      // Overall status
      status: 'healthy' // Will be determined by checks
    };
    
    // Determine overall health
    const issues = [];
    if (!healthMetrics.database.healthy) issues.push('database');
    if (!healthMetrics.cache.healthy) issues.push('cache');
    
    healthMetrics.status = issues.length === 0 ? 'healthy' : 
                          issues.length === 1 ? 'degraded' : 'unhealthy';
    healthMetrics.issues = issues;
    
    console.log('❤️  [HEALTH]', JSON.stringify(healthMetrics));
    return healthMetrics;
  }

  /**
   * Real User Monitoring (RUM) data collection
   */
  static collectRUMData(request) {
    const rumData = {
      timestamp: new Date().toISOString(),
      
      // Page performance data (from browser)
      performance: {
        navigationStart: Date.now(), // Placeholder
        domContentLoaded: null, // Will be filled by client-side
        loadComplete: null // Will be filled by client-side
      },
      
      // User experience metrics
      userExperience: {
        device: this.detectDevice(request.headers.get('User-Agent')),
        connection: this.estimateConnection(request.cf),
        viewport: null // Will be filled by client-side
      },
      
      // Business context
      page: new URL(request.url).pathname,
      referrer: request.headers.get('Referer'),
      campaign: this.extractCampaign(request.url)
    };
    
    console.log('👤 [RUM]', JSON.stringify(rumData));
    return rumData;
  }

  // Helper methods
  static categorizePerformance(duration) {
    if (duration < 100) return 'excellent';
    if (duration < 300) return 'good';
    if (duration < 1000) return 'fair';
    if (duration < 2000) return 'poor';
    return 'critical';
  }

  static categorizeError(error) {
    if (error.name === 'ValidationError') return 'warning';
    if (error.name === 'NetworkError') return 'error';
    if (error.name === 'SecurityError') return 'critical';
    return 'error';
  }

  static categorizeBusinessEvent(eventName) {
    const categories = {
      'subscription_created': 'conversion',
      'email_sent': 'engagement',
      'dashboard_viewed': 'retention',
      'error_occurred': 'quality'
    };
    return categories[eventName] || 'other';
  }

  static calculateRevenueImpact(eventName, data) {
    const impacts = {
      'subscription_created': 'high',
      'dashboard_viewed': 'medium',
      'email_opened': 'low'
    };
    return impacts[eventName] || 'none';
  }

  static determineJourneyStage(eventName) {
    const stages = {
      'landing_page_viewed': 'awareness',
      'form_started': 'consideration',
      'subscription_created': 'conversion',
      'dashboard_accessed': 'activation',
      'regular_usage': 'retention'
    };
    return stages[eventName] || 'unknown';
  }

  static detectBot(userAgent) {
    if (!userAgent) return false;
    const botPatterns = /bot|crawler|spider|scraper/i;
    return botPatterns.test(userAgent);
  }

  static extractLanguage(request) {
    const url = new URL(request.url);
    return url.searchParams.get('lang') || 'en';
  }

  static extractTheme(request) {
    const url = new URL(request.url);
    return url.searchParams.get('theme') || 'light';
  }

  static detectDevice(userAgent) {
    if (!userAgent) return 'unknown';
    if (/Mobile|Android|iPhone/i.test(userAgent)) return 'mobile';
    if (/Tablet|iPad/i.test(userAgent)) return 'tablet';
    return 'desktop';
  }

  static estimateConnection(cf) {
    // Use Cloudflare data to estimate connection quality
    return {
      quality: cf?.colo ? 'high' : 'unknown',
      region: cf?.country || 'unknown'
    };
  }

  static extractCampaign(url) {
    const urlObj = new URL(url);
    return {
      source: urlObj.searchParams.get('utm_source'),
      medium: urlObj.searchParams.get('utm_medium'),
      campaign: urlObj.searchParams.get('utm_campaign')
    };
  }

  static generateRequestId() {
    return Math.random().toString(36).substring(2, 15);
  }

  static async checkDatabaseHealth(db) {
    try {
      const result = await db.prepare('SELECT 1 as health').first();
      return {
        healthy: result?.health === 1,
        latency: Date.now(), // Simplified
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        healthy: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  static async checkCacheHealth(kv) {
    try {
      const testKey = 'health_check_' + Date.now();
      await kv.put(testKey, 'test', { expirationTtl: 60 });
      const result = await kv.get(testKey);
      await kv.delete(testKey);
      
      return {
        healthy: result === 'test',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        healthy: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}