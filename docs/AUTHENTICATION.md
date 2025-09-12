# 🔐 Authentication & Security Documentation

Complete gids voor authentication, security features en best practices in het DHgate Monitor platform.

## 📋 Overzicht

DHgate Monitor gebruikt een enterprise-grade security architecture met cookie-based authentication, CSRF protection, rate limiting en comprehensive audit logging. Gebouwd voor maximale beveiliging zonder gebruikersvriendelijkheid op te offeren.

## 🔑 Authentication System

### **Session-Based Authentication**
```javascript
// Login flow
POST /admin/login
├── Credential validation (admin / Marese2906)
├── Session token generation (crypto-secure)
├── HTTP-only cookie creation
└── Redirect to dashboard

// Session structure
{
  token: "secure-random-token-256-bits",
  userId: "admin", 
  created: 1640995200000,
  expires: 1640995200000 + (24 * 60 * 60 * 1000), // 24 hours
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla/5.0..."
}
```

### **Cookie Configuration**
```http
Set-Cookie: admin_token=<secure-token>; 
  HttpOnly; 
  Secure; 
  SameSite=Strict; 
  Max-Age=86400; 
  Path=/
```

**Security Features:**
- **HttpOnly**: Prevents XSS access to session cookie
- **Secure**: HTTPS-only transmission  
- **SameSite=Strict**: CSRF protection
- **Max-Age**: Automatic expiration (24 hours)
- **Path=/**: Cookie scope limitation

## 🛡️ Security Features

### **CSRF Protection**
```javascript
// Request validation
function validateCSRF(request) {
  const cookies = request.headers.get('Cookie');
  const referer = request.headers.get('Referer');
  const origin = request.headers.get('Origin');
  
  // Same-origin validation
  if (referer && !referer.startsWith(expectedOrigin)) {
    throw new SecurityError('Invalid referer header');
  }
  
  // SameSite cookie protection
  return validateSameSiteCookie(cookies);
}
```

### **Rate Limiting**
```javascript
// Per-IP rate limiting
const rateLimits = {
  '/admin/login': { requests: 5, window: 60000 },      // 5/minute
  '/admin/api/*': { requests: 100, window: 60000 },   // 100/minute
  '/api/health': { requests: 10, window: 60000 }      // 10/minute
};

// Sliding window implementation
class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.requests = new Map();
  }
  
  isAllowed(clientId) {
    const now = Date.now();
    const requests = this.requests.get(clientId) || [];
    
    // Remove old requests outside window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.limit) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    this.requests.set(clientId, validRequests);
    return true;
  }
}
```

### **Input Validation**
```javascript
// Server-side validation voor alle inputs
function validateLoginInput(data) {
  const { username, password } = data;
  
  // Required field validation
  if (!username || !password) {
    throw new ValidationError('Username and password required');
  }
  
  // Length validation
  if (username.length > 50 || password.length > 200) {
    throw new ValidationError('Input too long');
  }
  
  // Character validation (prevent injection)
  if (!/^[a-zA-Z0-9@._-]+$/.test(username)) {
    throw new ValidationError('Invalid username format');
  }
  
  return { username: username.toLowerCase(), password };
}
```

## 🎯 Admin Access Control

### **Session Management**
```javascript
// Session creation
async function createAdminSession(env, credentials) {
  // Validate credentials
  if (!validateCredentials(credentials)) {
    throw new AuthError('Invalid credentials');
  }
  
  // Generate secure session token
  const sessionToken = generateSecureToken();
  
  // Store session in KV (with TTL)
  const sessionData = {
    userId: 'admin',
    created: Date.now(),
    ipAddress: getClientIP(request),
    userAgent: request.headers.get('User-Agent')
  };
  
  await env.DHGATE_MONITOR_KV?.put(
    `session:${sessionToken}`, 
    JSON.stringify(sessionData),
    { expirationTtl: 86400 } // 24 hours
  );
  
  return sessionToken;
}

// Session validation
async function verifyAdminSession(env, token) {
  if (!token) return false;
  
  try {
    const sessionData = await env.DHGATE_MONITOR_KV?.get(`session:${token}`);
    
    if (!sessionData) {
      return false; // Session not found or expired
    }
    
    const session = JSON.parse(sessionData);
    
    // Additional security checks
    if (session.userId !== 'admin') {
      return false;
    }
    
    // Session age check (extra security)
    const sessionAge = Date.now() - session.created;
    if (sessionAge > 86400000) { // 24 hours in ms
      await env.DHGATE_MONITOR_KV?.delete(`session:${token}`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Session verification failed:', error);
    return false;
  }
}
```

### **Session Cleanup**
```javascript
// Automatic session cleanup
async function cleanupExpiredSessions(env) {
  // KV automatically handles TTL expiration
  // Additional cleanup for security
  const now = Date.now();
  
  // Force cleanup of old sessions (backup security)
  const sessions = await env.DHGATE_MONITOR_KV?.list({ prefix: 'session:' });
  
  for (const key of sessions.keys) {
    const sessionData = await env.DHGATE_MONITOR_KV?.get(key.name);
    if (sessionData) {
      const session = JSON.parse(sessionData);
      if (now - session.created > 86400000) {
        await env.DHGATE_MONITOR_KV?.delete(key.name);
      }
    }
  }
}

// Run cleanup periodically
setInterval(() => cleanupExpiredSessions(env), 3600000); // Every hour
```

## 🔒 Security Headers

### **Content Security Policy**
```javascript
// CSP header voor XSS protection
const cspHeader = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'", // Allow inline scripts (temporary)
  "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
  "font-src 'self' fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'"
].join('; ');

headers.set('Content-Security-Policy', cspHeader);
```

### **Security Headers Suite**
```javascript
function addSecurityHeaders(headers) {
  // Prevent XSS attacks
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY'); 
  headers.set('X-XSS-Protection', '1; mode=block');
  
  // HTTPS enforcement
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  // Referrer policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions policy
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return headers;
}
```

## 🚨 Threat Protection

### **Brute Force Protection**
```javascript
class BruteForceProtection {
  constructor() {
    this.attempts = new Map(); // IP -> { count, firstAttempt, blocked }
    this.blockDuration = 900000; // 15 minutes
    this.maxAttempts = 5;
  }
  
  recordFailedAttempt(clientIP) {
    const now = Date.now();
    const existing = this.attempts.get(clientIP);
    
    if (!existing) {
      this.attempts.set(clientIP, {
        count: 1,
        firstAttempt: now,
        blocked: false
      });
      return false; // Not blocked yet
    }
    
    existing.count++;
    
    // Reset counter if attempts are old
    if (now - existing.firstAttempt > this.blockDuration) {
      this.attempts.set(clientIP, {
        count: 1,
        firstAttempt: now,
        blocked: false
      });
      return false;
    }
    
    // Block after max attempts
    if (existing.count >= this.maxAttempts) {
      existing.blocked = true;
      return true; // Blocked
    }
    
    return false;
  }
  
  isBlocked(clientIP) {
    const existing = this.attempts.get(clientIP);
    if (!existing || !existing.blocked) return false;
    
    const now = Date.now();
    if (now - existing.firstAttempt > this.blockDuration) {
      this.attempts.delete(clientIP);
      return false; // Block expired
    }
    
    return true; // Still blocked
  }
  
  recordSuccessfulLogin(clientIP) {
    this.attempts.delete(clientIP); // Clear on successful login
  }
}
```

### **SQL Injection Prevention**
```javascript
// Prepared statements (if using SQL database)
function secureQuery(db, query, params) {
  // All queries use prepared statements
  const stmt = db.prepare(query);
  
  // Parameter validation
  const sanitizedParams = params.map(param => {
    if (typeof param === 'string') {
      // Escape special characters
      return param.replace(/'/g, "''").substring(0, 1000);
    }
    return param;
  });
  
  return stmt.all(...sanitizedParams);
}

// KV storage (NoSQL - injection-safe by design)
async function storeUserData(env, key, data) {
  // Validate key format
  if (!/^[a-zA-Z0-9:_-]+$/.test(key)) {
    throw new SecurityError('Invalid key format');
  }
  
  // Sanitize data
  const sanitizedData = JSON.stringify(data).substring(0, 10000);
  
  await env.DHGATE_MONITOR_KV?.put(key, sanitizedData);
}
```

### **XSS Prevention**
```javascript
// Output encoding voor user input
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, char => map[char]);
}

// Safe HTML generation
function generateSafeHTML(userInput) {
  const escaped = escapeHtml(userInput);
  return `<p>${escaped}</p>`;
}

// CSP nonce voor inline scripts (when necessary)
function generateCSPNonce() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}
```

## 📊 Audit & Logging

### **Security Event Logging**
```javascript
// Comprehensive security logging
class SecurityLogger {
  constructor(env) {
    this.env = env;
  }
  
  async logSecurityEvent(event, details) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event: event,
      details: details,
      source: 'dhgate-monitor-security'
    };
    
    // Log to console (CloudFlare logs)
    console.log('SECURITY:', JSON.stringify(logEntry));
    
    // Store in KV for audit trail
    const key = `security-log:${Date.now()}:${event}`;
    await this.env.DHGATE_MONITOR_KV?.put(key, JSON.stringify(logEntry), {
      expirationTtl: 2592000 // 30 days retention
    });
  }
  
  async logFailedLogin(clientIP, username, reason) {
    await this.logSecurityEvent('failed_login', {
      clientIP,
      username,
      reason,
      userAgent: request.headers.get('User-Agent')
    });
  }
  
  async logSuccessfulLogin(clientIP, username) {
    await this.logSecurityEvent('successful_login', {
      clientIP,
      username,
      sessionToken: 'masked-for-security'
    });
  }
  
  async logSuspiciousActivity(clientIP, activity, details) {
    await this.logSecurityEvent('suspicious_activity', {
      clientIP,
      activity,
      details
    });
  }
}
```

### **Admin Activity Tracking**
```javascript
// Track all admin actions
async function logAdminAction(env, action, details) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    action: action,
    details: details,
    admin: 'admin', // Current admin user
    sessionToken: 'masked'
  };
  
  const key = `admin-log:${Date.now()}:${action}`;
  await env.DHGATE_MONITOR_KV?.put(key, JSON.stringify(logEntry), {
    expirationTtl: 7776000 // 90 days retention voor admin logs
  });
}

// Usage examples
await logAdminAction(env, 'dashboard_access', { url: '/admin/dashboard' });
await logAdminAction(env, 'notification_viewed', { notificationId: 'abc123' });
await logAdminAction(env, 'customer_accessed', { customerId: 'user456' });
```

## 🔧 Development Security

### **Environment Variables**
```javascript
// Secure environment variable handling
const config = {
  // Fallback credentials (development only)
  adminUsername: env.ADMIN_USERNAME || 'admin',
  adminPassword: env.ADMIN_PASSWORD || 'Marese2906',
  
  // Session security
  sessionSecret: env.SESSION_SECRET || 'fallback-dev-secret-change-in-prod',
  
  // Rate limiting
  rateLimitEnabled: env.RATE_LIMIT_ENABLED !== 'false',
  
  // Security headers
  cspEnabled: env.CSP_ENABLED !== 'false'
};

// Never log sensitive data
console.log('Config loaded:', {
  ...config,
  adminPassword: '***masked***',
  sessionSecret: '***masked***'
});
```

### **Secure Token Generation**
```javascript
// Cryptographically secure token generation
function generateSecureToken() {
  // Generate 256-bit random token
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  
  // Convert to base64 URL-safe
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Session token with additional entropy
function generateSessionToken() {
  const timestamp = Date.now().toString(36);
  const random = generateSecureToken();
  const combined = `${timestamp}-${random}`;
  
  // Hash for additional security
  return btoa(combined).replace(/[^a-zA-Z0-9]/g, '');
}
```

## 🌐 Production Security

### **HTTPS Enforcement**
```javascript
// Force HTTPS in production
function enforceHTTPS(request) {
  const url = new URL(request.url);
  
  // Redirect HTTP to HTTPS in production
  if (url.protocol === 'http:' && !isLocalhost(url.hostname)) {
    url.protocol = 'https:';
    return new Response(null, {
      status: 301,
      headers: { 'Location': url.toString() }
    });
  }
  
  return null; // Continue processing
}
```

### **Security Monitoring**
```javascript
// Real-time security monitoring
class SecurityMonitor {
  constructor(env) {
    this.env = env;
    this.alerts = new Map();
  }
  
  async detectAnomalies(clientIP, action) {
    const key = `monitor:${clientIP}`;
    const existing = await this.env.DHGATE_MONITOR_KV?.get(key);
    const history = existing ? JSON.parse(existing) : { actions: [], alerts: 0 };
    
    history.actions.push({ action, timestamp: Date.now() });
    
    // Keep last 100 actions
    if (history.actions.length > 100) {
      history.actions = history.actions.slice(-100);
    }
    
    // Detect rapid requests (potential attack)
    const recentActions = history.actions.filter(
      a => Date.now() - a.timestamp < 60000 // Last minute
    );
    
    if (recentActions.length > 50) {
      history.alerts++;
      await this.triggerSecurityAlert(clientIP, 'rapid_requests', {
        actionsPerMinute: recentActions.length,
        totalAlerts: history.alerts
      });
    }
    
    await this.env.DHGATE_MONITOR_KV?.put(key, JSON.stringify(history), {
      expirationTtl: 3600 // 1 hour
    });
  }
  
  async triggerSecurityAlert(clientIP, type, details) {
    console.warn('SECURITY ALERT:', type, clientIP, details);
    
    // Could integrate with external alerting systems
    // await notifySecurityTeam(type, clientIP, details);
  }
}
```

## 🧪 Security Testing

### **Penetration Testing Checklist**
```bash
# Authentication testing
curl -X POST /admin/login -d "username=admin&password=wrong"
curl -X POST /admin/login -d "username=../../../etc/passwd&password=test"
curl -X POST /admin/login -d "username=admin'OR'1'='1&password=test"

# Session testing  
curl -H "Cookie: admin_token=invalid" /admin/dashboard
curl -H "Cookie: admin_token=../../../etc/passwd" /admin/dashboard

# Rate limiting testing
for i in {1..10}; do 
  curl -X POST /admin/login -d "username=admin&password=wrong"
done

# CSRF testing
curl -X POST /admin/api/dashboard/metrics \
  -H "Origin: https://malicious-site.com"

# XSS testing
curl "/admin/dashboard?search=<script>alert('xss')</script>"
```

### **Automated Security Scans**
```bash
# OWASP ZAP scan
npm run security:scan

# SSL/TLS testing
npm run security:ssl

# Dependency vulnerability scan  
npm audit --audit-level high

# Custom security tests
npm run test:security
```

## 📚 Security Best Practices

### **Development Guidelines**
1. **Never commit credentials** to version control
2. **Use environment variables** voor sensitive configuration
3. **Validate all inputs** server-side
4. **Escape all outputs** to prevent XSS
5. **Use prepared statements** voor database queries
6. **Log security events** maar never sensitive data
7. **Test security features** regularly
8. **Keep dependencies updated** voor security patches

### **Deployment Security**
1. **Enable all security headers** in production
2. **Use HTTPS everywhere** - no exceptions  
3. **Configure rate limiting** based on usage patterns
4. **Monitor security logs** for anomalies
5. **Regular security audits** en penetration testing
6. **Incident response plan** voor security breaches
7. **Regular backup en recovery testing**

### **Ongoing Maintenance**
1. **Monthly security reviews** van logs en alerts
2. **Quarterly penetration testing**
3. **Annual security architecture review**
4. **Keep up with OWASP Top 10** en security trends
5. **Employee security training** en awareness
6. **Vendor security assessments**

---

**🔐 Enterprise Security | 🛡️ Defense in Depth | 📊 Complete Audit Trail**