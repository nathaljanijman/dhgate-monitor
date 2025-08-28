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

- **Cloudflare Workers**: Serverless edge computing platform
- **D1 Database**: SQLite storage for subscriptions and analytics
- **KV Storage**: High-speed caching and session management
- **Prepr CMS**: Headless content management system
- **Multi-provider email**: Fallback email delivery system

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

**Main application** (`cloudflare_app.js`)
- Landing page with embedded subscription widget
- Multi-language routing and content delivery
- Admin authentication and dashboard
- Email notification system
- Affiliate program functionality

**Subscription widget** (`signup-widget.js`)
- Advanced multi-step form with validation
- Store selection interface with preview cards
- Real-time form validation and error handling
- Responsive design for all devices

**Admin dashboard** (`enhanced_admin_dashboard.js`)
- Complete administrative interface
- Subscription analytics and user management
- System health monitoring

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

### Performance

- Sub-100ms response times globally via edge computing
- Multi-layer caching strategy for optimal performance
- Resource preloading and lazy loading implementation
- Comprehensive error handling with retry mechanisms

### License

MIT License - Open source and free for commercial use.

---

Built for the e-commerce community. Live at [dhgate-monitor.com](https://dhgate-monitor.com)