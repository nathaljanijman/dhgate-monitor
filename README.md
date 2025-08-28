# DHgate Monitor

Professional monitoring platform for DHgate stores and products. Built with Cloudflare Workers for global performance and reliability.

## What it does

DHgate Monitor provides a subscription system for monitoring DHgate stores. Users can register stores through a multi-step widget, and the platform sends daily monitoring reports.

### Current features

- **Subscription widget**: Multi-step form for email, store selection, and monitoring preferences
- **Store management**: Admin dashboard for managing registered stores and subscriptions  
- **Daily monitoring**: Scheduled monitoring at 09:00 UTC with email reports
- **Multi-language**: Dutch and English interface support
- **Admin dashboard**: User management, analytics, and system monitoring
- **Content management**: Dynamic newsroom via Prepr CMS integration

### Technical architecture

- **Runtime**: Cloudflare Workers (V8 JavaScript engine)
- **Database**: Cloudflare D1 (SQLite) for relational data
- **Storage**: Cloudflare KV (key-value) for caching and sessions
- **Frontend**: Vanilla JavaScript, HTML5, CSS3 (no framework)
- **Email**: Multi-provider fallback (Resend API, SMTP, FormSubmit)
- **CMS**: Prepr headless CMS with GraphQL API
- **Deployment**: Wrangler CLI, GitHub Actions compatible
- **Analytics**: Google Analytics 4 integration

### Security and compliance

- GDPR compliant data handling with right to erasure
- XSS protection and input sanitization
- CSRF token validation for forms
- SSL/TLS encryption for all communications
- Accessibility support with WCAG 2.1 AA compliance

### Data storage

The platform uses a dual storage approach:
- **KV**: Fast access for subscription data and caching
- **D1**: Relational storage for analytics and admin dashboard

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

### Accessibility features

- Full keyboard navigation support
- Screen reader compatibility with ARIA labels
- Semantic HTML structure
- Focus management and logical tab order
- High contrast support for visual accessibility


### Environment configuration

Required environment variables:
- `PREPR_API_TOKEN`: CMS integration
- `RESEND_API_KEY`: Email service
- `GA4_MEASUREMENT_ID`: Analytics tracking

### Performance and patterns

- **Edge computing**: Global CDN with sub-100ms response times
- **Caching strategy**: KV TTL, browser cache headers, CDN caching
- **Error handling**: Exponential backoff, circuit breaker patterns  
- **Resource optimization**: Lazy loading, preload hints, minification
- **API design**: RESTful endpoints, proper HTTP status codes
- **Database**: Prepared statements, connection pooling via D1

### License

MIT License - Open source and free for commercial use.

---

Built for the e-commerce community. Live at [dhgate-monitor.com](https://dhgate-monitor.com)