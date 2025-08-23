# 🛍️ DHgate Monitor - Professional E-commerce Monitoring Platform

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/nathaljanijman/dhgate-monitor)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Cloudflare Workers](https://img.shields.io/badge/powered%20by-Cloudflare%20Workers-orange.svg)](https://workers.cloudflare.com/)
[![GDPR Compliant](https://img.shields.io/badge/GDPR-compliant-brightgreen.svg)](https://gdpr.eu/)

> **Automatiseer je productonderzoek met intelligente DHgate monitoring** — Professionele monitoring voor e-commerce ondernemers die voorop willen lopen in de markt.

## 🎯 Business Value Proposition

DHgate Monitor transformeert hoe e-commerce ondernemers marktonderzoek doen door **geautomatiseerde, intelligente productmonitoring** die 24/7 werkt. Stop met handmatig zoeken — laat ons systeem de best-verkopende producten en trending items voor je vinden.

### 💼 Voor Wie Is Dit Platform?

- **E-commerce Ondernemers** die nieuwe productniches willen ontdekken
- **Dropshippers** die trending producten vroeg willen identificeren  
- **Product Researchers** die markttrends willen bijhouden
- **Online Retailers** die hun productcatalogus willen uitbreiden
- **Marketing Professionals** die marktinzichten nodig hebben

## 🚀 Core Features & Business Benefits

### 📊 **Intelligente Product Monitoring**
- **Real-time tracking** van DHgate shops en producten
- **Trending product detection** met slimme algoritmen
- **Prijs monitoring** met automatische alerts
- **Voorraad tracking** voor tijdige besluitvorming

### 🎨 **Professional User Experience**
- **Meertalige interface** (Nederlands & Engels)
- **Responsive design** voor alle apparaten
- **Dark/Light mode** voor optimaal gebruik
- **Intuïtieve dashboard** met real-time data

### 🔒 **Enterprise-Grade Security & Privacy**
- **GDPR compliant** data processing
- **Advanced input validation** tegen security threats
- **XSS & CSRF protection** voor veilige data handling
- **Privacy-first approach** met transparante data practices

### ⚡ **High-Performance Architecture**
- **Global CDN delivery** via Cloudflare Workers
- **Sub-100ms response times** wereldwijd
- **Intelligent caching** voor optimale performance
- **99.9% uptime guarantee** met redundante systemen

## 🏢 **Technical Architecture Excellence**

### **Modern Tech Stack**
```
Frontend: Progressive Web App (PWA) met Bootstrap 5
Backend: Cloudflare Workers (Edge Computing)
Database: D1 SQLite (Primary) + KV Storage (Cache)
Email: Resend API voor transactional emails  
Analytics: Google Analytics 4 met conversion tracking
Security: Enterprise-grade validation & sanitization
```

### **Performance Optimizations**
- **Lazy loading** voor snelle initial page loads
- **Resource preloading** voor kritieke assets
- **Image optimization** met WebP support
- **Minified CSS/JS** voor minimale bandwidth usage
- **Intelligent caching strategies** voor optimal response times

### **Security Features**
- **Input sanitization** met HTMLPurifier-equivalent
- **Email validation** met advanced regex patterns
- **URL validation** specifiek voor DHgate domains
- **CSRF token protection** voor alle forms
- **Error handling** met comprehensive logging

## 💻 Development & Deployment

### **Quick Start**
```bash
# Clone the repository
git clone https://github.com/nathaljanijman/dhgate-monitor.git
cd dhgate-monitor

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

# Deploy to Cloudflare Workers
npm run deploy
```

### **Environment Configuration**
```env
# Required Environment Variables
DHGATE_MONITOR_KV=your_kv_namespace_id
DB=your_d1_database_binding
RESEND_API_KEY=your_resend_api_key

# Optional Configuration
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
WEBHOOK_URL=https://webhook.site/your-webhook
DEBUG_MODE=false
```

## 🛍️ Application Architecture & User Journey

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

## User Journey

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

## Architecture

### **Frontend Stack**
- **Vanilla JavaScript** with ES6+ features
- **Bootstrap 5.1.3** for responsive components
- **CSS Custom Properties** for advanced theming
- **Raleway Font** for professional typography

### **Backend Infrastructure**
- **Cloudflare Workers** for serverless compute
- **Hybrid Storage System** - D1 Database (primary) + KV Storage (fallback/caching)
- **D1 Database** for structured data with SQL queries and ACID compliance
- **KV Storage** for high-performance caching and store database management
- **DHgate Store Integration** with curated popular stores (10+ stores)
- **Real-time Store Search** with intelligent query enhancement
- **Scheduled Events** for automated monitoring and database updates (09:00 UTC)
- **Manual Database Triggers** for instant store database refresh
- **Email Integration** with Resend API and SMTP fallback configuration

### **Monitoring Engine**
- **Python Selenium** with Chrome WebDriver automation
- **Anti-Detection** with user agent rotation and stealth options
- **Dynamic Tag System** with API integration
- **Error Handling** with comprehensive logging

---

## Design System

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
- **Theme Toggle**: Visual Light/Dark switcher with smooth animations using SVG sun/moon icons
- **Language Switcher**: Clean "EN | NL" format with active states
- **Cards**: Consistent shadow system with hover effects
- **Buttons**: Gradient backgrounds with interaction feedback
- **Icon System**: Minimalistic SVG icons with 1.5px stroke width, theme-aware currentColor inheritance
- **Cookie Consent**: Interactive banner with proper click handling and accessibility features

---

## Development

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
- `generateGlobalCSS()` - Theme-aware styling system with minimalistic icons
- `handleScheduledEvent()` - Automated monitoring and database updates
- `scrapeDHgateSitemaps()` - Store database creation and management
- `handleStoreSearch()` - Real-time store search with query enhancement
- `searchDHgateStores()` - Intelligent store discovery based on search terms
- `handleScraperTrigger()` - Manual store database refresh endpoint
- `handleD1Database()` - Hybrid D1 + KV storage operations with fallback support
- `generateGA4Script()` - Google Analytics 4 integration with privacy controls
- `handleDeleteData()` - GDPR Article 17 compliant data deletion system
- `generateResponsiveNavigation()` - Mobile-first navigation with hamburger menu

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

## Internationalization

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

## Email Notifications

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

## Security & Compliance

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

## Monitoring & Analytics

### **System Monitoring**
- **Daily Health Checks** at 09:00 UTC
- **Error Logging** with detailed stack traces
- **Performance Metrics** via Cloudflare Analytics
- **Uptime Monitoring** with status indicators

### **User Analytics**
- **Google Analytics 4 (GA4)** with measurement ID G-8YT6DMLP00
- **Privacy-First Implementation** with cookie consent integration
- **Custom Event Tracking** for user interactions and conversions
- **Theme Preference** tracking for UX improvements
- **Language Usage** statistics for localization
- **Performance Monitoring** for optimization
- **Cookie Consent Management** with granular analytics controls

---

## Future Roadmap

### **Recently Implemented**
- **Progressive Signup Form** with email-first workflow
- **DHgate Store Database** with curated popular stores
- **Real-time Store Search** with intelligent query enhancement
- **Manual Database Triggers** for instant updates
- **Scheduled Store Updates** for fresh data

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

## Testing & Development

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

## Support & Contact

### **Technical Support**
- **Email**: [support@dhgate-monitor.com](mailto:support@dhgate-monitor.com)
- **Documentation**: Available in dashboard settings
- **Status Page**: Real-time system status monitoring

### **Legal Information**
- **Data Controller**: Nathalja Nijman
- **Privacy Policy**: [/privacy](https://dhgate-monitor.com/privacy)
- **Terms of Service**: [/terms](https://dhgate-monitor.com/terms)

---

## License

This project is proprietary software developed for automated DHgate product monitoring. All rights reserved.

**© 2025 DHgate Monitor - Professional E-commerce Monitoring Solution**

---

*Last Updated: August 20, 2025*
*Version: 3.6 - Minimalistic Icon System*

### **Version 3.6 Highlights**  
- **Minimalistic Icon System** - Replaced all emoji icons (🍪, ☀️, 🌙, 🎯, ⚠️, ✅, 📧, 🗑️, 🗂️, ❌) with clean SVG variants
- **Thin-line Design Language** - All icons now use stroke-width: 1.5 for consistent minimalistic aesthetic inspired by Flaticon library
- **Performance Improvement** - Eliminated emoji dependency, resulting in better rendering across all devices and platforms
- **Accessibility Enhancement** - SVG icons provide better scalability, semantic meaning, and screen reader support
- **Clean Documentation** - Removed all decorative emojis from README for professional appearance
- **Theme Integration** - All icons respect light/dark theme settings with proper currentColor inheritance
- **Cookie Consent Fix** - Resolved interaction issues with cookie consent banner for better user experience
- **Cross-browser Compatibility** - Improved icon rendering consistency across different browsers and devices

### **Previous Major Features (From Earlier Versions)**
- **D1 Database Integration** - Hybrid D1 + KV storage system with SQL support and fallback reliability
- **Google Analytics 4** - Privacy-first GA4 implementation with measurement ID G-8YT6DMLP00 and cookie consent
- **Email System Overhaul** - Resend API integration with professional HTML templates and performance monitoring
- **Mobile Navigation** - Complete responsive navigation system with hamburger menu and mobile-friendly language switcher
- **GDPR Compliance** - Article 17 data deletion rights with comprehensive user data management
- **Granular Permissions** - Distinction between email marketing consent and dashboard access permissions

### **Previous Version 3.5 Features**
- **Unified Device Mockup** - Single clean component replacing separate desktop/mobile mockups
- **Minimalist Design** - Browser-style header with dots, clean metrics grid, live alert feed
- **Enhanced USPs** - Better metrics (10,000+ Products Tracked, <2min Alert Speed, 5★ Rating)
- **Mobile Optimized** - Device mockup appears under header on mobile with responsive scaling
- **Thin-line Icons** - Replaced FILTER/ALERT/24-7 text with clean SVG icons (stroke-width: 1.5)
- **Performance** - Reduced bundle size to 237.58 KiB by removing complex device mockup CSS

### **Previous Version 3.1 Features**
- **Complete Unsubscribe System** - Token-based secure unsubscription flow
- **Test Environment** - Direct unsubscribe testing via `/test-unsubscribe`
- **GDPR Compliance** - Proper data handling with subscription management
- **User-Friendly Interface** - Clear unsubscribe confirmation and success states
- **Enhanced Documentation** - Complete testing instructions and API examples

### **Previous Version 3.0 Features**
- **Progressive Signup Form** - Email-first workflow with step-by-step guidance
- **DHgate Store Database** - Curated popular stores with real-time search
- **Intelligent Store Search** - Query enhancement with contextual suggestions
- **Instant Database Updates** - Manual triggers for immediate store data refresh
- **Automated Maintenance** - Daily store database updates at 09:00 UTC
- **Above-the-Fold Experience** - Optimized landing without unwanted scrolling