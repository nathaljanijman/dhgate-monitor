# 🚀 Deployment Guide

Complete gids voor deployment, configuratie en productie management van het DHgate Monitor platform.

## 📋 Deployment Overzicht

DHgate Monitor draait op Cloudflare Workers met automatische global deployment naar 200+ edge locations. De deployment strategy is geoptimaliseerd voor zero-downtime updates en instant rollbacks.

## 🛠️ Prerequisites

### **Development Environment**
```bash
# Required tools
Node.js 18+ (LTS)
npm 8+ or yarn 1.22+
Git 2.30+

# Cloudflare tools
npm install -g wrangler@latest

# Verify installation
wrangler --version
node --version
npm --version
```

### **Cloudflare Account Setup**
```bash
# Login to Cloudflare
wrangler auth login

# Verify authentication
wrangler whoami

# List available accounts (if multiple)
wrangler accounts list
```

## 🌍 Environment Configuration

### **Environment Structure**
```
Development  → Local machine (localhost:3000)
Staging      → Cloudflare Workers (staging subdomain)
Production   → Cloudflare Workers (custom domain)
```

### **wrangler.toml Configuration**
```toml
name = "dhgate-monitor"
main = "cloudflare_app.js"
compatibility_date = "2024-09-12"

# Production environment (default)
[[kv_namespaces]]
binding = "DHGATE_MONITOR_KV"
id = "your-production-kv-id"

[[d1_databases]]
binding = "DHGATE_MONITOR_DB" 
database_name = "dhgate-monitor-prod"
database_id = "your-production-db-id"

# Staging environment
[env.staging]
name = "dhgate-monitor-staging"

[[env.staging.kv_namespaces]]
binding = "DHGATE_MONITOR_KV"
id = "your-staging-kv-id"

[[env.staging.d1_databases]]
binding = "DHGATE_MONITOR_DB"
database_name = "dhgate-monitor-staging"  
database_id = "your-staging-db-id"

# Development environment
[env.development]
name = "dhgate-monitor-dev"
# Uses local development setup
```

### **Environment Variables**
```bash
# Create .env file voor local development
cat > .env << 'EOF'
# Admin credentials (change in production!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Marese2906

# Security settings
SESSION_SECRET=your-super-secret-session-key-change-me
RATE_LIMIT_ENABLED=true
CSP_ENABLED=true

# Feature flags  
MOCK_DATA=true
DEBUG_MODE=true
SKIP_DB_INIT=true

# External APIs (if needed)
DHGATE_API_KEY=your-dhgate-api-key
AFFILIATE_API_SECRET=your-affiliate-secret
EOF

# Add to .gitignore
echo ".env" >> .gitignore
```

## 🚀 Deployment Process

### **1. Local Development**
```bash
# Clone and setup
git clone https://github.com/nathaljanijman/dhgate-monitor.git
cd dhgate-monitor

# Install dependencies
npm install

# Start development server
npm run dev
# ✅ Server running at http://localhost:3000
# ✅ Admin panel: http://localhost:3000/admin/login

# Test admin login
# Username: admin
# Password: Marese2906
```

### **2. Pre-deployment Testing**
```bash
# Run comprehensive test suite
npm run test:qa:full
# Expected: 26/27 tests passing (96.3% success rate)

# Check code quality  
npm run lint
# Should pass without errors

# Performance validation
npm run perf:check
# Response times should be <200ms

# Security scan
npm run security:scan
# No high-severity vulnerabilities
```

### **3. Staging Deployment**
```bash
# Deploy to staging environment
wrangler deploy --env staging

# Verify staging deployment
curl -I https://dhgate-monitor-staging.your-account.workers.dev
# Should return 200 OK

# Run smoke tests on staging
npm run test:smoke:staging
# Basic functionality verification
```

### **4. Production Deployment**
```bash
# Deploy to production
wrangler deploy --env production

# Alternative: Deploy to default environment
wrangler deploy

# Verify production deployment  
curl -I https://dhgate-monitor.nathaljanijman.workers.dev
# Should return 200 OK

# Monitor deployment
wrangler tail --environment production
# Watch real-time logs
```

## 🔧 Database Setup

### **D1 Database Initialization**
```bash
# Create production database
wrangler d1 create dhgate-monitor-prod

# Create staging database  
wrangler d1 create dhgate-monitor-staging

# Get database IDs from output and update wrangler.toml

# Initialize schema (if needed)
wrangler d1 execute dhgate-monitor-prod --file=schema.sql

# Verify database
wrangler d1 execute dhgate-monitor-prod --command="SELECT 1 as test"
```

### **KV Storage Setup**
```bash
# Create production KV namespace
wrangler kv:namespace create "DHGATE_MONITOR_KV"

# Create staging KV namespace
wrangler kv:namespace create "DHGATE_MONITOR_KV" --env staging

# Get namespace IDs from output and update wrangler.toml

# Test KV access
wrangler kv:key put "test_key" "test_value" --binding=DHGATE_MONITOR_KV
wrangler kv:key get "test_key" --binding=DHGATE_MONITOR_KV
wrangler kv:key delete "test_key" --binding=DHGATE_MONITOR_KV
```

## 🔐 Security Configuration

### **Admin Credentials**
```bash
# Set secure production credentials via Cloudflare dashboard
# DO NOT use default credentials in production!

# Or set via wrangler secrets
wrangler secret put ADMIN_USERNAME --env production
# Enter: your-secure-admin-username

wrangler secret put ADMIN_PASSWORD --env production  
# Enter: your-very-secure-password-with-special-chars!@#$

# Set session secret
wrangler secret put SESSION_SECRET --env production
# Enter: 64-character-random-string-for-session-encryption
```

### **Domain Configuration**
```bash
# Custom domain setup (optional)
# 1. Add domain to Cloudflare DNS
# 2. Create CNAME record pointing to your-worker.workers.dev
# 3. Add route in Cloudflare Workers dashboard

# Example DNS setup:
# admin.dhgate-monitor.com CNAME dhgate-monitor.nathaljanijman.workers.dev
```

### **SSL/TLS Configuration**
```bash
# Cloudflare automatically provides SSL certificates
# Ensure "Full (strict)" SSL mode in Cloudflare dashboard
# HSTS headers are included in application code
```

## 📊 Monitoring Setup

### **Real-time Logging**
```bash
# Monitor production logs
wrangler tail --environment production

# Filter specific logs
wrangler tail --environment production --grep "ERROR"

# Monitor staging logs
wrangler tail --environment staging

# Save logs to file
wrangler tail --environment production > deployment-logs.txt
```

### **Health Check Validation**
```bash
# Automated health check script
#!/bin/bash
ENDPOINT="https://dhgate-monitor.nathaljanijman.workers.dev"

echo "🔍 Running post-deployment health checks..."

# Basic connectivity
echo "Testing basic connectivity..."
curl -f "$ENDPOINT" || { echo "❌ Basic connectivity failed"; exit 1; }

# Admin login page
echo "Testing admin login page..."
curl -f "$ENDPOINT/admin/login" || { echo "❌ Admin login failed"; exit 1; }

# API endpoints (with auth)
echo "Testing API endpoints..."
curl -f -H "Cookie: admin_token=test" "$ENDPOINT/admin/api/dashboard/metrics" || echo "⚠️ API endpoint requires valid auth"

echo "✅ All health checks passed!"
```

### **Performance Monitoring**
```bash
# Monitor response times
#!/bin/bash
ENDPOINT="https://dhgate-monitor.nathaljanijman.workers.dev"

echo "📊 Testing response times..."

for i in {1..5}; do
  TIME=$(curl -w "%{time_total}" -s -o /dev/null "$ENDPOINT")
  echo "Request $i: ${TIME}s"
done

echo "🎯 Target: <0.2s globally"
```

## 🔄 CI/CD Pipeline

### **GitHub Actions Setup**
```yaml
# .github/workflows/deploy.yml
name: Deploy DHgate Monitor

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: |
          npm run lint
          npm run test:qa:full
          
      - name: Security scan
        run: npm run security:scan

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Deploy to staging
        run: |
          npm install -g wrangler@latest
          wrangler deploy --env staging
          
      - name: Test staging
        run: npm run test:smoke:staging

  deploy-production:
    needs: deploy-staging
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        
      - name: Deploy to production
        run: |
          npm install -g wrangler@latest
          wrangler deploy --env production
          
      - name: Health check
        run: |
          sleep 30  # Wait for deployment propagation
          npm run test:health:production
          
      - name: Notify success
        run: echo "🚀 Production deployment successful!"
```

### **Secrets Management**
```bash
# Required GitHub secrets:
CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
ADMIN_USERNAME=production-admin-username  
ADMIN_PASSWORD=production-admin-password
SESSION_SECRET=production-session-secret

# Cloudflare API token permissions needed:
# - Zone:Zone Settings:Read
# - Zone:Zone:Read  
# - Account:Cloudflare Workers:Edit
```

## 📈 Production Optimization

### **Performance Tuning**
```javascript
// Production-specific optimizations
const productionConfig = {
  // Cache aggressively in production
  cacheHeaders: {
    'Cache-Control': 'public, max-age=3600',
    'CDN-Cache-Control': 'public, max-age=86400'
  },
  
  // Minimize logs in production
  logLevel: 'warn',
  
  // Enable all optimizations
  compression: true,
  minification: true,
  
  // Security headers
  securityHeaders: {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block'
  }
};
```

### **Resource Limits**
```javascript
// Cloudflare Workers limits (as of 2024)
const limits = {
  // Free tier
  free: {
    requests: 100000, // per day
    cpuTime: 10, // milliseconds per request
    memory: 128, // MB
    scriptSize: 1, // MB
    duration: 30 // seconds
  },
  
  // Paid tier  
  paid: {
    requests: 10000000, // per month
    cpuTime: 30, // milliseconds per request
    memory: 128, // MB
    scriptSize: 5, // MB
    duration: 30 // seconds
  }
};

// Monitor usage in production
console.log('Worker execution time:', Date.now() - startTime, 'ms');
```

## 🔧 Maintenance & Updates

### **Rolling Updates**
```bash
# Zero-downtime deployment process
echo "🚀 Starting rolling deployment..."

# 1. Deploy to staging first
wrangler deploy --env staging
npm run test:smoke:staging || { echo "❌ Staging tests failed"; exit 1; }

# 2. Gradual production rollout (Cloudflare handles automatically)  
wrangler deploy --env production

# 3. Monitor for 5 minutes
echo "⏳ Monitoring deployment for 5 minutes..."
timeout 300 wrangler tail --environment production | grep -i error || true

# 4. Validate deployment
npm run test:health:production || { echo "❌ Health check failed"; exit 1; }

echo "✅ Deployment successful!"
```

### **Rollback Strategy**
```bash
# Emergency rollback procedure
#!/bin/bash

echo "🚨 Initiating emergency rollback..."

# Get previous deployment
PREVIOUS_VERSION=$(wrangler deployments list --env production | head -2 | tail -1 | awk '{print $1}')

if [ -z "$PREVIOUS_VERSION" ]; then
  echo "❌ No previous version found"
  exit 1
fi

# Rollback to previous version
wrangler rollback --env production "$PREVIOUS_VERSION"

# Verify rollback
sleep 10
curl -f https://dhgate-monitor.nathaljanijman.workers.dev || { 
  echo "❌ Rollback verification failed"
  exit 1 
}

echo "✅ Rollback completed successfully to version $PREVIOUS_VERSION"
```

### **Database Migrations**
```bash
# Database migration workflow
#!/bin/bash

echo "📊 Running database migrations..."

# 1. Backup current database (if supported)
wrangler d1 execute dhgate-monitor-prod --command=".backup backup-$(date +%Y%m%d-%H%M%S).sql"

# 2. Run migration on staging first
wrangler d1 execute dhgate-monitor-staging --file=migrations/001-add-user-columns.sql

# 3. Test staging after migration
npm run test:db:staging || { echo "❌ Staging migration failed"; exit 1; }

# 4. Run migration on production
wrangler d1 execute dhgate-monitor-prod --file=migrations/001-add-user-columns.sql

# 5. Verify production migration
npm run test:db:production || { echo "❌ Production migration failed"; exit 1; }

echo "✅ Database migrations completed"
```

## 📊 Monitoring & Alerting

### **Application Monitoring**
```bash
# Set up monitoring dashboard
curl -X POST https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/dhgate-monitor/tail \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "filters": [
      {"outcome": "exception"},
      {"outcome": "exceededCpu"},
      {"outcome": "exceededMemory"}
    ]
  }'
```

### **Custom Alerts**
```javascript
// Alert integration (webhook example)
async function sendAlert(level, message, details = {}) {
  if (level === 'critical') {
    // Send to monitoring service
    await fetch('https://hooks.slack.com/your-webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🚨 CRITICAL: ${message}`,
        attachments: [{
          color: 'danger',
          fields: Object.entries(details).map(([key, value]) => ({
            title: key,
            value: value,
            short: true
          }))
        }]
      })
    });
  }
}

// Usage in error handlers
catch (error) {
  await sendAlert('critical', 'Admin login system failure', {
    error: error.message,
    url: request.url,
    timestamp: new Date().toISOString()
  });
}
```

## 🔍 Troubleshooting

### **Common Deployment Issues**

#### **Authentication Errors**
```bash
# Problem: wrangler auth issues
# Solution:
wrangler logout
wrangler auth login
wrangler whoami  # Verify
```

#### **KV/D1 Binding Issues**
```bash
# Problem: "binding not found" errors
# Solution: Check wrangler.toml bindings match code

# List available bindings
wrangler kv:namespace list
wrangler d1 list

# Verify binding names in code match wrangler.toml
grep -r "DHGATE_MONITOR" cloudflare_app.js
```

#### **Deployment Timeout**
```bash
# Problem: Deployment hangs or times out
# Solution: 
wrangler deploy --compatibility-date=2024-09-12 --verbose

# Check script size (max 1MB free / 5MB paid)
ls -lh cloudflare_app.js

# Reduce bundle size if needed
npm run minify  # If available
```

### **Production Issues**

#### **High Error Rate**
```bash
# Monitor error patterns
wrangler tail --environment production --grep "ERROR" --format json

# Check resource usage
wrangler metrics --environment production

# Review recent deployments
wrangler deployments list --environment production
```

#### **Performance Degradation**
```bash
# Check response times from multiple locations
for region in us-east us-west eu-west asia-pacific; do
  echo "Testing from $region..."
  curl -w "Response time: %{time_total}s\n" -s -o /dev/null \
    https://dhgate-monitor.nathaljanijman.workers.dev
done

# Target: <200ms globally
```

## 📚 Best Practices

### **Deployment Checklist**
```markdown
## Pre-deployment
- [ ] All tests pass locally
- [ ] Code reviewed and approved  
- [ ] No hardcoded secrets in code
- [ ] Environment variables configured
- [ ] Database migrations prepared
- [ ] Rollback plan documented

## Deployment
- [ ] Deploy to staging first
- [ ] Run full test suite on staging
- [ ] Monitor staging for 10+ minutes
- [ ] Deploy to production during low-traffic window
- [ ] Monitor production deployment logs
- [ ] Verify all functionality works

## Post-deployment
- [ ] Run health checks
- [ ] Monitor error rates for 30+ minutes  
- [ ] Verify performance metrics acceptable
- [ ] Update documentation
- [ ] Notify team of successful deployment
```

### **Security Best Practices**
```markdown
## Production Security
- [ ] Change default admin credentials
- [ ] Use strong, unique passwords (20+ characters)
- [ ] Enable all security headers
- [ ] Use HTTPS everywhere (Cloudflare handles this)
- [ ] Regular security scans
- [ ] Monitor access logs for anomalies
- [ ] Keep dependencies updated
```

---

**🚀 Zero-Downtime Deployments | 🌍 Global Edge Distribution | 📊 Production Monitoring**