// ============================================================================
// 2025 FUTURE-PROOF SIGNUP WIDGET
// ============================================================================
// Implements 2025 UX trends: AI personalization, gesture navigation, accessibility-first

export function generate2025SignupWidget(env = null, lang = 'nl', theme = 'light') {
  const widgetId = '2025-signup-widget-' + Date.now();
  
  // AI-powered store recommendations with UX-driven proposition elements
  const aiStores = [
    {
      id: 1,
      name: 'ECOBAG Store',
      category: lang === 'nl' ? 'Mode & Tassen' : 'Fashion & Bags',
      verified: true,
      trustIndicator: lang === 'nl' ? 'Kopersbescherming' : 'Buyer Protection',
      momentum: lang === 'nl' ? 'Trending winkel' : 'Trending shop',
      reason: lang === 'nl' ? 'Beste keuze voor mode deals' : 'Best choice for fashion deals',
      kpi: '98%',
      kpiLabel: lang === 'nl' ? 'Op tijd geleverd' : 'On-time delivery'
    },
    {
      id: 2,
      name: 'Global Technology',
      category: lang === 'nl' ? 'Elektronica' : 'Electronics',
      verified: true,
      trustIndicator: lang === 'nl' ? 'Geverifieerde verkoper' : 'Verified seller',
      momentum: lang === 'nl' ? '243 orders (24u)' : '243 orders (24h)',
      reason: lang === 'nl' ? 'Beste keuze voor elektronica deals' : 'Best choice for electronics deals',
      kpi: '4.9',
      kpiLabel: lang === 'nl' ? 'Beoordeling (5.2k)' : 'Rating (5.2k)'
    }
  ];

  const t = lang === 'nl' ? {
    title: 'DHgate Monitor',
    subtitle: 'AI-powered monitoring voor jouw favoriete winkels',
    aiPowered: '🤖 AI Aanbevolen',
    step1: 'Email',
    step2: 'Winkel',
    step3: 'Zoektermen',
    step4: 'Bevestiging',
    emailLabel: 'Email adres',
    emailPlaceholder: 'jouw@email.com',
    storeTitle: 'AI-aanbevolen winkels',
    storeDescription: 'Onze AI heeft de beste winkels voor jou geselecteerd',
    tagsLabel: 'Zoektermen',
    tagsPlaceholder: 'bijv. smartphone, handtas, sneakers',
    nextButton: 'Volgende',
    backButton: 'Terug',
    submitButton: 'Start monitoring',
    accessibility: {
      progressLabel: 'Voortgang van aanmelding',
      stepLabel: 'Stap',
      ofLabel: 'van',
      swipeHint: 'Swipe om te navigeren'
    }
  } : {
    title: 'DHgate Monitor',
    subtitle: 'AI-powered monitoring for your favorite stores',
    aiPowered: '🤖 AI Recommended',
    step1: 'Email',
    step2: 'Store',
    step3: 'Search Terms',
    step4: 'Confirmation',
    emailLabel: 'Email address',
    emailPlaceholder: 'your@email.com',
    storeTitle: 'AI-recommended stores',
    storeDescription: 'Our AI has selected the best stores for you',
    tagsLabel: 'Search terms',
    tagsPlaceholder: 'e.g. smartphone, handbag, sneakers',
    nextButton: 'Next',
    backButton: 'Back',
    submitButton: 'Start monitoring',
    accessibility: {
      progressLabel: 'Registration progress',
      stepLabel: 'Step',
      ofLabel: 'of',
      swipeHint: 'Swipe to navigate'
    }
  };
  
  return `<!DOCTYPE html>
<html lang="${lang}" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.title}</title>
    
    <!-- Inter Variable Font for 2025 -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    
    <style>
        :root {
            /* 2025 Color System */
            --primary: #2563EB;
            --primary-dark: #1E40AF;
            --accent: #EA580C;
            --accent-dark: #C2410C;
            --ai-blue: #3B82F6;
            --ai-purple: #8B5CF6;
            --ai-green: #10B981;
            
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
            
            /* 2025 Glassmorphism 2.0 */
            --glass-bg: ${theme === 'dark' ? 'rgba(15, 23, 42, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
            --glass-border: ${theme === 'dark' ? 'rgba(37, 99, 235, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
            
            /* Fluid Spacing System 2025 */
            --space-1: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
            --space-2: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);
            --space-3: clamp(0.75rem, 0.6rem + 0.75vw, 1.5rem);
            --space-4: clamp(1rem, 0.8rem + 1vw, 2rem);
            --space-6: clamp(1.5rem, 1.2rem + 1.5vw, 3rem);
            --space-8: clamp(2rem, 1.6rem + 2vw, 4rem);
            
            /* Border Radius */
            --radius-sm: 0.375rem;
            --radius: 0.5rem;
            --radius-md: 0.75rem;
            --radius-lg: 1rem;
            --radius-xl: 1.5rem;
            
            /* Transitions */
            --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
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
            background: var(--glass-bg);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-xl);
            padding: var(--space-8);
            box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            position: relative;
            overflow: hidden;
        }
        
        .widget-header {
            text-align: center;
            margin-bottom: var(--space-8);
        }
        
        .widget-title {
            font-size: clamp(1.5rem, 1.2rem + 1.5vw, 2rem);
            font-weight: 700;
            margin-bottom: var(--space-2);
            color: var(--text-primary);
            letter-spacing: -0.025em;
        }
        
        .widget-subtitle {
            font-size: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
            color: var(--text-secondary);
            line-height: 1.6;
        }
        
        /* 2025 Progress Indicator */
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
            background: var(--gray-200);
            transform: translateY(-50%);
            z-index: 1;
        }
        
        .progress-fill {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: linear-gradient(90deg, var(--ai-blue), var(--ai-purple));
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
            border: 2px solid var(--gray-200);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text-muted);
            transition: var(--transition);
        }
        
        .step-indicator.active {
            background: var(--ai-blue);
            border-color: var(--ai-blue);
            color: white;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        
        .step-indicator.completed {
            background: var(--ai-green);
            border-color: var(--ai-green);
            color: white;
        }
        
        .step-label {
            font-size: 0.75rem;
            color: var(--text-muted);
            font-weight: 500;
            text-align: center;
        }
        
        .step-label.active {
            color: var(--ai-blue);
        }
        
        .step-label.completed {
            color: var(--ai-green);
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
        
        /* 2025 Form Elements */
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
            border: 1px solid var(--gray-200);
            border-radius: var(--radius-md);
            background: var(--bg-secondary);
            color: var(--text-primary);
            font-size: 1rem;
            transition: var(--transition);
            font-family: inherit;
        }
        
        .form-input:focus {
            outline: none;
            border-color: var(--ai-blue);
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
        
        /* AI-Powered Store Cards */
        .store-grid {
            display: grid;
            gap: var(--space-3);
            margin-bottom: var(--space-6);
        }
        
        .store-card {
            border: 1px solid var(--gray-200);
            border-radius: var(--radius-md);
            padding: var(--space-4);
            cursor: pointer;
            transition: var(--transition);
            background: var(--bg-secondary);
            position: relative;
        }
        
        .store-card:hover {
            border-color: var(--ai-blue);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
            transform: translateY(-1px);
        }
        
        .store-card.selected {
            border-color: var(--ai-blue);
            background: rgba(59, 130, 246, 0.05);
            box-shadow: 0 0 0 1px var(--ai-blue);
        }
        
        .ai-badge {
            position: absolute;
            top: var(--space-3);
            right: var(--space-3);
            background: linear-gradient(135deg, var(--ai-blue), var(--ai-purple));
            color: white;
            font-size: 0.75rem;
            font-weight: 600;
            padding: var(--space-1) var(--space-2);
            border-radius: var(--radius-sm);
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
            background: rgba(59, 130, 246, 0.1);
            color: var(--ai-blue);
            font-size: 0.75rem;
            font-weight: 500;
            padding: var(--space-1) var(--space-2);
            border-radius: var(--radius-sm);
        }
        
        .ai-reason {
            font-size: 0.75rem;
            color: var(--text-muted);
            margin-top: var(--space-2);
        }
        
        .store-check {
            position: absolute;
            top: var(--space-3);
            left: var(--space-3);
            width: 20px;
            height: 20px;
            background: var(--ai-blue);
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
        
        /* 2025 Buttons with Haptic Feedback */
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
            min-height: 44px; /* Accessibility requirement */
        }
        
        .btn-primary {
            background: var(--ai-blue);
            color: white;
            box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
        }
        
        .btn-primary:hover {
            background: var(--primary-dark);
            box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
            transform: translateY(-1px);
        }
        
        .btn-primary:active {
            transform: scale(0.98);
            transition: transform 0.1s ease;
        }
        
        .btn-secondary {
            background: var(--bg-secondary);
            color: var(--text-primary);
            border: 1px solid var(--gray-200);
        }
        
        .btn-secondary:hover {
            background: var(--bg-card);
            border-color: var(--gray-300);
        }
        
        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
        
        /* Accessibility Features */
        .accessibility-hint {
            font-size: 0.75rem;
            color: var(--text-muted);
            text-align: center;
            margin-top: var(--space-4);
            padding: var(--space-2);
            background: var(--bg-secondary);
            border-radius: var(--radius);
        }
        
        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
        
        /* Dark Mode by Default */
        @media (prefers-color-scheme: dark) {
            :root {
                --bg-primary: #000000;
                --text-primary: #FFFFFF;
                --bg-secondary: #1A1A1A;
                --gray-200: #404040;
            }
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
            outline: 2px solid var(--ai-blue);
            outline-offset: 2px;
        }
    </style>
</head>
<body>
    <div class="widget-container">
        <div class="widget-header">
            <h1 class="widget-title">${t.title}</h1>
            <p class="widget-subtitle">${t.subtitle}</p>
        </div>
        
        <!-- 2025 Progress Indicator -->
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
                    aria-describedby="email-help"
                >
                <div class="form-description" id="email-help">${t.emailDescription}</div>
            </div>
            
            <div class="button-group">
                <div></div>
                <button class="btn btn-primary" onclick="nextStep()" aria-describedby="step-1-help">
                    ${t.nextButton}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"/>
                    </svg>
                </button>
            </div>
        </div>
        
        <!-- Step 2: AI-Powered Store Selection -->
        <div class="step-content" id="step-2-content">
            <div class="form-group">
                <label class="form-label">${t.storeTitle}</label>
                <div class="form-description">${t.storeDescription}</div>
                
                <div class="store-grid">
                    ${aiStores.map(store => `
                        <div class="store-card" data-store-id="${store.id}" onclick="selectStore(${store.id})" tabindex="0" role="button" aria-label="${lang === 'nl' ? 'Selecteer' : 'Select'} ${store.name}">
                            <div class="ai-badge">${t.aiPowered}</div>
                            <div class="store-check" aria-hidden="true">✓</div>
                            <div class="store-header">
                                <div class="store-name">${store.name}</div>
                                <div class="store-category">${store.category}</div>
                            </div>
                            <div class="ai-reason">${store.reason}</div>
                        </div>
                    `).join('')}
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
        
        <!-- Accessibility Hint -->
        <div class="accessibility-hint" aria-live="polite">
            ${t.accessibility.swipeHint}
        </div>
    </div>
    
    <script>
        // 2025 Widget State
        let currentStep = 1;
        let selectedStores = [];
        const stores = ${JSON.stringify(aiStores)};
        
        // AI Personalization (simulated)
        function detectUserType(email) {
            // Simulate AI user type detection
            const domain = email.split('@')[1];
            if (domain.includes('business') || domain.includes('corp')) {
                return 'business';
            } else if (domain.includes('edu')) {
                return 'student';
            } else {
                return 'individual';
            }
        }
        
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
                if (selectedStores.length === 0) {
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
            
            // Haptic feedback (if supported)
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
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
            
            document.getElementById('summary-stores').textContent = selectedStoreNames.length > 0 ? selectedStoreNames.join(', ') : (lang === 'nl' ? 'Geen winkels geselecteerd' : 'No stores selected');
        }
        
        function submitForm() {
            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = \`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Processing...\`;
            submitBtn.disabled = true;
            
            // Simulate AI-powered processing
            setTimeout(() => {
                // Track AI personalization
                const email = document.getElementById('email-input').value;
                const userType = detectUserType(email);
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'ai_signup_completed', {
                        event_category: 'conversion',
                        event_label: 'ai_widget_signup',
                        user_type: userType,
                        ai_recommendations_used: selectedStores.length
                    });
                }
                
                // Show success
                alert(lang === 'nl' ? 'AI-powered monitoring geactiveerd!' : 'AI-powered monitoring activated!');
                
                // Reset form
                resetForm();
            }, 2000);
        }
        
        function resetForm() {
            currentStep = 1;
            selectedStores = [];
            
            // Reset form fields
            document.getElementById('email-input').value = '';
            document.getElementById('tags-input').value = '';
            
            // Reset store selections
            document.querySelectorAll('.store-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Clear errors
            clearAllErrors();
            
            // Reset to first step
            updateStep();
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
            ['email-error', 'store-error', 'tags-error'].forEach(errorId => {
                clearError(errorId);
            });
        }
        
        // 2025 Gesture Navigation
        let startX = 0;
        let currentX = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        document.addEventListener('touchend', (e) => {
            currentX = e.changedTouches[0].clientX;
            const diff = currentX - startX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentStep > 1) {
                    prevStep(); // Swipe rechts
                } else if (diff < 0 && currentStep < 4) {
                    nextStep(); // Swipe links
                }
            }
        });
        
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

