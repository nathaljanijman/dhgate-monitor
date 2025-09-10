/**
 * HTTP Headers Utilities for DHgate Monitor
 * 
 * Handles security headers, performance headers, and response optimization
 */

/**
 * Enhanced header utility for performance and security
 */
export function getEnhancedHeaders(contentType = 'text/html', cacheControl = 'public, max-age=3600', extraHeaders = {}) {
  const baseHeaders = {
    'Content-Type': contentType,
    'Cache-Control': cacheControl,
    
    // Security headers
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    
    // Performance headers  
    'X-DNS-Prefetch-Control': 'on',
    'X-Powered-By': 'DHgate Monitor v2.0',
    
    // CORS for API endpoints
    'Access-Control-Allow-Origin': 'https://dhgate-monitor.com',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    
    ...extraHeaders
  };
  
  return baseHeaders;
}

/**
 * Content Security Policy generator
 */
export function getCSPHeader(pageType = 'default') {
  const policies = {
    default: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com",
      "frame-ancestors 'none'"
    ],
    dashboard: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "connect-src 'self' https://api.dhgate-monitor.com"
    ]
  };
  
  const policy = policies[pageType] || policies.default;
  return policy.join('; ');
}

/**
 * Resource hints for performance
 */
export function getResourceHints(route) {
  const hints = {
    '/': {
      'Link': [
        '</critical.css>; rel=preload; as=style',
        '</main.js>; rel=preload; as=script',
        '<https://fonts.googleapis.com>; rel=dns-prefetch'
      ]
    },
    '/service': {
      'Link': [
        '</forms.css>; rel=preload; as=style',
        '</service.js>; rel=preload; as=script'
      ]
    },
    '/dashboard': {
      'Link': [
        '</dashboard.css>; rel=preload; as=style',
        '</charts.js>; rel=preload; as=script',
        '<https://api.dhgate-monitor.com>; rel=dns-prefetch'
      ]
    }
  };
  
  return hints[route] || {};
}

/**
 * Security headers for different content types
 */
export function getSecurityHeaders(contentType, isAPI = false) {
  const baseSecurityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': isAPI ? 'DENY' : 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
  
  // Add CSP based on content type
  if (contentType.includes('text/html')) {
    baseSecurityHeaders['Content-Security-Policy'] = getCSPHeader();
  }
  
  // API specific headers
  if (isAPI) {
    baseSecurityHeaders['X-Robots-Tag'] = 'noindex, nofollow';
    baseSecurityHeaders['Cache-Control'] = 'no-store, no-cache, must-revalidate';
  }
  
  return baseSecurityHeaders;
}

/**
 * Performance monitoring headers
 */
export function getPerformanceHeaders(startTime, operation) {
  const duration = Date.now() - startTime;
  
  return {
    'Server-Timing': `total;dur=${duration}`,
    'X-Response-Time': `${duration}ms`,
    'X-Operation': operation,
    'X-Timestamp': new Date().toISOString()
  };
}

/**
 * Compression headers based on content
 */
export function getCompressionHeaders(contentType, size) {
  const headers = {};
  
  // Add compression hints for large responses
  if (size > 1024) { // 1KB
    headers['Vary'] = 'Accept-Encoding';
  }
  
  // Content-specific optimization hints
  if (contentType.includes('application/json')) {
    headers['X-Content-Type'] = 'json';
  } else if (contentType.includes('text/html')) {
    headers['X-Content-Type'] = 'html';
  }
  
  return headers;
}

/**
 * Complete response header builder
 */
export function buildResponseHeaders(options = {}) {
  const {
    contentType = 'text/html',
    cacheControl = 'public, max-age=3600',
    startTime = Date.now(),
    operation = 'unknown',
    route = '/',
    isAPI = false,
    responseSize = 0,
    extraHeaders = {}
  } = options;
  
  const headers = {
    ...getEnhancedHeaders(contentType, cacheControl),
    ...getSecurityHeaders(contentType, isAPI),
    ...getPerformanceHeaders(startTime, operation),
    ...getResourceHints(route),
    ...getCompressionHeaders(contentType, responseSize),
    ...extraHeaders
  };
  
  return headers;
}