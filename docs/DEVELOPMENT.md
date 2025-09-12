# 👨‍💻 Development Guide

Complete developer onboarding en best practices voor het DHgate Monitor platform development.

## 📋 Development Setup

### **Prerequisites**
```bash
Node.js 18+ (LTS recommended)
npm 8+ or yarn 1.22+
Git 2.30+
VS Code (recommended) with extensions:
  - Cloudflare Workers
  - JavaScript/TypeScript
  - GitLens
  - Prettier
  - ESLint
```

### **Project Setup**
```bash
# Clone repository
git clone https://github.com/nathaljanijman/dhgate-monitor.git
cd dhgate-monitor

# Install dependencies
npm install

# Setup development environment
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
# Server: http://localhost:3000
# Admin: http://localhost:3000/admin/login (admin/Marese2906)
```

### **Development Environment**
```javascript
// Local development configuration
const isDevelopment = process.env.NODE_ENV === 'development';

const config = {
  // Database
  database: isDevelopment ? 'local.db' : env.DB,
  
  // KV Storage (local mock in development)  
  kvStorage: isDevelopment ? new Map() : env.DHGATE_MONITOR_KV,
  
  // Authentication
  adminCredentials: {
    username: env.ADMIN_USERNAME || 'admin',
    password: env.ADMIN_PASSWORD || 'Marese2906'
  },
  
  // Development features
  debugMode: isDevelopment,
  mockData: isDevelopment,
  skipDatabaseInit: isDevelopment
};
```

## 🏗️ Project Architecture

### **File Structure**
```
dhgate-monitor/
├── cloudflare_app.js           # Main application entry
├── enhanced_admin_dashboard.js # Admin dashboard UI
├── admin-navigation.js         # Navigation & header system
├── package.json               # Dependencies & scripts
├── wrangler.toml             # Cloudflare Workers config
├── README.md                 # Project overview
├── docs/                     # Feature documentation
│   ├── ADMIN_SYSTEM.md
│   ├── API_REFERENCE.md
│   ├── AUTHENTICATION.md
│   ├── DASHBOARD_METRICS.md
│   └── DEVELOPMENT.md
└── assets/                   # Static assets
    ├── DHGateVector.png
    ├── logo.png
    └── icons/
```

### **Code Organization**
```javascript
// cloudflare_app.js structure
export default {
  async fetch(request, env, ctx) {
    // 1. Router & request handling
    // 2. Authentication middleware  
    // 3. Admin route handlers
    // 4. API endpoints
    // 5. Static asset serving
    // 6. Error handling
  }
}

// Key sections:
// - Authentication functions (lines 4400-4500)
// - Admin handlers (lines 4800-5200) 
// - API routes (lines 7300-7500)
// - Navigation system (lines 1200-1800)
// - Dashboard UI (lines 1900-2500)
```

## 🎯 Development Workflow

### **Feature Development**
```bash
# 1. Create feature branch
git checkout -b feature/new-admin-feature

# 2. Development cycle
npm run dev          # Start dev server
# Edit code, test changes
npm run lint         # Check code quality
npm run test:qa:full # Run test suite

# 3. Commit changes
git add .
git commit -m "feat: add new admin feature

- Description of changes
- Impact on existing functionality  
- Testing performed

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# 4. Deploy to staging
npm run deploy       # Deploy to production/staging

# 5. Merge to main
git push origin feature/new-admin-feature
# Create pull request via GitHub
```

### **Hot Reload Development**
```javascript
// wrangler dev provides hot reload
// Files watched for changes:
// - cloudflare_app.js (main application)
// - enhanced_admin_dashboard.js (admin UI)
// - admin-navigation.js (navigation system)
// - Static assets in /assets

// Changes trigger automatic restart
// No need to manually restart dev server
```

## 🧱 Code Patterns & Conventions

### **Function Naming**
```javascript
// Handler functions
async function handleAdminDashboard(request, env) { }
async function handleAdminLogin(request, env) { }
async function handleLatestNotificationsAPI(request, env) { }

// Utility functions  
function generateAdminSidebarNavigation() { }
function generateEnhancedAdminDashboard() { }
function validateAdminSession() { }

// Helper functions
function escapeHtml(text) { }
function formatTimestamp(date) { }
function calculateMetrics(data) { }
```

### **Error Handling**
```javascript
// Consistent error handling pattern
async function handleAPIRequest(request, env) {
  try {
    // Authentication check
    const isAuthenticated = await verifyAdminSession(env, getSessionToken(request));
    if (!isAuthenticated) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Business logic
    const result = await performOperation(request, env);
    
    // Success response
    return new Response(JSON.stringify({
      success: true,
      data: result,
      timestamp: Date.now()
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('API request failed:', error);
    
    return new Response(JSON.stringify({
      error: error.message || 'Internal server error',
      timestamp: Date.now()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

### **HTML Generation**
```javascript
// Template literal patterns voor HTML generation
function generatePageHTML(data, options = {}) {
  const { lang = 'nl', theme = 'light' } = options;
  
  return `
    <!DOCTYPE html>
    <html lang="${lang}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${escapeHtml(data.title)} - DHgate Monitor</title>
        ${generateMetaTags(data)}
        ${generateCSS(theme)}
      </head>
      <body class="theme-${theme}">
        ${generateNavigation(lang, theme)}
        <main>
          ${generateContent(data, lang)}
        </main>
        ${generateJavaScript(options)}
      </body>
    </html>
  `;
}
```

### **CSS-in-JS Patterns**
```javascript
// Scoped CSS generation
function generateComponentCSS() {
  return `
    <style>
      /* Component-specific styles */
      .admin-component {
        display: flex;
        gap: 1rem;
        padding: 1rem;
      }
      
      /* Responsive design */
      @media (max-width: 768px) {
        .admin-component {
          flex-direction: column;
        }
      }
      
      /* Theme support */
      .theme-dark .admin-component {
        background: var(--dark-bg);
        color: var(--dark-text);
      }
    </style>
  `;
}
```

## 🔧 Development Tools

### **Available Scripts**
```json
{
  "scripts": {
    "dev": "wrangler dev --local --port 3000",
    "deploy": "wrangler deploy",
    "lint": "eslint *.js",
    "test:qa:full": "node test-runner.js",
    "perf:check": "node performance-tester.js",
    "deploy:validate": "npm run test:qa:full && npm run deploy"
  }
}
```

### **Debugging Tools**
```javascript
// Console logging patterns
console.log('🔧 Development mode: Using mock data for admin dashboard');
console.log('✅ Using fallback admin credentials');
console.log('⚠️ No KV binding available, allowing session for development');
console.log('📊 Loading fresh real-time notifications...');
console.error('❌ Error in admin notifications handler:', error);

// Performance monitoring
console.time('admin-dashboard-generation');
const dashboardHTML = generateEnhancedAdminDashboard(data);
console.timeEnd('admin-dashboard-generation');

// Debug information
if (isDevelopment) {
  console.log('Debug info:', {
    requestUrl: request.url,
    headers: Object.fromEntries(request.headers.entries()),
    timestamp: new Date().toISOString()
  });
}
```

### **Browser DevTools Integration**
```javascript
// Client-side debugging
window.dhgateMonitor = {
  debug: true,
  version: '2.0.0',
  
  // Debug functions
  refreshMetrics: () => refreshDashboardData(),
  getNotifications: () => fetchLatestNotifications(),
  clearSession: () => document.cookie = 'admin_token=; Max-Age=0',
  
  // Performance monitoring
  performance: {
    metricsRefresh: [],
    notificationPolling: []
  }
};

// Usage in browser console:
// dhgateMonitor.refreshMetrics()
// dhgateMonitor.getNotifications() 
```

## 🧪 Testing Strategy

### **Manual Testing Checklist**
```markdown
## Admin System Testing
- [ ] Login with correct credentials
- [ ] Login with incorrect credentials (should fail)
- [ ] Dashboard loads within 3 seconds
- [ ] All KPI cards show data
- [ ] Notifications dropdown works
- [ ] Real-time metrics update every 30s
- [ ] Sidebar navigation responsive
- [ ] Logout clears session

## API Testing  
- [ ] /admin/api/dashboard/metrics returns valid JSON
- [ ] /admin/api/notifications/latest works
- [ ] Authentication required voor protected endpoints
- [ ] Rate limiting works (test with multiple requests)
- [ ] Error handling returns proper status codes

## UI/UX Testing
- [ ] Mobile responsive (test on 320px+)
- [ ] Touch interactions work on mobile
- [ ] Keyboard navigation accessible
- [ ] Color contrast meets WCAG standards
- [ ] Loading states provide feedback
```

### **Automated Testing**
```javascript
// Simple API test runner
async function runAPITests() {
  const tests = [
    {
      name: 'Dashboard metrics API',
      url: '/admin/api/dashboard/metrics',
      method: 'GET',
      headers: { Cookie: 'admin_token=test-token' },
      expectedStatus: 200
    },
    {
      name: 'Notifications API', 
      url: '/admin/api/notifications/latest',
      method: 'GET',
      headers: { Cookie: 'admin_token=test-token' },
      expectedStatus: 200
    }
  ];
  
  for (const test of tests) {
    try {
      const response = await fetch(test.url, {
        method: test.method,
        headers: test.headers
      });
      
      const passed = response.status === test.expectedStatus;
      console.log(`${passed ? '✅' : '❌'} ${test.name}: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${test.name}: ${error.message}`);
    }
  }
}

// Run tests
runAPITests();
```

### **Performance Testing**
```javascript
// Client-side performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.name.includes('/admin/api/')) {
      console.log(`API ${entry.name}: ${entry.duration.toFixed(2)}ms`);
      
      // Track voor analysis
      if (window.dhgateMonitor) {
        window.dhgateMonitor.performance.push({
          api: entry.name,
          duration: entry.duration,
          timestamp: Date.now()
        });
      }
    }
  }
});

performanceObserver.observe({ entryTypes: ['navigation', 'measure'] });
```

## 🎨 UI Development

### **Design System Variables**
```css
:root {
  /* Colors */
  --primary-blue: #3B82F6;
  --success-green: #10B981;  
  --warning-orange: #F59E0B;
  --error-red: #EF4444;
  
  /* Backgrounds */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8FAFC;
  --bg-tertiary: #F1F5F9;
  
  /* Text */
  --text-primary: #0F172A;
  --text-secondary: #64748B;
  --text-muted: #94A3B8;
  
  /* Spacing (8px grid) */
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  
  /* Typography */
  --font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
}
```

### **Component Development**
```javascript
// Reusable component pattern
function generateKPICard(data, options = {}) {
  const { icon, trend, color = 'blue' } = options;
  
  return `
    <div class="kpi-card kpi-card--${color}">
      <div class="kpi-header">
        <div class="kpi-icon ${color}">
          ${icon}
        </div>
        ${trend ? `<div class="kpi-trend">${trend}</div>` : ''}
      </div>
      <div class="kpi-value" data-metric="${data.key}">
        ${data.value}
      </div>
      <div class="kpi-label">
        ${data.label}
      </div>
    </div>
  `;
}

// Usage
const uptimeCard = generateKPICard(
  { key: 'uptime', value: '99.9%', label: 'Uptime' },
  { icon: uptimeIcon, trend: '+0.03%', color: 'success' }
);
```

## 📦 Deployment

### **Development Deployment**
```bash
# Quick deployment to test changes
npm run deploy

# With validation
npm run deploy:validate

# Monitor deployment
wrangler tail --environment production
```

### **Environment Management**
```toml
# wrangler.toml configuration
name = "dhgate-monitor"
main = "cloudflare_app.js"
compatibility_date = "2024-09-12"

[env.development]
name = "dhgate-monitor-dev"

[env.staging]  
name = "dhgate-monitor-staging"

[env.production]
name = "dhgate-monitor"

# Deploy to specific environment
# wrangler deploy --env staging
```

### **Production Deployment Checklist**
```markdown
## Pre-deployment
- [ ] All tests passing
- [ ] Code reviewed  
- [ ] No console.log statements in production code
- [ ] Environment variables configured
- [ ] Database migrations ready (if any)

## Deployment
- [ ] Deploy to staging first
- [ ] Smoke test staging environment
- [ ] Deploy to production  
- [ ] Monitor deployment logs
- [ ] Verify all functionality works

## Post-deployment  
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify all admin functions work
- [ ] Update documentation if needed
```

## 🐛 Debugging Common Issues

### **Development Server Issues**
```bash
# Server won't start
npm install        # Reinstall dependencies
rm -rf node_modules package-lock.json
npm install       # Fresh install

# Port already in use
lsof -ti:3000 | xargs kill -9   # Kill process on port 3000
npm run dev       # Restart

# KV storage errors in development
# Expected - KV not available locally, uses fallbacks
```

### **Authentication Issues**
```javascript
// Check session cookie
document.cookie.split(';').find(c => c.trim().startsWith('admin_token='));

// Clear session
document.cookie = 'admin_token=; Max-Age=0; Path=/';

// Check authentication endpoint
fetch('/admin/api/dashboard/metrics', {
  credentials: 'same-origin'
}).then(r => console.log(r.status));
```

### **Performance Issues**
```javascript
// Monitor API performance
console.time('api-call');
fetch('/admin/api/dashboard/metrics')
  .then(r => {
    console.timeEnd('api-call');
    return r.json();
  })
  .then(data => console.log('Response:', data));

// Check for memory leaks
setInterval(() => {
  if (performance.memory) {
    console.log('Memory usage:', {
      used: Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB',
      total: Math.round(performance.memory.totalJSHeapSize / 1048576) + 'MB'
    });
  }
}, 10000);
```

## 🚀 Advanced Development

### **Custom API Endpoints**
```javascript
// Add new API endpoint
// 1. Add route in main switch statement
case '/admin/api/custom/endpoint':
  return await handleCustomEndpoint(request, env);

// 2. Implement handler
async function handleCustomEndpoint(request, env) {
  const isAuthenticated = await verifyAdminSession(env, getSessionToken(request));
  if (!isAuthenticated) {
    return unauthorizedResponse();
  }
  
  try {
    // Custom logic here
    const data = await getCustomData(env);
    
    return new Response(JSON.stringify({
      success: true,
      data: data
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return errorResponse(error.message);
  }
}
```

### **Database Integration**
```javascript
// D1 Database queries (when available)
async function queryDatabase(env, sql, params = []) {
  if (!env.DB) {
    console.log('🔧 Development mode: Database not available, using mock data');
    return mockDatabaseResponse();
  }
  
  try {
    const stmt = env.DB.prepare(sql);
    const result = await stmt.bind(...params).all();
    return result;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}

// Usage
const users = await queryDatabase(env, 
  'SELECT * FROM users WHERE active = ?', 
  [true]
);
```

### **Real-time Features**
```javascript
// WebSocket-like polling pattern
class RealTimeUpdater {
  constructor(endpoint, interval = 30000) {
    this.endpoint = endpoint;
    this.interval = interval;
    this.callbacks = [];
    this.active = false;
  }
  
  start() {
    this.active = true;
    this.poll();
  }
  
  stop() {
    this.active = false;
  }
  
  subscribe(callback) {
    this.callbacks.push(callback);
  }
  
  async poll() {
    if (!this.active) return;
    
    try {
      const response = await fetch(this.endpoint, {
        credentials: 'same-origin'
      });
      
      if (response.ok) {
        const data = await response.json();
        this.callbacks.forEach(callback => callback(data));
      }
    } catch (error) {
      console.error('Polling failed:', error);
    }
    
    if (this.active) {
      setTimeout(() => this.poll(), this.interval);
    }
  }
}

// Usage
const metricsUpdater = new RealTimeUpdater('/admin/api/dashboard/metrics');
metricsUpdater.subscribe(data => updateDashboard(data));
metricsUpdater.start();
```

## 📚 Learning Resources

### **Cloudflare Workers**
- [Workers Documentation](https://developers.cloudflare.com/workers/)
- [D1 Database](https://developers.cloudflare.com/d1/)
- [KV Storage](https://developers.cloudflare.com/kv/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### **Web Standards**
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### **Project-Specific**
- Platform documentation in `/docs` folder
- Code examples in main application files
- API reference voor all endpoints
- Security guidelines en best practices

---

**👨‍💻 Developer Experience | 🚀 Productive Workflow | 📚 Comprehensive Guides**