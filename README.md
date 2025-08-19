# DHgate Monitor 🎯

**Automated DHgate Product Monitoring & Alert System**

A sophisticated Cloudflare Workers application that monitors DHgate products and sends real-time email notifications when new items matching your criteria are detected.

---

## 🌟 Features

### 🎨 **Modern UI & UX**
- **Interactive Landing Page** with DHgate product showcase
- **Light/Dark Theme Toggle** with system preference detection
- **Multilingual Support** (English/Dutch) with automatic detection
- **Responsive Design** optimized for mobile, tablet, and desktop
- **Professional Dashboard** with real-time status indicators

### 📊 **Core Functionality**
- **Automated Product Monitoring** with 24/7 scanning
- **Intelligent Store Search** with real-time DHgate store discovery
- **Progressive Signup Form** with email-first workflow
- **Smart Filtering System** with customizable tag management
- **Email Notifications** with beautifully designed HTML templates
- **Shop Management** with comprehensive DHgate store database
- **Real-time Status Dashboard** with monitoring statistics

### 🔧 **Technical Excellence**
- **Cloudflare Workers** serverless architecture
- **KV Storage** for persistent data management and store caching
- **DHgate Store Database** with curated popular stores and real-time search
- **Scheduled Jobs** for automated database updates (daily at 09:00 UTC)
- **Progressive Form Architecture** with step-by-step user guidance
- **Selenium Web Scraping** with anti-detection measures
- **GDPR Compliant** with cookie consent management
- **SEO Optimized** with proper meta tags and sitemap

---

## 🗺️ Complete Sitemap

### **Public Pages**
| URL | Priority | Description | Features |
|-----|----------|-------------|----------|
| [`/`](https://dhgate-monitor.com/) | 1.0 | **Landing Page** | Interactive DHgate showcase, feature overview, theme toggle |
| [`/login`](https://dhgate-monitor.com/login) | 0.9 | **User Login** | Authentication gateway to dashboard |

### **Authenticated Pages**
| URL | Priority | Description | Access Required |
|-----|----------|-------------|----------------|
| [`/dashboard`](https://dhgate-monitor.com/dashboard) | 0.9 | **Main Dashboard** | Login Required |
| [`/add_shop`](https://dhgate-monitor.com/add_shop) | 0.8 | **Add DHgate Shop** | Login Required |
| [`/settings`](https://dhgate-monitor.com/settings) | 0.8 | **Configuration** | Login Required |
| [`/tags`](https://dhgate-monitor.com/tags) | 0.8 | **Tag Management** | Login Required |

### **Legal & Information**
| URL | Priority | Description | Type |
|-----|----------|-------------|------|
| [`/privacy`](https://dhgate-monitor.com/privacy) | 0.6 | **Privacy Policy** | GDPR Compliant |
| [`/terms`](https://dhgate-monitor.com/terms) | 0.6 | **Terms of Service** | Legal Framework |
| [`/contact`](https://dhgate-monitor.com/contact) | 0.6 | **Contact Information** | Support & Legal |
| [`/unsubscribe`](https://dhgate-monitor.com/unsubscribe?token=...) | 0.8 | **Unsubscribe Page** | GDPR Compliance |

### **API & Technical**
| URL | Type | Description |
|-----|------|-------------|
| [`/sitemap.xml`](https://dhgate-monitor.com/sitemap.xml) | XML | **SEO Sitemap** |
| [`/robots.txt`](https://dhgate-monitor.com/robots.txt) | TXT | **Robot Instructions** |
| [`/api/tags`](https://dhgate-monitor.com/api/tags) | JSON | **Dynamic Tags API** |
| [`/api/stores/search`](https://dhgate-monitor.com/api/stores/search) | JSON | **Store Search API** |
| [`/api/stores/update`](https://dhgate-monitor.com/api/stores/update) | JSON | **Store Database Update** |
| [`/api/scraper/trigger`](https://dhgate-monitor.com/api/scraper/trigger) | JSON | **Manual Database Refresh** |
| [`/api/unsubscribe`](https://dhgate-monitor.com/api/unsubscribe) | JSON | **Unsubscribe Action** |
| [`/test-unsubscribe`](https://dhgate-monitor.com/test-unsubscribe) | Redirect | **Test Unsubscribe Flow** |

---

## 🎯 User Journey

### **1. Discovery → Landing Page (`/`)**
- **Progressive Signup Form** with email-first workflow
- **Intelligent Store Search** with real-time DHgate store suggestions
- **Step-by-Step Guidance** with contextual explanations
- **Interactive DHgate Showcase** with product monitoring demonstration
- **Feature Overview** with FILTER, ALERT, 24/7 capabilities

### **2. Authentication → Login (`/login`)**
- **Simple Login Form** (demo: accepts any credentials)
- **Theme & Language** consistency maintained
- **Seamless Redirect** to dashboard upon authentication

### **3. Management → Dashboard (`/dashboard`)**
- **Shop Overview** with monitoring status
- **Quick Actions** (Add Shop, Settings, Tags)
- **Real-time Status** display with platform information

### **4. Configuration → Settings & Tags**
- **Email Configuration** for notification delivery
- **Schedule Management** for monitoring frequency
- **Tag Customization** for product filtering criteria

---

## 🏗️ Architecture

### **Frontend Stack**
- **Vanilla JavaScript** with ES6+ features
- **Bootstrap 5.1.3** for responsive components
- **CSS Custom Properties** for advanced theming
- **Raleway Font** for professional typography

### **Backend Infrastructure**
- **Cloudflare Workers** for serverless compute
- **KV Storage** for persistent data and store database management
- **DHgate Store Integration** with curated popular stores (10+ stores)
- **Real-time Store Search** with intelligent query enhancement
- **Scheduled Events** for automated monitoring and database updates (09:00 UTC)
- **Manual Database Triggers** for instant store database refresh
- **Email Integration** with SMTP configuration

### **Monitoring Engine**
- **Python Selenium** with Chrome WebDriver automation
- **Anti-Detection** with user agent rotation and stealth options
- **Dynamic Tag System** with API integration
- **Error Handling** with comprehensive logging

---

## 🎨 Design System

### **Color Palette**
```css
/* Light Theme */
--accent-color: #1e40af      /* Primary Blue */
--accent-secondary: #ff6b35   /* Orange Accent */
--bg-gradient: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)

/* Dark Theme */
--accent-color: #3b82f6      /* Lighter Blue */
--accent-secondary: #f97316   /* Orange Accent */
--bg-gradient: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)
```

### **Typography**
- **Primary Font**: Raleway (300, 400, 500, 600, 700)
- **Responsive Scaling**: clamp() functions for optimal readability
- **Letter Spacing**: Enhanced for professional appearance

### **Components**
- **Theme Toggle**: Visual Light/Dark switcher with smooth animations
- **Language Switcher**: Clean "EN | NL" format with active states
- **Cards**: Consistent shadow system with hover effects
- **Buttons**: Gradient backgrounds with interaction feedback

---

## 🔧 Development

### **Project Structure**
```
dhgate-monitor/
├── cloudflare_app.js        # Main application logic
├── selenium_monitor.py      # Monitoring engine
├── wrangler.toml           # Cloudflare configuration
├── package.json            # Dependencies
└── README.md              # This documentation
```

### **Key Functions**
- `generateLandingPageHTML()` - Progressive signup form with store search
- `generateDashboardHTML()` - Main dashboard with shop management
- `generateGlobalCSS()` - Theme-aware styling system
- `handleScheduledEvent()` - Automated monitoring and database updates
- `scrapeDHgateSitemaps()` - Store database creation and management
- `handleStoreSearch()` - Real-time store search with query enhancement
- `searchDHgateStores()` - Intelligent store discovery based on search terms
- `handleScraperTrigger()` - Manual store database refresh endpoint

### **Deployment**
```bash
# Deploy to Cloudflare Workers
npx wrangler deploy

# View logs
npx wrangler tail

# Local development
npx wrangler dev
```

---

## 🌍 Internationalization

### **Language Support**
- **English (EN)**: Default for international users
- **Dutch (NL)**: Complete translation with cultural adaptations
- **Auto-Detection**: Based on Accept-Language headers
- **URL Parameters**: Manual language switching with `?lang=en/nl`

### **Theme Management**
- **System Preference**: Automatic dark/light mode detection
- **Manual Override**: Toggle switch with localStorage persistence
- **URL Parameters**: Theme control with `?theme=light/dark`

---

## 📧 Email Notifications

### **Design Features**
- **Professional HTML Templates** with Raleway typography
- **Responsive Email Design** for all email clients
- **Product Showcase** with pricing and monitoring indicators
- **Brand Consistency** with DHgate Monitor styling

### **Content Structure**
- **Header Section** with monitoring statistics
- **Product Cards** with "NEW" badges and prices
- **Footer Links** for dashboard access and settings
- **Legal Compliance** with unsubscribe options

---

## 🔐 Security & Compliance

### **Data Protection**
- **GDPR Compliant** cookie consent management
- **No Personal Data** stored without explicit consent
- **Secure Communication** via HTTPS/TLS encryption
- **Privacy-First** design with minimal data collection

### **Security Measures**
- **Input Validation** for all user inputs
- **CSRF Protection** via proper headers
- **Rate Limiting** on API endpoints
- **Secure Configuration** management

---

## 📈 Monitoring & Analytics

### **System Monitoring**
- **Daily Health Checks** at 09:00 UTC
- **Error Logging** with detailed stack traces
- **Performance Metrics** via Cloudflare Analytics
- **Uptime Monitoring** with status indicators

### **User Analytics**
- **Privacy-Respecting** analytics implementation
- **Theme Preference** tracking for UX improvements
- **Language Usage** statistics for localization
- **Performance Monitoring** for optimization

---

## 🎯 Future Roadmap

### **Recently Implemented** ✅
- [x] **Progressive Signup Form** with email-first workflow
- [x] **DHgate Store Database** with curated popular stores
- [x] **Real-time Store Search** with intelligent query enhancement
- [x] **Manual Database Triggers** for instant updates
- [x] **Scheduled Store Updates** for fresh data

### **Planned Features**
- [ ] **Direct DHgate API Integration** for live store data
- [ ] **Advanced Filtering** with price ranges and categories
- [ ] **Multi-Platform Support** beyond DHgate
- [ ] **Mobile App** for iOS and Android
- [ ] **Webhook Integration** for third-party services
- [ ] **Advanced Analytics** dashboard
- [ ] **Team Collaboration** features

### **Technical Improvements**
- [ ] **GraphQL API** for efficient data fetching
- [ ] **Real-time Updates** via WebSocket connections
- [ ] **Advanced Caching** strategies
- [ ] **Machine Learning** for better product matching

---

## 🧪 Testing & Development

### **Testing Unsubscribe Flow**
The unsubscribe system can be tested in multiple ways:

**Method 1: Complete User Journey** (Recommended)
1. Visit [dhgate-monitor.com](https://dhgate-monitor.com)
2. Complete the 4-step progressive form:
   - Step 1: Enter email address
   - Step 2: Search store + add search terms
   - Step 3: Select frequency + notification time  
   - Step 4: Confirm subscription
3. After "Start monitoring" → Find unsubscribe link at bottom
4. Test the complete unsubscribe flow with real token

**Method 2: Direct Test Link** (Quick Testing)
- Visit [`/test-unsubscribe`](https://dhgate-monitor.com/test-unsubscribe) 
- Creates demo subscription with test token
- Redirects directly to unsubscribe page for testing

### **API Testing**
```bash
# Test store search
curl "https://dhgate-monitor.com/api/stores/search?q=electronics"

# Test manual scraper trigger  
curl "https://dhgate-monitor.com/api/scraper/trigger"

# Test unsubscribe action (requires valid token)
curl -X POST "https://dhgate-monitor.com/api/unsubscribe" \
  -d "token=VALID_TOKEN&action=unsubscribe"
```

---

## 📞 Support & Contact

### **Technical Support**
- **Email**: [support@dhgate-monitor.com](mailto:support@dhgate-monitor.com)
- **Documentation**: Available in dashboard settings
- **Status Page**: Real-time system status monitoring

### **Legal Information**
- **Data Controller**: Nathalja Nijman
- **Privacy Policy**: [/privacy](https://dhgate-monitor.com/privacy)
- **Terms of Service**: [/terms](https://dhgate-monitor.com/terms)

---

## 📄 License

This project is proprietary software developed for automated DHgate product monitoring. All rights reserved.

**© 2025 DHgate Monitor - Professional E-commerce Monitoring Solution**

---

*Last Updated: August 19, 2025*
*Version: 3.5 - Clean Single Device Mockup*

### **Version 3.5 Highlights**  
- 📱 **Unified Device Mockup** - Single clean component replacing separate desktop/mobile mockups
- 🎯 **Minimalist Design** - Browser-style header with dots, clean metrics grid, live alert feed
- 📊 **Enhanced USPs** - Better metrics (10,000+ Products Tracked, <2min Alert Speed, 5★ Rating)
- ⚡ **Mobile Optimized** - Device mockup appears under header on mobile with responsive scaling
- 🎨 **Thin-line Icons** - Replaced FILTER/ALERT/24-7 text with clean SVG icons (stroke-width: 1.5)
- 🚀 **Performance** - Reduced bundle size to 237.58 KiB by removing complex device mockup CSS

### **Previous Version 3.1 Features**
- 🔓 **Complete Unsubscribe System** - Token-based secure unsubscription flow
- 🧪 **Test Environment** - Direct unsubscribe testing via `/test-unsubscribe`
- 📋 **GDPR Compliance** - Proper data handling with subscription management
- 🎯 **User-Friendly Interface** - Clear unsubscribe confirmation and success states
- 📖 **Enhanced Documentation** - Complete testing instructions and API examples

### **Previous Version 3.0 Features**
- ✨ **Progressive Signup Form** - Email-first workflow with step-by-step guidance
- 🏪 **DHgate Store Database** - Curated popular stores with real-time search
- 🔍 **Intelligent Store Search** - Query enhancement with contextual suggestions
- ⚡ **Instant Database Updates** - Manual triggers for immediate store data refresh
- 🔄 **Automated Maintenance** - Daily store database updates at 09:00 UTC
- 📱 **Above-the-Fold Experience** - Optimized landing without unwanted scrolling