# 🔗 API Reference Documentation

Complete referentie voor alle DHgate Monitor API endpoints - authenticatie, admin functies, real-time data en meer.

## 📋 API Overzicht

Het DHgate Monitor platform biedt een comprehensive REST API voor admin management, real-time metrics, notifications en affiliate data. Alle endpoints zijn beveiligd met cookie-based authentication.

### **Base URL**
```
Development: http://localhost:3000
Production:  https://dhgate-monitor.nathaljanijman.workers.dev
```

### **Authentication**
```
Method: Cookie-based sessions
Cookie: admin_token=<session-token>
Security: HTTP-only, Secure, SameSite=Strict
```

## 🔐 Authentication Endpoints

### **POST /admin/login**
Admin login endpoint voor session creation.

**Request:**
```http
POST /admin/login
Content-Type: application/x-www-form-urlencoded

username=admin&password=Marese2906
```

**Response (Success):**
```http
HTTP/1.1 302 Found
Set-Cookie: admin_token=<secure-token>; HttpOnly; Secure; SameSite=Strict
Location: /admin/dashboard?lang=nl&theme=light
```

**Response (Error):**
```http
HTTP/1.1 401 Unauthorized
Content-Type: text/html

<html>Invalid credentials</html>
```

### **GET /admin/logout**
Logout endpoint met session cleanup.

**Request:**
```http
GET /admin/logout
Cookie: admin_token=<session-token>
```

**Response:**
```http
HTTP/1.1 302 Found
Set-Cookie: admin_token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0
Location: /admin/login?lang=nl&theme=light
```

## 🎛️ Admin Interface Endpoints

### **GET /admin/dashboard**
Main admin dashboard page met real-time metrics.

**Request:**
```http
GET /admin/dashboard?lang=nl&theme=light
Cookie: admin_token=<session-token>
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: text/html

<html><!-- Complete admin dashboard HTML --></html>
```

**Features:**
- Real-time KPI cards (uptime, response time, users)
- System resource monitoring (CPU, memory, disk)
- Performance charts en analytics
- Notification integration

### **GET /admin/notifications** 
Notification management interface.

**Request:**
```http
GET /admin/notifications?lang=nl&theme=light
Cookie: admin_token=<session-token>
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: text/html

<html><!-- Notification management page --></html>
```

**Features:**
- Real-time notification feed
- Filter & search functionality
- Bulk actions (mark all read, delete)
- Notification preferences

### **GET /admin/customers**
Customer management interface.

**Request:**
```http
GET /admin/customers?lang=nl&theme=light  
Cookie: admin_token=<session-token>
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: text/html

<html><!-- Customer management interface --></html>
```

**Features:**
- Customer listing met search/filter
- Account details & performance metrics
- Subscription management
- Support tools

### **GET /admin/profile**
Admin profile & settings page.

**Request:**
```http
GET /admin/profile?lang=nl&theme=light
Cookie: admin_token=<session-token>
```

**Response:**
```http
HTTP/1.1 200 OK  
Content-Type: text/html

<html><!-- Admin profile page --></html>
```

**Features:**
- Admin account settings
- Security preferences  
- Session management
- Language & theme preferences

## 📊 Real-time Data APIs

### **GET /admin/api/dashboard/metrics**
Live dashboard metrics voor real-time updates.

**Request:**
```http
GET /admin/api/dashboard/metrics
Cookie: admin_token=<session-token>
```

**Response (Success):**
```json
{
  "success": true,
  "uptime": "99.9%",
  "responseTime": 142,
  "errorRate": 0.023,
  "totalUsers": 1285,
  "cpuUsage": 32.1,
  "memoryUsage": 65.4,
  "diskUsage": 24.7,
  "timestamp": 1640995200000
}
```

**Response (Error):**
```json
{
  "error": "Failed to fetch metrics",
  "timestamp": 1640995200000
}
```

**Headers:**
```http
Content-Type: application/json
Cache-Control: no-cache, no-store, must-revalidate
```

**Usage:**
- Called every 30 seconds door dashboard
- Updates KPI cards zonder page refresh
- Provides real platform performance data

### **GET /admin/api/notifications/latest**
Latest notifications voor real-time notification system.

**Request:**
```http
GET /admin/api/notifications/latest?timestamp=1640995200000
Cookie: admin_token=<session-token>
```

**Parameters:**
- `timestamp` (optional): Last check timestamp voor filtering

**Response (Success):**
```json
{
  "success": true,
  "notifications": [
    {
      "id": "admin_1640995200000_1",
      "type": "system_alert", 
      "title": "Platform performance",
      "message": "Response time improved by 23% - Average: 145ms",
      "redirectUrl": "/api/testplan/execute",
      "severity": "success",
      "timeAgo": "2m ago",
      "timestamp": 1640995200000
    }
  ],
  "timestamp": 1640995200000,
  "count": 1
}
```

**Response (No New Notifications):**
```json
{
  "success": true,
  "notifications": [],
  "timestamp": 1640995200000, 
  "count": 0
}
```

**Usage:**
- Adaptive polling (15s - 2min intervals)
- Timestamp-based filtering prevents duplicates
- Contextual action URLs voor direct navigation

## 🧪 Testing & Development APIs

### **POST /api/testplan/execute**
Execute QA test suite (triggered from notifications).

**Request:**
```http
POST /api/testplan/execute
Content-Type: application/json
Cookie: admin_token=<session-token>

{
  "suite": "full",
  "environment": "production"
}
```

**Response (Success):**
```json
{
  "success": true,
  "results": {
    "overall": {
      "passed": 26,
      "total": 27,
      "rate": "96.3%"
    },
    "categories": {
      "api": { "passed": 8, "total": 8 },
      "ui": { "passed": 12, "total": 13 },
      "performance": { "passed": 6, "total": 6 }
    }
  },
  "duration": 45000,
  "timestamp": 1640995200000
}
```

**Features:**
- Full test suite execution
- Email notification met results
- Performance benchmarking
- Categorized test results

### **GET /admin/component-library**
Developer component library & design system.

**Request:**
```http
GET /admin/component-library?lang=nl&theme=light
Cookie: admin_token=<session-token>
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: text/html

<html><!-- Component library interface --></html>
```

**Features:**
- UI component showcase
- Design system documentation  
- Code examples & usage
- Interactive component testing

### **GET /admin/icons-components**
Icon system & component overview.

**Request:**
```http
GET /admin/icons-components?lang=nl&theme=light
Cookie: admin_token=<session-token>
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: text/html

<html><!-- Icons & components page --></html>
```

**Features:**
- 2000+ Lineicons integration
- Icon search & preview
- Component documentation
- Usage guidelines

## 🎨 Assets & Resources

### **GET /assets/DHGateVector.png**
Main DHgate Monitor logo asset.

**Request:**
```http
GET /assets/DHGateVector.png
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: image/png
Content-Length: 15420

<binary-image-data>
```

### **GET /assets/logo.png**
Alternative logo asset.

**Request:**
```http
GET /assets/logo.png
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: image/png  
Content-Length: 8936

<binary-image-data>
```

### **GET /assets/icons/fonts/Lineicons.woff2**
Lineicons font file voor icon system.

**Request:**
```http
GET /assets/icons/fonts/Lineicons.woff2
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: font/woff2
Content-Length: 89432

<binary-font-data>
```

## 🔄 Status & Health Endpoints

### **GET /api/health**
Platform health check endpoint.

**Request:**
```http
GET /api/health
```

**Response (Healthy):**
```json
{
  "status": "healthy",
  "timestamp": 1640995200000,
  "uptime": "99.9%",
  "responseTime": 142,
  "version": "2.0.0"
}
```

**Response (Unhealthy):**
```json
{
  "status": "unhealthy", 
  "timestamp": 1640995200000,
  "errors": ["Database connection failed"],
  "uptime": "98.7%",
  "responseTime": 567
}
```

**Usage:**
- Monitoring & alerting systems
- Load balancer health checks
- Automated testing validation

## 📈 Analytics & Reporting

### **GET /admin/api/analytics/overview**
Platform analytics overview (planned feature).

**Request:**
```http
GET /admin/api/analytics/overview?period=7d
Cookie: admin_token=<session-token>
```

**Response (Planned):**
```json
{
  "success": true,
  "period": "7d",
  "metrics": {
    "users": {
      "total": 1285,
      "growth": "+15%", 
      "active": 892
    },
    "performance": {
      "avgResponseTime": 145,
      "uptime": "99.94%",
      "errorRate": 0.018
    },
    "affiliate": {
      "totalEarnings": 47832.50,
      "conversions": 234,
      "clickThrough": "3.2%"
    }
  }
}
```

## 🚨 Error Handling

### **HTTP Status Codes**
```
200 OK              - Request successful
302 Found           - Redirect (login, logout)
400 Bad Request     - Invalid request data
401 Unauthorized    - Authentication required
403 Forbidden       - Access denied
404 Not Found       - Resource not found  
500 Internal Error  - Server error
503 Service Unavail - Maintenance mode
```

### **Error Response Format**
```json
{
  "error": "Error description",
  "code": "ERROR_CODE",
  "timestamp": 1640995200000,
  "requestId": "req_123456789"
}
```

### **Common Error Codes**
```
AUTH_REQUIRED       - Authentication token missing
AUTH_INVALID        - Invalid or expired token
AUTH_INSUFFICIENT   - Insufficient permissions
RATE_LIMIT_EXCEEDED - Too many requests
DATA_INVALID        - Request validation failed
SERVER_ERROR        - Internal server error
MAINTENANCE_MODE    - System under maintenance
```

## 🔧 Rate Limiting

### **Limits**
```
Authentication: 5 requests/minute
API Endpoints: 100 requests/minute  
Static Assets: No limit
Health Checks: 10 requests/minute
```

### **Rate Limit Headers**
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995260
Retry-After: 60
```

### **Rate Limit Response**
```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json

{
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED", 
  "limit": 100,
  "remaining": 0,
  "resetTime": 1640995260
}
```

## 📝 Request/Response Examples

### **cURL Examples**

#### **Admin Login**
```bash
curl -X POST http://localhost:3000/admin/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=Marese2906" \
  -c cookies.txt \
  -L
```

#### **Dashboard Metrics**
```bash
curl -H "Cookie: admin_token=YOUR_TOKEN" \
  http://localhost:3000/admin/api/dashboard/metrics
```

#### **Latest Notifications**
```bash
curl -H "Cookie: admin_token=YOUR_TOKEN" \
  "http://localhost:3000/admin/api/notifications/latest?timestamp=1640995200000"
```

### **JavaScript Examples**

#### **Fetch Dashboard Metrics**
```javascript
async function getDashboardMetrics() {
  try {
    const response = await fetch('/admin/api/dashboard/metrics', {
      method: 'GET',
      credentials: 'same-origin'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch dashboard metrics:', error);
    throw error;
  }
}
```

#### **Poll Notifications**
```javascript
async function pollNotifications(lastTimestamp = 0) {
  try {
    const response = await fetch(
      `/admin/api/notifications/latest?timestamp=${lastTimestamp}`,
      {
        method: 'GET',
        credentials: 'same-origin'
      }
    );
    
    const data = await response.json();
    
    if (data.success && data.notifications.length > 0) {
      // Process new notifications
      data.notifications.forEach(notification => {
        showNotification(notification);
      });
    }
    
    return data.timestamp;
  } catch (error) {
    console.error('Failed to poll notifications:', error);
    return lastTimestamp;
  }
}

// Start polling
let lastCheck = Date.now() - 60000; // Start from 1 minute ago
setInterval(async () => {
  lastCheck = await pollNotifications(lastCheck);
}, 30000);
```

## 🛠️ SDK Integration (Future)

### **JavaScript SDK (Planned)**
```javascript
import { DHgateMonitorAPI } from '@dhgate-monitor/sdk';

const client = new DHgateMonitorAPI({
  baseUrl: 'https://dhgate-monitor.nathaljanijman.workers.dev',
  credentials: 'include'
});

// Get dashboard metrics
const metrics = await client.dashboard.getMetrics();

// Poll notifications  
client.notifications.onNew((notification) => {
  console.log('New notification:', notification);
});
```

## 📚 Additional Resources

### **Postman Collection**
```json
{
  "info": {
    "name": "DHgate Monitor API",
    "description": "Complete API collection voor DHgate Monitor"
  },
  "auth": {
    "type": "cookie",
    "cookie": "admin_token={{admin_token}}"
  },
  "item": [
    {
      "name": "Admin Login",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/admin/login",
        "body": {
          "mode": "urlencoded",
          "urlencoded": [
            {"key": "username", "value": "admin"},
            {"key": "password", "value": "Marese2906"}
          ]
        }
      }
    }
  ]
}
```

### **OpenAPI Specification (Future)**
Complete OpenAPI 3.0 specificatie voor automatische SDK generation en API documentation.

---

**🔗 Complete API Reference | 🔐 Secure Authentication | ⚡ Real-time Data**