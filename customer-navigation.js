/**
 * Customer Dashboard Navigation Components
 * 
 * Customer-focused navigation system for DHgate Monitor dashboard
 * Focus: Shop Management, Product Tracking, Price Alerts, Analytics
 * 
 * @version 1.0.0
 */

// ============================================================================
// CUSTOMER NAVIGATION CONFIGURATION
// ============================================================================

const CUSTOMER_NAVIGATION_CONFIG = {
  sidebar: {
    sections: [
      {
        id: 'overview',
        icon: 'dashboard',
        title: { nl: 'Overzicht', en: 'Overview' },
        items: [
          { id: 'dashboard', title: { nl: 'Dashboard', en: 'Dashboard' }, route: '/dashboard', icon: 'chart-line', description: { nl: 'Hoofddashboard met overzicht', en: 'Main dashboard overview' } }
        ]
      },
      {
        id: 'shop-management',
        icon: 'shop',
        title: { nl: 'Shop Beheer', en: 'Shop Management' },
        collapsible: true,
        items: [
          { id: 'shops', title: { nl: 'Mijn Shops', en: 'My Shops' }, route: '/dashboard/shops', icon: 'storefront', description: { nl: 'Beheer uw DHgate shops', en: 'Manage your DHgate shops' } },
          { id: 'add-shop', title: { nl: 'Shop Toevoegen', en: 'Add Shop' }, route: '/dashboard/shops/add', icon: 'plus-circle', description: { nl: 'Nieuwe shop toevoegen', en: 'Add new shop' } },
          { id: 'shop-analytics', title: { nl: 'Shop Analytics', en: 'Shop Analytics' }, route: '/dashboard/shops/analytics', icon: 'chart-bar', description: { nl: 'Analyse per shop', en: 'Per-shop analytics' } }
        ]
      },
      {
        id: 'product-tracking',
        icon: 'package',
        title: { nl: 'Product Tracking', en: 'Product Tracking' },
        collapsible: true,
        items: [
          { id: 'products', title: { nl: 'Alle Producten', en: 'All Products' }, route: '/dashboard/products', icon: 'cube', description: { nl: 'Overzicht van alle producten', en: 'Overview of all products' } },
          { id: 'trending', title: { nl: 'Trending Producten', en: 'Trending Products' }, route: '/dashboard/products/trending', icon: 'trending-up', description: { nl: 'Populaire en trending items', en: 'Popular and trending items' } },
          { id: 'competitors', title: { nl: 'Concurrent Analyse', en: 'Competitor Analysis' }, route: '/dashboard/competitors', icon: 'users', description: { nl: 'Concurrent product monitoring', en: 'Competitor product monitoring' } }
        ]
      },
      {
        id: 'alerts-monitoring',
        icon: 'bell',
        title: { nl: 'Alerts & Monitoring', en: 'Alerts & Monitoring' },
        collapsible: true,
        items: [
          { id: 'price-alerts', title: { nl: 'Prijs Alerts', en: 'Price Alerts' }, route: '/dashboard/alerts/price', icon: 'currency-dollar', description: { nl: 'Prijs wijzigingen monitoren', en: 'Monitor price changes' } },
          { id: 'stock-alerts', title: { nl: 'Voorraad Alerts', en: 'Stock Alerts' }, route: '/dashboard/alerts/stock', icon: 'archive', description: { nl: 'Voorraad status monitoren', en: 'Monitor stock status' } },
          { id: 'keyword-alerts', title: { nl: 'Keyword Alerts', en: 'Keyword Alerts' }, route: '/dashboard/alerts/keywords', icon: 'search', description: { nl: 'Zoekterm monitoring', en: 'Search term monitoring' } }
        ]
      },
      {
        id: 'analytics-insights',
        icon: 'analytics',
        title: { nl: 'Analytics & Insights', en: 'Analytics & Insights' },
        collapsible: true,
        items: [
          { id: 'performance', title: { nl: 'Performance Dashboard', en: 'Performance Dashboard' }, route: '/dashboard/analytics/performance', icon: 'chart-line', description: { nl: 'Prestatie overzicht', en: 'Performance overview' } },
          { id: 'market-trends', title: { nl: 'Markt Trends', en: 'Market Trends' }, route: '/dashboard/analytics/trends', icon: 'chart-pie', description: { nl: 'Markt trend analyse', en: 'Market trend analysis' } },
          { id: 'reports', title: { nl: 'Rapporten', en: 'Reports' }, route: '/dashboard/reports', icon: 'document', description: { nl: 'Gedetailleerde rapporten', en: 'Detailed reports' } }
        ]
      },
      {
        id: 'account-settings',
        icon: 'cog',
        title: { nl: 'Account & Instellingen', en: 'Account & Settings' },
        collapsible: true,
        items: [
          { id: 'profile', title: { nl: 'Profiel', en: 'Profile' }, route: '/dashboard/profile', icon: 'user', description: { nl: 'Account instellingen', en: 'Account settings' } },
          { id: 'notifications', title: { nl: 'Notificaties', en: 'Notifications' }, route: '/dashboard/notifications', icon: 'bell-ring', description: { nl: 'Notificatie voorkeuren', en: 'Notification preferences' } },
          { id: 'billing', title: { nl: 'Facturatie', en: 'Billing' }, route: '/dashboard/billing', icon: 'credit-card', description: { nl: 'Abonnement en facturatie', en: 'Subscription and billing' } },
          { id: 'api-keys', title: { nl: 'API Toegang', en: 'API Access' }, route: '/dashboard/api', icon: 'key', description: { nl: 'API sleutels beheren', en: 'Manage API keys' } }
        ]
      }
    ]
  },
  quickActions: [
    { id: 'refresh-data', title: { nl: 'Data Verversen', en: 'Refresh Data' }, icon: 'refresh', action: 'refreshDashboardData' },
    { id: 'add-shop', title: { nl: 'Shop Toevoegen', en: 'Add Shop' }, icon: 'plus', route: '/dashboard/shops/add' },
    { id: 'export-data', title: { nl: 'Data Exporteren', en: 'Export Data' }, icon: 'download', action: 'exportDashboardData' },
    { id: 'help', title: { nl: 'Help & Support', en: 'Help & Support' }, icon: 'help-circle', route: '/help' }
  ]
};

// ============================================================================
// CUSTOMER SVG ICONS (Customer/E-commerce focused)
// ============================================================================

const CUSTOMER_ICONS = {
  // Primary navigation
  'dashboard': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>',
  'shop': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/></svg>',
  'package': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.89 3l8.11 4.55v8.9L12.89 21 4.78 16.45v-8.9L12.89 3zm6.33 6.45L12.89 6.7 6.56 9.45l6.33 2.75 6.33-2.75zM5.78 11.24l6.11 2.65v6.22l-6.11-3.65v-5.22zm14.22 0v5.22l-6.11 3.65v-6.22l6.11-2.65z"/></svg>',
  'bell': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  'analytics': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
  'cog': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>',

  // E-commerce & Shop Management
  'storefront': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-6H5l7-7 7 7h-2v6z"/></svg>',
  'cube': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2zm6 7l-6-3.5L6 9l6 3.5L18 9zM5 11v8l6 3.5v-7L5 11zm8 4.5v7L19 19v-8l-6 4.5z"/></svg>',
  'chart-line': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>',
  'chart-bar': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/></svg>',
  'chart-pie': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2v10l8.66-5C19.15 4.94 15.88 2.66 12 2zM12 12v10c7.18 0 12.15-7.32 9.76-14.32L12 12z"/></svg>',
  'trending-up': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>',
  'users': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3 3 0 0 0 17.07 6H16.93a3 3 0 0 0-2.89 2.37L11.5 16H14v6h6zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zm-2 8.5v-6H8l2.54-7.63A3 3 0 0 1 13.43 4h.14c1.28 0 2.43.8 2.89 2.37L19 14h-2.5v6h-6z"/></svg>',

  // Alerts & Monitoring
  'currency-dollar': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/></svg>',
  'archive': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 8v13H3V8l2-6h14l2 6zM5 10v10h14V10H5zm6 4h2v2h-2v-2zM6.5 4L5 8h14l-1.5-4h-11z"/></svg>',
  'search': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
  'bell-ring': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"/></svg>',

  // Account & Settings
  'user': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
  'credit-card': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>',
  'key': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm12.78-1.38C19.93 6.8 18.24 5 16.12 5c-2.12 0-3.81 1.8-3.66 3.62L18 14.17 19.83 12.45c.39-.39 1.02-.39 1.41 0l.39.39L20.22 11.42c.39-.39.39-1.02 0-1.41z"/></svg>',
  'document': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>',

  // Quick Actions
  'plus': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',
  'plus-circle': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>',
  'refresh': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',
  'download': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>',
  'help-circle': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>',

  // Navigation
  'chevron-down': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>',
  'chevron-right': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>',
  'chevron-left': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',
  'menu': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>',
  'x': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
  'shield-check': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z"/></svg>'
};

// ============================================================================
// CUSTOMER SIDEBAR NAVIGATION GENERATOR
// ============================================================================

function generateCustomerSidebarNavigation(currentRoute = '/dashboard', lang = 'nl', theme = 'light', userEmail = 'user@example.com') {
  const sections = CUSTOMER_NAVIGATION_CONFIG.sidebar.sections.map(section => {
    const sectionTitle = section.title[lang] || section.title['nl'];
    const isCollapsible = section.collapsible || false;
    const sectionId = `customer-nav-section-${section.id}`;
    
    const items = section.items.map(item => {
      const itemTitle = item.title[lang] || item.title['nl'];
      const itemDescription = item.description ? (item.description[lang] || item.description['nl']) : '';
      const isActive = currentRoute === item.route || currentRoute.startsWith(item.route + '/');
      
      return `
        <li class="customer-nav-item ${isActive ? 'active' : ''}" role="none">
          <a href="${item.route}?key=\${dashboardKey}&lang=${lang}&theme=${theme}" 
             class="customer-nav-link" 
             data-route="${item.route}"
             role="menuitem"
             aria-current="${isActive ? 'page' : 'false'}"
             aria-label="${itemTitle} ${isActive ? '(huidige pagina)' : ''}"
             title="${itemDescription}">
            <span class="customer-nav-icon" aria-hidden="true">${CUSTOMER_ICONS[item.icon] || CUSTOMER_ICONS.cube}</span>
            <span class="customer-nav-text">${itemTitle}</span>
            ${isActive ? '<span class="customer-nav-indicator" aria-hidden="true"></span>' : ''}
          </a>
        </li>
      `;
    }).join('');
    
    return `
      <div class="customer-nav-section" 
           data-section="${section.id}"
           role="group"
           aria-labelledby="customer-section-${section.id}-header">
        <div class="customer-nav-section-header ${isCollapsible ? 'collapsible' : ''}" 
             id="customer-section-${section.id}-header"
             ${isCollapsible ? `
               data-toggle-section="${sectionId}"
               role="button"
               aria-expanded="true"
               aria-controls="${sectionId}"
               tabindex="0"
               aria-label="${sectionTitle} sectie ${isCollapsible ? 'inklappen/uitklappen' : ''}"
             ` : `role="heading" aria-level="2"`}>
          <span class="customer-nav-section-icon" aria-hidden="true">${CUSTOMER_ICONS[section.icon] || CUSTOMER_ICONS.dashboard}</span>
          <span class="customer-nav-section-title">${sectionTitle}</span>
          ${isCollapsible ? `<span class="customer-nav-section-toggle" aria-hidden="true">${CUSTOMER_ICONS['chevron-down']}</span>` : ''}
        </div>
        <ul class="customer-nav-items" 
            id="${sectionId}"
            role="menu"
            aria-labelledby="customer-section-${section.id}-header">
          ${items}
        </ul>
      </div>
    `;
  }).join('');
  
  return `
    <nav class="customer-dashboard-sidebar" 
         data-theme="${theme}"
         role="navigation"
         aria-label="Customer dashboard hoofdnavigatie">
      <div class="customer-sidebar-header" role="banner">
        <div class="customer-sidebar-logo">
          <div class="customer-logo-icon" aria-hidden="true">
            ${CUSTOMER_ICONS['shield-check']}
          </div>
          <div class="customer-logo-text">
            <div class="customer-logo-title">DHgate Monitor</div>
            <div class="customer-logo-subtitle">Dashboard</div>
          </div>
        </div>
        <button class="customer-sidebar-toggle" 
                data-toggle-sidebar
                aria-label="Sidebar inklappen/uitklappen"
                aria-expanded="true"
                type="button">
          ${CUSTOMER_ICONS['chevron-left']}
        </button>
      </div>
      <div class="customer-sidebar-content" role="main">
        ${sections}
      </div>
      <div class="customer-sidebar-footer">
        <div class="customer-user-info">
          <div class="customer-user-avatar" aria-hidden="true">
            ${CUSTOMER_ICONS['user']}
          </div>
          <div class="customer-user-details">
            <div class="customer-user-name">${userEmail.split('@')[0]}</div>
            <div class="customer-user-email">${userEmail}</div>
          </div>
          <div class="customer-user-actions">
            <button class="customer-user-menu-toggle" 
                    aria-label="Gebruikersmenu"
                    data-toggle="customer-user-menu">
              ${CUSTOMER_ICONS['chevron-down']}
            </button>
          </div>
        </div>
        <div class="customer-user-menu" id="customer-user-menu" hidden>
          <a href="/dashboard/profile?key=\${dashboardKey}&lang=${lang}" class="customer-user-menu-item">
            ${CUSTOMER_ICONS['user']} ${lang === 'nl' ? 'Profiel' : 'Profile'}
          </a>
          <a href="/dashboard/billing?key=\${dashboardKey}&lang=${lang}" class="customer-user-menu-item">
            ${CUSTOMER_ICONS['credit-card']} ${lang === 'nl' ? 'Facturatie' : 'Billing'}
          </a>
          <a href="/dashboard/notifications?key=\${dashboardKey}&lang=${lang}" class="customer-user-menu-item">
            ${CUSTOMER_ICONS['bell']} ${lang === 'nl' ? 'Notificaties' : 'Notifications'}
          </a>
          <hr class="customer-user-menu-divider">
          <a href="/help" class="customer-user-menu-item">
            ${CUSTOMER_ICONS['help-circle']} ${lang === 'nl' ? 'Help & Support' : 'Help & Support'}
          </a>
          <a href="/logout" class="customer-user-menu-item customer-user-menu-logout">
            ${CUSTOMER_ICONS['x']} ${lang === 'nl' ? 'Uitloggen' : 'Logout'}
          </a>
        </div>
      </div>
    </nav>
  `;
}

// ============================================================================
// CUSTOMER NAVIGATION CSS STYLES
// ============================================================================

function generateCustomerNavigationCSS(theme = 'light') {
  // UNIFIED COLOR SYSTEM - Aligned with Tailwind config and brand identity (Customer optimized)
  const colors = theme === 'dark' ? {
    // Dark theme colors (matching Tailwind config)
    bg: '#0F172A',           // bg-primary from Tailwind
    bgSecondary: '#1E293B',  // bg-secondary from Tailwind  
    bgTertiary: '#334155',   // bg-tertiary from Tailwind
    bgCard: '#1E293B',       // bg-card from Tailwind
    text: '#F8FAFC',         // text-primary from Tailwind
    textSecondary: '#CBD5E1', // text-secondary from Tailwind
    textMuted: '#64748B',    // text-muted from Tailwind
    border: '#334155',       // border-light from Tailwind
    borderLight: '#475569',  // border-medium from Tailwind
    // BRAND COLORS - Consistent with logo and Tailwind
    primary: '#2563EB',      // Blue-600 (logo primary)
    primaryHover: '#1D4ED8', // Blue-700
    secondary: '#EA580C',    // Orange-600 (logo gradient end)
    secondaryHover: '#C2410C', // Orange-700
    accent: '#10B981',       // accent-green from Tailwind
    accentHover: '#059669',  // Emerald-600
    warning: '#F59E0B',      // accent-orange from Tailwind
    danger: '#EF4444',       // Red-500
    // Status colors
    online: '#22C55E',       // Green-500
    offline: '#EF4444',      // Red-500
    success: '#10B981'       // Emerald-500
  } : {
    // Light theme colors (Customer friendly - warmer)
    bg: '#FFFFFF',
    bgSecondary: '#F8FAFC',
    bgTertiary: '#F1F5F9',
    bgCard: '#FFFFFF',
    text: '#111827',
    textSecondary: '#374151',
    textMuted: '#6B7280',
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    // BRAND COLORS - Consistent across themes
    primary: '#2563EB',      // Blue-600 (logo primary)
    primaryHover: '#1D4ED8', // Blue-700
    secondary: '#EA580C',    // Orange-600 (logo gradient end)
    secondaryHover: '#C2410C', // Orange-700
    accent: '#10B981',       // Emerald-500
    accentHover: '#059669',  // Emerald-600
    warning: '#F59E0B',      // Amber-500
    danger: '#EF4444',       // Red-500
    // Status colors
    online: '#22C55E',       // Green-500
    offline: '#EF4444',      // Red-500
    success: '#10B981'       // Emerald-500
  };

  return `
    <style>
      /* Customer Dashboard Navigation Styles - UNIFIED DESIGN SYSTEM */
      
      /* RALEWAY FONT IMPORT */
      @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap');
      
      /* TYPOGRAPHY SYSTEM - Raleway Based */
      .customer-text-display { 
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; 
        font-weight: 800; 
        letter-spacing: -0.025em; 
      }
      .customer-text-heading { 
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; 
        font-weight: 700; 
        letter-spacing: -0.015em; 
      }
      .customer-text-title { 
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; 
        font-weight: 600; 
      }
      .customer-text-body { 
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; 
        font-weight: 500; 
      }
      .customer-text-caption { 
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; 
        font-weight: 400; 
        letter-spacing: 0.025em; 
      }
      
      /* BASE NAVIGATION STYLES */
      .customer-dashboard-sidebar {
        width: 280px;
        height: 100vh;
        background: ${colors.bg};
        border-right: 2px solid ${colors.border};
        display: flex;
        flex-direction: column;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1000;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 4px 0 20px rgba(0, 0, 0, 0.08);
      }
      
      .customer-dashboard-sidebar.collapsed {
        width: 72px;
      }
      
      .customer-sidebar-header {
        padding: 1.5rem;
        border-bottom: 2px solid ${colors.border};
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: ${colors.bgSecondary};
      }
      
      .customer-sidebar-logo {
        display: flex;
        align-items: center;
        gap: 0.875rem;
      }
      
      .customer-logo-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
      }
      
      .customer-logo-icon svg {
        width: 22px;
        height: 22px;
      }
      
      .customer-logo-text {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
      }
      
      .customer-logo-title {
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        font-weight: 700;
        font-size: 1.1rem;
        color: ${colors.text};
        letter-spacing: -0.015em;
      }
      
      .customer-logo-subtitle {
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 0.75rem;
        color: ${colors.textSecondary};
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      
      .customer-sidebar-toggle {
        background: none;
        border: none;
        color: ${colors.textSecondary};
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 6px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .customer-sidebar-toggle:hover {
        background: ${colors.bgTertiary};
        color: ${colors.text};
      }
      
      .customer-sidebar-toggle svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }
      
      .customer-sidebar-content {
        flex: 1;
        overflow-y: auto;
        padding: 1.5rem 0;
      }
      
      .customer-nav-section {
        margin-bottom: 1.5rem;
      }
      
      .customer-nav-section-header {
        padding: 0.75rem 1.25rem 0.5rem;
        cursor: default;
        color: ${colors.textSecondary};
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        font-size: 0.8125rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.075em;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 6px;
        transition: all 0.2s ease;
      }
      
      .customer-nav-section-header.collapsible {
        cursor: pointer;
        padding: 0.875rem 1.25rem;
        margin: 0 0.5rem;
        border-radius: 8px;
      }
      
      .customer-nav-section-header.collapsible:hover {
        background: ${colors.bgTertiary};
        color: ${colors.text};
      }
      
      .customer-nav-section-icon {
        width: 18px;
        height: 18px;
        margin-right: 0.75rem;
        color: ${colors.primary};
        fill: currentColor;
        flex-shrink: 0;
      }
      
      .customer-nav-section-title {
        flex: 1;
      }
      
      .customer-nav-section-toggle {
        width: 16px;
        height: 16px;
        transition: transform 0.2s ease;
        fill: currentColor;
      }
      
      .customer-nav-section.collapsed .customer-nav-section-toggle {
        transform: rotate(-90deg);
      }
      
      .customer-nav-items {
        list-style: none;
        margin: 0;
        padding: 0;
        transition: max-height 0.3s ease;
        overflow: hidden;
      }
      
      .customer-nav-section.collapsed .customer-nav-items {
        max-height: 0;
      }
      
      .customer-nav-item {
        margin: 0.25rem 0.5rem;
      }
      
      .customer-nav-link {
        display: flex;
        align-items: center;
        gap: 0.875rem;
        padding: 0.875rem 1rem;
        color: ${colors.textSecondary};
        text-decoration: none;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        border-radius: 10px;
        font-weight: 500;
        transform: translateZ(0);
      }
      
      .customer-nav-link:hover {
        background: ${colors.bgTertiary};
        color: ${colors.text};
        transform: translateX(4px);
      }
      
      .customer-nav-item.active .customer-nav-link {
        background: linear-gradient(135deg, ${colors.primary}15 0%, ${colors.secondary}15 100%);
        color: ${colors.primary};
        font-weight: 600;
        border-left: 3px solid ${colors.primary};
        box-shadow: 0 4px 12px ${colors.primary}20;
      }
      
      .customer-nav-icon {
        width: 20px;
        height: 20px;
        fill: currentColor;
        flex-shrink: 0;
      }
      
      .customer-nav-text {
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        line-height: 1.25;
      }
      
      .customer-nav-indicator {
        position: absolute;
        right: 0.75rem;
        width: 6px;
        height: 6px;
        background: ${colors.primary};
        border-radius: 50%;
      }
      
      /* SIDEBAR FOOTER */
      .customer-sidebar-footer {
        border-top: 2px solid ${colors.border};
        padding: 1.25rem;
        background: ${colors.bgSecondary};
      }
      
      .customer-user-info {
        display: flex;
        align-items: center;
        gap: 0.875rem;
        position: relative;
      }
      
      .customer-user-avatar {
        width: 44px;
        height: 44px;
        background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-shrink: 0;
      }
      
      .customer-user-avatar svg {
        width: 20px;
        height: 20px;
      }
      
      .customer-user-details {
        flex: 1;
        min-width: 0;
      }
      
      .customer-user-name {
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        font-weight: 600;
        font-size: 0.9rem;
        color: ${colors.text};
        margin-bottom: 0.125rem;
        text-transform: capitalize;
      }
      
      .customer-user-email {
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        font-size: 0.8125rem;
        font-weight: 400;
        color: ${colors.textMuted};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .customer-user-actions {
        flex-shrink: 0;
      }
      
      .customer-user-menu-toggle {
        background: none;
        border: none;
        color: ${colors.textSecondary};
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 6px;
        transition: all 0.2s ease;
      }
      
      .customer-user-menu-toggle:hover {
        background: ${colors.bgTertiary};
        color: ${colors.text};
      }
      
      .customer-user-menu-toggle svg {
        width: 16px;
        height: 16px;
      }
      
      .customer-user-menu {
        position: absolute;
        bottom: 100%;
        left: 0;
        right: 0;
        background: ${colors.bgCard};
        border: 1px solid ${colors.border};
        border-radius: 10px;
        box-shadow: 0 10px 25px ${colors.textMuted}20;
        padding: 0.5rem 0;
        margin-bottom: 0.5rem;
        z-index: 1001;
      }
      
      .customer-user-menu-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        color: ${colors.text};
        text-decoration: none;
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        transition: all 0.2s ease;
      }
      
      .customer-user-menu-item:hover {
        background: ${colors.bgTertiary};
        color: ${colors.primary};
      }
      
      .customer-user-menu-item svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
      
      .customer-user-menu-divider {
        height: 1px;
        background: ${colors.border};
        border: none;
        margin: 0.5rem 0;
      }
      
      .customer-user-menu-logout {
        color: ${colors.danger};
      }
      
      .customer-user-menu-logout:hover {
        background: ${colors.danger}15;
        color: ${colors.danger};
      }
      
      /* RESPONSIVE DESIGN */
      @media (max-width: 1024px) {
        .customer-dashboard-sidebar {
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .customer-dashboard-sidebar.open {
          transform: translateX(0);
        }
        
        .customer-dashboard-sidebar::before {
          content: '';
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 280px;
          background: ${colors.textMuted}60;
          backdrop-filter: blur(4px);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .customer-dashboard-sidebar.open::before {
          opacity: 1;
        }
      }
      
      @media (max-width: 768px) {
        .customer-dashboard-sidebar {
          width: 100%;
          max-width: 320px;
        }
        
        .customer-sidebar-header {
          padding: 1.25rem;
        }
        
        .customer-logo-title {
          font-size: 1rem;
        }
        
        .customer-nav-link {
          padding: 1rem;
        }
        
        .customer-nav-text {
          font-size: 0.875rem;
        }
      }
      
      /* ACCESSIBILITY IMPROVEMENTS */
      @media (prefers-reduced-motion: reduce) {
        .customer-dashboard-sidebar,
        .customer-nav-link,
        .customer-nav-section-toggle,
        .customer-sidebar-toggle,
        .customer-user-menu-toggle {
          transition: none;
        }
      }
      
      /* FOCUS STATES */
      .customer-nav-link:focus,
      .customer-sidebar-toggle:focus,
      .customer-user-menu-toggle:focus,
      .customer-nav-section-header:focus {
        outline: 2px solid ${colors.primary};
        outline-offset: 2px;
      }
      
      /* HIGH CONTRAST MODE */
      @media (prefers-contrast: high) {
        .customer-dashboard-sidebar {
          border-right-color: ${colors.text};
        }
        
        .customer-nav-link:hover,
        .customer-nav-item.active .customer-nav-link {
          outline: 1px solid ${colors.primary};
        }
      }
    </style>
  `;
}

// ============================================================================
// CUSTOMER NAVIGATION JAVASCRIPT
// ============================================================================

function generateCustomerNavigationJS() {
  return `
    <script>
      // Customer Dashboard Navigation JavaScript
      document.addEventListener('DOMContentLoaded', function() {
        
        // Sidebar toggle functionality
        const sidebarToggle = document.querySelector('[data-toggle-sidebar]');
        const sidebar = document.querySelector('.customer-dashboard-sidebar');
        
        if (sidebarToggle && sidebar) {
          sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // Update aria-expanded
            const expanded = !sidebar.classList.contains('collapsed');
            sidebarToggle.setAttribute('aria-expanded', expanded);
            
            // Store preference
            localStorage.setItem('customer-sidebar-collapsed', sidebar.classList.contains('collapsed'));
          });
          
          // Restore sidebar state
          const isCollapsed = localStorage.getItem('customer-sidebar-collapsed') === 'true';
          if (isCollapsed) {
            sidebar.classList.add('collapsed');
            sidebarToggle.setAttribute('aria-expanded', 'false');
          }
        }
        
        // Collapsible sections
        const collapsibleHeaders = document.querySelectorAll('.customer-nav-section-header.collapsible');
        
        collapsibleHeaders.forEach(header => {
          header.addEventListener('click', function() {
            const section = header.closest('.customer-nav-section');
            const sectionId = header.getAttribute('data-toggle-section');
            const items = document.getElementById(sectionId);
            
            if (section && items) {
              section.classList.toggle('collapsed');
              
              // Update aria-expanded
              const expanded = !section.classList.contains('collapsed');
              header.setAttribute('aria-expanded', expanded);
              
              // Store section state
              localStorage.setItem(\`customer-section-\${section.dataset.section}-collapsed\`, section.classList.contains('collapsed'));
            }
          });
          
          // Restore section states
          const section = header.closest('.customer-nav-section');
          if (section) {
            const isCollapsed = localStorage.getItem(\`customer-section-\${section.dataset.section}-collapsed\`) === 'true';
            if (isCollapsed) {
              section.classList.add('collapsed');
              header.setAttribute('aria-expanded', 'false');
            }
          }
        });
        
        // User menu toggle
        const userMenuToggle = document.querySelector('[data-toggle="customer-user-menu"]');
        const userMenu = document.getElementById('customer-user-menu');
        
        if (userMenuToggle && userMenu) {
          userMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isHidden = userMenu.hasAttribute('hidden');
            
            if (isHidden) {
              userMenu.removeAttribute('hidden');
              userMenuToggle.setAttribute('aria-expanded', 'true');
            } else {
              userMenu.setAttribute('hidden', '');
              userMenuToggle.setAttribute('aria-expanded', 'false');
            }
          });
          
          // Close menu when clicking outside
          document.addEventListener('click', function(e) {
            if (!userMenu.contains(e.target) && !userMenuToggle.contains(e.target)) {
              userMenu.setAttribute('hidden', '');
              userMenuToggle.setAttribute('aria-expanded', 'false');
            }
          });
        }
        
        // Mobile sidebar overlay handling
        if (window.innerWidth <= 1024) {
          const sidebarOverlay = document.createElement('div');
          sidebarOverlay.className = 'customer-sidebar-overlay';
          sidebarOverlay.addEventListener('click', function() {
            sidebar?.classList.remove('open');
          });
          
          // Mobile menu button (if exists)
          const mobileMenuButton = document.querySelector('[data-toggle="customer-mobile-menu"]');
          if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', function() {
              sidebar?.classList.add('open');
            });
          }
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
          // Escape key closes user menu and mobile sidebar
          if (e.key === 'Escape') {
            if (userMenu && !userMenu.hasAttribute('hidden')) {
              userMenu.setAttribute('hidden', '');
              userMenuToggle?.setAttribute('aria-expanded', 'false');
              userMenuToggle?.focus();
            }
            
            if (sidebar?.classList.contains('open') && window.innerWidth <= 1024) {
              sidebar.classList.remove('open');
            }
          }
          
          // Enter/Space on collapsible headers
          if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('collapsible')) {
            e.preventDefault();
            e.target.click();
          }
        });
        
        // Active route highlighting
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.customer-nav-link');
        
        navLinks.forEach(link => {
          const route = link.getAttribute('data-route');
          if (route && (currentPath === route || currentPath.startsWith(route + '/'))) {
            link.closest('.customer-nav-item')?.classList.add('active');
            link.setAttribute('aria-current', 'page');
          }
        });
      });
    </script>
  `;
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateCustomerSidebarNavigation,
    generateCustomerNavigationCSS,
    generateCustomerNavigationJS,
    CUSTOMER_NAVIGATION_CONFIG,
    CUSTOMER_ICONS
  };
}