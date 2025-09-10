/**
 * Security Utilities for DHgate Monitor
 * 
 * Handles input validation, sanitization, and security checks
 */

// Security configuration from main config
export const SECURITY_CONFIG = {
  MAX_EMAIL_LENGTH: 254,
  MAX_URL_LENGTH: 2048,
  ALLOWED_DOMAINS: ['dhgate.com', 'dhgate.co.uk'],
  RATE_LIMIT_WINDOW: 3600000, // 1 hour in ms
  MAX_REQUESTS_PER_WINDOW: 100
};

export class SecurityUtils {
  /**
   * Validates and sanitizes email addresses
   * @param {string} email - Email to validate
   * @returns {Object} Validation result with isValid flag and sanitized email
   */
  static validateEmail(email) {
    if (!email || typeof email !== 'string') {
      return { isValid: false, error: 'Email is required' };
    }
    
    const sanitized = email.trim().toLowerCase();
    
    if (sanitized.length > SECURITY_CONFIG.MAX_EMAIL_LENGTH) {
      return { isValid: false, error: 'Email too long' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitized)) {
      return { isValid: false, error: 'Invalid email format' };
    }
    
    return { isValid: true, sanitized };
  }

  /**
   * Validates DHgate shop URLs
   * @param {string} url - URL to validate
   * @returns {Object} Validation result
   */
  static validateShopUrl(url) {
    if (!url || typeof url !== 'string') {
      return { isValid: false, error: 'URL is required' };
    }
    
    const sanitized = url.trim();
    
    if (sanitized.length > SECURITY_CONFIG.MAX_URL_LENGTH) {
      return { isValid: false, error: 'URL too long' };
    }
    
    try {
      const parsed = new URL(sanitized);
      const isAllowedDomain = SECURITY_CONFIG.ALLOWED_DOMAINS.some(domain => 
        parsed.hostname.includes(domain)
      );
      
      if (!isAllowedDomain) {
        return { isValid: false, error: 'Only DHgate URLs are allowed' };
      }
      
      return { isValid: true, sanitized };
    } catch {
      return { isValid: false, error: 'Invalid URL format' };
    }
  }

  /**
   * Sanitizes HTML content to prevent XSS attacks
   * @param {string} input - Input to sanitize
   * @returns {string} Sanitized HTML
   */
  static sanitizeHtml(input) {
    if (!input || typeof input !== 'string') return '';
    
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  /**
   * Generates CSRF tokens for form protection
   * @returns {string} Secure random token
   */
  static generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Rate limiting check for requests
   * @param {string} key - Unique identifier for rate limiting
   * @param {Object} env - Cloudflare environment
   * @returns {boolean} Whether request is within limits
   */
  static async checkRateLimit(key, env) {
    try {
      const rateLimitKey = `rate_limit:${key}`;
      const current = await env.DHGATE_MONITOR_KV.get(rateLimitKey);
      const count = current ? parseInt(current) : 0;
      
      if (count >= SECURITY_CONFIG.MAX_REQUESTS_PER_WINDOW) {
        return false;
      }
      
      await env.DHGATE_MONITOR_KV.put(
        rateLimitKey,
        (count + 1).toString(),
        { expirationTtl: SECURITY_CONFIG.RATE_LIMIT_WINDOW / 1000 }
      );
      
      return true;
    } catch (error) {
      console.error('Rate limit check failed:', error);
      return true; // Allow on error to avoid blocking legitimate users
    }
  }
}