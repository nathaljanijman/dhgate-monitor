// ============================================================================
// MODERN MINIMALIST SIGNUP WIDGET - 2024 DESIGN TRENDS
// ============================================================================
// Clean, step-by-step form following current UX best practices

export function generateModernSignupWidget(env = null, lang = 'nl', theme = 'light') {
  const widgetId = 'modern-signup-widget-' + Date.now();
  
  // Curated featured stores - minimalist approach
  const featuredStores = [
    {
      id: 1,
      name: 'ECOBAG Store',
      url: 'https://www.dhgate.com/store/20062391',
      category: lang === 'nl' ? 'Mode & Tassen' : 'Fashion & Bags',
      rating: 4.9,
      monthlySales: lang === 'nl' ? '2.847 verkopen/maand' : '2,847 sales/month'
    },
    {
      id: 2,
      name: 'Global Technology',
      url: 'https://www.dhgate.com/store/19998142',
      category: lang === 'nl' ? 'Elektronica' : 'Electronics',
      rating: 4.8,
      monthlySales: lang === 'nl' ? '5.234 verkopen/maand' : '5,234 sales/month'
    },
    {
      id: 3,
      name: 'Watch World',
      url: 'https://www.dhgate.com/store/20283981',
      category: lang === 'nl' ? 'Horloges' : 'Watches',
      rating: 4.7,
      monthlySales: lang === 'nl' ? '1.892 verkopen/maand' : '1,892 sales/month'
    }
  ];

  const t = lang === 'nl' ? {
    title: 'DHgate Monitor',
    subtitle: 'Monitor je favoriete winkels en krijg updates over nieuwe producten',
    step1: 'Email',
    step2: 'Winkel',
    step3: 'Zoektermen',
    step4: 'Bevestiging',
    emailLabel: 'Email adres',
    emailPlaceholder: 'jouw@email.com',
    emailDescription: 'We sturen je updates over nieuwe producten en prijzen',
    storeTitle: 'Kies je winkel',
    storeDescription: 'Selecteer de winkels die je wilt monitoren',
    addCustomTitle: 'Eigen winkel toevoegen',
    addCustomDescription: 'Voeg een DHgate winkel toe via URL',
    addStorePlaceholder: 'https://www.dhgate.com/store/jouw-winkel',
    addStoreButton: 'Toevoegen',
    tagsLabel: 'Zoektermen',
    tagsPlaceholder: 'bijv. smartphone, handtas, sneakers',
    tagsDescription: 'Voeg zoektermen toe om specifieke producten te vinden',
    confirmTitle: 'Bevestig je aanmelding',
    confirmDescription: 'Controleer je gegevens voordat je start',
    successTitle: 'Monitoring geactiveerd!',
    successDescription: 'Je ontvangt emails wanneer er nieuwe producten gevonden worden',
    nextButton: 'Volgende',
    backButton: 'Terug',
    submitButton: 'Start monitoring',
    loadingText: 'Bezig...',
    doneButton: 'Klaar',
    privacyNotice: 'Door aan te melden ga je akkoord met onze privacyvoorwaarden',
    privacyText: 'Alleen voor product updates, geen spam.',
    privacyLink: 'Privacy',
    accessibility: {
      progressLabel: 'Voortgang van aanmelding',
      stepLabel: 'Stap',
      ofLabel: 'van'
    }
  } : {
    title: 'DHgate Monitor',
    subtitle: 'Monitor your favorite stores and get updates about new products',
    step1: 'Email',
    step2: 'Store',
    step3: 'Search Terms',
    step4: 'Confirmation',
    emailLabel: 'Email address',
    emailPlaceholder: 'your@email.com',
    emailDescription: 'We\'ll send you updates about new products and prices',
    storeTitle: 'Choose your store',
    storeDescription: 'Select the stores you want to monitor',
    addCustomTitle: 'Add custom store',
    addCustomDescription: 'Add a DHgate store via URL',
    addStorePlaceholder: 'https://www.dhgate.com/store/your-store',
    addStoreButton: 'Add',
    tagsLabel: 'Search terms',
    tagsPlaceholder: 'e.g. smartphone, handbag, sneakers',
    tagsDescription: 'Add search terms to find specific products',
    confirmTitle: 'Confirm your registration',
    confirmDescription: 'Check your details before starting',
    successTitle: 'Monitoring activated!',
    successDescription: 'You will receive emails when new products are found',
    nextButton: 'Next',
    backButton: 'Back',
    submitButton: 'Start monitoring',
    loadingText: 'Processing...',
    doneButton: 'Done',
    privacyNotice: 'By signing up you agree to our privacy terms',
    accessibility: {
      progressLabel: 'Registration progress',
      stepLabel: 'Step',
      ofLabel: 'of'
    }
  };
  
  return `<!DOCTYPE html>
<html lang="${lang}" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.title}</title>
    
    <!-- Google Fonts - Inter for modern typography -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            /* Modern Color System */
            --primary: #2563EB;
            --primary-light: #3B82F6;
            --primary-hover: #1D4ED8;
            --accent: #EA580C;
            --success: #10B981;
            --warning: #F59E0B;
            --error: #EF4444;
            
            /* Neutral Colors */
            --gray-50: ${theme === 'dark' ? '#0F172A' : '#F9FAFB'};
            --gray-100: ${theme === 'dark' ? '#1E293B' : '#F3F4F6'};
            --gray-200: ${theme === 'dark' ? '#334155' : '#E5E7EB'};
            --gray-300: ${theme === 'dark' ? '#475569' : '#D1D5DB'};
            --gray-400: ${theme === 'dark' ? '#64748B' : '#9CA3AF'};
            --gray-500: ${theme === 'dark' ? '#94A3B8' : '#6B7280'};
            --gray-600: ${theme === 'dark' ? '#CBD5E1' : '#4B5563'};
            --gray-700: ${theme === 'dark' ? '#E2E8F0' : '#374151'};
            --gray-800: ${theme === 'dark' ? '#F1F5F9' : '#1F2937'};
            --gray-900: ${theme === 'dark' ? '#F8FAFC' : '#111827'};
            
            /* Typography */
            --text-primary: var(--gray-900);
            --text-secondary: var(--gray-600);
            --text-muted: var(--gray-500);
            
            /* Backgrounds */
            --bg-primary: var(--gray-50);
            --bg-secondary: var(--gray-100);
            --bg-card: ${theme === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
            
            /* Borders */
            --border-light: var(--gray-200);
            --border-medium: var(--gray-300);
            
            /* Shadows */
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            
            /* Spacing */
            --space-1: 0.25rem;
            --space-2: 0.5rem;
            --space-3: 0.75rem;
            --space-4: 1rem;
            --space-5: 1.25rem;
            --space-6: 1.5rem;
            --space-8: 2rem;
            --space-10: 2.5rem;
            --space-12: 3rem;
            
            /* Border Radius */
            --radius-sm: 0.375rem;
            --radius: 0.5rem;
            --radius-md: 0.75rem;
            --radius-lg: 1rem;
            --radius-xl: 1.5rem;
            
            /* Transitions */
            --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            padding: var(--space-6);
            min-height: 100vh;
            transition: var(--transition);
        }
        
        .widget-container {
            max-width: 480px;
            margin: 0 auto;
            background: var(--bg-card);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--border-light);
            border-radius: var(--radius-xl);
            padding: var(--space-8);
            box-shadow: var(--shadow-lg);
            position: relative;
            overflow: hidden;
        }
        
        .widget-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(234, 88, 12, 0.03) 0%, transparent 50%);
            border-radius: inherit;
            z-index: -1;
            pointer-events: none;
        }
        
        .widget-header {
            text-align: center;
            margin-bottom: var(--space-8);
        }
        
        .widget-title {
            font-size: 1.875rem;
            font-weight: 700;
            margin-bottom: var(--space-2);
            color: var(--text-primary);
            letter-spacing: -0.025em;
        }
        
        .widget-subtitle {
            font-size: 1rem;
            color: var(--text-secondary);
            line-height: 1.6;
        }
        
        /* Modern Progress Indicator */
        .progress-indicator {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--space-8);
            position: relative;
        }
        
        .progress-line {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--border-light);
            transform: translateY(-50%);
            z-index: 1;
        }
        
        .progress-fill {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: linear-gradient(90deg, var(--primary), var(--accent));
            transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 2;
            width: 0%;
        }
        
        .progress-step {
            position: relative;
            z-index: 3;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--space-2);
        }
        
        .step-indicator {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: var(--bg-secondary);
            border: 2px solid var(--border-light);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text-muted);
            transition: var(--transition);
        }
        
        .step-indicator.active {
            background: var(--primary);
            border-color: var(--primary);
            color: white;
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }
        
        .step-indicator.completed {
            background: var(--success);
            border-color: var(--success);
            color: white;
        }
        
        .step-label {
            font-size: 0.75rem;
            color: var(--text-muted);
            font-weight: 500;
            text-align: center;
        }
        
        .step-label.active {
            color: var(--primary);
        }
        
        .step-label.completed {
            color: var(--success);
        }
        
        /* Step Content */
        .step-content {
            display: none;
            animation: fadeIn 0.3s ease-out;
        }
        
        .step-content.active {
            display: block;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Form Elements */
        .form-group {
            margin-bottom: var(--space-6);
        }
        
        .form-label {
            display: block;
            font-weight: 600;
            margin-bottom: var(--space-2);
            color: var(--text-primary);
            font-size: 0.875rem;
        }
        
        .form-input {
            width: 100%;
            padding: var(--space-3) var(--space-4);
            border: 1px solid var(--border-light);
            border-radius: var(--radius-md);
            background: var(--bg-secondary);
            color: var(--text-primary);
            font-size: 1rem;
            transition: var(--transition);
            font-family: inherit;
        }
        
        .form-input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
            background: var(--bg-card);
        }
        
        .form-input::placeholder {
            color: var(--text-muted);
        }
        
        .form-description {
            font-size: 0.875rem;
            color: var(--text-secondary);
            margin-top: var(--space-2);
            line-height: 1.5;
        }
        
        /* Store Selection */
        .store-grid {
            display: grid;
            gap: var(--space-3);
            margin-bottom: var(--space-6);
        }
        
        .store-card {
            border: 1px solid var(--border-light);
            border-radius: var(--radius-md);
            padding: var(--space-4);
            cursor: pointer;
            transition: var(--transition);
            background: var(--bg-secondary);
            position: relative;
        }
        
        .store-card:hover {
            border-color: var(--primary);
            box-shadow: var(--shadow-md);
            transform: translateY(-1px);
        }
        
        .store-card.selected {
            border-color: var(--primary);
            background: rgba(37, 99, 235, 0.05);
            box-shadow: 0 0 0 1px var(--primary);
        }
        
        .store-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: var(--space-2);
        }
        
        .store-name {
            font-weight: 600;
            color: var(--text-primary);
            font-size: 0.875rem;
        }
        
        .store-category {
            background: rgba(37, 99, 235, 0.1);
            color: var(--primary);
            font-size: 0.75rem;
            font-weight: 500;
            padding: var(--space-1) var(--space-2);
            border-radius: var(--radius-sm);
        }
        
        .store-stats {
            display: flex;
            gap: var(--space-4);
            font-size: 0.75rem;
            color: var(--text-muted);
        }
        
        .store-check {
            position: absolute;
            top: var(--space-3);
            right: var(--space-3);
            width: 20px;
            height: 20px;
            background: var(--primary);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: scale(0.5);
            transition: var(--transition);
            font-size: 0.75rem;
        }
        
        .store-card.selected .store-check {
            opacity: 1;
            transform: scale(1);
        }
        
        /* Custom Store */
        .custom-store {
            border: 2px dashed var(--border-medium);
            border-radius: var(--radius-md);
            padding: var(--space-4);
            text-align: center;
            background: var(--bg-secondary);
            transition: var(--transition);
        }
        
        .custom-store:hover {
            border-color: var(--primary);
            background: rgba(37, 99, 235, 0.02);
        }
        
        .custom-title {
            font-weight: 600;
            margin-bottom: var(--space-1);
            color: var(--text-primary);
            font-size: 0.875rem;
        }
        
        .custom-description {
            color: var(--text-secondary);
            margin-bottom: var(--space-3);
            font-size: 0.75rem;
        }
        
        .custom-input {
            width: 100%;
            padding: var(--space-2) var(--space-3);
            border: 1px solid var(--border-light);
            border-radius: var(--radius);
            background: var(--bg-card);
            color: var(--text-primary);
            font-size: 0.875rem;
            margin-bottom: var(--space-2);
            font-family: inherit;
        }
        
        .custom-input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
        }
        
        /* Buttons */
        .button-group {
            display: flex;
            gap: var(--space-3);
            justify-content: space-between;
            margin-top: var(--space-6);
        }
        
        .btn {
            font-family: inherit;
            font-weight: 600;
            padding: var(--space-3) var(--space-6);
            border-radius: var(--radius-md);
            border: none;
            cursor: pointer;
            transition: var(--transition);
            font-size: 0.875rem;
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            text-decoration: none;
            justify-content: center;
            min-width: 100px;
        }
        
        .btn-primary {
            background: var(--primary);
            color: white;
            box-shadow: var(--shadow);
        }
        
        .btn-primary:hover {
            background: var(--primary-hover);
            box-shadow: var(--shadow-md);
            transform: translateY(-1px);
        }
        
        .btn-secondary {
            background: var(--bg-secondary);
            color: var(--text-primary);
            border: 1px solid var(--border-light);
        }
        
        .btn-secondary:hover {
            background: var(--bg-card);
            border-color: var(--border-medium);
        }
        
        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
        
        /* Success State */
        .success-container {
            text-align: center;
            padding: var(--space-8) 0;
        }
        
        .success-icon {
            width: 64px;
            height: 64px;
            background: var(--success);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto var(--space-6);
            font-size: 1.5rem;
            color: white;
            box-shadow: var(--shadow-lg);
        }
        
        .success-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: var(--space-2);
            color: var(--success);
        }
        
        .success-description {
            color: var(--text-secondary);
            margin-bottom: var(--space-6);
        }
        
        /* Privacy Notice */
        .privacy-notice {
            text-align: center;
            margin-top: var(--space-6);
            padding: var(--space-4);
            background: var(--bg-secondary);
            border-radius: var(--radius-md);
            font-size: 0.75rem;
            color: var(--text-muted);
            line-height: 1.5;
        }
        
        .privacy-link {
            color: var(--primary);
            text-decoration: none;
        }
        
        .privacy-link:hover {
            text-decoration: underline;
        }
        
        /* Error Messages */
        .error-message {
            display: none;
            font-size: 0.875rem;
            color: var(--error);
            margin-top: var(--space-2);
            padding: var(--space-2) var(--space-3);
            background: rgba(239, 68, 68, 0.1);
            border-radius: var(--radius);
            border-left: 3px solid var(--error);
        }
        
        .error-message.show {
            display: block;
        }
        
        /* Mobile Responsive */
        @media (max-width: 640px) {
            body { padding: var(--space-4); }
            .widget-container { padding: var(--space-6); }
            .button-group { flex-direction: column; }
            .btn { width: 100%; }
        }
        
        /* Focus Management */
        .btn:focus,
        .form-input:focus,
        .store-card:focus {
            outline: 2px solid var(--primary);
            outline-offset: 2px;
        }
        
        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
            * {
                transition-duration: 0.01ms !important;
                animation-duration: 0.01ms !important;
            }
        }
    </style>
</head>
<body>
    <div class="widget-container">
        <div class="widget-header">
            <h1 class="widget-title">${t.title}</h1>
            <p class="widget-subtitle">${t.subtitle}</p>
        </div>
        
        <!-- Progress Indicator -->
        <div class="progress-indicator" role="progressbar" aria-label="${t.accessibility.progressLabel}" aria-valuenow="1" aria-valuemin="1" aria-valuemax="4">
            <div class="progress-line">
                <div class="progress-fill" id="progress-fill"></div>
            </div>
            <div class="progress-step">
                <div class="step-indicator active" id="step-1">1</div>
                <div class="step-label active">${t.step1}</div>
            </div>
            <div class="progress-step">
                <div class="step-indicator" id="step-2">2</div>
                <div class="step-label">${t.step2}</div>
            </div>
            <div class="progress-step">
                <div class="step-indicator" id="step-3">3</div>
                <div class="step-label">${t.step3}</div>
            </div>
            <div class="progress-step">
                <div class="step-indicator" id="step-4">4</div>
                <div class="step-label">${t.step4}</div>
            </div>
        </div>
        
        <!-- Step 1: Email -->
        <div class="step-content active" id="step-1-content">
            <div class="form-group">
                <label class="form-label" for="email-input">${t.emailLabel}</label>
                <input 
                    type="email" 
                    class="form-input" 
                    id="email-input" 
                    placeholder="${t.emailPlaceholder}"
                    autocomplete="email"
                    required
                >
                <div class="form-description">${t.emailDescription}</div>
                <div class="error-message" id="email-error"></div>
            </div>
            
            <div class="button-group">
                <div></div>
                <button class="btn btn-primary" onclick="nextStep()">
                    ${t.nextButton}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"/>
                    </svg>
                </button>
            </div>
        </div>
        
        <!-- Step 2: Store Selection -->
        <div class="step-content" id="step-2-content">
            <div class="form-group">
                <label class="form-label">${t.storeTitle}</label>
                <div class="form-description">${t.storeDescription}</div>
                
                <div class="store-grid">
                    ${featuredStores.map(store => `
                        <div class="store-card" data-store-id="${store.id}" onclick="selectStore(${store.id})" tabindex="0" role="button" aria-label="${lang === 'nl' ? 'Selecteer' : 'Select'} ${store.name}">
                            <div class="store-check" aria-hidden="true">✓</div>
                            <div class="store-header">
                                <div class="store-name">${store.name}</div>
                                <div class="store-category">${store.category}</div>
                            </div>
                            <div class="store-stats">
                                <span>⭐ ${store.rating}</span>
                                <span>📈 ${store.monthlySales}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="custom-store">
                    <div class="custom-title">${t.addCustomTitle}</div>
                    <div class="custom-description">${t.addCustomDescription}</div>
                    <input type="url" class="custom-input" id="custom-store-url" placeholder="${t.addStorePlaceholder}">
                    <button class="btn btn-primary" onclick="addCustomStore()">${t.addStoreButton}</button>
                    <div class="error-message" id="custom-store-error"></div>
                </div>
                
                <div class="error-message" id="store-error"></div>
            </div>
            
            <div class="button-group">
                <button class="btn btn-secondary" onclick="prevStep()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15,18 9,12 15,6"/>
                    </svg>
                    ${t.backButton}
                </button>
                <button class="btn btn-primary" onclick="nextStep()">
                    ${t.nextButton}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"/>
                    </svg>
                </button>
            </div>
        </div>
        
        <!-- Step 3: Search Terms -->
        <div class="step-content" id="step-3-content">
            <div class="form-group">
                <label class="form-label" for="tags-input">${t.tagsLabel}</label>
                <textarea 
                    class="form-input" 
                    id="tags-input" 
                    placeholder="${t.tagsPlaceholder}"
                    rows="3"
                    style="resize: vertical;"
                ></textarea>
                <div class="form-description">${t.tagsDescription}</div>
                <div class="error-message" id="tags-error"></div>
            </div>
            
            <div class="button-group">
                <button class="btn btn-secondary" onclick="prevStep()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15,18 9,12 15,6"/>
                    </svg>
                    ${t.backButton}
                </button>
                <button class="btn btn-primary" onclick="nextStep()">
                    ${t.nextButton}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"/>
                    </svg>
                </button>
            </div>
        </div>
        
        <!-- Step 4: Confirmation -->
        <div class="step-content" id="step-4-content">
            <div class="form-group">
                <label class="form-label">${t.confirmTitle}</label>
                <div class="form-description">${t.confirmDescription}</div>
                
                <div class="store-card">
                    <div class="store-header">
                        <div class="store-name">Email</div>
                    </div>
                    <div id="summary-email" style="color: var(--text-secondary); font-size: 0.875rem;"></div>
                </div>
                
                <div class="store-card">
                    <div class="store-header">
                        <div class="store-name">${t.step2}</div>
                    </div>
                    <div id="summary-stores" style="color: var(--text-secondary); font-size: 0.875rem;"></div>
                </div>
                
                <div class="store-card">
                    <div class="store-header">
                        <div class="store-name">${t.tagsLabel}</div>
                    </div>
                    <div id="summary-tags" style="color: var(--text-secondary); font-size: 0.875rem;"></div>
                </div>
            </div>
            
            <div class="button-group">
                <button class="btn btn-secondary" onclick="prevStep()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15,18 9,12 15,6"/>
                    </svg>
                    ${t.backButton}
                </button>
                <button class="btn btn-primary" onclick="submitForm()" id="submit-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                        <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                    ${t.submitButton}
                </button>
            </div>
        </div>
        
        <!-- Success State -->
        <div class="step-content" id="success-content">
            <div class="success-container">
                <div class="success-icon">✓</div>
                <h2 class="success-title">${t.successTitle}</h2>
                <p class="success-description">${t.successDescription}</p>
                <button class="btn btn-primary" onclick="resetForm()">
                    ${t.doneButton}
                </button>
            </div>
        </div>
        
        <!-- Privacy Notice -->
        <div class="privacy-notice">
            ${t.privacyNotice} - 
            <a href="/privacy?lang=${lang}" class="privacy-link" target="_blank">
                ${lang === 'nl' ? 'Privacybeleid' : 'Privacy Policy'}
            </a>
        </div>
    </div>
    
    <script>
        // Widget state
        let currentStep = 1;
        let selectedStores = [];
        let customStoreAdded = false;
        const stores = ${JSON.stringify(featuredStores)};
        
        // Navigation functions
        function nextStep() {
            if (validateCurrentStep()) {
                if (currentStep < 4) {
                    currentStep++;
                    updateStep();
                }
            }
        }
        
        function prevStep() {
            if (currentStep > 1) {
                currentStep--;
                updateStep();
            }
        }
        
        function updateStep() {
            // Update progress bar
            const progressFill = document.getElementById('progress-fill');
            if (progressFill) {
                progressFill.style.width = ((currentStep - 1) / 3) * 100 + '%';
            }
            
            // Update step indicators
            for (let i = 1; i <= 4; i++) {
                const stepIndicator = document.getElementById('step-' + i);
                const stepLabel = stepIndicator ? stepIndicator.nextElementSibling : null;
                
                if (stepIndicator) {
                    if (i < currentStep) {
                        stepIndicator.className = 'step-indicator completed';
                        if (stepLabel) stepLabel.className = 'step-label completed';
                    } else if (i === currentStep) {
                        stepIndicator.className = 'step-indicator active';
                        if (stepLabel) stepLabel.className = 'step-label active';
                    } else {
                        stepIndicator.className = 'step-indicator';
                        if (stepLabel) stepLabel.className = 'step-label';
                    }
                }
            }
            
            // Update step content
            for (let i = 1; i <= 4; i++) {
                const stepContent = document.getElementById('step-' + i + '-content');
                if (stepContent) {
                    stepContent.className = i === currentStep ? 'step-content active' : 'step-content';
                }
            }
            
            // Update summary if on step 4
            if (currentStep === 4) {
                updateSummary();
            }
        }
        
        function validateCurrentStep() {
            clearAllErrors();
            
            if (currentStep === 1) {
                const email = document.getElementById('email-input').value;
                if (!email || !email.includes('@')) {
                    showError('email-error', lang === 'nl' ? 'Voer een geldig email adres in' : 'Please enter a valid email address');
                    return false;
                }
            } else if (currentStep === 2) {
                if (selectedStores.length === 0 && !customStoreAdded) {
                    showError('store-error', lang === 'nl' ? 'Selecteer minimaal één winkel' : 'Please select at least one store');
                    return false;
                }
            } else if (currentStep === 3) {
                const tags = document.getElementById('tags-input').value;
                if (!tags.trim()) {
                    showError('tags-error', lang === 'nl' ? 'Voer zoektermen in' : 'Please enter search terms');
                    return false;
                }
            }
            
            return true;
        }
        
        function selectStore(storeId) {
            const storeCard = document.querySelector(\`[data-store-id="\${storeId}"]\`);
            const isSelected = selectedStores.includes(storeId);
            
            if (isSelected) {
                selectedStores = selectedStores.filter(id => id !== storeId);
                storeCard.classList.remove('selected');
            } else {
                selectedStores.push(storeId);
                storeCard.classList.add('selected');
            }
        }
        
        function addCustomStore() {
            const url = document.getElementById('custom-store-url').value;
            if (!url || !url.includes('dhgate.com')) {
                showError('custom-store-error', lang === 'nl' ? 'Voer een geldige DHgate winkel URL in' : 'Please enter a valid DHgate store URL');
                return;
            }
            
            customStoreAdded = true;
            clearError('custom-store-error');
            document.getElementById('custom-store-url').value = '';
            
            // Show success feedback
            const customStore = document.querySelector('.custom-store');
            customStore.style.borderColor = 'var(--success)';
            customStore.style.background = 'rgba(16, 185, 129, 0.05)';
        }
        
        function updateSummary() {
            const email = document.getElementById('email-input').value;
            const tags = document.getElementById('tags-input').value;
            
            document.getElementById('summary-email').textContent = email;
            document.getElementById('summary-tags').textContent = tags || (lang === 'nl' ? 'Geen zoektermen' : 'No search terms');
            
            const selectedStoreNames = selectedStores.map(id => {
                const store = stores.find(s => s.id === id);
                return store ? store.name : '';
            }).filter(name => name);
            
            if (customStoreAdded) {
                selectedStoreNames.push(lang === 'nl' ? 'Aangepaste winkel' : 'Custom store');
            }
            
            document.getElementById('summary-stores').textContent = selectedStoreNames.length > 0 ? selectedStoreNames.join(', ') : (lang === 'nl' ? 'Geen winkels geselecteerd' : 'No stores selected');
        }
        
        function submitForm() {
            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = \`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> \${t.loadingText}\`;
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Hide all step content
                document.querySelectorAll('.step-content').forEach(content => {
                    content.className = 'step-content';
                });
                
                // Show success
                document.getElementById('success-content').className = 'step-content active';
                
                // Update progress to complete
                document.getElementById('progress-fill').style.width = '100%';
                
                // Track conversion
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'signup_completed', {
                        event_category: 'conversion',
                        event_label: 'widget_signup'
                    });
                }
            }, 2000);
        }
        
        function resetForm() {
            currentStep = 1;
            selectedStores = [];
            customStoreAdded = false;
            
            // Reset form fields
            document.getElementById('email-input').value = '';
            document.getElementById('tags-input').value = '';
            document.getElementById('custom-store-url').value = '';
            
            // Reset store selections
            document.querySelectorAll('.store-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Reset custom store styling
            const customStore = document.querySelector('.custom-store');
            customStore.style.borderColor = '';
            customStore.style.background = '';
            
            // Clear errors
            clearAllErrors();
            
            // Reset to first step
            updateStep();
            
            // Hide success, show first step
            document.getElementById('success-content').className = 'step-content';
            document.getElementById('step-1-content').className = 'step-content active';
        }
        
        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.add('show');
            }
        }
        
        function clearError(elementId) {
            const errorElement = document.getElementById(elementId);
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }
        
        function clearAllErrors() {
            ['email-error', 'store-error', 'tags-error', 'custom-store-error'].forEach(errorId => {
                clearError(errorId);
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' && event.target.classList.contains('form-input')) {
                nextStep();
            }
        });
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            updateStep();
        });
    </script>
</body>
</html>`;
}

