# DHgate Monitor

Professional monitoring platform for DHgate stores and products. Built with Cloudflare Workers for global performance and reliability.

## Customer Journey Flow

### 1. Aanmelding & Registratie
- **Homepage Widget**: Multi-step aanmeldingsformulier op homepage
- **Store Selection**: Visuele winkelkaarten met preview informatie
- **Email & Tags**: Email registratie en zoektermen configuratie
- **API Signup**: Automatische verwerking via `/api/widget-signup`
- **Dashboard Token**: Unieke toegangslink gegenereerd voor klant

### 2. Dashboard Toegang
- **Dashboard URL**: `/dashboard?key=TOKEN&lang=nl&theme=light`
- **Monitoring Status**: Overzicht van actieve monitoring
- **Real-time Updates**: Groene status indicator voor actieve monitoring
- **Subscription Info**: Email, winkels, zoektermen, frequentie, aanmaakdatum

### 3. Dashboard Aanpassingen
- **Settings**: Email configuratie en platform instellingen
- **Tags Management**: Zoektermen aanpassen en beheren
- **Store Updates**: Winkel selecties wijzigen
- **Preferences**: Taal, thema en notificatie voorkeuren

### 4. Monitoring & Notificaties
- **Daily Reports**: Automatische monitoring om 09:00 UTC
- **Email Alerts**: Notificaties bij nieuwe producten
- **Real-time Status**: Live monitoring status in dashboard
- **Performance Tracking**: Monitoring statistieken en metrics

### 5. Content & Updates
- **Newsroom**: Laatste nieuws en platform updates
- **Multi-language**: Nederlandse en Engelse content
- **SEO Optimized**: Zoekmachine geoptimaliseerde artikelen
- **Social Sharing**: Delen van relevante content

### 6. Account Management
- **Unsubscribe**: Eenvoudige uitschrijving via token
- **Data Management**: GDPR compliant data handling
- **Access Control**: Veilige dashboard toegang
- **Support**: Contact en help functionaliteit

### Journey Flow Diagram
```
Homepage → Widget Signup → Dashboard Access → Settings/Tags → Monitoring → Notifications
    ↓           ↓              ↓                ↓              ↓            ↓
  Landing    Multi-step    Token-based      Customize      Daily      Email Alerts
   Page       Form         Access          Preferences    Reports
```

## Business value

### What it does

DHgate Monitor provides a subscription system for monitoring DHgate stores. Users can register stores through a multi-step widget, and the platform sends daily monitoring reports.

### Current capabilities

- **Store monitoring setup**: Users can register DHgate stores for tracking
- **Daily monitoring reports**: Scheduled monitoring at 09:00 UTC with email notifications
- **Store management**: Admin dashboard for managing registered stores and subscriptions
- **Multi-language support**: Dutch and English interface support
- **Content management**: Dynamic newsroom via CMS integration
- **Analytics tracking**: User subscription metrics and platform usage data

### Business benefits

- **Centralized store management**: Organize multiple DHgate stores in one dashboard
- **Automated notifications**: Daily reports eliminate manual store checking
- **Foundation for growth**: Platform ready for enhanced monitoring features
- **Professional presentation**: Clean, accessible interface builds user trust

## User experience

### Subscription widget

- **Multi-step form**: Progressive disclosure reduces form abandonment
- **Store selection**: Visual store cards with preview information
- **Real-time validation**: Immediate feedback prevents submission errors
- **Responsive design**: Works seamlessly on desktop, tablet, and mobile
- **Accessibility compliance**: Full keyboard navigation and screen reader support

### Interface design

- **Progressive enhancement**: Works without JavaScript, enhanced with it
- **Theme support**: Light and dark mode with automatic detection
- **Multi-language routing**: Seamless Dutch/English switching
- **Professional layout**: Clean typography and consistent spacing
- **Focus management**: Logical tab order and visual focus indicators

### Accessibility features

- **WCAG 2.1 AA compliance**: Meets international accessibility standards
- **Keyboard navigation**: Complete functionality without mouse
- **Screen reader support**: ARIA labels and semantic HTML structure
- **High contrast support**: Visual accessibility for all users
- **Focus indicators**: Clear visual feedback for interactive elements

## Technical implementation

### Architecture

- **Runtime**: Cloudflare Workers (V8 JavaScript engine)
- **Database**: Cloudflare D1 (SQLite) for relational data
- **Storage**: Cloudflare KV (key-value) for caching and sessions
- **Frontend**: Vanilla JavaScript, HTML5, CSS3 (no framework)
- **Email**: Multi-provider fallback (Resend API, SMTP, FormSubmit)
- **CMS**: Prepr headless CMS with GraphQL API
- **Deployment**: Wrangler CLI, GitHub Actions compatible
- **Analytics**: Google Analytics 4 integration

### Data storage strategy

The platform uses a dual storage approach:
- **KV storage**: Fast access for subscription data and caching
- **D1 database**: Relational storage for analytics and admin dashboard

### Platform components

**Main application** (`cloudflare_app.js` - 20,000+ lines)
- ES6 modules with async/await patterns
- RESTful API endpoints with CORS handling
- Server-side rendering with template literals
- JWT-like token authentication for admin
- Scheduled events (cron: 0 9 * * *)
- Circuit breaker pattern for external APIs

**Subscription widget** (`signup-widget.js`)
- Vanilla JavaScript with modern DOM APIs
- Progressive form enhancement
- Client-side validation with regex patterns
- Fetch API for async form submissions
- CSS Grid and Flexbox layouts

**Enhanced modules**
- `enhanced_admin_dashboard.js`: Administrative interface
- `enhanced_store_browser_clean.js`: Store management UI
- `api-config.js`: API configuration with retry logic

### Security and compliance

- **GDPR compliance**: Data handling with right to erasure implementation
- **XSS protection**: Comprehensive input sanitization
- **CSRF protection**: Token validation for all forms
- **SSL/TLS encryption**: End-to-end secure communications
- **Input validation**: Regex patterns and type checking

### Performance and patterns

- **Edge computing**: Global CDN with sub-100ms response times
- **Caching strategy**: KV TTL, browser cache headers, CDN caching
- **Error handling**: Exponential backoff, circuit breaker patterns
- **Resource optimization**: Lazy loading, preload hints, minification
- **API design**: RESTful endpoints, proper HTTP status codes
- **Database**: Prepared statements, connection pooling via D1

### Environment configuration

Required environment variables:
- `PREPR_API_TOKEN`: CMS integration
- `RESEND_API_KEY`: Email service
- `GA4_MEASUREMENT_ID`: Analytics tracking

### License

MIT License - Open source and free for commercial use.

---

Built for the e-commerce community. Live at [dhgate-monitor.com](https://dhgate-monitor.com)