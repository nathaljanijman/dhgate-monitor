// ============================================================================
// EMBEDDABLE DHGATE MONITOR SIGNUP WIDGET
// ============================================================================
// Standalone signup form that can be embedded via iframe on any website

import { generateEnhancedStoreBrowser } from './enhanced_store_browser_clean.js';

export function generateSignupWidget(env, lang = 'nl', theme = 'light') {
  const widgetId = 'dhgate-signup-widget-' + Date.now();
  
  return `<!DOCTYPE html>
<html lang="${lang}" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DHgate Monitor - ${lang === 'nl' ? 'Aanmelden' : 'Sign Up'}</title>
    
    <!-- Prevent embedding in non-authorized domains (optional security) -->
    <meta http-equiv="Content-Security-Policy" content="frame-ancestors 'self' *.dhgate-monitor.com;">
    
    <style>
        /* WIDGET-SPECIFIC RESET AND STYLING */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            /* DHgate Monitor Design System Colors */
            --primary-blue: #2563eb;
            --primary-blue-hover: #1d4ed8;
            --accent-color: #2563eb;
            --accent-color-rgb: 37, 99, 235;
            --success: #10b981;
            --warning: #f59e0b;
            --error: #ef4444;
            
            /* Theme Colors */
            --bg-primary: ${theme === 'dark' ? '#0f172a' : '#ffffff'};
            --bg-secondary: ${theme === 'dark' ? '#1e293b' : '#f8fafc'};
            --card-bg: ${theme === 'dark' ? '#1e293b' : '#ffffff'};
            --text-primary: ${theme === 'dark' ? '#f1f5f9' : '#1e293b'};
            --text-secondary: ${theme === 'dark' ? '#94a3b8' : '#64748b'};
            --text-muted: ${theme === 'dark' ? '#64748b' : '#94a3b8'};
            --border-light: ${theme === 'dark' ? '#334155' : '#e2e8f0'};
            --border-medium: ${theme === 'dark' ? '#475569' : '#cbd5e1'};
            --card-shadow: ${theme === 'dark' ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'};
        }
        
        /* Import Raleway font */
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap');
        
        body {
            font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            padding: 0;
            margin: 0;
            min-height: 100vh;
        }
        
        /* WIDGET CONTAINER */
        .signup-widget {
            max-width: 100%;
            width: 100%;
            min-height: 100vh;
            background: var(--bg-primary);
            padding: 2rem 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
        }
        
        .widget-header {
            text-align: center;
            margin-bottom: 2rem;
            max-width: 600px;
        }
        
        .widget-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
            letter-spacing: -0.02em;
        }
        
        .widget-subtitle {
            font-size: 1.1rem;
            color: var(--text-secondary);
            margin: 0;
        }
        
        .widget-form-container {
            width: 100%;
            max-width: 900px;
            background: var(--card-bg);
            border-radius: 20px;
            border: 1px solid var(--border-light);
            box-shadow: var(--card-shadow);
            overflow: hidden;
        }
        
        /* RESPONSIVE DESIGN */
        @media (max-width: 768px) {
            .signup-widget {
                padding: 1rem 0.5rem;
                min-height: 100vh;
            }
            
            .widget-title {
                font-size: 2rem;
            }
            
            .widget-subtitle {
                font-size: 1rem;
            }
            
            .widget-form-container {
                border-radius: 16px;
            }
        }
        
        /* IFRAME SPECIFIC ADJUSTMENTS */
        @media (max-width: 600px) {
            .signup-widget {
                padding: 1rem 0.25rem;
            }
        }
        
        /* WIDGET BRANDING */
        .widget-footer {
            margin-top: 2rem;
            text-align: center;
            padding: 1rem;
            font-size: 0.875rem;
            color: var(--text-muted);
        }
        
        .widget-footer a {
            color: var(--accent-color);
            text-decoration: none;
        }
        
        .widget-footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="signup-widget" id="${widgetId}">
        <!-- Widget Header -->
        <div class="widget-header">
            <h1 class="widget-title">
                ${lang === 'nl' ? 'Monitor DHgate Products' : 'Monitor DHgate Products'}
            </h1>
            <p class="widget-subtitle">
                ${lang === 'nl' ? 
                    'Ontvang alerts wanneer nieuwe trending producten worden gevonden' : 
                    'Get alerts when new trending products are found'
                }
            </p>
        </div>
        
        <!-- Signup Form Container -->
        <div class="widget-form-container">
            ${generateSignupForm(lang, theme)}
        </div>
        
        <!-- Widget Footer -->
        <div class="widget-footer">
            ${lang === 'nl' ? 'Powered by' : 'Powered by'} 
            <a href="https://dhgate-monitor.com" target="_parent">DHgate Monitor</a>
        </div>
    </div>
    
    <!-- Widget JavaScript -->
    <script>
        // Widget-specific JavaScript
        console.log('DHgate Monitor Signup Widget loaded');
        
        // Post message to parent window when form is submitted
        function notifyParent(eventType, data) {
            if (window.parent !== window) {
                window.parent.postMessage({
                    type: 'dhgate-monitor-widget',
                    event: eventType,
                    data: data
                }, '*');
            }
        }
        
        // Handle successful signup
        function onSignupSuccess(data) {
            notifyParent('signup-success', data);
            
            // Show success message in widget
            const container = document.querySelector('.widget-form-container');
            container.innerHTML = \`
                <div style="padding: 3rem 2rem; text-align: center;">
                    <div style="width: 64px; height: 64px; background: var(--success); border-radius: 50%; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center;">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                            <path d="M20 6L9 17l-5-5"/>
                        </svg>
                    </div>
                    <h2 style="color: var(--text-primary); margin-bottom: 1rem;">
                        ${lang === 'nl' ? 'Succesvol aangemeld!' : 'Successfully signed up!'}
                    </h2>
                    <p style="color: var(--text-secondary);">
                        ${lang === 'nl' ? 
                            'Je ontvangt een email zodra nieuwe producten worden gevonden.' : 
                            'You will receive an email when new products are found.'
                        }
                    </p>
                </div>
            \`;
        }
        
        // Widget resize handling
        function resizeWidget() {
            const height = document.body.scrollHeight;
            notifyParent('resize', { height: height });
        }
        
        // Initialize widget
        window.addEventListener('load', function() {
            resizeWidget();
            
            // Listen for form changes to resize
            const form = document.getElementById('widget-signup-form');
            if (form) {
                const observer = new MutationObserver(resizeWidget);
                observer.observe(form, { childList: true, subtree: true });
            }
        });
        
        // Expose functions globally for form interaction
        window.widgetOnSignupSuccess = onSignupSuccess;
        window.widgetNotifyParent = notifyParent;
    </script>
</body>
</html>`;
}

function generateSignupForm(lang, theme) {
  const t = lang === 'nl' ? {
    step1: 'Email adres',
    step1Desc: 'We sturen je alerts wanneer nieuwe producten worden gevonden',
    step2: 'Kies je winkel',
    step2Desc: 'Selecteer de winkel die je wilt monitoren',
    step3: 'Zoektermen',
    step3Desc: 'Producten met deze woorden worden gemonitord',
    step4: 'Bevestiging',
    step4Desc: 'Controleer je instellingen en start monitoring',
    nextBtn: 'Volgende',
    prevBtn: 'Vorige',
    startBtn: 'Start Monitoring',
    emailPlaceholder: 'jouw@email.com',
    tagsPlaceholder: 'jersey, shirt, voetbal',
    tagsHelp: 'We controleren producttitels en beschrijvingen op deze woorden'
  } : {
    step1: 'Email address',
    step1Desc: 'We will send you alerts when new products are found',
    step2: 'Choose your store', 
    step2Desc: 'Select the store you want to monitor',
    step3: 'Search terms',
    step3Desc: 'Products with these words will be monitored',
    step4: 'Confirmation',
    step4Desc: 'Review your settings and start monitoring',
    nextBtn: 'Next',
    prevBtn: 'Previous', 
    startBtn: 'Start Monitoring',
    emailPlaceholder: 'your@email.com',
    tagsPlaceholder: 'jersey, shirt, soccer',
    tagsHelp: 'We will check product titles and descriptions for these words'
  };

  return `
    <div class="widget-signup-container" style="padding: 1.5rem 2rem;">
      <!-- Progress Indicator -->
      <div class="widget-progress">
        <div class="progress-bar">
          <div class="progress-fill" id="widgetProgressFill" style="width: 25%;"></div>
        </div>
        <div class="progress-steps">
          <div class="progress-step active" data-step="1">
            <div class="step-circle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <span class="step-label">${t.step1}</span>
          </div>
          <div class="progress-step" data-step="2">
            <div class="step-circle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="currentColor" stroke-width="2"/>
                <polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <span class="step-label">${t.step2}</span>
          </div>
          <div class="progress-step" data-step="3">
            <div class="step-circle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <span class="step-label">${t.step3}</span>
          </div>
          <div class="progress-step" data-step="4">
            <div class="step-circle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <span class="step-label">${t.step4}</span>
          </div>
        </div>
      </div>
      
      <!-- Form Steps -->
      <form id="widgetStepForm" class="widget-form">
        <!-- Step 1: Email -->
        <div class="widget-step active" data-step="1">
          <div class="step-content">
            <h3 class="step-title">${t.step1}</h3>
            <p class="step-description">${t.step1Desc}</p>
            
            <div class="form-group compact">
              <input 
                type="email" 
                id="widget-email" 
                name="email" 
                class="widget-input large-input"
                placeholder="${t.emailPlaceholder}"
                required
              >
            </div>
          </div>
          
          <div class="step-actions">
            <button type="button" class="btn-next" onclick="nextWidgetStep()">${t.nextBtn}</button>
          </div>
        </div>
        
        <!-- Step 2: Store Selection -->
        <div class="widget-step" data-step="2">
          <div class="step-content">
            <h3 class="step-title">${t.step2}</h3>
            <p class="step-description">${lang === 'nl' ? 'Selecteer een of meerdere winkels die je wilt monitoren' : 'Select one or multiple stores you want to monitor'}</p>
            
            <!-- Selection Counter -->
            <div id="store-selection-counter" class="selection-counter" style="display: none;">
              <span class="counter-text"></span>
            </div>
            
${generateWidgetStoreBrowser(lang, theme)}
          </div>
          
          <div class="step-actions">
            <button type="button" class="btn-prev" onclick="prevWidgetStep()">${t.prevBtn}</button>
            <button type="button" class="btn-next" onclick="nextWidgetStep()">${t.nextBtn}</button>
          </div>
        </div>
        
        <!-- Step 3: Search Terms -->
        <div class="widget-step" data-step="3">
          <div class="step-content">
            <h3 class="step-title">${t.step3}</h3>
            <p class="step-description">${lang === 'nl' ? 'Welke producten wil je monitoren? Voeg zoektermen toe om specifieke producten te vinden' : 'Which products do you want to monitor? Add search terms to find specific products'}</p>
            
            <!-- Smart Tags Input -->
            <div class="tags-input-container">
              <div class="tags-input-wrapper">
                <div id="tags-display" class="tags-display"></div>
                <input 
                  type="text" 
                  id="widget-tags-input" 
                  class="widget-input tags-input"
                  placeholder="${lang === 'nl' ? 'Typ een zoekterm en druk op Enter...' : 'Type a search term and press Enter...'}"
                >
              </div>
              
              <!-- Popular Tags Suggestions -->
              <div class="popular-tags">
                <h4 class="popular-tags-title">${lang === 'nl' ? 'Populaire zoektermen:' : 'Popular search terms:'}</h4>
                <div class="tags-suggestions">
                  <button type="button" class="tag-suggestion" onclick="addTag('jersey')">jersey</button>
                  <button type="button" class="tag-suggestion" onclick="addTag('shirt')">shirt</button>
                  <button type="button" class="tag-suggestion" onclick="addTag('sneakers')">sneakers</button>
                  <button type="button" class="tag-suggestion" onclick="addTag('handbag')">handbag</button>
                  <button type="button" class="tag-suggestion" onclick="addTag('watch')">watch</button>
                  <button type="button" class="tag-suggestion" onclick="addTag('phone')">phone</button>
                  <button type="button" class="tag-suggestion" onclick="addTag('dress')">dress</button>
                  <button type="button" class="tag-suggestion" onclick="addTag('jacket')">jacket</button>
                </div>
              </div>
              
              <!-- Hidden input for form submission -->
              <input type="hidden" id="widget-tags" name="tags" required>
            </div>
            
            <div class="form-help">
              ${lang === 'nl' ? 
                '💡 Tip: Voeg meerdere zoektermen toe voor betere resultaten. We controleren producttitels, beschrijvingen en categorieën.' : 
                '💡 Tip: Add multiple search terms for better results. We check product titles, descriptions and categories.'
              }
            </div>
          </div>
          
          <div class="step-actions">
            <button type="button" class="btn-prev" onclick="prevWidgetStep()">${t.prevBtn}</button>
            <button type="button" class="btn-next" onclick="nextWidgetStep()">${t.nextBtn}</button>
          </div>
        </div>
        
        <!-- Step 4: Confirmation -->
        <div class="widget-step" data-step="4">
          <div class="step-content">
            <h3 class="step-title">${t.step4}</h3>
            <p class="step-description">${lang === 'nl' ? 'Controleer je instellingen en start monitoring' : 'Review your settings and start monitoring'}</p>
            
            <div class="summary-card">
              <!-- Email Summary -->
              <div class="summary-section">
                <div class="summary-header">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <h4>${lang === 'nl' ? 'Email Notificaties' : 'Email Notifications'}</h4>
                </div>
                <div class="summary-content">
                  <span id="summary-email"></span>
                </div>
              </div>
              
              <!-- Stores Summary -->
              <div class="summary-section">
                <div class="summary-header">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                  </svg>
                  <h4>${lang === 'nl' ? 'Gemonitorde Winkels' : 'Monitored Stores'}</h4>
                  <span class="store-count" id="summary-store-count"></span>
                </div>
                <div class="summary-content" id="summary-stores-list">
                  <!-- Stores will be populated here -->
                </div>
              </div>
              
              <!-- Tags Summary -->
              <div class="summary-section">
                <div class="summary-header">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                  </svg>
                  <h4>${lang === 'nl' ? 'Zoektermen' : 'Search Terms'}</h4>
                  <span class="tags-count" id="summary-tags-count"></span>
                </div>
                <div class="summary-content" id="summary-tags-list">
                  <!-- Tags will be populated here -->
                </div>
              </div>
              
              <!-- Monitoring Info -->
              <div class="monitoring-info">
                <div class="info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <span>${lang === 'nl' ? '24/7 monitoring van nieuwe producten' : '24/7 monitoring of new products'}</span>
                </div>
                <div class="info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>${lang === 'nl' ? 'Directe email notificaties' : 'Direct email notifications'}</span>
                </div>
                <div class="info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                    <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                  </svg>
                  <span>${lang === 'nl' ? 'Gratis en zonder verplichtingen' : 'Free and no obligations'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="step-actions">
            <button type="button" class="btn-prev" onclick="prevWidgetStep()">${t.prevBtn}</button>
            <button type="submit" class="btn-submit" onclick="submitWidgetForm()">${t.startBtn}</button>
          </div>
        </div>
      </form>
    </div>
    
    <style>
      /* WIDGET STEP STYLING */
      .widget-progress {
        margin-bottom: 1.5rem;
      }
      
      .progress-bar {
        height: 6px;
        background: rgba(37, 99, 235, 0.1);
        border-radius: 3px;
        margin-bottom: 1rem;
        overflow: hidden;
      }
      
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--accent-color) 0%, #3b82f6 100%);
        border-radius: 3px;
        transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .progress-steps {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .progress-step {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }
      
      .step-circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--bg-primary);
        border: 2px solid rgba(37, 99, 235, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-muted);
        transition: all 0.3s ease;
      }
      
      .progress-step.active .step-circle {
        background: var(--accent-color);
        border-color: var(--accent-color);
        color: white;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
      }
      
      .progress-step.completed .step-circle {
        background: #10b981;
        border-color: #10b981;
        color: white;
      }
      
      .step-label {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-muted);
        text-align: center;
        transition: color 0.3s ease;
      }
      
      .progress-step.active .step-label {
        color: var(--accent-color);
      }
      
      .progress-step.completed .step-label {
        color: #10b981;
      }
      
      .widget-form {
        position: relative;
        min-height: 200px;
      }
      
      /* Much more compact for step 1 */
      .widget-step[data-step="1"] {
        min-height: 150px;
      }
      
      .widget-step {
        display: none;
        opacity: 0;
        transform: translateX(30px);
        transition: all 0.3s ease;
      }
      
      .widget-step.active {
        display: block;
        opacity: 1;
        transform: translateX(0);
      }
      
      .step-content {
        margin-bottom: 1.5rem;
      }
      
      /* Specific styling for step 1 to make it more compact */
      .widget-step[data-step="1"] .step-content {
        margin-bottom: 0.5rem;
      }
      
      .widget-step[data-step="1"] .step-description {
        margin-bottom: 0.75rem !important;
      }
      
      .widget-step[data-step="1"] .step-title {
        margin-bottom: 0.25rem !important;
      }
      
      .step-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0 0 0.5rem 0;
      }
      
      .step-description {
        color: var(--text-secondary);
        margin: 0 0 1.5rem 0;
        line-height: 1.5;
        font-size: 0.95rem;
      }
      
      .widget-input {
        width: 100%;
        padding: 0.875rem 1rem;
        border: 1px solid var(--border-light);
        border-radius: 8px;
        background: var(--bg-primary);
        color: var(--text-primary);
        font-size: 1rem;
        transition: all 0.2s ease;
      }
      
      .widget-input:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
      }
      
      /* Compact form styling for step 1 */
      .form-group.compact {
        margin-bottom: 0;
      }
      
      .large-input {
        padding: 1rem 1.25rem;
        font-size: 1.1rem;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }
      
      .large-input:focus {
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1), 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      
      .form-help {
        font-size: 0.875rem;
        color: var(--text-muted);
        margin-top: 0.5rem;
        line-height: 1.4;
      }
      
      .step-actions {
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        align-items: center;
      }
      
      .btn-prev, .btn-next, .btn-submit {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.9rem;
      }
      
      .btn-prev {
        background: transparent;
        color: var(--text-secondary);
        border: 1px solid var(--border-medium);
      }
      
      .btn-prev:hover {
        background: var(--bg-secondary);
        color: var(--text-primary);
      }
      
      .btn-next, .btn-submit {
        background: var(--accent-color);
        color: white;
        margin-left: auto;
      }
      
      .btn-next:hover, .btn-submit:hover {
        background: var(--primary-blue-hover);
        transform: translateY(-1px);
      }
      
      .summary-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-light);
        border-radius: 12px;
        padding: 1.5rem;
      }
      
      .summary-section {
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--border-light);
      }
      
      .summary-section:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }
      
      .summary-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
        color: var(--text-primary);
      }
      
      .summary-header svg {
        color: var(--accent-color);
      }
      
      .summary-header h4 {
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
        flex: 1;
      }
      
      .store-count, .tags-count {
        background: var(--accent-color);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
      }
      
      .summary-content {
        color: var(--text-secondary);
        line-height: 1.5;
      }
      
      .summary-stores {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .summary-store-item {
        background: rgba(37, 99, 235, 0.1);
        border: 1px solid rgba(37, 99, 235, 0.2);
        border-radius: 8px;
        padding: 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .summary-store-item svg {
        color: var(--accent-color);
        flex-shrink: 0;
      }
      
      .summary-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      
      .summary-tag {
        background: var(--accent-color);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.875rem;
        font-weight: 500;
      }
      
      .monitoring-info {
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.2);
        border-radius: 8px;
        padding: 1rem;
        margin-top: 1.5rem;
      }
      
      .info-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        color: var(--text-secondary);
        font-size: 0.875rem;
      }
      
      .info-item:last-child {
        margin-bottom: 0;
      }
      
      .info-item svg {
        color: #10b981;
        flex-shrink: 0;
      }
      
      .summary-item {
        margin-bottom: 0.75rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid var(--border-light);
      }
      
      .summary-item:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }
      
      .summary-item strong {
        color: var(--text-primary);
        margin-right: 0.5rem;
      }
      
      .summary-item span {
        color: var(--text-secondary);
      }
      
      @media (max-width: 768px) {
        .progress-steps {
          gap: 0.5rem;
        }
        
        .step-circle {
          width: 36px;
          height: 36px;
        }
        
        .step-label {
          font-size: 0.7rem;
        }
        
        .step-title {
          font-size: 1.25rem;
        }
        
        .step-actions {
          flex-direction: column-reverse;
          gap: 0.75rem;
        }
        
        .btn-prev, .btn-next, .btn-submit {
          width: 100%;
        }
      }
    </style>
    
    <script>
      let currentWidgetStep = 1;
      const totalSteps = 4;
      
      function updateWidgetProgress(step) {
        const progressFill = document.getElementById('widgetProgressFill');
        const progressPercentage = (step / totalSteps) * 100;
        progressFill.style.width = progressPercentage + '%';
        
        document.querySelectorAll('.progress-step').forEach((stepEl, index) => {
          const stepNumber = index + 1;
          stepEl.classList.remove('active', 'completed');
          
          if (stepNumber === step) {
            stepEl.classList.add('active');
          } else if (stepNumber < step) {
            stepEl.classList.add('completed');
          }
        });
      }
      
      window.nextWidgetStep = function() {
        // Validate current step
        if (currentWidgetStep === 1) {
          const email = document.getElementById('widget-email').value;
          if (!email || !email.includes('@')) {
            alert('${lang === 'nl' ? 'Voer een geldig email adres in' : 'Please enter a valid email address'}');
            return;
          }
        } else if (currentWidgetStep === 2) {
          const storeUrl = document.getElementById('selected_store_url')?.value || '';
          if (!storeUrl) {
            alert('${lang === 'nl' ? 'Selecteer minimaal één winkel' : 'Please select at least one store'}');
            return;
          }
        } else if (currentWidgetStep === 3) {
          const tags = document.getElementById('widget-tags').value;
          if (!tags.trim()) {
            alert('${lang === 'nl' ? 'Voer minimaal één zoekterm in' : 'Please enter at least one search term'}');
            return;
          }
        }
        
        if (currentWidgetStep < totalSteps) {
          // Hide current step
          document.querySelector('.widget-step[data-step="' + currentWidgetStep + '"]').classList.remove('active');
          
          // Show next step
          currentWidgetStep++;
          updateWidgetProgress(currentWidgetStep);
          
          setTimeout(() => {
            document.querySelector('.widget-step[data-step="' + currentWidgetStep + '"]').classList.add('active');
            
            // Update summary on step 4
            if (currentWidgetStep === 4) {
              updateSummary();
            }
          }, 150);
        }
      };
      
      window.prevWidgetStep = function() {
        if (currentWidgetStep > 1) {
          document.querySelector('.widget-step[data-step="' + currentWidgetStep + '"]').classList.remove('active');
          
          currentWidgetStep--;
          updateWidgetProgress(currentWidgetStep);
          
          setTimeout(() => {
            document.querySelector('.widget-step[data-step="' + currentWidgetStep + '"]').classList.add('active');
          }, 150);
        }
      };
      
      function updateSummary() {
        const email = document.getElementById('widget-email').value;
        const tags = document.getElementById('widget-tags').value;
        const storeUrl = document.getElementById('selected_store_url')?.value || '';
        const storeName = document.getElementById('selected_store_name')?.value || storeUrl;
        
        // Update email
        document.getElementById('summary-email').textContent = email;
        
        // Update stores summary
        updateStoresSummary(storeUrl, storeName);
        
        // Update tags summary
        updateTagsSummary(tags);
      }
      
      function updateStoresSummary(storeUrl, storeName) {
        const storesList = document.getElementById('summary-stores-list');
        const storeCount = document.getElementById('summary-store-count');
        
        if (storeUrl.startsWith('[')) {
          // Multiple stores (JSON array)
          try {
            const storeUrls = JSON.parse(storeUrl);
            const storeNames = storeName.split(', ');
            
            storeCount.textContent = storeNames.length + ' ${lang === 'nl' ? 'winkels' : 'stores'}';
            
            storesList.innerHTML = storeNames.map((name, index) => 
              '<div class="summary-store-item">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                  '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>' +
                  '<polyline points="3.27,6.96 12,12.01 20.73,6.96"/>' +
                '</svg>' +
                '<span>' + name + '</span>' +
              '</div>'
            ).join('');
          } catch (e) {
            storeCount.textContent = '1 ${lang === 'nl' ? 'winkel' : 'store'}';
            storesList.innerHTML = 
              '<div class="summary-store-item">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                  '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>' +
                  '<polyline points="3.27,6.96 12,12.01 20.73,6.96"/>' +
                '</svg>' +
                '<span>' + storeName + '</span>' +
              '</div>';
          }
        } else {
          // Single store
          storeCount.textContent = '1 ${lang === 'nl' ? 'winkel' : 'store'}';
          storesList.innerHTML = 
            '<div class="summary-store-item">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>' +
                '<polyline points="3.27,6.96 12,12.01 20.73,6.96"/>' +
              '</svg>' +
              '<span>' + storeName + '</span>' +
            '</div>';
        }
      }
      
      function updateTagsSummary(tags) {
        const tagsList = document.getElementById('summary-tags-list');
        const tagsCount = document.getElementById('summary-tags-count');
        
        if (tags) {
          const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
          tagsCount.textContent = tagsArray.length + ' ${lang === 'nl' ? 'termen' : 'terms'}';
          
          tagsList.innerHTML = tagsArray.map(tag => 
            '<span class="summary-tag">' + tag + '</span>'
          ).join('');
        } else {
          tagsCount.textContent = '0 ${lang === 'nl' ? 'termen' : 'terms'}';
          tagsList.innerHTML = '<span style="color: var(--text-muted); font-style: italic;">${lang === 'nl' ? 'Geen zoektermen toegevoegd' : 'No search terms added'}</span>';
        }
      }
      
      function submitWidgetForm() {
        const email = document.getElementById('widget-email').value;
        const tags = document.getElementById('widget-tags').value;
        const storeUrl = document.getElementById('selected_store_url')?.value || '';
        
        console.log('Widget form submitted:', { email, tags, storeUrl });
        
        if (window.widgetOnSignupSuccess) {
          setTimeout(() => {
            window.widgetOnSignupSuccess({ email, tags, storeUrl });
          }, 1000);
        }
      }
      
      // Initialize
      updateWidgetProgress(1);
    </script>
  `;
}

// Widget-specific store browser
function generateWidgetStoreBrowser(lang, theme) {
  const featuredStores = [
    {
      id: 1,
      name: 'ECOBAG Store',
      url: 'https://www.dhgate.com/store/20062391',
      rating: 4.9,
      reviews: 8547,
      products: 2834,
      category: lang === 'nl' ? 'Mode & Tassen' : 'Fashion & Bags',
      description: lang === 'nl' ? 'Luxe handtassen en mode accessoires' : 'Luxury handbags and fashion accessories',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop&auto=format',
      color: '#fef3e2',
      // Added compelling information for users
      monthlySales: lang === 'nl' ? '2.847 verkopen deze maand' : '2,847 sales this month',
      topProduct: lang === 'nl' ? 'Designer handtas €45-€89' : 'Designer handbag €45-€89',
      shippingTime: lang === 'nl' ? '7-12 dagen levering' : '7-12 days shipping',
      returnRate: lang === 'nl' ? '98% tevreden klanten' : '98% satisfied customers'
    },
    {
      id: 2,
      name: 'Global Technology',
      url: 'https://www.dhgate.com/store/19998142',
      rating: 4.8,
      reviews: 12456,
      products: 5467,
      category: lang === 'nl' ? 'Elektronica' : 'Electronics',
      description: lang === 'nl' ? 'Telefoons, gadgets en elektronica' : 'Phones, gadgets and electronics',
      image: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=300&h=200&fit=crop&auto=format',
      color: '#e8f5e8',
      monthlySales: lang === 'nl' ? '5.234 verkopen deze maand' : '5,234 sales this month',
      topProduct: lang === 'nl' ? 'Smartphone €89-€156' : 'Smartphone €89-€156',
      shippingTime: lang === 'nl' ? '5-10 dagen levering' : '5-10 days shipping',
      returnRate: lang === 'nl' ? '96% tevreden klanten' : '96% satisfied customers'
    },
    {
      id: 3,
      name: 'Watch World',
      url: 'https://www.dhgate.com/store/20283981',
      rating: 4.7,
      reviews: 6789,
      products: 1234,
      category: lang === 'nl' ? 'Horloges' : 'Watches',
      description: lang === 'nl' ? 'Premium horloges en sieraden' : 'Premium watches and jewelry',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop&auto=format',
      color: '#f0f9ff',
      monthlySales: lang === 'nl' ? '1.567 verkopen deze maand' : '1,567 sales this month',
      topProduct: lang === 'nl' ? 'Luxe horloge €67-€123' : 'Luxury watch €67-€123',
      shippingTime: lang === 'nl' ? '8-15 dagen levering' : '8-15 days shipping',
      returnRate: lang === 'nl' ? '99% tevreden klanten' : '99% satisfied customers'
    },
    {
      id: 4,
      name: 'Sports Authority',
      url: 'https://www.dhgate.com/store/20147638',
      rating: 4.6,
      reviews: 4321,
      products: 3456,
      category: lang === 'nl' ? 'Sport & Outdoor' : 'Sports & Outdoors',
      description: lang === 'nl' ? 'Sportkleding en sneakers' : 'Sports apparel and sneakers',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&auto=format',
      color: '#fdf2f8',
      monthlySales: lang === 'nl' ? '3.892 verkopen deze maand' : '3,892 sales this month',
      topProduct: lang === 'nl' ? 'Sneakers €34-€78' : 'Sneakers €34-€78',
      shippingTime: lang === 'nl' ? '6-11 dagen levering' : '6-11 days shipping',
      returnRate: lang === 'nl' ? '97% tevreden klanten' : '97% satisfied customers'
    }
  ];

  const t = lang === 'nl' ? {
    title: 'Kies je winkel',
    addCustomTitle: 'Eigen winkel toevoegen',
    addCustomDescription: 'Monitor elke DHgate winkel door de URL in te voeren',
    addStorePlaceholder: 'https://www.dhgate.com/store/jouw-winkel',
    addStoreButton: 'Winkel toevoegen'
  } : {
    title: 'Select a store',
    addCustomTitle: 'Add custom store',
    addCustomDescription: 'Monitor any DHgate store by entering its URL',
    addStorePlaceholder: 'https://www.dhgate.com/store/your-store',
    addStoreButton: 'Add store'
  };

  return `
    <div class="widget-store-browser">
      <!-- Store Tiles -->
      <div class="widget-store-grid">
        ${featuredStores.map((store, index) => `
          <div class="widget-store-tile" data-store-id="${store.id}" style="background-color: ${store.color};" data-store-click="${store.id}">
            <div class="tile-image">
              <img src="${store.image}" alt="${store.name}" class="store-image" loading="lazy">
              <div class="tile-overlay">
                <div class="tile-rating">
                  <span class="rating-value">${store.rating}</span>
                  <span class="rating-reviews">${store.reviews}</span>
                </div>
              </div>
            </div>
            <div class="tile-body">
              <div class="tile-header">
                <h4 class="tile-title">${store.name}</h4>
                <div class="tile-category">${store.category}</div>
              </div>
              <p class="tile-description">${store.description}</p>
              
              <!-- Enhanced store information -->
              <div class="tile-enhanced-stats">
                <div class="stat-row">
                  <span class="stat-label">${lang === 'nl' ? 'Verkopen:' : 'Sales:'}</span>
                  <span class="stat-value">${store.monthlySales}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">${lang === 'nl' ? 'Top product:' : 'Top product:'}</span>
                  <span class="stat-value">${store.topProduct}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">${lang === 'nl' ? 'Levering:' : 'Shipping:'}</span>
                  <span class="stat-value">${store.shippingTime}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">${lang === 'nl' ? 'Tevredenheid:' : 'Satisfaction:'}</span>
                  <span class="stat-value">${store.returnRate}</span>
                </div>
              </div>
              
              <div class="tile-stats">
                <span class="products-count">${store.products.toLocaleString()} ${lang === 'nl' ? 'producten' : 'products'}</span>
              </div>
            </div>
            <div class="tile-check hidden" id="check-${store.id}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="white" stroke-width="2"/>
              </svg>
            </div>
          </div>
        `).join('')}
      </div>
      
      <!-- Custom Store Input -->
      <div class="custom-store-section">
        <h4 class="custom-title">${t.addCustomTitle}</h4>
        <p class="custom-description">${t.addCustomDescription}</p>
        
        <div class="custom-input-group">
          <input 
            type="url" 
            id="widget-custom-store" 
            class="custom-store-input" 
            placeholder="${t.addStorePlaceholder}"
          >
          <button type="button" class="custom-store-btn" id="add-custom-store-btn">
            ${t.addStoreButton}
          </button>
        </div>
      </div>
      
      <!-- Hidden inputs for form data -->
      <input type="hidden" id="selected_store_url" name="store_url">
      <input type="hidden" id="selected_store_name" name="store_name">
    </div>
    
    <style>
      .widget-store-browser {
        margin: 1rem 0;
      }
      
      .selection-counter {
        margin-bottom: 1rem;
        padding: 0.75rem 1rem;
        background: linear-gradient(45deg, var(--accent-color), #3b82f6);
        color: white;
        border-radius: 8px;
        font-weight: 600;
        text-align: center;
        box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
      }
      
      .tile-enhanced-stats {
        margin: 0.75rem 0;
        padding: 0.75rem;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 8px;
        font-size: 0.75rem;
      }
      
      .stat-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.25rem;
      }
      
      .stat-row:last-child {
        margin-bottom: 0;
      }
      
      .stat-label {
        color: var(--text-secondary);
        font-weight: 500;
      }
      
      .stat-value {
        color: var(--text-primary);
        font-weight: 600;
      }
      
      /* Tags Input Styling */
      .tags-input-container {
        margin-bottom: 1rem;
      }
      
      .tags-input-wrapper {
        position: relative;
        border: 1px solid var(--border-light);
        border-radius: 8px;
        background: var(--bg-primary);
        min-height: 60px;
        padding: 0.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
      }
      
      .tags-input-wrapper:focus-within {
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
      }
      
      .tags-display {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        flex: 1;
      }
      
      .tag-item {
        background: var(--accent-color);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: tagAppear 0.3s ease;
      }
      
      @keyframes tagAppear {
        from {
          opacity: 0;
          transform: scale(0.8);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      .tag-remove {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 0.75rem;
        transition: all 0.2s ease;
      }
      
      .tag-remove:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
      }
      
      .tags-input {
        border: none !important;
        background: transparent !important;
        box-shadow: none !important;
        flex: 1;
        min-width: 120px;
        padding: 0.5rem 0 !important;
      }
      
      .tags-input:focus {
        outline: none !important;
        border: none !important;
        box-shadow: none !important;
      }
      
      .popular-tags {
        margin-top: 1rem;
      }
      
      .popular-tags-title {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 0.75rem 0;
      }
      
      .tags-suggestions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      
      .tag-suggestion {
        background: var(--bg-secondary);
        border: 1px solid var(--border-light);
        color: var(--text-secondary);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .tag-suggestion:hover {
        background: var(--accent-color);
        color: white;
        border-color: var(--accent-color);
        transform: translateY(-1px);
      }
      
      .widget-store-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
      
      .widget-store-tile {
        border: 2px solid var(--border-light);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        min-height: 280px;
        display: flex;
        flex-direction: column;
      }
      
      .widget-store-tile:hover {
        border-color: var(--accent-color);
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.15);
        transform: translateY(-2px);
      }
      
      .widget-store-tile.selected {
        border-color: var(--accent-color) !important;
        box-shadow: 0 6px 20px rgba(37, 99, 235, 0.2) !important;
        transform: translateY(-2px) !important;
      }
      
      .tile-image {
        position: relative;
        height: 120px;
        overflow: hidden;
      }
      
      .store-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .tile-overlay {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 6px;
        padding: 0.25rem 0.5rem;
      }
      
      .tile-rating {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.75rem;
      }
      
      .rating-value {
        font-weight: 700;
        color: var(--accent-color);
      }
      
      .rating-reviews {
        color: var(--text-muted);
        font-size: 0.7rem;
      }
      
      .tile-body {
        padding: 1rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .tile-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.5rem;
      }
      
      .tile-title {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0;
        flex: 1;
      }
      
      .tile-category {
        background: rgba(37, 99, 235, 0.1);
        color: var(--accent-color);
        font-size: 0.6rem;
        font-weight: 600;
        padding: 0.2rem 0.4rem;
        border-radius: 8px;
        margin-left: 0.5rem;
      }
      
      .tile-description {
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin: 0;
        line-height: 1.3;
        flex: 1;
      }
      
      .tile-stats {
        margin-top: auto;
      }
      
      .products-count {
        font-size: 0.7rem;
        color: var(--text-muted);
        font-weight: 500;
      }
      
      .tile-check {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        width: 32px;
        height: 32px;
        background: var(--accent-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        transition: all 0.3s ease;
      }
      
      .tile-check.hidden {
        opacity: 0;
        transform: scale(0.5);
      }
      
      .widget-store-tile.selected .tile-check {
        opacity: 1;
        transform: scale(1);
      }
      
      .custom-store-section {
        background: var(--bg-secondary);
        border: 1px solid var(--border-light);
        border-radius: 12px;
        padding: 1.5rem;
        text-align: center;
      }
      
      .custom-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 0.5rem 0;
      }
      
      .custom-description {
        color: var(--text-secondary);
        margin: 0 0 1rem 0;
        font-size: 0.9rem;
      }
      
      .custom-input-group {
        display: flex;
        gap: 0.5rem;
      }
      
      .custom-store-input {
        flex: 1;
        padding: 0.75rem;
        border: 1px solid var(--border-light);
        border-radius: 8px;
        background: var(--bg-primary);
        color: var(--text-primary);
        font-size: 0.9rem;
      }
      
      .custom-store-input:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
      }
      
      .custom-store-btn {
        padding: 0.75rem 1rem;
        background: var(--accent-color);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.2s ease;
      }
      
      .custom-store-btn:hover {
        background: var(--primary-blue-hover);
      }
      
      @media (max-width: 768px) {
        .widget-store-grid {
          grid-template-columns: 1fr;
        }
        
        .custom-input-group {
          flex-direction: column;
        }
        
        .custom-store-btn {
          width: 100%;
        }
      }
    </style>
    
    <script>
      // Define functions immediately in global scope
      function selectWidgetStore(storeId) {
        console.log('Widget store selected:', storeId);
        console.log('Function called successfully!');
        
        const selectedTile = document.querySelector('.widget-store-tile[data-store-id="' + storeId + '"]');
        const selectedCheck = document.getElementById('check-' + storeId);
        const store = window.widgetStores.find(s => s.id === storeId);
        
        console.log('Selected tile:', selectedTile);
        console.log('Selected check:', selectedCheck);
        console.log('Store data:', store);
        console.log('Current selectedStores:', window.selectedStores);
        
        if (!selectedTile) {
          console.error('Selected tile not found for store ID:', storeId);
          return;
        }
        
        if (!selectedCheck) {
          console.error('Selected check not found for store ID:', storeId);
          return;
        }
        
        if (!store) {
          console.error('Store data not found for store ID:', storeId);
          return;
        }
        
        // Toggle selection
        const isCurrentlySelected = selectedTile.classList.contains('selected');
        console.log('Is currently selected:', isCurrentlySelected);
        
        if (isCurrentlySelected) {
          // Deselect
          console.log('Deselecting store:', store.name);
          selectedTile.classList.remove('selected');
          selectedCheck.classList.add('hidden');
          window.selectedStores = window.selectedStores.filter(s => s.id !== storeId);
        } else {
          // Select
          console.log('Selecting store:', store.name);
          selectedTile.classList.add('selected');
          selectedCheck.classList.remove('hidden');
          window.selectedStores.push(store);
        }
        
        console.log('Updated selectedStores:', window.selectedStores);
        
        // Update form data with all selected stores
        console.log('Calling updateSelectedStoresFormData...');
        updateSelectedStoresFormData();
        
        // Update selection counter
        console.log('Calling updateSelectionCounter...');
        updateSelectionCounter();
        
        console.log('Final selected stores:', window.selectedStores.map(s => s.name));
        console.log('Selection complete!');
      }
      
      function addWidgetCustomStore() {
        console.log('Custom store function called!');
        
        const urlInput = document.getElementById('widget-custom-store');
        const url = urlInput.value.trim();
        
        console.log('URL input:', urlInput);
        console.log('URL value:', url);
        
        if (!url) {
          alert('Voer een winkel URL in');
          return;
        }
        
        // Improved DHgate URL pattern
        const dhgatePattern = /^https?:\\/\\/(www\\.)?dhgate\\.com\\/store\\/[a-zA-Z0-9]+/;
        if (!dhgatePattern.test(url)) {
          alert('Voer een geldige DHgate winkel URL in. Bijvoorbeeld: https://www.dhgate.com/store/21168508');
          return;
        }
        
        // Check if URL already exists
        const existingStore = window.selectedStores.find(s => s.url === url);
        if (existingStore) {
          alert('Deze winkel is al geselecteerd!');
          return;
        }
        
        // Clear previous tile selections
        document.querySelectorAll('.widget-store-tile').forEach(tile => {
          tile.classList.remove('selected');
        });
        document.querySelectorAll('.tile-check').forEach(check => {
          check.classList.add('hidden');
        });
        
        // Add custom store to selection
        const customStore = {
          id: 'custom-' + Date.now(),
          name: 'Custom Store',
          url: url,
          category: 'Custom',
          description: 'Custom DHgate store'
        };
        
        window.selectedStores = [customStore]; // Replace with custom store
        updateSelectedStoresFormData();
        updateSelectionCounter();
        
        // Visual feedback
        urlInput.style.borderColor = '#10b981';
        urlInput.style.backgroundColor = '#f0fdf4';
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = 'color: #10b981; font-size: 0.9rem; margin-top: 0.5rem; font-weight: 600;';
        successMsg.textContent = '✓ Winkel succesvol toegevoegd!';
        
        const parent = urlInput.parentElement;
        const existingMsg = parent.querySelector('.success-msg');
        if (existingMsg) existingMsg.remove();
        successMsg.className = 'success-msg';
        parent.appendChild(successMsg);
        
        setTimeout(() => {
          urlInput.style.borderColor = '';
          urlInput.style.backgroundColor = '';
          if (successMsg.parentElement) successMsg.remove();
        }, 3000);
        
        console.log('Custom store added:', url);
      }
      
      // Initialize variables
      window.selectedStores = [];
      window.widgetStores = JSON.parse('${JSON.stringify(featuredStores).replace(/'/g, "\\'")}');
      
      // Helper functions
      function updateSelectedStoresFormData() {
        if (window.selectedStores.length === 0) {
          document.getElementById('selected_store_url').value = '';
          document.getElementById('selected_store_name').value = '';
        } else if (window.selectedStores.length === 1) {
          document.getElementById('selected_store_url').value = window.selectedStores[0].url;
          document.getElementById('selected_store_name').value = window.selectedStores[0].name;
        } else {
          // Multiple stores - store as JSON
          document.getElementById('selected_store_url').value = JSON.stringify(window.selectedStores.map(s => s.url));
          document.getElementById('selected_store_name').value = window.selectedStores.map(s => s.name).join(', ');
        }
      }
      
      function updateSelectionCounter() {
        const counter = document.getElementById('store-selection-counter');
        if (counter) {
          if (window.selectedStores.length === 0) {
            counter.style.display = 'none';
          } else {
            counter.style.display = 'block';
            counter.textContent = window.selectedStores.length + ' ' + (lang === 'nl' ? 'winkel(s) geselecteerd' : 'store(s) selected');
          }
        }
      }
        console.log('Widget store selected:', storeId);
        console.log('Function called successfully!');
        
        const selectedTile = document.querySelector('.widget-store-tile[data-store-id="' + storeId + '"]');
        const selectedCheck = document.getElementById('check-' + storeId);
        const store = window.widgetStores.find(s => s.id === storeId);
        
        console.log('Selected tile:', selectedTile);
        console.log('Selected check:', selectedCheck);
        console.log('Store data:', store);
        console.log('Current selectedStores:', selectedStores);
        
        if (!selectedTile) {
          console.error('Selected tile not found for store ID:', storeId);
          return;
        }
        
        if (!selectedCheck) {
          console.error('Selected check not found for store ID:', storeId);
          return;
        }
        
        if (!store) {
          console.error('Store data not found for store ID:', storeId);
          return;
        }
        
        // Toggle selection
        const isCurrentlySelected = selectedTile.classList.contains('selected');
        console.log('Is currently selected:', isCurrentlySelected);
        
        if (isCurrentlySelected) {
          // Deselect
          console.log('Deselecting store:', store.name);
          selectedTile.classList.remove('selected');
          selectedCheck.classList.add('hidden');
          selectedStores = selectedStores.filter(s => s.id !== storeId);
        } else {
          // Select
          console.log('Selecting store:', store.name);
          selectedTile.classList.add('selected');
          selectedCheck.classList.remove('hidden');
          selectedStores.push(store);
        }
        
        console.log('Updated selectedStores:', selectedStores);
        
        // Update form data with all selected stores
        updateSelectedStoresFormData();
        
        // Update selection counter
        updateSelectionCounter();
        
        console.log('Final selected stores:', selectedStores.map(s => s.name));
      };
      
      window.addWidgetCustomStore = function() {
        console.log('Custom store function called!');
        
        const urlInput = document.getElementById('widget-custom-store');
        const url = urlInput.value.trim();
        
        console.log('URL input:', urlInput);
        console.log('URL value:', url);
        
        if (!url) {
          alert(lang === 'nl' ? 'Voer een winkel URL in' : 'Please enter a store URL');
          return;
        }
        
        // Improved DHgate URL pattern
        const dhgatePattern = /^https?:\\/\\/(www\\.)?dhgate\\.com\\/store\\/[a-zA-Z0-9]+/;
        if (!dhgatePattern.test(url)) {
          alert(lang === 'nl' ? 'Voer een geldige DHgate winkel URL in. Bijvoorbeeld: https://www.dhgate.com/store/21168508' : 'Please enter a valid DHgate store URL. Example: https://www.dhgate.com/store/21168508');
          return;
        }
        
        // Check if URL already exists
        const existingStore = selectedStores.find(s => s.url === url);
        if (existingStore) {
          alert(lang === 'nl' ? 'Deze winkel is al geselecteerd!' : 'This store is already selected!');
          return;
        }
        
        // Clear previous tile selections
        document.querySelectorAll('.widget-store-tile').forEach(tile => {
          tile.classList.remove('selected');
        });
        document.querySelectorAll('.tile-check').forEach(check => {
          check.classList.add('hidden');
        });
        
        // Add custom store to selection
        const customStore = {
          id: 'custom-' + Date.now(),
          name: 'Custom Store',
          url: url,
          category: 'Custom',
          description: 'Custom DHgate store'
        };
        
        selectedStores = [customStore]; // Replace with custom store
        updateSelectedStoresFormData();
        updateSelectionCounter();
        
        // Visual feedback
        urlInput.style.borderColor = '#10b981';
        urlInput.style.backgroundColor = '#f0fdf4';
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = 'color: #10b981; font-size: 0.9rem; margin-top: 0.5rem; font-weight: 600;';
        successMsg.textContent = lang === 'nl' ? '✓ Winkel succesvol toegevoegd!' : '✓ Store successfully added!';
        
        const parent = urlInput.parentElement;
        const existingMsg = parent.querySelector('.success-msg');
        if (existingMsg) existingMsg.remove();
        successMsg.className = 'success-msg';
        parent.appendChild(successMsg);
        
        setTimeout(() => {
          urlInput.style.borderColor = '';
          urlInput.style.backgroundColor = '';
          if (successMsg.parentElement) successMsg.remove();
        }, 3000);
        
        console.log('Custom store added:', url);
      };
      

      

      

      
      // Initialize widget store browser
      console.log('Widget store browser initialized');
      console.log('Available stores:', window.widgetStores);
      console.log('Global functions available:', {
        selectWidgetStore: typeof window.selectWidgetStore,
        addWidgetCustomStore: typeof window.addWidgetCustomStore
      });
      
      // Force initialization after DOM is loaded
      document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded - initializing widget functions');
        
        // Re-initialize functions to ensure they're available
        if (typeof window.selectWidgetStore !== 'function') {
          console.error('selectWidgetStore function not found!');
        }
        
        if (typeof window.addWidgetCustomStore !== 'function') {
          console.error('addWidgetCustomStore function not found!');
        }
        
        // Test store selection
        const testTile = document.querySelector('.widget-store-tile');
        if (testTile) {
          console.log('Store tiles found:', document.querySelectorAll('.widget-store-tile').length);
        } else {
          console.error('No store tiles found!');
        }
        
        // Add event listeners for store tiles
        document.querySelectorAll('.widget-store-tile').forEach(tile => {
          tile.addEventListener('click', function() {
            const storeId = parseInt(this.getAttribute('data-store-click'));
            console.log('Tile clicked, store ID:', storeId);
            selectWidgetStore(storeId);
          });
        });
        
        // Add event listener for custom store button
        const customStoreBtn = document.getElementById('add-custom-store-btn');
        if (customStoreBtn) {
          customStoreBtn.addEventListener('click', function() {
            console.log('Custom store button clicked');
            addWidgetCustomStore();
          });
        }
      });
      
      // Tags functionality
      let selectedTags = [];
      
      function addTag(tag) {
        const cleanTag = tag.trim().toLowerCase();
        if (cleanTag && !selectedTags.includes(cleanTag)) {
          selectedTags.push(cleanTag);
          updateTagsDisplay();
          updateTagsInput();
        }
      };
      
      function updateTagsDisplay() {
        const display = document.getElementById('tags-display');
        if (!display) return;
        
        display.innerHTML = selectedTags.map(tag => 
          '<div class="tag-item">' +
            '<span>' + tag + '</span>' +
            '<button type="button" class="tag-remove" onclick="removeTag(\'' + tag + '\')">×</button>' +
          '</div>'
        ).join('');
      }
      
      function updateTagsInput() {
        const hiddenInput = document.getElementById('widget-tags');
        if (hiddenInput) {
          hiddenInput.value = selectedTags.join(', ');
        }
      }
      
      function removeTag(tag) {
        selectedTags = selectedTags.filter(t => t !== tag);
        updateTagsDisplay();
        updateTagsInput();
      };
      
      // Handle Enter key in tags input
      document.addEventListener('DOMContentLoaded', function() {
        const tagsInput = document.getElementById('widget-tags-input');
        if (tagsInput) {
          tagsInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
              e.preventDefault();
              const value = this.value.trim();
              if (value) {
                addTag(value);
                this.value = '';
              }
            }
          });
        }
      });
    </script>
  `;
}