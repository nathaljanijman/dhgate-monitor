var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-RpzY5D/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// .wrangler/tmp/bundle-RpzY5D/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// cloudflare_app.js
var translations = {
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
    tags_tip: 'Tags worden gebruikt om te zoeken naar producten die relevante woorden bevatten. Bijvoorbeeld: "kids", "children", "youth", "baby", "toddler".',
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
    tags_tip: 'Tags are used to search for products containing relevant words. For example: "kids", "children", "youth", "baby", "toddler".',
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
function getLanguage(request) {
  const url = new URL(request.url);
  const urlLang = url.searchParams.get("lang");
  if (urlLang && translations[urlLang]) {
    return urlLang;
  }
  const acceptLanguage = request.headers.get("Accept-Language") || "";
  if (acceptLanguage.includes("nl")) {
    return "nl";
  }
  return "en";
}
__name(getLanguage, "getLanguage");
function getTranslations(lang) {
  return translations[lang] || translations.en;
}
__name(getTranslations, "getTranslations");
function getTheme(request) {
  const url = new URL(request.url);
  const urlTheme = url.searchParams.get("theme");
  if (urlTheme && THEMES[urlTheme]) {
    return urlTheme;
  }
  const userAgent = request.headers.get("User-Agent") || "";
  return "light";
}
__name(getTheme, "getTheme");
var THEMES = {
  light: {
    name: "Light Mode",
    css: {
      "--bg-primary": "#ffffff",
      "--bg-gradient": "linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)",
      "--text-primary": "#1e293b",
      "--text-muted": "#64748b",
      "--accent-color": "#1e40af",
      "--accent-secondary": "#ff6b35",
      "--card-bg": "#ffffff",
      "--card-shadow": "0 4px 12px rgba(0,0,0,0.1)",
      "--border-color": "#e2e8f0",
      "--btn-primary-bg": "linear-gradient(135deg, #1e3a8a, #2563eb)",
      "--btn-success-bg": "linear-gradient(45deg, #ff6b35, #ff8c00)",
      "--cookie-bg": "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
      "--legal-section-heading": "#1e40af"
    }
  },
  dark: {
    name: "Dark Mode",
    css: {
      "--bg-primary": "#1e293b",
      "--bg-gradient": "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      "--text-primary": "#f8fafc",
      "--text-muted": "#94a3b8",
      "--accent-color": "#3b82f6",
      "--accent-secondary": "#f97316",
      "--card-bg": "#334155",
      "--card-shadow": "0 4px 12px rgba(0,0,0,0.3)",
      "--border-color": "#475569",
      "--btn-primary-bg": "linear-gradient(135deg, #3b82f6, #1e40af)",
      "--btn-success-bg": "linear-gradient(45deg, #f97316, #ea580c)",
      "--cookie-bg": "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      "--legal-section-heading": "#60a5fa"
    }
  }
};
function generateGlobalCSS(theme2 = "light") {
  const t = THEMES[theme2] || THEMES.light;
  const cssVars = Object.entries(t.css).map(([key, value]) => `  ${key}: ${value};`).join("\n");
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
      
      body { 
        font-family: 'Raleway', sans-serif;
        background: var(--bg-gradient);
        min-height: 100vh;
        color: var(--text-primary);
        transition: background 0.3s ease, color 0.3s ease;
      }
      
      .main-header {
        background: var(--card-bg);
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(71, 85, 105, 0.1);
        margin-bottom: 30px;
        color: var(--text-primary);
      }
      
      .card {
        border: none;
        border-radius: 12px;
        box-shadow: var(--card-shadow);
        background: var(--card-bg);
        color: var(--text-primary);
      }
      
      .card-header {
        background: var(--card-bg);
        border-bottom: 1px solid var(--border-color);
        color: var(--text-primary);
      }
      
      .btn-primary {
        background: var(--btn-primary-bg);
        border: none;
        font-weight: 600;
        color: white;
      }
      
      .btn-success {
        background: var(--btn-success-bg);
        border: none;
        font-weight: 600;
        color: white;
      }
      
      .text-muted {
        color: var(--text-muted) !important;
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
__name(generateGlobalCSS, "generateGlobalCSS");
var cloudflare_app_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }
    try {
      switch (url.pathname) {
        case "/":
          return await handleDashboard(request, env);
        case "/add_shop":
          if (method === "GET") {
            return await handleAddShopPage(request, env);
          } else if (method === "POST") {
            return await handleAddShop(request, env);
          }
          break;
        case "/settings":
          if (method === "GET") {
            return await handleSettingsPage(request, env);
          } else if (method === "POST") {
            return await handleUpdateSettings(request, env);
          }
          break;
        case "/tags":
          if (method === "GET") {
            return await handleTagsPage(request, env);
          } else if (method === "POST") {
            return await handleUpdateTags(request, env);
          }
          break;
        case "/api/shops":
          if (method === "GET") {
            return await handleGetShops(request, env);
          }
          break;
        case "/api/tags":
          if (method === "GET") {
            return await handleGetTags(request, env);
          }
          break;
        case "/api/status":
          return await handleStatus(request, env);
        case "/privacy":
          return await handlePrivacyPage(request, env);
        case "/terms":
          return await handleTermsPage(request, env);
        case "/contact":
          return await handleContactPage(request, env);
        case "/sitemap.xml":
          return await handleSitemap(request, env);
        case "/robots.txt":
          return await handleRobots(request, env);
        case "/health":
          return new Response(JSON.stringify({
            status: "healthy",
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        default:
          return new Response("Not Found", {
            status: 404,
            headers: corsHeaders
          });
      }
    } catch (error) {
      console.error("Worker error:", error);
      return new Response(JSON.stringify({
        error: error.message
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  },
  // Scheduled event handler for daily monitoring at 09:00 UTC
  async scheduled(event, env, ctx) {
    console.log("\u{1F558} Scheduled monitoring triggered at:", (/* @__PURE__ */ new Date()).toISOString());
    try {
      const shops = await getShops(env);
      const config = await getConfig(env);
      const tags = await getTags(env);
      console.log(`\u{1F4CA} Monitoring ${shops.length} shops with tags: ${tags.map((t) => t.name).join(", ")}`);
      if (shops.length === 0) {
        console.log("\u26A0\uFE0F No shops configured for monitoring");
        return;
      }
      const subject = `DHgate Monitor Daily Check - ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`;
      const message = `Monitoring check completed at ${(/* @__PURE__ */ new Date()).toLocaleString()}.

Shops monitored: ${shops.length}
Tags: ${tags.map((t) => t.name).join(", ")}

Note: This is the Cloudflare Worker scheduled check. For full product crawling, run the Selenium monitor script.`;
      console.log("\u{1F4E7} Sending daily monitoring notification...");
      console.log("Subject:", subject);
      console.log("Message preview:", message.substring(0, 100) + "...");
      console.log("\u2705 Daily monitoring check completed successfully");
    } catch (error) {
      console.error("\u274C Scheduled monitoring failed:", error);
      throw error;
    }
  }
};
async function handleDashboard(request, env) {
  try {
    const shops = await getShops(env);
    const config = await getConfig(env);
    const tags = await getTags(env);
    const lang = getLanguage(request);
    const theme2 = getTheme(request);
    const t = getTranslations(lang);
    const html = generateDashboardHTML(shops, config, tags, t, lang, theme2);
    return new Response(html, {
      headers: { "Content-Type": "text/html" }
    });
  } catch (error) {
    return new Response("Dashboard Error: " + error.message, { status: 500 });
  }
}
__name(handleDashboard, "handleDashboard");
async function handleAddShopPage(request, env) {
  const lang = getLanguage(request);
  const t = getTranslations(lang);
  const html = generateAddShopHTML(t, lang);
  return new Response(html, {
    headers: { "Content-Type": "text/html" }
  });
}
__name(handleAddShopPage, "handleAddShopPage");
async function handleAddShop(request, env) {
  try {
    const formData = await request.formData();
    const shopName = formData.get("name");
    const searchUrl = formData.get("search_url");
    if (!shopName || !searchUrl) {
      throw new Error("Shop name and URL are required");
    }
    const shops = await getShops(env);
    const newShop = {
      id: Date.now().toString(),
      name: shopName,
      search_url: searchUrl,
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    shops.push(newShop);
    await env.DHGATE_MONITOR_KV.put("shops", JSON.stringify(shops));
    return Response.redirect(new URL("/", request.url).toString(), 302);
  } catch (error) {
    return new Response("Error adding shop: " + error.message, { status: 400 });
  }
}
__name(handleAddShop, "handleAddShop");
async function handleSettingsPage(request, env) {
  const config = await getConfig(env);
  const lang = getLanguage(request);
  const t = getTranslations(lang);
  const html = generateSettingsHTML(config, t, lang);
  return new Response(html, {
    headers: { "Content-Type": "text/html" }
  });
}
__name(handleSettingsPage, "handleSettingsPage");
async function handleUpdateSettings(request, env) {
  try {
    const formData = await request.formData();
    const config = {
      email: {
        sender_email: formData.get("sender_email"),
        recipient_email: formData.get("recipient_email"),
        smtp_server: "smtp.gmail.com",
        smtp_port: 587
      },
      schedule: {
        time: formData.get("schedule_time") || "09:00"
      },
      filters: {
        keywords: formData.get("keywords").split(",").map((k) => k.trim()).filter((k) => k),
        case_sensitive: formData.has("case_sensitive")
      }
    };
    await env.DHGATE_MONITOR_KV.put("config", JSON.stringify(config));
    return Response.redirect(new URL("/settings", request.url).toString(), 302);
  } catch (error) {
    return new Response("Error updating settings: " + error.message, { status: 400 });
  }
}
__name(handleUpdateSettings, "handleUpdateSettings");
async function handleTagsPage(request, env) {
  const tags = await getTags(env);
  const lang = getLanguage(request);
  const t = getTranslations(lang);
  const html = generateTagsHTML(tags, t, lang);
  return new Response(html, {
    headers: { "Content-Type": "text/html" }
  });
}
__name(handleTagsPage, "handleTagsPage");
async function handleUpdateTags(request, env) {
  try {
    const formData = await request.formData();
    const tagsString = formData.get("tags") || "";
    const tags = tagsString.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0).map((tag) => ({
      name: tag,
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      active: true
    }));
    await env.DHGATE_MONITOR_KV.put("monitoring_tags", JSON.stringify(tags));
    return Response.redirect(new URL("/tags", request.url).toString(), 302);
  } catch (error) {
    return new Response("Error updating tags: " + error.message, { status: 400 });
  }
}
__name(handleUpdateTags, "handleUpdateTags");
async function handleGetShops(request, env) {
  const shops = await getShops(env);
  return new Response(JSON.stringify(shops), {
    headers: { "Content-Type": "application/json" }
  });
}
__name(handleGetShops, "handleGetShops");
async function handleGetTags(request, env) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  const tags = await getTags(env);
  return new Response(JSON.stringify(tags), {
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}
__name(handleGetTags, "handleGetTags");
async function handleStatus(request, env) {
  const status = {
    status: "online",
    service: "DHgate Monitor",
    platform: "Cloudflare Workers",
    version: "3.0.0",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    environment: "production"
  };
  return new Response(JSON.stringify(status), {
    headers: { "Content-Type": "application/json" }
  });
}
__name(handleStatus, "handleStatus");
async function handlePrivacyPage(request, env) {
  const lang = getLanguage(request);
  const t = getTranslations(lang);
  const html = generatePrivacyHTML(t, lang);
  return new Response(html, {
    headers: { "Content-Type": "text/html" }
  });
}
__name(handlePrivacyPage, "handlePrivacyPage");
async function handleTermsPage(request, env) {
  const lang = getLanguage(request);
  const t = getTranslations(lang);
  const html = generateTermsHTML(t, lang);
  return new Response(html, {
    headers: { "Content-Type": "text/html" }
  });
}
__name(handleTermsPage, "handleTermsPage");
async function handleContactPage(request, env) {
  const lang = getLanguage(request);
  const t = getTranslations(lang);
  const html = generateContactHTML(t, lang);
  return new Response(html, {
    headers: { "Content-Type": "text/html" }
  });
}
__name(handleContactPage, "handleContactPage");
async function handleSitemap(request, env) {
  const sitemap = generateSitemap();
  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" }
  });
}
__name(handleSitemap, "handleSitemap");
async function handleRobots(request, env) {
  const robots = `User-agent: *
Allow: /

Sitemap: https://dhgate-monitor.com/sitemap.xml`;
  return new Response(robots, {
    headers: { "Content-Type": "text/plain" }
  });
}
__name(handleRobots, "handleRobots");
async function getShops(env) {
  try {
    const shopsData = await env.DHGATE_MONITOR_KV.get("shops");
    return shopsData ? JSON.parse(shopsData) : [];
  } catch (error) {
    console.error("Error getting shops:", error);
    return [];
  }
}
__name(getShops, "getShops");
async function getConfig(env) {
  try {
    const configData = await env.DHGATE_MONITOR_KV.get("config");
    return configData ? JSON.parse(configData) : getDefaultConfig();
  } catch (error) {
    console.error("Error getting config:", error);
    return getDefaultConfig();
  }
}
__name(getConfig, "getConfig");
async function getTags(env) {
  try {
    const tagsData = await env.DHGATE_MONITOR_KV.get("monitoring_tags");
    return tagsData ? JSON.parse(tagsData) : getDefaultTags();
  } catch (error) {
    console.error("Error getting tags:", error);
    return getDefaultTags();
  }
}
__name(getTags, "getTags");
function getDefaultTags() {
  return [
    { name: "kids", created_at: (/* @__PURE__ */ new Date()).toISOString(), active: true },
    { name: "children", created_at: (/* @__PURE__ */ new Date()).toISOString(), active: true },
    { name: "youth", created_at: (/* @__PURE__ */ new Date()).toISOString(), active: true }
  ];
}
__name(getDefaultTags, "getDefaultTags");
function getDefaultConfig() {
  return {
    email: {
      sender_email: "nathaljanijman@gmail.com",
      recipient_email: "nathaljanijman@gmail.com",
      smtp_server: "smtp.gmail.com",
      smtp_port: 587
    },
    schedule: {
      time: "09:00"
    },
    filters: {
      keywords: ["kids"],
      case_sensitive: false
    }
  };
}
__name(getDefaultConfig, "getDefaultConfig");
function generateDashboardHTML(shops, config, tags, t, lang, theme2 = "light") {
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DHgate Monitor Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    ${generateGlobalCSS(theme2)}
</head>
<body>
    <div class="container py-5">
        <!-- Theme Toggle Switch -->
        <div class="theme-switcher">
            <div class="theme-toggle">
                <span class="theme-label">Light</span>
                <div class="theme-toggle-switch ${theme2 === "dark" ? "dark" : ""}" onclick="toggleTheme()" aria-label="Toggle theme">
                    <div class="theme-toggle-slider">
                        ${theme2 === "dark" ? "\u25CF" : "\u25CB"}
                    </div>
                </div>
                <span class="theme-label">Dark</span>
            </div>
        </div>
        
        <!-- Language Switcher -->
        <div class="lang-switcher">
            <div class="lang-options">
                <a href="?lang=en&theme=${theme2}" class="lang-option ${lang === "en" ? "active" : ""}">EN</a>
                <span class="lang-separator">|</span>
                <a href="?lang=nl&theme=${theme2}" class="lang-option ${lang === "nl" ? "active" : ""}">NL</a>
            </div>
        </div>
        <div class="main-header p-3 p-md-5 text-center">
            <h1 style="color: var(--accent-color); font-weight: 700; font-size: 2.5rem; letter-spacing: 2px;">
                ${t.app_title} <!-- THEME TEST -->
            </h1>
            <p class="text-muted">${t.app_description}</p>
        </div>
        
        <div class="row g-3 g-md-4">
            <div class="col-12 col-lg-8">
                <div class="card">
                    <div class="card-header">
                        <h3>${t.registered_shops} (${shops.length})</h3>
                    </div>
                    <div class="card-body">
                        ${shops.length === 0 ? `<p class="text-muted">${t.no_shops_registered} <a href="/add_shop?lang=${lang}">${t.add_first_shop}</a>.</p>` : shops.map((shop) => `
                            <div class="border rounded p-3 mb-2">
                                <h5>${shop.name}</h5>
                                <p class="text-muted small">${shop.search_url}</p>
                                <small class="text-secondary">${t.added}: ${new Date(shop.created_at).toLocaleDateString(lang === "nl" ? "nl-NL" : "en-US")}</small>
                            </div>
                          `).join("")}
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
                        <p><strong>${t.tags}:</strong> ${tags.map((tag) => tag.name).join(", ")}</p>
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
                    \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} DHgate Monitor - ${t.legal_links}
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
    <\/script>
</body>
</html>
  `;
}
__name(generateDashboardHTML, "generateDashboardHTML");
function generateAddShopHTML(t, lang) {
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.add_shop_title}</title>
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
        
        /* Mobile Optimizations */
        @media (max-width: 767px) {
            .container { padding: 20px 15px !important; }
            .card { margin: 10px 0; }
            .btn { font-size: 14px; padding: 12px 20px; }
            h3 { font-size: 1.3rem; }
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
                                <a href="/?lang=${lang}" class="btn btn-outline-secondary">${t.back_to_dashboard}</a>
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
        
        // THEME SWITCHING FUNCTIONALITY FOR DASHBOARD - UNIQUE TEST 456
        function switchTheme(newTheme) {
            console.log('Switching to theme:', newTheme);
            localStorage.setItem('selectedTheme', newTheme);
            const url = new URL(window.location);
            url.searchParams.set('theme', newTheme);
            // Preserve language parameter if it exists
            const currentLang = url.searchParams.get('lang') || '${lang}';
            url.searchParams.set('lang', currentLang);
            console.log('Redirecting to:', url.toString());
            window.location.href = url.toString();
        }
        
        // Show consent banner and make functions globally available
        document.addEventListener('DOMContentLoaded', function() {
            showCookieConsent();
            console.log('Current theme:', '${theme}');
            console.log('Dashboard theme switcher ready');
        });
        
        // Make functions globally available
        window.switchTheme = switchTheme;
        window.resetCookieConsent = resetCookieConsent;
    <\/script>
</body>
</html>
  `;
}
__name(generateAddShopHTML, "generateAddShopHTML");
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
                                    <input type="email" name="sender_email" class="form-control" value="${config.email.sender_email}" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">${t.recipient_email}</label>
                                    <input type="email" name="recipient_email" class="form-control" value="${config.email.recipient_email}" required>
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
                                <input type="text" name="keywords" class="form-control" value="${config.filters.keywords.join(", ")}" required>
                            </div>
                            <div class="mb-3">
                                <div class="form-check">
                                    <input type="checkbox" name="case_sensitive" class="form-check-input" ${config.filters.case_sensitive ? "checked" : ""}>
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
__name(generateSettingsHTML, "generateSettingsHTML");
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
                                ${tags.map((tag) => `
                                    <span class="tag-item">
                                        ${tag.name}
                                    </span>
                                `).join("")}
                            </div>
                        </div>
                        
                        <form method="POST">
                            <div class="mb-3">
                                <label class="form-label">${t.tags_comma}</label>
                                <input type="text" name="tags" class="form-control" 
                                       value="${tags.map((tag) => tag.name).join(", ")}" 
                                       placeholder="kids, children, youth, baby, toddler" required>
                                <div class="form-text">
                                    ${t.tags_help}
                                </div>
                            </div>
                            
                            <div class="alert alert-info">
                                <strong>\u{1F4A1} Tip:</strong> ${t.tags_tip}
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
__name(generateTagsHTML, "generateTagsHTML");
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
                        <small class="text-muted">${lang === "nl" ? "Laatst bijgewerkt" : "Last updated"}: ${(/* @__PURE__ */ new Date()).toLocaleDateString(lang === "nl" ? "nl-NL" : "en-US")}</small>
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
__name(generatePrivacyHTML, "generatePrivacyHTML");
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
                        <small class="text-muted">${lang === "nl" ? "Laatst bijgewerkt" : "Last updated"}: ${(/* @__PURE__ */ new Date()).toLocaleDateString(lang === "nl" ? "nl-NL" : "en-US")}</small>
                    </div>
                    <div class="card-body">
                        ${lang === "nl" ? generateTermsContentNL() : generateTermsContentEN()}
                        
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
__name(generateTermsHTML, "generateTermsHTML");
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
                                nathaljanijman@gmail.com</p>
                                
                                <h5>${t.website_info}</h5>
                                <p><strong>Website:</strong> dhgate-monitor.com<br>
                                <strong>${t.data_controller}:</strong> Nathalja Nijman</p>
                            </div>
                            <div class="col-md-6">
                                <h4>${lang === "nl" ? "Over deze service" : "About this service"}</h4>
                                <p>${lang === "nl" ? "DHgate Monitor is een gratis service voor het monitoren van DHgate producten. We verzamelen alleen de gegevens die nodig zijn voor de functionaliteit van de service." : "DHgate Monitor is a free service for monitoring DHgate products. We only collect data necessary for the functionality of the service."}</p>
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
__name(generateContactHTML, "generateContactHTML");
function generateSitemap() {
  const baseUrl = "https://dhgate-monitor.com";
  const urls2 = [
    { loc: "/", priority: "1.0" },
    { loc: "/add_shop", priority: "0.8" },
    { loc: "/settings", priority: "0.8" },
    { loc: "/tags", priority: "0.8" },
    { loc: "/privacy", priority: "0.6" },
    { loc: "/terms", priority: "0.6" },
    { loc: "/contact", priority: "0.6" }
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls2.map((url) => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
  return sitemap;
}
__name(generateSitemap, "generateSitemap");
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
    <\/script>
  `;
}
__name(generateCookieConsent, "generateCookieConsent");
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
            <li>Contact op te nemen via nathaljanijman@gmail.com voor ondersteuning</li>
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
        <p>Voor vragen over dit privacybeleid kunt u contact opnemen via: nathaljanijman@gmail.com</p>
    </div>
  `;
}
__name(generatePrivacyContentNL, "generatePrivacyContentNL");
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
            <li>Contacting us at nathaljanijman@gmail.com for support</li>
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
        <p>For questions about this privacy policy, you can contact us at: nathaljanijman@gmail.com</p>
    </div>
  `;
}
__name(generatePrivacyContentEN, "generatePrivacyContentEN");
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
            <li>Het niet misbruiken van de service voor commerci\xEBle doeleinden</li>
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
        <h4>6. Be\xEBindiging</h4>
        <p>Wij kunnen de service te allen tijde be\xEBindigen of uw toegang beperken zonder voorafgaande kennisgeving.</p>
    </div>
    
    <div class="legal-section">
        <h4>7. Toepasselijk recht</h4>
        <p>Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde Nederlandse rechter.</p>
    </div>
  `;
}
__name(generateTermsContentNL, "generateTermsContentNL");
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
__name(generateTermsContentEN, "generateTermsContentEN");

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-scheduled.ts
var scheduled = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  const url = new URL(request.url);
  if (url.pathname === "/__scheduled") {
    const cron = url.searchParams.get("cron") ?? "";
    await middlewareCtx.dispatch("scheduled", { cron });
    return new Response("Ran scheduled event");
  }
  const resp = await middlewareCtx.next(request, env);
  if (request.headers.get("referer")?.endsWith("/__scheduled") && url.pathname === "/favicon.ico" && resp.status === 500) {
    return new Response(null, { status: 404 });
  }
  return resp;
}, "scheduled");
var middleware_scheduled_default = scheduled;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-RpzY5D/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_scheduled_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = cloudflare_app_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-RpzY5D/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=cloudflare_app.js.map
