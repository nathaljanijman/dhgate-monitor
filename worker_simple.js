/**
 * Cloudflare Worker - Simple Proxy to External Host
 * This worker proxies requests to an external hosting service
 */

export default {
  async fetch(request, env, ctx) {
    try {
      // Get the URL from the request
      const url = new URL(request.url);
      
      // For now, redirect to the GitHub repository or show a maintenance page
      if (url.pathname === '/' || url.pathname === '') {
        return new Response(getMaintenancePage(), {
          headers: { 'Content-Type': 'text/html' },
          status: 200
        });
      }
      
      // For API routes, return JSON response
      if (url.pathname.startsWith('/api/')) {
        return new Response(JSON.stringify({
          message: "DHgate Monitor API - Under maintenance",
          status: "maintenance",
          contact: "nathaljanijman@gmail.com"
        }), {
          headers: { 'Content-Type': 'application/json' },
          status: 503
        });
      }
      
      // Default response
      return new Response(getMaintenancePage(), {
        headers: { 'Content-Type': 'text/html' },
        status: 503
      });
      
    } catch (error) {
      return new Response(`Worker Error: ${error.message}`, {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
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
    <title>DHgate Monitor - In Onderhoud</title>
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
        .contact {
            margin-top: 30px;
            color: #64748b;
            font-size: 14px;
        }
        .contact a {
            color: #1e40af;
            text-decoration: none;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>DHGate monitor</h1>
        <div class="status">
            <h2>🔧 Systeem in onderhoud</h2>
            <p>We werken aan verbeteringen voor de beste gebruikerservaring</p>
        </div>
        <div class="contact">
            <p>Voor vragen: <a href="mailto:nathaljanijman@gmail.com">nathaljanijman@gmail.com</a></p>
            <p>Verwachte online tijd: Binnenkort</p>
        </div>
    </div>
</body>
</html>
  `;
}`;