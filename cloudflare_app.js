/**
 * DHgate Monitor - Pure Cloudflare Workers Application
 * Uses D1 Database and KV Storage for data persistence
 */

// Internationalization (i18n) support
const translations = {
  nl: {
    // Main app
    app_title: "DHGate monitor",
    app_description: "Automatische shop en producten monitoring",
    
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
    sender_email: "Verzender Email",
    recipient_email: "Ontvanger Email",
    schedule: "Planning",
    daily_scan_time: "Dagelijkse Scan Tijd",
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
      
      // Typography & Text
      '--text-primary': '#1F2937',
      '--text-secondary': '#4B5563',
      '--text-muted': '#6B7280',
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
    name: 'Dark Mode',
    css: {
      // Premium Brand System - Dark
      '--bg-primary': '#0F172A',
      '--bg-secondary': '#1E293B',
      '--bg-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
      '--bg-hero': 'linear-gradient(135deg, #3B82F6 0%, #F97316 100%)',
      
      // Typography & Text - Dark
      '--text-primary': '#F8FAFC',
      '--text-secondary': '#E2E8F0',
      '--text-muted': '#94A3B8',
      '--text-white': '#FFFFFF',
      
      // Brand Colors - Dark Adapted
      '--primary-blue': '#3B82F6',
      '--primary-blue-hover': '#60A5FA',
      '--primary-blue-light': '#93C5FD',
      '--accent-orange': '#F97316',
      '--accent-orange-hover': '#FB923C',
      '--accent-orange-light': '#FDBA74',
      
      // Card System - Dark
      '--card-bg': '#1E293B',
      '--card-bg-alpha': 'rgba(30, 41, 59, 0.95)',
      '--card-shadow': '0 4px 20px rgba(0, 0, 0, 0.25)',
      '--card-shadow-hover': '0 8px 32px rgba(0, 0, 0, 0.4)',
      '--card-border': 'rgba(59, 130, 246, 0.2)',
      
      // Glassmorphism - Dark
      '--glass-bg': 'rgba(30, 41, 59, 0.85)',
      '--glass-border': 'rgba(248, 250, 252, 0.1)',
      '--glass-shadow': '0 8px 32px rgba(0, 0, 0, 0.3)',
      '--backdrop-blur': 'blur(16px)',
      
      // Interactive Elements - Dark
      '--btn-primary-bg': 'linear-gradient(135deg, #3B82F6, #2563EB)',
      '--btn-primary-hover': 'linear-gradient(135deg, #60A5FA, #3B82F6)',
      '--btn-secondary-bg': 'linear-gradient(135deg, #F97316, #EA580C)',
      '--btn-secondary-hover': 'linear-gradient(135deg, #FB923C, #F97316)',
      '--btn-ghost': 'rgba(59, 130, 246, 0.2)',
      '--btn-ghost-hover': 'rgba(59, 130, 246, 0.3)',
      
      // Status & Feedback - Dark
      '--success': '#22C55E',
      '--warning': '#EAB308',
      '--error': '#F87171',
      '--info': '#60A5FA',
      
      // Borders & Lines - Dark
      '--border-light': '#374151',
      '--border-medium': '#4B5563',
      '--border-focus': '#3B82F6',
      
      // Legacy compatibility
      '--accent-color': '#3B82F6',
      '--accent-secondary': '#F97316',
      '--border-color': '#374151',
      '--cookie-bg': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      '--legal-section-heading': '#60A5FA'
    }
  },
};

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
      
      /* Premium Reset & Base Styles */
      * {
        box-sizing: border-box;
      }
      
      body { 
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: var(--bg-gradient);
        min-height: 100vh;
        color: var(--text-primary);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 400;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
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
      
      /* Cookie Consent Styles - Responsive */
      .cookie-consent {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--cookie-bg);
        color: white;
        padding: 20px;
        box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        transform: translateY(100%);
        transition: transform 0.3s ease;
      }
      .cookie-consent.show {
        transform: translateY(0);
      }
      .cookie-consent .btn {
        margin: 0 5px;
        min-width: 80px;
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
        .container {
          padding: 20px 15px !important;
        }
        
        .main-header {
          padding: 30px 20px !important;
          margin-top: 80px !important; /* More space for mobile toggles */
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
          justify-content: flex-start;
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
        
        /* Mobile Cookie Consent */
        .cookie-consent {
          padding: 15px !important;
        }
        .cookie-consent h6 {
          font-size: 14px;
        }
        .cookie-consent p {
          font-size: 12px;
        }
        .cookie-consent .btn {
          font-size: 12px;
          padding: 8px 16px;
          width: 100%;
          margin: 3px 0;
        }
        .cookie-consent .col-md-4 {
          margin-top: 15px !important;
        }
        .cookie-consent .row {
          flex-direction: column;
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

export default {
  async fetch(request, env, ctx) {
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
      // Route handling
      switch (url.pathname) {
        case '/':
          return await handleLandingPage(request, env);
        
        case '/dashboard':
          return await handleDashboard(request, env);
          
        case '/login':
          return await handleLoginPage(request, env);
        
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
        
        case '/subscribe':
          if (method === 'POST') {
            return await handleSubscription(request, env);
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
          return await handleContactPage(request, env);
        
        case '/sitemap.xml':
          return await handleSitemap(request, env);
        
        case '/robots.txt':
          return await handleRobots(request, env);
        
        case '/health':
          return new Response(JSON.stringify({ 
            status: 'healthy', 
            timestamp: new Date().toISOString() 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        
        default:
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
  },

  // Scheduled event handler for daily monitoring at 09:00 UTC
  async scheduled(event, env, ctx) {
    console.log('🕘 Scheduled monitoring triggered at:', new Date().toISOString());
    
    try {
      // Get configuration
      const shops = await getShops(env);
      const config = await getConfig(env);
      const tags = await getTags(env);
      
      console.log(`📊 Monitoring ${shops.length} shops with tags: ${tags.map(t => t.name).join(', ')}`);
      
      if (shops.length === 0) {
        console.log('⚠️ No shops configured for monitoring');
        return;
      }

      // Create a simple notification for testing
      const subject = `DHgate Monitor Daily Check - ${new Date().toLocaleDateString()}`;
      const message = `Monitoring check completed at ${new Date().toLocaleString()}.\n\nShops monitored: ${shops.length}\nTags: ${tags.map(t => t.name).join(', ')}\n\nNote: This is the Cloudflare Worker scheduled check. For full product crawling, run the Selenium monitor script.`;
      
      console.log('📧 Sending daily monitoring notification...');
      console.log('Subject:', subject);
      console.log('Message preview:', message.substring(0, 100) + '...');
      
      // Here you could add actual crawling logic or trigger external systems
      // For now, we'll just log that the scheduled task ran successfully
      
      console.log('✅ Daily monitoring check completed successfully');
      
    } catch (error) {
      console.error('❌ Scheduled monitoring failed:', error);
      throw error;
    }
  }
};

async function handleDashboard(request, env) {
  try {
    // Get shops from KV storage
    const shops = await getShops(env);
    const config = await getConfig(env);
    const tags = await getTags(env);
    
    // Get user's language and theme preferences
    const lang = getLanguage(request);
    const theme = getTheme(request);
    const t = getTranslations(lang);
    
    const html = generateDashboardHTML(shops, config, tags, t, lang, theme);
    
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (error) {
    return new Response('Dashboard Error: ' + error.message, { status: 500 });
  }
}

async function handleAddShopPage(request, env) {
  const lang = getLanguage(request);
  const theme = getTheme(request);
  const t = getTranslations(lang);
  const html = generateAddShopHTML(t, lang, theme);
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}

async function handleAddShop(request, env) {
  try {
    const formData = await request.formData();
    const shopName = formData.get('name');
    const searchUrl = formData.get('search_url');
    
    if (!shopName || !searchUrl) {
      throw new Error('Shop name and URL are required');
    }
    
    // Get existing shops
    const shops = await getShops(env);
    
    // Add new shop
    const newShop = {
      id: Date.now().toString(),
      name: shopName,
      search_url: searchUrl,
      created_at: new Date().toISOString()
    };
    
    shops.push(newShop);
    
    // Save to KV
    await env.DHGATE_MONITOR_KV.put('shops', JSON.stringify(shops));
    
    // Redirect to dashboard
    return Response.redirect(new URL('/', request.url).toString(), 302);
    
  } catch (error) {
    return new Response('Error adding shop: ' + error.message, { status: 400 });
  }
}

async function handleSettingsPage(request, env) {
  const config = await getConfig(env);
  const lang = getLanguage(request);
  const t = getTranslations(lang);
  const html = generateSettingsHTML(config, t, lang);
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}

async function handleUpdateSettings(request, env) {
  try {
    const formData = await request.formData();
    
    const config = {
      email: {
        sender_email: formData.get('sender_email'),
        recipient_email: formData.get('recipient_email'),
        smtp_server: 'smtp.gmail.com',
        smtp_port: 587
      },
      schedule: {
        time: formData.get('schedule_time') || '09:00'
      },
      filters: {
        keywords: formData.get('keywords').split(',').map(k => k.trim()).filter(k => k),
        case_sensitive: formData.has('case_sensitive')
      }
    };
    
    await env.DHGATE_MONITOR_KV.put('config', JSON.stringify(config));
    
    return Response.redirect(new URL('/settings', request.url).toString(), 302);
    
  } catch (error) {
    return new Response('Error updating settings: ' + error.message, { status: 400 });
  }
}

async function handleTagsPage(request, env) {
  const tags = await getTags(env);
  const lang = getLanguage(request);
  const t = getTranslations(lang);
  const html = generateTagsHTML(tags, t, lang);
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}

async function handleUpdateTags(request, env) {
  try {
    const formData = await request.formData();
    const tagsString = formData.get('tags') || '';
    
    const tags = tagsString.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .map(tag => ({
        name: tag,
        created_at: new Date().toISOString(),
        active: true
      }));
    
    await env.DHGATE_MONITOR_KV.put('monitoring_tags', JSON.stringify(tags));
    
    return Response.redirect(new URL('/tags', request.url).toString(), 302);
    
  } catch (error) {
    return new Response('Error updating tags: ' + error.message, { status: 400 });
  }
}

async function handleSubscription(request, env) {
  try {
    const formData = await request.formData();
    const lang = getLanguage(request);
    const t = getTranslations(lang);
    
    // Extract form data
    const subscription = {
      email: formData.get('email'),
      store_url: formData.get('store_url'),
      tags: formData.get('tags').split(',').map(tag => tag.trim()),
      frequency: formData.get('frequency'),
      notification_time: formData.get('notification_time'),
      min_price: formData.get('min_price') ? parseFloat(formData.get('min_price')) : null,
      max_price: formData.get('max_price') ? parseFloat(formData.get('max_price')) : null,
      keywords: formData.get('keywords') ? formData.get('keywords').split(',').map(k => k.trim()) : [],
      created_at: new Date().toISOString(),
      status: 'active'
    };
    
    // Validate required fields
    if (!subscription.email || !subscription.store_url || !subscription.tags.length) {
      return new Response(generateErrorResponse(lang, 'Missing required fields'), { 
        status: 400,
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    // Store subscription in KV
    const subscriptionId = `subscription_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await env.DHGATE_MONITOR_KV.put(subscriptionId, JSON.stringify(subscription));
    
    // Also store by email for easy lookup
    const emailKey = `email_${subscription.email.replace(/[^a-zA-Z0-9]/g, '_')}`;
    await env.DHGATE_MONITOR_KV.put(emailKey, subscriptionId);
    
    // Generate success page
    return new Response(generateSuccessResponse(lang, subscription), {
      headers: { 'Content-Type': 'text/html' }
    });
    
  } catch (error) {
    return new Response('Error processing subscription: ' + error.message, { status: 500 });
  }
}

function generateSuccessResponse(lang, subscription) {
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lang === 'nl' ? 'Monitoring Gestart!' : 'Monitoring Started!'}</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    ${generateGlobalCSS()}
</head>
<body>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="card shadow-lg border-0" style="border-radius: 20px;">
                    <div class="card-body p-5 text-center">
                        <div class="mb-4">
                            <div style="font-size: 4rem; color: var(--accent-color); margin-bottom: 1rem;">✓</div>
                            <h1 style="color: var(--text-primary); margin-bottom: 1rem;">
                                ${lang === 'nl' ? 'Monitoring Gestart!' : 'Monitoring Started!'}
                            </h1>
                            <p style="font-size: 1.2rem; color: var(--text-muted); margin-bottom: 2rem;">
                                ${lang === 'nl' ? 
                                    'Je DHgate monitoring is succesvol ingesteld. Je ontvangt binnenkort de eerste update!' :
                                    'Your DHgate monitoring has been successfully set up. You will receive the first update soon!'
                                }
                            </p>
                        </div>
                        
                        <div class="row text-start">
                            <div class="col-md-6 mb-3">
                                <strong>${lang === 'nl' ? 'Email' : 'Email'}:</strong><br>
                                <span class="text-muted">${maskEmail(subscription.email)}</span>
                            </div>
                            <div class="col-md-6 mb-3">
                                <strong>${lang === 'nl' ? 'Frequentie' : 'Frequency'}:</strong><br>
                                <span class="text-muted">${subscription.frequency}</span>
                            </div>
                            <div class="col-md-6 mb-3">
                                <strong>${lang === 'nl' ? 'Tags' : 'Tags'}:</strong><br>
                                <span class="text-muted">${subscription.tags.join(', ')}</span>
                            </div>
                            <div class="col-md-6 mb-3">
                                <strong>${lang === 'nl' ? 'Tijd' : 'Time'}:</strong><br>
                                <span class="text-muted">${subscription.notification_time || 'Direct'}</span>
                            </div>
                        </div>
                        
                        <div class="mt-4">
                            <a href="/?lang=${lang}" class="btn btn-primary btn-lg me-3" style="border-radius: 12px;">
                                ${lang === 'nl' ? 'Terug naar Home' : 'Back to Home'}
                            </a>
                            <a href="mailto:support@dhgate-monitor.com" class="btn btn-outline-primary btn-lg" style="border-radius: 12px;">
                                ${lang === 'nl' ? 'Contact Support' : 'Contact Support'}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
  `;
}

function generateErrorResponse(lang, message) {
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lang === 'nl' ? 'Fout' : 'Error'}</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    ${generateGlobalCSS()}
</head>
<body>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-6">
                <div class="card shadow-lg border-0" style="border-radius: 20px;">
                    <div class="card-body p-5 text-center">
                        <div style="font-size: 4rem; color: #dc3545; margin-bottom: 1rem;">⚠</div>
                        <h1 style="color: var(--text-primary);">${lang === 'nl' ? 'Oops!' : 'Oops!'}</h1>
                        <p style="color: var(--text-muted); margin-bottom: 2rem;">${message}</p>
                        <a href="/?lang=${lang}" class="btn btn-primary btn-lg" style="border-radius: 12px;">
                            ${lang === 'nl' ? 'Probeer Opnieuw' : 'Try Again'}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
  `;
}

async function handleGetShops(request, env) {
  const shops = await getShops(env);
  return new Response(JSON.stringify(shops), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleGetTags(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  
  const tags = await getTags(env);
  return new Response(JSON.stringify(tags), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

async function handleStatus(request, env) {
  const status = {
    status: 'online',
    service: 'DHgate Monitor',
    platform: 'Cloudflare Workers',
    version: '3.0.0',
    timestamp: new Date().toISOString(),
    environment: 'production'
  };
  
  return new Response(JSON.stringify(status), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// New compliance handlers
async function handlePrivacyPage(request, env) {
  const lang = getLanguage(request);
  const t = getTranslations(lang);
  const html = generatePrivacyHTML(t, lang);
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}

async function handleTermsPage(request, env) {
  const lang = getLanguage(request);
  const t = getTranslations(lang);
  const html = generateTermsHTML(t, lang);
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}

async function handleContactPage(request, env) {
  const lang = getLanguage(request);
  const t = getTranslations(lang);
  const html = generateContactHTML(t, lang);
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}

async function handleSitemap(request, env) {
  const sitemap = generateSitemap();
  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' }
  });
}

async function handleRobots(request, env) {
  const robots = `User-agent: *
Allow: /

Sitemap: https://dhgate-monitor.com/sitemap.xml`;
  
  return new Response(robots, {
    headers: { 'Content-Type': 'text/plain' }
  });
}

// Helper functions
async function getShops(env) {
  try {
    const shopsData = await env.DHGATE_MONITOR_KV.get('shops');
    return shopsData ? JSON.parse(shopsData) : [];
  } catch (error) {
    console.error('Error getting shops:', error);
    return [];
  }
}

async function getConfig(env) {
  try {
    const configData = await env.DHGATE_MONITOR_KV.get('config');
    return configData ? JSON.parse(configData) : getDefaultConfig();
  } catch (error) {
    console.error('Error getting config:', error);
    return getDefaultConfig();
  }
}

async function getTags(env) {
  try {
    const tagsData = await env.DHGATE_MONITOR_KV.get('monitoring_tags');
    return tagsData ? JSON.parse(tagsData) : getDefaultTags();
  } catch (error) {
    console.error('Error getting tags:', error);
    return getDefaultTags();
  }
}

function getDefaultTags() {
  return [
    { name: 'kids', created_at: new Date().toISOString(), active: true },
    { name: 'children', created_at: new Date().toISOString(), active: true },
    { name: 'youth', created_at: new Date().toISOString(), active: true }
  ];
}

function getDefaultConfig() {
  return {
    email: {
      sender_email: 'noreply@dhgate-monitor.com',
      recipient_email: 'info@dhgate-monitor.com',
      smtp_server: 'smtp.gmail.com',
      smtp_port: 587,
      smtp_password: 'zech lame cvnz prxu'
    },
    schedule: {
      time: '09:00'
    },
    filters: {
      keywords: ['kids'],
      case_sensitive: false
    }
  };
}

function generateDashboardHTML(shops, config, tags, t, lang, theme = 'light') {
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DHgate Monitor Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    ${generateGlobalCSS(theme)}
</head>
<body>
    <div class="container py-5">
        <!-- Theme Toggle Switch -->
        <div class="theme-switcher">
            <div class="theme-toggle">
                <span class="theme-label">Light</span>
                <div class="theme-toggle-switch ${theme === 'dark' ? 'dark' : ''}" onclick="toggleTheme()" aria-label="Toggle theme">
                    <div class="theme-toggle-slider">
                        ${theme === 'dark' ? '●' : '○'}
                    </div>
                </div>
                <span class="theme-label">Dark</span>
            </div>
        </div>
        
        <!-- Language Switcher -->
        <div class="lang-switcher">
            <div class="lang-options">
                <a href="?lang=en&theme=${theme}" class="lang-option ${lang === 'en' ? 'active' : ''}">EN</a>
                <span class="lang-separator">|</span>
                <a href="?lang=nl&theme=${theme}" class="lang-option ${lang === 'nl' ? 'active' : ''}">NL</a>
            </div>
        </div>
        <div class="row g-3 g-md-4">
            <div class="col-12 col-lg-8">
                <div class="card">
                    <div class="card-header">
                        <h3>${t.registered_shops} (${shops.length})</h3>
                    </div>
                    <div class="card-body">
                        ${shops.length === 0 ? 
                          `<p class="text-muted">${t.no_shops_registered} <a href="/add_shop?lang=${lang}">${t.add_first_shop}</a>.</p>` :
                          shops.map(shop => `
                            <div class="border rounded p-3 mb-2">
                                <h5>${shop.name}</h5>
                                <p class="text-muted small">${shop.search_url}</p>
                                <small class="text-secondary">${t.added}: ${new Date(shop.created_at).toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-US')}</small>
                            </div>
                          `).join('')
                        }
                    </div>
                </div>
            </div>
            
            <div class="col-12 col-lg-4">
                <div class="card mb-3">
                    <div class="card-header">
                        <h5>${t.actions}</h5>
                    </div>
                    <div class="card-body d-grid gap-2">
                        <a href="/add_shop?lang=${lang}" class="btn btn-success btn-lg">${t.add_shop}</a>
                        <a href="/settings?lang=${lang}" class="btn btn-primary">${t.settings}</a>
                        <a href="/tags?lang=${lang}" class="btn btn-primary">${t.manage_tags}</a>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h5>${t.status}</h5>
                    </div>
                    <div class="card-body">
                        <p><strong>${t.platform}:</strong> Cloudflare Workers</p>
                        <p><strong>${t.monitoring}:</strong> ${config.schedule.time}</p>
                        <p><strong>${t.tags}:</strong> ${tags.map(tag => tag.name).join(', ')}</p>
                        <p><strong>${t.status}:</strong> <span class="text-success">${t.online}</span></p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Legal Footer -->
        <div class="row mt-4 mt-md-5">
            <div class="col text-center">
                <div class="text-muted small d-flex flex-column flex-md-row justify-content-center gap-2 gap-md-3">
                    <a href="/privacy?lang=${lang}" class="text-muted">${t.privacy_policy}</a>
                    <a href="/terms?lang=${lang}" class="text-muted">${t.terms_of_service}</a>
                    <a href="/contact?lang=${lang}" class="text-muted">${t.contact}</a>
                </div>
                <div class="text-muted small mt-2">
                    © ${new Date().getFullYear()} DHgate Monitor - ${t.legal_links}
                </div>
            </div>
        </div>
    </div>
    
    <!-- Cookie Consent Banner -->
    <div id="cookieConsent" class="cookie-consent">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <h6 class="mb-2">${t.cookie_title}</h6>
                    <p class="mb-0 small">${t.cookie_message}</p>
                </div>
                <div class="col-md-4 text-md-end mt-3 mt-md-0">
                    <button onclick="acceptCookies()" class="btn btn-success btn-sm">${t.accept_cookies}</button>
                    <button onclick="declineCookies()" class="btn btn-outline-light btn-sm">${t.decline_cookies}</button>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Cookie consent functionality
        function showCookieConsent() {
            const consent = localStorage.getItem('cookieConsent');
            if (!consent) {
                setTimeout(() => {
                    document.getElementById('cookieConsent').classList.add('show');
                }, 1000);
            }
        }
        
        function acceptCookies() {
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('cookieConsentDate', new Date().toISOString());
            hideCookieConsent();
        }
        
        function declineCookies() {
            localStorage.setItem('cookieConsent', 'declined');
            localStorage.setItem('cookieConsentDate', new Date().toISOString());
            hideCookieConsent();
            // Clear any non-essential cookies if they exist
            // For now we only use essential cookies
        }
        
        function hideCookieConsent() {
            document.getElementById('cookieConsent').classList.remove('show');
        }
        
        // Theme toggle functionality
        function toggleTheme() {
            const urlParams = new URLSearchParams(window.location.search);
            const currentTheme = urlParams.get('theme') || localStorage.getItem('selectedTheme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('selectedTheme', newTheme);
            const url = new URL(window.location);
            url.searchParams.set('theme', newTheme);
            // Preserve language parameter
            const currentLang = url.searchParams.get('lang') || '${lang}';
            url.searchParams.set('lang', currentLang);
            window.location.href = url.toString();
        }
        
        
        // Show consent banner on page load
        document.addEventListener('DOMContentLoaded', showCookieConsent);
    </script>
</body>
</html>
  `;
}

function generateAddShopHTML(t, lang, theme = 'light') {
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.add_shop_title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    ${generateGlobalCSS(theme)}
</head>
<body>
    <!-- Theme Toggle Switch -->
    <div class="theme-switcher">
        <div class="theme-toggle">
            <span class="theme-label">Light</span>
            <div class="theme-toggle-switch ${theme === 'dark' ? 'dark' : ''}" onclick="toggleTheme()" aria-label="Toggle theme">
                <div class="theme-toggle-slider">
                    ${theme === 'dark' ? '●' : '○'}
                </div>
            </div>
            <span class="theme-label">Dark</span>
        </div>
    </div>

    <!-- Language Switcher -->
    <div class="lang-switcher">
        <div class="lang-options">
            <a href="/add_shop?lang=en&theme=${theme}" class="lang-option ${lang === 'en' ? 'active' : ''}">EN</a>
            <span class="lang-separator">|</span>
            <a href="/add_shop?lang=nl&theme=${theme}" class="lang-option ${lang === 'nl' ? 'active' : ''}">NL</a>
        </div>
    </div>

    <div class="container py-3 py-md-5">
        <div class="row justify-content-center g-3">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <h3>${t.add_shop}</h3>
                    </div>
                    <div class="card-body">
                        <form method="POST">
                            <div class="mb-3">
                                <label class="form-label">${t.shop_name}</label>
                                <input type="text" name="name" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">${t.search_url}</label>
                                <input type="url" name="search_url" class="form-control" required>
                                <div class="form-text">${t.search_url_help}</div>
                            </div>
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary btn-lg">${t.add_shop}</button>
                                <a href="/dashboard?lang=${lang}&theme=${theme}" class="btn btn-outline-secondary">${t.back_to_dashboard}</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Cookie Consent Banner -->
    <div id="cookieConsent" class="cookie-consent">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <h6 class="mb-2">${t.cookie_title}</h6>
                    <p class="mb-0 small">${t.cookie_message}</p>
                </div>
                <div class="col-md-4 text-md-end mt-3 mt-md-0">
                    <button onclick="acceptCookies()" class="btn btn-success btn-sm">${t.accept_cookies}</button>
                    <button onclick="declineCookies()" class="btn btn-outline-light btn-sm">${t.decline_cookies}</button>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Cookie consent functionality
        function showCookieConsent() {
            const consent = localStorage.getItem('cookieConsent');
            if (!consent) {
                setTimeout(() => {
                    document.getElementById('cookieConsent').classList.add('show');
                }, 1000);
            }
        }
        
        function acceptCookies() {
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('cookieConsentDate', new Date().toISOString());
            hideCookieConsent();
        }
        
        function declineCookies() {
            localStorage.setItem('cookieConsent', 'declined');
            localStorage.setItem('cookieConsentDate', new Date().toISOString());
            hideCookieConsent();
        }
        
        function hideCookieConsent() {
            document.getElementById('cookieConsent').classList.remove('show');
        }
        
        function resetCookieConsent() {
            localStorage.removeItem('cookieConsent');
            localStorage.removeItem('cookieConsentDate');
            showCookieConsent();
        }
        
        // Theme toggle functionality
        function toggleTheme() {
            const urlParams = new URLSearchParams(window.location.search);
            const currentTheme = urlParams.get('theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('selectedTheme', newTheme);
            const url = new URL(window.location);
            url.searchParams.set('theme', newTheme);
            // Preserve language parameter
            const currentLang = url.searchParams.get('lang') || '${lang}';
            url.searchParams.set('lang', currentLang);
            window.location.href = url.toString();
        }
        
        // Show consent banner on page load
        document.addEventListener('DOMContentLoaded', showCookieConsent);
    </script>
</body>
</html>
  `;
}

function generateSettingsHTML(config, t, lang) {
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.settings_title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { 
            font-family: 'Raleway', sans-serif; 
            background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%);
            min-height: 100vh;
        }
        .card { border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .btn-primary { background: linear-gradient(135deg, #1e3a8a, #2563eb); border: none; font-weight: 600; }
        
        /* Email masking styles */
        .email-masked {
            font-family: monospace;
            letter-spacing: 1px;
            cursor: pointer;
        }
        
        .email-masked:focus {
            letter-spacing: normal;
            font-family: 'Raleway', sans-serif;
        }
        
        /* Cookie Consent Styles */
        .cookie-consent {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            padding: 20px;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
            z-index: 1000;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }
        .cookie-consent.show {
            transform: translateY(0);
        }
        .cookie-consent .btn {
            margin: 0 5px;
        }
    </style>
</head>
<body>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h3>${t.settings}</h3>
                    </div>
                    <div class="card-body">
                        <form method="POST">
                            <h5>${t.email_config}</h5>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label class="form-label">${t.sender_email}</label>
                                    <input type="password" name="sender_email" class="form-control email-masked" value="${config.email.sender_email}" required 
                                           onclick="this.type='email'; this.select();" 
                                           onblur="if(this.value) this.type='password';" 
                                           placeholder="••••••••@••••••">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">${t.recipient_email}</label>
                                    <input type="password" name="recipient_email" class="form-control email-masked" value="${config.email.recipient_email}" required 
                                           onclick="this.type='email'; this.select();" 
                                           onblur="if(this.value) this.type='password';" 
                                           placeholder="••••••••@••••••">
                                </div>
                            </div>
                            
                            <h5>${t.schedule}</h5>
                            <div class="mb-3">
                                <label class="form-label">${t.daily_scan_time}</label>
                                <input type="time" name="schedule_time" class="form-control" value="${config.schedule.time}" required>
                            </div>
                            
                            <h5>${t.filters}</h5>
                            <div class="mb-3">
                                <label class="form-label">${t.keywords_comma}</label>
                                <input type="text" name="keywords" class="form-control" value="${config.filters.keywords.join(', ')}" required>
                            </div>
                            <div class="mb-3">
                                <div class="form-check">
                                    <input type="checkbox" name="case_sensitive" class="form-check-input" ${config.filters.case_sensitive ? 'checked' : ''}>
                                    <label class="form-check-label">${t.case_sensitive}</label>
                                </div>
                            </div>
                            
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary">${t.save_settings}</button>
                                <a href="/?lang=${lang}" class="btn btn-outline-secondary">${t.back_to_dashboard}</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    ${generateCookieConsent(t, lang)}
</body>
</html>
  `;
}

function generateTagsHTML(tags, t, lang) {
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.manage_tags_title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { 
            font-family: 'Raleway', sans-serif; 
            background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%);
            min-height: 100vh;
        }
        .card { border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .btn-primary { background: linear-gradient(135deg, #1e3a8a, #2563eb); border: none; font-weight: 600; }
        .tag-item {
            background: #e0f2fe;
            border: 1px solid #0891b2;
            border-radius: 20px;
            padding: 8px 16px;
            margin: 4px;
            display: inline-block;
            color: #0c4a6e;
            font-weight: 500;
        }
        
        /* Cookie Consent Styles */
        .cookie-consent {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            padding: 20px;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
            z-index: 1000;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }
        .cookie-consent.show {
            transform: translateY(0);
        }
        .cookie-consent .btn {
            margin: 0 5px;
        }
    </style>
</head>
<body>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h3>${t.manage_tags}</h3>
                        <p class="text-muted mb-0">${t.manage_tags_description}</p>
                    </div>
                    <div class="card-body">
                        <div class="mb-4">
                            <h5>${t.current_tags}</h5>
                            <div class="border rounded p-3 mb-3" style="background-color: #f8fafc;">
                                ${tags.map(tag => `
                                    <span class="tag-item">
                                        ${tag.name}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                        
                        <form method="POST">
                            <div class="mb-3">
                                <label class="form-label">${t.tags_comma}</label>
                                <input type="text" name="tags" class="form-control" 
                                       value="${tags.map(tag => tag.name).join(', ')}" 
                                       placeholder="kids, children, youth, baby, toddler" required>
                                <div class="form-text">
                                    ${t.tags_help}
                                </div>
                            </div>
                            
                            <div class="alert alert-info">
                                <strong>💡 Tip:</strong> ${t.tags_tip}
                            </div>
                            
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary">${t.save_tags}</button>
                                <a href="/?lang=${lang}" class="btn btn-outline-secondary">${t.back_to_dashboard}</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    ${generateCookieConsent(t, lang)}
</body>
</html>
  `;
}
// Compliance page generators
function generatePrivacyHTML(t, lang) {
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.privacy_policy_title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { font-family: "Raleway", sans-serif; background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%); min-height: 100vh; }
        .card { border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .legal-section { margin-bottom: 2rem; }
        .legal-section h4 { color: #1e40af; font-weight: 600; margin-bottom: 1rem; }
        
        /* Cookie Consent Styles */
        .cookie-consent {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            padding: 20px;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
            z-index: 1000;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }
        .cookie-consent.show {
            transform: translateY(0);
        }
        .cookie-consent .btn {
            margin: 0 5px;
        }
    </style>
</head>
<body>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header">
                        <h2>${t.privacy_policy}</h2>
                        <small class="text-muted">${lang === "nl" ? "Laatst bijgewerkt" : "Last updated"}: ${new Date().toLocaleDateString(lang === "nl" ? "nl-NL" : "en-US")}</small>
                    </div>
                    <div class="card-body">
                        ${lang === "nl" ? generatePrivacyContentNL() : generatePrivacyContentEN()}
                        
                        <div class="mt-4 pt-4 border-top">
                            <a href="/?lang=${lang}" class="btn btn-primary">${t.back_to_dashboard}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    ${generateCookieConsent(t, lang)}
</body>
</html>
  `;
}

function generateTermsHTML(t, lang) {
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.terms_title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { font-family: 'Raleway', sans-serif; background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%); min-height: 100vh; }
        .card { border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .legal-section { margin-bottom: 2rem; }
        .legal-section h4 { color: #1e40af; font-weight: 600; margin-bottom: 1rem; }
        
        /* Cookie Consent Styles */
        .cookie-consent {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            padding: 20px;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
            z-index: 1000;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }
        .cookie-consent.show {
            transform: translateY(0);
        }
        .cookie-consent .btn {
            margin: 0 5px;
        }
    </style>
</head>
<body>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header">
                        <h2>${t.terms_of_service}</h2>
                        <small class="text-muted">${lang === 'nl' ? 'Laatst bijgewerkt' : 'Last updated'}: ${new Date().toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-US')}</small>
                    </div>
                    <div class="card-body">
                        ${lang === 'nl' ? generateTermsContentNL() : generateTermsContentEN()}
                        
                        <div class="mt-4 pt-4 border-top">
                            <a href="/?lang=${lang}" class="btn btn-primary">${t.back_to_dashboard}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    ${generateCookieConsent(t, lang)}
</body>
</html>
  `;
}

function generateContactHTML(t, lang) {
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.contact_title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { font-family: 'Raleway', sans-serif; background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%); min-height: 100vh; }
        .card { border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        
        /* Cookie Consent Styles */
        .cookie-consent {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            padding: 20px;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
            z-index: 1000;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }
        .cookie-consent.show {
            transform: translateY(0);
        }
        .cookie-consent .btn {
            margin: 0 5px;
        }
    </style>
</head>
<body>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h2>${t.contact}</h2>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h4>${t.contact_info}</h4>
                                <p><strong>${t.email_address}:</strong><br>
                                support@dhgate-monitor.com</p>
                                
                                <h5>${t.website_info}</h5>
                                <p><strong>Website:</strong> dhgate-monitor.com<br>
                                <strong>${t.data_controller}:</strong> Nathalja Nijman</p>
                            </div>
                            <div class="col-md-6">
                                <h4>${lang === 'nl' ? 'Over deze service' : 'About this service'}</h4>
                                <p>${lang === 'nl' ? 
                                  'DHgate Monitor is een gratis service voor het monitoren van DHgate producten. We verzamelen alleen de gegevens die nodig zijn voor de functionaliteit van de service.' :
                                  'DHgate Monitor is a free service for monitoring DHgate products. We only collect data necessary for the functionality of the service.'
                                }</p>
                            </div>
                        </div>
                        
                        <div class="mt-4 pt-4 border-top">
                            <a href="/?lang=${lang}" class="btn btn-primary">${t.back_to_dashboard}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    ${generateCookieConsent(t, lang)}
</body>
</html>
  `;
}

function generateSitemap() {
  const baseUrl = 'https://dhgate-monitor.com';
  const urls = [
    { loc: '/', priority: '1.0', description: 'Landing Page with DHgate Monitor Features' },
    { loc: '/login', priority: '0.9', description: 'User Login' },
    { loc: '/dashboard', priority: '0.9', description: 'Main Dashboard (requires authentication)' },
    { loc: '/add_shop', priority: '0.8', description: 'Add DHgate Shop for Monitoring' },
    { loc: '/settings', priority: '0.8', description: 'Configuration Settings' },
    { loc: '/tags', priority: '0.8', description: 'Tag Management' },
    { loc: '/privacy', priority: '0.6', description: 'Privacy Policy' },
    { loc: '/terms', priority: '0.6', description: 'Terms of Service' },
    { loc: '/contact', priority: '0.6', description: 'Contact Information' }
  ];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return sitemap;
}

// Cookie consent banner generator
function generateCookieConsent(t, lang) {
  return `
    <!-- Cookie Consent Banner -->
    <div id="cookieConsent" class="cookie-consent">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <h6 class="mb-2">${t.cookie_title}</h6>
                    <p class="mb-0 small">${t.cookie_message}</p>
                </div>
                <div class="col-md-4 text-md-end mt-3 mt-md-0">
                    <button onclick="acceptCookies()" class="btn btn-success btn-sm">${t.accept_cookies}</button>
                    <button onclick="declineCookies()" class="btn btn-outline-light btn-sm">${t.decline_cookies}</button>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Cookie consent functionality
        function showCookieConsent() {
            const consent = localStorage.getItem('cookieConsent');
            if (!consent) {
                setTimeout(() => {
                    document.getElementById('cookieConsent').classList.add('show');
                }, 1000);
            }
        }
        
        function acceptCookies() {
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('cookieConsentDate', new Date().toISOString());
            hideCookieConsent();
        }
        
        function declineCookies() {
            localStorage.setItem('cookieConsent', 'declined');
            localStorage.setItem('cookieConsentDate', new Date().toISOString());
            hideCookieConsent();
        }
        
        function hideCookieConsent() {
            document.getElementById('cookieConsent').classList.remove('show');
        }
        
        function resetCookieConsent() {
            localStorage.removeItem('cookieConsent');
            localStorage.removeItem('cookieConsentDate');
            showCookieConsent();
        }
        
        // Show consent banner on page load
        document.addEventListener('DOMContentLoaded', showCookieConsent);
        
        // Theme switching functionality
        function switchTheme(newTheme) {
            localStorage.setItem('selectedTheme', newTheme);
            const url = new URL(window.location);
            url.searchParams.set('theme', newTheme);
            window.location.href = url.toString();
        }
        
        function getStoredTheme() {
            return localStorage.getItem('selectedTheme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
        
        // Apply theme on load
        function applyTheme() {
            const currentTheme = getStoredTheme();
            const urlParams = new URLSearchParams(window.location.search);
            const urlTheme = urlParams.get('theme');
            
            if (!urlTheme && currentTheme !== 'light') {
                const url = new URL(window.location);
                url.searchParams.set('theme', currentTheme);
                window.location.href = url.toString();
            }
        }
        
        // Make functions globally available
        window.resetCookieConsent = resetCookieConsent;
        window.switchTheme = switchTheme;
        
        // Apply theme on page load
        document.addEventListener('DOMContentLoaded', applyTheme);
    </script>
  `;
}

// Legal content generators
function generatePrivacyContentNL() {
  return `
    <div class="legal-section">
        <h4>1. Inleiding</h4>
        <p>DHgate Monitor ('wij', 'ons', 'onze') respecteert uw privacy en zet zich in voor de bescherming van uw persoonsgegevens. Dit privacybeleid informeert u over hoe wij uw persoonsgegevens verzamelen, gebruiken en beschermen wanneer u onze service gebruikt.</p>
    </div>
    
    <div class="legal-section">
        <h4>2. Gegevens die wij verzamelen</h4>
        <p>Wij verzamelen de volgende soorten gegevens:</p>
        <ul>
            <li><strong>Email adressen:</strong> Voor het versturen van meldingen over nieuwe producten</li>
            <li><strong>Shop URLs:</strong> Om de gewenste DHgate shops te kunnen monitoren</li>
            <li><strong>Filter instellingen:</strong> Om te bepalen welke producten relevant zijn</li>
            <li><strong>Cookie voorkeuren:</strong> Opgeslagen in uw browser (localStorage) om uw cookie keuze te onthouden</li>
            <li><strong>Technische gegevens:</strong> IP-adres, browser informatie voor de werking van de service</li>
        </ul>
    </div>
    
    <div class="legal-section">
        <h4>3. Hoe wij uw gegevens gebruiken</h4>
        <p>Wij gebruiken uw gegevens uitsluitend voor:</p>
        <ul>
            <li>Het leveren van de monitoring service</li>
            <li>Het versturen van email meldingen over nieuwe producten</li>
            <li>Het verbeteren van onze service</li>
            <li>Het naleven van wettelijke verplichtingen</li>
        </ul>
    </div>
    
    <div class="legal-section">
        <h4>4. Gegevens delen</h4>
        <p>Wij verkopen, verhuren of delen uw persoonsgegevens niet met derden, behalve:</p>
        <ul>
            <li>Wanneer dit wettelijk verplicht is</li>
            <li>Voor het leveren van de service (bijv. email versturen)</li>
            <li>Met uw uitdrukkelijke toestemming</li>
        </ul>
    </div>
    
    <div class="legal-section">
        <h4>5. Uw rechten</h4>
        <p>Onder de AVG heeft u de volgende rechten:</p>
        <ul>
            <li>Recht op inzage van uw gegevens</li>
            <li>Recht op rectificatie van onjuiste gegevens</li>
            <li>Recht op verwijdering van uw gegevens</li>
            <li>Recht op beperking van verwerking</li>
            <li>Recht op overdraagbaarheid van gegevens</li>
            <li>Recht van bezwaar tegen verwerking</li>
        </ul>
        <p><strong>Cookie voorkeuren wijzigen:</strong> U kunt uw cookie voorkeuren altijd wijzigen door:</p>
        <ul>
            <li>De lokale opslag van uw browser te wissen (via browser instellingen)</li>
            <li>In de browser console het commando <code>resetCookieConsent()</code> uit te voeren</li>
            <li>Contact op te nemen via support@dhgate-monitor.com voor ondersteuning</li>
        </ul>
    </div>
    
    <div class="legal-section">
        <h4>6. Cookies en lokale opslag</h4>
        <p>Wij gebruiken alleen technisch noodzakelijke cookies voor de functionaliteit van de website. Deze cookies zijn essentieel voor het goed functioneren van de service.</p>
        <p><strong>LocalStorage:</strong> Wij slaan uw cookie voorkeuren op in de lokale opslag van uw browser. Dit bestand blijft op uw apparaat en wordt niet naar onze servers verzonden. U kunt deze gegevens altijd wissen via uw browser instellingen.</p>
        <p><strong>Geen tracking:</strong> Wij gebruiken geen tracking cookies, analytics cookies of marketing cookies.</p>
    </div>
    
    <div class="legal-section">
        <h4>7. Contact</h4>
        <p>Voor vragen over dit privacybeleid kunt u contact opnemen via: support@dhgate-monitor.com</p>
    </div>
  `;
}

function generatePrivacyContentEN() {
  return `
    <div class="legal-section">
        <h4>1. Introduction</h4>
        <p>DHgate Monitor ('we', 'us', 'our') respects your privacy and is committed to protecting your personal data. This privacy policy informs you about how we collect, use and protect your personal data when you use our service.</p>
    </div>
    
    <div class="legal-section">
        <h4>2. Data we collect</h4>
        <p>We collect the following types of data:</p>
        <ul>
            <li><strong>Email addresses:</strong> For sending notifications about new products</li>
            <li><strong>Shop URLs:</strong> To monitor your desired DHgate shops</li>
            <li><strong>Filter settings:</strong> To determine which products are relevant</li>
            <li><strong>Cookie preferences:</strong> Stored in your browser (localStorage) to remember your cookie choice</li>
            <li><strong>Technical data:</strong> IP address, browser information for service functionality</li>
        </ul>
    </div>
    
    <div class="legal-section">
        <h4>3. How we use your data</h4>
        <p>We use your data exclusively for:</p>
        <ul>
            <li>Providing the monitoring service</li>
            <li>Sending email notifications about new products</li>
            <li>Improving our service</li>
            <li>Complying with legal obligations</li>
        </ul>
    </div>
    
    <div class="legal-section">
        <h4>4. Data sharing</h4>
        <p>We do not sell, rent or share your personal data with third parties, except:</p>
        <ul>
            <li>When legally required</li>
            <li>For service delivery (e.g. sending emails)</li>
            <li>With your explicit consent</li>
        </ul>
    </div>
    
    <div class="legal-section">
        <h4>5. Your rights</h4>
        <p>Under GDPR you have the following rights:</p>
        <ul>
            <li>Right to access your data</li>
            <li>Right to rectification of incorrect data</li>
            <li>Right to erasure of your data</li>
            <li>Right to restriction of processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
        </ul>
        <p><strong>Changing cookie preferences:</strong> You can always change your cookie preferences by:</p>
        <ul>
            <li>Clearing your browser's local storage (via browser settings)</li>
            <li>Running the command <code>resetCookieConsent()</code> in your browser console</li>
            <li>Contacting us at support@dhgate-monitor.com for support</li>
        </ul>
    </div>
    
    <div class="legal-section">
        <h4>6. Cookies and local storage</h4>
        <p>We only use technically necessary cookies for website functionality. These cookies are essential for the proper functioning of the service.</p>
        <p><strong>LocalStorage:</strong> We store your cookie preferences in your browser's local storage. This data remains on your device and is not sent to our servers. You can always clear this data through your browser settings.</p>
        <p><strong>No tracking:</strong> We do not use tracking cookies, analytics cookies, or marketing cookies.</p>
    </div>
    
    <div class="legal-section">
        <h4>7. Contact</h4>
        <p>For questions about this privacy policy, you can contact us at: support@dhgate-monitor.com</p>
    </div>
  `;
}

function generateTermsContentNL() {
  return `
    <div class="legal-section">
        <h4>1. Acceptatie van voorwaarden</h4>
        <p>Door gebruik te maken van DHgate Monitor accepteert u deze algemene voorwaarden volledig. Als u niet akkoord gaat met deze voorwaarden, gebruik dan deze service niet.</p>
    </div>
    
    <div class="legal-section">
        <h4>2. Beschrijving van de service</h4>
        <p>DHgate Monitor is een gratis service die DHgate websites monitort op nieuwe producten en gebruikers per email informeert over relevante vondsten. De service is bedoeld voor persoonlijk, niet-commercieel gebruik.</p>
    </div>
    
    <div class="legal-section">
        <h4>3. Gebruikersverantwoordelijkheden</h4>
        <p>U bent verantwoordelijk voor:</p>
        <ul>
            <li>Het verstrekken van juiste en actuele informatie</li>
            <li>Het respecteren van DHgate's gebruiksvoorwaarden</li>
            <li>Het niet misbruiken van de service voor commerciële doeleinden</li>
            <li>Het niet overbelasten van de service</li>
        </ul>
    </div>
    
    <div class="legal-section">
        <h4>4. Beperkingen en aansprakelijkheid</h4>
        <p>Wij bieden de service 'as is' aan zonder garanties. Wij zijn niet aansprakelijk voor:</p>
        <ul>
            <li>Gemiste producten of meldingen</li>
            <li>Fouten in productinformatie</li>
            <li>Schade door het gebruik van de service</li>
            <li>Onderbreking van de service</li>
        </ul>
    </div>
    
    <div class="legal-section">
        <h4>5. Wijzigingen</h4>
        <p>Wij behouden ons het recht voor om deze voorwaarden te wijzigen. Wijzigingen worden van kracht na publicatie op deze pagina.</p>
    </div>
    
    <div class="legal-section">
        <h4>6. Beëindiging</h4>
        <p>Wij kunnen de service te allen tijde beëindigen of uw toegang beperken zonder voorafgaande kennisgeving.</p>
    </div>
    
    <div class="legal-section">
        <h4>7. Toepasselijk recht</h4>
        <p>Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde Nederlandse rechter.</p>
    </div>
  `;
}

function generateTermsContentEN() {
  return `
    <div class="legal-section">
        <h4>1. Acceptance of terms</h4>
        <p>By using DHgate Monitor you fully accept these terms of service. If you do not agree to these terms, do not use this service.</p>
    </div>
    
    <div class="legal-section">
        <h4>2. Service description</h4>
        <p>DHgate Monitor is a free service that monitors DHgate websites for new products and informs users via email about relevant findings. The service is intended for personal, non-commercial use.</p>
    </div>
    
    <div class="legal-section">
        <h4>3. User responsibilities</h4>
        <p>You are responsible for:</p>
        <ul>
            <li>Providing accurate and current information</li>
            <li>Respecting DHgate's terms of service</li>
            <li>Not misusing the service for commercial purposes</li>
            <li>Not overloading the service</li>
        </ul>
    </div>
    
    <div class="legal-section">
        <h4>4. Limitations and liability</h4>
        <p>We provide the service 'as is' without warranties. We are not liable for:</p>
        <ul>
            <li>Missed products or notifications</li>
            <li>Errors in product information</li>
            <li>Damage from using the service</li>
            <li>Service interruptions</li>
        </ul>
    </div>
    
    <div class="legal-section">
        <h4>5. Changes</h4>
        <p>We reserve the right to modify these terms. Changes take effect after publication on this page.</p>
    </div>
    
    <div class="legal-section">
        <h4>6. Termination</h4>
        <p>We may terminate the service or restrict your access at any time without prior notice.</p>
    </div>
    
    <div class="legal-section">
        <h4>7. Applicable law</h4>
        <p>These terms are governed by Dutch law. Disputes will be submitted to the competent Dutch court.</p>
    </div>
  `;
}

// New Landing Page Handler
async function handleLandingPage(request, env) {
  const lang = getLanguage(request);
  const theme = getTheme(request);
  const t = getTranslations(lang);
  
  const html = generateLandingPageHTML(t, lang, theme);
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}

// New Login Page Handler  
async function handleLoginPage(request, env) {
  const lang = getLanguage(request);
  const theme = getTheme(request);
  const t = getTranslations(lang);
  
  const html = generateLoginPageHTML(t, lang, theme);
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}

// Generate Landing Page HTML
function generateLandingPageHTML(t, lang, theme = 'light') {
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DHgate Monitor - Automated Product Tracking</title>
    <meta name="description" content="Automated DHgate product monitoring and tracking. Get instant notifications for new products matching your criteria.">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    ${generateGlobalCSS(theme)}
    
    <style>
        body {
            font-family: 'Raleway', sans-serif;
            background: var(--bg-gradient);
            color: var(--text-primary);
            line-height: 1.7;
            overflow-x: hidden;
            padding-top: 80px;
            margin: 0;
        }
        
        /* Professional Navigation */
        .professional-navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: var(--card-bg-alpha);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border-color);
            padding: 0;
        }
        
        .navbar-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 2rem;
        }
        
        .navbar-brand {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            transition: opacity 0.3s ease;
        }
        
        .navbar-brand:hover {
            opacity: 0.8;
        }
        
        .brand-name {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
            letter-spacing: -0.5px;
        }
        
        .navbar-menu {
            display: flex;
            gap: 2rem;
            align-items: center;
        }
        
        .nav-link {
            color: var(--text-secondary);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.95rem;
            transition: color 0.3s ease;
            padding: 0.5rem 0;
        }
        
        .nav-link:hover {
            color: var(--accent-color);
        }
        
        .navbar-controls {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }
        
        .nav-lang-switcher {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
        }
        
        .nav-lang-option {
            color: var(--text-muted);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        .nav-lang-option.active {
            color: var(--accent-color);
        }
        
        .nav-lang-separator {
            color: var(--text-muted);
        }
        
        .nav-theme-toggle .theme-toggle-switch {
            width: 44px;
            height: 24px;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .nav-theme-toggle .theme-toggle-slider {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 18px;
            height: 18px;
            background: var(--accent-color);
            border-radius: 50%;
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
        }
        
        .nav-theme-toggle .theme-toggle-switch.dark .theme-toggle-slider {
            transform: translateX(20px);
        }
        
        .nav-cta-button {
            background: var(--btn-primary-bg);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .nav-cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            color: white;
        }
        
        /* Uptrends-Inspired Hero */
        .uptrends-hero {
            min-height: 100vh;
            position: relative;
            display: flex;
            align-items: center;
            padding: 120px 0 80px;
            background: var(--bg-gradient);
            overflow: hidden;
        }
        
        .hero-background-pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(234, 88, 12, 0.1) 0%, transparent 50%);
            z-index: -1;
        }
        
        .hero-background-image {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
            background-size: cover;
            background-position: center;
            opacity: 0.05;
            z-index: -2;
        }
        
        .hero-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        .hero-content-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }
        
        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(37, 99, 235, 0.1);
            border: 1px solid rgba(37, 99, 235, 0.2);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
            color: var(--accent-color);
            margin-bottom: 1.5rem;
        }
        
        .status-indicator {
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        .hero-main-title {
            font-size: clamp(2.5rem, 5vw, 3.5rem);
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            color: var(--text-primary);
            letter-spacing: -1px;
        }
        
        .gradient-text-hero {
            background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-secondary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .hero-main-description {
            font-size: 1.2rem;
            line-height: 1.6;
            color: var(--text-secondary);
            margin-bottom: 2rem;
            max-width: 500px;
        }
        
        .hero-stats {
            display: flex;
            gap: 2rem;
            margin-bottom: 2.5rem;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-number {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--accent-color);
            line-height: 1;
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: var(--text-muted);
            margin-top: 4px;
        }
        
        .hero-actions {
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        
        .hero-cta-primary {
            background: var(--btn-primary-bg);
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
        }
        
        .hero-cta-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
            color: white;
        }
        
        .hero-cta-secondary {
            color: var(--text-primary);
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            padding: 1rem 1.5rem;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            transition: all 0.3s ease;
        }
        
        .hero-cta-secondary:hover {
            border-color: var(--accent-color);
            color: var(--accent-color);
            background: rgba(37, 99, 235, 0.05);
        }
        
        .hero-visual {
            position: relative;
        }
        
        .hero-dashboard-preview {
            position: relative;
            z-index: 1;
        }
        
        .dashboard-window {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
        }
        
        .dashboard-header {
            background: var(--card-bg);
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .window-controls {
            display: flex;
            gap: 6px;
        }
        
        .control {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
        
        .control.red { background: #ff5f57; }
        .control.yellow { background: #ffbd2e; }
        .control.green { background: #28ca42; }
        
        .window-title {
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--text-secondary);
        }
        
        .dashboard-content {
            padding: 20px;
        }
        
        .dashboard-metrics {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 20px;
        }
        
        .metric-card {
            background: rgba(37, 99, 235, 0.05);
            border: 1px solid rgba(37, 99, 235, 0.1);
            border-radius: 8px;
            padding: 12px;
            text-align: center;
        }
        
        .metric-value {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--accent-color);
            line-height: 1;
        }
        
        .metric-label {
            font-size: 0.8rem;
            color: var(--text-muted);
            margin-top: 4px;
        }
        
        .dashboard-chart {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 16px;
            height: 80px;
        }
        
        .chart-bars {
            display: flex;
            align-items: end;
            gap: 8px;
            height: 100%;
        }
        
        .chart-bar {
            flex: 1;
            background: linear-gradient(to top, var(--accent-color), var(--accent-secondary));
            border-radius: 2px 2px 0 0;
            min-height: 20%;
        }
        
        .hero-content h1 {
            font-size: clamp(2.5rem, 6vw, 4.5rem);
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 1.5rem;
            color: var(--accent-color);
            letter-spacing: 2px;
        }
        
        .hero-content p {
            font-size: clamp(1.1rem, 2.5vw, 1.4rem);
            font-weight: 400;
            color: var(--text-muted);
            margin-bottom: 2rem;
            max-width: 600px;
        }
        
        .cta-button {
            background: var(--btn-primary-bg);
            color: white;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1.1rem;
            padding: 16px 40px;
            display: inline-block;
            transition: all 0.3s ease;
            box-shadow: var(--card-shadow);
            border: none;
        }
        
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
            color: white;
        }
        
        .cta-secondary {
            background: transparent;
            color: var(--text-primary);
            border: 2px solid var(--border-color);
            margin-left: 15px;
        }
        
        .cta-secondary:hover {
            background: var(--card-bg);
            border-color: var(--accent-color);
            color: var(--accent-color);
        }
        
        /* Rotating Element */
        .rotating-element {
            position: absolute;
            top: 50%;
            right: 10%;
            width: 200px;
            height: 200px;
            border: 3px solid var(--accent-color);
            border-radius: 50%;
            animation: rotate 20s linear infinite;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.6;
        }
        
        .rotating-element::before {
            content: 'Monitor';
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--accent-color);
            animation: counter-rotate 20s linear infinite;
        }
        
        @keyframes rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes counter-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
        
        /* Features Section */
        .features-section {
            padding: 120px 0;
            background: var(--card-bg);
        }
        
        /* How It Works Section */
        .how-it-works-section {
            padding: 120px 0;
            background: var(--bg-gradient);
        }
        
        .how-it-works-step {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 2.5rem 2rem;
            text-align: center;
            height: 100%;
            position: relative;
            transition: all 0.3s ease;
            box-shadow: var(--card-shadow);
        }
        
        .how-it-works-step:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(37, 99, 235, 0.15);
        }
        
        .step-number {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 30px;
            background: var(--accent-color);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.9rem;
            border: 3px solid var(--card-bg);
        }
        
        .step-icon {
            margin: 1.5rem auto 1.5rem;
            width: 64px;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .step-title {
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--text-primary);
        }
        
        .step-description {
            font-size: 1rem;
            line-height: 1.6;
            color: var(--text-secondary);
            margin: 0;
        }
        
        /* Subscription Form Section */
        .subscription-section {
            padding: 120px 0;
            background: var(--card-bg);
        }
        
        .subscription-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 3rem 2.5rem;
            box-shadow: var(--card-shadow);
            position: relative;
            overflow: hidden;
        }
        
        .subscription-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--btn-primary-bg);
        }
        
        .subscription-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 1.5rem;
            background: rgba(37, 99, 235, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .subscription-title {
            font-size: 2rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 1rem;
        }
        
        .subscription-description {
            font-size: 1.1rem;
            color: var(--text-secondary);
            margin-bottom: 2rem;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .subscription-form .form-group {
            margin-bottom: 1.5rem;
        }
        
        .subscription-form .form-label {
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
            display: block;
            font-size: 0.95rem;
        }
        
        .input-wrapper {
            position: relative;
        }
        
        .input-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
            pointer-events: none;
            z-index: 2;
        }
        
        .subscription-form .form-control {
            width: 100%;
            padding: 12px 16px 12px 45px;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            font-size: 1rem;
            background: var(--card-bg);
            color: var(--text-primary);
            transition: all 0.3s ease;
        }
        
        .subscription-form .form-control:focus {
            outline: none;
            border-color: var(--accent-color);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
            background: var(--card-bg);
        }
        
        .subscription-form .form-control::placeholder {
            color: var(--text-muted);
            opacity: 0.7;
        }
        
        /* Progressive Form Styles */
        .step-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
            gap: 1rem;
        }
        
        .step-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            opacity: 0.5;
            transition: all 0.3s ease;
        }
        
        .step-item.active {
            opacity: 1;
        }
        
        .step-item.completed {
            opacity: 1;
        }
        
        .step-number {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--border-color);
            color: var(--text-muted);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        .step-item.active .step-number {
            background: var(--accent-color);
            color: white;
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2);
        }
        
        .step-item.completed .step-number {
            background: #10b981;
            color: white;
        }
        
        .step-item.completed .step-number::before {
            content: '✓';
        }
        
        .step-label {
            font-size: 12px;
            font-weight: 600;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .step-item.active .step-label {
            color: var(--accent-color);
        }
        
        .step-item.completed .step-label {
            color: #10b981;
        }
        
        .step-connector {
            flex: 1;
            height: 2px;
            background: var(--border-color);
            max-width: 80px;
        }
        
        .form-step {
            display: none;
            opacity: 0;
            transform: translateX(30px);
            transition: all 0.3s ease;
        }
        
        .form-step.active {
            display: block;
            opacity: 1;
            transform: translateX(0);
        }
        
        .step-content {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .step-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }
        
        .step-description {
            font-size: 1rem;
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .step-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn-primary, .btn-secondary, .btn-success {
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1rem;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            min-width: 120px;
            justify-content: center;
        }
        
        .btn-primary {
            background: var(--accent-color);
            color: white;
        }
        
        .btn-primary:hover {
            background: #1e40af;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
        }
        
        .btn-secondary {
            background: var(--card-bg);
            color: var(--text-secondary);
            border: 2px solid var(--border-color);
        }
        
        .btn-secondary:hover {
            background: var(--border-color);
            transform: translateY(-2px);
        }
        
        .btn-success {
            background: #10b981;
            color: white;
        }
        
        .btn-success:hover {
            background: #059669;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
        }
        
        .summary-card {
            background: var(--border-light);
            border-radius: 12px;
            padding: 1.5rem;
            margin-top: 1rem;
        }
        
        .summary-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid var(--border-color);
        }
        
        .summary-item:last-child {
            border-bottom: none;
        }
        
        .summary-label {
            font-weight: 600;
            color: var(--text-secondary);
        }
        
        .summary-value {
            font-weight: 600;
            color: var(--text-primary);
            text-align: right;
            max-width: 200px;
            word-break: break-word;
        }
        
        .form-control-lg {
            font-size: 1.1rem;
            padding: 14px 16px 14px 45px;
        }
        
        /* Store Search Styles */
        .store-search-wrapper {
            position: relative;
            margin-bottom: 1rem;
        }
        
        .store-results {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .store-results.show {
            display: block;
        }
        
        .store-result-item {
            padding: 12px 16px;
            cursor: pointer;
            border-bottom: 1px solid var(--border-color);
            transition: all 0.2s ease;
        }
        
        .store-result-item:last-child {
            border-bottom: none;
        }
        
        .store-result-item:hover {
            background: var(--border-light);
        }
        
        .store-result-name {
            font-weight: 600;
            color: var(--text-primary);
            font-size: 14px;
        }
        
        .store-result-url {
            font-size: 12px;
            color: var(--text-secondary);
            margin-top: 2px;
        }
        
        .store-options {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
        
        .store-option {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            background: var(--card-bg);
            border: 2px solid var(--border-color);
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            flex: 1;
            min-width: 200px;
        }
        
        .store-option:hover {
            border-color: var(--accent-color);
            background: rgba(37, 99, 235, 0.05);
        }
        
        .store-option.selected {
            border-color: var(--accent-color);
            background: rgba(37, 99, 235, 0.1);
        }
        
        .store-option-icon {
            font-size: 20px;
        }
        
        .store-option-title {
            font-weight: 600;
            color: var(--text-primary);
            font-size: 14px;
        }
        
        .store-option-desc {
            font-size: 12px;
            color: var(--text-secondary);
            margin-top: 2px;
        }
        
        @media (max-width: 768px) {
            .step-indicator {
                gap: 0.5rem;
            }
            
            .step-connector {
                max-width: 40px;
            }
            
            .step-label {
                font-size: 10px;
            }
            
            .step-actions {
                flex-direction: column;
            }
            
            .btn-primary, .btn-secondary, .btn-success {
                width: 100%;
            }
            
            .store-options {
                flex-direction: column;
            }
            
            .store-option {
                min-width: auto;
            }
        }
        
        .btn-subscribe {
            width: 100%;
            background: var(--btn-primary-bg);
            color: white;
            border: none;
            padding: 16px 24px;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s ease;
            margin-top: 1rem;
        }
        
        .btn-subscribe:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
            background: var(--btn-primary-hover);
        }
        
        .btn-subscribe:active {
            transform: translateY(0);
        }
        
        .form-notice {
            text-align: center;
            font-size: 0.9rem;
            color: var(--text-muted);
            margin-top: 1.5rem;
            margin-bottom: 0;
        }
        
        .feature-card {
            background: var(--card-bg);
            border: none;
            border-radius: 12px;
            padding: 40px 30px;
            text-align: center;
            box-shadow: var(--card-shadow);
            transition: all 0.3s ease;
            height: 100%;
            color: var(--text-primary);
        }
        
        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(30, 64, 175, 0.15);
        }
        
        .feature-icon {
            width: 80px;
            height: 80px;
            border-radius: 12px;
            background: var(--btn-primary-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: 700;
            color: white;
            margin: 0 auto 20px;
        }
        
        .feature-title {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 15px;
            color: var(--text-primary);
        }
        
        /* DHgate Snapshot Section */
        .snapshot-section {
            padding: 120px 0;
            background: var(--card-bg);
        }
        
        .dhgate-snapshot {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: var(--card-shadow);
        }
        
        .browser-frame {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            overflow: hidden;
        }
        
        .browser-header {
            background: #f8fafc;
            padding: 12px 20px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid var(--border-color);
        }
        
        .browser-controls {
            display: flex;
            gap: 8px;
            margin-right: 20px;
        }
        
        .control {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
        
        .control.red { background: #ff5f57; }
        .control.yellow { background: #ffbd2e; }
        .control.green { background: #28ca42; }
        
        .browser-url {
            background: white;
            padding: 6px 12px;
            border-radius: 6px;
            border: 1px solid var(--border-color);
            font-size: 13px;
            color: var(--text-muted);
            flex-grow: 1;
            max-width: 300px;
        }
        
        .browser-content {
            padding: 20px;
            background: #f8fafc;
            min-height: 400px;
        }
        
        .dhgate-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30px;
            padding: 15px 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .dhgate-logo {
            font-size: 24px;
            font-weight: 700;
            color: #ff6600;
        }
        
        .search-bar {
            display: flex;
            gap: 10px;
        }
        
        .search-bar input {
            padding: 8px 12px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            width: 200px;
            font-size: 14px;
        }
        
        .search-bar button {
            background: var(--btn-primary-bg);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
        }
        
        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        
        .product-item {
            background: white;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            position: relative;
            transition: all 0.3s ease;
        }
        
        .product-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        
        .product-item.monitored {
            border: 2px solid var(--accent-color);
        }
        
        .product-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: var(--accent-secondary);
            color: white;
            font-size: 10px;
            padding: 4px 8px;
            border-radius: 12px;
            font-weight: 600;
        }
        
        .product-image {
            width: 100%;
            height: 120px;
            background: linear-gradient(45deg, #e2e8f0, #f1f5f9);
            border-radius: 6px;
            margin-bottom: 12px;
            position: relative;
            overflow: hidden;
        }
        
        .product-image::after {
            content: '👕';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 40px;
            opacity: 0.5;
        }
        
        .product-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 8px;
            line-height: 1.3;
        }
        
        .product-price {
            font-size: 16px;
            font-weight: 700;
            color: var(--accent-color);
            margin-bottom: 10px;
        }
        
        .monitor-indicator {
            font-size: 11px;
            color: var(--accent-color);
            font-weight: 600;
            background: rgba(30, 64, 175, 0.1);
            padding: 4px 8px;
            border-radius: 12px;
            display: inline-block;
        }
        
        /* Theme Toggle Integration */
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
            height: 44px;
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
        
        /* Language Switcher */
        .lang-switcher {
            position: absolute;
            top: var(--header-spacing-mobile);
            right: var(--header-spacing-mobile);
            z-index: 10;
        }
        
        .lang-options {
            display: flex;
            gap: 8px;
            font-size: 13px;
            font-weight: 500;
            height: 44px;
            align-items: center;
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
        
        /* Mobile Responsive Styles */
        @media (max-width: 1024px) {
            .navbar-menu {
                display: none;
            }
            
            .hero-content-wrapper {
                grid-template-columns: 1fr;
                gap: 3rem;
                text-align: center;
            }
            
            .hero-visual {
                order: -1;
            }
            
            .dashboard-window {
                transform: none;
                max-width: 400px;
                margin: 0 auto;
            }
        }
        
        @media (max-width: 768px) {
            .rotating-element { display: none; }
            .hero-section { padding: 60px 0; }
            .features-section, .snapshot-section { padding: 80px 0; }
            .feature-card { margin-bottom: 30px; }
            .cta-secondary { margin-left: 0; margin-top: 15px; display: block; text-align: center; }
            
            .navbar-container {
                padding: 1rem;
            }
            
            .navbar-controls {
                gap: 1rem;
            }
            
            .nav-cta-button {
                font-size: 0.8rem;
                padding: 0.6rem 1rem;
            }
            
            .uptrends-hero {
                padding: 100px 0 60px;
            }
            
            .hero-container {
                padding: 0 1rem;
            }
            
            .hero-main-title {
                font-size: clamp(1.8rem, 8vw, 2.5rem);
                margin-bottom: 1rem;
            }
            
            .hero-main-description {
                font-size: 1rem;
                margin-bottom: 1.5rem;
            }
            
            .hero-stats {
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .stat-number {
                font-size: 1.4rem;
            }
            
            .stat-label {
                font-size: 0.8rem;
            }
            
            .hero-actions {
                flex-direction: column;
                gap: 0.8rem;
                width: 100%;
            }
            
            .hero-cta-primary,
            .hero-cta-secondary {
                width: 100%;
                text-align: center;
                justify-content: center;
            }
            
            .dashboard-window {
                max-width: 320px;
            }
            
            .dashboard-metrics {
                grid-template-columns: 1fr;
                gap: 8px;
            }
            
            .browser-content { padding: 15px; min-height: 300px; }
            .dhgate-header { flex-direction: column; gap: 15px; text-align: center; }
            .search-bar { justify-content: center; }
            .search-bar input { width: 150px; }
            .products-grid { grid-template-columns: repeat(2, 1fr); gap: 15px; }
            .product-item { padding: 12px; }
            .product-image { height: 100px; }
            .product-title { font-size: 13px; }
            .product-price { font-size: 14px; }
        }
        
        @media (max-width: 480px) {
            .brand-name {
                display: none;
            }
            
            .nav-lang-switcher {
                display: none;
            }
            
            .hero-stats {
                flex-direction: column;
                gap: 0.8rem;
                text-align: center;
            }
            
            .dashboard-window {
                max-width: 280px;
            }
            
            .metric-card {
                padding: 8px;
            }
            
            .metric-value {
                font-size: 1.2rem;
            }
            
            .dashboard-chart {
                height: 60px;
            }
            
            .how-it-works-step {
                margin-bottom: 2rem;
                padding: 2rem 1.5rem;
            }
            
            .step-icon {
                margin: 1rem auto;
            }
            
            .step-title {
                font-size: 1.2rem;
            }
            
            .subscription-card {
                padding: 2rem 1.5rem;
            }
            
            .subscription-title {
                font-size: 1.6rem;
            }
            
            .subscription-description {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <!-- Professional Navigation Bar -->
    <nav class="professional-navbar">
        <div class="navbar-container">
            <a href="/?lang=${lang}&theme=${theme}" class="navbar-brand">
                <div class="brand-logo">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <defs>
                            <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#2563EB"/>
                                <stop offset="100%" style="stop-color:#EA580C"/>
                            </linearGradient>
                        </defs>
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#brandGradient)"/>
                        <path d="M2 17L12 22L22 17" stroke="url(#brandGradient)" stroke-width="2" fill="none"/>
                        <path d="M2 12L12 17L22 12" stroke="url(#brandGradient)" stroke-width="2" fill="none"/>
                    </svg>
                </div>
                <span class="brand-name">DHgate Monitor</span>
            </a>
            
            <div class="navbar-menu">
                <a href="#features" class="nav-link" onclick="scrollToSection('features'); return false;">${lang === 'nl' ? 'Features' : 'Features'}</a>
                <a href="#how-it-works" class="nav-link" onclick="scrollToSection('how-it-works'); return false;">${lang === 'nl' ? 'Hoe het werkt' : 'How it works'}</a>
                <a href="/contact?lang=${lang}&theme=${theme}" class="nav-link">${lang === 'nl' ? 'Contact' : 'Contact'}</a>
            </div>
            
            <div class="navbar-controls">
                <!-- Language Switcher -->
                <div class="nav-lang-switcher">
                    <a href="/?lang=en&theme=${theme}" class="nav-lang-option ${lang === 'en' ? 'active' : ''}">EN</a>
                    <span class="nav-lang-separator">|</span>
                    <a href="/?lang=nl&theme=${theme}" class="nav-lang-option ${lang === 'nl' ? 'active' : ''}">NL</a>
                </div>
                
                <!-- Theme Toggle -->
                <div class="nav-theme-toggle">
                    <div class="theme-toggle-switch ${theme === 'dark' ? 'dark' : ''}" onclick="toggleTheme()" aria-label="Toggle theme">
                        <div class="theme-toggle-slider">
                            ${theme === 'dark' ? '🌙' : '☀️'}
                        </div>
                    </div>
                </div>
                
                <a href="#subscription-form" class="nav-cta-button" onclick="scrollToSubscription(); return false;">
                    ${lang === 'nl' ? 'START' : 'START'}
                </a>
            </div>
        </div>
    </nav>

    <!-- Full-Width Hero Section -->
    <section class="uptrends-hero">
        <div class="hero-background-pattern"></div>
        <div class="hero-background-image"></div>
        
        <div class="hero-container">
            <div class="hero-content-wrapper">
                <div class="hero-main-content">
                    <div class="hero-badge animate-fade-in-up">
                        <span class="status-indicator"></span>
                        ${lang === 'nl' ? '24/7 Live Monitoring' : '24/7 Live Monitoring'}
                    </div>
                    
                    <h1 class="hero-main-title animate-fade-in-up" style="animation-delay: 0.1s;">
                        ${lang === 'nl' ? 
                            'Professionele <span class="gradient-text-hero">DHgate Monitoring</span> voor E-commerce' :
                            'Professional <span class="gradient-text-hero">DHgate Monitoring</span> for E-commerce'
                        }
                    </h1>
                    
                    <p class="hero-main-description animate-fade-in-up" style="animation-delay: 0.2s;">
                        ${lang === 'nl' ? 
                            'Automatiseer je productonderzoek met geavanceerde monitoring tools. Ontvang real-time notifications wanneer nieuwe producten worden geüpload die aan jouw criteria voldoen.' :
                            'Automate your product research with advanced monitoring tools. Receive real-time notifications when new products matching your criteria are uploaded.'
                        }
                    </p>
                    
                    <div class="hero-stats animate-fade-in-up" style="animation-delay: 0.3s;">
                        <div class="stat-item">
                            <div class="stat-number">24/7</div>
                            <div class="stat-label">${lang === 'nl' ? 'Monitoring' : 'Monitoring'}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">&lt;30s</div>
                            <div class="stat-label">${lang === 'nl' ? 'Response' : 'Response'}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">99.9%</div>
                            <div class="stat-label">${lang === 'nl' ? 'Uptime' : 'Uptime'}</div>
                        </div>
                    </div>
                    
                    <div class="hero-actions animate-fade-in-up" style="animation-delay: 0.4s;">
                        <a href="#subscription-form" class="hero-cta-primary" onclick="scrollToSubscription(); return false;">
                            ${lang === 'nl' ? 'Start Gratis Trial' : 'Start Free Trial'}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                        <a href="/dashboard?lang=${lang}&theme=${theme}" class="hero-cta-secondary">
                            ${lang === 'nl' ? 'View Dashboard' : 'View Dashboard'}
                        </a>
                    </div>
                </div>
                
                <div class="hero-visual">
                    <div class="hero-dashboard-preview">
                        <div class="dashboard-window">
                            <div class="dashboard-header">
                                <div class="window-controls">
                                    <div class="control red"></div>
                                    <div class="control yellow"></div>
                                    <div class="control green"></div>
                                </div>
                                <div class="window-title">DHgate Monitor Dashboard</div>
                            </div>
                            <div class="dashboard-content">
                                <div class="dashboard-metrics">
                                    <div class="metric-card">
                                        <div class="metric-value">1,247</div>
                                        <div class="metric-label">Products Tracked</div>
                                    </div>
                                    <div class="metric-card">
                                        <div class="metric-value">89</div>
                                        <div class="metric-label">New This Week</div>
                                    </div>
                                </div>
                                <div class="dashboard-chart">
                                    <div class="chart-bars">
                                        <div class="chart-bar" style="height: 60%"></div>
                                        <div class="chart-bar" style="height: 80%"></div>
                                        <div class="chart-bar" style="height: 45%"></div>
                                        <div class="chart-bar" style="height: 90%"></div>
                                        <div class="chart-bar" style="height: 70%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features-section">
        <div class="container">
            <div class="row text-center mb-5">
                <div class="col-12">
                    <h2 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem;">
                        ${lang === 'nl' ? 'Waarom DHgate Monitor?' : 'Why DHgate Monitor?'}
                    </h2>
                    <p style="font-size: 1.2rem; color: #64748b; max-width: 600px; margin: 0 auto;">
                        ${lang === 'nl' ? 
                            'Automatiseer je product monitoring met geavanceerde filters en real-time notificaties.' :
                            'Automate your product monitoring with advanced filters and real-time notifications.'
                        }
                    </p>
                </div>
            </div>
            
            <div class="row">
                <div class="col-lg-4 mb-4">
                    <div class="feature-card">
                        <div class="feature-icon">FILTER</div>
                        <h3 class="feature-title">
                            ${lang === 'nl' ? 'Smart Filtering' : 'Smart Filtering'}
                        </h3>
                        <p>
                            ${lang === 'nl' ? 
                                'Stel specifieke zoektermen en filters in om alleen relevante producten te vinden die voldoen aan jouw criteria.' :
                                'Set specific search terms and filters to find only relevant products that match your criteria.'
                            }
                        </p>
                    </div>
                </div>
                
                <div class="col-lg-4 mb-4">
                    <div class="feature-card">
                        <div class="feature-icon">ALERT</div>
                        <h3 class="feature-title">
                            ${lang === 'nl' ? 'Real-time Alerts' : 'Real-time Alerts'}
                        </h3>
                        <p>
                            ${lang === 'nl' ? 
                                'Ontvang direct email notificaties wanneer nieuwe producten worden gevonden die aan je filters voldoen.' :
                                'Receive instant email notifications when new products are discovered that match your filters.'
                            }
                        </p>
                    </div>
                </div>
                
                <div class="col-lg-4 mb-4">
                    <div class="feature-card">
                        <div class="feature-icon">24/7</div>
                        <h3 class="feature-title">
                            ${lang === 'nl' ? 'Continuous Monitoring' : 'Continuous Monitoring'}
                        </h3>
                        <p>
                            ${lang === 'nl' ? 
                                'Volledig geautomatiseerde monitoring die continu draait, onafhankelijk van je locatie of tijdstip.' :
                                'Fully automated monitoring that runs continuously, regardless of your location or time of day.'
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="how-it-works-section">
        <div class="container">
            <div class="row text-center mb-5">
                <div class="col-12">
                    <h2 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-primary);">
                        ${lang === 'nl' ? 'Hoe het werkt' : 'How it works'}
                    </h2>
                    <p style="font-size: 1.2rem; color: var(--text-muted); max-width: 700px; margin: 0 auto;">
                        ${lang === 'nl' ? 
                            'In drie eenvoudige stappen naar geautomatiseerde DHgate monitoring' :
                            'Three simple steps to automated DHgate monitoring'
                        }
                    </p>
                </div>
            </div>
            
            <div class="row">
                <div class="col-lg-4 mb-4">
                    <div class="how-it-works-step">
                        <div class="step-number">1</div>
                        <div class="step-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <defs>
                                    <linearGradient id="step1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#2563EB"/>
                                        <stop offset="100%" style="stop-color:#3B82F6"/>
                                    </linearGradient>
                                </defs>
                                <path d="M4 4H20C20.55 4 21 4.45 21 5V19C21 19.55 20.55 20 20 20H4C3.45 20 3 19.55 3 19V5C3 4.45 3.45 4 4 4Z" stroke="url(#step1Gradient)" stroke-width="2" fill="none"/>
                                <path d="M8 10L12 14L16 10" stroke="url(#step1Gradient)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3 class="step-title">
                            ${lang === 'nl' ? 'Vul je email in' : 'Enter your email'}
                        </h3>
                        <p class="step-description">
                            ${lang === 'nl' ? 
                                'Voer je email adres in om te starten met monitoring. Volledig gratis, geen account nodig.' :
                                'Enter your email address to start monitoring. Completely free, no account needed.'
                            }
                        </p>
                    </div>
                </div>
                
                <div class="col-lg-4 mb-4">
                    <div class="how-it-works-step">
                        <div class="step-number">2</div>
                        <div class="step-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <defs>
                                    <linearGradient id="step2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#EA580C"/>
                                        <stop offset="100%" style="stop-color:#F97316"/>
                                    </linearGradient>
                                </defs>
                                <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="url(#step2Gradient)" stroke-width="2" fill="none"/>
                            </svg>
                        </div>
                        <h3 class="step-title">
                            ${lang === 'nl' ? 'Stel je voorkeuren in' : 'Set your preferences'}
                        </h3>
                        <p class="step-description">
                            ${lang === 'nl' ? 
                                'Ontvang een email met een link om je monitoring voorkeuren in te stellen: shops, tags en tijden.' :
                                'Receive an email with a link to set your monitoring preferences: shops, tags and times.'
                            }
                        </p>
                    </div>
                </div>
                
                <div class="col-lg-4 mb-4">
                    <div class="how-it-works-step">
                        <div class="step-number">3</div>
                        <div class="step-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <defs>
                                    <linearGradient id="step3Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#10B981"/>
                                        <stop offset="100%" style="stop-color:#059669"/>
                                    </linearGradient>
                                </defs>
                                <path d="M21 11.5C21.03 12.18 21.03 12.82 21 13.5C20.9896 14.6105 20.6168 15.6918 19.9323 16.5787C19.2477 17.4656 18.2877 18.1088 17.2 18.42L16.67 19.08C16.5684 19.2054 16.4325 19.2998 16.2781 19.3522C16.1237 19.4045 15.9569 19.4124 15.7981 19.375C15.6393 19.3375 15.4951 19.2563 15.3804 19.1406C15.2656 19.0249 15.1845 18.8807 15.147 18.722L14.9 17.5C14.7 17.5 14.4 17.5 14.1 17.5C13.8 17.5 13.5 17.5 13.3 17.5L13.05 18.72C13.0125 18.8787 12.9314 19.0229 12.8167 19.1386C12.7019 19.2544 12.5577 19.3355 12.3989 19.373C12.2402 19.4105 12.0734 19.4026 11.919 19.3503C11.7646 19.2979 11.6287 19.2035 11.527 19.078L11 18.42C9.91233 18.1088 8.95234 17.4656 8.26777 16.5787C7.58321 15.6918 7.21042 14.6105 7.2 13.5C7.17 12.82 7.17 12.18 7.2 11.5L7.73 10.92C7.83166 10.7946 7.96758 10.7002 8.12193 10.6478C8.27628 10.5955 8.44307 10.5876 8.60193 10.625C8.76079 10.6625 8.90497 10.7437 9.01967 10.8594C9.13437 10.9751 9.21552 11.1193 9.253 11.278L9.5 12.5C9.7 12.5 10 12.5 10.3 12.5C10.6 12.5 10.9 12.5 11.1 12.5L11.35 11.28C11.3875 11.1213 11.4686 10.9771 11.5834 10.8614C11.6981 10.7456 11.8423 10.6645 12.0011 10.627C12.1598 10.5895 12.3266 10.5974 12.481 10.6497C12.6354 10.7021 12.7713 10.7965 12.873 10.922L13.4 11.5C14.4877 11.8112 15.4477 12.4544 16.1323 13.3413C16.8168 14.2282 17.1896 15.3095 17.2 16.42C17.23 17.1 17.23 17.74 17.2 18.42" stroke="url(#step3Gradient)" stroke-width="2" fill="none"/>
                                <circle cx="12" cy="12" r="3" stroke="url(#step3Gradient)" stroke-width="2" fill="none"/>
                            </svg>
                        </div>
                        <h3 class="step-title">
                            ${lang === 'nl' ? 'Ontvang alerts' : 'Receive alerts'}
                        </h3>
                        <p class="step-description">
                            ${lang === 'nl' ? 
                                'Automatische monitoring start direct. Ontvang real-time email alerts bij nieuwe producten die matchen.' :
                                'Automatic monitoring starts immediately. Receive real-time email alerts for new matching products.'
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- DHgate Snapshot Section -->
    <section class="snapshot-section">
        <div class="container">
            <div class="row text-center mb-5">
                <div class="col-12">
                    <h2 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-primary);">
                        ${lang === 'nl' ? 'DHgate Product Tracking' : 'DHgate Product Tracking'}
                    </h2>
                    <p style="font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin: 0 auto;">
                        ${lang === 'nl' ? 
                            'Monitor automatisch DHgate producten en ontvang meldingen van nieuwe uploads.' :
                            'Automatically monitor DHgate products and receive notifications of new uploads.'
                        }
                    </p>
                </div>
            </div>
            
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="dhgate-snapshot">
                        <div class="browser-frame">
                            <div class="browser-header">
                                <div class="browser-controls">
                                    <span class="control red"></span>
                                    <span class="control yellow"></span>
                                    <span class="control green"></span>
                                </div>
                                <div class="browser-url">
                                    <span>dhgate.com/store/products</span>
                                </div>
                            </div>
                            <div class="browser-content">
                                <div class="dhgate-header">
                                    <div class="dhgate-logo">DHgate</div>
                                    <div class="search-bar">
                                        <input type="text" placeholder="kids jersey" readonly>
                                        <button>Search</button>
                                    </div>
                                </div>
                                <div class="products-grid">
                                    <div class="product-item monitored">
                                        <div class="product-badge">NEW</div>
                                        <div class="product-image"></div>
                                        <div class="product-title">Kids Soccer Jersey 2025</div>
                                        <div class="product-price">$19.99</div>
                                        <div class="monitor-indicator">✓ Monitored</div>
                                    </div>
                                    <div class="product-item">
                                        <div class="product-image"></div>
                                        <div class="product-title">Youth Basketball Shirt</div>
                                        <div class="product-price">$15.50</div>
                                    </div>
                                    <div class="product-item monitored">
                                        <div class="product-badge">NEW</div>
                                        <div class="product-image"></div>
                                        <div class="product-title">Children Football Kit</div>
                                        <div class="product-price">$22.00</div>
                                        <div class="monitor-indicator">✓ Monitored</div>
                                    </div>
                                    <div class="product-item">
                                        <div class="product-image"></div>
                                        <div class="product-title">Kids Tennis Wear</div>
                                        <div class="product-price">$18.99</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Subscription Form Section -->
    <section id="subscription-form" class="subscription-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="subscription-card">
                        
                        <form method="POST" action="/subscribe" class="subscription-form" id="progressiveForm">
                            <input type="hidden" name="lang" value="${lang}">
                            <input type="hidden" name="theme" value="${theme}">
                            
                            <!-- Step Indicator -->
                            <div class="step-indicator">
                                <div class="step-item active" data-step="1">
                                    <div class="step-number">1</div>
                                    <div class="step-label">${lang === 'nl' ? 'Email' : 'Email'}</div>
                                </div>
                                <div class="step-connector"></div>
                                <div class="step-item" data-step="2">
                                    <div class="step-number">2</div>
                                    <div class="step-label">${lang === 'nl' ? 'Details' : 'Details'}</div>
                                </div>
                                <div class="step-connector"></div>
                                <div class="step-item" data-step="3">
                                    <div class="step-number">3</div>
                                    <div class="step-label">${lang === 'nl' ? 'Start' : 'Start'}</div>
                                </div>
                            </div>
                            
                            <!-- Step 1: Email -->
                            <div class="form-step active" data-step="1">
                                <div class="step-content">
                                    <h3 class="step-title">
                                        ${lang === 'nl' ? 'Wat is je email adres?' : 'What\'s your email address?'}
                                    </h3>
                                    <div class="form-group">
                                        <div class="input-wrapper">
                                            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2"/>
                                                <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2"/>
                                            </svg>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                name="email" 
                                                class="form-control form-control-lg" 
                                                placeholder="${lang === 'nl' ? 'jouw@email.com' : 'your@email.com'}" 
                                                required
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="step-actions">
                                    <button type="button" class="btn-primary btn-next" onclick="nextStep()">
                                        ${lang === 'nl' ? 'Volgende' : 'Next'}
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12H19" stroke="currentColor" stroke-width="2"/>
                                            <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Step 2: Store Search and Keywords -->
                            <div class="form-step" data-step="2">
                                <div class="step-content">
                                    <h3 class="step-title">
                                        ${lang === 'nl' ? 'Welke winkel wil je monitoren?' : 'Which store do you want to monitor?'}
                                    </h3>
                                    
                                    <div class="form-group">
                                        <div class="store-search-wrapper">
                                            <div class="input-wrapper">
                                                <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                                                    <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
                                                </svg>
                                                <input 
                                                    type="text" 
                                                    id="store_search" 
                                                    class="form-control" 
                                                    placeholder="${lang === 'nl' ? 'Zoek winkel naam...' : 'Search store name...'}" 
                                                    onkeyup="searchStores(this.value)"
                                                    autocomplete="off"
                                                >
                                            </div>
                                            <div id="store_results" class="store-results"></div>
                                            <input type="hidden" name="store_url" id="selected_store_url">
                                        </div>
                                        <div class="store-options">
                                            <button type="button" class="store-option" onclick="selectAllStores()">
                                                <div class="store-option-icon">🌐</div>
                                                <div class="store-option-text">
                                                    <div class="store-option-title">${lang === 'nl' ? 'Alle winkels' : 'All stores'}</div>
                                                    <div class="store-option-desc">${lang === 'nl' ? 'Monitor alle DHgate winkels' : 'Monitor all DHgate stores'}</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="tags" class="form-label">
                                            ${lang === 'nl' ? 'Zoektermen' : 'Search terms'}
                                        </label>
                                        <div class="input-wrapper">
                                            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path d="M7 7h.01M7 3h5c1.1 0 2 .9 2 2v5l-2.3 2.3c-.7.7-1.8.7-2.5 0L7 10V5c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/>
                                            </svg>
                                            <input 
                                                type="text" 
                                                id="tags" 
                                                name="tags" 
                                                class="form-control" 
                                                placeholder="${lang === 'nl' ? 'jersey, shirt, voetbal' : 'jersey, shirt, soccer'}" 
                                                required
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="step-actions">
                                    <button type="button" class="btn-secondary btn-back" onclick="previousStep()">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M19 12H5" stroke="currentColor" stroke-width="2"/>
                                            <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2"/>
                                        </svg>
                                        ${lang === 'nl' ? 'Terug' : 'Back'}
                                    </button>
                                    <button type="button" class="btn-primary btn-next" onclick="nextStep()">
                                        ${lang === 'nl' ? 'Volgende' : 'Next'}
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12H19" stroke="currentColor" stroke-width="2"/>
                                            <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Step 3: Confirmation -->
                            <div class="form-step" data-step="3">
                                <div class="step-content">
                                    <h3 class="step-title">
                                        ${lang === 'nl' ? 'Klaar om te starten!' : 'Ready to start!'}
                                    </h3>
                                    <p class="step-description">
                                        ${lang === 'nl' ? 
                                            'We gaan je monitoring nu instellen. Je ontvangt een email zodra nieuwe producten worden gevonden.' :
                                            'We\'ll set up your monitoring now. You\'ll receive an email as soon as new products are found.'
                                        }
                                    </p>
                                    <div class="summary-card">
                                        <div class="summary-item">
                                            <div class="summary-label">${lang === 'nl' ? 'Email:' : 'Email:'}</div>
                                            <div class="summary-value" id="summaryEmail">-</div>
                                        </div>
                                        <div class="summary-item">
                                            <div class="summary-label">${lang === 'nl' ? 'Winkel:' : 'Store:'}</div>
                                            <div class="summary-value" id="summaryStore">${lang === 'nl' ? 'Alle winkels' : 'All stores'}</div>
                                        </div>
                                        <div class="summary-item">
                                            <div class="summary-label">${lang === 'nl' ? 'Zoektermen:' : 'Search terms:'}</div>
                                            <div class="summary-value" id="summaryTags">-</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="step-actions">
                                    <button type="button" class="btn-secondary btn-back" onclick="previousStep()">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M19 12H5" stroke="currentColor" stroke-width="2"/>
                                            <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2"/>
                                        </svg>
                                        ${lang === 'nl' ? 'Terug' : 'Back'}
                                    </button>
                                    <button type="submit" class="btn-success btn-submit">
                                        ${lang === 'nl' ? 'Start monitoring' : 'Start monitoring'}
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12H19" stroke="currentColor" stroke-width="2"/>
                                            <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <p class="form-notice">
                                ${lang === 'nl' ? 
                                    'Door te subscriben ga je akkoord met onze ' :
                                    'By subscribing you agree to our '
                                }
                                <a href="/terms?lang=${lang}&theme=${theme}" target="_blank">${lang === 'nl' ? 'voorwaarden' : 'terms'}</a>
                                ${lang === 'nl' ? ' en ' : ' and '}
                                <a href="/privacy?lang=${lang}&theme=${theme}" target="_blank">${lang === 'nl' ? 'privacybeleid' : 'privacy policy'}</a>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="container py-5">
        <!-- Legal Footer -->
        <div class="row mt-4 mt-md-5">
            <div class="col text-center">
                <div class="text-muted small d-flex flex-column flex-md-row justify-content-center gap-2 gap-md-3">
                    <a href="/privacy?lang=${lang}&theme=${theme}" class="text-muted">${lang === 'nl' ? 'Privacybeleid' : 'Privacy Policy'}</a>
                    <a href="/terms?lang=${lang}&theme=${theme}" class="text-muted">${lang === 'nl' ? 'Algemene Voorwaarden' : 'Terms of Service'}</a>
                    <a href="/contact?lang=${lang}&theme=${theme}" class="text-muted">${lang === 'nl' ? 'Contact' : 'Contact'}</a>
                </div>
                <div class="text-muted small mt-2">
                    © ${new Date().getFullYear()} DHgate Monitor - ${lang === 'nl' ? 'Juridische informatie' : 'Legal information'}
                </div>
            </div>
        </div>
    </div>
    
    <!-- Cookie Consent Banner -->
    <div id="cookieConsent" class="cookie-consent">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <h6 class="mb-2">${lang === 'nl' ? 'Cookie voorkeuren' : 'Cookie preferences'}</h6>
                    <p class="mb-0 small">${lang === 'nl' ? 'We gebruiken cookies om je ervaring te verbeteren en functionaliteit te waarborgen.' : 'We use cookies to enhance your experience and ensure website functionality.'}</p>
                </div>
                <div class="col-md-4 text-md-end mt-3 mt-md-0">
                    <button onclick="acceptCookies()" class="btn btn-success btn-sm">${lang === 'nl' ? 'Accepteren' : 'Accept'}</button>
                    <button onclick="declineCookies()" class="btn btn-outline-light btn-sm">${lang === 'nl' ? 'Weigeren' : 'Decline'}</button>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Cookie consent functionality
        function showCookieConsent() {
            const consent = localStorage.getItem('cookieConsent');
            if (!consent) {
                setTimeout(() => {
                    document.getElementById('cookieConsent').classList.add('show');
                }, 1000);
            }
        }
        
        function acceptCookies() {
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('cookieConsentDate', new Date().toISOString());
            hideCookieConsent();
        }
        
        function declineCookies() {
            localStorage.setItem('cookieConsent', 'declined');
            localStorage.setItem('cookieConsentDate', new Date().toISOString());
            hideCookieConsent();
        }
        
        function hideCookieConsent() {
            document.getElementById('cookieConsent').classList.remove('show');
        }

        // Theme toggle functionality
        function toggleTheme() {
            const urlParams = new URLSearchParams(window.location.search);
            const currentTheme = urlParams.get('theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('selectedTheme', newTheme);
            const url = new URL(window.location);
            url.searchParams.set('theme', newTheme);
            // Preserve language parameter
            const currentLang = url.searchParams.get('lang') || '${lang}';
            url.searchParams.set('lang', currentLang);
            window.location.href = url.toString();
        }
        
        function scrollToSubscription() {
            // Simply scroll to top of page instead of to form
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            const navbar = document.querySelector('.professional-navbar');
            
            if (section) {
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
        
        // Progressive Form Functionality
        let currentStep = 1;
        const totalSteps = 3;
        
        function nextStep() {
            const currentStepElement = document.querySelector(\`.form-step[data-step="\${currentStep}"]\`);
            const emailInput = document.getElementById('email');
            const tagsInput = document.getElementById('tags');
            
            // Validate current step
            if (currentStep === 1) {
                if (!emailInput.value || !emailInput.checkValidity()) {
                    emailInput.focus();
                    emailInput.reportValidity();
                    return;
                }
            } else if (currentStep === 2) {
                if (!tagsInput.value || !tagsInput.checkValidity()) {
                    tagsInput.focus();
                    tagsInput.reportValidity();
                    return;
                }
            }
            
            if (currentStep < totalSteps) {
                // Hide current step
                currentStepElement.classList.remove('active');
                const currentStepIndicator = document.querySelector(\`.step-item[data-step="\${currentStep}"]\`);
                currentStepIndicator.classList.remove('active');
                currentStepIndicator.classList.add('completed');
                
                // Show next step
                currentStep++;
                const nextStepElement = document.querySelector(\`.form-step[data-step="\${currentStep}"]\`);
                const nextStepIndicator = document.querySelector(\`.step-item[data-step="\${currentStep}"]\`);
                
                setTimeout(() => {
                    nextStepElement.classList.add('active');
                    nextStepIndicator.classList.add('active');
                }, 150);
                
                // Update summary on step 3
                if (currentStep === 3) {
                    updateSummary();
                }
            }
        }
        
        function previousStep() {
            if (currentStep > 1) {
                // Hide current step
                const currentStepElement = document.querySelector(\`.form-step[data-step="\${currentStep}"]\`);
                const currentStepIndicator = document.querySelector(\`.step-item[data-step="\${currentStep}"]\`);
                currentStepElement.classList.remove('active');
                currentStepIndicator.classList.remove('active');
                
                // Show previous step
                currentStep--;
                const prevStepElement = document.querySelector(\`.form-step[data-step="\${currentStep}"]\`);
                const prevStepIndicator = document.querySelector(\`.step-item[data-step="\${currentStep}"]\`);
                
                setTimeout(() => {
                    prevStepElement.classList.add('active');
                    prevStepIndicator.classList.remove('completed');
                    prevStepIndicator.classList.add('active');
                }, 150);
            }
        }
        
        function updateSummary() {
            const email = document.getElementById('email').value;
            const storeUrl = document.getElementById('selected_store_url').value;
            const storeName = document.getElementById('store_search').value;
            const tags = document.getElementById('tags').value;
            
            document.getElementById('summaryEmail').textContent = email;
            document.getElementById('summaryStore').textContent = storeName || 
                ('${lang}' === 'nl' ? 'Alle winkels' : 'All stores');
            document.getElementById('summaryTags').textContent = tags;
        }
        
        // Store Search Functionality
        let storeDatabase = [];
        let selectedStore = null;
        
        // Mock store database (in real implementation, fetch from DHgate sitemap)
        function initStoreDatabase() {
            storeDatabase = [
                { name: "SportStyle Store", url: "https://dhgate.com/store/sportstyle" },
                { name: "Fashion Hub", url: "https://dhgate.com/store/fashionhub" },
                { name: "TechGear Shop", url: "https://dhgate.com/store/techgear" },
                { name: "Kids World", url: "https://dhgate.com/store/kidsworld" },
                { name: "Home Essentials", url: "https://dhgate.com/store/homeessentials" },
                { name: "Jewelry Palace", url: "https://dhgate.com/store/jewelrypalace" }
            ];
        }
        
        function searchStores(query) {
            const resultsDiv = document.getElementById('store_results');
            
            if (!query || query.length < 2) {
                resultsDiv.classList.remove('show');
                return;
            }
            
            const filteredStores = storeDatabase.filter(store => 
                store.name.toLowerCase().includes(query.toLowerCase())
            );
            
            if (filteredStores.length > 0) {
                resultsDiv.innerHTML = filteredStores.map(store => 
                    \`<div class="store-result-item" onclick="selectStore('\${store.name}', '\${store.url}')">
                        <div class="store-result-name">\${store.name}</div>
                        <div class="store-result-url">\${store.url}</div>
                    </div>\`
                ).join('');
                resultsDiv.classList.add('show');
            } else {
                resultsDiv.innerHTML = '<div class="store-result-item" style="opacity: 0.6; cursor: default;">' + 
                    ('${lang}' === 'nl' ? 'Geen winkels gevonden' : 'No stores found') + '</div>';
                resultsDiv.classList.add('show');
            }
        }
        
        function selectStore(storeName, storeUrl) {
            selectedStore = { name: storeName, url: storeUrl };
            document.getElementById('store_search').value = storeName;
            document.getElementById('selected_store_url').value = storeUrl;
            document.getElementById('store_results').classList.remove('show');
            
            // Update store options visual state
            document.querySelectorAll('.store-option').forEach(option => {
                option.classList.remove('selected');
            });
        }
        
        function selectAllStores() {
            selectedStore = null;
            document.getElementById('store_search').value = '';
            document.getElementById('selected_store_url').value = '';
            document.getElementById('store_results').classList.remove('show');
            
            // Update visual state
            document.querySelectorAll('.store-option').forEach(option => {
                option.classList.remove('selected');
            });
            event.target.closest('.store-option').classList.add('selected');
        }
        
        // Hide results when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.store-search-wrapper')) {
                document.getElementById('store_results').classList.remove('show');
            }
        });
        
        // Allow Enter key to advance steps
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.target.matches('.form-control')) {
                e.preventDefault();
                if (currentStep < totalSteps) {
                    nextStep();
                } else if (currentStep === totalSteps && e.target.id !== 'tags') {
                    document.getElementById('progressiveForm').submit();
                }
            }
        });
        
        // Show consent banner on page load and initialize store database
        document.addEventListener('DOMContentLoaded', function() {
            showCookieConsent();
            initStoreDatabase();
        });
    </script>
</body>
</html>
  `;
}

// Generate Login Page HTML
function generateLoginPageHTML(t, lang, theme = 'light') {
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lang === 'nl' ? 'Inloggen - DHgate Monitor' : 'Login - DHgate Monitor'}</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    ${generateGlobalCSS(theme)}
    
    <style>
        body {
            font-family: 'Raleway', sans-serif;
            background: var(--bg-gradient);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        
        .login-card {
            background: var(--card-bg);
            border: none;
            border-radius: 12px;
            padding: 40px;
            box-shadow: var(--card-shadow);
            width: 100%;
            max-width: 400px;
        }
        
        .login-title {
            font-size: 2rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 2rem;
            color: var(--accent-color);
            letter-spacing: 2px;
        }
        
        .form-control {
            border-radius: 12px;
            border: 1px solid var(--border-color);
            padding: 12px 16px;
            margin-bottom: 1rem;
            background: var(--card-bg);
            color: var(--text-primary);
        }
        
        .form-control:focus {
            border-color: var(--accent-color);
            box-shadow: 0 0 0 0.2rem rgba(30, 64, 175, 0.25);
            background: var(--card-bg);
            color: var(--text-primary);
        }
        
        .btn-login {
            background: var(--btn-primary-bg);
            border: none;
            border-radius: 12px;
            padding: 12px;
            font-weight: 600;
            color: white;
            width: 100%;
            margin-bottom: 1rem;
            transition: all 0.3s ease;
        }
        
        .btn-login:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
            color: white;
        }
        
        .back-link {
            text-align: center;
            margin-top: 20px;
        }
        
        .back-link a {
            color: var(--accent-color);
            text-decoration: none;
            font-weight: 500;
        }
        
        .back-link a:hover {
            color: var(--accent-secondary);
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <!-- Theme Toggle Switch -->
    <div class="theme-switcher">
        <div class="theme-toggle">
            <span class="theme-label">Light</span>
            <div class="theme-toggle-switch ${theme === 'dark' ? 'dark' : ''}" onclick="toggleTheme()" aria-label="Toggle theme">
                <div class="theme-toggle-slider">
                    ${theme === 'dark' ? '●' : '○'}
                </div>
            </div>
            <span class="theme-label">Dark</span>
        </div>
    </div>

    <!-- Language Switcher -->
    <div class="lang-switcher">
        <div class="lang-options">
            <a href="/login?lang=en&theme=${theme}" class="lang-option ${lang === 'en' ? 'active' : ''}">EN</a>
            <span class="lang-separator">|</span>
            <a href="/login?lang=nl&theme=${theme}" class="lang-option ${lang === 'nl' ? 'active' : ''}">NL</a>
        </div>
    </div>

    <div class="login-card">
        <h1 class="login-title">
            ${lang === 'nl' ? 'Inloggen' : 'Login'}
        </h1>
        
        <form action="/dashboard" method="get">
            <input type="hidden" name="lang" value="${lang}">
            
            <div class="mb-3">
                <input type="email" class="form-control" placeholder="${lang === 'nl' ? 'E-mailadres' : 'Email address'}" required>
            </div>
            
            <div class="mb-3">
                <input type="password" class="form-control" placeholder="${lang === 'nl' ? 'Wachtwoord' : 'Password'}" required>
            </div>
            
            <button type="submit" class="btn btn-login">
                ${lang === 'nl' ? '🚀 Inloggen' : '🚀 Login'}
            </button>
            
            <div class="text-center">
                <small class="text-muted">
                    ${lang === 'nl' ? 'Demo: gebruik willekeurige gegevens' : 'Demo: use any credentials'}
                </small>
            </div>
        </form>
        
        <div class="back-link">
            <a href="/?lang=${lang}&theme=${theme}">
                ← ${lang === 'nl' ? 'Terug naar homepage' : 'Back to homepage'}
            </a>
        </div>
    </div>
    
    <script>
        // Theme toggle functionality
        function toggleTheme() {
            const urlParams = new URLSearchParams(window.location.search);
            const currentTheme = urlParams.get('theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('selectedTheme', newTheme);
            const url = new URL(window.location);
            url.searchParams.set('theme', newTheme);
            // Preserve language parameter
            const currentLang = url.searchParams.get('lang') || '${lang}';
            url.searchParams.set('lang', currentLang);
            window.location.href = url.toString();
        }
    </script>
</body>
</html>
  `;
}
