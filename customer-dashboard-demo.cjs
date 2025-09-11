/**
 * Customer Dashboard Demo
 * 
 * Standalone demo to showcase the new customer navigation system
 */

// Import customer navigation system
const fs = require('fs');
const customerNavigationContent = fs.readFileSync('./customer-navigation.js', 'utf8');

// Extract functions from the file content (simple eval approach for demo)
eval(customerNavigationContent);

function generateCustomerDashboardDemo(lang = 'nl', theme = 'light', dashboardKey = 'demo123') {
  const userEmail = 'demo@dhgate-monitor.com';
  const currentRoute = '/dashboard';
  
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DHgate Monitor - Customer Dashboard Demo</title>
    <meta name="robots" content="noindex, nofollow">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    ${generateCustomerNavigationCSS(theme)}
    
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        background: ${theme === 'dark' ? '#0F172A' : '#F8FAFC'};
        color: ${theme === 'dark' ? '#F8FAFC' : '#111827'};
      }
      
      .demo-main {
        margin-left: 280px;
        padding: 2rem;
        min-height: 100vh;
        transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .demo-header {
        background: ${theme === 'dark' ? '#1E293B' : '#FFFFFF'};
        border-radius: 16px;
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 20px ${theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
        border: 1px solid ${theme === 'dark' ? '#334155' : '#E5E7EB'};
      }
      
      .demo-title {
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, #2563EB, #EA580C);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .demo-subtitle {
        font-size: 1.1rem;
        color: ${theme === 'dark' ? '#CBD5E1' : '#6B7280'};
        margin-bottom: 1.5rem;
      }
      
      .demo-features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
      }
      
      .demo-feature {
        background: ${theme === 'dark' ? '#1E293B' : '#FFFFFF'};
        border: 1px solid ${theme === 'dark' ? '#334155' : '#E5E7EB'};
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px ${theme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.08)'};
      }
      
      .demo-feature h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        color: #2563EB;
      }
      
      .demo-feature p {
        color: ${theme === 'dark' ? '#CBD5E1' : '#6B7280'};
        line-height: 1.6;
        margin: 0;
      }
      
      .demo-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: linear-gradient(135deg, #2563EB, #EA580C);
        color: white;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }
      
      .demo-sidebar-collapsed .demo-main {
        margin-left: 72px;
      }
      
      @media (max-width: 1024px) {
        .demo-main {
          margin-left: 0;
          padding: 1rem;
        }
        
        .demo-sidebar-open .demo-main {
          margin-left: 0;
        }
      }
      
      .demo-toggle {
        position: fixed;
        top: 2rem;
        right: 2rem;
        z-index: 1001;
        display: none;
        background: #2563EB;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.75rem;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
      }
      
      @media (max-width: 1024px) {
        .demo-toggle {
          display: block;
        }
      }
    </style>
</head>
<body>
    
    <!-- Customer Navigation Sidebar -->
    ${generateCustomerSidebarNavigation(currentRoute, lang, theme, userEmail).replace('${dashboardKey}', dashboardKey)}
    
    <!-- Mobile Toggle Button -->
    <button class="demo-toggle" data-toggle="customer-mobile-menu" aria-label="Open menu">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
      </svg>
    </button>
    
    <!-- Main Content -->
    <main class="demo-main">
      <div class="demo-header">
        <div class="demo-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          Demo Dashboard
        </div>
        
        <h1 class="demo-title">Customer Dashboard Navigation</h1>
        <p class="demo-subtitle">
          Nieuwe customer-gerichte navigation met moderne UX, toegankelijkheid en brand consistentie.
          Geoptimaliseerd voor shop management, product tracking en analytics.
        </p>
        
        <div class="demo-features">
          <div class="demo-feature">
            <h3>🏪 Shop Management Focus</h3>
            <p>Primaire focus op shop beheer met dedicated secties voor het toevoegen van shops, analytics per shop, en overzicht van alle DHgate activiteiten.</p>
          </div>
          
          <div class="demo-feature">
            <h3>📦 Product Tracking</h3>
            <p>Gespecialiseerde product monitoring met trending analysis, concurrent vergelijking en uitgebreide product categorieën.</p>
          </div>
          
          <div class="demo-feature">
            <h3>🔔 Smart Alerts</h3>
            <p>Intelligente alert systemen voor prijs wijzigingen, voorraad updates en keyword monitoring met real-time notificaties.</p>
          </div>
          
          <div class="demo-feature">
            <h3>📊 Customer Analytics</h3>
            <p>Customer-specifieke analytics dashboard met performance metrics, market trends en gedetailleerde rapporten voor zakelijke inzichten.</p>
          </div>
          
          <div class="demo-feature">
            <h3>⚙️ Account Management</h3>
            <p>Volledige account controle met profiel instellingen, notificatie voorkeuren, facturatie beheer en API toegang.</p>
          </div>
          
          <div class="demo-feature">
            <h3>♿ Accessibility First</h3>
            <p>WCAG 2.1 compliant met screen reader support, keyboard navigation, focus management en high contrast mode ondersteuning.</p>
          </div>
        </div>
      </div>
    </main>
    
    ${generateCustomerNavigationJS()}
    
    <script>
      // Demo-specific enhancements
      document.addEventListener('DOMContentLoaded', function() {
        const sidebar = document.querySelector('.customer-dashboard-sidebar');
        const main = document.querySelector('.demo-main');
        const body = document.body;
        
        // Track sidebar state for demo
        const sidebarToggle = document.querySelector('[data-toggle-sidebar]');
        if (sidebarToggle) {
          sidebarToggle.addEventListener('click', function() {
            if (sidebar.classList.contains('collapsed')) {
              body.classList.add('demo-sidebar-collapsed');
            } else {
              body.classList.remove('demo-sidebar-collapsed');
            }
          });
        }
        
        // Mobile demo handling
        const mobileToggle = document.querySelector('[data-toggle="customer-mobile-menu"]');
        if (mobileToggle) {
          mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            body.classList.toggle('demo-sidebar-open');
          });
        }
      });
    </script>
</body>
</html>
  `;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateCustomerDashboardDemo };
}

// Test generation if run directly
if (require.main === module) {
  console.log('Generating customer dashboard demo...');
  const html = generateCustomerDashboardDemo();
  fs.writeFileSync('./customer-dashboard-demo.html', html);
  console.log('Demo saved to customer-dashboard-demo.html');
}