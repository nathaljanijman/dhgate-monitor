/**
 * Admin Dashboard Navigation Components
 * 
 * Specialized navigation system for DHgate Monitor admin dashboard
 * Focus: Business Intelligence, User Management, System Operations
 * 
 * @version 1.0.0
 */

// ============================================================================
// ADMIN NAVIGATION CONFIGURATION
// ============================================================================

const ADMIN_NAVIGATION_CONFIG = {
  sidebar: {
    sections: [
      {
        id: 'core',
        icon: 'dashboard',
        title: { nl: 'Dashboard', en: 'Dashboard' },
        items: [
          { id: 'dashboard', title: { nl: 'Admin Dashboard', en: 'Admin Dashboard' }, route: '/admin/dashboard', icon: 'chart-line' }
        ]
      },
      {
        id: 'alerts',
        icon: 'bell',
        title: { nl: 'Meldingen', en: 'Notifications' },
        items: [
          { id: 'notifications', title: { nl: 'Live Alerts', en: 'Live Alerts' }, route: '/admin/notifications', icon: 'bell', prominent: true, badge: true }
        ]
      },
      {
        id: 'growth',
        icon: 'users',
        title: { nl: 'Users & Growth', en: 'Users & Growth' },
        collapsible: true,
        defaultExpanded: true,
        items: [
          { id: 'customers', title: { nl: 'Customer Accounts', en: 'Customer Accounts' }, route: '/admin/customers', icon: 'user-group' },
          { id: 'subscriptions', title: { nl: 'Subscriptions', en: 'Subscriptions' }, route: '/admin/subscriptions', icon: 'credit-card' },
          { id: 'support', title: { nl: 'Support Tickets', en: 'Support Tickets' }, route: '/admin/support', icon: 'support' }
        ]
      },
      {
        id: 'revenue',
        icon: 'currency-dollar',
        title: { nl: 'Revenue & Analytics', en: 'Revenue & Analytics' },
        collapsible: true,
        items: [
          { id: 'analytics', title: { nl: 'Platform Analytics', en: 'Platform Analytics' }, route: '/admin/analytics', icon: 'chart-bar' },
          { id: 'revenue', title: { nl: 'Revenue Tracking', en: 'Revenue Tracking' }, route: '/admin/revenue', icon: 'trending-up' },
          { id: 'affiliate', title: { nl: 'Affiliate Performance', en: 'Affiliate Performance' }, route: '/admin/affiliate', icon: 'funnel' }
        ]
      },
      {
        id: 'system',
        icon: 'cog',
        title: { nl: 'System & Operations', en: 'System & Operations' },
        collapsible: true,
        items: [
          { id: 'performance', title: { nl: 'Performance Monitor', en: 'Performance Monitor' }, route: '/admin/performance', icon: 'lightning-bolt' },
          { id: 'errors', title: { nl: 'Error Tracking', en: 'Error Tracking' }, route: '/admin/errors', icon: 'exclamation-triangle' },
          { id: 'monitoring', title: { nl: 'Security Monitor', en: 'Security Monitor' }, route: '/admin/monitoring', icon: 'shield-check' }
        ]
      },
      {
        id: 'content',
        icon: 'collection',
        title: { nl: 'Content & Tools', en: 'Content & Tools' },
        collapsible: true,
        collapsed: true,
        items: [
          { id: 'components', title: { nl: 'UI Components', en: 'UI Components' }, route: '/admin/component-library', icon: 'template' },
          { id: 'icons', title: { nl: 'Icon Library', en: 'Icon Library' }, route: '/admin/icons-components', icon: 'sparkles' }
        ]
      }
    ]
  },
  quickActions: [
    { id: 'refresh-data', title: { nl: 'Data Verversen', en: 'Refresh Data' }, icon: 'refresh', action: 'refreshDashboardData' },
    { id: 'export-report', title: { nl: 'Rapport Exporteren', en: 'Export Report' }, icon: 'download', action: 'exportBusinessReport' },
    { id: 'system-health', title: { nl: 'System Health', en: 'System Health' }, icon: 'shield-check', action: 'checkSystemHealth' },
    { id: 'admin-tools', title: { nl: 'Admin Tools', en: 'Admin Tools' }, icon: 'wrench', action: 'openAdminTools' }
  ]
};

// ============================================================================
// ADMIN SVG ICONS (Business/Enterprise focused)
// ============================================================================

const ADMIN_ICONS = {
  // Primary navigation
  'dashboard': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>',
  'analytics': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
  'users': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3 3 0 0 0 17.07 6H16.93a3 3 0 0 0-2.89 2.37L11.5 16H14v6h6zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zm-2 8.5v-6H8l2.54-7.63A3 3 0 0 1 13.43 4h.14c1.28 0 2.43.8 2.89 2.37L19 14h-2.5v6h-6z"/></svg>',
  'cog': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>',
  'collection': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2V3zm2 0v18h2V3H9zm4 0v18h2V3h-2zm4 0v18h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2z"/></svg>',
  
  // Business Intelligence
  'chart-line': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>',
  'chart-bar': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/></svg>',
  'currency-dollar': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/></svg>',
  'trending-up': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>',
  'funnel': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>',
  
  // User Management  
  'user-group': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3 3 0 0 0 17.07 6H16.93a3 3 0 0 0-2.89 2.37L11.5 16H14v6h6zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zm-2 8.5v-6H8l2.54-7.63A3 3 0 0 1 13.43 4h.14c1.28 0 2.43.8 2.89 2.37L19 14h-2.5v6h-6z"/></svg>',
  'credit-card': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>',
  'support': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>',
  'mail': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  
  // System Operations
  'lightning-bolt': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21z"/></svg>',
  'exclamation-triangle': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
  'shield-check': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z"/></svg>',
  'adjustments': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',
  
  // Content Management
  'template': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 12h8v2H8zm2 8h4v2h-4zM8 4h8v2H8z"/></svg>',
  'sparkles': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 1l2.5 5L15 8.5 9.5 11 7 16l-2.5-5L-1 8.5 4.5 6 7 1zm5.5 10l1.5 3 3-1.5-3-1.5-1.5-3zm4.5-2l1 2 2-1-2-1-1-2z"/></svg>',
  'mail-open': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  
  // Quick Actions
  'refresh': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',
  'download': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>',
  'wrench': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>',
  
  // Navigation
  'chevron-down': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>',
  'chevron-right': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>',
  'chevron-left': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',
  'menu': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>',
  'x': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
  
  // Notifications
  'bell': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>',
  'external-link': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>',
  'check': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
  'check-circle': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
  'warning': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22M12 6l7.53 13H4.47M11 10v4h2v-4m-1 6h2v2h-2"/></svg>'
};

// ============================================================================
// ADMIN SIDEBAR NAVIGATION GENERATOR
// ============================================================================

function generateAdminSidebarNavigation(currentRoute = '/admin/dashboard', lang = 'nl', theme = 'light') {
  const sections = ADMIN_NAVIGATION_CONFIG.sidebar.sections.map(section => {
    const sectionTitle = section.title[lang] || section.title['nl'];
    const isCollapsible = section.collapsible || false;
    const isCollapsed = section.collapsed === true && !section.defaultExpanded;
    const sectionId = `admin-nav-section-${section.id}`;
    
    const items = section.items.map(item => {
      const itemTitle = item.title[lang] || item.title['nl'];
      const isActive = currentRoute === item.route || currentRoute.startsWith(item.route + '/');
      const hasBadge = item.badge === true;
      
      return `
        <li class="admin-nav-item ${isActive ? 'active' : ''} ${item.prominent ? 'prominent' : ''}" role="none">
          <a href="${item.route}" 
             class="admin-nav-link" 
             data-route="${item.route}"
             role="menuitem"
             aria-current="${isActive ? 'page' : 'false'}"
             aria-label="${itemTitle} ${isActive ? '(huidige pagina)' : ''}">
            <span class="admin-nav-icon" aria-hidden="true">${ADMIN_ICONS[item.icon] || ADMIN_ICONS.template}</span>
            <span class="admin-nav-text">${itemTitle}</span>
            ${hasBadge ? '<span class="admin-nav-badge" aria-label="New alerts">4</span>' : ''}
            ${isActive ? '<span class="admin-nav-indicator" aria-hidden="true"></span>' : ''}
          </a>
        </li>
      `;
    }).join('');
    
    return `
      <div class="admin-nav-section ${isCollapsed ? 'collapsed' : ''}" 
           data-section="${section.id}"
           role="group"
           aria-labelledby="admin-section-${section.id}-header">
        <div class="admin-nav-section-header ${isCollapsible ? 'collapsible' : ''}" 
             id="admin-section-${section.id}-header"
             ${isCollapsible ? `
               data-toggle-section="${sectionId}"
               role="button"
               aria-expanded="${!isCollapsed ? 'true' : 'false'}"
               aria-controls="${sectionId}"
               tabindex="0"
               aria-label="${sectionTitle} sectie ${isCollapsible ? 'inklappen/uitklappen' : ''}"
             ` : `role="heading" aria-level="2"`}>
          <span class="admin-nav-section-icon" aria-hidden="true">${ADMIN_ICONS[section.icon] || ADMIN_ICONS.dashboard}</span>
          <span class="admin-nav-section-title">${sectionTitle}</span>
          ${isCollapsible ? `<span class="admin-nav-section-toggle" aria-hidden="true">${ADMIN_ICONS['chevron-down']}</span>` : ''}
        </div>
        <ul class="admin-nav-items" 
            id="${sectionId}"
            role="menu"
            aria-labelledby="admin-section-${section.id}-header">
          ${items}
        </ul>
      </div>
    `;
  }).join('');
  
  return `
    <nav class="admin-dashboard-sidebar" 
         data-theme="${theme}"
         role="navigation"
         aria-label="Admin dashboard hoofdnavigatie">
      <div class="admin-sidebar-header" role="banner">
        <div class="admin-sidebar-logo">
          <img src="/assets/DHGateVector.png" alt="DHgate Monitor Logo" class="admin-logo-image" />
          <div class="admin-logo-text">
            <div class="admin-logo-title">DHgate Monitor</div>
            <div class="admin-logo-subtitle">Admin Console</div>
          </div>
        </div>
        <button class="admin-sidebar-toggle" 
                data-toggle-sidebar
                aria-label="Sidebar inklappen/uitklappen"
                aria-expanded="true"
                type="button">
          ${ADMIN_ICONS['chevron-left']}
        </button>
      </div>
      <div class="admin-sidebar-content" role="main">
        ${sections}
      </div>
      <div class="admin-sidebar-footer">
        <div class="admin-user-info">
          <div class="admin-user-avatar">
            ${ADMIN_ICONS['shield-check']}
          </div>
          <div class="admin-user-details">
            <span class="admin-user-name">System Admin</span>
            <span class="admin-user-role">Administrator</span>
          </div>
        </div>
        <div class="admin-logout-section">
          <a href="/admin/logout" class="admin-logout-btn" title="${lang === 'nl' ? 'Uitloggen' : 'Logout'}">
            ${ADMIN_ICONS['chevron-right']}
          </a>
        </div>
      </div>
    </nav>
  `;
}

// ============================================================================
// ADMIN BREADCRUMB NAVIGATION GENERATOR
// ============================================================================

function generateAdminBreadcrumbNavigation(currentRoute = '/admin/dashboard', lang = 'nl') {
  const pathSegments = currentRoute.split('/').filter(segment => segment);
  
  // Admin route mapping voor breadcrumbs
  const adminRouteMap = {
    'admin': { nl: 'Admin', en: 'Admin' },
    'dashboard': { nl: 'Dashboard', en: 'Dashboard' },
    'notifications': { nl: 'Meldingen', en: 'Notifications' },
    'analytics': { nl: 'Platform Analytics', en: 'Platform Analytics' },
    'revenue': { nl: 'Revenue Tracking', en: 'Revenue Tracking' },
    'affiliate': { nl: 'Affiliate Performance', en: 'Affiliate Performance' },
    'conversions': { nl: 'Conversion Funnel', en: 'Conversion Funnel' },
    'customers': { nl: 'Customer Accounts', en: 'Customer Accounts' },
    'subscriptions': { nl: 'Subscriptions', en: 'Subscriptions' },
    'support': { nl: 'Support Tickets', en: 'Support Tickets' },
    'performance': { nl: 'Performance Monitor', en: 'Performance Monitor' },
    'errors': { nl: 'Error Tracking', en: 'Error Tracking' },
    'monitoring': { nl: 'Service Monitoring', en: 'Service Monitoring' },
    'config': { nl: 'System Config', en: 'System Config' },
    'component-library': { nl: 'UI Components', en: 'UI Components' },
    'icons-components': { nl: 'Icon Library', en: 'Icon Library' },
    'email-templates': { nl: 'Email Templates', en: 'Email Templates' }
  };
  
  let breadcrumbs = [];
  
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    breadcrumbs.push({
      title: adminRouteMap[segment] ? (adminRouteMap[segment][lang] || adminRouteMap[segment]['nl']) : segment,
      route: currentPath,
      active: isLast
    });
  });
  
  const breadcrumbItems = breadcrumbs.map((crumb, index) => {
    const isLast = index === breadcrumbs.length - 1;
    
    if (isLast || crumb.active) {
      return `
        <li class="admin-breadcrumb-item active">
          <span class="admin-breadcrumb-text">${crumb.title}</span>
        </li>
      `;
    }
    
    return `
      <li class="admin-breadcrumb-item">
        <a href="${crumb.route}" class="admin-breadcrumb-link">${crumb.title}</a>
        <span class="admin-breadcrumb-separator">${ADMIN_ICONS['chevron-right']}</span>
      </li>
    `;
  }).join('');
  
  return `
    <nav class="admin-breadcrumb-navigation" aria-label="Admin Breadcrumb">
      <ol class="admin-breadcrumb-list">
        ${breadcrumbItems}
      </ol>
    </nav>
  `;
}

// ============================================================================
// ADMIN QUICK ACTION BUTTONS GENERATOR
// ============================================================================

function generateAdminQuickActionButtons(lang = 'nl', theme = 'light') {
  const actions = ADMIN_NAVIGATION_CONFIG.quickActions.map(action => {
    const title = action.title[lang] || action.title['nl'];
    
    return `
      <button class="admin-fab-action" 
              data-action="${action.action}" 
              title="${title}">
        <span class="admin-action-icon">${ADMIN_ICONS[action.icon] || ADMIN_ICONS.wrench}</span>
        <span class="admin-action-text">${title}</span>
      </button>
    `;
  }).join('');
  
  return `
    <div class="admin-fab-container" data-theme="${theme}">
      <button class="admin-fab-toggle" title="${lang === 'nl' ? 'Quick Actions' : 'Quick Actions'}">
        ${ADMIN_ICONS['lightning-bolt']}
      </button>
      <div class="admin-fab-menu">
        ${actions}
      </div>
    </div>
  `;
}

// ============================================================================
// ADMIN DASHBOARD HEADER GENERATOR
// ============================================================================

function generateAdminDashboardHeader(currentRoute = '/admin/dashboard', lang = 'nl', theme = 'light', userEmail = 'admin@dhgate-monitor.com') {
  const breadcrumbs = generateAdminBreadcrumbNavigation(currentRoute, lang);
  
  return `
    <header class="admin-dashboard-header" data-theme="${theme}">
      <div class="admin-header-left">
        <button class="admin-mobile-toggle" data-toggle-mobile-sidebar>
          ${ADMIN_ICONS['menu']}
        </button>
        ${breadcrumbs}
      </div>
      <div class="admin-header-center">
        <!-- Clean breathing room - no clutter -->
      </div>
      <div class="admin-header-right">
        <div class="admin-header-user">
          <div class="admin-notifications">
            <button class="admin-notification-btn" data-toggle-notifications title="${lang === 'nl' ? 'Meldingen' : 'Notifications'}">
              ${ADMIN_ICONS['exclamation-triangle']}
              <span class="admin-notification-badge">3</span>
            </button>
            <div class="admin-notifications-dropdown" id="admin-notifications-menu">
              <div class="notifications-header">
                <h3>${lang === 'nl' ? 'Meldingen' : 'Notifications'} <span class="notification-count">(3)</span></h3>
                <button class="mark-all-read-btn" onclick="markAllNotificationsRead()">
                  ${lang === 'nl' ? 'Alles gelezen' : 'Mark all read'}
                </button>
              </div>
              
              <div class="notifications-list">
                <div class="notification-item critical unread" data-notification-id="1">
                  <div class="notification-icon critical">
                    ${ADMIN_ICONS['exclamation-triangle']}
                  </div>
                  <div class="notification-content">
                    <div class="notification-title">${lang === 'nl' ? 'Hoge foutfrequentie gedetecteerd' : 'High Error Rate Detected'}</div>
                    <div class="notification-desc">${lang === 'nl' ? 'API fouten zijn 300% gestegen in de laatste 15 minuten' : 'API errors increased by 300% in last 15 minutes'}</div>
                    <div class="notification-time">2 ${lang === 'nl' ? 'minuten geleden' : 'minutes ago'}</div>
                  </div>
                  <div class="notification-actions">
                    <a href="/admin/errors" class="notification-action-btn primary" onclick="markNotificationRead(1)" title="${lang === 'nl' ? 'Bekijk error logs' : 'View error logs'}">
                      ${lang === 'nl' ? 'Error Logs' : 'View Errors'}
                    </a>
                    <button class="notification-action-btn secondary" onclick="markNotificationRead(1)" title="${lang === 'nl' ? 'Verbergen' : 'Dismiss'}">
                      ${lang === 'nl' ? 'Verbergen' : 'Dismiss'}
                    </button>
                  </div>
                </div>
                
                <div class="notification-item warning unread" data-notification-id="2">
                  <div class="notification-icon warning">
                    ${ADMIN_ICONS['warning']}
                  </div>
                  <div class="notification-content">
                    <div class="notification-title">${lang === 'nl' ? 'Server schijfruimte laag' : 'Server Disk Space Low'}</div>
                    <div class="notification-desc">${lang === 'nl' ? 'Vrije schijfruimte onder 15% op hoofdserver' : 'Free disk space below 15% on main server'}</div>
                    <div class="notification-time">1 ${lang === 'nl' ? 'uur geleden' : 'hour ago'}</div>
                  </div>
                  <div class="notification-actions">
                    <a href="/admin/performance" class="notification-action-btn primary" onclick="markNotificationRead(2)" title="${lang === 'nl' ? 'Bekijk performance metrics' : 'View performance metrics'}">
                      ${lang === 'nl' ? 'Performance' : 'View Metrics'}
                    </a>
                    <button class="notification-action-btn secondary" onclick="markNotificationRead(2)" title="${lang === 'nl' ? 'Verbergen' : 'Dismiss'}">
                      ${lang === 'nl' ? 'Verbergen' : 'Dismiss'}
                    </button>
                  </div>
                </div>
                
                <div class="notification-item success unread" data-notification-id="3">
                  <div class="notification-icon success">
                    ${ADMIN_ICONS['check-circle']}
                  </div>
                  <div class="notification-content">
                    <div class="notification-title">${lang === 'nl' ? 'Nieuwe gebruikersregistraties' : 'New User Registrations'}</div>
                    <div class="notification-desc">${lang === 'nl' ? '12 nieuwe gebruikers geregistreerd vandaag' : '12 new users registered today'}</div>
                    <div class="notification-time">3 ${lang === 'nl' ? 'uur geleden' : 'hours ago'}</div>
                  </div>
                  <div class="notification-actions">
                    <a href="/admin/customers" class="notification-action-btn primary" onclick="markNotificationRead(3)" title="${lang === 'nl' ? 'Bekijk nieuwe gebruikers' : 'View new customers'}">
                      ${lang === 'nl' ? 'Klanten' : 'View Customers'}
                    </a>
                    <button class="notification-action-btn secondary" onclick="markNotificationRead(3)" title="${lang === 'nl' ? 'Verbergen' : 'Dismiss'}">
                      ${lang === 'nl' ? 'Verbergen' : 'Dismiss'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="notifications-empty" style="display: none;">
                <div class="empty-state">
                  ${ADMIN_ICONS['check-circle']}
                  <p>${lang === 'nl' ? 'Geen nieuwe meldingen' : 'No new notifications'}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="admin-user-menu">
            <button class="admin-user-toggle" data-toggle-admin-menu title="${userEmail}">
              <span class="admin-user-avatar">${ADMIN_ICONS['shield-check']}</span>
              <span class="admin-user-email">${userEmail}</span>
              <span class="admin-user-chevron">${ADMIN_ICONS['chevron-down']}</span>
            </button>
            <div class="admin-user-dropdown" id="admin-user-menu">
              <a href="/admin/profile" class="admin-dropdown-item">
                ${ADMIN_ICONS['cog']} ${lang === 'nl' ? 'Profiel' : 'Profile'}
              </a>
              <a href="/admin/system-settings" class="admin-dropdown-item">
                ${ADMIN_ICONS['adjustments']} ${lang === 'nl' ? 'Systeeminstellingen' : 'System Settings'}
              </a>
              <div class="admin-dropdown-divider"></div>
              <a href="/admin/logout" class="admin-dropdown-item">
                ${ADMIN_ICONS['chevron-right']} ${lang === 'nl' ? 'Uitloggen' : 'Sign Out'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}

// ============================================================================
// ADMIN NAVIGATION CSS STYLES
// ============================================================================

function generateAdminNavigationCSS(theme = 'light') {
  // ENHANCED UX DESIGN SYSTEM - Better contrast and spacing
  const spacing = {
    xs: '4px',   // tight spacing
    sm: '8px',   // default spacing  
    md: '16px',  // section spacing
    lg: '24px',  // major spacing
    xl: '32px'   // section breaks
  };
  
  const colors = theme === 'dark' ? {
    // Dark theme colors - Enhanced contrast ratios
    bg: '#0F172A',           
    bgSecondary: '#1E293B',  
    bgTertiary: '#334155',   
    bgCard: '#1E293B',       
    text: '#F8FAFC',         // 87% opacity - improved readability
    textSecondary: '#E2E8F0', // 60% opacity - improved from CBD5E1
    textMuted: '#94A3B8',    // Improved from 64748B for better readability
    border: '#334155',       
    borderLight: '#475569',  
    borderMedium: '#64748B', // 12% opacity improvement
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
    // Light theme colors - Enhanced contrast
    bg: '#FFFFFF',
    bgSecondary: '#F8FAFC',
    bgTertiary: '#E2E8F0',
    bgCard: '#FFFFFF',
    text: '#1E293B',         // 87% opacity equivalent
    textSecondary: '#475569', // 60% opacity - improved contrast  
    textMuted: '#64748B',    // Better readability
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    borderMedium: '#CBD5E1', // 12% opacity improvement
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
      /* Admin Dashboard Navigation Styles - UNIFIED DESIGN SYSTEM */
      
      /* RALEWAY FONT IMPORT */
      @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap');
      
      /* TYPOGRAPHY SYSTEM - Raleway Based */
      .admin-text-display { 
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; 
        font-weight: 800; 
        letter-spacing: -0.025em; 
      }
      .admin-text-heading { 
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; 
        font-weight: 700; 
        letter-spacing: -0.015em; 
      }
      .admin-text-title { 
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; 
        font-weight: 600; 
      }
      .admin-text-body { 
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; 
        font-weight: 500; 
      }
      .admin-text-caption { 
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; 
        font-weight: 400; 
        letter-spacing: 0.025em; 
      }
      
      /* BASE NAVIGATION STYLES */
      .admin-dashboard-sidebar {
        width: 260px;
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
        box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1);
      }
      
      .admin-dashboard-sidebar.collapsed {
        width: 72px;
      }
      
      .admin-sidebar-header {
        padding: 1.25rem;
        border-bottom: 2px solid ${colors.border};
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: ${colors.bgSecondary};
      }
      
      .admin-sidebar-logo {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .admin-logo-image {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        object-fit: contain;
        flex-shrink: 0;
      }
      
      .admin-logo-text {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
      }
      
      .admin-logo-title {
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        font-weight: 700;
        font-size: 1rem;
        color: ${colors.text};
        letter-spacing: -0.015em;
      }
      
      .admin-logo-subtitle {
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 0.75rem;
        color: ${colors.textSecondary};
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      
      .admin-sidebar-toggle {
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
      
      .admin-sidebar-toggle:hover {
        background: ${colors.bgTertiary};
        color: ${colors.text};
      }
      
      .admin-sidebar-toggle svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }
      
      .admin-sidebar-content {
        flex: 1;
        overflow-y: auto;
        padding: 1rem 0;
      }
      
      .admin-nav-section {
        margin-bottom: ${spacing.xl}; /* 32px - major section spacing */
      }
      
      .admin-nav-section-header {
        padding: ${spacing.md} ${spacing.lg}; /* 16px 24px - better proportions */
        display: flex;
        align-items: center;
        gap: ${spacing.sm}; /* 8px - consistent spacing */
        cursor: default;
        color: ${colors.textSecondary};
        font-size: 0.8125rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.075em;
      }
      
      .admin-nav-section-header.collapsible {
        cursor: pointer;
        transition: all 0.2s ease;
        border-radius: 0 12px 12px 0;
        margin-right: 0.5rem;
      }
      
      .admin-nav-section-header.collapsible:hover {
        color: ${colors.text};
        background: ${colors.bgSecondary};
      }
      
      .admin-nav-section-icon svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
      
      .admin-nav-section-toggle {
        margin-left: auto;
        transition: transform 0.2s ease;
      }
      
      .admin-nav-section-toggle svg {
        width: 14px;
        height: 14px;
        fill: currentColor;
      }
      
      .admin-nav-section.collapsed .admin-nav-section-toggle {
        transform: rotate(-90deg);
      }
      
      .admin-nav-items {
        list-style: none;
        padding: 0;
        margin: 0;
        transition: all 0.3s ease;
        overflow: hidden;
      }
      
      .admin-nav-section.collapsed .admin-nav-items {
        max-height: 0;
      }
      
      .admin-nav-item {
        position: relative;
        margin: 0 ${spacing.md} ${spacing.xs} ${spacing.md}; /* 0 16px 4px 16px - better proportions */
      }
      
      .admin-nav-link {
        display: flex;
        align-items: center;
        gap: ${spacing.sm}; /* 8px - consistent spacing */
        padding: ${spacing.sm} ${spacing.md}; /* 8px 16px - more balanced */
        color: ${colors.textSecondary};
        text-decoration: none;
        transition: all 0.2s ease;
        position: relative;
        border-radius: 8px;
        font-weight: 500;
      }
      
      .admin-nav-link:hover {
        background: ${colors.bgSecondary};
        color: ${colors.text};
        transform: translateX(2px);
      }
      
      .admin-nav-item.active .admin-nav-link {
        background: linear-gradient(135deg, ${colors.primary}15 0%, ${colors.accent}15 100%);
        color: ${colors.primary};
        font-weight: 600;
        border-left: 3px solid ${colors.primary};
      }
      
      /* Prominent navigation items (like notifications) */
      .admin-nav-item.prominent .admin-nav-link {
        background: linear-gradient(135deg, ${colors.accent}10 0%, ${colors.primary}10 100%);
        border: 1px solid ${colors.accent}30;
        font-weight: 600;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .admin-nav-item.prominent:not(.active) .admin-nav-link:hover {
        background: linear-gradient(135deg, ${colors.accent}20 0%, ${colors.primary}20 100%);
        border: 1px solid ${colors.accent}50;
        transform: translateX(4px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      }
      
      .admin-nav-item.prominent.active .admin-nav-link {
        background: linear-gradient(135deg, ${colors.accent}25 0%, ${colors.primary}25 100%);
        color: ${colors.accent};
        border-left: 4px solid ${colors.accent};
        border: 1px solid ${colors.accent}50;
      }
      
      .admin-nav-icon svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
        flex-shrink: 0;
      }
      
      .admin-nav-badge {
        background: ${colors.accent};
        color: white;
        font-size: 0.6875rem;
        font-weight: 600;
        padding: 0.125rem 0.375rem;
        border-radius: 10px;
        margin-left: auto;
        min-width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }
      
      .admin-nav-text {
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1.25;
      }
      
      .admin-nav-indicator {
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
        height: 6px;
        background: ${colors.primary};
        border-radius: 50%;
        opacity: 0.8;
      }
      
      .admin-sidebar-footer {
        padding: 1rem;
        border-top: 2px solid ${colors.border};
        background: ${colors.bgSecondary};
      }
      
      .admin-user-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        background: ${colors.bgCard};
        border-radius: 8px;
        border: 1px solid ${colors.borderLight};
      }
      
      .admin-user-avatar {
        width: 32px;
        height: 32px;
        background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }
      
      .admin-user-avatar svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
      
      .admin-user-details {
        flex: 1;
        display: flex;
        flex-direction: column;
        line-height: 1.2;
      }
      
      .admin-user-name {
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        font-weight: 600;
        font-size: 0.875rem;
        color: ${colors.text};
        letter-spacing: -0.01em;
      }
      
      .admin-user-role {
        font-size: 0.75rem;
        color: ${colors.textSecondary};
        text-transform: uppercase;
        letter-spacing: 0.025em;
      }
      
      .admin-logout-section {
        margin-top: 0.5rem;
        text-align: center;
      }
      
      .admin-logout-btn {
        color: ${colors.textSecondary};
        text-decoration: none;
        padding: 0.5rem;
        border-radius: 6px;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      
      .admin-logout-btn:hover {
        background: ${colors.danger}20;
        color: ${colors.danger};
      }
      
      .admin-logout-btn svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
      
      /* Admin Dashboard Header Styles */
      .admin-dashboard-header {
        height: 64px;
        background: ${colors.bgCard};
        border-bottom: 2px solid ${colors.border};
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1.5rem;
        margin-left: 260px;
        position: sticky;
        top: 0;
        z-index: 999;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      
      .admin-dashboard-sidebar.collapsed ~ .admin-dashboard-header {
        margin-left: 72px;
      }
      
      .admin-header-left {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex: 1;
      }
      
      .admin-header-center {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
      }
      
      .admin-header-right {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex: 1;
        justify-content: flex-end;
      }
      
      .admin-mobile-toggle {
        display: none;
        background: none;
        border: none;
        color: ${colors.textSecondary};
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 6px;
        transition: all 0.2s ease;
      }
      
      .admin-mobile-toggle:hover {
        background: ${colors.bgSecondary};
        color: ${colors.text};
      }
      
      .admin-mobile-toggle svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
      }
      
      /* Admin System Status */
      .admin-system-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: ${colors.bgSecondary};
        border-radius: 20px;
        border: 1px solid ${colors.borderLight};
      }
      
      .admin-status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${colors.success};
        animation: pulse 2s infinite;
      }
      
      .admin-status-indicator.offline {
        background: ${colors.danger};
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      .admin-status-text {
        font-size: 0.8125rem;
        font-weight: 500;
        color: ${colors.text};
      }
      
      /* Admin Breadcrumb Styles */
      .admin-breadcrumb-navigation {
        display: flex;
        align-items: center;
      }
      
      .admin-breadcrumb-list {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .admin-breadcrumb-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
      }
      
      .admin-breadcrumb-link {
        color: ${colors.textSecondary};
        text-decoration: none;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        transition: all 0.2s ease;
        font-weight: 500;
      }
      
      .admin-breadcrumb-link:hover {
        color: ${colors.primary};
        background: ${colors.bgSecondary};
      }
      
      .admin-breadcrumb-text {
        color: ${colors.text};
        font-weight: 600;
        padding: 0.25rem 0.5rem;
      }
      
      .admin-breadcrumb-separator svg {
        width: 14px;
        height: 14px;
        fill: ${colors.textMuted};
      }
      
      /* Admin Floating Action Button (FAB) */
      .admin-fab-container {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 1000;
      }
      
      .admin-fab-toggle {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: ${colors.primary};
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .admin-fab-toggle:hover {
        background: ${colors.primaryHover};
        transform: translateY(-2px);
        box-shadow: 0 12px 32px rgba(37, 99, 235, 0.4);
      }
      
      .admin-fab-toggle svg {
        width: 24px;
        height: 24px;
        fill: currentColor;
        transition: transform 0.3s ease;
      }
      
      .admin-fab-container.active .admin-fab-toggle svg {
        transform: rotate(45deg);
      }
      
      .admin-fab-menu {
        position: absolute;
        bottom: 72px;
        right: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
      }
      
      .admin-fab-container.active .admin-fab-menu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
        pointer-events: auto;
      }
      
      .admin-fab-action {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: ${colors.bgCard};
        color: ${colors.text};
        border: 1px solid ${colors.border};
        border-radius: 28px;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        white-space: nowrap;
        min-width: 160px;
        justify-content: flex-start;
      }
      
      .admin-fab-action:hover {
        background: ${colors.primary};
        color: white;
        border-color: ${colors.primary};
        transform: translateX(-4px);
        box-shadow: 0 8px 24px rgba(37, 99, 235, 0.2);
      }
      
      .admin-fab-action .admin-action-icon svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
        flex-shrink: 0;
      }
      
      .admin-fab-action .admin-action-text {
        font-family: 'Raleway', sans-serif;
        font-weight: 500;
      }
      
      /* FAB Responsive */
      @media (max-width: 768px) {
        .admin-fab-container {
          bottom: 16px;
          right: 16px;
        }
        
        .admin-fab-toggle {
          width: 48px;
          height: 48px;
        }
        
        .admin-fab-toggle svg {
          width: 20px;
          height: 20px;
        }
        
        .admin-fab-action {
          min-width: 140px;
          padding: 10px 14px;
          font-size: 0.8125rem;
        }
        
        .admin-fab-action .admin-action-text {
          display: none;
        }
        
        .admin-fab-action {
          min-width: auto;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          padding: 0;
          justify-content: center;
        }
      }
      
      /* Admin User Menu Styles */
      .admin-header-user {
        position: relative;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .admin-notifications {
        position: relative;
      }
      
      .admin-notification-btn {
        background: none;
        border: none;
        color: ${colors.textSecondary};
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 6px;
        transition: all 0.2s ease;
        position: relative;
      }
      
      .admin-notification-btn:hover {
        background: ${colors.bgSecondary};
        color: ${colors.warning};
      }
      
      .admin-notification-btn svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }
      
      .admin-notification-badge {
        position: absolute;
        top: -2px;
        right: -2px;
        background: ${colors.danger};
        color: white;
        font-size: 0.6875rem;
        font-weight: 600;
        padding: 0.125rem 0.375rem;
        border-radius: 10px;
        min-width: 16px;
        text-align: center;
      }
      
      /* Admin Notifications Dropdown */
      .admin-notifications-dropdown {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        width: 380px;
        background: ${colors.bgCard};
        border: 1px solid ${colors.border};
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-height: 500px;
        overflow: hidden;
      }
      
      .admin-notifications-dropdown.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      
      .notifications-header {
        padding: 1rem 1.25rem;
        border-bottom: 1px solid ${colors.border};
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: ${colors.bgSecondary};
        border-radius: 12px 12px 0 0;
      }
      
      .notifications-header h3 {
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
        color: ${colors.text};
      }
      
      .notification-count {
        color: ${colors.textMuted};
        font-weight: 400;
      }
      
      .mark-all-read-btn {
        background: none;
        border: none;
        color: ${colors.primary};
        font-size: 0.8125rem;
        font-weight: 500;
        cursor: pointer;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        transition: all 0.2s ease;
      }
      
      .mark-all-read-btn:hover {
        background: ${colors.primaryLight};
        color: ${colors.primaryDark};
      }
      
      .notifications-list {
        max-height: 400px;
        overflow-y: auto;
      }
      
      .notification-item {
        display: flex;
        padding: 1rem 1.25rem;
        border-bottom: 1px solid ${colors.borderLight};
        transition: background-color 0.2s ease;
        gap: 0.75rem;
        align-items: flex-start;
      }
      
      .notification-item:last-child {
        border-bottom: none;
      }
      
      .notification-item:hover {
        background: ${colors.bgSecondary};
      }
      
      .notification-item.unread {
        background: ${colors.bgPrimary};
        border-left: 3px solid ${colors.primary};
      }
      
      .notification-item.unread:hover {
        background: ${colors.bgSecondary};
      }
      
      .notification-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      
      .notification-icon svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
      
      .notification-icon.critical {
        background: rgba(239, 68, 68, 0.1);
        color: ${colors.danger};
      }
      
      .notification-icon.warning {
        background: rgba(245, 158, 11, 0.1);
        color: ${colors.warning};
      }
      
      .notification-icon.success {
        background: rgba(16, 185, 129, 0.1);
        color: ${colors.success};
      }
      
      .notification-icon.info {
        background: rgba(59, 130, 246, 0.1);
        color: ${colors.info};
      }
      
      .notification-content {
        flex: 1;
        min-width: 0;
      }
      
      .notification-title {
        font-size: 0.875rem;
        font-weight: 600;
        color: ${colors.text};
        margin-bottom: 0.25rem;
        line-height: 1.3;
      }
      
      .notification-desc {
        font-size: 0.8125rem;
        color: ${colors.textMuted};
        line-height: 1.4;
        margin-bottom: 0.375rem;
      }
      
      .notification-time {
        font-size: 0.75rem;
        color: ${colors.textSecondary};
        font-weight: 500;
      }
      
      .notification-actions {
        display: flex;
        gap: 0.25rem;
        align-items: flex-start;
        flex-shrink: 0;
      }
      
      .notification-action-btn {
        background: none;
        border: none;
        color: ${colors.textMuted};
        cursor: pointer;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        transition: all 0.2s ease;
        text-decoration: none;
        font-size: 0.8125rem;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
      }
      
      .notification-action-btn:hover {
        background: ${colors.bgSecondary};
        color: ${colors.primary};
        text-decoration: none;
      }
      
      .notification-action-btn.primary {
        background: ${colors.primary}15;
        color: ${colors.primary};
        border: 1px solid ${colors.primary}30;
      }
      
      .notification-action-btn.primary:hover {
        background: ${colors.primary}25;
        border: 1px solid ${colors.primary}50;
      }
      
      .notification-action-btn.secondary {
        color: ${colors.textSecondary};
        border: 1px solid ${colors.borderLight};
      }
      
      .notification-action-btn.secondary:hover {
        color: ${colors.textMuted};
        border: 1px solid ${colors.borderMedium};
      }
      
      /* New notification highlight animation */
      .notification-item.new-notification {
        background: linear-gradient(90deg, ${colors.accent}15 0%, ${colors.primary}15 100%);
        border-left: 3px solid ${colors.accent};
        animation: newNotificationGlow 3s ease-out;
        box-shadow: 0 0 0 1px ${colors.accent}30;
      }
      
      @keyframes newNotificationGlow {
        0% {
          background: linear-gradient(90deg, ${colors.accent}30 0%, ${colors.primary}30 100%);
          transform: translateX(-2px);
        }
        50% {
          background: linear-gradient(90deg, ${colors.accent}20 0%, ${colors.primary}20 100%);
        }
        100% {
          background: linear-gradient(90deg, ${colors.accent}15 0%, ${colors.primary}15 100%);
          transform: translateX(0);
        }
      }
      
      /* Pulse animation for notification badge */
      @keyframes pulse {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0 0 ${colors.primary}40;
        }
        50% {
          transform: scale(1.1);
          box-shadow: 0 0 0 4px ${colors.primary}20;
        }
        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 ${colors.primary}00;
        }
      }
      
      .notification-action-btn svg {
        width: 14px;
        height: 14px;
        fill: currentColor;
      }
      
      .notifications-empty {
        padding: 2rem;
        text-align: center;
      }
      
      .empty-state {
        color: ${colors.textMuted};
      }
      
      .empty-state svg {
        width: 48px;
        height: 48px;
        margin-bottom: 0.5rem;
        opacity: 0.5;
        fill: currentColor;
      }
      
      .empty-state p {
        margin: 0;
        font-size: 0.875rem;
      }
      
      /* Responsive notifications dropdown */
      @media (max-width: 768px) {
        .admin-notifications-dropdown {
          width: 320px;
          right: -20px;
        }
      }
      
      @media (max-width: 480px) {
        .admin-notifications-dropdown {
          width: 280px;
          right: -40px;
        }
      }
      
      .admin-user-toggle {
        background: none;
        border: none;
        color: ${colors.text};
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        border-radius: 6px;
        transition: all 0.2s ease;
      }
      
      .admin-user-toggle:hover {
        background: ${colors.bgSecondary};
      }
      
      .admin-user-avatar svg {
        width: 18px;
        height: 18px;
        fill: ${colors.primary};
      }
      
      .admin-user-email {
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        letter-spacing: -0.01em;
      }
      
      .admin-user-chevron svg {
        width: 14px;
        height: 14px;
        fill: ${colors.textSecondary};
        transition: transform 0.2s ease;
      }
      
      .admin-user-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: ${colors.bgCard};
        border: 2px solid ${colors.border};
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        min-width: 200px;
        padding: 0.5rem 0;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.2s ease;
        z-index: 1000;
      }
      
      .admin-user-dropdown.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      
      .admin-dropdown-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        color: ${colors.text};
        text-decoration: none;
        font-size: 0.875rem;
        font-weight: 500;
        transition: all 0.2s ease;
      }
      
      .admin-dropdown-item:hover {
        background: ${colors.bgSecondary};
        color: ${colors.primary};
      }
      
      .admin-dropdown-item svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
      
      .admin-dropdown-divider {
        height: 1px;
        background: ${colors.border};
        margin: 0.5rem 0;
      }
      
      /* Responsive Design */
      @media (max-width: 768px) {
        .admin-dashboard-sidebar {
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        
        .admin-dashboard-sidebar.mobile-open {
          transform: translateX(0);
        }
        
        .admin-dashboard-header {
          margin-left: 0;
          padding: 0 1rem;
        }
        
        .admin-mobile-toggle {
          display: flex;
        }
        
        .admin-quick-actions .admin-action-text {
          display: none;
        }
        
        .admin-quick-action-btn {
          padding: 0.5rem;
        }
        
        .admin-user-email {
          display: none;
        }
        
        .admin-system-status {
          display: none;
        }
      }
      
      /* Admin Dashboard collapsed states */
      .admin-dashboard-sidebar.collapsed .admin-logo-text,
      .admin-dashboard-sidebar.collapsed .admin-nav-section-title,
      .admin-dashboard-sidebar.collapsed .admin-nav-text,
      .admin-dashboard-sidebar.collapsed .admin-user-details {
        opacity: 0;
        width: 0;
        overflow: hidden;
      }
      
      .admin-dashboard-sidebar.collapsed .admin-nav-section-header {
        justify-content: center;
        padding: 0.75rem;
      }
      
      .admin-dashboard-sidebar.collapsed .admin-nav-link {
        padding: 0.75rem;
        justify-content: center;
      }
      
      .admin-dashboard-sidebar.collapsed .admin-user-info {
        justify-content: center;
        padding: 0.75rem;
      }
      
      .admin-dashboard-sidebar.collapsed .admin-logout-section {
        margin-top: 0.5rem;
      }
    </style>
  `;
}

// ============================================================================
// ADMIN NAVIGATION JAVASCRIPT
// ============================================================================

function generateAdminNavigationJS() {
  return `
    <script>
      // Admin Dashboard Navigation JavaScript
      document.addEventListener('DOMContentLoaded', function() {
        console.log('🔧 Admin Dashboard Navigation initialized');
        
        // Sidebar toggle functionality
        const sidebarToggle = document.querySelector('[data-toggle-sidebar]');
        const sidebar = document.querySelector('.admin-dashboard-sidebar');
        
        if (sidebarToggle && sidebar) {
          sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // Save state to localStorage
            localStorage.setItem('adminSidebarCollapsed', sidebar.classList.contains('collapsed'));
          });
          
          // Restore sidebar state from localStorage
          const isCollapsed = localStorage.getItem('adminSidebarCollapsed') === 'true';
          if (isCollapsed) {
            sidebar.classList.add('collapsed');
          }
        }
        
        // Collapsible sections
        document.querySelectorAll('[data-toggle-section]').forEach(toggle => {
          toggle.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-toggle-section');
            const section = document.getElementById(sectionId);
            const navSection = this.closest('.admin-nav-section');
            
            if (section && navSection) {
              navSection.classList.toggle('collapsed');
              
              // Save section state
              const sectionKey = \`admin-section-\${navSection.getAttribute('data-section')}-collapsed\`;
              localStorage.setItem(sectionKey, navSection.classList.contains('collapsed'));
            }
          });
        });
        
        // Restore section states
        document.querySelectorAll('.admin-nav-section[data-section]').forEach(section => {
          const sectionName = section.getAttribute('data-section');
          const sectionKey = \`admin-section-\${sectionName}-collapsed\`;
          const isCollapsed = localStorage.getItem(sectionKey) === 'true';
          
          if (isCollapsed) {
            section.classList.add('collapsed');
          }
        });
        
        // Admin user dropdown
        const userToggle = document.querySelector('[data-toggle-admin-menu]');
        const userMenu = document.getElementById('admin-user-menu');
        
        if (userToggle && userMenu) {
          userToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            userMenu.classList.toggle('show');
          });
          
          // Close dropdown when clicking outside
          document.addEventListener('click', function(e) {
            if (!userToggle.contains(e.target) && !userMenu.contains(e.target)) {
              userMenu.classList.remove('show');
            }
          });
        }
        
        // Admin notifications toggle functionality
        const notificationsToggle = document.querySelector('[data-toggle-notifications]');
        const notificationsMenu = document.getElementById('admin-notifications-menu');
        
        if (notificationsToggle && notificationsMenu) {
          notificationsToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationsMenu.classList.toggle('show');
            
            // Close user menu if it's open
            const userMenu = document.getElementById('admin-user-menu');
            if (userMenu) {
              userMenu.classList.remove('show');
            }
          });
          
          // Close notifications dropdown when clicking outside
          document.addEventListener('click', function(e) {
            if (!notificationsToggle.contains(e.target) && !notificationsMenu.contains(e.target)) {
              notificationsMenu.classList.remove('show');
            }
          });
        }
        
        // Admin FAB toggle functionality
        const fabContainer = document.querySelector('.admin-fab-container');
        const fabToggle = document.querySelector('.admin-fab-toggle');
        
        if (fabToggle && fabContainer) {
          fabToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            fabContainer.classList.toggle('active');
          });
          
          // Close FAB menu when clicking outside
          document.addEventListener('click', function(e) {
            if (!fabContainer.contains(e.target)) {
              fabContainer.classList.remove('active');
            }
          });
          
          // Handle FAB action clicks
          document.querySelectorAll('.admin-fab-action[data-action]').forEach(button => {
            button.addEventListener('click', function() {
              const action = this.getAttribute('data-action');
              handleAdminQuickAction(action);
              fabContainer.classList.remove('active'); // Close menu after action
            });
          });
        }
        
        // Legacy quick action handlers (fallback)
        document.querySelectorAll('[data-action]:not(.admin-fab-action)').forEach(button => {
          button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleAdminQuickAction(action);
          });
        });
        
        // Mobile sidebar toggle
        const mobileToggle = document.querySelector('[data-toggle-mobile-sidebar]');
        if (mobileToggle && sidebar) {
          mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
          });
        }
        
        // Auto-close mobile sidebar on route change
        document.addEventListener('click', function(e) {
          if (e.target.matches('a[href*="/admin/"]') && window.innerWidth <= 768) {
            setTimeout(() => {
              sidebar?.classList.remove('mobile-open');
            }, 100);
          }
        });
      });
      
      // Admin quick action handlers
      function handleAdminQuickAction(action) {
        console.log('🎯 Admin Action:', action);
        
        switch (action) {
          case 'refreshDashboardData':
            refreshAdminDashboardData();
            break;
          case 'exportBusinessReport':
            exportAdminBusinessReport();
            break;
          case 'checkSystemHealth':
            checkAdminSystemHealth();
            break;
          case 'openAdminTools':
            openAdminToolsModal();
            break;
          default:
            console.log('Unknown admin action:', action);
        }
      }
      
      function refreshAdminDashboardData() {
        console.log('🔄 Refreshing admin dashboard data...');
        // Show loading state
        document.body.style.cursor = 'wait';
        
        // Simulate data refresh
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      
      function exportAdminBusinessReport() {
        console.log('📊 Exporting business report...');
        // Implementation for business report export
        const reportData = {
          timestamp: new Date().toISOString(),
          type: 'business_intelligence',
          period: 'last_30_days'
        };
        
        // Create and download report file
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = \`admin-report-\${new Date().toISOString().split('T')[0]}.json\`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      
      function checkAdminSystemHealth() {
        console.log('🏥 Checking system health...');
        // Implementation for system health check
        alert('System Health: All services operational ✅');
      }
      
      function openAdminToolsModal() {
        console.log('🔧 Opening admin tools...');
        // Implementation for admin tools modal
        alert('Admin Tools: Feature coming soon...');
      }
      
      // Admin navigation active state management
      function updateAdminNavigationActiveState(currentRoute) {
        document.querySelectorAll('.admin-nav-item').forEach(item => {
          item.classList.remove('active');
        });
        
        const activeLink = document.querySelector(\`[data-route="\${currentRoute}"]\`);
        if (activeLink) {
          activeLink.closest('.admin-nav-item').classList.add('active');
        }
      }
      
      // Export functions for global use
      window.adminNavigation = {
        updateActiveState: updateAdminNavigationActiveState,
        handleQuickAction: handleAdminQuickAction,
        refreshData: refreshAdminDashboardData
      };
      
      // Notification action functions
      window.markNotificationRead = function(notificationId) {
        console.log('Marking notification as read:', notificationId);
        const notificationItem = document.querySelector(\`[data-notification-id="\${notificationId}"]\`);
        if (notificationItem) {
          notificationItem.classList.remove('unread');
          notificationItem.style.opacity = '0.6';
          
          // Update notification count
          updateNotificationCount();
          
          // Optional: Hide notification after a delay
          setTimeout(() => {
            notificationItem.style.display = 'none';
            updateNotificationCount();
          }, 1000);
        }
      };
      
      window.viewNotificationDetails = function(notificationId, redirectUrl) {
        console.log('Viewing notification details:', notificationId, 'redirecting to:', redirectUrl);
        
        // Mark as read first
        markNotificationRead(notificationId);
        
        // Close notifications dropdown
        const notificationsMenu = document.getElementById('admin-notifications-menu');
        if (notificationsMenu) {
          notificationsMenu.classList.remove('show');
        }
        
        // Navigate to the details page
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      };
      
      window.markAllNotificationsRead = function() {
        console.log('Marking all notifications as read');
        const unreadNotifications = document.querySelectorAll('.notification-item.unread');
        
        unreadNotifications.forEach(notification => {
          notification.classList.remove('unread');
          notification.style.opacity = '0.6';
        });
        
        // Update badge count
        updateNotificationCount();
        
        // Hide all notifications after a delay
        setTimeout(() => {
          unreadNotifications.forEach(notification => {
            notification.style.display = 'none';
          });
          
          // Show empty state if no notifications left
          showEmptyNotificationsState();
          updateNotificationCount();
        }, 1500);
      };
      
      function updateNotificationCount() {
        const unreadCount = document.querySelectorAll('.notification-item.unread:not([style*="display: none"])').length;
        const badge = document.querySelector('.admin-notification-badge');
        const headerCount = document.querySelector('.notification-count');
        
        if (badge) {
          if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'block';
          } else {
            badge.style.display = 'none';
          }
        }
        
        if (headerCount) {
          headerCount.textContent = \`(\${unreadCount})\`;
        }
        
        // If no unread notifications, show empty state after a delay
        if (unreadCount === 0) {
          setTimeout(showEmptyNotificationsState, 2000);
        }
      }
      
      function showEmptyNotificationsState() {
        const notificationsList = document.querySelector('.notifications-list');
        const emptyState = document.querySelector('.notifications-empty');
        
        if (notificationsList && emptyState) {
          const visibleNotifications = document.querySelectorAll('.notification-item:not([style*="display: none"])').length;
          
          if (visibleNotifications === 0) {
            notificationsList.style.display = 'none';
            emptyState.style.display = 'block';
          }
        }
      }
      
      // ============================================================================
      // CONTEXTUAL ACTION HELPERS
      // ============================================================================
      
      // Get contextual action text based on notification type and redirect URL
      function getContextualActionText(severity, redirectUrl) {
        if (!redirectUrl || redirectUrl === '#') return 'View Details';
        
        // Map URLs to contextual actions
        const actionMap = {
          '/admin/performance': severity === 'warning' ? 'Check Performance' : 'View Metrics',
          '/admin/errors': 'View Error Logs',
          '/admin/customers': 'View Customers',
          '/admin/revenue': 'View Revenue',
          '/admin/monitoring': 'Check Security',
          '/admin/analytics': 'View Analytics',
          '/admin/notifications': 'Manage Alerts'
        };
        
        // Check exact matches first
        if (actionMap[redirectUrl]) {
          return actionMap[redirectUrl];
        }
        
        // Check partial matches
        for (const [path, action] of Object.entries(actionMap)) {
          if (redirectUrl.includes(path)) {
            return action;
          }
        }
        
        // Fallback based on severity
        const severityMap = {
          'success': 'View Report',
          'warning': 'Check Issue',
          'error': 'Fix Problem',
          'info': 'View Details'
        };
        
        return severityMap[severity] || 'View Details';
      }
      
      // ============================================================================
      // AUTO-REFRESH NOTIFICATION SYSTEM
      // ============================================================================
      
      let notificationRefreshInterval = null;
      let lastNotificationCheck = Date.now();
      
      // Function to fetch fresh notifications from server
      async function refreshNotifications() {
        try {
          const response = await fetch('/admin/api/notifications/latest?timestamp=' + lastNotificationCheck);
          if (response.ok) {
            const data = await response.json();
            
            if (data.notifications && data.notifications.length > 0) {
              console.log(\`🔔 Received \${data.notifications.length} new notifications\`);
              
              // Add new notifications to the dropdown
              addNewNotificationsToDOM(data.notifications);
              updateNotificationCount();
              lastNotificationCheck = Date.now();
              
              // Show visual indicator for new notifications
              showNewNotificationIndicator(data.notifications.length);
              
              return true; // Found new notifications
            } else {
              console.log('📭 No new notifications');
              return false; // No new notifications
            }
          } else {
            console.warn('Failed to fetch notifications:', response.status);
            return false;
          }
        } catch (error) {
          console.error('Failed to refresh notifications:', error);
          throw error; // Re-throw for retry logic
        }
      }
      
      // Show visual indicator for new notifications
      function showNewNotificationIndicator(count) {
        const badge = document.querySelector('.admin-notification-badge');
        if (badge) {
          // Pulse animation for new notifications
          badge.style.animation = 'none';
          badge.offsetHeight; // Trigger reflow
          badge.style.animation = 'pulse 1s ease-in-out 2';
          
          // Optional: Play subtle notification sound (if user preferences allow)
          // playNotificationSound();
        }
        
        // Show temporary toast notification
        showNotificationToast(\`\${count} new notification\${count > 1 ? 's' : ''}\`);
      }
      
      // Show temporary toast notification
      function showNotificationToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.style.cssText = \`
          position: fixed;
          top: 20px;
          right: 20px;
          background: #10B981;
          color: white;
          padding: 12px 16px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 9999;
          font-size: 14px;
          font-weight: 500;
          opacity: 0;
          transform: translateY(-20px);
          transition: all 0.3s ease;
        \`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
          toast.style.opacity = '1';
          toast.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
          toast.style.opacity = '0';
          toast.style.transform = 'translateY(-20px)';
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 300);
        }, 3000);
      }
      
      // Function to add new notifications to the DOM
      function addNewNotificationsToDOM(newNotifications) {
        const notificationsList = document.querySelector('.notifications-list');
        const emptyState = document.querySelector('.notifications-empty');
        
        if (!notificationsList) return;
        
        // Hide empty state if showing
        if (emptyState) {
          emptyState.style.display = 'none';
        }
        
        // Show notifications list
        notificationsList.style.display = 'block';
        
        // Add each new notification
        newNotifications.forEach(notification => {
          const notificationHTML = \`
            <div class="notification-item unread" data-notification-id="\${notification.id}">
              <div class="notification-content">
                <div class="notification-header">
                  <span class="notification-title">\${notification.title}</span>
                  <span class="notification-time">\${notification.timeAgo}</span>
                </div>
                <div class="notification-message">
                  \${notification.message}
                </div>
                <div class="notification-actions">
                  <a href="\${notification.redirectUrl || '#'}" 
                     class="notification-action-btn primary"
                     onclick="markNotificationRead('\${notification.id}')">
                    \${getContextualActionText(notification.severity, notification.redirectUrl)}
                  </a>
                  <button class="notification-action-btn secondary" 
                          onclick="markNotificationRead('\${notification.id}')">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          \`;
          
          // Insert at the beginning of the list
          notificationsList.insertAdjacentHTML('afterbegin', notificationHTML);
        });
        
        // Add visual highlight for new notifications
        setTimeout(() => {
          newNotifications.forEach(notification => {
            const element = document.querySelector(\`[data-notification-id="\${notification.id}"]\`);
            if (element) {
              element.classList.add('new-notification');
              setTimeout(() => element.classList.remove('new-notification'), 3000);
            }
          });
        }, 100);
      }
      
      // Enhanced polling system with adaptive intervals
      let pollingInterval = 30000; // Start with 30 seconds
      let consecutiveEmptyChecks = 0;
      let isUserActive = true;
      let connectionRetryCount = 0;
      const maxRetryCount = 3;
      
      // Start auto-refresh system with advanced polling
      function startNotificationAutoRefresh() {
        // Initial refresh
        refreshNotifications();
        
        // Set up adaptive polling interval
        notificationRefreshInterval = setInterval(() => {
          if (isUserActive) {
            refreshNotificationsWithRetry();
          }
        }, pollingInterval);
        
        // Check when user opens the dropdown
        const notificationToggle = document.getElementById('admin-notifications-toggle');
        if (notificationToggle) {
          notificationToggle.addEventListener('click', () => {
            // Immediate check when opening dropdown
            setTimeout(refreshNotificationsWithRetry, 200);
            // Reset to frequent polling when interacting
            resetPollingInterval();
          });
        }
        
        // Track user activity for smart polling
        setupActivityTracking();
        
        // Setup visibility change detection
        setupVisibilityTracking();
      }
      
      // Enhanced refresh with retry logic
      async function refreshNotificationsWithRetry() {
        try {
          const hasNewNotifications = await refreshNotifications();
          connectionRetryCount = 0; // Reset on successful request
          
          // Adaptive polling based on activity
          if (hasNewNotifications) {
            consecutiveEmptyChecks = 0;
            // Increase frequency when getting notifications
            pollingInterval = Math.max(15000, pollingInterval - 5000);
          } else {
            consecutiveEmptyChecks++;
            // Decrease frequency when no new notifications
            if (consecutiveEmptyChecks > 3) {
              pollingInterval = Math.min(120000, pollingInterval + 15000); // Max 2 minutes
            }
          }
          
          // Update interval
          updatePollingInterval();
          
        } catch (error) {
          console.error('Notification refresh failed:', error);
          connectionRetryCount++;
          
          if (connectionRetryCount >= maxRetryCount) {
            console.warn('Max retry attempts reached, falling back to slower polling');
            pollingInterval = 120000; // Fall back to 2 minutes
            updatePollingInterval();
            connectionRetryCount = 0;
          }
        }
      }
      
      // Reset polling to frequent interval
      function resetPollingInterval() {
        pollingInterval = 30000;
        consecutiveEmptyChecks = 0;
        updatePollingInterval();
      }
      
      // Update the polling interval
      function updatePollingInterval() {
        if (notificationRefreshInterval) {
          clearInterval(notificationRefreshInterval);
          notificationRefreshInterval = setInterval(() => {
            if (isUserActive) {
              refreshNotificationsWithRetry();
            }
          }, pollingInterval);
        }
        console.log(\`🔄 Updated polling interval to \${pollingInterval/1000}s\`);
      }
      
      // Track user activity for smart polling
      function setupActivityTracking() {
        let activityTimer;
        
        const resetActivityTimer = () => {
          isUserActive = true;
          clearTimeout(activityTimer);
          activityTimer = setTimeout(() => {
            isUserActive = false;
            console.log('📴 User inactive, reducing notification polling');
          }, 300000); // 5 minutes of inactivity
        };
        
        // Track various user activities
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'].forEach(event => {
          document.addEventListener(event, resetActivityTimer, true);
        });
        
        resetActivityTimer(); // Initialize
      }
      
      // Track page visibility for smart polling
      function setupVisibilityTracking() {
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            console.log('📱 Page hidden, reducing notification frequency');
            isUserActive = false;
          } else {
            console.log('👀 Page visible, resuming normal notification frequency');
            isUserActive = true;
            // Immediate check when page becomes visible
            setTimeout(refreshNotificationsWithRetry, 500);
            resetPollingInterval();
          }
        });
      }
      
      // Stop auto-refresh (useful for cleanup)
      function stopNotificationAutoRefresh() {
        if (notificationRefreshInterval) {
          clearInterval(notificationRefreshInterval);
          notificationRefreshInterval = null;
        }
      }
      
      // Initialize auto-refresh when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startNotificationAutoRefresh);
      } else {
        startNotificationAutoRefresh();
      }
      
      // Stop refresh when page unloads
      window.addEventListener('beforeunload', stopNotificationAutoRefresh);
      
    </script>
  `;
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  generateAdminSidebarNavigation,
  generateAdminBreadcrumbNavigation,
  generateAdminQuickActionButtons,
  generateAdminDashboardHeader,
  generateAdminNavigationCSS,
  generateAdminNavigationJS,
  ADMIN_NAVIGATION_CONFIG,
  ADMIN_ICONS
};