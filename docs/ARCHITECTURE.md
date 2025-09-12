# 🏗️ Platform Architecture Documentation

Technische architectuur, design decisions en system patterns van het DHgate Monitor platform.

## 📋 Architecture Overzicht

DHgate Monitor is gebouwd als een moderne serverless application op Cloudflare Workers, met een focus op performance, scalability en developer experience. De architectuur volgt JAMstack principles met server-side rendering voor optimale UX.

### **High-Level Architecture**
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client        │    │  Cloudflare      │    │   Data Layer    │
│   (Browser)     │◄──►│  Edge Workers    │◄──►│   D1 + KV       │
│                 │    │                  │    │                 │
│ - Admin UI      │    │ - Authentication │    │ - Session Store │
│ - Real-time API │    │ - Business Logic │    │ - User Data     │
│ - Notifications │    │ - HTML Generation│    │ - Metrics Cache │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        │                        │                        │
        ▼                        ▼                        ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Global CDN    │    │   Edge Locations │    │  Health Checks  │
│                 │    │                  │    │                 │
│ - Static Assets │    │ - Sub-100ms      │    │ - Multi-region  │
│ - Font Files    │    │ - Auto-scaling   │    │ - Circuit Break │
│ - Images        │    │ - DDoS Protection│    │ - Monitoring    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🌐 Serverless Architecture

### **Cloudflare Workers Runtime**
```javascript
// Single file application entry point
export default {
  async fetch(request, env, ctx) {
    // 🔀 Router: URL-based request routing
    // 🔐 Auth: Session-based authentication  
    // 🎨 Render: Server-side HTML generation
    // 📊 API: RESTful JSON endpoints
    // 🎯 Assets: Static file serving
  }
}

// Architecture benefits:
// ✅ Zero cold starts (<1ms)
// ✅ Global edge deployment (200+ cities)
// ✅ Automatic scaling (0 to millions)
// ✅ Built-in DDoS protection
// ✅ Sub-100ms response times globally
```

### **Request Lifecycle**
```
1. DNS Resolution
   └── Cloudflare DNS (1.1.1.1) resolves domain

2. Edge Routing  
   └── Request routed to nearest edge location
   
3. Worker Execution
   ├── Authentication middleware
   ├── Request parsing & validation
   ├── Business logic execution
   ├── Data layer interaction
   └── Response generation

4. Response Optimization
   ├── Compression (gzip/brotli)
   ├── Caching headers
   ├── Security headers  
   └── CDN edge caching

5. Client Delivery
   └── Sub-100ms total response time
```

## 📊 Data Architecture

### **Storage Strategy**
```javascript
// Three-tier data storage
const dataArchitecture = {
  // 🏃‍♂️ Fast: In-memory caching (Worker runtime)
  cache: new Map(), // Request-scoped cache
  
  // ⚡ Faster: Key-Value storage (Cloudflare KV)
  kv: env.DHGATE_MONITOR_KV, // Global edge replication
  
  // 🗃️ Persistent: SQL database (Cloudflare D1)  
  db: env.DHGATE_MONITOR_DB // SQLite-compatible, distributed
};

// Data flow optimization
const dataFlow = {
  read: 'Memory → KV → D1 → External APIs',
  write: 'D1 → KV → Memory invalidation',
  cache: 'TTL-based expiration + manual invalidation'
};
```

### **Database Schema (D1)**
```sql
-- User management
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  subscription_tier TEXT DEFAULT 'free',
  api_quota INTEGER DEFAULT 1000,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Session management  
CREATE TABLE admin_sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  ip_address TEXT,
  user_agent TEXT
);

-- Affiliate performance
CREATE TABLE affiliate_performance (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  date DATE NOT NULL,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0.00,
  commission DECIMAL(10,2) DEFAULT 0.00
);

-- Platform metrics (historical)
CREATE TABLE platform_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  uptime_percent DECIMAL(5,3),
  response_time_ms INTEGER,
  error_rate DECIMAL(5,4),
  total_users INTEGER,
  cpu_usage DECIMAL(5,2),
  memory_usage DECIMAL(5,2),
  disk_usage DECIMAL(5,2)
);
```

### **KV Storage Structure**
```javascript
// Session storage
'session:${token}' → {
  userId: 'admin',
  created: 1640995200000,
  ipAddress: '192.168.1.1',
  userAgent: 'Mozilla/5.0...'
}

// Metrics cache
'dashboard_metrics_cache' → {
  uptime: "99.9%",
  responseTime: 142,
  totalUsers: 1285,
  timestamp: 1640995200000
}

// Notification state
'admin_notification_last_timestamp' → '1640995200000'

'client_notification_state_${clientId}' → {
  lastCheck: 1640995200000,
  acknowledgedNotifications: ['id1', 'id2'],
  preferences: { frequency: 'normal' }
}

// Security tracking
'security-log:${timestamp}:${event}' → {
  event: 'failed_login',
  details: { clientIP: '1.2.3.4', reason: 'invalid_credentials' },
  timestamp: '2024-09-12T10:30:00Z'
}
```

## 🎨 Frontend Architecture

### **Server-Side Rendering**
```javascript
// HTML generation pattern
function generatePage(data, options = {}) {
  return `
    <!DOCTYPE html>
    <html lang="${options.lang || 'nl'}">
      <head>
        ${generateMetadata(data)}
        ${generateCSS(options.theme)}
      </head>
      <body>
        ${generateNavigation(options)}
        ${generateContent(data, options)}
        ${generateJavaScript(options)}
      </body>
    </html>
  `;
}

// Benefits:
// ✅ SEO-friendly (complete HTML on first load)
// ✅ Fast First Contentful Paint (FCP)
// ✅ Progressive enhancement
// ✅ Works without JavaScript
// ✅ Reduces client-side complexity
```

### **CSS-in-JS Architecture**
```javascript
// Scoped component styling
function generateComponentCSS(theme = 'light') {
  return `
    <style>
      /* CSS Custom Properties voor theming */
      :root {
        --primary: ${theme === 'dark' ? '#60A5FA' : '#3B82F6'};
        --bg: ${theme === 'dark' ? '#0F172A' : '#FFFFFF'};
        --text: ${theme === 'dark' ? '#F1F5F9' : '#0F172A'};
      }
      
      /* Component-scoped styles */
      .admin-dashboard {
        background: var(--bg);
        color: var(--text);
      }
      
      /* Responsive breakpoints */
      @media (max-width: 768px) {
        .admin-sidebar {
          transform: translateX(-100%);
        }
      }
    </style>
  `;
}

// Advantages:
// ✅ No build step required
// ✅ Dynamic theming support  
// ✅ Component isolation
// ✅ Critical CSS inlined
// ✅ No FOUC (Flash of Unstyled Content)
```

### **Progressive Enhancement JavaScript**
```javascript
// Client-side enhancement pattern
document.addEventListener('DOMContentLoaded', () => {
  // 1. Core functionality (works without JS)
  setupBasicInteractions();
  
  // 2. Enhanced UX (requires JS)
  if ('fetch' in window) {
    setupRealTimeUpdates();
    setupNotificationPolling();
  }
  
  // 3. Advanced features (modern browsers)
  if ('IntersectionObserver' in window) {
    setupLazyLoading();
    setupScrollAnimations();
  }
});

// Graceful degradation ensures functionality for all users
```

## 🔧 System Design Patterns

### **Circuit Breaker Pattern**
```javascript
class CircuitBreaker {
  constructor(name, options = {}) {
    this.name = name;
    this.failureCount = 0;
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 60000;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now();
  }
  
  async execute(operation) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error(`Circuit breaker ${this.name} is OPEN`);
      }
      this.state = 'HALF_OPEN';
    }
    
    try {
      const result = await operation();
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
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.resetTimeout;
    }
  }
}

// Usage voor external API calls
const dhgateAPIBreaker = new CircuitBreaker('dhgate-api');
const response = await dhgateAPIBreaker.execute(() => 
  fetch('https://api.dhgate.com/data')
);
```

### **Observer Pattern (Notifications)**
```javascript
// Real-time notification system
class NotificationSystem {
  constructor() {
    this.subscribers = [];
    this.pollingInterval = 30000; // 30 seconds
    this.isPolling = false;
  }
  
  subscribe(callback) {
    this.subscribers.push(callback);
    
    // Start polling when first subscriber joins
    if (!this.isPolling) {
      this.startPolling();
    }
  }
  
  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter(sub => sub !== callback);
    
    // Stop polling when no subscribers
    if (this.subscribers.length === 0) {
      this.stopPolling();
    }
  }
  
  notify(notification) {
    this.subscribers.forEach(callback => {
      try {
        callback(notification);
      } catch (error) {
        console.error('Notification callback failed:', error);
      }
    });
  }
  
  async startPolling() {
    this.isPolling = true;
    
    while (this.isPolling) {
      try {
        const notifications = await this.fetchLatestNotifications();
        notifications.forEach(notification => this.notify(notification));
      } catch (error) {
        console.error('Notification polling failed:', error);
      }
      
      await new Promise(resolve => setTimeout(resolve, this.pollingInterval));
    }
  }
  
  stopPolling() {
    this.isPolling = false;
  }
}
```

### **Factory Pattern (HTML Generation)**
```javascript
// Component factory voor consistent UI generation
class ComponentFactory {
  static createKPICard(data, options = {}) {
    const { type = 'default', theme = 'light', size = 'medium' } = options;
    
    const variants = {
      default: () => this.generateDefaultCard(data, theme, size),
      metric: () => this.generateMetricCard(data, theme, size),
      trend: () => this.generateTrendCard(data, theme, size)
    };
    
    return variants[type]() || variants.default();
  }
  
  static createNavigation(config, options = {}) {
    const { layout = 'sidebar', responsive = true } = options;
    
    const layouts = {
      sidebar: () => this.generateSidebarNav(config, options),
      topbar: () => this.generateTopbarNav(config, options),
      mobile: () => this.generateMobileNav(config, options)
    };
    
    return layouts[layout]();
  }
  
  // Ensures consistent styling and behavior across components
}
```

## 📈 Performance Architecture

### **Caching Strategy**
```javascript
// Multi-level caching voor optimal performance
const cachingStrategy = {
  // L1: Worker runtime memory (request-scoped)
  level1: {
    storage: new Map(),
    ttl: 0, // Cleared after each request
    use: 'Computed values, parsed data'
  },
  
  // L2: Cloudflare KV (global edge)
  level2: {
    storage: 'DHGATE_MONITOR_KV',
    ttl: 30, // 30 seconds typical
    use: 'API responses, session data, metrics'
  },
  
  // L3: Cloudflare Cache API (CDN)
  level3: {
    storage: 'CloudFlare CDN',
    ttl: 3600, // 1 hour typical
    use: 'Static assets, public pages'
  },
  
  // L4: Browser cache
  level4: {
    storage: 'Client browser',
    ttl: 86400, // 24 hours typical
    use: 'CSS, JS, images, fonts'
  }
};

// Cache-aside pattern implementation
async function getCachedData(key, fallback, ttl = 300) {
  // Try L1 cache (memory)
  if (memoryCache.has(key)) {
    return memoryCache.get(key);
  }
  
  // Try L2 cache (KV)
  const cached = await env.DHGATE_MONITOR_KV?.get(key);
  if (cached) {
    const data = JSON.parse(cached);
    memoryCache.set(key, data); // Populate L1
    return data;
  }
  
  // Cache miss - fetch from source
  const data = await fallback();
  
  // Populate caches
  memoryCache.set(key, data);
  await env.DHGATE_MONITOR_KV?.put(key, JSON.stringify(data), {
    expirationTtl: ttl
  });
  
  return data;
}
```

### **Database Connection Pooling**
```javascript
// Connection pooling voor D1 database
class DatabasePool {
  constructor(env) {
    this.env = env;
    this.connections = new Map();
    this.maxConnections = 10;
  }
  
  async getConnection(key = 'default') {
    if (!this.connections.has(key)) {
      if (this.connections.size >= this.maxConnections) {
        // Reuse oldest connection
        const oldest = this.connections.keys().next().value;
        this.connections.delete(oldest);
      }
      
      this.connections.set(key, {
        db: this.env.DHGATE_MONITOR_DB,
        created: Date.now(),
        queries: 0
      });
    }
    
    const connection = this.connections.get(key);
    connection.queries++;
    return connection.db;
  }
  
  async query(sql, params = [], connectionKey = 'default') {
    const db = await this.getConnection(connectionKey);
    const stmt = db.prepare(sql);
    return await stmt.bind(...params).all();
  }
}
```

## 🔐 Security Architecture

### **Defense in Depth**
```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                         │
│  • HTTPS Only • CSP Headers • SameSite Cookies            │
└─────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                     Transport Layer                         │
│  • TLS 1.3 • HSTS • Certificate Pinning                   │
└─────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                        │
│  • Authentication • Session Management • Input Validation  │
└─────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                           │
│  • Encryption at Rest • Access Controls • Audit Logs      │
└─────────────────────────────────────────────────────────────┘
```

### **Security Middleware Stack**
```javascript
// Security middleware pipeline
const securityMiddleware = [
  // 1. Rate limiting (first line of defense)
  async (request) => {
    const clientIP = request.headers.get('CF-Connecting-IP');
    if (!(await rateLimiter.isAllowed(clientIP))) {
      throw new SecurityError('Rate limit exceeded');
    }
  },
  
  // 2. CSRF protection
  async (request) => {
    if (request.method === 'POST') {
      const origin = request.headers.get('Origin');
      const referer = request.headers.get('Referer');
      if (!validateOrigin(origin, referer)) {
        throw new SecurityError('CSRF validation failed');
      }
    }
  },
  
  // 3. Input validation
  async (request) => {
    const body = await request.text();
    if (!validateInput(body)) {
      throw new SecurityError('Input validation failed');
    }
  },
  
  // 4. Authentication (for protected routes)
  async (request) => {
    const token = getSessionToken(request);
    if (requiresAuth(request.url) && !(await verifySession(token))) {
      throw new AuthenticationError('Invalid session');
    }
  }
];
```

## 🚀 Deployment Architecture

### **CI/CD Pipeline**
```yaml
# .github/workflows/deploy.yml (conceptual)
name: Deploy DHgate Monitor

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run lint
      - run: npm run test:qa:full
      - run: npm run security:scan

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: wrangler deploy --env staging
      - run: npm run test:e2e:staging

  deploy-production:
    needs: deploy-staging
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: wrangler deploy --env production
      - run: npm run test:smoke:production
      - run: npm run monitor:deployment
```

### **Environment Management**
```javascript
// Environment-specific configuration
const environments = {
  development: {
    domain: 'localhost:3000',
    database: 'local-db',
    kvStorage: 'mock-kv',
    logLevel: 'debug',
    mockData: true
  },
  
  staging: {
    domain: 'staging.dhgate-monitor.com',
    database: 'dhgate-monitor-staging-db',
    kvStorage: 'dhgate-monitor-staging-kv',
    logLevel: 'info',
    mockData: false
  },
  
  production: {
    domain: 'dhgate-monitor.nathaljanijman.workers.dev',
    database: 'dhgate-monitor-production-db',
    kvStorage: 'dhgate-monitor-production-kv',
    logLevel: 'warn',
    mockData: false
  }
};

// Environment detection
function getEnvironment(request) {
  const hostname = new URL(request.url).hostname;
  
  if (hostname === 'localhost' || hostname.includes('127.0.0.1')) {
    return 'development';
  }
  
  if (hostname.includes('staging')) {
    return 'staging';
  }
  
  return 'production';
}
```

## 📊 Monitoring & Observability

### **Metrics Collection**
```javascript
// Performance metrics collection
class MetricsCollector {
  constructor(env) {
    this.env = env;
    this.metrics = new Map();
  }
  
  recordMetric(name, value, tags = {}) {
    const key = `${name}:${JSON.stringify(tags)}`;
    const existing = this.metrics.get(key) || { count: 0, sum: 0, min: Infinity, max: -Infinity };
    
    existing.count++;
    existing.sum += value;
    existing.min = Math.min(existing.min, value);
    existing.max = Math.max(existing.max, value);
    existing.avg = existing.sum / existing.count;
    
    this.metrics.set(key, existing);
  }
  
  async flush() {
    const timestamp = Date.now();
    
    for (const [key, metric] of this.metrics) {
      const [name, tagsJson] = key.split(':');
      const tags = JSON.parse(tagsJson);
      
      // Store in KV voor analysis
      await this.env.DHGATE_MONITOR_KV?.put(
        `metric:${timestamp}:${name}`,
        JSON.stringify({ ...metric, tags, timestamp }),
        { expirationTtl: 2592000 } // 30 days
      );
    }
    
    this.metrics.clear();
  }
}

// Usage throughout application
metricsCollector.recordMetric('api_response_time', responseTime, {
  endpoint: '/admin/dashboard',
  status: 200
});

metricsCollector.recordMetric('database_query_time', queryTime, {
  table: 'users',
  operation: 'select'
});
```

### **Health Check System**
```javascript
// Comprehensive health monitoring
class HealthChecker {
  constructor(env) {
    this.env = env;
    this.checks = new Map();
  }
  
  addCheck(name, checkFunction, options = {}) {
    this.checks.set(name, {
      function: checkFunction,
      timeout: options.timeout || 5000,
      critical: options.critical || false
    });
  }
  
  async runChecks() {
    const results = new Map();
    const startTime = Date.now();
    
    for (const [name, check] of this.checks) {
      try {
        const checkStartTime = Date.now();
        
        // Run check with timeout
        const result = await Promise.race([
          check.function(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Health check timeout')), check.timeout)
          )
        ]);
        
        results.set(name, {
          status: 'healthy',
          responseTime: Date.now() - checkStartTime,
          details: result
        });
        
      } catch (error) {
        results.set(name, {
          status: 'unhealthy',
          error: error.message,
          responseTime: Date.now() - checkStartTime
        });
      }
    }
    
    // Overall health status
    const unhealthyChecks = Array.from(results.values()).filter(r => r.status === 'unhealthy');
    const criticalUnhealthy = unhealthyChecks.some(r => this.checks.get(r.name)?.critical);
    
    return {
      status: criticalUnhealthy ? 'unhealthy' : 'healthy',
      checks: Object.fromEntries(results),
      totalTime: Date.now() - startTime,
      timestamp: new Date().toISOString()
    };
  }
}

// Health check registration
const healthChecker = new HealthChecker(env);

healthChecker.addCheck('database', async () => {
  const result = await env.DHGATE_MONITOR_DB?.prepare('SELECT 1').first();
  return { connected: !!result };
}, { critical: true });

healthChecker.addCheck('kv_storage', async () => {
  const testKey = `health_check_${Date.now()}`;
  await env.DHGATE_MONITOR_KV?.put(testKey, 'test');
  const value = await env.DHGATE_MONITOR_KV?.get(testKey);
  await env.DHGATE_MONITOR_KV?.delete(testKey);
  return { accessible: value === 'test' };
}, { critical: true });

healthChecker.addCheck('external_api', async () => {
  const response = await fetch('https://api.dhgate.com/ping');
  return { status: response.status, responseTime: response.responseTime };
}, { critical: false });
```

## 🔄 Scalability Patterns

### **Horizontal Scaling**
```javascript
// Auto-scaling Cloudflare Workers
// Workers automatically scale from 0 to millions of requests
// No configuration needed - handled by Cloudflare infrastructure

// Load balancing across edge locations
const globalEdgeDistribution = {
  'EU-West': ['London', 'Amsterdam', 'Frankfurt', 'Paris'],
  'US-East': ['New York', 'Washington DC', 'Atlanta', 'Miami'],
  'US-West': ['Los Angeles', 'San Francisco', 'Seattle', 'Denver'],
  'Asia-Pacific': ['Singapore', 'Tokyo', 'Sydney', 'Hong Kong'],
  'Other': ['São Paulo', 'Johannesburg', 'Mumbai', 'Toronto']
};

// Request routing happens automatically based on:
// - Geographic proximity
// - Edge server load
// - Network conditions
// - Anycast routing
```

### **Database Sharding Strategy**
```javascript
// Future: Database sharding voor massive scale
class DatabaseSharding {
  constructor(env) {
    this.shards = {
      users_eu: env.DB_SHARD_EU,
      users_us: env.DB_SHARD_US,
      users_asia: env.DB_SHARD_ASIA
    };
  }
  
  getShardForUser(userId) {
    // Shard based on user ID hash
    const hash = this.hashUserId(userId);
    const shardIndex = hash % Object.keys(this.shards).length;
    return Object.values(this.shards)[shardIndex];
  }
  
  async queryUser(userId, sql, params = []) {
    const shard = this.getShardForUser(userId);
    const stmt = shard.prepare(sql);
    return await stmt.bind(...params).all();
  }
  
  hashUserId(userId) {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}
```

## 🎯 Future Architecture Considerations

### **Microservices Evolution**
```javascript
// Potential service decomposition
const futureServices = {
  // Authentication service
  auth: {
    responsibilities: ['User login', 'Session management', 'JWT tokens'],
    endpoint: 'auth.dhgate-monitor.workers.dev'
  },
  
  // Notification service  
  notifications: {
    responsibilities: ['Real-time alerts', 'Email delivery', 'Push notifications'],
    endpoint: 'notifications.dhgate-monitor.workers.dev'
  },
  
  // Analytics service
  analytics: {
    responsibilities: ['Metrics collection', 'Performance tracking', 'Reporting'],
    endpoint: 'analytics.dhgate-monitor.workers.dev'
  },
  
  // Admin service
  admin: {
    responsibilities: ['Dashboard UI', 'User management', 'System config'],
    endpoint: 'admin.dhgate-monitor.workers.dev'
  }
};
```

### **Event-Driven Architecture**
```javascript
// Future: Event streaming with Cloudflare Queues
class EventBus {
  constructor(env) {
    this.queue = env.DHGATE_MONITOR_QUEUE;
  }
  
  async publish(event, data) {
    const message = {
      id: crypto.randomUUID(),
      event: event,
      data: data,
      timestamp: Date.now(),
      source: 'dhgate-monitor'
    };
    
    await this.queue.send(message);
  }
  
  async subscribe(eventType, handler) {
    // Consumer implementation
    return this.queue.consume(async (batch) => {
      for (const message of batch) {
        if (message.body.event === eventType) {
          await handler(message.body.data);
        }
      }
    });
  }
}

// Usage
const eventBus = new EventBus(env);

// Publish events
await eventBus.publish('user.login', { userId: 'admin', timestamp: Date.now() });
await eventBus.publish('metrics.updated', { metrics: dashboardData });

// Subscribe to events
await eventBus.subscribe('user.login', async (data) => {
  await logUserActivity(data);
  await updateUserStats(data);
});
```

## 📚 Architecture Decision Records (ADRs)

### **ADR-001: Serverless-First Architecture**
```markdown
# Decision: Adopt Cloudflare Workers voor core platform

## Status: Accepted

## Context
Need high-performance, globally distributed platform with minimal operational overhead.

## Decision  
Use Cloudflare Workers as primary compute platform.

## Consequences
✅ Sub-100ms global response times
✅ Zero infrastructure management
✅ Automatic scaling (0 to millions)
✅ Built-in DDoS protection
❌ Vendor lock-in to Cloudflare
❌ Limited runtime environment
❌ No long-running processes
```

### **ADR-002: Server-Side Rendering**
```markdown
# Decision: Server-side HTML generation instead of SPA

## Status: Accepted

## Context
Need SEO-friendly, fast-loading admin interface with progressive enhancement.

## Decision
Generate complete HTML on server, enhance with minimal client-side JavaScript.

## Consequences  
✅ Excellent SEO and social media sharing
✅ Fast First Contentful Paint (FCP)
✅ Works without JavaScript
✅ Reduced client-side complexity
❌ More server processing per request
❌ Less interactivity without JavaScript
```

### **ADR-003: Cookie-Based Authentication**
```markdown
# Decision: HTTP-only cookies voor session management

## Status: Accepted

## Context
Need secure authentication that resists XSS attacks and CSRF.

## Decision
Use HTTP-only, Secure, SameSite=Strict cookies with server-side session validation.

## Consequences
✅ Excellent XSS protection
✅ CSRF resistance  
✅ Simple client-side implementation
✅ Works with server-side rendering
❌ Not suitable for API-first clients
❌ Requires CORS configuration for cross-origin
```

---

**🏗️ Scalable Architecture | ⚡ Edge Performance | 🔐 Security-First Design**