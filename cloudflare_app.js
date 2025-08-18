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
    added: "Toegevoegd"
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
    added: "Added"
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
  }
};

async function handleDashboard(request, env) {
  try {
    // Get shops from KV storage
    const shops = await getShops(env);
    const config = await getConfig(env);
    const tags = await getTags(env);
    
    // Get user's language preference
    const lang = getLanguage(request);
    const t = getTranslations(lang);
    
    const html = generateDashboardHTML(shops, config, tags, t, lang);
    
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (error) {
    return new Response('Dashboard Error: ' + error.message, { status: 500 });
  }
}

async function handleAddShopPage(request, env) {
  const lang = getLanguage(request);
  const t = getTranslations(lang);
  const html = generateAddShopHTML(t, lang);
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
      sender_email: 'nathaljanijman@gmail.com',
      recipient_email: 'nathaljanijman@gmail.com',
      smtp_server: 'smtp.gmail.com',
      smtp_port: 587
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

function generateDashboardHTML(shops, config, tags, t, lang) {
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DHgate Monitor Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { 
            font-family: 'Raleway', sans-serif; 
            background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%);
            min-height: 100vh;
        }
        .main-header {
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(71, 85, 105, 0.1);
            margin-bottom: 30px;
        }
        .card {
            border: none;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .btn-primary {
            background: linear-gradient(135deg, #1e3a8a, #2563eb);
            border: none;
            font-weight: 600;
        }
        .btn-success {
            background: linear-gradient(45deg, #ff6b35, #ff8c00);
            border: none;
            font-weight: 600;
        }
        .lang-switcher {
            position: absolute;
            top: 20px;
            right: 20px;
        }
        .lang-switcher a {
            margin: 0 5px;
            text-decoration: none;
            color: #6b7280;
            font-weight: 500;
        }
        .lang-switcher a.active {
            color: #1e40af;
            font-weight: 700;
        }
    </style>
</head>
<body>
    <div class="container py-5">
        <div class="lang-switcher">
            <a href="?lang=en" ${lang === 'en' ? 'class="active"' : ''}>🇺🇸 EN</a>
            <a href="?lang=nl" ${lang === 'nl' ? 'class="active"' : ''}>🇳🇱 NL</a>
        </div>
        <div class="main-header p-5 text-center">
            <h1 style="color: #1e40af; font-weight: 700; font-size: 2.5rem; letter-spacing: 2px;">
                ${t.app_title}
            </h1>
            <p class="text-muted">${t.app_description}</p>
        </div>
        
        <div class="row">
            <div class="col-md-8">
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
            
            <div class="col-md-4">
                <div class="card mb-3">
                    <div class="card-header">
                        <h5>${t.actions}</h5>
                    </div>
                    <div class="card-body d-grid gap-2">
                        <a href="/add_shop?lang=${lang}" class="btn btn-success">${t.add_shop}</a>
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
    </div>
</body>
</html>
  `;
}

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
    </style>
</head>
<body>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
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
                                <button type="submit" class="btn btn-primary">${t.add_shop}</button>
                                <a href="/?lang=${lang}" class="btn btn-outline-secondary">${t.back_to_dashboard}</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
</body>
</html>
  `;
}