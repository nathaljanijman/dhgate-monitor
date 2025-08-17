/**
 * Cloudflare Worker - Proxy to Railway Backend
 * Routes dhgate-monitor.com to Railway Python Flask app
 */

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      
      // Backend URL (will be updated with actual Railway URL)
      const BACKEND_URL = env.BACKEND_URL || 'https://dhgate-monitor-production.up.railway.app';
      
      // For root and main paths, proxy to Flask app
      if (url.pathname === '/' || 
          url.pathname.startsWith('/add_shop') ||
          url.pathname.startsWith('/settings') ||
          url.pathname.startsWith('/static/') ||
          url.pathname.startsWith('/api/')) {
        
        // Create new URL with backend host
        const backendUrl = new URL(url.pathname + url.search, BACKEND_URL);
        
        // Clone the request for the backend
        const backendRequest = new Request(backendUrl, {
          method: request.method,
          headers: request.headers,
          body: request.body
        });
        
        // Add custom headers for identification
        backendRequest.headers.set('X-Forwarded-Host', url.hostname);
        backendRequest.headers.set('X-Original-URL', request.url);
        
        try {
          // Fetch from Railway backend
          const response = await fetch(backendRequest);
          
          // Clone response and modify headers if needed
          const modifiedResponse = new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
          });
          
          // Add CORS headers if needed
          modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
          modifiedResponse.headers.set('X-Powered-By', 'Cloudflare Workers + Railway');
          
          return modifiedResponse;
          
        } catch (backendError) {
          console.error('Backend error:', backendError);
          
          // Return fallback maintenance page
          return new Response(getMaintenancePage(), {
            status: 503,
            headers: { 
              'Content-Type': 'text/html',
              'X-Error': 'Backend unavailable'
            }
          });
        }
      }
      
      // Health check endpoint
      if (url.pathname === '/health') {
        return new Response(JSON.stringify({
          status: 'ok',
          service: 'DHgate Monitor',
          backend: BACKEND_URL,
          timestamp: new Date().toISOString()
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Default: show info page
      return new Response(getInfoPage(), {
        headers: { 'Content-Type': 'text/html' }
      });
      
    } catch (error) {
      console.error('Worker error:', error);
      
      return new Response(JSON.stringify({
        error: 'Worker error',
        message: error.message,
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};

function getMaintenancePage() {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DHgate Monitor - Backend Onderhoud</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%);
            font-family: 'Raleway', Arial, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 16px;
            padding: 60px 40px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(71, 85, 105, 0.1);
            max-width: 500px;
            margin: 20px;
        }
        h1 {
            color: #1e40af;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 2px;
            margin: 0 0 20px 0;
        }
        .status {
            background-color: #f8fafc;
            border-left: 4px solid #ff6b35;
            padding: 20px 30px;
            margin: 30px 0;
            text-align: left;
        }
        .status h2 {
            margin: 0 0 8px 0;
            color: #1e293b;
            font-size: 18px;
            font-weight: 600;
        }
        .status p {
            margin: 0;
            color: #64748b;
            font-size: 14px;
        }
        .retry {
            margin-top: 20px;
        }
        .retry button {
            background: linear-gradient(135deg, #1e3a8a, #2563eb);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            font-family: 'Raleway', Arial, sans-serif;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>DHGate monitor</h1>
        <div class="status">
            <h2>🔧 Backend in onderhoud</h2>
            <p>Het systeem wordt momenteel opgestart of onderhouden</p>
        </div>
        <div class="retry">
            <button onclick="window.location.reload()">Opnieuw proberen</button>
        </div>
    </div>
</body>
</html>
  `;
}

function getInfoPage() {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DHgate Monitor - Info</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%);
            font-family: 'Raleway', Arial, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 16px;
            padding: 60px 40px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(71, 85, 105, 0.1);
            max-width: 500px;
            margin: 20px;
        }
        h1 {
            color: #1e40af;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 2px;
            margin: 0 0 20px 0;
        }
        .links {
            margin-top: 30px;
        }
        .links a {
            display: inline-block;
            background: linear-gradient(135deg, #1e3a8a, #2563eb);
            color: white;
            padding: 14px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 10px;
            font-family: 'Raleway', Arial, sans-serif;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>DHGate monitor</h1>
        <p>Automatische kids product monitoring voor DHgate sellers</p>
        <div class="links">
            <a href="/">Dashboard</a>
            <a href="/add_shop">Shop Toevoegen</a>
            <a href="/settings">Instellingen</a>
        </div>
    </div>
</body>
</html>
  `;
}`;