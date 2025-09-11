/**
 * Dashboard Navigation Components
 * 
 * Modulaire navigatie systeem voor DHgate Monitor dashboard
 * - Sidebar navigatie met collapsible secties
 * - Breadcrumb navigatie 
 * - Quick action buttons in header
 * 
 * @version 1.0.0
 */

// ============================================================================
// NAVIGATION CONFIGURATION
// ============================================================================

const NAVIGATION_CONFIG = {
  sidebar: {
    sections: [
      {
        id: 'overview',
        icon: 'dashboard',
        title: { nl: 'Overzicht', en: 'Overview' },
        items: [
          { id: 'dashboard', title: { nl: 'Dashboard', en: 'Dashboard' }, route: '/dashboard', icon: 'home' }
        ]
      },
      {
        id: 'monitoring',
        icon: 'monitor',
        title: { nl: 'Monitoring', en: 'Monitoring' },
        collapsible: true,
        items: [
          { id: 'shops', title: { nl: 'Shop Beheer', en: 'Shop Management' }, route: '/dashboard/shops', icon: 'store' },
          { id: 'products', title: { nl: 'Product Tracker', en: 'Product Tracker' }, route: '/dashboard/products', icon: 'package' },
          { id: 'alerts', title: { nl: 'Prijs Waarschuwingen', en: 'Price Alerts' }, route: '/dashboard/alerts', icon: 'bell' }
        ]
      },
      {
        id: 'analytics',
        icon: 'chart',
        title: { nl: 'Analytics', en: 'Analytics' },
        collapsible: true,
        items: [
          { id: 'analytics', title: { nl: 'Analytics Dashboard', en: 'Analytics Dashboard' }, route: '/dashboard/analytics', icon: 'chart-bar' },
          { id: 'reports', title: { nl: 'Rapporten', en: 'Reports' }, route: '/dashboard/reports', icon: 'document' }
        ]
      },
      {
        id: 'account',
        icon: 'user',
        title: { nl: 'Account', en: 'Account' },
        collapsible: true,
        items: [
          { id: 'settings', title: { nl: 'Instellingen', en: 'Settings' }, route: '/dashboard/settings', icon: 'cog' },
          { id: 'billing', title: { nl: 'Facturering', en: 'Billing' }, route: '/dashboard/billing', icon: 'credit-card' },
          { id: 'notifications', title: { nl: 'Notificaties', en: 'Notifications' }, route: '/dashboard/notifications', icon: 'bell-alert' }
        ]
      }
    ]
  },
  quickActions: [
    { id: 'add-shop', title: { nl: 'Shop Toevoegen', en: 'Add Shop' }, icon: 'plus', action: 'openAddShopModal' },
    { id: 'export-data', title: { nl: 'Data Exporteren', en: 'Export Data' }, icon: 'download', action: 'openExportModal' },
    { id: 'help', title: { nl: 'Help', en: 'Help' }, icon: 'question', action: 'openHelpModal' }
  ]
};

// ============================================================================
// SVG ICONS
// ============================================================================

const ICONS = {
  dashboard: '<svg viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>',
  monitor: '<svg viewBox="0 0 24 24"><path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v2h12v-2l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>',
  user: '<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
  store: '<svg viewBox="0 0 24 24"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/></svg>',
  package: '<svg viewBox="0 0 24 24"><path d="M12 2l3 3h4v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V5h4l3-3zm0 2.83L10.83 6H7v13h10V6h-3.83L12 4.83z"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>',
  'chart-bar': '<svg viewBox="0 0 24 24"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/></svg>',
  document: '<svg viewBox="0 0 24 24"><path d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>',
  cog: '<svg viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>',
  'credit-card': '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>',
  'bell-alert': '<svg viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zM7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2c.15-2.65 1.51-4.97 3.55-6.42zm12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.43 1.43c2.05 1.45 3.41 3.77 3.55 6.42z"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',
  download: '<svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>',
  question: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>',
  'chevron-down': '<svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>',
  'chevron-right': '<svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>'
};

// ============================================================================
// SIDEBAR NAVIGATION GENERATOR
// ============================================================================

function generateSidebarNavigation(currentRoute = '/', lang = 'nl', theme = 'light') {
  const sections = NAVIGATION_CONFIG.sidebar.sections.map(section => {
    const sectionTitle = section.title[lang] || section.title['nl'];
    const isCollapsible = section.collapsible || false;
    const sectionId = `nav-section-${section.id}`;
    
    const items = section.items.map(item => {
      const itemTitle = item.title[lang] || item.title['nl'];
      const isActive = currentRoute === item.route || currentRoute.startsWith(item.route + '/');
      
      return `
        <li class="nav-item ${isActive ? 'active' : ''}">
          <a href="${item.route}" class="nav-link" data-route="${item.route}">
            <span class="nav-icon">${ICONS[item.icon] || ICONS.document}</span>
            <span class="nav-text">${itemTitle}</span>
            ${isActive ? '<span class="nav-indicator"></span>' : ''}
          </a>
        </li>
      `;
    }).join('');
    
    return `
      <div class="nav-section" data-section="${section.id}">
        <div class="nav-section-header ${isCollapsible ? 'collapsible' : ''}" 
             ${isCollapsible ? `data-toggle-section="${sectionId}"` : ''}>
          <span class="nav-section-icon">${ICONS[section.icon] || ICONS.dashboard}</span>
          <span class="nav-section-title">${sectionTitle}</span>
          ${isCollapsible ? `<span class="nav-section-toggle">${ICONS['chevron-down']}</span>` : ''}
        </div>
        <ul class="nav-items" id="${sectionId}">
          ${items}
        </ul>
      </div>
    `;
  }).join('');
  
  return `
    <nav class="dashboard-sidebar" data-theme="${theme}">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <img src="/assets/icons/dhgate-monitor-logo.svg" alt="DHgate Monitor" class="logo-image">
          <span class="logo-text">DHgate Monitor</span>
        </div>
        <button class="sidebar-toggle" data-toggle-sidebar>
          ${ICONS['chevron-right']}
        </button>
      </div>
      <div class="sidebar-content">
        ${sections}
      </div>
      <div class="sidebar-footer">
        <div class="user-info">
          <span class="user-avatar">${ICONS.user}</span>
          <span class="user-email" id="sidebar-user-email">user@example.com</span>
        </div>
      </div>
    </nav>
  `;
}

// ============================================================================
// BREADCRUMB NAVIGATION GENERATOR
// ============================================================================

function generateBreadcrumbNavigation(currentRoute = '/', lang = 'nl') {
  const pathSegments = currentRoute.split('/').filter(segment => segment);
  
  // Route mapping voor breadcrumbs
  const routeMap = {
    'dashboard': { nl: 'Dashboard', en: 'Dashboard' },
    'shops': { nl: 'Shop Beheer', en: 'Shop Management' },
    'products': { nl: 'Product Tracker', en: 'Product Tracker' },
    'alerts': { nl: 'Prijs Waarschuwingen', en: 'Price Alerts' },
    'analytics': { nl: 'Analytics', en: 'Analytics' },
    'reports': { nl: 'Rapporten', en: 'Reports' },
    'settings': { nl: 'Instellingen', en: 'Settings' },
    'billing': { nl: 'Facturering', en: 'Billing' },
    'notifications': { nl: 'Notificaties', en: 'Notifications' }
  };
  
  let breadcrumbs = [
    {
      title: lang === 'nl' ? 'Home' : 'Home',
      route: '/',
      active: pathSegments.length === 0
    }
  ];
  
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    breadcrumbs.push({
      title: routeMap[segment] ? (routeMap[segment][lang] || routeMap[segment]['nl']) : segment,
      route: currentPath,
      active: isLast
    });
  });
  
  const breadcrumbItems = breadcrumbs.map((crumb, index) => {
    const isLast = index === breadcrumbs.length - 1;
    
    if (isLast || crumb.active) {
      return `
        <li class="breadcrumb-item active">
          <span class="breadcrumb-text">${crumb.title}</span>
        </li>
      `;
    }
    
    return `
      <li class="breadcrumb-item">
        <a href="${crumb.route}" class="breadcrumb-link">${crumb.title}</a>
        <span class="breadcrumb-separator">${ICONS['chevron-right']}</span>
      </li>
    `;
  }).join('');
  
  return `
    <nav class="breadcrumb-navigation" aria-label="Breadcrumb">
      <ol class="breadcrumb-list">
        ${breadcrumbItems}
      </ol>
    </nav>
  `;
}

// ============================================================================
// QUICK ACTION BUTTONS GENERATOR
// ============================================================================

function generateQuickActionButtons(lang = 'nl', theme = 'light') {
  const actions = NAVIGATION_CONFIG.quickActions.map(action => {
    const title = action.title[lang] || action.title['nl'];
    
    return `
      <button class="quick-action-btn" 
              data-action="${action.action}" 
              title="${title}">
        <span class="action-icon">${ICONS[action.icon] || ICONS.plus}</span>
        <span class="action-text">${title}</span>
      </button>
    `;
  }).join('');
  
  return `
    <div class="quick-actions" data-theme="${theme}">
      ${actions}
    </div>
  `;
}

// ============================================================================
// DASHBOARD HEADER GENERATOR
// ============================================================================

function generateDashboardHeader(currentRoute = '/', lang = 'nl', theme = 'light', userEmail = '') {
  const breadcrumbs = generateBreadcrumbNavigation(currentRoute, lang);
  const quickActions = generateQuickActionButtons(lang, theme);
  
  return `
    <header class="dashboard-header" data-theme="${theme}">
      <div class="header-left">
        ${breadcrumbs}
      </div>
      <div class="header-right">
        ${quickActions}
        <div class="header-user">
          <span class="user-avatar">${ICONS.user}</span>
          <span class="user-email">${userEmail}</span>
          <div class="user-dropdown">
            <button class="dropdown-toggle" data-toggle-user-menu>
              ${ICONS['chevron-down']}
            </button>
            <div class="dropdown-menu" id="user-menu">
              <a href="/dashboard/settings" class="dropdown-item">
                ${ICONS.cog} ${lang === 'nl' ? 'Instellingen' : 'Settings'}
              </a>
              <a href="/dashboard/billing" class="dropdown-item">
                ${ICONS['credit-card']} ${lang === 'nl' ? 'Facturering' : 'Billing'}
              </a>
              <div class="dropdown-divider"></div>
              <a href="/logout" class="dropdown-item">
                ${lang === 'nl' ? 'Uitloggen' : 'Sign Out'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}

// ============================================================================
// NAVIGATION CSS STYLES
// ============================================================================

function generateNavigationCSS(theme = 'light') {
  const colors = theme === 'dark' ? {
    bg: '#1a1a1a',
    bgSecondary: '#2d2d2d',
    bgTertiary: '#404040',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    border: '#404040',
    accent: '#0066cc',
    accentHover: '#0052a3'
  } : {
    bg: '#ffffff',
    bgSecondary: '#f8f9fa',
    bgTertiary: '#e9ecef',
    text: '#212529',
    textSecondary: '#6c757d',
    border: '#dee2e6',
    accent: '#0066cc',
    accentHover: '#0052a3'
  };

  return `
    <style>
      /* Dashboard Navigation Styles */
      .dashboard-sidebar {
        width: 280px;
        height: 100vh;
        background: ${colors.bg};
        border-right: 1px solid ${colors.border};
        display: flex;
        flex-direction: column;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1000;
        transition: width 0.3s ease;
      }
      
      .dashboard-sidebar.collapsed {
        width: 64px;
      }
      
      .sidebar-header {
        padding: 1rem;
        border-bottom: 1px solid ${colors.border};
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .sidebar-logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .logo-image {
        width: 32px;
        height: 32px;
      }
      
      .logo-text {
        font-weight: 600;
        color: ${colors.text};
        font-size: 1.1rem;
      }
      
      .sidebar-toggle {
        background: none;
        border: none;
        color: ${colors.textSecondary};
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: all 0.2s ease;
      }
      
      .sidebar-toggle:hover {
        background: ${colors.bgTertiary};
        color: ${colors.text};
      }
      
      .sidebar-toggle svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
      }
      
      .sidebar-content {
        flex: 1;
        overflow-y: auto;
        padding: 1rem 0;
      }
      
      .nav-section {
        margin-bottom: 1.5rem;
      }
      
      .nav-section-header {
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: default;
        color: ${colors.textSecondary};
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      
      .nav-section-header.collapsible {
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .nav-section-header.collapsible:hover {
        color: ${colors.text};
        background: ${colors.bgSecondary};
      }
      
      .nav-section-icon svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
      
      .nav-section-toggle {
        margin-left: auto;
        transition: transform 0.2s ease;
      }
      
      .nav-section-toggle svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
      
      .nav-section.collapsed .nav-section-toggle {
        transform: rotate(-90deg);
      }
      
      .nav-items {
        list-style: none;
        padding: 0;
        margin: 0;
        transition: all 0.3s ease;
      }
      
      .nav-section.collapsed .nav-items {
        max-height: 0;
        overflow: hidden;
      }
      
      .nav-item {
        position: relative;
      }
      
      .nav-link {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        color: ${colors.text};
        text-decoration: none;
        transition: all 0.2s ease;
        position: relative;
      }
      
      .nav-link:hover {
        background: ${colors.bgSecondary};
        color: ${colors.accent};
      }
      
      .nav-item.active .nav-link {
        background: ${colors.bgSecondary};
        color: ${colors.accent};
        font-weight: 500;
      }
      
      .nav-icon svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
      }
      
      .nav-text {
        font-size: 0.9rem;
      }
      
      .nav-indicator {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 20px;
        background: ${colors.accent};
        border-radius: 0 2px 2px 0;
      }
      
      .sidebar-footer {
        padding: 1rem;
        border-top: 1px solid ${colors.border};
      }
      
      .user-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        background: ${colors.bgSecondary};
        border-radius: 6px;
      }
      
      .user-avatar svg {
        width: 24px;
        height: 24px;
        fill: ${colors.textSecondary};
      }
      
      .user-email {
        font-size: 0.875rem;
        color: ${colors.textSecondary};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      /* Dashboard Header Styles */
      .dashboard-header {
        height: 64px;
        background: ${colors.bg};
        border-bottom: 1px solid ${colors.border};
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 2rem;
        margin-left: 280px;
        position: sticky;
        top: 0;
        z-index: 999;
      }
      
      .dashboard-sidebar.collapsed + .dashboard-header {
        margin-left: 64px;
      }
      
      .header-left {
        flex: 1;
      }
      
      .header-right {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      /* Breadcrumb Styles */
      .breadcrumb-navigation {
        display: flex;
        align-items: center;
      }
      
      .breadcrumb-list {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .breadcrumb-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
      }
      
      .breadcrumb-link {
        color: ${colors.textSecondary};
        text-decoration: none;
        transition: color 0.2s ease;
      }
      
      .breadcrumb-link:hover {
        color: ${colors.accent};
      }
      
      .breadcrumb-text {
        color: ${colors.text};
        font-weight: 500;
      }
      
      .breadcrumb-separator svg {
        width: 16px;
        height: 16px;
        fill: ${colors.textSecondary};
      }
      
      /* Quick Actions Styles */
      .quick-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .quick-action-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        background: ${colors.accent};
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .quick-action-btn:hover {
        background: ${colors.accentHover};
        transform: translateY(-1px);
      }
      
      .action-icon svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
      
      /* User Dropdown Styles */
      .header-user {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .dropdown-toggle {
        background: none;
        border: none;
        color: ${colors.textSecondary};
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: all 0.2s ease;
      }
      
      .dropdown-toggle:hover {
        background: ${colors.bgTertiary};
        color: ${colors.text};
      }
      
      .dropdown-toggle svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
      
      .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        background: ${colors.bg};
        border: 1px solid ${colors.border};
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        min-width: 200px;
        padding: 0.5rem 0;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.2s ease;
        z-index: 1000;
      }
      
      .dropdown-menu.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      
      .dropdown-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        color: ${colors.text};
        text-decoration: none;
        font-size: 0.875rem;
        transition: background 0.2s ease;
      }
      
      .dropdown-item:hover {
        background: ${colors.bgSecondary};
      }
      
      .dropdown-item svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
      
      .dropdown-divider {
        height: 1px;
        background: ${colors.border};
        margin: 0.5rem 0;
      }
      
      /* Responsive Design */
      @media (max-width: 768px) {
        .dashboard-sidebar {
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        
        .dashboard-sidebar.mobile-open {
          transform: translateX(0);
        }
        
        .dashboard-header {
          margin-left: 0;
          padding: 0 1rem;
        }
        
        .quick-actions .action-text {
          display: none;
        }
        
        .quick-action-btn {
          padding: 0.5rem;
        }
        
        .user-email {
          display: none;
        }
      }
      
      /* Dashboard Sidebar collapsed states */
      .dashboard-sidebar.collapsed .logo-text,
      .dashboard-sidebar.collapsed .nav-section-title,
      .dashboard-sidebar.collapsed .nav-text,
      .dashboard-sidebar.collapsed .user-email {
        opacity: 0;
        width: 0;
        overflow: hidden;
      }
      
      .dashboard-sidebar.collapsed .nav-section-header {
        justify-content: center;
        padding: 0.5rem;
      }
      
      .dashboard-sidebar.collapsed .nav-link {
        padding: 0.75rem;
        justify-content: center;
      }
      
      .dashboard-sidebar.collapsed .user-info {
        justify-content: center;
        padding: 0.5rem;
      }
    </style>
  `;
}

// ============================================================================
// NAVIGATION JAVASCRIPT
// ============================================================================

function generateNavigationJS() {
  return `
    <script>
      // Dashboard Navigation JavaScript
      document.addEventListener('DOMContentLoaded', function() {
        // Sidebar toggle functionality
        const sidebarToggle = document.querySelector('[data-toggle-sidebar]');
        const sidebar = document.querySelector('.dashboard-sidebar');
        const header = document.querySelector('.dashboard-header');
        
        if (sidebarToggle && sidebar) {
          sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // Save state to localStorage
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
          });
          
          // Restore sidebar state from localStorage
          const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
          if (isCollapsed) {
            sidebar.classList.add('collapsed');
          }
        }
        
        // Collapsible sections
        document.querySelectorAll('[data-toggle-section]').forEach(toggle => {
          toggle.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-toggle-section');
            const section = document.getElementById(sectionId);
            const navSection = this.closest('.nav-section');
            
            if (section && navSection) {
              navSection.classList.toggle('collapsed');
              
              // Save section state
              const sectionKey = \`section-\${navSection.getAttribute('data-section')}-collapsed\`;
              localStorage.setItem(sectionKey, navSection.classList.contains('collapsed'));
            }
          });
        });
        
        // Restore section states
        document.querySelectorAll('.nav-section[data-section]').forEach(section => {
          const sectionName = section.getAttribute('data-section');
          const sectionKey = \`section-\${sectionName}-collapsed\`;
          const isCollapsed = localStorage.getItem(sectionKey) === 'true';
          
          if (isCollapsed) {
            section.classList.add('collapsed');
          }
        });
        
        // User dropdown
        const userToggle = document.querySelector('[data-toggle-user-menu]');
        const userMenu = document.getElementById('user-menu');
        
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
        
        // Quick action handlers
        document.querySelectorAll('[data-action]').forEach(button => {
          button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleQuickAction(action);
          });
        });
        
        // Mobile sidebar toggle
        if (window.innerWidth <= 768) {
          // Add mobile toggle button if not exists
          if (!document.querySelector('.mobile-sidebar-toggle')) {
            const mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-sidebar-toggle';
            mobileToggle.innerHTML = '☰';
            mobileToggle.style.cssText = \`
              position: fixed;
              top: 1rem;
              left: 1rem;
              z-index: 1001;
              background: #0066cc;
              color: white;
              border: none;
              padding: 0.5rem;
              border-radius: 4px;
              font-size: 1.2rem;
              cursor: pointer;
            \`;
            
            document.body.appendChild(mobileToggle);
            
            mobileToggle.addEventListener('click', function() {
              sidebar.classList.toggle('mobile-open');
            });
          }
        }
      });
      
      // Quick action handlers
      function handleQuickAction(action) {
        switch (action) {
          case 'openAddShopModal':
            openAddShopModal();
            break;
          case 'openExportModal':
            openExportModal();
            break;
          case 'openHelpModal':
            openHelpModal();
            break;
          default:
            console.log('Unknown action:', action);
        }
      }
      
      function openAddShopModal() {
        // Implementation for add shop modal
        console.log('Opening add shop modal...');
      }
      
      function openExportModal() {
        // Implementation for export modal  
        console.log('Opening export modal...');
      }
      
      function openHelpModal() {
        // Implementation for help modal
        console.log('Opening help modal...');
      }
      
      // Navigation active state management
      function updateNavigationActiveState(currentRoute) {
        document.querySelectorAll('.nav-item').forEach(item => {
          item.classList.remove('active');
        });
        
        const activeLink = document.querySelector(\`[data-route="\${currentRoute}"]\`);
        if (activeLink) {
          activeLink.closest('.nav-item').classList.add('active');
        }
      }
      
      // Update user info
      function updateSidebarUserInfo(userEmail) {
        const userEmailElements = document.querySelectorAll('#sidebar-user-email, .header-right .user-email');
        userEmailElements.forEach(element => {
          if (element) {
            element.textContent = userEmail;
          }
        });
      }
      
      // Export functions for global use
      window.dashboardNavigation = {
        updateActiveState: updateNavigationActiveState,
        updateUserInfo: updateSidebarUserInfo,
        handleQuickAction: handleQuickAction
      };
    </script>
  `;
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  generateSidebarNavigation,
  generateBreadcrumbNavigation, 
  generateQuickActionButtons,
  generateDashboardHeader,
  generateNavigationCSS,
  generateNavigationJS,
  NAVIGATION_CONFIG,
  ICONS
};