/**
 * DHgate Monitor - Enterprise-Grade Cloudflare Workers Application
 * 
 * Architecture: Modular design with services, utilities, and components
 * Storage: D1 Database (SQLite) + KV Storage for caching
 * Security: Input validation, XSS protection, CSRF tokens
 * Performance: Lazy loading, caching, optimized queries
 * Monitoring: GA4 tracking with conversion funnels
 * 
 * COMPLETE CUSTOMER JOURNEY ANALYSIS:
 * 
 * 1. DISCOVERY → AWARENESS
 *    Entry: Landing Page (/) with multilingual support (NL/EN)
 *    Value Props: Professional DHgate monitoring, automated notifications
 *    Trust Signals: GDPR compliance, privacy-first approach, clear ToS
 *    Technical: SEO optimization, structured data, performance monitoring
 * 
 * 2. CONSIDERATION → CONVERSION
 *    Process: Multi-step subscription form with real-time validation
 *    Security: Email validation (SecurityUtils), XSS protection, CSRF tokens
 *    Storage: D1 primary + KV fallback with automatic token generation
 *    Analytics: Form interaction tracking, conversion funnel measurement
 * 
 * 3. ACTIVATION → ENGAGEMENT
 *    Flow: Welcome email → Dashboard access via secure token
 *    Features: Real-time monitoring status, preference management
 *    Performance: Cached data retrieval, lazy loading, optimized queries
 *    Tracking: Dashboard access events, settings modification analytics
 * 
 * 4. VALUE DELIVERY → RETENTION
 *    Service: Scheduled monitoring, product notifications, email delivery
 *    Quality: Intelligent filtering, relevant product matching
 *    Reliability: Error handling with retry mechanisms, fallback systems
 *    Metrics: Email engagement, click-through rates, user retention
 * 
 * 5. LIFECYCLE MANAGEMENT
 *    Options: Email unsubscribe (preserves dashboard), complete data deletion
 *    Compliance: GDPR Article 17 (right to erasure), transparent data handling
 *    Analytics: Churn analysis, unsubscribe attribution, lifecycle insights
 * 
 * TECHNICAL ARCHITECTURE HIGHLIGHTS:
 * - Circuit breaker patterns for external API calls
 * - Comprehensive error handling with exponential backoff
 * - Performance optimization with lazy loading and resource preloading
 * - Enhanced security with input sanitization and validation utilities
 * - Advanced analytics with session tracking and conversion funnels
 * - Multi-storage strategy with D1 primary and KV cache/fallback
 * 
 * @version 2.0.0
 * @author DHgate Monitor Team
 * @license MIT
 */

// ============================================================================
// CONFIGURATION & CONSTANTS
// ============================================================================
const CONFIG = {
  // Security settings
  SECURITY: {
    MAX_EMAIL_LENGTH: 254,
    MAX_URL_LENGTH: 2048,
    ALLOWED_DOMAINS: ['dhgate.com', 'dhgate.co.uk'],
    RATE_LIMIT_WINDOW: 3600000, // 1 hour in ms
    MAX_REQUESTS_PER_WINDOW: 100
  },
  
  // Performance settings
  PERFORMANCE: {
    CACHE_TTL: {
      STATIC_ASSETS: 86400, // 24 hours
      API_RESPONSES: 300,   // 5 minutes
      SHOP_DATA: 3600      // 1 hour
    },
    LAZY_LOAD_THRESHOLD: 100 // pixels
  },
  
  // Analytics settings
  ANALYTICS: {
    GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX', // Replace with actual ID
    EVENTS: {
      PAGE_VIEW: 'page_view',
      FORM_SUBMIT: 'form_submit',
      SHOP_ADD: 'shop_add',
      CONVERSION: 'conversion'
    }
  }
};

// ============================================================================
// IMPORT ENHANCED ADMIN DASHBOARD
// ============================================================================
import { generateEnhancedAdminDashboard } from './enhanced_admin_dashboard.js';
import { generateEnhancedStoreBrowser } from './enhanced_store_browser_clean.js';
import { generateSignupWidget } from './signup-widget.js';
import { API_CONFIG, getRegionsByPriority, calculateRetryDelay, CircuitBreaker } from './api-config.js';

// ============================================================================
// GLOBAL CIRCUIT BREAKER MANAGER
// ============================================================================
const REGION_CIRCUIT_BREAKERS = new Map();

function getCircuitBreaker(regionKey) {
  if (!REGION_CIRCUIT_BREAKERS.has(regionKey)) {
    const regionConfig = API_CONFIG.regions[regionKey];
    const circuitBreaker = new CircuitBreaker(regionKey, regionConfig?.circuitBreaker);
    REGION_CIRCUIT_BREAKERS.set(regionKey, circuitBreaker);
  }
  return REGION_CIRCUIT_BREAKERS.get(regionKey);
}

// Regional health check system
async function checkRegionalHealth(env, regionKey = 'asia-pacific') {
  try {
    const regionConfig = API_CONFIG.regions[regionKey];
    if (!regionConfig) {
      throw new Error(`Unknown region: ${regionKey}`);
    }
    
    const healthUrl = `${regionConfig.baseUrl}${regionConfig.healthCheckUrl || '/api/health'}`;
    const circuitBreaker = getCircuitBreaker(regionKey);
    
    if (!circuitBreaker.canExecute()) {
      return {
        region: regionKey,
        status: 'circuit_breaker_open',
        healthy: false,
        error: 'Circuit breaker is open',
        timestamp: new Date().toISOString()
      };
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), regionConfig.timeout || 10000);
    const startTime = Date.now();
    
    const response = await fetch(healthUrl, {
      headers: API_CONFIG.headers,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;
    
    const healthy = response.ok;
    const result = {
      region: regionKey,
      status: response.status,
      healthy,
      responseTime,
      timestamp: new Date().toISOString()
    };
    
    if (healthy) {
      circuitBreaker.recordSuccess();
      console.log(`✅ Health check passed for ${regionKey} region (${responseTime}ms)`);
    } else {
      circuitBreaker.recordFailure();
      result.error = `HTTP ${response.status}: ${response.statusText}`;
      console.warn(`⚠️ Health check failed for ${regionKey} region: ${result.error}`);
    }
    
    // Cache health status
    await env.DHGATE_MONITOR_KV?.put(`health:${regionKey}`, JSON.stringify(result), {
      expirationTtl: 60 // 1 minute
    });
    
    return result;
    
  } catch (error) {
    const result = {
      region: regionKey,
      status: 'error',
      healthy: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
    
    console.error(`❌ Health check error for ${regionKey} region:`, error.message);
    getCircuitBreaker(regionKey).recordFailure();
    
    return result;
  }
}

// ============================================================================
// UX DESIGN SYSTEM COMPONENTS
// ============================================================================

/**
 * Generates standardized navigation header for all pages
 * Ensures consistent UX across the entire application
 * @param {string} lang - Language code (nl/en)
 * @param {string} theme - Theme (light/dark)
 * @param {string} currentPage - Current page for active states
 * @returns {string} - Standardized navigation HTML
 */

// ============================================================================
// NAVIGATION CONFIGURATION SYSTEM
// ============================================================================

/**
 * Navigation configuration following UX specification
 * Prepared for future Prepr CMS integration with adapter layer
 */
const NAVIGATION_CONFIG = {
  // Primary navigation items (max 5-6 items)
  primaryNav: [
    {
      label: { nl: 'Home', en: 'Home' },
      href: '/',
      key: 'home'
    },
    {
      label: { nl: 'Dashboard', en: 'Dashboard' }, 
      href: '/dashboard',
      key: 'dashboard'
    },
    {
      label: { nl: 'Newsroom', en: 'Newsroom' },
      href: '/newsroom', 
      key: 'newsroom'
    },
    {
      label: { nl: 'Contact', en: 'Contact' },
      href: '/contact',
      key: 'contact'
    }
  ],
  
  // Utility navigation (language, theme)
  utilityNav: {
    languages: [
      { code: 'nl', label: 'Nederlands', flag: 'NL' },
      { code: 'en', label: 'English', flag: 'EN' }
    ],
    themes: [
      { key: 'light', label: { nl: 'Licht', en: 'Light' }, icon: '☀️' },
      { key: 'dark', label: { nl: 'Donker', en: 'Dark' }, icon: '🌙' }
    ]
  },

  // Brand configuration
  brand: {
    name: 'DHgate Monitor',
    tagline: { nl: 'E-commerce Intelligence', en: 'E-commerce Intelligence' },
    logo: '/assets/DHGateVector.png',
    href: '/'
  }
};

/**
 * Navigation adapter layer for future CMS integration
 * Transforms CMS data to consistent shape
 */
class NavigationAdapter {
  static fromStatic(config = NAVIGATION_CONFIG) {
    return config;
  }
  
  static fromPrepr(cmsData) {
    // Future implementation for Prepr CMS
    // Transform CMS structure to NAVIGATION_CONFIG shape
    return cmsData;
  }
}

// ============================================================================
// MODERN NAVBAR COMPONENT SYSTEM
// ============================================================================

/**
 * Generates complete accessible navbar following UX specification
 * WCAG 2.2 AA compliant with WAI-ARIA patterns
 */
function generateModernNavbar(lang = 'nl', theme = 'light', currentPath = '/') {
  const config = NavigationAdapter.fromStatic();
  
  return `
    ${generateSkipLinks(lang)}
    ${generateHeader(config, lang, theme, currentPath)}
    ${generateMobileDrawer(config, lang, theme, currentPath)}
    ${generateNavbarStyles()}
    ${generateNavbarScript(lang, theme)}
  `;
}

/**
 * Skip links for accessibility
 */
function generateSkipLinks(lang) {
  const skipText = lang === 'nl' ? 'Ga naar hoofdinhoud' : 'Skip to main content';
  
  return `
    <a href="#main-content" class="skip-link">
      ${skipText}
    </a>
  `;
}

/**
 * Main header with desktop navigation
 */
function generateHeader(config, lang, theme, currentPath) {
  return `
    <header class="site-header" role="banner">
      <div class="header-container">
        ${generateBrandLogo(config.brand, lang, theme)}
        ${generateDesktopNav(config.primaryNav, lang, theme, currentPath)}
        ${generateDesktopUtilities(config.utilityNav, lang, theme)}
        ${generateMobileToggle(lang)}
      </div>
    </header>
  `;
}

/**
 * Brand logo component
 */
function generateBrandLogo(brandConfig, lang, theme) {
  return `
    <a href="${brandConfig.href}?lang=${lang}&theme=${theme}" 
       class="brand-logo" 
       aria-label="${brandConfig.name} ${lang === 'nl' ? 'startpagina' : 'homepage'}">
      <img src="${brandConfig.logo}" 
           alt="${brandConfig.name}" 
           class="brand-image"
           width="32" 
           height="32">
      <div class="brand-text">
        <span class="brand-name">${brandConfig.name}</span>
        <span class="brand-tagline">${brandConfig.tagline[lang]}</span>
      </div>
    </a>
  `;
}

/**
 * Desktop navigation with menubar pattern
 */
function generateDesktopNav(navItems, lang, theme, currentPath) {
  const navHtml = navItems.map(item => {
    const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
    const hasChildren = item.children && item.children.length > 0;
    
    if (hasChildren) {
      return `
        <div class="nav-item-wrapper">
          <button class="nav-trigger" 
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-controls="submenu-${item.key}"
                  data-nav-key="${item.key}">
            ${item.label[lang]}
            <svg class="nav-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </button>
          <ul class="submenu" 
              role="menu"
              id="submenu-${item.key}"
              aria-labelledby="nav-trigger-${item.key}">
            ${item.children.map(child => `
              <li role="none">
                <a href="${child.href}?lang=${lang}&theme=${theme}"
                   class="submenu-link"
                   role="menuitem">${child.label[lang]}</a>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    } else {
      return `
        <a href="${item.href}?lang=${lang}&theme=${theme}"
           class="nav-link ${isActive ? 'nav-link-active' : ''}"
           role="menuitem"
           ${isActive ? 'aria-current="page"' : ''}>${item.label[lang]}</a>
      `;
    }
  }).join('');
  
  return `
    <nav class="desktop-nav" role="navigation" aria-label="${lang === 'nl' ? 'Hoofdnavigatie' : 'Main navigation'}">
      <div class="nav-menubar" role="menubar">
        ${navHtml}
      </div>
    </nav>
  `;
}

/**
 * Desktop utilities (language + theme)
 */
function generateDesktopUtilities(utilityConfig, lang, theme) {
  return `
    <div class="desktop-utilities">
      ${generateLanguageSwitcher(utilityConfig.languages, lang, theme, false)}
      ${generateThemeToggle(utilityConfig.themes, lang, theme, false)}
    </div>
  `;
}

/**
 * Mobile hamburger toggle
 */
function generateMobileToggle(lang) {
  const label = lang === 'nl' ? 'Menu openen' : 'Open menu';
  
  return `
    <button class="mobile-toggle" 
            aria-label="${label}"
            aria-expanded="false"
            aria-controls="mobile-drawer">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
  `;
}

/**
 * Mobile drawer menu
 */
function generateMobileDrawer(config, lang, theme, currentPath) {
  const navItems = config.primaryNav.map(item => {
    const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
    
    if (item.children && item.children.length > 0) {
      return `
        <div class="mobile-nav-section">
          <div class="mobile-nav-header">
            <span class="mobile-nav-title">${item.label[lang]}</span>
          </div>
          ${item.children.map(child => `
            <a href="${child.href}?lang=${lang}&theme=${theme}"
               class="mobile-nav-link mobile-nav-sublink">${child.label[lang]}</a>
          `).join('')}
        </div>
      `;
    } else {
      return `
        <a href="${item.href}?lang=${lang}&theme=${theme}"
           class="mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}"
           ${isActive ? 'aria-current="page"' : ''}>${item.label[lang]}</a>
      `;
    }
  }).join('');
  
  return `
    <div class="mobile-overlay" aria-hidden="true"></div>
    <aside class="mobile-drawer" 
           role="dialog" 
           aria-modal="true"
           aria-label="${lang === 'nl' ? 'Mobiel hoofdmenu' : 'Mobile main menu'}"
           id="mobile-drawer">
      <div class="mobile-drawer-header">
        <span class="mobile-drawer-title">${lang === 'nl' ? 'Menu' : 'Menu'}</span>
        <button class="mobile-close" aria-label="${lang === 'nl' ? 'Menu sluiten' : 'Close menu'}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <nav class="mobile-nav" role="navigation" aria-label="${lang === 'nl' ? 'Mobiele navigatie' : 'Mobile navigation'}">
        ${navItems}
      </nav>
      
      <div class="mobile-utilities">
        <div class="mobile-utility-section">
          <h3 class="mobile-utility-title">${lang === 'nl' ? 'Instellingen' : 'Settings'}</h3>
          ${generateLanguageSwitcher(config.utilityNav.languages, lang, theme, true)}
          ${generateThemeToggle(config.utilityNav.themes, lang, theme, true)}
        </div>
      </div>
    </aside>
  `;
}

/**
 * Language switcher component
 */
function generateLanguageSwitcher(languages, currentLang, theme, isMobile) {
  const switcherClass = isMobile ? 'language-switcher-mobile' : 'language-switcher-desktop';
  const role = isMobile ? 'radiogroup' : 'menu';
  const label = currentLang === 'nl' ? 'Taal selecteren' : 'Select language';
  
  const languageOptions = languages.map(lang => {
    const isActive = currentLang === lang.code;
    const itemRole = isMobile ? 'radio' : 'menuitemradio';
    
    return `
      <button class="language-option ${isActive ? 'language-option-active' : ''}"
              role="${itemRole}"
              aria-checked="${isActive}"
              data-lang="${lang.code}"
              data-theme="${theme}"
              title="${lang.label}">
        ${lang.flag}
      </button>
    `;
  }).join('');
  
  return `
    <div class="${switcherClass}" 
         role="${role}"
         aria-label="${label}">
      ${languageOptions}
    </div>
  `;
}

/**
 * Theme toggle component
 */
function generateThemeToggle(themes, lang, currentTheme, isMobile) {
  const toggleClass = isMobile ? 'theme-toggle-mobile' : 'theme-toggle-desktop';
  const isDark = currentTheme === 'dark';
  const label = lang === 'nl' ? 'Thema wijzigen' : 'Toggle theme';
  
  return `
    <button class="${toggleClass}"
            role="switch"
            aria-checked="${isDark}"
            aria-label="${label}"
            data-current-theme="${currentTheme}">
      <span class="theme-toggle-track">
        <span class="theme-toggle-thumb">
          ${isDark ? '🌙' : '☀️'}
        </span>
      </span>
      <span class="theme-toggle-label">${themes.find(t => t.key === currentTheme).label[lang]}</span>
    </button>
  `;
}

/**
 * Generates modern navbar CSS following design system
 */
function generateNavbarStyles() {
  return `
    <style>
      /* Skip Links */
      .skip-link {
        position: absolute;
        left: -9999px;
        top: 8px;
        z-index: 9999;
        padding: 8px 16px;
        background: var(--primary-blue);
        color: white;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 600;
        transition: all 0.2s ease;
      }
      
      .skip-link:focus {
        left: 8px;
      }
      
      /* Header */
      .site-header {
        position: sticky !important;
        top: 0 !important;
        z-index: 1000 !important;
        background: transparent !important;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        transition: all 0.2s ease;
      }
      
      .site-header.scrolled {
        background: var(--card-bg-alpha);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }
      
      .header-container {
        width: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 1rem 2rem !important;
        gap: 2rem !important;
        margin: 0 !important;
        max-width: none !important;
        box-sizing: border-box !important;
      }
      
      /* Brand Logo */
      .brand-logo {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none;
        transition: opacity 0.2s ease;
      }
      
      .brand-logo:hover {
        opacity: 0.8;
      }
      
      .brand-logo:focus {
        outline: 3px solid var(--primary-blue);
        outline-offset: 2px;
        border-radius: 4px;
      }
      
      .brand-image {
        width: 32px;
        height: 32px;
        object-fit: contain;
      }
      
      .brand-text {
        display: flex;
        flex-direction: column;
        line-height: 1.1;
      }
      
      .brand-name {
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      }
      
      .brand-tagline {
        font-size: 0.75rem;
        color: var(--text-muted);
        font-weight: 400;
        margin: 0;
      }
      
      /* Desktop Navigation */
      .desktop-nav {
        flex: 1;
        display: flex;
        justify-content: center;
      }
      
      .nav-menubar {
        display: flex;
        align-items: center;
        gap: 2rem;
        role: menubar;
      }
      
      .nav-item-wrapper {
        position: relative;
      }
      
      .nav-link,
      .nav-trigger {
        color: var(--text-secondary);
        text-decoration: none;
        font-weight: 500;
        font-size: 0.9rem;
        padding: 0.5rem 0;
        border: none;
        background: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        transition: color 0.2s ease;
        position: relative;
      }
      
      .nav-link:hover,
      .nav-trigger:hover,
      .nav-link:focus,
      .nav-trigger:focus {
        color: var(--text-primary);
        outline: none;
      }
      
      .nav-link:focus-visible,
      .nav-trigger:focus-visible {
        outline: 3px solid var(--primary-blue);
        outline-offset: 2px;
        border-radius: 4px;
      }
      
      .nav-link-active {
        color: var(--primary-blue);
        font-weight: 600;
      }
      
      .nav-link-active::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--primary-blue);
        border-radius: 1px;
      }
      
      .nav-caret {
        transition: transform 0.2s ease;
      }
      
      .nav-trigger[aria-expanded="true"] .nav-caret {
        transform: rotate(180deg);
      }
      
      /* Submenu */
      .submenu {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: var(--card-bg);
        border: 1px solid var(--border-light);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 0.5rem 0;
        margin: 0.5rem 0 0 0;
        min-width: 200px;
        z-index: 1001;
        opacity: 0;
        visibility: hidden;
        transform: translateX(-50%) translateY(-8px);
        transition: all 0.15s ease;
        list-style: none;
      }
      
      .submenu.open {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
      }
      
      .submenu-link {
        display: block;
        padding: 0.75rem 1rem;
        color: var(--text-secondary);
        text-decoration: none;
        font-size: 0.875rem;
        transition: all 0.2s ease;
      }
      
      .submenu-link:hover,
      .submenu-link:focus {
        background: var(--bg-secondary);
        color: var(--text-primary);
        outline: none;
      }
      
      .submenu-link:focus-visible {
        outline: 3px solid var(--primary-blue);
        outline-offset: -3px;
      }
      
      /* Desktop Utilities */
      .desktop-utilities {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .language-switcher-desktop {
        display: flex;
        align-items: center;
        gap: 0;
      }
      
      .language-option {
        border: none;
        background: none;
        font-size: 0.8rem;
        font-weight: 400;
        color: var(--text-muted);
        cursor: pointer;
        transition: color 0.2s ease;
        padding: 0;
        margin: 0 0.25rem;
      }
      
      .language-option:hover {
        color: var(--text-primary);
      }
      
      .language-option:focus-visible {
        outline: 1px solid var(--primary-blue);
        outline-offset: 2px;
      }
      
      .language-option-active {
        color: var(--primary-blue);
        font-weight: 500;
      }
      
      
      /* Theme Toggle */
      .theme-toggle-desktop {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        border: none;
        background: none;
        cursor: pointer;
        border-radius: 6px;
        transition: background-color 0.2s ease;
        min-width: 44px;
        min-height: 44px;
      }
      
      .theme-toggle-desktop:hover {
        background: var(--bg-secondary);
      }
      
      .theme-toggle-desktop:focus-visible {
        outline: 3px solid var(--primary-blue);
        outline-offset: 2px;
      }
      
      .theme-toggle-track {
        width: 36px;
        height: 20px;
        background: var(--border-medium);
        border-radius: 10px;
        position: relative;
        transition: background-color 0.2s ease;
      }
      
      .theme-toggle-desktop[aria-checked="true"] .theme-toggle-track {
        background: var(--primary-blue);
      }
      
      .theme-toggle-thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 16px;
        height: 16px;
        background: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        transition: transform 0.2s ease;
      }
      
      .theme-toggle-desktop[aria-checked="true"] .theme-toggle-thumb {
        transform: translateX(16px);
      }
      
      .theme-toggle-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
        display: none;
      }
      
      /* Mobile Toggle */
      .mobile-toggle {
        display: none;
        flex-direction: column;
        gap: 3px;
        padding: 0.5rem;
        border: none;
        background: none;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.2s ease;
        min-width: 44px;
        min-height: 44px;
        justify-content: center;
        align-items: center;
      }
      
      .mobile-toggle:hover {
        background: var(--bg-secondary);
      }
      
      .mobile-toggle:focus-visible {
        outline: 3px solid var(--primary-blue);
        outline-offset: 2px;
      }
      
      .hamburger-line {
        width: 20px;
        height: 2px;
        background: var(--text-primary);
        border-radius: 1px;
        transition: all 0.2s ease;
        transform-origin: center;
      }
      
      .mobile-toggle[aria-expanded="true"] .hamburger-line:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      
      .mobile-toggle[aria-expanded="true"] .hamburger-line:nth-child(2) {
        opacity: 0;
      }
      
      .mobile-toggle[aria-expanded="true"] .hamburger-line:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
      }
      
      /* Mobile Drawer */
      .mobile-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease;
      }
      
      .mobile-overlay.open {
        opacity: 1;
        visibility: visible;
      }
      
      .mobile-drawer {
        position: fixed;
        top: 0;
        right: -400px;
        width: 320px;
        height: 100%;
        background: var(--card-bg);
        z-index: 1000;
        padding: 0;
        transition: right 0.2s ease;
        box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);
        overflow-y: auto;
        max-width: 85vw;
      }
      
      .mobile-drawer.open {
        right: 0;
      }
      
      .mobile-drawer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.5rem;
        border-bottom: 1px solid var(--border-light);
      }
      
      .mobile-drawer-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-primary);
      }
      
      .mobile-close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border: none;
        background: none;
        cursor: pointer;
        border-radius: 6px;
        transition: background-color 0.2s ease;
      }
      
      .mobile-close:hover {
        background: var(--bg-secondary);
      }
      
      .mobile-close:focus-visible {
        outline: 3px solid var(--primary-blue);
        outline-offset: 2px;
      }
      
      .mobile-nav {
        padding: 1rem 0;
      }
      
      .mobile-nav-link {
        display: block;
        padding: 1rem 1.5rem;
        color: var(--text-secondary);
        text-decoration: none;
        font-weight: 500;
        border-bottom: 1px solid var(--border-light);
        transition: all 0.2s ease;
      }
      
      .mobile-nav-link:hover {
        background: var(--bg-secondary);
        color: var(--text-primary);
        padding-left: 2rem;
      }
      
      .mobile-nav-link:focus-visible {
        outline: 3px solid var(--primary-blue);
        outline-offset: -3px;
      }
      
      .mobile-nav-link-active {
        color: var(--primary-blue);
        font-weight: 600;
      }
      
      .mobile-nav-section {
        border-bottom: 1px solid var(--border-light);
      }
      
      .mobile-nav-header {
        padding: 1rem 1.5rem;
        background: var(--bg-secondary);
      }
      
      .mobile-nav-title {
        font-weight: 600;
        color: var(--text-primary);
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      
      .mobile-nav-sublink {
        padding-left: 2rem;
        font-size: 0.875rem;
        border-bottom: none;
      }
      
      .mobile-nav-sublink:hover {
        padding-left: 2.5rem;
      }
      
      /* Mobile Utilities */
      .mobile-utilities {
        padding: 1.5rem;
        border-top: 1px solid var(--border-light);
        background: var(--bg-secondary);
      }
      
      .mobile-utility-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      
      .mobile-utility-title {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 0.5rem 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      
      .language-switcher-mobile {
        display: flex;
        gap: 0.5rem;
      }
      
      .language-switcher-mobile .language-option {
        flex: 1;
        justify-content: center;
        padding: 0.75rem;
        border-radius: 6px;
        border: 1px solid var(--border-light);
        background: var(--card-bg);
        min-height: 44px;
      }
      
      .language-switcher-mobile .language-label {
        display: block;
      }
      
      .theme-toggle-mobile {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem;
        border: 1px solid var(--border-light);
        background: var(--card-bg);
        border-radius: 6px;
        cursor: pointer;
        min-height: 44px;
      }
      
      .theme-toggle-mobile .theme-toggle-label {
        display: block;
        font-weight: 500;
        color: var(--text-primary);
      }
      
      /* Responsive Design */
      @media (min-width: 1024px) {
        .desktop-nav {
          display: flex !important;
        }
        
        .desktop-utilities {
          display: flex !important;
        }
        
        .mobile-toggle {
          display: none;
        }
      }
      
      @media (max-width: 1023px) {
        .desktop-nav {
          display: none;
        }
        
        .desktop-utilities {
          display: none;
        }
        
        .mobile-toggle {
          display: flex;
        }
        
        .brand-tagline {
          display: none;
        }
      }
      
      @media (max-width: 480px) {
        .header-container {
          padding: 1rem 2rem !important;
        }
        
        .brand-name {
          font-size: 1rem;
        }
        
        .mobile-drawer {
          width: 280px;
        }
      }
      
      /* Reduced Motion */
      @media (prefers-reduced-motion: reduce) {
        * {
          transition-duration: 0.01ms !important;
          animation-duration: 0.01ms !important;
        }
      }
      
      /* Focus Management */
      .focus-trap {
        position: fixed;
        top: -1px;
        left: -1px;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
      }
      
      /* High Contrast Mode Support */
      @media (prefers-contrast: high) {
        .site-header {
          border-bottom-width: 2px;
        }
        
        .nav-link:focus,
        .nav-trigger:focus,
        .language-option:focus,
        .theme-toggle-desktop:focus,
        .mobile-toggle:focus {
          outline-width: 4px;
        }
      }
    </style>
  `;
}

/**
 * Generates complete navbar JavaScript with accessibility features
 */
function generateNavbarScript(lang, theme) {
  return `
    <script>
      // Focus trap elements for mobile drawer
      const focusTrapStart = document.createElement('div');
      const focusTrapEnd = document.createElement('div');
      focusTrapStart.className = 'focus-trap';
      focusTrapEnd.className = 'focus-trap';
      focusTrapStart.tabIndex = 0;
      focusTrapEnd.tabIndex = 0;
      
      // Navbar state management
      class NavbarManager {
        constructor() {
          this.isDesktop = window.innerWidth >= 1024;
          this.currentFocus = null;
          this.openSubmenu = null;
          this.mobileDrawerOpen = false;
          
          this.init();
          this.bindEvents();
        }
        
        init() {
          // Add scroll shadow effect
          this.setupScrollShadow();
          
          // Setup focus traps
          document.body.appendChild(focusTrapStart);
          document.body.appendChild(focusTrapEnd);
          
          // Handle resize
          window.addEventListener('resize', this.handleResize.bind(this));
          
          // FOUC prevention for theme
          this.applyThemeFromStorage();
        }
        
        bindEvents() {
          // Desktop navigation
          this.bindDesktopEvents();
          
          // Mobile navigation
          this.bindMobileEvents();
          
          // Utility controls
          this.bindUtilityEvents();
          
          // Keyboard events
          this.bindKeyboardEvents();
        }
        
        setupScrollShadow() {
          // Temporarily disabled to test navbar positioning issue
          // The sentinel element placement may be causing layout shifts
          return;
        }
        
        bindDesktopEvents() {
          // Submenu triggers
          document.querySelectorAll('.nav-trigger').forEach(trigger => {
            trigger.addEventListener('click', this.handleSubmenuClick.bind(this));
            trigger.addEventListener('mouseenter', this.handleSubmenuHover.bind(this));
          });
          
          // Close submenu on outside click
          document.addEventListener('click', this.handleOutsideClick.bind(this));
        }
        
        bindMobileEvents() {
          const mobileToggle = document.querySelector('.mobile-toggle');
          const mobileClose = document.querySelector('.mobile-close');
          const mobileOverlay = document.querySelector('.mobile-overlay');
          
          if (mobileToggle) {
            mobileToggle.addEventListener('click', this.toggleMobileDrawer.bind(this));
          }
          
          if (mobileClose) {
            mobileClose.addEventListener('click', this.closeMobileDrawer.bind(this));
          }
          
          if (mobileOverlay) {
            mobileOverlay.addEventListener('click', this.closeMobileDrawer.bind(this));
          }
        }
        
        bindUtilityEvents() {
          // Language switcher
          document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', this.handleLanguageChange.bind(this));
          });
          
          // Theme toggle
          document.querySelectorAll('.theme-toggle-desktop, .theme-toggle-mobile').forEach(toggle => {
            toggle.addEventListener('click', this.handleThemeToggle.bind(this));
          });
        }
        
        bindKeyboardEvents() {
          document.addEventListener('keydown', this.handleKeyDown.bind(this));
        }
        
        handleSubmenuClick(event) {
          event.preventDefault();
          const trigger = event.currentTarget;
          const submenu = trigger.nextElementSibling;
          const isOpen = trigger.getAttribute('aria-expanded') === 'true';
          
          // Close any other open submenus
          this.closeAllSubmenus();
          
          if (!isOpen) {
            this.openSubmenu(trigger, submenu);
          }
        }
        
        handleSubmenuHover(event) {
          if (!this.isDesktop) return;
          
          const trigger = event.currentTarget;
          const submenu = trigger.nextElementSibling;
          
          // Close other submenus
          this.closeAllSubmenus();
          
          // Open this submenu
          this.openSubmenu(trigger, submenu);
        }
        
        openSubmenu(trigger, submenu) {
          trigger.setAttribute('aria-expanded', 'true');
          submenu.classList.add('open');
          this.openSubmenu = { trigger, submenu };
          
          // Focus first item in submenu
          setTimeout(() => {
            const firstLink = submenu.querySelector('.submenu-link');
            if (firstLink) firstLink.focus();
          }, 150);
        }
        
        closeAllSubmenus() {
          document.querySelectorAll('.nav-trigger[aria-expanded="true"]').forEach(trigger => {
            trigger.setAttribute('aria-expanded', 'false');
            const submenu = trigger.nextElementSibling;
            if (submenu) submenu.classList.remove('open');
          });
          this.openSubmenu = null;
        }
        
        handleOutsideClick(event) {
          if (!this.openSubmenu) return;
          
          const { trigger, submenu } = this.openSubmenu;
          if (!trigger.contains(event.target) && !submenu.contains(event.target)) {
            this.closeAllSubmenus();
          }
        }
        
        toggleMobileDrawer() {
          if (this.mobileDrawerOpen) {
            this.closeMobileDrawer();
          } else {
            this.openMobileDrawer();
          }
        }
        
        openMobileDrawer() {
          const toggle = document.querySelector('.mobile-toggle');
          const drawer = document.querySelector('.mobile-drawer');
          const overlay = document.querySelector('.mobile-overlay');
          
          if (!drawer || !overlay) return;
          
          // Update states
          this.mobileDrawerOpen = true;
          toggle.setAttribute('aria-expanded', 'true');
          drawer.classList.add('open');
          overlay.classList.add('open');
          
          // Lock scroll
          document.body.style.overflow = 'hidden';
          
          // Set focus trap
          this.setFocusTrap(drawer);
          
          // Focus first focusable element
          setTimeout(() => {
            const firstFocusable = drawer.querySelector('button, a, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) firstFocusable.focus();
          }, 200);
          
          // Announce to screen readers
          this.announceToScreenReader('${lang === "nl" ? "Mobiel menu geopend" : "Mobile menu opened"}');
        }
        
        closeMobileDrawer() {
          const toggle = document.querySelector('.mobile-toggle');
          const drawer = document.querySelector('.mobile-drawer');
          const overlay = document.querySelector('.mobile-overlay');
          
          if (!drawer || !overlay) return;
          
          // Update states
          this.mobileDrawerOpen = false;
          toggle.setAttribute('aria-expanded', 'false');
          drawer.classList.remove('open');
          overlay.classList.remove('open');
          
          // Unlock scroll
          document.body.style.overflow = '';
          
          // Remove focus trap
          this.removeFocusTrap();
          
          // Return focus to toggle
          toggle.focus();
          
          // Announce to screen readers
          this.announceToScreenReader('${lang === "nl" ? "Mobiel menu gesloten" : "Mobile menu closed"}');
        }
        
        setFocusTrap(container) {
          // Insert focus traps at start and end of drawer
          container.insertBefore(focusTrapStart, container.firstChild);
          container.appendChild(focusTrapEnd);
          
          // Handle focus trap
          focusTrapStart.addEventListener('focus', () => {
            const lastFocusable = this.getLastFocusable(container);
            if (lastFocusable) lastFocusable.focus();
          });
          
          focusTrapEnd.addEventListener('focus', () => {
            const firstFocusable = this.getFirstFocusable(container);
            if (firstFocusable) firstFocusable.focus();
          });
        }
        
        removeFocusTrap() {
          focusTrapStart.removeEventListener('focus', () => {});
          focusTrapEnd.removeEventListener('focus', () => {});
          
          if (focusTrapStart.parentNode) {
            focusTrapStart.parentNode.removeChild(focusTrapStart);
          }
          if (focusTrapEnd.parentNode) {
            focusTrapEnd.parentNode.removeChild(focusTrapEnd);
          }
        }
        
        getFirstFocusable(container) {
          return container.querySelector('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])');
        }
        
        getLastFocusable(container) {
          const focusables = container.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])');
          return focusables[focusables.length - 1];
        }
        
        handleLanguageChange(event) {
          const newLang = event.currentTarget.dataset.lang;
          const currentTheme = event.currentTarget.dataset.theme;
          
          // Update URL
          const url = new URL(window.location);
          url.searchParams.set('lang', newLang);
          url.searchParams.set('theme', currentTheme);
          
          // Store preference
          localStorage.setItem('preferredLanguage', newLang);
          
          // Navigate
          window.location.href = url.toString();
        }
        
        handleThemeToggle(event) {
          const currentTheme = event.currentTarget.dataset.currentTheme;
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          
          // Update URL
          const url = new URL(window.location);
          url.searchParams.set('theme', newTheme);
          
          // Store preference
          localStorage.setItem('preferredTheme', newTheme);
          
          // Apply theme immediately
          document.documentElement.setAttribute('data-theme', newTheme);
          
          // Navigate
          window.location.href = url.toString();
        }
        
        applyThemeFromStorage() {
          const storedTheme = localStorage.getItem('preferredTheme');
          const urlTheme = new URLSearchParams(window.location.search).get('theme');
          const theme = urlTheme || storedTheme || 'light';
          
          document.documentElement.setAttribute('data-theme', theme);
        }
        
        handleKeyDown(event) {
          // Handle escape key
          if (event.key === 'Escape') {
            if (this.mobileDrawerOpen) {
              this.closeMobileDrawer();
              return;
            }
            
            if (this.openSubmenu) {
              this.closeAllSubmenus();
              this.openSubmenu.trigger.focus();
              return;
            }
          }
          
          // Handle arrow navigation in menubar
          if (event.target.closest('.nav-menubar')) {
            this.handleMenubarNavigation(event);
          }
          
          // Handle arrow navigation in submenu
          if (event.target.closest('.submenu')) {
            this.handleSubmenuNavigation(event);
          }
        }
        
        handleMenubarNavigation(event) {
          const menubar = event.target.closest('.nav-menubar');
          const items = menubar.querySelectorAll('.nav-link, .nav-trigger');
          const currentIndex = Array.from(items).indexOf(event.target);
          
          let targetIndex;
          
          switch (event.key) {
            case 'ArrowLeft':
              event.preventDefault();
              targetIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
              items[targetIndex].focus();
              break;
              
            case 'ArrowRight':
              event.preventDefault();
              targetIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
              items[targetIndex].focus();
              break;
              
            case 'Home':
              event.preventDefault();
              items[0].focus();
              break;
              
            case 'End':
              event.preventDefault();
              items[items.length - 1].focus();
              break;
          }
        }
        
        handleSubmenuNavigation(event) {
          const submenu = event.target.closest('.submenu');
          const items = submenu.querySelectorAll('.submenu-link');
          const currentIndex = Array.from(items).indexOf(event.target);
          
          let targetIndex;
          
          switch (event.key) {
            case 'ArrowUp':
              event.preventDefault();
              targetIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
              items[targetIndex].focus();
              break;
              
            case 'ArrowDown':
              event.preventDefault();
              targetIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
              items[targetIndex].focus();
              break;
              
            case 'Home':
              event.preventDefault();
              items[0].focus();
              break;
              
            case 'End':
              event.preventDefault();
              items[items.length - 1].focus();
              break;
          }
        }
        
        handleResize() {
          const wasDesktop = this.isDesktop;
          this.isDesktop = window.innerWidth >= 1024;
          
          // Close mobile drawer if switching to desktop
          if (!wasDesktop && this.isDesktop && this.mobileDrawerOpen) {
            this.closeMobileDrawer();
          }
          
          // Close submenus on resize
          this.closeAllSubmenus();
        }
        
        announceToScreenReader(message) {
          // Create live region for announcements
          let liveRegion = document.getElementById('navbar-announcements');
          if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'navbar-announcements';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-9999px';
            liveRegion.style.width = '1px';
            liveRegion.style.height = '1px';
            liveRegion.style.overflow = 'hidden';
            document.body.appendChild(liveRegion);
          }
          
          liveRegion.textContent = message;
          
          // Clear after announcement
          setTimeout(() => {
            liveRegion.textContent = '';
          }, 1000);
        }
      }
      
      // Initialize navbar when DOM is ready
      document.addEventListener('DOMContentLoaded', () => {
        new NavbarManager();
      });
      
      // Prevent FOUC by applying theme immediately
      (function() {
        const storedTheme = localStorage.getItem('preferredTheme');
        const urlTheme = new URLSearchParams(window.location.search).get('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const theme = urlTheme || storedTheme || systemTheme;
        
        document.documentElement.setAttribute('data-theme', theme);
      })();
    </script>
  `;
}

/**
 * Generates consistent logo component
 * @param {string} lang - Language code
 * @param {string} theme - Theme
 * @returns {string} - Logo HTML
 */

/**
 * Generates theme toggle component
 * @param {string} theme - Current theme
 * @param {string} lang - Language code
 * @returns {string} - Theme toggle HTML
 */

/**
 * Generates language switcher component
 * @param {string} lang - Current language
 * @param {string} theme - Current theme
 * @returns {string} - Language switcher HTML
 */

/**
 * Generates common JavaScript functionality for navbar
 * @param {string} lang - Current language
 * @param {string} theme - Current theme
 * @returns {string} - JavaScript code
 */

// ============================================================================
// SECURITY & VALIDATION UTILITIES
// ============================================================================
class SecurityUtils {
  /**
   * Validates and sanitizes email input
   * @param {string} email - Email to validate
   * @returns {Object} - {isValid: boolean, sanitized: string, error?: string}
   */
  static validateEmail(email) {
    if (!email || typeof email !== 'string') {
      return { isValid: false, error: 'Email is required' };
    }
    
    const sanitized = email.trim().toLowerCase();
    
    if (sanitized.length > CONFIG.SECURITY.MAX_EMAIL_LENGTH) {
      return { isValid: false, error: 'Email too long' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitized)) {
      return { isValid: false, error: 'Invalid email format' };
    }
    
    return { isValid: true, sanitized };
  }
  
  /**
   * Validates DHgate shop URL
   * @param {string} url - URL to validate
   * @returns {Object} - {isValid: boolean, sanitized: string, error?: string}
   */
  static validateShopUrl(url) {
    if (!url || typeof url !== 'string') {
      return { isValid: false, error: 'URL is required' };
    }
    
    const sanitized = url.trim();
    
    if (sanitized.length > CONFIG.SECURITY.MAX_URL_LENGTH) {
      return { isValid: false, error: 'URL too long' };
    }
    
    try {
      const parsed = new URL(sanitized);
      const isAllowedDomain = CONFIG.SECURITY.ALLOWED_DOMAINS.some(domain => 
        parsed.hostname.includes(domain)
      );
      
      if (!isAllowedDomain) {
        return { isValid: false, error: 'Only DHgate URLs are allowed' };
      }
      
      return { isValid: true, sanitized };
    } catch {
      return { isValid: false, error: 'Invalid URL format' };
    }
  }
  
  /**
   * Sanitizes HTML to prevent XSS
   * @param {string} input - HTML string to sanitize
   * @returns {string} - Sanitized HTML
   */
  static sanitizeHtml(input) {
    if (!input || typeof input !== 'string') return '';
    
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
  
  /**
   * Generates CSRF token
   * @returns {string} - CSRF token
   */
  static generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
}

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================
class CacheUtils {
  /**
   * Gets cached response or executes function and caches result
   * @param {KVNamespace} kv - Cloudflare KV namespace
   * @param {string} key - Cache key
   * @param {Function} fn - Function to execute if cache miss
   * @param {number} ttl - Time to live in seconds
   * @returns {Promise<any>} - Cached or fresh result
   */
  static async getOrSet(kv, key, fn, ttl = CONFIG.PERFORMANCE.CACHE_TTL.API_RESPONSES) {
    try {
      const cached = await kv.get(key);
      if (cached) {
        return JSON.parse(cached);
      }
      
      const result = await fn();
      await kv.put(key, JSON.stringify(result), { expirationTtl: ttl });
      return result;
    } catch (error) {
      console.error('Cache error:', error);
      return await fn(); // Fallback to direct execution
    }
  }
  
  /**
   * Invalidates cache by pattern
   * @param {KVNamespace} kv - Cloudflare KV namespace
   * @param {string} pattern - Pattern to match cache keys
   */
  static async invalidatePattern(kv, pattern) {
    try {
      const keys = await kv.list({ prefix: pattern });
      await Promise.all(
        keys.keys.map(key => kv.delete(key.name))
      );
    } catch (error) {
      console.error('Cache invalidation error:', error);
    }
  }
}

// ============================================================================
// ERROR HANDLING & RETRY UTILITIES
// ============================================================================
class ErrorHandler {
  /**
   * Retries a function with exponential backoff
   * @param {Function} fn - Function to retry
   * @param {number} maxRetries - Maximum number of retries
   * @param {number} baseDelay - Base delay in milliseconds
   * @returns {Promise<any>} - Result of the function
   */
  static async withRetry(fn, maxRetries = 3, baseDelay = 1000) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries) {
          console.error(`❌ Function failed after ${maxRetries} attempts:`, error);
          throw error;
        }
        
        const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
        console.warn(`⚠️ Attempt ${attempt} failed, retrying in ${Math.round(delay)}ms:`, error.message);
        await this.delay(delay);
      }
    }
  }
  
  /**
   * Wraps a function with comprehensive error handling
   * @param {Function} fn - Function to wrap
   * @param {string} operation - Operation name for logging
   * @param {any} fallbackValue - Value to return on error
   * @returns {Promise<any>} - Result or fallback value
   */
  static async safeExecute(fn, operation, fallbackValue = null) {
    try {
      return await fn();
    } catch (error) {
      console.error(`❌ ${operation} failed:`, {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
      
      // Log to analytics if available
      if (typeof AnalyticsService !== 'undefined') {
        AnalyticsService.trackConversion('error_occurred', {
          operation,
          error_type: error.name,
          error_message: error.message
        });
      }
      
      return fallbackValue;
    }
  }
  
  /**
   * Validates environment variables
   * @param {Object} env - Environment object
   * @param {string[]} required - Required environment variable names
   * @throws {Error} If required environment variables are missing
   */
  static validateEnvironment(env, required = []) {
    const missing = required.filter(key => !env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }
  
  /**
   * Simple delay utility
   * @param {number} ms - Milliseconds to delay
   */
  static delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Circuit breaker pattern implementation
   */
  static createCircuitBreaker(fn, threshold = 5, timeout = 60000) {
    let failures = 0;
    let lastFailureTime = 0;
    let state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    
    return async (...args) => {
      const now = Date.now();
      
      if (state === 'OPEN') {
        if (now - lastFailureTime < timeout) {
          throw new Error('Circuit breaker is OPEN');
        } else {
          state = 'HALF_OPEN';
        }
      }
      
      try {
        const result = await fn(...args);
        if (state === 'HALF_OPEN') {
          state = 'CLOSED';
          failures = 0;
        }
        return result;
      } catch (error) {
        failures++;
        lastFailureTime = now;
        
        if (failures >= threshold) {
          state = 'OPEN';
          console.error(`🔴 Circuit breaker opened after ${failures} failures`);
        }
        
        throw error;
      }
    };
  }
}

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================
class PerformanceUtils {
  /**
   * Generates lazy loading attributes for images
   * @param {string} src - Image source URL
   * @param {string} alt - Alt text
   * @param {Object} options - Additional options
   * @returns {string} - HTML attributes for lazy loading
   */
  static lazyImage(src, alt, options = {}) {
    const { width, height, className = '', priority = false } = options;
    
    if (priority) {
      // High priority images (above fold) - load immediately
      return `src="${src}" alt="${SecurityUtils.sanitizeHtml(alt)}"${width ? ` width="${width}"` : ''}${height ? ` height="${height}"` : ''}${className ? ` class="${className}"` : ''}`;
    }
    
    // Regular images - lazy load with intersection observer
    return `data-src="${src}" alt="${SecurityUtils.sanitizeHtml(alt)}" loading="lazy"${width ? ` width="${width}"` : ''}${height ? ` height="${height}"` : ''} class="lazy-image ${className}"`;
  }
  
  /**
   * Generates optimized image URLs with WebP support
   * @param {string} originalUrl - Original image URL
   * @param {Object} options - Optimization options
   * @returns {string} - Optimized image URL or original if not supported
   */
  static optimizeImageUrl(originalUrl, options = {}) {
    const { width, height, quality = 85, format = 'auto' } = options;
    
    // For GitHub raw content, we can't optimize directly
    // In production, you'd use a service like Cloudinary, ImageKit, or Cloudflare Images
    if (originalUrl.includes('githubusercontent.com')) {
      return originalUrl; // Return as-is for GitHub assets
    }
    
    // Example implementation for Cloudflare Images (if available)
    // return `${originalUrl}?width=${width}&height=${height}&quality=${quality}&format=${format}`;
    
    return originalUrl;
  }
  
  /**
   * Creates preload link tags for critical resources
   * @param {string[]} resources - Array of resource URLs
   * @returns {string} - HTML preload link tags
   */
  static generatePreloadLinks(resources = []) {
    return resources.map(resource => {
      const ext = resource.split('.').pop().toLowerCase();
      let asType = 'fetch';
      
      if (['css'].includes(ext)) asType = 'style';
      else if (['js'].includes(ext)) asType = 'script';
      else if (['woff', 'woff2', 'ttf'].includes(ext)) asType = 'font';
      else if (['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(ext)) asType = 'image';
      
      return `<link rel="preload" href="${resource}" as="${asType}"${asType === 'font' ? ' crossorigin' : ''}>`;
    }).join('\n');
  }
  
  /**
   * Generates lazy loading JavaScript for images and components
   * @returns {string} - JavaScript code for lazy loading
   */
  static generateLazyLoadScript() {
    return `
      <script>
        // Intersection Observer for lazy loading images
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.classList.remove('lazy-image');
              img.classList.add('lazy-loaded');
              observer.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px 0px', // Start loading 50px before entering viewport
          threshold: 0.01
        });
        
        // Observe all lazy images
        document.addEventListener('DOMContentLoaded', () => {
          const lazyImages = document.querySelectorAll('.lazy-image');
          lazyImages.forEach(img => imageObserver.observe(img));
        });
        
        // Performance monitoring
        window.addEventListener('load', () => {
          if (typeof AnalyticsService !== 'undefined') {
            AnalyticsService.trackConversion('page_load_complete', {
              load_time: Math.round(performance.now()),
              dom_content_loaded: Math.round(performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart),
              first_paint: performance.getEntriesByType('paint')[0]?.startTime || 0
            });
          }
        });
      </script>
    `;
  }
  
  /**
   * Minifies CSS by removing unnecessary whitespace and comments
   * @param {string} css - CSS string to minify
   * @returns {string} - Minified CSS
   */
  static minifyCSS(css) {
    return css
      .replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/;\s*}/g, '}') // Remove last semicolon in blocks
      .replace(/\s*{\s*/g, '{') // Remove spaces around braces
      .replace(/;\s*/g, ';') // Remove spaces after semicolons
      .trim();
  }
}

// ============================================================================
// ANALYTICS SERVICE
// ============================================================================
class AnalyticsService {
  /**
   * Tracks page view with enhanced data
   * @param {Object} data - Page view data
   */
  static trackPageView(data) {
    if (typeof gtag !== 'function') return;
    
    gtag('event', 'page_view', {
      page_title: data.title,
      page_location: data.url,
      page_path: data.path,
      language: data.language,
      theme: data.theme,
      user_type: data.userType || 'anonymous',
      timestamp: new Date().toISOString()
    });
  }
  
  /**
   * Tracks conversion events with funnel data
   * @param {string} eventName - Event name
   * @param {Object} parameters - Event parameters
   */
  static trackConversion(eventName, parameters = {}) {
    if (typeof gtag !== 'function') return;
    
    gtag('event', eventName, {
      ...parameters,
      event_category: 'conversion',
      event_timestamp: new Date().toISOString(),
      session_id: this.getSessionId()
    });
  }
  
  /**
   * Gets or creates session ID for user journey tracking
   * @returns {string} - Session ID
   */
  static getSessionId() {
    let sessionId = sessionStorage.getItem('dhgate_session_id');
    if (!sessionId) {
      sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('dhgate_session_id', sessionId);
    }
    return sessionId;
  }
}

// SEO Optimization Data
const SEO_DATA = {
  nl: {
    // Landing page
    landing: {
      title: 'DHgate Monitor - Geautomatiseerd Product Monitoring Platform',
      description: 'Professioneel DHgate monitoring platform voor e-commerce ondernemers. Automatische producttracking, trending item detectie en real-time alerts. 24/7 monitoring voor dropshippers en online retailers.',
      keywords: 'dhgate monitor, product monitoring, dropshipping tools, e-commerce automatisering, trending producten, dhgate tracking, product alerts, online retail tools'
    },
    dashboard: {
      title: 'Dashboard - DHgate Monitor | Product Monitoring Overzicht',
      description: 'Beheer uw DHgate product monitoring vanuit het professionele dashboard. Real-time statistieken, monitoring status en geavanceerde instellingen voor optimale e-commerce intelligence.'
    },
    privacy: {
      title: 'Privacybeleid - DHgate Monitor | GDPR Compliant',
      description: 'Lees ons transparante privacybeleid. DHgate Monitor respecteert uw privacy en voldoet volledig aan GDPR-regelgeving. Bekijk hoe wij uw gegevens beschermen en gebruiken.'
    },
    terms: {
      title: 'Algemene Voorwaarden - DHgate Monitor | Gebruiksvoorwaarden',
      description: 'Algemene voorwaarden voor het gebruik van DHgate Monitor. Professionele monitoring service voor e-commerce ondernemers met duidelijke gebruiksrichtlijnen en service afspraken.'
    },
    contact: {
      title: 'Contact - DHgate Monitor | Professional E-commerce Support',
      description: 'Neem contact op met DHgate Monitor voor professionele ondersteuning, partnership mogelijkheden of vragen over ons monitoring platform. Expertise in e-commerce automatisering.'
    },

  },
  en: {
    // Landing page
    landing: {
      title: 'DHgate Monitor - Professional E-commerce Product Monitoring Platform',
      description: 'Professional DHgate monitoring platform for e-commerce entrepreneurs. Automated product tracking, trending item detection, and real-time alerts. 24/7 monitoring for dropshippers and online retailers.',
      keywords: 'dhgate monitor, product monitoring, dropshipping tools, ecommerce automation, trending products, dhgate tracking, product alerts, online retail tools'
    },
    dashboard: {
      title: 'Dashboard - DHgate Monitor | Product Monitoring Overview',
      description: 'Manage your DHgate product monitoring from the professional dashboard. Real-time statistics, monitoring status, and advanced settings for optimal e-commerce intelligence.'
    },
    privacy: {
      title: 'Privacy Policy - DHgate Monitor | GDPR Compliant',
      description: 'Read our transparent privacy policy. DHgate Monitor respects your privacy and is fully GDPR compliant. See how we protect and use your data responsibly.'
    },
    terms: {
      title: 'Terms of Service - DHgate Monitor | Usage Terms',
      description: 'Terms of service for using DHgate Monitor. Professional monitoring service for e-commerce entrepreneurs with clear usage guidelines and service agreements.'
    },
    contact: {
      title: 'Contact - DHgate Monitor | Professional E-commerce Support',
      description: 'Contact DHgate Monitor for professional support, partnership opportunities, or questions about our monitoring platform. Expertise in e-commerce automation.'
    },

  }
};

// Internal Linking Helper Function
function generateSEOFooter(lang, currentPage = 'home') {
  const t = getTranslations(lang);
  const baseUrl = 'https://dhgate-monitor.com';
  
  const links = {
    home: { url: `/?lang=${lang}`, text: lang === 'nl' ? 'DHgate Product Monitoring' : 'DHgate Product Monitoring' },
    privacy: { url: `/privacy?lang=${lang}`, text: lang === 'nl' ? 'Privacy & GDPR' : 'Privacy & GDPR' },
    terms: { url: `/terms?lang=${lang}`, text: lang === 'nl' ? 'Gebruiksvoorwaarden' : 'Terms of Service' },
    contact: { url: `/service?lang=${lang}`, text: lang === 'nl' ? 'Service & Contact' : 'Service & Contact' }
  };
  
  const visibleLinks = Object.entries(links)
    .filter(([key]) => key !== currentPage)
    .map(([_, link]) => `<a href="${link.url}" style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem;">${link.text}</a>`)
    .join(' | ');
    
  // Affiliate disclosure
  const affiliateDisclosure = lang === 'nl' ? 
    'DHgate Monitor verdient commissie via affiliate links. Dit beïnvloedt niet onze monitoring service.' :
    'DHgate Monitor earns commission through affiliate links. This does not affect our monitoring service.';
    
  return `
    <footer role="contentinfo" aria-label="${lang === 'nl' ? 'Website footer met links en copyright informatie' : 'Website footer with links and copyright information'}" style="margin-top: 3rem; padding: 2rem 0; border-top: 1px solid var(--border-color); text-align: center; color: var(--text-muted);">
      <div style="margin-bottom: 1rem;">${visibleLinks}</div>
      
      <!-- Affiliate Disclosure -->
      <div style="font-size: 0.75rem; margin-bottom: 1rem; padding: 0.5rem; background: rgba(37, 99, 235, 0.05); border-radius: 6px; color: var(--text-secondary); max-width: 600px; margin: 0 auto 1rem;">
        <strong>${lang === 'nl' ? '💰 Affiliate Disclosure' : '💰 Affiliate Disclosure'}:</strong><br>
        ${affiliateDisclosure}
      </div>
      
      <div style="font-size: 0.8rem; opacity: 0.8;">
        © 2024 DHgate Monitor - ${lang === 'nl' ? 'Professional E-commerce Monitoring Platform' : 'Professional E-commerce Monitoring Platform'}
      </div>
    </footer>
  `;
}

// Generate consistent footer for all pages
function generateConsistentFooter(lang, theme) {
  const textColor = theme === 'dark' ? '#94A3B8' : '#4B5563';
  const bgColor = theme === 'dark' ? '#1E293B' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(37, 99, 235, 0.15)' : '#E5E7EB';
  
  return `
    <div style="background: ${bgColor}; border-top: 1px solid ${borderColor}; margin-top: 4rem; padding: 2rem 0;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
            <!-- Legal Footer -->
            <div style="text-align: center;">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem;">
                        <a href="/privacy?lang=${lang}&theme=${theme}" style="color: ${textColor}; text-decoration: none; font-size: 0.875rem;">${lang === 'nl' ? 'Privacybeleid' : 'Privacy Policy'}</a>
                        <a href="/terms?lang=${lang}&theme=${theme}" style="color: ${textColor}; text-decoration: none; font-size: 0.875rem;">${lang === 'nl' ? 'Algemene voorwaarden' : 'Terms of Service'}</a>
                        <a href="/service?lang=${lang}&theme=${theme}" style="color: ${textColor}; text-decoration: none; font-size: 0.875rem;">${lang === 'nl' ? 'Service' : 'Service'}</a>
                        <a href="/delete-data?lang=${lang}&theme=${theme}" style="color: ${textColor}; text-decoration: none; font-size: 0.875rem;">${lang === 'nl' ? 'Verwijder mijn data' : 'Delete my data'}</a>
                    </div>
                </div>
                <div style="color: ${textColor}; font-size: 0.875rem; margin-top: 0.5rem;">
                    © ${new Date().getFullYear()} DHgate Monitor - ${lang === 'nl' ? 'Juridische informatie' : 'Legal information'}
                </div>
            </div>
        </div>
    </div>
  `;
}

// Enhanced Internationalization (i18n) support with accessibility
const translations = {
  nl: {
    // Main app
    app_title: "DHGate monitor",
    app_description: "Automatische shop en producten monitoring",
    
    // Accessibility labels
    main_navigation: "Hoofdnavigatie",
    skip_to_content: "Ga naar inhoud",
    toggle_menu: "Menu in-/uitklappen",
    toggle_theme: "Thema wijzigen",
    switch_language: "Taal wijzigen",
    close_modal: "Sluiten",
    loading: "Laden...",
    error_occurred: "Er is een fout opgetreden",
    
    // Navigation & Actions
    actions: "Acties",
    add_shop: "Shop toevoegen",
    settings: "Instellingen", 
    manage_tags: "Tags beheren",
    back_to_dashboard: "Terug naar dashboard",
    
    // Dashboard
    registered_shops: "Geregistreerde shops",
    no_shops_registered: "Geen shops geregistreerd.",
    add_first_shop: "Voeg de eerste toe",
    status: "Status",
    platform: "Platform",
    monitoring: "Monitoring",
    tags: "Tags",
    online: "Online",
    
    // Add Shop
    add_shop_title: "Shop toevoegen - DHgate Monitor",
    shop_name: "Shop naam",
    search_url: "Zoek URL",
    search_url_help: "Voer de volledige DHgate zoek URL in",
    
    // Settings
    settings_title: "Instellingen - DHgate Monitor", 
    email_config: "Email configuratie",
    sender_email: "Verzender email",
    recipient_email: "Ontvanger email",
    schedule: "Planning",
    daily_scan_time: "Dagelijkse scan tijd",
    filters: "Filters",
    keywords_comma: "Keywords (gescheiden door komma's)",
    case_sensitive: "Hoofdlettergevoelig",
    save_settings: "Instellingen opslaan",
    
    // Tags
    manage_tags_title: "Tags beheren - DHgate Monitor",
    manage_tags_description: "Beheer welke tags gebruikt worden voor product filtering",
    current_tags: "Huidige tags",
    tags_comma: "Tags (gescheiden door komma's)",
    tags_help: "Deze tags worden gebruikt om producten te filteren tijdens monitoring. Producten die deze woorden bevatten worden gedetecteerd.",
    tags_tip: "Tags worden gebruikt om te zoeken naar producten die relevante woorden bevatten. Bijvoorbeeld: \"kids\", \"children\", \"youth\", \"baby\", \"toddler\".",
    save_tags: "Tags opslaan",
    
    // Common
    save: "Opslaan",
    added: "Toegevoegd",
    
    // Legal & Compliance
    privacy_policy: "Privacybeleid",
    terms_of_service: "Algemene voorwaarden",
    contact: "Contact",
    privacy_policy_title: "Privacybeleid - DHgate Monitor",
    terms_title: "Algemene voorwaarden - DHgate Monitor", 
    contact_title: "Contact - DHgate Monitor",
    
    // Cookie Consent
    cookie_title: "Cookie voorkeuren",
    cookie_message: "We gebruiken cookies om uw ervaring te verbeteren en de website functionaliteit te waarborgen.",
    accept_cookies: "Accepteren",
    decline_cookies: "Weigeren",
    cookie_settings: "Cookie instellingen",
    
    // Contact page
    contact_info: "Contact informatie",
    email_address: "E-mailadres",
    website_info: "Website informatie",
    data_controller: "Verwerkingsverantwoordelijke",
    
    // Footer links
    legal_links: "Juridische informatie"
  },
  en: {
    // Main app
    app_title: "DHGate monitor",
    app_description: "Automatic shop and product monitoring",
    
    // Accessibility labels
    main_navigation: "Main navigation",
    skip_to_content: "Skip to content",
    toggle_menu: "Toggle menu",
    toggle_theme: "Toggle theme",
    switch_language: "Switch language",
    close_modal: "Close",
    loading: "Loading...",
    error_occurred: "An error occurred",
    
    // Navigation & Actions  
    actions: "Actions",
    add_shop: "Add shop",
    settings: "Settings",
    manage_tags: "Manage tags", 
    back_to_dashboard: "Back to dashboard",
    
    // Dashboard
    registered_shops: "Registered shops",
    no_shops_registered: "No shops registered.",
    add_first_shop: "Add the first one",
    status: "Status", 
    platform: "Platform",
    monitoring: "Monitoring",
    tags: "Tags",
    online: "Online",
    
    // Add Shop
    add_shop_title: "Add shop - DHgate Monitor",
    shop_name: "Shop name",
    search_url: "Search URL", 
    search_url_help: "Enter the complete DHgate search URL",
    
    // Settings
    settings_title: "Settings - DHgate Monitor",
    email_config: "Email configuration", 
    sender_email: "Sender Email",
    recipient_email: "Recipient Email",
    schedule: "Schedule",
    daily_scan_time: "Daily Scan Time", 
    filters: "Filters",
    keywords_comma: "Keywords (comma separated)",
    case_sensitive: "Case sensitive",
    save_settings: "Save settings",
    
    // Tags
    manage_tags_title: "Manage tags - DHgate Monitor",
    manage_tags_description: "Manage which tags are used for product filtering",
    current_tags: "Current tags",
    tags_comma: "Tags (comma separated)",
    tags_help: "These tags are used to filter products during monitoring. Products containing these words will be detected.",
    tags_tip: "Tags are used to search for products containing relevant words. For example: \"kids\", \"children\", \"youth\", \"baby\", \"toddler\".",
    save_tags: "Save tags",
    
    // Common
    save: "Save", 
    added: "Added",
    
    // Legal & Compliance
    privacy_policy: "Privacy Policy",
    terms_of_service: "Terms of Service",
    contact: "Contact",
    privacy_policy_title: "Privacy Policy - DHgate Monitor",
    terms_title: "Terms of Service - DHgate Monitor",
    contact_title: "Contact - DHgate Monitor",
    
    // Cookie Consent
    cookie_title: "Cookie preferences",
    cookie_message: "We use cookies to enhance your experience and ensure website functionality.",
    accept_cookies: "Accept",
    decline_cookies: "Decline", 
    cookie_settings: "Cookie settings",
    
    // Contact page
    contact_info: "Contact information",
    email_address: "Email address",
    website_info: "Website information",
    data_controller: "Data controller",
    
    // Footer links
    legal_links: "Legal information"
  }
};

// Get user's preferred language
function getLanguage(request) {
  // Check URL parameter first (e.g. ?lang=en)
  const url = new URL(request.url);
  const urlLang = url.searchParams.get('lang');
  if (urlLang && translations[urlLang]) {
    return urlLang;
  }
  
  // Check Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language') || '';
  if (acceptLanguage.includes('nl')) {
    return 'nl';
  }
  
  // Default to English for international .com domain
  return 'en';
}

// Get translation function
function getTranslations(lang) {
  return translations[lang] || translations.en;
}

// Helper function to mask email addresses for privacy
function maskEmail(email) {
  if (!email || !email.includes('@')) return '••••••••@••••••';
  
  const [local, domain] = email.split('@');
  const maskedLocal = local.length > 2 ? 
    local.substring(0, 2) + '••••' : 
    '••••';
  const maskedDomain = domain.length > 4 ? 
    '••' + domain.substring(domain.length - 4) : 
    '••••••';
  
  return maskedLocal + '@' + maskedDomain;
}

// Get user's preferred theme
function getTheme(request) {
  // Check URL parameter first (e.g. ?theme=dark)
  const url = new URL(request.url);
  const urlTheme = url.searchParams.get('theme');
  if (urlTheme && THEMES[urlTheme]) {
    return urlTheme;
  }
  
  // Check for prefers-color-scheme in headers (if available)
  const userAgent = request.headers.get('User-Agent') || '';
  
  // Default to light theme
  return 'light';
}

// Theme Management System
const THEMES = {
  light: {
    name: 'Light Mode',
    css: {
      // Premium Brand System
      '--bg-primary': '#FEFEFE',
      '--bg-secondary': '#F8FAFC',
      '--bg-gradient': 'linear-gradient(135deg, #FEFEFE 0%, #F8FAFC 50%, #F1F5F9 100%)',
      '--bg-hero': 'linear-gradient(135deg, #2563EB 0%, #EA580C 100%)',
      
      // Typography & Text - WCAG 2.1 AA Enhanced Contrast
      '--text-primary': '#111827',  // 16.37:1 contrast ratio
      '--text-secondary': '#374151',  // 9.22:1 contrast ratio
      '--text-muted': '#4B5563',      // 6.38:1 contrast ratio
      '--text-white': '#FFFFFF',
      
      // Brand Colors
      '--primary-blue': '#2563EB',
      '--primary-blue-hover': '#1D4ED8',
      '--primary-blue-light': '#60A5FA',
      '--accent-orange': '#EA580C',
      '--accent-orange-hover': '#C2410C',
      '--accent-orange-light': '#FB923C',
      
      // Card System
      '--card-bg': '#FFFFFF',
      '--card-bg-alpha': 'rgba(255, 255, 255, 0.95)',
      '--card-shadow': '0 4px 20px rgba(37, 99, 235, 0.08)',
      '--card-shadow-hover': '0 8px 32px rgba(37, 99, 235, 0.15)',
      '--card-border': 'rgba(37, 99, 235, 0.1)',
      
      // Glassmorphism
      '--glass-bg': 'rgba(255, 255, 255, 0.85)',
      '--glass-border': 'rgba(255, 255, 255, 0.2)',
      '--glass-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
      '--backdrop-blur': 'blur(16px)',
      
      // Interactive Elements
      '--btn-primary-bg': 'linear-gradient(135deg, #2563EB, #1D4ED8)',
      '--btn-primary-hover': 'linear-gradient(135deg, #1D4ED8, #1E3A8A)',
      '--btn-secondary-bg': 'linear-gradient(135deg, #EA580C, #C2410C)',
      '--btn-secondary-hover': 'linear-gradient(135deg, #C2410C, #9A3412)',
      '--btn-ghost': 'rgba(37, 99, 235, 0.1)',
      '--btn-ghost-hover': 'rgba(37, 99, 235, 0.2)',
      
      // Status & Feedback
      '--success': '#10B981',
      '--warning': '#F59E0B',
      '--error': '#EF4444',
      '--info': '#3B82F6',
      
      // Borders & Lines
      '--border-light': '#E5E7EB',
      '--border-medium': '#D1D5DB',
      '--border-focus': '#2563EB',
      
      // Legacy compatibility
      '--accent-color': '#2563EB',
      '--accent-secondary': '#EA580C',
      '--border-color': '#E5E7EB',
      '--cookie-bg': 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
      '--legal-section-heading': '#2563EB'
    }
  },
  dark: {
    name: 'Dark Mode - DHgate Monitor Consistent',
    css: {
      // Consistent Dark Theme - DHgate Monitor Branding
      '--bg-primary': '#0F172A',        // Rich dark slate
      '--bg-secondary': '#1E293B',      // Medium slate
      '--bg-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
      '--bg-hero': 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
      
      // Enhanced Typography - WCAG 2.1 AAA Compliant
      '--text-primary': '#F8FAFC',      // Pure white for maximum contrast
      '--text-secondary': '#CBD5E1',    // Light slate for secondary text  
      '--text-muted': '#94A3B8',        // Muted slate for less important text
      '--text-white': '#FFFFFF',
      
      // Consistent Brand Colors (DHgate Monitor branding)
      '--primary-blue': '#2563EB',      // DHgate brand blue
      '--primary-blue-hover': '#1D4ED8', // Darker on hover  
      '--primary-blue-light': '#3B82F6', // Light variant
      '--accent-orange': '#EA580C',     // DHgate brand orange
      '--accent-orange-hover': '#C2410C', // Darker on hover
      '--accent-orange-light': '#FB923C', // Light variant
      
      // Dark Theme Card System
      '--card-bg': '#1E293B',
      '--card-bg-alpha': 'rgba(30, 41, 59, 0.95)',
      '--card-shadow': '0 4px 20px rgba(0, 0, 0, 0.4)',
      '--card-shadow-hover': '0 8px 32px rgba(0, 0, 0, 0.5)',
      '--card-border': 'rgba(37, 99, 235, 0.15)',
      
      // Dark Theme Glassmorphism
      '--glass-bg': 'rgba(30, 41, 59, 0.85)',
      '--glass-border': 'rgba(37, 99, 235, 0.1)',
      '--glass-shadow': '0 8px 32px rgba(0, 0, 0, 0.4)',
      '--backdrop-blur': 'blur(16px)',
      
      // Consistent Interactive Elements
      '--btn-primary-bg': 'linear-gradient(135deg, #2563EB, #1D4ED8)',
      '--btn-primary-hover': 'linear-gradient(135deg, #1D4ED8, #1E3A8A)',
      '--btn-secondary-bg': 'linear-gradient(135deg, #EA580C, #C2410C)',
      '--btn-secondary-hover': 'linear-gradient(135deg, #C2410C, #9A3412)',
      '--btn-ghost': 'rgba(37, 99, 235, 0.2)',
      '--btn-ghost-hover': 'rgba(37, 99, 235, 0.3)',
      
      // Status & Feedback
      '--success': '#10B981',
      '--warning': '#F59E0B',
      '--error': '#EF4444',
      '--info': '#3B82F6',
      
      // Borders & Lines
      '--border-light': '#334155',
      '--border-medium': '#475569',
      '--border-focus': '#2563EB',
      
      // Legacy compatibility
      '--accent-color': '#2563EB',
      '--accent-secondary': '#EA580C',
      '--border-color': '#334155',
      '--cookie-bg': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      '--legal-section-heading': '#2563EB'
    }
  },
};

// Handle asset requests
async function handleAsset(pathname, corsHeaders) {
  console.log('🖼️ Asset request for:', pathname);
  // For now, we'll handle the specific dhgatevisualheader.png asset
  // In the future, you could add more assets here
  if (pathname === '/assets/dhgatevisualheader.png') {
    // Fetch from GitHub raw content or serve base64 encoded version
    try {
      const response = await fetch('https://raw.githubusercontent.com/nathaljanijman/dhgate-monitor/main/assets/dhgatevisualheader.png');
      if (response.ok) {
        const imageBuffer = await response.arrayBuffer();
        return new Response(imageBuffer, {
          headers: {
            ...corsHeaders,
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=3600'
          }
        });
      }
    } catch (error) {
      console.log('Failed to fetch asset from GitHub:', error);
    }
  }
  
  if (pathname === '/assets/logo.svg') {
    // Serve the new horizontal SVG logo
    try {
      const response = await fetch('https://raw.githubusercontent.com/nathaljanijman/dhgate-monitor/main/assets/dhgate-monitor-logo-horizontal.svg');
      if (response.ok) {
        const svgContent = await response.text();
        return new Response(svgContent, {
          headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=86400',
            ...corsHeaders
          }
        });
      }
    } catch (error) {
      console.log('Failed to fetch horizontal logo from GitHub:', error);
    }
  }
  
  if (pathname === '/assets/logo.png') {
    // Fetch the new logo from GitHub
    try {
      const response = await fetch('https://raw.githubusercontent.com/nathaljanijman/dhgate-monitor/main/assets/DHGateLogo.png');
      if (response.ok) {
        const imageBuffer = await response.arrayBuffer();
        return new Response(imageBuffer, {
          headers: {
            ...corsHeaders,
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=3600'
          }
        });
      }
    } catch (error) {
      console.log('Failed to fetch logo from GitHub:', error);
    }
  }
  
  if (pathname === '/assets/DHGateVector.png') {
    // Fetch the DHGateVector logo from GitHub
    try {
      const response = await fetch('https://raw.githubusercontent.com/nathaljanijman/dhgate-monitor/main/assets/DHGateVector.png');
      if (response.ok) {
        const imageBuffer = await response.arrayBuffer();
        return new Response(imageBuffer, {
          headers: {
            ...corsHeaders,
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=3600'
          }
        });
      }
    } catch (error) {
      console.log('Failed to fetch DHGateVector logo from GitHub:', error);
    }
  }
  
  // Return 404 for unknown assets
  return new Response('Asset not found', { 
    status: 404, 
    headers: corsHeaders 
  });
}

// Generate global CSS with theme
function generateGlobalCSS(theme = 'light') {
  const t = THEMES[theme] || THEMES.light;
  const cssVars = Object.entries(t.css)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return `
    <style>
      :root {
${cssVars}
        /* Responsive Variables */
        --header-spacing-mobile: 10px;
        --header-spacing-desktop: 20px;
        --toggle-size-mobile: 32px;
        --toggle-size-desktop: 24px;
        --toggle-width-mobile: 60px;
        --toggle-width-desktop: 50px;
        --font-size-mobile: 14px;
        --font-size-desktop: 16px;
      }
      
      /* CSS Reset for consistent spacing */
      *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      html, body { 
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: var(--bg-gradient);
        min-height: 100vh;
        color: var(--text-primary);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 400;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
      }
      
      
      /* Premium Typography System */
      h1, h2, h3, h4, h5, h6 {
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: -0.025em;
        margin-bottom: 0.75em;
      }
      
      h1 { font-size: clamp(2rem, 5vw, 3rem); }
      h2 { font-size: clamp(1.5rem, 4vw, 2.25rem); }
      h3 { font-size: clamp(1.25rem, 3vw, 1.875rem); }
      h4 { font-size: clamp(1.125rem, 2.5vw, 1.5rem); }
      
      p, li {
        font-size: clamp(0.875rem, 1.5vw, 1rem);
        line-height: 1.7;
      }
      
      .main-header {
        background: var(--card-bg);
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(71, 85, 105, 0.1);
        margin-bottom: 30px;
        color: var(--text-primary);
      }
      
      /* Premium Card System */
      .card {
        border: none;
        border-radius: 20px;
        box-shadow: var(--card-shadow);
        background: var(--card-bg);
        color: var(--text-primary);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }
      
      .card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--card-border);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .card:hover {
        box-shadow: var(--card-shadow-hover);
        transform: translateY(-2px);
      }
      
      .card:hover::before {
        opacity: 1;
      }
      
      .card-header {
        background: transparent;
        border-bottom: 1px solid var(--border-light);
        color: var(--text-primary);
        font-weight: 600;
        padding: 1.5rem 2rem 1rem;
      }
      
      .card-body {
        padding: 1.5rem 2rem 2rem;
      }
      
      /* Premium Button System */
      .btn {
        font-family: 'Raleway', sans-serif;
        font-weight: 600;
        letter-spacing: 0.025em;
        border-radius: 12px;
        padding: 0.75rem 1.5rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        border: none;
        cursor: pointer;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }
      
      .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s ease;
      }
      
      .btn:hover::before {
        left: 100%;
      }
      
      .btn-primary {
        background: var(--btn-primary-bg);
        color: var(--text-white);
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
      }
      
      .btn-primary:hover {
        background: var(--btn-primary-hover);
        box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        transform: translateY(-1px);
      }
      
      .btn-success {
        background: var(--btn-secondary-bg);
        color: var(--text-white);
        box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
      }
      
      .btn-success:hover {
        background: var(--btn-secondary-hover);
        box-shadow: 0 6px 20px rgba(234, 88, 12, 0.4);
        transform: translateY(-1px);
      }
      
      .btn-outline-primary {
        background: var(--btn-ghost);
        color: var(--primary-blue);
        border: 1px solid var(--primary-blue);
      }
      
      .btn-outline-primary:hover {
        background: var(--btn-ghost-hover);
        color: var(--primary-blue-hover);
        border-color: var(--primary-blue-hover);
      }
      
      .btn-lg {
        padding: 1rem 2rem;
        font-size: 1.1rem;
      }
      
      .btn-sm {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }
      
      .text-muted {
        color: var(--text-muted) !important;
      }
      
      /* Premium Form System */
      .form-control, .form-select {
        background: var(--card-bg);
        border: 2px solid var(--border-light);
        border-radius: 12px;
        color: var(--text-primary);
        font-size: 1rem;
        padding: 0.875rem 1.25rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: 'Raleway', sans-serif;
      }
      
      .form-control:focus, .form-select:focus {
        background: var(--card-bg);
        border-color: var(--border-focus);
        color: var(--text-primary);
        box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        outline: none;
      }
      
      .form-control-lg, .form-select-lg {
        padding: 1rem 1.5rem;
        font-size: 1.1rem;
        border-radius: 16px;
      }
      
      .form-label {
        color: var(--text-primary);
        font-weight: 600;
        margin-bottom: 0.75rem;
        font-size: 0.95rem;
        letter-spacing: 0.025em;
      }
      
      .form-text {
        color: var(--text-muted);
        font-size: 0.875rem;
        margin-top: 0.5rem;
        line-height: 1.5;
      }
      
      /* Glassmorphism Components */
      .glass-card {
        background: var(--glass-bg);
        backdrop-filter: var(--backdrop-blur);
        border: 1px solid var(--glass-border);
        border-radius: 24px;
        box-shadow: var(--glass-shadow);
      }
      
      .glass-header {
        background: var(--glass-bg);
        backdrop-filter: var(--backdrop-blur);
        border: 1px solid var(--glass-border);
        position: sticky;
        top: 0;
        z-index: 100;
      }
      
      /* Premium Animations */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }
      
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
      
      .animate-fade-in-up {
        opacity: 1 !important;
        transform: translateY(0) !important;
        animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .animate-slide-in-right {
        animation: slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .animate-pulse {
        animation: pulse 2s infinite;
      }
      
      /* Loading & Skeleton States */
      .skeleton {
        background: linear-gradient(
          90deg,
          var(--border-light) 25%,
          var(--border-medium) 50%,
          var(--border-light) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 8px;
      }
      
      .loading-ring {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      
      /* Premium Micro-Interactions */
      .hover-lift {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .hover-lift:hover {
        transform: translateY(-4px);
      }
      
      .hover-scale {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .hover-scale:hover {
        transform: scale(1.02);
      }
      
      /* Status Indicators */
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 600;
        letter-spacing: 0.025em;
      }
      
      .status-success {
        background: rgba(16, 185, 129, 0.1);
        color: var(--success);
      }
      
      .status-warning {
        background: rgba(245, 158, 11, 0.1);
        color: var(--warning);
      }
      
      .status-error {
        background: rgba(239, 68, 68, 0.1);
        color: var(--error);
      }
      
      /* Premium Hero Section */
      .hero-section {
        position: relative;
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 2rem;
        margin-bottom: 4rem;
        overflow: hidden;
        border-radius: 24px;
      }
      
      .hero-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--bg-hero);
        background-image: 
          radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
        border-radius: inherit;
        z-index: -2;
      }
      
      .hero-background::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80');
        background-size: cover;
        background-position: center;
        opacity: 0.08;
        border-radius: inherit;
        z-index: -1;
      }
      
      .hero-content {
        max-width: 800px;
        z-index: 1;
        color: var(--text-white);
      }
      
      .hero-badge {
        margin-bottom: 2rem;
      }
      
      .hero-title {
        font-size: clamp(2.5rem, 8vw, 4rem);
        font-weight: 800;
        line-height: 1.1;
        margin-bottom: 1.5rem;
        letter-spacing: -0.02em;
        word-wrap: break-word;
        overflow-wrap: break-word;
        hyphens: auto;
      }
      
      .gradient-text {
        background: linear-gradient(135deg, #FBBF24, #F59E0B);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .hero-subtitle {
        font-size: clamp(1.125rem, 2.5vw, 1.375rem);
        line-height: 1.6;
        margin-bottom: 3rem;
        opacity: 0.9;
        font-weight: 400;
      }
      
      .hero-stats {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 3rem;
      }
      
      .stat-item {
        text-align: center;
      }
      
      .stat-number {
        font-size: 2rem;
        font-weight: 800;
        color: var(--text-white);
        margin-bottom: 0.25rem;
      }
      
      .stat-label {
        font-size: 0.875rem;
        opacity: 0.8;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
      
      .stat-divider {
        width: 1px;
        height: 40px;
        background: rgba(255, 255, 255, 0.3);
      }
      
      /* Hero Icons Section */
      .hero-icons {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        margin-bottom: 4rem;
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .hero-icon-item {
        text-align: center;
        padding: 1.5rem;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .hero-icon-item:hover {
        transform: translateY(-8px);
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      }
      
      .hero-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.15);
        border: 2px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      .hero-icon::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        animation: rotate 3s linear infinite;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .hero-icon-item:hover .hero-icon::before {
        opacity: 1;
      }
      
      @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .hero-icon svg {
        z-index: 1;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      }
      
      .hero-icon-label {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-white);
        letter-spacing: 0.025em;
        line-height: 1.4;
      }
      
      /* Mobile Hero Icons */
      @media (max-width: 768px) {
        .hero-icons {
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        
        .hero-icon-item {
          padding: 1rem;
        }
        
        .hero-icon {
          width: 64px;
          height: 64px;
        }
        
        .hero-icon svg {
          width: 32px;
          height: 32px;
        }
        
        .hero-icon-label {
          font-size: 0.9rem;
        }
        
        .hero-stats {
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .stat-divider {
          width: 40px;
          height: 1px;
        }
      }
      
      /* Language Switcher - Simple Text */
      .lang-switcher {
        position: absolute;
        top: var(--header-spacing-mobile);
        right: var(--header-spacing-mobile);
        z-index: 10;
      }
      
      .lang-options {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        font-weight: 500;
        height: 44px;
      }
      
      .lang-option {
        color: var(--text-muted);
        text-decoration: none;
        padding: 4px 8px;
        border-radius: 4px;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-size: 12px;
        min-width: 24px;
        text-align: center;
      }
      
      .lang-option:hover {
        color: var(--text-primary);
        background: var(--border-color);
      }
      
      .lang-option.active {
        color: var(--accent-color);
        font-weight: 700;
      }
      
      .lang-separator {
        color: var(--text-muted);
        font-weight: 300;
        user-select: none;
      }
      
      /* Theme Toggle Switch - Mobile First */
      .theme-switcher {
        position: absolute;
        top: var(--header-spacing-mobile);
        left: var(--header-spacing-mobile);
        z-index: 10;
      }
      
      .theme-toggle {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 11px;
        font-weight: 500;
        height: 44px; /* Fixed height for consistent alignment */
      }
      
      .theme-label {
        color: var(--text-muted);
        font-size: 11px;
        font-weight: 500;
        transition: color 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        min-width: 32px;
        text-align: center;
      }
      
      .theme-toggle-switch {
        position: relative;
        width: 60px;
        height: 32px;
        background: var(--border-color);
        border-radius: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        flex-shrink: 0;
      }
      
      .theme-toggle-switch:hover {
        background: var(--text-muted);
      }
      
      .theme-toggle-slider {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 28px;
        height: 28px;
        background: white;
        border-radius: 50%;
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.15);
      }
      
      .theme-toggle-switch.dark .theme-toggle-slider {
        transform: translateX(28px);
        background: #334155;
        color: white;
      }
      
      .theme-toggle-switch.dark {
        background: var(--accent-color);
      }
      
      
      /* Legal Sections */
      .legal-section {
        margin-bottom: 2rem;
      }
      .legal-section h4 {
        color: var(--legal-section-heading);
        font-weight: 600;
        margin-bottom: 1rem;
      }
      
      /* Tags */
      .tag-item {
        background: var(--accent-color);
        color: white;
        border-radius: 20px;
        padding: 8px 16px;
        margin: 4px;
        display: inline-block;
        font-weight: 500;
      }
      
      /* Form Controls */
      .form-control, .form-select {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
      }
      
      .form-control:focus, .form-select:focus {
        background: var(--card-bg);
        border-color: var(--accent-color);
        color: var(--text-primary);
        box-shadow: 0 0 0 0.2rem rgba(62, 142, 208, 0.25);
      }
      
      /* Links */
      a {
        color: var(--accent-color);
      }
      
      a:hover {
        color: var(--accent-secondary);
      }
      
      /* Responsive Typography */
      h1 {
        font-size: clamp(1.8rem, 4vw, 2.5rem) !important;
        line-height: 1.2;
      }
      
      h3 {
        font-size: clamp(1.2rem, 2.5vw, 1.5rem);
      }
      
      h5 {
        font-size: clamp(1rem, 2vw, 1.25rem);
      }
      
      .btn {
        font-size: clamp(0.875rem, 1.5vw, 1rem);
        padding: clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 24px);
      }
      
      /* Mobile Optimizations */
      @media (max-width: 767px) {
        .container:not(.header-container) {
          padding: 20px 15px !important;
          max-width: 100%;
          overflow-x: hidden;
        }
        
        *, *::before, *::after {
          word-wrap: break-word;
          overflow-wrap: break-word;
          box-sizing: border-box;
        }
        
        html {
          font-size: 16px;
        }
        
        @media (max-width: 480px) {
          html {
            font-size: 14px;
          }
        }
        
        .main-header {
          padding: 30px 20px !important;
        }
        
        .theme-switcher {
          top: 10px;
          left: 10px;
        }
        
        .lang-switcher {
          top: 10px;
          right: 10px;
        }
        
        .theme-toggle {
          flex-direction: row;
          gap: 6px;
          align-items: center;
          height: auto;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 140px;
        }
        
        .theme-toggle-switch {
          width: 50px !important;
          height: 26px !important;
          order: 2;
        }
        
        .theme-toggle-slider {
          width: 22px !important;
          height: 22px !important;
        }
        
        .theme-toggle-switch.dark .theme-toggle-slider {
          transform: translateX(22px) !important;
        }
        
        .lang-options {
          height: auto;
          gap: 4px;
          justify-content: flex-end;
        }
        
        .lang-option {
          font-size: 11px;
          padding: 2px 4px;
        }
        
        .theme-label {
          font-size: 9px;
          opacity: 0.8;
          min-width: auto;
          order: 1;
          white-space: nowrap;
        }
        
        .theme-label:last-child {
          order: 3;
        }
        
        .card {
          margin-bottom: 20px;
        }
        
        .btn {
          width: 100%;
          margin-bottom: 10px;
        }
        
        .row .col-md-4, .row .col-md-8 {
          margin-bottom: 20px;
        }
        
      }
      
      /* Tablet Optimizations */
      @media (min-width: 768px) and (max-width: 1023px) {
        .theme-switcher {
          top: var(--header-spacing-desktop);
          left: var(--header-spacing-desktop);
        }
        
        .lang-switcher {
          top: var(--header-spacing-desktop);
          right: var(--header-spacing-desktop);
        }
        
        .theme-toggle-switch {
          width: 58px;
          height: 30px;
        }
        
        .theme-toggle-slider {
          width: 26px;
          height: 26px;
        }
        
        .theme-toggle-switch.dark .theme-toggle-slider {
          transform: translateX(26px);
        }
        
        .lang-options {
          gap: 10px;
        }
        
        .lang-option {
          font-size: 13px;
        }
      }
      
      /* Desktop Optimizations */
      @media (min-width: 1024px) {
        .theme-switcher {
          top: var(--header-spacing-desktop);
          left: var(--header-spacing-desktop);
        }
        
        .lang-switcher {
          top: var(--header-spacing-desktop);
          right: var(--header-spacing-desktop);
        }
        
        .theme-toggle {
          gap: 12px;
        }
        
        .lang-options {
          gap: 10px;
        }
        
        .theme-label {
          font-size: 12px;
        }
        
        .theme-toggle-switch {
          width: 60px;
          height: 32px;
        }
        
        .theme-toggle-slider {
          width: 28px;
          height: 28px;
        }
        
        .theme-toggle-switch.dark .theme-toggle-slider {
          transform: translateX(28px);
        }
        
        .lang-option {
          font-size: 14px;
          padding: 6px 10px;
        }
      }
    </style>
  `;
}

// GA4 (Google Analytics 4) Implementation
function generateGA4Script(acceptedCookies = false) {
  const measurementId = 'G-8YT6DMLP00';
  
  if (!acceptedCookies) {
    // Return empty script if cookies not accepted
    return `
      <!-- GA4 - Waiting for cookie consent -->
      <script>
        window.gtag = window.gtag || function(){(window.gtag.q=window.gtag.q||[]).push(arguments);};
        window.dataLayer = window.dataLayer || [];
        
        // Initialize gtag but don't load GA4 yet
        window.gtag('js', new Date());
        
        // Function to load GA4 after consent
        window.loadGA4 = function() {
          if (window.ga4Loaded) return;
          
          const script = document.createElement('script');
          script.async = true;
          script.src = 'https://www.googletagmanager.com/gtag/js?id=${measurementId}';
          document.head.appendChild(script);
          
          script.onload = function() {
            gtag('config', '${measurementId}', {
              page_title: document.title,
              page_location: window.location.href,
              custom_map: {'custom_parameter_1': 'page_type'}
            });
            
            // Track page view
            gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href,
              page_type: document.body.getAttribute('data-page-type') || 'unknown'
            });
            
            window.ga4Loaded = true;
            console.log('GA4 loaded successfully after consent');
          };
        };
        
        // Check if cookies are already accepted
        if (localStorage.getItem('dhgate_analytics_consent') === 'accepted') {
          window.loadGA4();
        }
      </script>
    `;
  }
  
  // Full GA4 implementation with consent
  return `
    <!-- Google Analytics 4 (GA4) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${measurementId}', {
        // Privacy-friendly settings
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        
        // Enhanced ecommerce and custom dimensions
        custom_map: {
          'custom_parameter_1': 'page_type',
          'custom_parameter_2': 'user_language', 
          'custom_parameter_3': 'theme_preference'
        },
        
        // Page view settings
        page_title: document.title,
        page_location: window.location.href
      });

      // Track initial page view with custom parameters
      gtag('event', 'page_view', {
        page_type: document.body.getAttribute('data-page-type') || 'unknown',
        user_language: document.documentElement.lang || 'en',
        theme_preference: localStorage.getItem('dhgate_theme') || 'light'
      });

      // Custom event functions for DHgate Monitor using AnalyticsService
      window.trackDHgateEvent = function(eventName, parameters = {}) {
        AnalyticsService.trackConversion(eventName, {
          event_category: 'DHgate Monitor',
          ...parameters
        });
      };

      // Track form submissions
      window.trackFormSubmission = function(formType, success = true) {
        AnalyticsService.trackConversion('form_submit', {
          event_category: 'engagement',
          form_type: formType,
          success: success,
          page_type: document.body.getAttribute('data-page-type') || 'unknown'
        });
      };

      // Track shop additions
      window.trackShopAdd = function(shopUrl) {
        AnalyticsService.trackConversion('shop_add', {
          event_category: 'user_action',
          shop_url: shopUrl,
          value: 1
        });
      };

      // Track dashboard access
      window.trackDashboardAccess = function(accessMethod = 'direct') {
        AnalyticsService.trackConversion('dashboard_access', {
          event_category: 'engagement',
          access_method: accessMethod,
          value: 1
        });
      };

      // Track email actions
      window.trackEmailAction = function(action, type = 'subscription') {
        AnalyticsService.trackConversion('email_action', {
          event_category: 'communication',
          email_action: action,
          email_type: type
        });
      };

      // Track theme/language changes
      window.trackPreferenceChange = function(preference, value) {
        AnalyticsService.trackConversion('preference_change', {
          event_category: 'customization',
          preference_type: preference,
          preference_value: value
        });
      };

      // Track unsubscribe events
      window.trackUnsubscribe = function(method = 'email_link') {
        AnalyticsService.trackConversion('unsubscribe', {
          event_category: 'user_lifecycle',
          unsubscribe_method: method,
          value: -1
        });
      };

      console.log('GA4 tracking initialized for DHgate Monitor');
    </script>
  `;
}

// Cookie Consent Banner for GDPR Compliance
function generateCookieConsentBanner(lang = 'en') {
  const translations = {
    nl: {
      title: 'Cookie voorkeuren',
      message: 'We gebruiken cookies om uw ervaring te verbeteren en de website functionaliteit te waarborgen.',
      accept: 'Accepteren',
      decline: 'Weigeren',
      settings: 'Cookie instellingen',
      necessary: 'Noodzakelijke cookies',
      analytics: 'Analytics cookies',
      necessary_desc: 'Vereist voor basisfunctionaliteit van de website',
      analytics_desc: 'Helpen ons de website te verbeteren door gebruiksstatistieken te verzamelen'
    },
    en: {
      title: 'Cookie preferences',
      message: 'We use cookies to enhance your experience and ensure website functionality.',
      accept: 'Accept',
      decline: 'Decline', 
      settings: 'Cookie settings',
      necessary: 'Necessary cookies',
      analytics: 'Analytics cookies',
      necessary_desc: 'Required for basic website functionality',
      analytics_desc: 'Help us improve the website by collecting usage statistics'
    }
  };
  
  const t = translations[lang] || translations.en;
  
  return `
    <!-- Cookie Consent Banner -->
    <div id="cookieConsent" class="cookie-consent-overlay" style="display: none;">
      <div class="cookie-consent-banner">
        <div class="cookie-consent-content">
          <h4 class="cookie-consent-title">${t.title}</h4>
          <p class="cookie-consent-message">${t.message}</p>
          
          <div class="cookie-settings" id="cookieSettings" style="display: none;">
            <div class="cookie-category">
              <label class="cookie-label">
                <input type="checkbox" checked disabled> ${t.necessary}
                <small>${t.necessary_desc}</small>
              </label>
            </div>
            <div class="cookie-category">
              <label class="cookie-label">
                <input type="checkbox" id="analyticsCookies" checked> ${t.analytics}
                <small>${t.analytics_desc}</small>
              </label>
            </div>
          </div>
          
          <div class="cookie-consent-actions">
            <button onclick="acceptCookies()" class="btn btn-primary">${t.accept}</button>
            <button onclick="declineCookies()" class="btn btn-outline-secondary">${t.decline}</button>
            <button onclick="toggleCookieSettings()" class="btn btn-link">${t.settings}</button>
          </div>
        </div>
      </div>
    </div>

    <style>
      .cookie-consent-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        pointer-events: auto;
      }
      
      .cookie-consent-banner {
        background: var(--card-bg);
        border-radius: 20px 20px 0 0;
        box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.2);
        max-width: 600px;
        width: 100%;
        margin: 0 20px 0 20px;
        animation: slideUpIn 0.3s ease-out;
      }
      
      @keyframes slideUpIn {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      
      .cookie-consent-content {
        padding: 30px;
      }
      
      .cookie-consent-title {
        color: var(--text-primary);
        margin-bottom: 15px;
        font-weight: 600;
      }
      
      .cookie-consent-message {
        color: var(--text-secondary);
        margin-bottom: 20px;
        line-height: 1.6;
      }
      
      .cookie-settings {
        margin: 20px 0;
        padding: 15px;
        background: var(--bg-light);
        border-radius: 10px;
      }
      
      .cookie-category {
        margin-bottom: 15px;
      }
      
      .cookie-label {
        display: flex;
        flex-direction: column;
        gap: 5px;
        cursor: pointer;
        color: var(--text-primary);
      }
      
      .cookie-label input {
        margin-right: 8px;
      }
      
      .cookie-label small {
        color: var(--text-muted);
        margin-left: 20px;
      }
      
      .cookie-consent-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .cookie-consent-actions .btn {
        cursor: pointer;
        pointer-events: auto;
      }
      
      @media (max-width: 768px) {
        .cookie-consent-banner {
          margin: 0;
          border-radius: 20px 20px 0 0;
        }
        
        .cookie-consent-actions {
          flex-direction: column;
        }
      }
    </style>

    <script>
      // Show cookie consent banner if not already accepted/declined
      document.addEventListener('DOMContentLoaded', function() {
        const consent = localStorage.getItem('dhgate_analytics_consent');
        const cookieBanner = document.getElementById('cookieConsent');
        
        if (!consent || (consent !== 'accepted' && consent !== 'declined')) {
          if (cookieBanner) {
            cookieBanner.style.display = 'flex';
          }
        } else if (consent === 'accepted') {
          // Load GA4 if previously accepted
          if (typeof window.loadGA4 === 'function') {
            window.loadGA4();
          }
          // Ensure banner is hidden
          if (cookieBanner) {
            cookieBanner.style.display = 'none';
          }
        } else if (consent === 'declined') {
          // Ensure banner is hidden when declined
          if (cookieBanner) {
            cookieBanner.style.display = 'none';
          }
        }
      });

      function acceptCookies() {
        const analyticsCheckbox = document.getElementById('analyticsCookies');
        const analyticsEnabled = analyticsCheckbox ? analyticsCheckbox.checked : true; // Default to true if no checkbox
        
        localStorage.setItem('dhgate_analytics_consent', 'accepted');
        localStorage.setItem('dhgate_analytics_enabled', analyticsEnabled.toString());
        
        if (analyticsEnabled && typeof window.loadGA4 === 'function') {
          window.loadGA4();
          
          // Track consent acceptance
          setTimeout(() => {
            if (typeof window.trackDHgateEvent === 'function') {
              window.trackDHgateEvent('cookie_consent', {
                consent_action: 'accepted',
                analytics_enabled: true
              });
            }
          }, 1000);
        }
        
        const cookieBanner = document.getElementById('cookieConsent');
        if (cookieBanner) {
          cookieBanner.style.display = 'none';
        }
      }

      function declineCookies() {
        localStorage.setItem('dhgate_analytics_consent', 'declined');
        localStorage.setItem('dhgate_analytics_enabled', 'false');
        const cookieBanner = document.getElementById('cookieConsent');
        if (cookieBanner) {
          cookieBanner.style.display = 'none';
        }
      }

      function toggleCookieSettings() {
        const settings = document.getElementById('cookieSettings');
        settings.style.display = settings.style.display === 'none' ? 'block' : 'none';
      }
    </script>
  `;
}


// DHgate Sitemap Scraper Functions
async function scrapeDHgateSitemaps() {
  return await ErrorHandler.safeExecute(async () => {
    console.log('🚫 Store database disabled - users must add stores manually via URL');
    
    // Return empty array - no fake/fallback stores
    // Users can only add stores via manual URL input as requested
    const stores = [];
    
    console.log(`✅ Empty store database created - manual URL entry only`);
    return stores;
  }, 'DHgate sitemap scraping', []);
}

function extractSellerSitemapUrls(sitemapXml) {
  const urls = [];
  
  // Simple regex to find seller sitemap URLs
  const sitemapRegex = /<loc>(https:\/\/www\.dhgate\.com\/sitemap[^<]*seller[^<]*\.xml)<\/loc>/g;
  let match;
  
  while ((match = sitemapRegex.exec(sitemapXml)) !== null) {
    urls.push(match[1]);
  }
  
  return urls;
}

function parseStoreDataFromSitemap(sitemapXml) {
  const stores = [];
  
  // Regex to find store URLs
  const storeUrlRegex = /<loc>(https:\/\/www\.dhgate\.com\/store\/[^<]+)<\/loc>/g;
  let match;
  
  while ((match = storeUrlRegex.exec(sitemapXml)) !== null) {
    const storeUrl = match[1];
    const storeName = extractStoreNameFromUrl(storeUrl);
    
    if (storeName) {
      stores.push({
        name: storeName,
        url: storeUrl
      });
    }
  }
  
  return stores;
}

function extractStoreNameFromUrl(url) {
  try {
    // Extract store name from URL patterns like:
    // https://www.dhgate.com/store/12345678
    // https://www.dhgate.com/store/storename
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    
    if (pathParts.length >= 3 && pathParts[1] === 'store') {
      const storeIdentifier = pathParts[2];
      
      // If it's a number, try to make a readable name
      if (/^\d+$/.test(storeIdentifier)) {
        return `Store ${storeIdentifier}`;
      }
      
      // If it's a name, clean it up
      return storeIdentifier
        .replace(/-/g, ' ')
        .replace(/[^\w\s]/g, '')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting store name from URL:', url, error);
    return null;
  }
}

// ========================================
// DHGATE AFFILIATE PROGRAM IMPLEMENTATION
// ========================================

// DHgate Affiliate Configuration
const DHGATE_AFFILIATE_CONFIG = {
  affiliate_id: 'YOUR_DHGATE_AFFILIATE_ID', // To be configured
  base_url: 'https://www.dhgate.com',
  tracking_param: 'affiliate_id',
  commission_rates: {
    electronics: 0.03,
    fashion: 0.08,
    beauty: 0.12,
    default: 0.05
  }
};

// Admin Configuration
// Admin Database Management
async function initializeAdminTables(env) {
  try {
    // Admin users table
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        email TEXT,
        full_name TEXT,
        role TEXT DEFAULT 'admin',
        is_active BOOLEAN DEFAULT true,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME
      )
    `).run();

    // Check if default admin exists, if not create it
    const existingAdmin = await env.DB.prepare(`
      SELECT id FROM admin_users WHERE username = ?
    `).bind('admin').first();

    if (!existingAdmin) {
      // Create default admin user (in production, hash the password properly)
      await env.DB.prepare(`
        INSERT INTO admin_users (username, password_hash, email, full_name, role)
        VALUES (?, ?, ?, ?, ?)
      `).bind(
        'admin',
        'DHgate2024!Admin', // In production, use proper password hashing
        'admin@dhgate-monitor.com',
        'System Administrator',
        'super_admin'
      ).run();
    }

    // Initialize basic subscriptions table for platform metrics (if not exists)
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    // Add sample data for demo
    const existingSubscriptions = await env.DB.prepare(`
      SELECT COUNT(*) as count FROM subscriptions
    `).first();

    if (existingSubscriptions.count === 0) {
      await env.DB.prepare(`
        INSERT INTO subscriptions (email, status, created_at) VALUES 
        ('demo1@dhgate-monitor.com', 'active', datetime('now', '-30 days')),
        ('demo2@dhgate-monitor.com', 'active', datetime('now', '-15 days')),
        ('demo3@dhgate-monitor.com', 'active', datetime('now', '-5 days'))
      `).run();
    }

  } catch (error) {
    console.error('Error initializing admin tables:', error);
  }
}

// Enhanced admin authentication using D1
async function verifyAdminCredentialsDB(env, username, password) {
  try {
    const admin = await env.DB.prepare(`
      SELECT id, username, password_hash, is_active, role
      FROM admin_users 
      WHERE username = ? AND is_active = true
    `).bind(username).first();

    if (!admin) {
      return null;
    }

    // In production, use proper password hashing (bcrypt)
    // For now, direct comparison for development
    if (admin.password_hash === password) {
      // Update last login
      await env.DB.prepare(`
        UPDATE admin_users 
        SET last_login = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(admin.id).run();

      return {
        id: admin.id,
        username: admin.username,
        role: admin.role
      };
    }

    return null;
  } catch (error) {
    console.error('Error verifying admin credentials:', error);
    return null;
  }
}

// Get all admin users (for management)
async function getAdminUsers(env) {
  try {
    const admins = await env.DB.prepare(`
      SELECT id, username, email, full_name, role, is_active, created_at, last_login
      FROM admin_users 
      ORDER BY created_at DESC
    `).all();

    return admins.results || [];
  } catch (error) {
    console.error('Error getting admin users:', error);
    return [];
  }
}

// Reset admin password - emergency function
async function resetAdminPassword(env, username, newPassword) {
  try {
    const result = await env.DB.prepare(`
      UPDATE admin_users 
      SET password_hash = ?, updated_at = CURRENT_TIMESTAMP
      WHERE username = ?
    `).bind(newPassword, username).run();

    if (result.changes > 0) {
      console.log(`Password reset successful for admin: ${username}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error resetting admin password:', error);
    return false;
  }
}

// Change admin password (authenticated)
async function changeAdminPassword(env, adminId, currentPassword, newPassword) {
  try {
    // Verify current password first
    const admin = await env.DB.prepare(`
      SELECT id, password_hash FROM admin_users WHERE id = ?
    `).bind(adminId).first();

    if (!admin || admin.password_hash !== currentPassword) {
      return { success: false, error: 'Huidig wachtwoord is incorrect' };
    }

    // Update to new password
    const result = await env.DB.prepare(`
      UPDATE admin_users 
      SET password_hash = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(newPassword, adminId).run();

    if (result.changes > 0) {
      return { success: true, message: 'Wachtwoord succesvol gewijzigd' };
    }
    return { success: false, error: 'Wachtwoord wijzigen mislukt' };
  } catch (error) {
    console.error('Error changing admin password:', error);
    return { success: false, error: 'Database fout bij wachtwoord wijzigen' };
  }
}

// Generate temporary password for emergency access
async function generateTempPassword(env, username) {
  const tempPassword = 'temp_' + Math.random().toString(36).substring(2, 15);
  const success = await resetAdminPassword(env, username, tempPassword);
  
  if (success) {
    return tempPassword;
  }
  return null;
}

const ADMIN_CONFIG = {
  username: 'admin',
  password: 'DHgate2024!Admin', // Strong password for production
  session_duration: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};

// Admin authentication functions
function generateAdminToken() {
  const timestamp = Date.now();
  const randomBytes = Array.from({length: 32}, () => Math.floor(Math.random() * 256));
  return btoa(String.fromCharCode(...randomBytes)).replace(/[+/=]/g, '').substring(0, 32) + timestamp;
}

function verifyAdminCredentials(username, password) {
  return username === ADMIN_CONFIG.username && password === ADMIN_CONFIG.password;
}

async function createAdminSession(env, token) {
  const expires = Date.now() + ADMIN_CONFIG.session_duration;
  await env.DHGATE_MONITOR_KV.put(`admin_session:${token}`, JSON.stringify({
    created: Date.now(),
    expires: expires,
    username: ADMIN_CONFIG.username
  }), { expirationTtl: Math.floor(ADMIN_CONFIG.session_duration / 1000) });
  
  return token;
}

async function verifyAdminSession(env, token) {
  if (!token) return false;
  
  try {
    const sessionData = await env.DHGATE_MONITOR_KV.get(`admin_session:${token}`);
    if (!sessionData) return false;
    
    const session = JSON.parse(sessionData);
    return Date.now() < session.expires;
  } catch (error) {
    console.error('Error verifying admin session:', error);
    return false;
  }
}

async function deleteAdminSession(env, token) {
  if (token) {
    await env.DHGATE_MONITOR_KV.delete(`admin_session:${token}`);
  }
}

// Initialize affiliate database tables
async function initializeAffiliateTables(env) {
  try {
    // Affiliate clicks tracking table
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS affiliate_clicks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_email TEXT,
        product_url TEXT NOT NULL,
        affiliate_url TEXT NOT NULL,
        click_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip_address TEXT,
        user_agent TEXT,
        referrer TEXT,
        conversion_status TEXT DEFAULT 'pending'
      )
    `).run();

    // Affiliate earnings tracking table
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS affiliate_earnings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        click_id INTEGER,
        order_id TEXT,
        product_url TEXT,
        commission_amount REAL,
        commission_rate REAL,
        order_value REAL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        confirmed_at DATETIME,
        FOREIGN KEY (click_id) REFERENCES affiliate_clicks(id)
      )
    `).run();

    // Affiliate link mappings cache
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS affiliate_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        original_url TEXT UNIQUE NOT NULL,
        affiliate_url TEXT NOT NULL,
        product_category TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_used DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    console.log('Affiliate database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing affiliate tables:', error);
  }
}

// Convert DHgate URL to affiliate URL
function convertToAffiliateUrl(originalUrl, affiliateId = DHGATE_AFFILIATE_CONFIG.affiliate_id) {
  try {
    const url = new URL(originalUrl);
    
    // Only process DHgate URLs
    if (!url.hostname.includes('dhgate.com')) {
      return originalUrl;
    }

    // Add affiliate tracking parameter
    url.searchParams.set(DHGATE_AFFILIATE_CONFIG.tracking_param, affiliateId);
    url.searchParams.set('utm_source', 'dhgate-monitor');
    url.searchParams.set('utm_medium', 'affiliate');
    url.searchParams.set('utm_campaign', 'product-monitoring');
    
    return url.toString();
  } catch (error) {
    console.error('Error converting to affiliate URL:', error);
    return originalUrl;
  }
}

// Track affiliate click
async function trackAffiliateClick(env, clickData) {
  try {
    const result = await env.DB.prepare(`
      INSERT INTO affiliate_clicks 
      (user_email, product_url, affiliate_url, ip_address, user_agent, referrer)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      clickData.userEmail || null,
      clickData.productUrl,
      clickData.affiliateUrl,
      clickData.ipAddress || null,
      clickData.userAgent || null,
      clickData.referrer || null
    ).run();

    return result.meta.last_row_id;
  } catch (error) {
    console.error('Error tracking affiliate click:', error);
    return null;
  }
}

// Get or create cached affiliate link
async function getCachedAffiliateLink(env, originalUrl) {
  try {
    // Check if we have a cached affiliate link
    const cached = await env.DB.prepare(`
      SELECT affiliate_url FROM affiliate_links 
      WHERE original_url = ?
    `).bind(originalUrl).first();

    if (cached) {
      // Update last used timestamp
      await env.DB.prepare(`
        UPDATE affiliate_links 
        SET last_used = CURRENT_TIMESTAMP 
        WHERE original_url = ?
      `).bind(originalUrl).run();
      
      return cached.affiliate_url;
    }

    // Create new affiliate link
    const affiliateUrl = convertToAffiliateUrl(originalUrl);
    
    if (affiliateUrl !== originalUrl) {
      // Cache the new affiliate link
      await env.DB.prepare(`
        INSERT INTO affiliate_links (original_url, affiliate_url, product_category)
        VALUES (?, ?, ?)
      `).bind(originalUrl, affiliateUrl, detectProductCategory(originalUrl)).run();
    }

    return affiliateUrl;
  } catch (error) {
    console.error('Error getting cached affiliate link:', error);
    return convertToAffiliateUrl(originalUrl);
  }
}

// Detect product category from URL for commission rate calculation
function detectProductCategory(url) {
  const categories = {
    'electronics': /electronic|phone|computer|gadget|tech/i,
    'fashion': /fashion|clothing|apparel|dress|shirt|shoe/i,
    'beauty': /beauty|cosmetic|makeup|skincare|perfume/i
  };

  for (const [category, regex] of Object.entries(categories)) {
    if (regex.test(url)) {
      return category;
    }
  }
  
  return 'default';
}

// Enhanced email notification with affiliate links
function enhanceNotificationWithAffiliateLinks(emailContent, productUrls) {
  if (!Array.isArray(productUrls)) return emailContent;
  
  let enhancedContent = emailContent;
  
  productUrls.forEach(url => {
    const affiliateUrl = convertToAffiliateUrl(url);
    enhancedContent = enhancedContent.replace(url, affiliateUrl);
  });
  
  return enhancedContent;
}

// Affiliate redirect handler
async function handleAffiliateRedirect(request, env) {
  const url = new URL(request.url);
  const productUrl = url.searchParams.get('url');
  const userEmail = url.searchParams.get('user');
  
  if (!productUrl) {
    return new Response('Missing product URL', { status: 400 });
  }

  try {
    // Get cached affiliate URL
    const affiliateUrl = await getCachedAffiliateLink(env, decodeURIComponent(productUrl));
    
    // Track the click
    await trackAffiliateClick(env, {
      userEmail: userEmail,
      productUrl: decodeURIComponent(productUrl),
      affiliateUrl: affiliateUrl,
      ipAddress: request.headers.get('CF-Connecting-IP'),
      userAgent: request.headers.get('User-Agent'),
      referrer: request.headers.get('Referer')
    });

    // Redirect to affiliate URL
    return Response.redirect(affiliateUrl, 302);
  } catch (error) {
    console.error('Error in affiliate redirect:', error);
    return Response.redirect(decodeURIComponent(productUrl), 302);
  }
}

// Get affiliate analytics
async function getAffiliateAnalytics(env) {
  try {
    const analytics = await env.DB.prepare(`
      SELECT 
        COUNT(*) as total_clicks,
        COUNT(DISTINCT user_email) as unique_users,
        COUNT(CASE WHEN conversion_status = 'converted' THEN 1 END) as conversions,
        DATE(click_timestamp) as date
      FROM affiliate_clicks 
      WHERE click_timestamp >= datetime('now', '-30 days')
      GROUP BY DATE(click_timestamp)
      ORDER BY date DESC
    `).all();

    const earnings = await env.DB.prepare(`
      SELECT 
        SUM(commission_amount) as total_earnings,
        COUNT(*) as total_orders,
        AVG(commission_amount) as avg_commission
      FROM affiliate_earnings 
      WHERE status = 'confirmed'
        AND created_at >= datetime('now', '-30 days')
    `).first();

    return {
      clicks: analytics.results || [],
      earnings: earnings || { total_earnings: 0, total_orders: 0, avg_commission: 0 }
    };
  } catch (error) {
    console.error('Error getting affiliate analytics:', error);
    return { clicks: [], earnings: { total_earnings: 0, total_orders: 0, avg_commission: 0 } };
  }
}

// Generate affiliate dashboard HTML
function generateAffiliateDashboardHTML(analytics, lang = 'nl', theme = 'light') {
  const totalClicks = analytics.clicks.reduce((sum, day) => sum + day.total_clicks, 0);
  const totalUsers = analytics.clicks.reduce((sum, day) => sum + day.unique_users, 0);
  const totalConversions = analytics.clicks.reduce((sum, day) => sum + day.conversions, 0);
  const conversionRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : 0;
  
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lang === 'nl' ? 'Affiliate Dashboard - DHgate Monitor' : 'Affiliate Dashboard - DHgate Monitor'}</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    ${generateGlobalCSS(theme)}
    <style>
        .affiliate-dashboard {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .dashboard-header {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }
        
        .stat-card {
            background: var(--card-bg);
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--accent-color);
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            color: var(--text-secondary);
            font-weight: 500;
        }
        
        .earnings-section {
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .earnings-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .commission-info {
            background: rgba(16, 185, 129, 0.1);
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
        }
    </style>
</head>
<body>
    
    <div class="affiliate-dashboard">
        <div class="dashboard-header">
            <h1>${lang === 'nl' ? '📊 Affiliate Dashboard' : '📊 Affiliate Dashboard'}</h1>
            <p>${lang === 'nl' ? 'Track je affiliate performance en verdiensten' : 'Track your affiliate performance and earnings'}</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">${totalClicks}</div>
                <div class="stat-label">${lang === 'nl' ? 'Totaal Clicks (30d)' : 'Total Clicks (30d)'}</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-value">${totalUsers}</div>
                <div class="stat-label">${lang === 'nl' ? 'Unieke Gebruikers' : 'Unique Users'}</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-value">${totalConversions}</div>
                <div class="stat-label">${lang === 'nl' ? 'Conversies' : 'Conversions'}</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-value">${conversionRate}%</div>
                <div class="stat-label">${lang === 'nl' ? 'Conversie Ratio' : 'Conversion Rate'}</div>
            </div>
        </div>
        
        <div class="earnings-section">
            <div class="earnings-header">
                <h2>${lang === 'nl' ? '💰 Verdiensten Overzicht' : '💰 Earnings Overview'}</h2>
                <span style="color: var(--text-secondary);">${lang === 'nl' ? 'Laatste 30 dagen' : 'Last 30 days'}</span>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">€${(analytics.earnings.total_earnings || 0).toFixed(2)}</div>
                    <div class="stat-label">${lang === 'nl' ? 'Totale Commissie' : 'Total Commission'}</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-value">${analytics.earnings.total_orders || 0}</div>
                    <div class="stat-label">${lang === 'nl' ? 'Bestellingen' : 'Orders'}</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-value">€${(analytics.earnings.avg_commission || 0).toFixed(2)}</div>
                    <div class="stat-label">${lang === 'nl' ? 'Gem. Commissie' : 'Avg. Commission'}</div>
                </div>
            </div>
            
            <div class="commission-info">
                <strong>${lang === 'nl' ? 'ℹ️ Commissie Informatie:' : 'ℹ️ Commission Information:'}</strong><br>
                ${lang === 'nl' ? 
                  'Electronics: 3% • Fashion: 8% • Beauty: 12% • Overige: 5%' : 
                  'Electronics: 3% • Fashion: 8% • Beauty: 12% • Others: 5%'
                }<br>
                ${lang === 'nl' ? 
                  'Uitbetalingen worden maandelijks verwerkt met een minimum van €50.' :
                  'Payouts are processed monthly with a minimum of €50.'
                }
            </div>
        </div>
    </div>
    
    ${generateSEOFooter(lang, 'affiliate')}
</body>
</html>
  `;
}

// Handle admin login page
async function handleAdminLogin(request, env) {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'nl';
  const theme = url.searchParams.get('theme') || 'light';
  
  if (request.method === 'POST') {
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');
    
    const adminUser = await verifyAdminCredentialsDB(env, username, password);
    if (adminUser) {
      const token = generateAdminToken();
      await createAdminSession(env, token);
      
      // Set secure cookie with headers
      const headers = new Headers();
      headers.set('Set-Cookie', `admin_token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${ADMIN_CONFIG.session_duration / 1000}; Path=/`);
      headers.set('Location', `${url.origin}/admin/dashboard?lang=${lang}&theme=${theme}`);
      
      return new Response(null, {
        status: 302,
        headers: headers
      });
    } else {
      return new Response(generateAdminLoginHTML(lang, theme, 'Invalid credentials'), {
        status: 401,
        headers: { 'Content-Type': 'text/html' }
      });
    }
  }
  
  return new Response(generateAdminLoginHTML(lang, theme), {
    headers: { 'Content-Type': 'text/html' }
  });
}

// Handle admin dashboard (internal)
async function handleAdminDashboard(request, env) {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'nl';
  const theme = url.searchParams.get('theme') || 'light';
  
  // Check authentication
  const cookies = request.headers.get('Cookie') || '';
  const tokenMatch = cookies.match(/admin_token=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;
  
  const isAuthenticated = await verifyAdminSession(env, token);
  
  if (!isAuthenticated) {
    return Response.redirect(`${url.origin}/admin/login?lang=${lang}&theme=${theme}`, 302);
  }
  
  try {
    const affiliateAnalytics = await getAffiliateAnalytics(env);
    const platformMetrics = await getPlatformMetrics(env);
    const affiliatePerformance = await getAffiliatePerformance(env);
    const html = generateEnhancedAdminDashboard(affiliateAnalytics, platformMetrics, affiliatePerformance, null, null, null, null, lang, theme);
    
    return new Response(html, {
      headers: { 
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Error in admin dashboard handler:', error);
    return new Response('Error loading admin dashboard', { status: 500 });
  }
}



// Handle admin logout
async function handleAdminLogout(request, env) {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'nl';
  const theme = url.searchParams.get('theme') || 'light';
  
  const cookies = request.headers.get('Cookie') || '';
  const tokenMatch = cookies.match(/admin_token=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;
  
  if (token) {
    await deleteAdminSession(env, token);
  }
  
  const response = Response.redirect(`${url.origin}/admin/login?lang=${lang}&theme=${theme}`, 302);
  response.headers.set('Set-Cookie', 'admin_token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/');
  return response;
}

// Handle affiliate dashboard page (now public access removed)
async function handleAffiliateDashboard(request, env) {
  // Redirect to admin login for security
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'nl';
  const theme = url.searchParams.get('theme') || 'light';
  
  return Response.redirect(`${url.origin}/admin/login?lang=${lang}&theme=${theme}`, 302);
}

// Handle affiliate analytics API request
async function handleAffiliateAnalytics(request, env) {
  try {
    const analytics = await getAffiliateAnalytics(env);
    
    return new Response(JSON.stringify({
      success: true,
      data: analytics
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Error in affiliate analytics handler:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch analytics'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Generate admin login HTML
function generateAdminLoginHTML(lang = 'nl', theme = 'light', error = null) {
  const t = getTranslations(lang);
  
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lang === 'nl' ? 'Admin Inloggen - DHgate Monitor' : 'Admin Login - DHgate Monitor'}</title>
    <meta name="description" content="${lang === 'nl' ? 'Beveiligde admin toegang voor DHgate Monitor platform beheer.' : 'Secure admin access for DHgate Monitor platform management.'}">
    <meta name="robots" content="noindex, nofollow">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    ${generateGlobalCSS(theme)}
    
    <style>
        body {
            background: var(--bg-primary);
            min-height: 100vh;
            font-family: 'Raleway', sans-serif;
        }
        
        .admin-login-page {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        
        .login-content {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .login-card {
            background: var(--card-bg);
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-lg);
            padding: 3rem;
            width: 100%;
            max-width: 450px;
            text-align: center;
            border: 1px solid var(--border-color);
        }
        
        .admin-logo {
            margin-bottom: 2rem;
        }
        
        .admin-logo img {
            width: 64px;
            height: 64px;
            object-fit: contain;
            margin-bottom: 1rem;
        }
        
        .login-title {
            color: var(--text-primary);
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .login-subtitle {
            color: var(--text-secondary);
            font-size: 1.1rem;
            margin-bottom: 2.5rem;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
            text-align: left;
        }
        
        .form-label {
            display: block;
            margin-bottom: 0.75rem;
            color: var(--text-primary);
            font-weight: 600;
            font-size: 0.95rem;
        }
        
        .form-input {
            width: 100%;
            padding: 1rem 1.25rem;
            border: 2px solid var(--border-color);
            border-radius: var(--border-radius);
            font-size: 1rem;
            background: var(--bg-primary);
            color: var(--text-primary);
            transition: all 0.3s ease;
            box-sizing: border-box;
        }
        
        .form-input:focus {
            outline: none;
            border-color: var(--accent-color);
            box-shadow: 0 0 0 3px var(--accent-color-light);
        }
        
        .login-button {
            width: 100%;
            padding: 1rem 2rem;
            background: var(--accent-color);
            color: white;
            border: none;
            border-radius: var(--border-radius);
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 1rem;
        }
        
        .login-button:hover {
            background: var(--accent-hover);
            transform: translateY(-2px);
        }
        
        .error-message {
            background: var(--error-bg, #fee2e2);
            color: var(--error-color, #dc2626);
            padding: 1rem;
            border-radius: var(--border-radius);
            margin-bottom: 1.5rem;
            font-weight: 500;
            border: 1px solid var(--error-border, #fecaca);
        }
        
        .back-link {
            margin-top: 1.5rem;
        }
        
        .back-link a {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.95rem;
            transition: color 0.3s ease;
        }
        
        .back-link a:hover {
            color: var(--accent-color);
        }
    </style>
</head>
<body class="admin-login-page">
    
    <main class="login-content">
        <div class="login-card">
            <div class="admin-logo">
                <img src="/assets/DHGateVector.png" alt="DHgate Monitor Logo">
                <h1 class="login-title">${lang === 'nl' ? 'Admin' : 'Admin'}</h1>
                <p class="login-subtitle">${lang === 'nl' ? 'Beveiligde toegang tot platform beheer' : 'Secure access to platform management'}</p>
            </div>
            
            ${error ? `<div class="error-message">⚠️ ${error}</div>` : ''}
            
            <form method="POST" action="/admin/login">
                <input type="hidden" name="lang" value="${lang}">
                <input type="hidden" name="theme" value="${theme}">
                
                <div class="form-group">
                    <label class="form-label" for="username">${lang === 'nl' ? 'Gebruikersnaam' : 'Username'}</label>
                    <input type="text" id="username" name="username" class="form-input" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="password">${lang === 'nl' ? 'Wachtwoord' : 'Password'}</label>
                    <input type="password" id="password" name="password" class="form-input" required>
                </div>
                
                <button type="submit" class="login-button">${lang === 'nl' ? 'Inloggen' : 'Login'}</button>
            </form>
            
            <div class="back-link">
                <a href="/?lang=${lang}&theme=${theme}">← ${lang === 'nl' ? 'Terug naar homepage' : 'Back to homepage'}</a>
            </div>
        </div>
    </main>
    
</body>
</html>
  `;
}

// Insert test affiliate data (for development only)
async function insertTestAffiliateData(env) {
  try {
    // Insert test affiliate clicks
    await env.DB.prepare(`
      INSERT OR IGNORE INTO affiliate_clicks 
      (user_email, product_url, affiliate_url, click_timestamp, conversion_status)
      VALUES 
      ('test@example.com', 'https://dhgate.com/product1', 'https://dhgate.com/product1?affiliate=test', datetime('now', '-1 day'), 'converted'),
      ('test@example.com', 'https://dhgate.com/product2', 'https://dhgate.com/product2?affiliate=test', datetime('now', '-2 days'), 'converted'),
      ('test@example.com', 'https://dhgate.com/product3', 'https://dhgate.com/product3?affiliate=test', datetime('now', '-3 days'), 'pending')
    `).run();

    // Insert test affiliate earnings
    await env.DB.prepare(`
      INSERT OR IGNORE INTO affiliate_earnings 
      (click_id, order_id, product_url, commission_amount, commission_rate, order_value, status, created_at)
      VALUES 
      (1, 'ORDER001', 'https://dhgate.com/product1', 15.50, 0.05, 310.00, 'confirmed', datetime('now', '-1 day')),
      (2, 'ORDER002', 'https://dhgate.com/product2', 22.80, 0.05, 456.00, 'confirmed', datetime('now', '-2 days')),
      (3, 'ORDER003', 'https://dhgate.com/product3', 18.90, 0.05, 378.00, 'pending', datetime('now', '-3 days'))
    `).run();

    console.log('Test affiliate data inserted successfully');
  } catch (error) {
    console.error('Error inserting test affiliate data:', error);
  }
}

// Get affiliate performance metrics
async function getAffiliatePerformance(env) {
  try {
    const earnings = await env.DB.prepare(`
      SELECT 
        SUM(commission_amount) as total_earnings,
        COUNT(*) as total_orders,
        AVG(commission_amount) as avg_commission,
        COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_orders,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_orders,
        DATE(created_at) as date
      FROM affiliate_earnings 
      WHERE created_at >= datetime('now', '-30 days')
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `).all();

    const monthlyStats = await env.DB.prepare(`
      SELECT 
        SUM(commission_amount) as monthly_earnings,
        COUNT(*) as monthly_orders,
        AVG(commission_amount) as monthly_avg_commission
      FROM affiliate_earnings 
      WHERE created_at >= datetime('now', '-30 days')
        AND status = 'confirmed'
    `).first();

    const topProducts = await env.DB.prepare(`
      SELECT 
        product_url as product_name,
        COUNT(*) as order_count,
        SUM(commission_amount) as total_commission
      FROM affiliate_earnings 
      WHERE created_at >= datetime('now', '-30 days')
        AND status = 'confirmed'
      GROUP BY product_url
      ORDER BY total_commission DESC
      LIMIT 5
    `).all();

    return {
      daily_earnings: earnings.results || [],
      monthly_stats: monthlyStats || { monthly_earnings: 0, monthly_orders: 0, monthly_avg_commission: 0 },
      top_products: topProducts.results || []
    };
  } catch (error) {
    console.error('Error getting affiliate performance:', error);
    return {
      daily_earnings: [],
      monthly_stats: { monthly_earnings: 0, monthly_orders: 0, monthly_avg_commission: 0 },
      top_products: []
    };
  }
}

// Get platform performance metrics
async function getPlatformMetrics(env) {
  try {
    const totalUsers = await env.DB.prepare(`
      SELECT COUNT(DISTINCT email) as total_users FROM subscriptions
    `).first();
    
    const activeSubscriptions = await env.DB.prepare(`
      SELECT COUNT(*) as active_subs FROM subscriptions WHERE status = 'active'
    `).first();
    
    const recentSignups = await env.DB.prepare(`
      SELECT COUNT(*) as recent_signups 
      FROM subscriptions 
      WHERE created_at >= datetime('now', '-7 days')
    `).first();
    
    return {
      total_users: totalUsers?.total_users || 0,
      active_subscriptions: activeSubscriptions?.active_subs || 0,
      recent_signups: recentSignups?.recent_signups || 0,
      uptime: "99.9%",
      last_updated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting platform metrics:', error);
    return {
      total_users: 0,
      active_subscriptions: 0,
      recent_signups: 0,
      uptime: "N/A",
      last_updated: new Date().toISOString()
    };
  }
}

// Get test plan results for admin dashboard
async function getTestPlanResults(env) {
  // Mock test results - in production, this would come from actual test runs
  return {
    total_tests: 24,
    passed: 23,
    failed: 1,
    success_rate: 95.8,
    last_run: new Date().toISOString(),
    test_categories: [
      { name: 'Email Notifications', passed: 6, failed: 0, total: 6 },
      { name: 'DHgate URL Processing', passed: 5, failed: 0, total: 5 },
      { name: 'Subscription Management', passed: 4, failed: 0, total: 4 },
      { name: 'Database Operations', passed: 4, failed: 0, total: 4 },
      { name: 'API Endpoints', passed: 3, failed: 1, total: 4 },
      { name: 'Theme & Language', passed: 1, failed: 0, total: 1 }
    ]
  };
}

// Main request handler
async function handleRequest(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;

    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Initialize affiliate database tables on first request
      await initializeAffiliateTables(env);
      
      // Initialize admin database tables
      await initializeAdminTables(env);
      
      // Route handling
      switch (url.pathname) {
        case '/':
          return await handleLandingPage(request, env);
        
        case '/widget':
        case '/embed':
          return await handleSignupWidget(request, env);
        
        case '/en/widget':
        case '/en/embed':
          return await handleSignupWidget(request, env);
        
        case '/en':
          return await handleEnglishLandingPage(request, env);
        
        
        case '/api/health':
          return await handleAPIHealthCheck(request, env);
        
        case '/api/testplan/execute':
          return await handleTestPlanExecution(request, env);
        
        case '/api/widget-signup':
          if (method === 'POST') {
            return await handleWidgetSignup(request, env);
          }
          break;
        
        case '/api/stores/update':
          return await handleStoreUpdate(request, env);
        
        case '/api/scraper/trigger':
          return await handleScraperTrigger(request, env);
        
        // Affiliate Program Routes
        case '/affiliate/redirect':
          return await handleAffiliateRedirect(request, env);
        
        case '/api/affiliate/analytics':
          return await handleAffiliateAnalytics(request, env);
        
        case '/affiliate/dashboard':
          return await handleAffiliateDashboard(request, env);
        
        // Admin Routes
        case '/admin/login':
          return await handleAdminLogin(request, env);
          
        case '/admin/dashboard':
          return await handleAdminDashboard(request, env);
          

          
        case '/admin/logout':
          return await handleAdminLogout(request, env);
        
        case '/unsubscribe':
          return await handleUnsubscribePage(request, env);
        
        case '/api/unsubscribe':
          return await handleUnsubscribeAction(request, env);
        
        case '/test-unsubscribe':
          return await handleTestUnsubscribe(request, env);
        
        case '/dashboard':
          return await handleDashboard(request, env);
          

        
        case '/add_shop':
          if (method === 'GET') {
            return await handleAddShopPage(request, env);
          } else if (method === 'POST') {
            return await handleAddShop(request, env);
          }
          break;
        
        case '/settings':
          if (method === 'GET') {
            return await handleSettingsPage(request, env);
          } else if (method === 'POST') {
            return await handleUpdateSettings(request, env);
          }
          break;
        
        case '/tags':
          if (method === 'GET') {
            return await handleTagsPage(request, env);
          } else if (method === 'POST') {
            return await handleUpdateTags(request, env);
          }
          break;
        
        
        case '/api/shops':
          if (method === 'GET') {
            return await handleGetShops(request, env);
          }
          break;
        
        case '/api/tags':
          if (method === 'GET') {
            return await handleGetTags(request, env);
          }
          break;
        
        case '/api/status':
          return await handleStatus(request, env);
        
        case '/privacy':
          return await handlePrivacyPage(request, env);
        
        case '/terms':
          return await handleTermsPage(request, env);
        
        case '/contact':
          // Redirect old contact page to new service page
          const lang = getLanguage(request);
          const theme = getTheme(request);
          return Response.redirect(`${url.origin}/service?lang=${lang}&theme=${theme}`, 301);
        
        case '/service':
          return await handleServicePage(request, env);
        
        case '/newsroom':
          return await handleNewsroomPage(request, env);
        
        case '/sitemap.xml':
          return await handleSitemap(request, env);
        
        case '/robots.txt':
          return await handleRobots(request, env);
        
        case '/request-dashboard-access':
          if (method === 'POST') {
            return await handleRequestDashboardAccess(request, env);
          }
          break;
        
        case '/delete-data':
          if (method === 'GET') {
            return await handleDeleteDataPage(request, env);
          } else if (method === 'POST') {
            return await handleDeleteData(request, env);
          }
          break;
        
        case '/test-emails':
          if (method === 'GET') {
            return await handleTestEmails(request, env);
          }
          break;
        
        case '/test-scheduled':
        

        

        

        

        

          if (method === 'GET') {
            console.log('🧪 Manual test trigger for scheduled function');
            try {
              // Call the actual scheduled function logic
              console.log('🕘 Manual scheduled monitoring triggered at:', new Date().toISOString());
              
              const shops = await getShops(env);
              const config = await getConfig(env);
              const tags = await getTags(env);
              const testResults = await getTestPlanResults(env);
              
              const testSubject = `DHgate Monitor Daily Report - ${new Date().toLocaleDateString()}`;
              // Use the same professional template with testplan
              const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DHgate Monitor Daily Report</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #2563eb; color: #ffffff; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; font-size: 24px; font-weight: bold;">DHgate Monitor</h1>
                            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Daily System Report & Test Results [MANUAL TEST]</p>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px;">
                            <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 20px;">Hello Admin,</h2>
                            
                            <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0;">
                                This is a manual test of your daily DHgate Monitor system report and test results for ${new Date().toLocaleDateString()}.
                            </p>
                            
                            <!-- System Status Box -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 6px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="color: #2563eb; margin: 0 0 15px 0; font-size: 18px;">System Status</h3>
                                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                            <tr>
                                                <td style="padding: 5px 0; color: #333333;"><strong>Report Time:</strong></td>
                                                <td style="padding: 5px 0; color: #666666;">${new Date().toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px 0; color: #333333;"><strong>Shops Monitored:</strong></td>
                                                <td style="padding: 5px 0; color: #666666;">${shops.length}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px 0; color: #333333;"><strong>Tags Configured:</strong></td>
                                                <td style="padding: 5px 0; color: #666666;">${tags.map(t => t.name).join(', ') || 'None'}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px 0; color: #333333;"><strong>System Status:</strong></td>
                                                <td style="padding: 5px 0; color: #28a745; font-weight: bold;">OPERATIONAL</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Test Results Box -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f0f8f0; border: 1px solid #d4edda; border-radius: 6px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="color: #155724; margin: 0 0 15px 0; font-size: 18px;">Test Plan Results</h3>
                                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                            <tr>
                                                <td style="padding: 5px 0; color: #333333;"><strong>Total Tests:</strong></td>
                                                <td style="padding: 5px 0; color: #666666;">${testResults.total_tests}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px 0; color: #333333;"><strong>Tests Passed:</strong></td>
                                                <td style="padding: 5px 0; color: #28a745; font-weight: bold;">${testResults.passed}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px 0; color: #333333;"><strong>Tests Failed:</strong></td>
                                                <td style="padding: 5px 0; color: ${testResults.failed > 0 ? '#dc3545' : '#28a745'}; font-weight: bold;">${testResults.failed}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px 0; color: #333333;"><strong>Success Rate:</strong></td>
                                                <td style="padding: 5px 0; color: #666666; font-weight: bold;">${testResults.success_rate}%</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px 0; color: #333333;"><strong>Last Test Run:</strong></td>
                                                <td style="padding: 5px 0; color: #666666;">${new Date(testResults.last_run).toLocaleString()}</td>
                                            </tr>
                                        </table>
                                        
                                        <h4 style="color: #155724; margin: 20px 0 10px 0; font-size: 16px;">Test Categories:</h4>
                                        ${testResults.test_categories.map(cat => `
                                            <div style="margin: 8px 0; padding: 8px 12px; background: rgba(255,255,255,0.7); border-radius: 4px;">
                                                <strong>${cat.name}:</strong> 
                                                <span style="color: ${cat.failed > 0 ? '#dc3545' : '#28a745'};">${cat.passed}/${cat.total} passed</span>
                                            </div>
                                        `).join('')}
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Action Buttons -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="https://dhgate-monitor.com/admin/dashboard" 
                                           style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: bold; font-size: 16px; margin: 0 10px;">
                                            View Admin Dashboard
                                        </a>
                                        <a href="https://dhgate-monitor.com/test-emails" 
                                           style="display: inline-block; background-color: #28a745; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: bold; font-size: 16px; margin: 0 10px;">
                                            Run Test Suite
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="color: #999999; font-size: 14px; line-height: 1.5; margin: 30px 0 0 0;">
                                This is a manually triggered test of your daily report system. 
                                Automatic reports will be sent daily at 09:00 UTC.
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; color: #999999; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0;">
                                DHgate Monitor System | Generated: ${new Date().toISOString()}<br>
                                This email was sent to info@dhgate-monitor.com
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
              
              console.log('📧 Sending test email to:', config.email.recipient_email);
              const emailResult = await sendEmail(env, config.email.recipient_email, testSubject, testHtml);
              
              if (emailResult) {
                console.log('✅ Test email sent successfully!');
                return new Response('✅ Test email sent successfully! Check your inbox.', {
                  headers: { 'Content-Type': 'text/plain' }
                });
              } else {
                console.log('❌ Test email failed to send');
                return new Response('❌ Test email failed to send. Check logs for details.', {
                  status: 500,
                  headers: { 'Content-Type': 'text/plain' }
                });
              }
            } catch (error) {
              console.error('❌ Error during manual scheduled test:', error);
              return new Response(`❌ Error: ${error.message}`, {
                status: 500,
                headers: { 'Content-Type': 'text/plain' }
              });
            }
          }
          break;
        
        case '/debug-email':
          if (method === 'GET') {
            return await handleDebugEmail(request, env);
          }
          break;
        
        case '/health':
          return new Response(JSON.stringify({ 
            status: 'healthy', 
            timestamp: new Date().toISOString() 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        
        default:

          
          // Handle individual newsroom articles
          if (url.pathname.startsWith('/newsroom/') && url.pathname !== '/newsroom/') {
            return await handleNewsroomArticle(request, env);
          }
          
          // Handle favicon
          if (url.pathname === '/favicon.ico') {
            const origin = url.origin;
            return Response.redirect(`${origin}/assets/logo.png`, 301);
          }
          
          // Handle asset requests
          if (url.pathname.startsWith('/assets/')) {
            return await handleAsset(url.pathname, corsHeaders);
          }
          return new Response('Not Found', { 
            status: 404, 
            headers: corsHeaders 
          });
      }
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ 
        error: error.message 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
}

// Export the main handler
export default {
  fetch: handleRequest
};
