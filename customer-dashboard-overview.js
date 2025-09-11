/**
 * Customer Dashboard Overview Components
 * 
 * Complete dashboard overview implementation with widgets
 * Based on UX analysis and customer needs prioritization
 * 
 * @version 1.0.0
 */

// ============================================================================
// DASHBOARD WIDGETS CONFIGURATION
// ============================================================================

const DASHBOARD_WIDGETS = {
  alerts: {
    id: 'alerts-center',
    title: { nl: 'Alerts & Meldingen', en: 'Alerts & Notifications' },
    priority: 1,
    refreshInterval: 30000, // 30 seconds
    icon: 'bell'
  },
  performance: {
    id: 'performance-snapshot',
    title: { nl: 'Performance Vandaag', en: 'Today\'s Performance' },
    priority: 2,
    refreshInterval: 300000, // 5 minutes
    icon: 'chart-line'
  },
  shopHealth: {
    id: 'shop-health',
    title: { nl: 'Shop Status', en: 'Shop Health' },
    priority: 3,
    refreshInterval: 120000, // 2 minutes
    icon: 'storefront'
  },
  quickActions: {
    id: 'quick-actions',
    title: { nl: 'Snelle Acties', en: 'Quick Actions' },
    priority: 4,
    static: true,
    icon: 'lightning-bolt'
  },
  marketIntel: {
    id: 'market-intelligence',
    title: { nl: 'Markt Intelligence', en: 'Market Intelligence' },
    priority: 5,
    refreshInterval: 600000, // 10 minutes
    icon: 'trending-up'
  },
  competitors: {
    id: 'competitor-monitor',
    title: { nl: 'Concurrent Monitoring', en: 'Competitor Monitoring' },
    priority: 6,
    refreshInterval: 180000, // 3 minutes
    icon: 'users'
  }
};

// ============================================================================
// ALERT & NOTIFICATION CENTER
// ============================================================================

function generateAlertsWidget(alertsData, lang = 'nl') {
  const alerts = alertsData || {
    urgent: [
      { type: 'price', message: '3 nieuwe prijs wijzigingen bij concurrenten', time: '2 min geleden', action: 'view-price-changes' },
      { type: 'offline', message: 'Shop "Electronics Store" offline sinds 2u', time: '2 uur geleden', action: 'check-shop-status' }
    ],
    warnings: [
      { type: 'stock', message: '5 producten hebben voorraad issues', time: '1 uur geleden', action: 'manage-inventory' },
      { type: 'performance', message: 'Conversie rate gedaald met 15%', time: '3 uur geleden', action: 'analyze-performance' }
    ],
    info: [
      { type: 'market', message: 'Nieuwe trending product: iPhone 15 cases', time: '4 uur geleden', action: 'explore-trends' }
    ]
  };

  const urgentCount = alerts.urgent?.length || 0;
  const warningCount = alerts.warnings?.length || 0;
  const totalAlerts = urgentCount + warningCount + (alerts.info?.length || 0);

  return `
    <div class="dashboard-widget alerts-widget priority-1" data-widget="alerts-center">
      <div class="widget-header">
        <div class="widget-title">
          <div class="widget-icon urgent">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </div>
          <div class="widget-title-text">
            <h3>${lang === 'nl' ? 'Alerts & Meldingen' : 'Alerts & Notifications'}</h3>
            <span class="widget-subtitle">${totalAlerts} ${lang === 'nl' ? 'nieuwe meldingen' : 'new alerts'}</span>
          </div>
        </div>
        <div class="widget-actions">
          <button class="widget-action-btn" data-action="refresh-alerts" aria-label="Refresh alerts">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="widget-content">
        ${urgentCount > 0 ? `
          <div class="alert-section urgent">
            <div class="alert-section-header">
              <span class="alert-badge urgent">${urgentCount}</span>
              <span class="alert-section-title">${lang === 'nl' ? 'Urgent' : 'Urgent'}</span>
            </div>
            <div class="alert-list">
              ${alerts.urgent.map(alert => `
                <div class="alert-item urgent" data-alert-type="${alert.type}">
                  <div class="alert-content">
                    <div class="alert-message">${alert.message}</div>
                    <div class="alert-time">${alert.time}</div>
                  </div>
                  <div class="alert-actions">
                    <button class="alert-action-btn" data-action="${alert.action}">
                      ${lang === 'nl' ? 'Bekijk' : 'View'}
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        ${warningCount > 0 ? `
          <div class="alert-section warning">
            <div class="alert-section-header">
              <span class="alert-badge warning">${warningCount}</span>
              <span class="alert-section-title">${lang === 'nl' ? 'Waarschuwingen' : 'Warnings'}</span>
            </div>
            <div class="alert-list">
              ${alerts.warnings.map(alert => `
                <div class="alert-item warning" data-alert-type="${alert.type}">
                  <div class="alert-content">
                    <div class="alert-message">${alert.message}</div>
                    <div class="alert-time">${alert.time}</div>
                  </div>
                  <div class="alert-actions">
                    <button class="alert-action-btn" data-action="${alert.action}">
                      ${lang === 'nl' ? 'Bekijk' : 'View'}
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <div class="widget-footer">
          <a href="/dashboard/alerts?key=\${dashboardKey}&lang=${lang}" class="widget-footer-link">
            ${lang === 'nl' ? 'Alle alerts bekijken' : 'View all alerts'} →
          </a>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// PERFORMANCE SNAPSHOT WIDGET
// ============================================================================

function generatePerformanceWidget(performanceData, lang = 'nl') {
  const data = performanceData || {
    revenue: { value: 2847, change: 12, currency: 'EUR' },
    orders: { value: 23, change: 4 },
    traffic: { value: 1247, change: 8 },
    conversion: { value: 1.8, change: 0.2, unit: '%' }
  };

  const formatCurrency = (value, currency = 'EUR') => {
    return new Intl.NumberFormat(lang === 'nl' ? 'nl-NL' : 'en-US', {
      style: 'currency',
      currency: currency
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat(lang === 'nl' ? 'nl-NL' : 'en-US').format(value);
  };

  return `
    <div class="dashboard-widget performance-widget priority-2" data-widget="performance-snapshot">
      <div class="widget-header">
        <div class="widget-title">
          <div class="widget-icon performance">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
            </svg>
          </div>
          <div class="widget-title-text">
            <h3>${lang === 'nl' ? 'Performance Vandaag' : 'Today\'s Performance'}</h3>
            <span class="widget-subtitle">${lang === 'nl' ? 'Live dashboard metrics' : 'Live dashboard metrics'}</span>
          </div>
        </div>
      </div>
      
      <div class="widget-content">
        <div class="performance-grid">
          <div class="performance-metric primary">
            <div class="metric-header">
              <span class="metric-label">${lang === 'nl' ? 'Omzet' : 'Revenue'}</span>
              <span class="metric-change ${data.revenue.change >= 0 ? 'positive' : 'negative'}">
                ${data.revenue.change >= 0 ? '+' : ''}${data.revenue.change}%
              </span>
            </div>
            <div class="metric-value">${formatCurrency(data.revenue.value)}</div>
            <div class="metric-comparison">${lang === 'nl' ? 'vs gisteren' : 'vs yesterday'}</div>
          </div>
          
          <div class="performance-metric">
            <div class="metric-header">
              <span class="metric-label">${lang === 'nl' ? 'Bestellingen' : 'Orders'}</span>
              <span class="metric-change ${data.orders.change >= 0 ? 'positive' : 'negative'}">
                ${data.orders.change >= 0 ? '+' : ''}${data.orders.change}
              </span>
            </div>
            <div class="metric-value">${formatNumber(data.orders.value)}</div>
            <div class="metric-comparison">${lang === 'nl' ? 'nieuwe orders' : 'new orders'}</div>
          </div>
          
          <div class="performance-metric">
            <div class="metric-header">
              <span class="metric-label">${lang === 'nl' ? 'Bezoekers' : 'Traffic'}</span>
              <span class="metric-change ${data.traffic.change >= 0 ? 'positive' : 'negative'}">
                ${data.traffic.change >= 0 ? '+' : ''}${data.traffic.change}%
              </span>
            </div>
            <div class="metric-value">${formatNumber(data.traffic.value)}</div>
            <div class="metric-comparison">${lang === 'nl' ? 'unieke bezoekers' : 'unique visitors'}</div>
          </div>
          
          <div class="performance-metric">
            <div class="metric-header">
              <span class="metric-label">${lang === 'nl' ? 'Conversie' : 'Conversion'}</span>
              <span class="metric-change ${data.conversion.change >= 0 ? 'positive' : 'negative'}">
                ${data.conversion.change >= 0 ? '+' : ''}${data.conversion.change}%
              </span>
            </div>
            <div class="metric-value">${data.conversion.value}%</div>
            <div class="metric-comparison">${lang === 'nl' ? 'conversie rate' : 'conversion rate'}</div>
          </div>
        </div>
        
        <div class="performance-chart">
          <canvas id="performance-chart" width="400" height="120"></canvas>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// SHOP HEALTH OVERVIEW WIDGET
// ============================================================================

function generateShopHealthWidget(shopsData, lang = 'nl') {
  const shops = shopsData || [
    { id: 1, name: 'Tech Gadgets NL', status: 'online', performance: 'excellent', revenue: 1847, orders: 15 },
    { id: 2, name: 'Fashion Outlet', status: 'online', performance: 'good', revenue: 623, orders: 8 },
    { id: 3, name: 'Electronics Store', status: 'issues', performance: 'poor', revenue: 234, orders: 2 },
    { id: 4, name: 'Home & Garden', status: 'online', performance: 'good', revenue: 445, orders: 6 },
    { id: 5, name: 'Sports Equipment', status: 'online', performance: 'excellent', revenue: 698, orders: 4 }
  ];

  const onlineCount = shops.filter(shop => shop.status === 'online').length;
  const issuesCount = shops.filter(shop => shop.status === 'issues').length;
  const bestPerforming = shops.reduce((best, shop) => shop.revenue > best.revenue ? shop : best, shops[0]);
  const needsAttention = shops.find(shop => shop.performance === 'poor') || shops.find(shop => shop.status === 'issues');

  return `
    <div class="dashboard-widget shop-health-widget priority-3" data-widget="shop-health">
      <div class="widget-header">
        <div class="widget-title">
          <div class="widget-icon shop">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-6H5l7-7 7 7h-2v6z"/>
            </svg>
          </div>
          <div class="widget-title-text">
            <h3>${lang === 'nl' ? 'Shop Status' : 'Shop Health'}</h3>
            <span class="widget-subtitle">${shops.length} ${lang === 'nl' ? 'actieve shops' : 'active shops'}</span>
          </div>
        </div>
      </div>
      
      <div class="widget-content">
        <div class="shop-summary">
          <div class="shop-status-overview">
            <div class="status-item online">
              <span class="status-indicator"></span>
              <span class="status-count">${onlineCount}</span>
              <span class="status-label">${lang === 'nl' ? 'online' : 'online'}</span>
            </div>
            ${issuesCount > 0 ? `
              <div class="status-item issues">
                <span class="status-indicator"></span>
                <span class="status-count">${issuesCount}</span>
                <span class="status-label">${lang === 'nl' ? 'problemen' : 'issues'}</span>
              </div>
            ` : ''}
          </div>
          
          <div class="shop-highlights">
            <div class="highlight-item best">
              <div class="highlight-icon">🔥</div>
              <div class="highlight-content">
                <div class="highlight-label">${lang === 'nl' ? 'Best presterende' : 'Best performing'}</div>
                <div class="highlight-value">${bestPerforming.name}</div>
              </div>
            </div>
            
            ${needsAttention ? `
              <div class="highlight-item attention">
                <div class="highlight-icon">📉</div>
                <div class="highlight-content">
                  <div class="highlight-label">${lang === 'nl' ? 'Aandacht nodig' : 'Needs attention'}</div>
                  <div class="highlight-value">${needsAttention.name}</div>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
        
        <div class="shop-list">
          ${shops.slice(0, 3).map(shop => `
            <div class="shop-item ${shop.status}" data-shop-id="${shop.id}">
              <div class="shop-info">
                <div class="shop-status-indicator ${shop.status}"></div>
                <div class="shop-details">
                  <div class="shop-name">${shop.name}</div>
                  <div class="shop-metrics">
                    €${shop.revenue} • ${shop.orders} ${lang === 'nl' ? 'orders' : 'orders'}
                  </div>
                </div>
              </div>
              <div class="shop-performance">
                <span class="performance-badge ${shop.performance}">${shop.performance}</span>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="widget-footer">
          <a href="/dashboard/shops?key=\${dashboardKey}&lang=${lang}" class="widget-footer-link">
            ${lang === 'nl' ? 'Alle shops bekijken' : 'View all shops'} →
          </a>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// QUICK ACTIONS HUB
// ============================================================================

function generateQuickActionsWidget(lang = 'nl', dashboardKey = '') {
  const actions = [
    {
      id: 'add-shop',
      title: { nl: 'Shop Toevoegen', en: 'Add Shop' },
      description: { nl: 'Nieuwe DHgate shop monitoren', en: 'Monitor new DHgate shop' },
      icon: 'plus-circle',
      route: '/dashboard/shops/add',
      color: 'primary'
    },
    {
      id: 'track-product',
      title: { nl: 'Product Tracken', en: 'Track Product' },
      description: { nl: 'Product aan monitoring toevoegen', en: 'Add product to monitoring' },
      icon: 'package',
      route: '/dashboard/products/add',
      color: 'secondary'
    },
    {
      id: 'generate-report',
      title: { nl: 'Rapport Genereren', en: 'Generate Report' },
      description: { nl: 'Performance rapport maken', en: 'Create performance report' },
      icon: 'document',
      action: 'generate-report',
      color: 'success'
    },
    {
      id: 'setup-alert',
      title: { nl: 'Alert Instellen', en: 'Setup Alert' },
      description: { nl: 'Nieuwe prijs/voorraad alert', en: 'New price/stock alert' },
      icon: 'bell',
      route: '/dashboard/alerts/add',
      color: 'warning'
    }
  ];

  return `
    <div class="dashboard-widget quick-actions-widget priority-4" data-widget="quick-actions">
      <div class="widget-header">
        <div class="widget-title">
          <div class="widget-icon actions">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 1v3h7v3h-3v12h-3V7h-3V4h7V1h3zm-6 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 11v2h22v-2H1zm6 8h4v2H7v-2z"/>
            </svg>
          </div>
          <div class="widget-title-text">
            <h3>${lang === 'nl' ? 'Snelle Acties' : 'Quick Actions'}</h3>
            <span class="widget-subtitle">${lang === 'nl' ? 'Veelgebruikte taken' : 'Common tasks'}</span>
          </div>
        </div>
      </div>
      
      <div class="widget-content">
        <div class="quick-actions-grid">
          ${actions.map(action => `
            <div class="quick-action-item ${action.color}" data-action="${action.id}">
              <div class="action-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  ${getActionIcon(action.icon)}
                </svg>
              </div>
              <div class="action-content">
                <div class="action-title">${action.title[lang] || action.title['nl']}</div>
                <div class="action-description">${action.description[lang] || action.description['nl']}</div>
              </div>
              <div class="action-button">
                ${action.route ? `
                  <a href="${action.route}?key=${dashboardKey}&lang=${lang}" class="action-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </a>
                ` : `
                  <button class="action-btn" data-action="${action.action}">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </button>
                `}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function getActionIcon(iconName) {
  const icons = {
    'plus-circle': '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>',
    'package': '<path d="M12.89 3l8.11 4.55v8.9L12.89 21 4.78 16.45v-8.9L12.89 3zm6.33 6.45L12.89 6.7 6.56 9.45l6.33 2.75 6.33-2.75zM5.78 11.24l6.11 2.65v6.22l-6.11-3.65v-5.22zm14.22 0v5.22l-6.11 3.65v-6.22l6.11-2.65z"/>',
    'document': '<path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>',
    'bell': '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>'
  };
  return icons[iconName] || icons['package'];
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateAlertsWidget,
    generatePerformanceWidget,
    generateShopHealthWidget,
    generateQuickActionsWidget,
    DASHBOARD_WIDGETS
  };
}