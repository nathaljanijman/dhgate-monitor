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
- **Smart Filtering System** with customizable tag management
- **Email Notifications** with beautifully designed HTML templates
- **Shop Management** with DHgate store URL integration
- **Real-time Status Dashboard** with monitoring statistics

### 🔧 **Technical Excellence**
- **Cloudflare Workers** serverless architecture
- **KV Storage** for persistent data management
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

### **API & Technical**
| URL | Type | Description |
|-----|------|-------------|
| [`/sitemap.xml`](https://dhgate-monitor.com/sitemap.xml) | XML | **SEO Sitemap** |
| [`/robots.txt`](https://dhgate-monitor.com/robots.txt) | TXT | **Robot Instructions** |
| [`/api/tags`](https://dhgate-monitor.com/api/tags) | JSON | **Dynamic Tags API** |

---

## 🎯 User Journey

### **1. Discovery → Landing Page (`/`)**
- **Interactive DHgate Showcase** with product monitoring demonstration
- **Feature Overview** with FILTER, ALERT, 24/7 capabilities
- **Call-to-Action** buttons leading to login/dashboard

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
- **KV Storage** for persistent data management
- **Scheduled Events** for automated monitoring (09:00 UTC)
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
- `generateLandingPageHTML()` - Interactive landing page with DHgate showcase
- `generateDashboardHTML()` - Main dashboard with shop management
- `generateGlobalCSS()` - Theme-aware styling system
- `handleScheduledEvent()` - Automated monitoring trigger

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

### **Planned Features**
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

## 📞 Support & Contact

### **Technical Support**
- **Email**: [nathaljanijman@gmail.com](mailto:nathaljanijman@gmail.com)
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

*Last Updated: August 18, 2025*
*Version: 2.0 - Complete UI/UX Redesign with Responsive Architecture*