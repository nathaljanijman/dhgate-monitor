// ============================================================================
// 2025 FUTURE-PROOF SIGNUP WIDGET
// ============================================================================
// Implements 2024/2025 UX trends: Expert recommendations, accessibility-first, modern design
// Maintains Raleway font as requested

export function generateSignupWidget(env = null, lang = null, theme = 'light') {
  const widgetId = '2025-signup-widget-' + Date.now();
  
  // Set default language if not provided
  if (!lang) {
    lang = 'nl'; // Default fallback
  }
  
  // Expert-recommended store data with UX-driven proposition elements
  const aiStores = [
    {
      id: 1,
      name: 'Dhgate Beauty Misssecret',
      verified: true,
      reason: lang === 'nl' ? 'Premium beauty & mode collectie met 10k+ producten. Geverifieerde verkoper met 4.8★ rating en snelle verzending.' : 'Premium beauty & fashion collection with 10k+ products. Verified seller with 4.8★ rating and fast shipping.',
      kpi: '4.8★',
      kpiLabel: lang === 'nl' ? 'Klantbeoordeling' : 'Customer Rating',
      backgroundImage: 'https://f.dhgate.com/albu/g17/M00/00/00/rBVa4l2XK6SAYVhAAAFuQb0upcU892.jpg'
    },
    {
      id: 2,
      name: 'Luxury Eyewear LTD',
      verified: true,
      reason: lang === 'nl' ? 'Exclusieve zonnebrillen collectie van topmerken. 5.0★ rating met 2.5k+ tevreden klanten en wereldwijde verzending.' : 'Exclusive sunglasses collection from top brands. 5.0★ rating with 2.5k+ satisfied customers and worldwide shipping.',
      kpi: '5.0★',
      kpiLabel: lang === 'nl' ? 'Perfecte score' : 'Perfect Score',
      backgroundImage: 'https://f.dhgate.com/albu/g18/M00/00/00/rBVa4l2XK6SAYVhAAAFuQb0upcU892.jpg'
    },
    {
      id: 3,
      name: 'Spider Jerseys',
      verified: true,
      reason: lang === 'nl' ? 'Officiële sportkleding van topclubs. 4.9★ rating, 15k+ verkopen en authentieke producten met garantie.' : 'Official sports clothing from top clubs. 4.9★ rating, 15k+ sales and authentic products with warranty.',
      kpi: '4.9★',
      kpiLabel: lang === 'nl' ? 'Top verkoper' : 'Top Seller',
      backgroundImage: 'https://f.dhgate.com/albu/g19/M00/00/00/rBVa4l2XK6SAYVhAAAFuQb0upcU892.jpg'
    }
  ];

  const t = lang === 'nl' ? {
    title: 'DHgate Monitor',
    subtitle: 'Expert monitoring voor jouw favoriete winkels',
    aiPowered: 'Aanbevolen',
    step1: 'Email',
    step2: 'Winkel',
    step3: 'Zoektermen',
    step4: 'Bevestiging',
    emailLabel: 'Email adres',
    emailPlaceholder: 'jouw@email.com',
    emailDescription: 'We sturen je updates over nieuwe producten',
    storeTitle: 'Expert-aanbevolen winkels',
    storeDescription: 'Onze experts hebben de beste winkels voor jou geselecteerd',
    addCustomTitle: 'Eigen winkel toevoegen',
    addCustomDescription: 'Voeg een DHgate winkel toe via URL',
    addStorePlaceholder: 'https://www.dhgate.com/store/jouw-winkel',
    addStoreButton: 'Toevoegen',
    tagsLabel: 'Zoektermen (optioneel)',
    tagsPlaceholder: 'bijv. smartphone, handtas, sneakers',
    tagsDescription: 'Beschrijf welke producten je wilt monitoren (optioneel)',
    confirmTitle: 'Bevestig je voorkeuren',
    confirmDescription: 'Controleer je instellingen voordat we beginnen',
    successTitle: 'Monitoring geactiveerd!',
    successDescription: 'Je ontvangt nu updates over nieuwe producten en prijzen',
    dashboardButton: 'Ga naar dashboard',
    newSignupButton: 'Nieuwe aanmelding',
    nextButton: 'Volgende',
    backButton: 'Terug',
    submitButton: 'Start monitoring',
    accessibility: {
      progressLabel: 'Voortgang van aanmelding',
      stepLabel: 'Stap',
      ofLabel: 'van',
      navigationHint: 'Gebruik de knoppen om door de stappen te navigeren'
    }
  } : {
    title: 'DHgate Monitor',
    subtitle: 'Expert monitoring for your favorite stores',
    aiPowered: 'Aanbevolen',
    step1: 'Email',
    step2: 'Store',
    step3: 'Search Terms',
    step4: 'Confirmation',
    emailLabel: 'Email address',
    emailPlaceholder: 'your@email.com',
    emailDescription: 'We\'ll send you updates about new products',
    storeTitle: 'Expert-recommended stores',
    storeDescription: 'Our experts have selected the best stores for you',
    addCustomTitle: 'Add custom store',
    addCustomDescription: 'Add a DHgate store via URL',
    addStorePlaceholder: 'https://www.dhgate.com/store/your-store',
    addStoreButton: 'Add',
    tagsLabel: 'Search terms (optional)',
    tagsPlaceholder: 'e.g. smartphone, handbag, sneakers',
    tagsDescription: 'Describe which products you want to monitor (optional)',
    confirmTitle: 'Confirm your preferences',
    confirmDescription: 'Review your settings before we start',
    successTitle: 'Monitoring activated!',
    successDescription: 'You will now receive updates about new products and prices',
    dashboardButton: 'Go to dashboard',
    newSignupButton: 'New signup',
    nextButton: 'Next',
    backButton: 'Back',
    submitButton: 'Start monitoring',
    accessibility: {
      progressLabel: 'Registration progress',
      stepLabel: 'Step',
      ofLabel: 'of',
      navigationHint: 'Use the buttons to navigate through the steps'
    }
  };
  
  return `<!DOCTYPE html>
<html lang="${lang}" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.title}</title>
    
    <!-- Raleway Font (as requested) -->
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <style>
        :root {
            /* Brand Color System */
            --primary: #2563EB;
            --primary-dark: #1E40AF;
            --accent: #EA580C;
            --accent-dark: #C2410C;
            --success: #10B981;
            --warning: #F59E0B;
            
            /* Neutral Colors */
            --gray-50: ${theme === 'dark' ? '#0F172A' : '#F9FAFB'};
            --gray-100: ${theme === 'dark' ? '#1E293B' : '#F3F4F6'};
            --gray-200: ${theme === 'dark' ? '#334155' : '#E5E7EB'};
            --gray-300: ${theme === 'dark' ? '#475569' : '#D1D5DB'};
            --gray-400: ${theme === "dark" ? "#64748B" : "#9CA3AF"};
            --gray-500: ${theme === "dark" ? "#94A3B8" : "#6B7280"};
            --gray-600: ${theme === "dark" ? "#CBD5E1" : "#4B5563"};
            --gray-700: ${theme === "dark" ? "#E2E8F0" : "#374151"};
            --gray-800: ${theme === "dark" ? "#F1F5F9" : "#1F2937"};
            --gray-900: ${theme === "dark" ? "#F8FAFC" : "#111827"};
            
            /* Typography */
            --text-primary: ${theme === "dark" ? "#FFFFFF" : "#111827"};
            --text-secondary: ${theme === "dark" ? "#CBD5E1" : "#4B5563"};
            --text-muted: ${theme === "dark" ? "#94A3B8" : "#6B7280"};
            
            /* Backgrounds */
            --bg-primary: transparent;
            --bg-secondary: ${theme === "dark" ? "rgba(30, 41, 59, 0.9)" : "rgba(255, 255, 255, 0.9)"};
            --bg-card: ${theme === "dark" ? "rgba(30, 41, 59, 0.95)" : "rgba(255, 255, 255, 0.95)"};
            
            /* 2025 Glassmorphism 2.0 */
            --glass-bg: ${theme === "dark" ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)"};
            --glass-border: ${theme === "dark" ? "rgba(37, 99, 235, 0.3)" : "rgba(0, 0, 0, 0.1)"};
            
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
            font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            color: var(--text-primary);
            line-height: 1.6;
            padding: 0;
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
        }
        
        .widget-container {
            max-width: 480px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            background: var(--glass-bg);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-xl);
            padding: var(--space-8);
            box-shadow: 
                0 20px 64px rgba(0, 0, 0, 0.3),
                0 8px 32px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            position: relative;
        }
        
        .widget-header {
            text-align: center;
            margin-bottom: var(--space-8);
            position: relative;
        }
        
        /* Language Switch - Fixed to top-right corner */
        .language-switch {
            position: fixed;
            top: var(--space-4);
            right: var(--space-4);
            display: flex;
            gap: 2px;
            background: ${theme === "dark" ? "rgba(30, 41, 59, 0.9)" : "rgba(255, 255, 255, 0.95)"};
            border: 1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"};
            border-radius: var(--radius-md);
            padding: 2px;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }
        
        .lang-btn {
            background: transparent;
            border: none;
            color: ${theme === "dark" ? "#94A3B8" : "#6B7280"};
            font-size: 0.75rem;
            font-weight: 600;
            padding: var(--space-1) var(--space-2);
            border-radius: var(--radius-sm);
            cursor: pointer;
            transition: var(--transition);
            font-family: inherit;
            min-width: 32px;
            min-height: 28px;
        }
        
        .lang-btn:hover {
            color: ${theme === "dark" ? "#CBD5E1" : "#4B5563"};
            background: ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"};
        }
        
        .lang-btn.active {
            background: var(--primary);
            color: white;
            box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
        }
        
        .widget-title {
            font-size: clamp(1.5rem, 1.2rem + 1.5vw, 2rem);
            font-weight: 700;
            margin-bottom: var(--space-2);
            color: ${theme === "dark" ? "#FFFFFF" : "#111827"};
            letter-spacing: -0.025em;
        }
        
        .widget-subtitle {
            font-size: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
            color: ${theme === "dark" ? "#CBD5E1" : "#4B5563"};
            line-height: 1.6;
            font-weight: 400;
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
            background: ${theme === "dark" ? "rgba(30, 41, 59, 0.9)" : "rgba(255, 255, 255, 0.9)"};
            border: 2px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.875rem;
            font-weight: 600;
            color: ${theme === "dark" ? "#94A3B8" : "#6B7280"};
            transition: var(--transition);
        }
        
        .step-indicator.active {
            background: var(--primary);
            border-color: var(--primary);
            color: white;
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }
        
        .step-indicator.completed {
            background: var(--primary);
            border-color: var(--primary);
            color: white;
        }
        
        .step-label {
            font-size: 0.75rem;
            color: ${theme === "dark" ? "#94A3B8" : "#6B7280"};
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
        
        .store-selection-group {
            margin-top: var(--space-4);
        }
        
        .form-label {
            display: block;
            font-weight: 600;
            margin-bottom: var(--space-2);
            color: ${theme === "dark" ? "#FFFFFF" : "#111827"};
            font-size: 0.875rem;
        }
        
        .form-input {
            width: 100%;
            padding: var(--space-3) var(--space-4);
            border: 1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"};
            border-radius: var(--radius-md);
            background: ${theme === "dark" ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)"};
            color: var(--text-primary);
            font-size: 1rem;
            min-height: 44px; /* Mobile touch target compliance */
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
            color: ${theme === "dark" ? "#CBD5E1" : "#4B5563"};
            margin-top: var(--space-2);
            line-height: 1.5;
        }
        
        /* AI-Powered Store Cards (2025 trend) */
        .store-grid {
            display: grid;
            gap: var(--space-4);
            margin-bottom: var(--space-6);
        }
        
        .store-card {
            border: 1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.08)"};
            border-radius: var(--radius-lg);
            padding: var(--space-4);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: ${theme === "dark" ? "rgba(30, 41, 59, 0.9)" : "rgba(255, 255, 255, 0.9)"};
            backdrop-filter: blur(12px);
            position: relative;
            min-height: 160px;
            overflow: hidden;
            margin-bottom: var(--space-4);
        }
        
        /* Exclusive Linear-style background pattern */
        .store-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(147, 197, 253, 0.05) 0%, transparent 50%);
            opacity: 0.8;
            transition: opacity 0.3s ease;
            z-index: 1;
        }
        
        /* Product image overlay for beauty store */
        .store-card[data-store-id="1"]::before {
            background: 
                var(--store-bg-image, none),
                radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.08) 0%, transparent 60%),
                radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.06) 0%, transparent 60%);
            background-size: cover, 80% 80%, 80% 80%;
            background-position: center, 70% 30%, 30% 70%;
            background-blend-mode: overlay, normal, normal;
        }
        
        /* Eyewear store styling */
        .store-card[data-store-id="2"]::before {
            background: 
                radial-gradient(circle at 60% 40%, rgba(251, 191, 36, 0.08) 0%, transparent 60%),
                radial-gradient(circle at 40% 60%, rgba(37, 99, 235, 0.06) 0%, transparent 60%);
        }
        
        /* Sports store styling */
        .store-card[data-store-id="3"]::before {
            background: 
                radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.08) 0%, transparent 60%),
                radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.06) 0%, transparent 60%);
        }
        
        .store-card > * {
            position: relative;
            z-index: 2;
        }
        
        .store-card:hover {
            border-color: var(--primary);
            box-shadow: 
                0 8px 25px rgba(37, 99, 235, 0.12),
                0 3px 12px rgba(0, 0, 0, 0.08);
            transform: translateY(-2px) scale(1.005);
        }
        
        .store-card:hover::before {
            opacity: 1;
        }
        
        .store-card:hover .store-icon {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
        }
        
        .store-card.selected {
            border-color: var(--primary);
            background: rgba(37, 99, 235, 0.08);
            box-shadow: 
                0 0 0 2px rgba(37, 99, 235, 0.2),
                0 8px 25px rgba(37, 99, 235, 0.15);
            transform: translateY(-1px) scale(1.002);
        }
        
        .store-card.selected::before {
            opacity: 1;
        }
        
        .ai-badge {
            position: absolute;
            top: var(--space-3);
            right: var(--space-3);
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: white;
            font-size: 0.75rem;
            font-weight: 600;
            padding: var(--space-1) var(--space-2);
            border-radius: var(--radius-sm);
            z-index: 5;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            max-width: 120px;
            text-align: center;
        }
        
        .store-header {
            display: flex;
            align-items: flex-start;
            gap: var(--space-3);
            margin-bottom: var(--space-3);
            padding-right: 140px; /* Make room for the badge */
        }
        
        .store-icon {
            flex-shrink: 0;
            width: 44px;
            height: 44px;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
            transition: var(--transition);
        }
        
        .store-name-container {
            flex: 1;
            min-width: 0; /* Allow text to wrap */
            overflow: hidden;
        }
        
        .store-name {
            font-weight: 600;
            color: ${theme === "dark" ? "#FFFFFF" : "#111827"};
            font-size: 0.875rem;
            line-height: 1.3;
            margin-bottom: var(--space-1);
        }
        

        
        .store-proposition {
            font-size: 0.875rem;
            color: ${theme === "dark" ? "#CBD5E1" : "#4B5563"};
            margin: var(--space-2) 0 var(--space-3) 0;
            font-weight: 500;
            line-height: 1.4;
        }
        
        /* Store KPI styling */
        .store-kpi {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: ${theme === "dark" ? "rgba(37, 99, 235, 0.1)" : "rgba(37, 99, 235, 0.05)"};
            padding: var(--space-2) var(--space-3);
            border-radius: var(--radius-sm);
            border: 1px solid ${theme === "dark" ? "rgba(37, 99, 235, 0.2)" : "rgba(37, 99, 235, 0.1)"};
            margin-bottom: var(--space-3);
        }
        
        .kpi-label {
            font-size: 0.75rem;
            color: ${theme === "dark" ? "#94A3B8" : "#6B7280"};
            font-weight: 500;
        }
        
        .kpi-value {
            font-size: 0.875rem;
            color: var(--accent);
            font-weight: 600;
        }
        
        /* Store actions - clean action area */
        .store-actions {
            margin-top: 0;
        }
        
        /* Verification badge */
        .verified-badge {
            display: flex;
            align-items: center;
            gap: 2px;
            font-size: 0.625rem;
            font-weight: 500;
            color: var(--primary);
            margin-top: var(--space-1);
            white-space: nowrap;
        }
        
        /* Custom Store Section */
        .custom-store-section {
            margin-top: var(--space-6);
            padding: var(--space-4);
            border: 2px dashed ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"};
            border-radius: var(--radius-md);
            background: ${theme === "dark" ? "rgba(30, 41, 59, 0.3)" : "rgba(255, 255, 255, 0.3)"};
        }
        
        .custom-store-header {
            margin-bottom: var(--space-3);
        }
        
        .custom-store-title {
            font-size: 0.875rem;
            font-weight: 600;
            color: ${theme === "dark" ? "#FFFFFF" : "#111827"};
            margin-bottom: var(--space-1);
        }
        
        .custom-store-description {
            font-size: 0.75rem;
            color: ${theme === "dark" ? "#94A3B8" : "#6B7280"};
            line-height: 1.4;
            margin-bottom: var(--space-2);
        }
        
        .url-format-hint {
            display: flex;
            align-items: center;
            gap: var(--space-2);
            color: ${theme === "dark" ? "#94A3B8" : "#6B7280"};
            font-size: 0.75rem;
            margin-bottom: var(--space-3);
            padding: var(--space-2);
            background: ${theme === "dark" ? "rgba(30, 41, 59, 0.6)" : "rgba(255, 255, 255, 0.6)"};
            border-radius: var(--radius-sm);
            border-left: 3px solid var(--primary);
        }
        
        .url-format-hint svg {
            color: var(--primary);
            flex-shrink: 0;
        }
        
        .custom-store-input-group {
            display: flex;
            gap: var(--space-2);
            align-items: stretch;
            flex-wrap: wrap;
        }
        
        .custom-store-input {
            flex: 1;
            min-width: 200px;
            padding: var(--space-2) var(--space-3);
            border: 1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"};
            border-radius: var(--radius);
            background: ${theme === "dark" ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)"};
            color: ${theme === "dark" ? "#FFFFFF" : "#111827"};
            font-size: 0.875rem;
            font-family: inherit;
            min-height: 28px;
        }
        
        .custom-store-input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
        }
        
        .custom-store-input::placeholder {
            color: ${theme === "dark" ? "#94A3B8" : "#6B7280"};
        }
        
        .custom-store-btn {
            flex-shrink: 0;
            min-width: 50px;
            padding: var(--space-1) var(--space-2);
            min-height: 28px;
            white-space: nowrap;
            font-size: 0.6rem;
            font-weight: 400;
            border-radius: var(--radius-sm);
        }
        
        /* Success Summary Styling */
        .success-summary {
            text-align: center;
            padding: var(--space-6) 0;
        }
        
        .success-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, var(--success), #059669);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto var(--space-6);
            color: white;
            box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
        }
        
        .success-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: ${theme === "dark" ? "#FFFFFF" : "#111827"};
            margin-bottom: var(--space-2);
        }
        
        .success-description {
            font-size: 1rem;
            color: ${theme === "dark" ? "#CBD5E1" : "#4B5563"};
            margin-bottom: var(--space-8);
            line-height: 1.6;
        }
        
        .summary-cards {
            display: grid;
            gap: var(--space-4);
            margin-bottom: var(--space-8);
        }
        
        .summary-card {
            background: ${theme === "dark" ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)"};
            border: 1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"};
            border-radius: var(--radius-md);
            padding: var(--space-4);
            text-align: left;
        }
        
        .summary-card-header {
            display: flex;
            align-items: center;
            gap: var(--space-2);
            margin-bottom: var(--space-2);
        }
        
        .summary-card-header svg {
            color: var(--primary);
        }
        
        .summary-card-title {
            font-size: 0.875rem;
            font-weight: 600;
            color: ${theme === "dark" ? "#FFFFFF" : "#111827"};
        }
        
        .summary-card-content {
            font-size: 0.875rem;
            color: ${theme === "dark" ? "#CBD5E1" : "#4B5563"};
            line-height: 1.5;
            word-break: break-word;
        }
        
        .dashboard-actions {
            display: flex;
            gap: var(--space-3);
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .dashboard-link {
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
        }
        

        
        /* Shop link styling - minimalist text */
        .store-link-minimal {
            color: var(--primary);
            text-decoration: none;
            font-size: 0.75rem;
            font-weight: 500;
            transition: var(--transition);
            border-bottom: 1px solid transparent;
        }
        
        .store-link-minimal:hover {
            color: var(--primary-dark);
            border-bottom-color: var(--primary);
        }
        
        .store-check {
            position: absolute;
            top: var(--space-3);
            left: var(--space-3);
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
            z-index: 10;
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
            flex-wrap: wrap;
            align-items: center;
        }
        
        .btn {
            font-family: inherit;
            font-weight: 600;
            padding: var(--space-3) var(--space-4);
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
            min-width: 80px;
            min-height: 44px; /* Accessibility requirement */
            white-space: nowrap;
        }
        
        .btn-primary {
            background: var(--primary);
            color: white;
            box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
        }
        
        .btn-primary:hover {
            background: var(--primary-dark);
            box-shadow: 0 4px 8px rgba(37, 99, 235, 0.3);
            transform: translateY(-1px);
        }
        
        .btn-primary:active {
            transform: scale(0.98);
            transition: transform 0.1s ease;
        }
        
        .btn-secondary {
            background: ${theme === "dark" ? "rgba(30, 41, 59, 0.95)" : "rgba(255, 255, 255, 0.95)"};
            color: ${theme === "dark" ? "#FFFFFF" : "#111827"};
            border: 2px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.3)"};
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .btn-secondary:hover {
            background: ${theme === "dark" ? "rgba(30, 41, 59, 1)" : "rgba(255, 255, 255, 1)"};
            border-color: ${theme === "dark" ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.4)"};
            color: ${theme === "dark" ? "#FFFFFF" : "#111827"};
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
        
        /* Error Messages */
        .error-message {
            color: var(--warning);
            font-size: 0.875rem;
            margin-top: var(--space-2);
            display: none;
        }
        
        .error-message.show {
            display: block;
        }
        
        /* Accessibility Features */
        .accessibility-hint {
            font-size: 0.75rem;
            color: var(--text-muted);
            text-align: center;
            margin-top: var(--space-4);
            padding: var(--space-2);
            background: ${theme === "dark" ? "rgba(30, 41, 59, 0.6)" : "rgba(255, 255, 255, 0.6)"};
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
                --bg-primary: transparent;
                --text-primary: #FFFFFF;
                --text-secondary: #CBD5E1;
                --text-muted: #94A3B8;
                --bg-secondary: rgba(30, 41, 59, 0.9);
                --bg-card: rgba(30, 41, 59, 0.95);
                --gray-200: #404040;
            }
        }
        
        /* Mobile Responsive */
        @media (max-width: 640px) {
            body { padding: var(--space-4); }
            .widget-container { padding: var(--space-6); }
            .button-group { 
                flex-direction: column; 
                gap: var(--space-2);
            }
            .btn { 
                width: 100%; 
                min-height: 48px; /* Larger touch targets on mobile */
            }
            
            .store-header {
                padding-right: 120px; /* Medium padding for tablets */
            }
            
            .ai-badge {
                max-width: 100px; /* Medium badge size for tablets */
            }
            
            .language-switch {
                position: relative;
                top: auto;
                right: auto;
                margin: 0 auto var(--space-4) auto;
                justify-content: center;
            }
            
            .conversion-rate {
                font-size: 0.625rem;
            }
            
            /* Custom store input group mobile */
            .custom-store-input-group {
                flex-direction: column;
                gap: var(--space-3);
            }
            
            .custom-store-input {
                min-width: unset;
                width: 100%;
            }
            
            .custom-store-btn {
                width: 100%;
                min-width: unset;
            }
        }
        
        @media (max-width: 480px) {
            .store-card {
                padding: var(--space-3);
                min-height: 120px; /* Maintain clean height */
            }
            
            .store-header {
                padding-right: 100px; /* Reduce padding for mobile */
            }
            
            .ai-badge {
                font-size: 0.625rem;
                padding: 2px var(--space-1);
                max-width: 80px; /* Smaller badge on mobile */
            }
            
            .store-link-minimal {
                font-size: 0.625rem;
            }
            

            
            .custom-store-section {
                padding: var(--space-3);
            }
            
            .summary-cards {
                gap: var(--space-3);
            }
            
            .dashboard-actions {
                flex-direction: column;
                gap: var(--space-2);
            }
            
            .dashboard-actions .btn {
                width: 100%;
            }
        }
        
        /* Focus Management */
        .btn:focus,
        .form-input:focus,
        .store-card:focus {
            outline: 2px solid var(--primary);
            outline-offset: 2px;
        }
    </style>
</head>
<body>
    <div class="widget-container">
        <div class="widget-header">
            <div class="language-switch">
                <button class="lang-btn ${lang === "nl" ? "active" : ""}" onclick="switchLanguage('nl')" aria-label="Switch to Dutch">
                    NL
                </button>
                <button class="lang-btn ${lang === 'en' ? 'active' : ''}" onclick="switchLanguage('en')" aria-label="Switch to English">
                    EN
                </button>
            </div>
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
                <div class="error-message" id="email-error"></div>
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
                
                <div class="store-selection-group">
                <div class="store-grid">
                    ${aiStores.map(store => `
                            <div class="store-card" data-store-id="${store.id}" onclick="selectStore(${store.id})" tabindex="0" role="button" aria-label="${lang === 'nl' ? 'Selecteer' : 'Select'} ${store.name}" style="--store-bg-image: url('${store.backgroundImage}')">
                            <div class="ai-badge">${t.aiPowered}</div>
                            <div class="store-check" aria-hidden="true">✓</div>
                                
                            <div class="store-header">
                                    <div class="store-icon">
                                        ${store.id === 1 ? `
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                                                <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                                            </svg>
                                        ` : store.id === 2 ? `
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="3"/>
                                                <path d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6z"/>
                                            </svg>
                                        ` : `
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"/>
                                                <polygon points="10,8 16,12 10,16 10,8"/>
                                            </svg>
                                        `}
                                    </div>
                                    <div class="store-name-container">
                                <div class="store-name">${store.name}</div>
                                        ${store.verified ? `<div class="verified-badge">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            ${lang === 'nl' ? 'Geverifieerd' : 'Verified'}
                                        </div>` : ''}
                            </div>
                                </div>
                                
                                                                <div class="store-proposition">${store.reason}</div>
                                
                                <div class="store-kpi">
                                    <span class="kpi-label">${store.kpiLabel}</span>
                                    <span class="kpi-value">${store.kpi}</span>
                                </div>
                                
                                <div class="store-actions">
                                    <a href="${store.id === 1 ? 'https://www.dhgate.com/store/products/20522858.html' : store.id === 2 ? 'https://www.dhgate.com/store/top-selling/19846261.html' : 'https://www.dhgate.com/store/21168508'}" 
                                       target="_blank" 
                                       class="store-link-minimal" 
                                       onclick="event.stopPropagation()"
                                       aria-label="${lang === 'nl' ? 'Bekijk' : 'View'} ${store.name} ${lang === 'nl' ? 'op DHgate' : 'on DHgate'}">
                                        ${lang === 'nl' ? 'Bekijk winkel' : 'View store'}
                                    </a>
                            </div>
                        </div>
                    `).join('')}
                    </div>
                </div>
                
                <!-- Custom Store Section -->
                <div class="custom-store-section">
                    <div class="custom-store-header">
                        <h3 class="custom-store-title">${t.addCustomTitle}</h3>
                        <p class="custom-store-description">${t.addCustomDescription}</p>
                        <div class="url-format-hint">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3"/>
                                <line x1="12" y1="17" x2="12.01" y2="17"/>
                            </svg>
                            <span>${lang === 'nl' ? 'Format: https://www.dhgate.com/store/[winkelnaam]' : 'Format: https://www.dhgate.com/store/[storename]'}</span>
                        </div>
                    </div>
                    
                    <div class="custom-store-input-group">
                        <input 
                            type="url" 
                            class="custom-store-input" 
                            id="custom-store-url" 
                            placeholder="${t.addStorePlaceholder}"
                            aria-label="${t.addStorePlaceholder}"
                        >
                        <button class="btn btn-secondary custom-store-btn" onclick="addCustomStore()">
                            ${t.addStoreButton}
                        </button>
                    </div>
                    
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
        
        <!-- Step 4: Summary & Dashboard Link -->
        <div class="step-content" id="step-4-content">
            <div class="success-summary">
                <div class="success-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                        <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                </div>
                
                <h2 class="success-title">${t.successTitle}</h2>
                <p class="success-description">${t.successDescription}</p>
                
                <div class="summary-cards">
                    <div class="summary-card">
                        <div class="summary-card-header">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                            <span class="summary-card-title">Email</span>
                    </div>
                        <div class="summary-card-content" id="summary-email"></div>
                </div>
                
                    <div class="summary-card">
                        <div class="summary-card-header">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                                <polyline points="9,22 9,12 15,12 15,22"/>
                            </svg>
                            <span class="summary-card-title">Winkels</span>
                    </div>
                        <div class="summary-card-content" id="summary-stores"></div>
                </div>
                
                    <div class="summary-card">
                        <div class="summary-card-header">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                            <span class="summary-card-title">Zoektermen</span>
                    </div>
                        <div class="summary-card-content" id="summary-tags"></div>
                </div>
            </div>
            
                <div class="dashboard-actions">
                    <a href="/dashboard" class="btn btn-primary dashboard-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="7" height="7"/>
                            <rect x="14" y="3" width="7" height="7"/>
                            <rect x="14" y="14" width="7" height="7"/>
                            <rect x="3" y="14" width="7" height="7"/>
                    </svg>
                        ${t.dashboardButton}
                    </a>
                    
                    <button class="btn btn-secondary" onclick="resetForm()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 12a9 9 0 0118 0 9 9 0 01-18 0z"/>
                            <path d="M12 8v8l4-4"/>
                    </svg>
                        ${t.newSignupButton}
                </button>
                </div>
            </div>
        </div>
        
        <!-- Accessibility Hint -->
        <div class="accessibility-hint" aria-live="polite">
            ${t.accessibility.navigationHint}
        </div>
    </div>
    
    <script>
        // 2025 Widget State
        let currentStep = 1;
        let selectedStores = [];
        let customStores = [];
        let dashboardKey = null;
        const stores = ${JSON.stringify(aiStores)};
        
        // Language detection with URL parameter override
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        let lang = urlLang && ['nl', 'en'].includes(urlLang) ? urlLang : '${lang}';
        
        // Language switching function
        function switchLanguage(newLang) {
            if (newLang === lang) return;
            
            // Update URL with new language parameter
            const url = new URL(window.location);
            url.searchParams.set('lang', newLang);
            window.history.pushState({}, '', url);
            
            // Reload the widget with new language
            location.reload();
        }
        
        // Verify DHgate images are loading correctly
        function verifyBackgroundImages() {
            const storeCards = document.querySelectorAll('.store-card');
            console.log('Verifying ' + storeCards.length + ' store cards with DHgate images');
            
            storeCards.forEach((card, index) => {
                const bgImage = getComputedStyle(card).getPropertyValue('--store-bg-image');
                if (bgImage && bgImage !== 'none') {
                    console.log('✅ Store ' + (index + 1) + ' has background image: ' + bgImage);
                } else {
                    console.log('⚠️ Store ' + (index + 1) + ' missing background image');
                }
            });
        }
        
        // Generate unique dashboard key
        function generateDashboardKey() {
            // Generate a proper unique token similar to the backend
            const data = 'widget_dashboard_' + Date.now() + Math.random();
            return btoa(data).replace(/[+/=]/g, '').substring(0, 32);
        }
        
        // Expert User Type Detection
        function detectUserType(email) {
            // Expert-based user type detection
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
                if (selectedStores.length === 0 && customStores.length === 0) {
                    showError('store-error', lang === 'nl' ? 'Selecteer minimaal één winkel of voeg een eigen winkel toe' : 'Please select at least one store or add a custom store');
                    return false;
                }
            } else if (currentStep === 3) {
                // Tags are optional - no validation needed
            }
            
            return true;
        }
        
        function selectStore(storeId) {
            const storeCard = document.querySelector('[data-store-id="' + storeId + '"]');
            const isSelected = selectedStores.includes(storeId);
            
            if (isSelected) {
                selectedStores = selectedStores.filter(id => id !== storeId);
                storeCard.classList.remove('selected');
            } else {
                selectedStores.push(storeId);
                storeCard.classList.add('selected');
            }
            
            // Haptic feedback (2025 trend)
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        }
        
        function addCustomStore() {
            const urlInput = document.getElementById('custom-store-url');
            const url = urlInput.value.trim();
            
            if (!url) {
                showError('custom-store-error', lang === 'nl' ? 'Voer een DHgate winkel URL in' : 'Please enter a DHgate store URL');
                return;
            }
            
            if (!url.includes('dhgate.com')) {
                showError('custom-store-error', lang === 'nl' ? 'Voer een geldige DHgate winkel URL in' : 'Please enter a valid DHgate store URL');
                return;
            }
            
            // Extract store name from URL or use a default
            const storeName = extractStoreNameFromUrl(url) || (lang === 'nl' ? 'Aangepaste winkel' : 'Custom store');
            
            customStores.push({
                name: storeName,
                url: url
            });
            
            // Clear input and show success
            urlInput.value = '';
            clearError('custom-store-error');
            
            // Show success feedback
            const customSection = document.querySelector('.custom-store-section');
            customSection.style.borderColor = 'var(--success)';
            customSection.style.background = 'rgba(16, 185, 129, 0.05)';
            
            // Reset styling after 2 seconds
            setTimeout(() => {
                customSection.style.borderColor = '';
                customSection.style.background = '';
            }, 2000);
        }
        
        function extractStoreNameFromUrl(url) {
            try {
                const urlObj = new URL(url);
                const pathParts = urlObj.pathname.split('/');
                const storePart = pathParts.find(part => part.includes('store'));
                if (storePart) {
                    return storePart.replace('store-', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                }
            } catch (e) {
                // Invalid URL, return null
            }
            return null;
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
            
            // Add custom stores to the list
            if (customStores.length > 0) {
                customStores.forEach(customStore => {
                    selectedStoreNames.push(customStore.name || (lang === 'nl' ? 'Aangepaste winkel' : 'Custom store'));
                });
            }
            
            document.getElementById('summary-stores').textContent = selectedStoreNames.length > 0 ? selectedStoreNames.join(', ') : (lang === 'nl' ? 'Geen winkels geselecteerd' : 'No stores selected');
            
            // Set dashboard link to pending initially
            const dashboardLink = document.querySelector('.dashboard-link');
            if (dashboardLink) {
                dashboardLink.href = '#';
                dashboardLink.style.opacity = '0.6';
                dashboardLink.style.pointerEvents = 'none';
                dashboardLink.innerHTML = 
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                        '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>' +
                    '</svg>' +
                    (lang === 'nl' ? 'Monitoring activeren...' : 'Activating monitoring...');
            }
            
            // Automatically submit the form when reaching step 4
            setTimeout(() => submitForm(), 500);
        }
        
        function submitForm() {
            // Get form data
            const email = document.getElementById('email-input').value;
            const tags = document.getElementById('tags-input').value;
            const selectedStoreNames = selectedStores.map(id => {
                const store = stores.find(s => s.id === id);
                return store ? store.name : '';
            }).filter(name => name);
            
            // Add custom stores
            const allStoreNames = [...selectedStoreNames];
            if (customStores.length > 0) {
                customStores.forEach(customStore => {
                    allStoreNames.push(customStore.name || (lang === 'nl' ? 'Aangepaste winkel' : 'Custom store'));
                });
            }
            
            // Submit to API
            fetch('/api/widget-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    stores: allStoreNames,
                    tags: tags,
                    lang: lang
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Track expert recommendations usage
                    const userType = detectUserType(email);
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'expert_signup_completed', {
                            event_category: 'conversion',
                            event_label: 'expert_widget_signup',
                            user_type: userType,
                            expert_recommendations_used: selectedStores.length
                        });
                    }
                    
                    // Update dashboard link with real token from API
                    const dashboardLink = document.querySelector('.dashboard-link');
                    if (data.dashboardToken && dashboardLink) {
                        dashboardLink.href = '/dashboard?key=' + data.dashboardToken + '&lang=' + lang;
                        dashboardLink.style.opacity = '1';
                        dashboardLink.style.pointerEvents = 'auto';
                        dashboardLink.innerHTML = 
                            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                                '<rect x="3" y="3" width="7" height="7"/>' +
                                '<rect x="14" y="3" width="7" height="7"/>' +
                                '<rect x="14" y="14" width="7" height="7"/>' +
                                '<rect x="3" y="14" width="7" height="7"/>' +
                            '</svg>' +
                            t.dashboardButton;
                        console.log('✅ Dashboard link activated with token:', data.dashboardToken);
                        
                        // Store the token for later use
                        dashboardKey = data.dashboardToken;
                    } else {
                        console.error('❌ No dashboard token received from API');
                        // Fallback to generated token
                        dashboardKey = generateDashboardKey();
                        if (dashboardLink) {
                            dashboardLink.href = '/dashboard?key=' + dashboardKey + '&lang=' + lang;
                            dashboardLink.style.opacity = '1';
                            dashboardLink.style.pointerEvents = 'auto';
                            dashboardLink.innerHTML = 
                                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                                    '<rect x="3" y="3" width="7" height="7"/>' +
                                    '<rect x="14" y="3" width="7" height="7"/>' +
                                    '<rect x="14" y="14" width="7" height="7"/>' +
                                    '<rect x="3" y="14" width="7" height="7"/>' +
                                '</svg>' +
                                t.dashboardButton;
                        }
                    }
                } else {
                    console.error('API Error:', data.message);
                    // Show error and allow retry
                    const dashboardLink = document.querySelector('.dashboard-link');
                    if (dashboardLink) {
                        dashboardLink.innerHTML = 
                            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                                '<path d="M12 9v3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>' +
                            '</svg>' +
                            (lang === 'nl' ? 'Fout - probeer opnieuw' : 'Error - try again'); 
                        dashboardLink.style.opacity = '0.6';
                        dashboardLink.onclick = () => submitForm();
                    }
                }
            })
            .catch(error => {
                console.error('Network Error:', error);
                const dashboardLink = document.querySelector('.dashboard-link');
                if (dashboardLink) {
                    dashboardLink.innerHTML = 
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                            '<path d="M12 9v3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>' +
                        '</svg>' +
                        (lang === 'nl' ? 'Netwerk fout' : 'Network error'); 
                    dashboardLink.style.opacity = '0.6';
                    dashboardLink.onclick = () => submitForm();
                }
            });
        }
        
        function resetForm() {
            currentStep = 1;
            selectedStores = [];
            customStores = [];
            dashboardKey = null;
            
            // Reset form fields
            document.getElementById('email-input').value = '';
            document.getElementById('tags-input').value = '';
            document.getElementById('custom-store-url').value = '';
            
            // Reset store selections
            document.querySelectorAll('.store-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Reset custom store section styling
            const customSection = document.querySelector('.custom-store-section');
            if (customSection) {
                customSection.style.borderColor = '';
                customSection.style.background = '';
            }
            
            // Reset dashboard link to placeholder
            const dashboardLink = document.querySelector('.dashboard-link');
            if (dashboardLink) {
                dashboardLink.href = '#';
                dashboardLink.style.opacity = '0.6';
                dashboardLink.style.pointerEvents = 'none';
                dashboardLink.innerHTML = 
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                        '<rect x="3" y="3" width="7" height="7"/>' +
                        '<rect x="14" y="3" width="7" height="7"/>' +
                        '<rect x="14" y="14" width="7" height="7"/>' +
                        '<rect x="3" y="14" width="7" height="7"/>' +
                    '</svg>' +
                    '${t.dashboardButton}'; 
            }
            
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
        
        // 2025 Keyboard & Accessibility Navigation
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' && event.target.classList.contains('form-input')) {
                nextStep();
            }
            
            // Arrow key navigation for accessibility
            if (event.key === 'ArrowRight' && currentStep < 4) {
                nextStep();
            } else if (event.key === 'ArrowLeft' && currentStep > 1) {
                prevStep();
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
            
            // Add click handler for dashboard link to reset form after navigation
            const dashboardLink = document.querySelector('.dashboard-link');
            if (dashboardLink) {
                dashboardLink.addEventListener('click', function(e) {
                    // Only allow click if link is active (has real token)
                    if (dashboardLink.href === '#' || dashboardLink.style.pointerEvents === 'none') {
                        e.preventDefault();
                        return false;
                    }
                    
                    // Reset form after user clicks dashboard link
                    setTimeout(() => {
                        resetForm();
                    }, 1000); // Small delay to ensure navigation happens
                });
            }
            
            // Test and set background images after DOM is loaded
            setTimeout(verifyBackgroundImages, 500);
        });
    </script>
</body>
</html>`;
}