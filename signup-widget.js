// ============================================================================
// EMBEDDABLE DHGATE MONITOR SIGNUP WIDGET
// ============================================================================
// Minimalist, elegant signup form with enhanced UX

export function generateSignupWidget(env = null, lang = 'nl', theme = 'light') {
  const widgetId = 'dhgate-signup-widget-' + Date.now();
  
  // Featured stores data - minimalist approach
  const featuredStores = [
    {
      id: 1,
      name: 'ECOBAG Store',
      url: 'https://www.dhgate.com/store/20062391',
      rating: 4.9,
      reviews: 8547,
      category: lang === 'nl' ? 'Mode & Tassen' : 'Fashion & Bags',
      description: lang === 'nl' ? 'Luxe handtassen en mode accessoires' : 'Luxury handbags and fashion accessories',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop&auto=format',
      monthlySales: lang === 'nl' ? '2.847 verkopen/maand' : '2,847 sales/month',
      shippingTime: lang === 'nl' ? '7-12 dagen' : '7-12 days',
      satisfaction: lang === 'nl' ? '98% tevredenheid' : '98% satisfaction'
    },
    {
      id: 2,
      name: 'Global Technology',
      url: 'https://www.dhgate.com/store/19998142',
      rating: 4.8,
      reviews: 12456,
      category: lang === 'nl' ? 'Elektronica' : 'Electronics',
      description: lang === 'nl' ? 'Telefoons, gadgets en elektronica' : 'Phones, gadgets and electronics',
      image: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=300&h=200&fit=crop&auto=format',
      monthlySales: lang === 'nl' ? '5.234 verkopen/maand' : '5,234 sales/month',
      shippingTime: lang === 'nl' ? '5-10 dagen' : '5-10 days',
      satisfaction: lang === 'nl' ? '96% tevredenheid' : '96% satisfaction'
    },
    {
      id: 3,
      name: 'Watch World',
      url: 'https://www.dhgate.com/store/20283981',
      rating: 4.7,
      reviews: 6789,
      category: lang === 'nl' ? 'Horloges' : 'Watches',
      description: lang === 'nl' ? 'Premium horloges en sieraden' : 'Premium watches and jewelry',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop&auto=format',
      monthlySales: lang === 'nl' ? '1.892 verkopen/maand' : '1,892 sales/month',
      shippingTime: lang === 'nl' ? '10-15 dagen' : '10-15 days',
      satisfaction: lang === 'nl' ? '99% tevredenheid' : '99% satisfaction'
    },
    {
      id: 4,
      name: 'Sports Authority',
      url: 'https://www.dhgate.com/store/20147638',
      rating: 4.6,
      reviews: 4321,
      category: lang === 'nl' ? 'Sport & Outdoor' : 'Sports & Outdoors',
      description: lang === 'nl' ? 'Sportkleding en sneakers' : 'Sports apparel and sneakers',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&auto=format',
      monthlySales: lang === 'nl' ? '3.156 verkopen/maand' : '3,156 sales/month',
      shippingTime: lang === 'nl' ? '8-14 dagen' : '8-14 days',
      satisfaction: lang === 'nl' ? '97% tevredenheid' : '97% satisfaction'
    }
  ];

  const t = lang === 'nl' ? {
    title: 'DHgate Monitor',
    subtitle: 'Monitor je favoriete winkels en krijg updates over nieuwe producten. Naast het volgen van shops kun je nu ook specifieke producten tracken met prijs-, voorraad- en reviewalerts. Mis nooit een deal!',
    step1: 'Email',
    step2: 'Winkel',
    step3: 'Zoektermen',
    step4: 'Bevestiging',
    step5: 'Klaar',
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
    accessibility: {
      progressLabel: 'Voortgang van aanmelding',
      stepLabel: 'Stap',
      ofLabel: 'van'
    }
  } : {
    title: 'DHgate Monitor',
    subtitle: 'Monitor your favorite stores and get updates about new products. In addition to tracking shops, you can now also track specific products with price, stock, and review alerts. Never miss a deal!',
    step1: 'Email',
    step2: 'Store',
    step3: 'Search Terms',
    step4: 'Confirmation',
    step5: 'Done',
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
    
    <!-- Google Fonts - Raleway for Premium Button System -->
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --primary: #2563eb;
            --primary-light: #3b82f6;
            --success: #10b981;
            --text-primary: ${theme === 'dark' ? '#f8fafc' : '#1e293b'};
            --text-secondary: ${theme === 'dark' ? '#cbd5e1' : '#64748b'};
            --text-muted: ${theme === 'dark' ? '#94a3b8' : '#94a3b8'};
            --bg-primary: ${theme === 'dark' ? '#0f172a' : '#ffffff'};
            --bg-secondary: ${theme === 'dark' ? '#1e293b' : '#f8fafc'};
            --border: ${theme === 'dark' ? '#334155' : '#e2e8f0'};
            --border-light: ${theme === 'dark' ? '#475569' : '#f1f5f9'};
            --shadow: ${theme === 'dark' ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)'};
            --shadow-lg: ${theme === 'dark' ? '0 10px 25px rgba(0, 0, 0, 0.4)' : '0 10px 25px rgba(0, 0, 0, 0.1)'};
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            padding: 1.5rem;
        }
        
        .widget-container {
            max-width: 800px;
            margin: 0 auto;
            background: var(--bg-primary);
            border-radius: 16px;
            padding: 2rem;
            box-shadow: var(--shadow-lg);
        }
        
        .widget-header {
            text-align: center;
            margin-bottom: 2.5rem;
        }
        
        .widget-title {
            font-size: 1.75rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--text-primary);
        }
        
        .widget-subtitle {
            font-size: 1rem;
            color: var(--text-secondary);
            max-width: 500px;
            margin: 0 auto;
        }
        
        /* Progress Bar */
        .progress-container {
            margin-bottom: 2.5rem;
      }
      
      .progress-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
        margin-bottom: 1rem;
        }
        
        .progress-line {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--border);
            transform: translateY(-50%);
            z-index: 1;
      }
      
      .progress-fill {
            position: absolute;
            top: 0;
            left: 0;
        height: 100%;
            background: var(--primary);
            transition: width 0.4s ease;
            z-index: 2;
            width: 0%;
      }
      
      .progress-step {
            position: relative;
            z-index: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }
      
        .step-indicator {
            width: 32px;
            height: 32px;
        border-radius: 50%;
        background: var(--bg-primary);
            border: 2px solid var(--border);
        display: flex;
        align-items: center;
        justify-content: center;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--text-secondary);
        transition: all 0.3s ease;
      }
      
        .step-indicator.active {
            background: var(--primary);
            border-color: var(--primary);
        color: white;
        }
        
        .step-indicator.completed {
            background: var(--success);
            border-color: var(--success);
        color: white;
      }
      
      .step-label {
        font-size: 0.75rem;
            color: var(--text-secondary);
            font-weight: 500;
        text-align: center;
        }
        
        .step-label.active {
            color: var(--primary);
        }
        
        .step-label.completed {
            color: var(--success);
        }
        
        .progress-text {
            text-align: center;
            font-size: 0.875rem;
            color: var(--text-muted);
            margin-top: 0.5rem;
        }
        
        .step-content {
        display: none;
      }
      
        .step-content.active {
        display: block;
      }
      
        .form-group {
        margin-bottom: 1.5rem;
      }
      
        .form-label {
            display: block;
            font-weight: 500;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
            font-size: 0.875rem;
      }
      
        .form-description {
            font-size: 0.875rem;
        color: var(--text-secondary);
            margin-bottom: 1rem;
      }
      
        .form-input {
        width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border);
        border-radius: 8px;
        background: var(--bg-primary);
        color: var(--text-primary);
        font-size: 1rem;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      
        .form-input:focus {
        outline: none;
            border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
      }
      
        .form-input::placeholder {
            color: var(--text-muted);
        }
        
        /* Alert Messages */
        .alert {
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
            font-weight: 500;
        }
        
        .alert-success {
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid #10b981;
            color: #065f46;
        }
        
        .alert-error {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid #ef4444;
            color: #991b1b;
        }
        
        /* Inline Error Messages */
        .error-message {
            display: none;
            font-size: 0.875rem;
            color: #ef4444;
            margin-top: 0.5rem;
            font-weight: 500;
        }
        
        .error-message.show {
            display: block;
        }
        
        .form-input.error {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        
        .form-input.success {
            border-color: #10b981;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }
        
        /* Store Grid */
        .store-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .store-tile {
            border: 1px solid var(--border);
        border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            overflow: hidden;
            background: var(--bg-primary);
        }
        
        .store-tile:hover {
            border-color: var(--primary);
            box-shadow: var(--shadow);
            transform: translateY(-1px);
        }
        
        .store-tile.selected {
            border-color: var(--primary);
            box-shadow: 0 0 0 1px var(--primary);
            background: rgba(37, 99, 235, 0.02);
        }
        
        .store-image {
            width: 100%;
            height: 120px;
            object-fit: cover;
        }
        
        .store-content {
            padding: 1rem;
        }
        
        .store-name {
            font-size: 1rem;
        font-weight: 600;
            margin-bottom: 0.25rem;
            color: var(--text-primary);
        }
        
        .store-category {
            background: rgba(37, 99, 235, 0.1);
            color: var(--primary);
            font-size: 0.75rem;
            font-weight: 500;
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            display: inline-block;
            margin-bottom: 0.5rem;
        }
        
        .store-description {
            font-size: 0.875rem;
        color: var(--text-secondary);
            margin-bottom: 0.75rem;
        }
        
        .store-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
            font-size: 0.75rem;
        }
        
        .stat-item {
            text-align: center;
            padding: 0.5rem;
        background: var(--bg-secondary);
            border-radius: 6px;
        }
        
        .stat-value {
            font-weight: 600;
        color: var(--text-primary);
            display: block;
        }
        
        .stat-label {
            color: var(--text-muted);
            font-size: 0.625rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .store-check {
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            background: var(--primary);
        color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: scale(0.5);
            transition: all 0.2s ease;
            font-size: 0.75rem;
        }
        
        .store-tile.selected .store-check {
            opacity: 1;
            transform: scale(1);
        }
        
        /* Custom Store Section */
        .custom-store {
        background: var(--bg-secondary);
            border: 1px solid var(--border);
        border-radius: 12px;
        padding: 1.5rem;
            text-align: center;
        }
        
        .custom-title {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--text-primary);
        }
        
        .custom-description {
            color: var(--text-secondary);
            margin-bottom: 1rem;
            font-size: 0.875rem;
        }
        
        .custom-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            background: var(--bg-primary);
        color: var(--text-primary);
            font-size: 0.875rem;
            margin-bottom: 0.75rem;
        }
        
        .custom-button {
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
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-size: 0.875rem;
            background: var(--primary);
            color: white;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        
        .custom-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s ease;
        }
        
        .custom-button:hover::before {
            left: 100%;
        }
        
        .custom-button:hover {
            background: var(--primary-light);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
            transform: translateY(-1px);
        }
        
        /* Store Search Styles */
        .search-wrapper {
            position: relative;
            margin-bottom: 1rem;
        }
        
        .search-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            background: var(--bg-primary);
            color: var(--text-primary);
            font-size: 0.875rem;
            transition: border-color 0.2s ease;
        }
        
        .search-input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
        }
        
        .manual-input-wrapper {
            display: flex;
            gap: 0.75rem;
            align-items: flex-start;
        }
        
        .manual-input-wrapper .custom-input {
            flex: 1;
        }
        
        .help-text {
            border-left: 4px solid var(--primary, #2563eb);
        
        .fallback-text {
            color: var(--text-secondary);
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
            font-style: italic;
        }
        
        /* Selection Feedback Styles */
        .selection-feedback {
            display: none;
            margin: 1rem 0;
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid;
            background: var(--bg-primary);
        }
        
        .selection-feedback.success {
            border-color: #10b981;
            background: rgba(16, 185, 129, 0.05);
            color: #047857;
        }
        
        .selection-feedback.warning {
            border-color: #f59e0b;
            background: rgba(245, 158, 11, 0.05);
            color: #92400e;
        }
        
        .feedback-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .feedback-icon {
            font-size: 1.25rem;
            flex-shrink: 0;
        }
        
        .feedback-text strong {
            display: block;
            margin-bottom: 0.25rem;
            font-weight: 600;
        }
        
        .feedback-store-name {
            font-size: 0.875rem;
            opacity: 0.8;
            font-weight: 500;
        }
        
        /* Selected stores visual indicator */
        .store-card.selected {
            border-color: #10b981;
            background: rgba(16, 185, 129, 0.05);
        }
        
        .store-card.selected .store-name {
            color: #047857;
        }
        
        .selection-counter {
            text-align: center;
            margin: 1rem 0;
            font-weight: 500;
            color: var(--primary);
            font-size: 0.875rem;
        }
        
        /* Custom Store Selection Feedback */
        .custom-store-selected {
            background: rgba(16, 185, 129, 0.1);
            border-color: var(--success);
        }
        
        .custom-store-selected .custom-title {
            color: var(--success);
        }
        
        /* Tags Input */
        .tags-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            background: var(--bg-primary);
            color: var(--text-primary);
            font-size: 1rem;
            resize: vertical;
            min-height: 80px;
        }
        
        /* Summary */
        .summary-item {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
        }
        
        .summary-label {
            font-weight: 500;
            color: var(--text-primary);
            margin-bottom: 0.25rem;
            font-size: 0.875rem;
        }
        
        .summary-value {
            color: var(--text-secondary);
            font-size: 0.875rem;
        }
        
        /* Success */
        .success-container {
            text-align: center;
            padding: 2rem 0;
        }
        
        .success-icon {
            width: 64px;
            height: 64px;
            background: var(--success);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 1.5rem;
            color: white;
        }
        
        .success-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--success);
        }
        
        .success-description {
            font-size: 1rem;
            color: var(--text-secondary);
            margin-bottom: 2rem;
        }
        
        /* Premium Button System - Matching Design System */
        .button-group {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }
        
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
            font-size: 0.875rem;
            min-width: 100px;
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
            background: var(--primary);
            color: white;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        
        .btn-primary:hover {
            background: var(--primary-light);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
            transform: translateY(-1px);
        }
        
        .btn-secondary {
            background: var(--bg-secondary);
            color: var(--text-primary);
            border: 1px solid var(--border);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .btn-secondary:hover {
            background: var(--border-light);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateY(-1px);
        }
        
        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none !important;
            box-shadow: none !important;
        }
        
        .btn:disabled::before {
            display: none;
        }
        
        /* Privacy Notice */
        .privacy-notice {
            text-align: center;
            margin-top: 1.5rem;
            padding: 1rem;
            background: var(--bg-secondary);
            border-radius: 8px;
            font-size: 0.75rem;
            color: var(--text-muted);
            line-height: 1.4;
        }
        
        .privacy-link {
            color: var(--primary);
            text-decoration: none;
        }
        
        .privacy-link:hover {
            text-decoration: underline;
        }
        
        /* Focus styles */
        .btn:focus,
        .form-input:focus,
        .store-tile:focus {
            outline: 2px solid var(--primary);
            outline-offset: 2px;
        }
        
        /* Mobile */
        @media (max-width: 640px) {
            body { padding: 1rem; }
            .widget-container { padding: 1.5rem; }
            .store-grid { grid-template-columns: 1fr; }
            .button-group { flex-direction: column; }
            .btn { width: 100%; }
        }
    </style>
</head>
<body>
    <div class="widget-container">
        <div class="widget-header">
            <h1 class="widget-title">${t.title}</h1>
            <p class="widget-subtitle">${t.subtitle}</p>
        </div>
        
        <!-- Progress Bar -->
        <div class="progress-container">
            <div class="progress-bar" role="progressbar" aria-label="${t.accessibility.progressLabel}" aria-valuenow="1" aria-valuemin="1" aria-valuemax="5">
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
                <div class="progress-step">
                    <div class="step-indicator" id="step-5">5</div>
                    <div class="step-label">${t.step5}</div>
                </div>
            </div>
            <div class="progress-text" id="progress-text">${t.accessibility.stepLabel} 1 ${t.accessibility.ofLabel} 5</div>
        </div>
        
        <!-- Step 1: Email -->
        <div class="step-content active" id="step-1-content">
            <div class="form-group">
                <label class="form-label" for="email-input">${t.emailLabel}</label>
                <div class="form-description">${t.emailDescription}</div>
                <input type="email" class="form-input" id="email-input" placeholder="${t.emailPlaceholder}">
                <div class="error-message" id="email-error"></div>
                </div>
            <div class="button-group">
                <button class="btn btn-primary" onclick="nextStep()">${t.nextButton}</button>
              </div>
            </div>
        
        <!-- Step 2: Store Selection -->
        <div class="step-content" id="step-2-content">
            <div class="form-group">
                <label class="form-label">${t.storeTitle}</label>
                <div class="form-description">${t.storeDescription}</div>
                
                <div class="store-grid">
                    ${featuredStores.map(store => `
                        <div class="store-tile" data-store-id="${store.id}" onclick="selectStore(${store.id})" tabindex="0" role="button" aria-label="${lang === 'nl' ? 'Selecteer' : 'Select'} ${store.name}">
                            <img src="${store.image}" alt="${store.name}" class="store-image">
                            <div class="store-check" aria-hidden="true">✓</div>
                            <div class="store-content">
                                <h3 class="store-name">${store.name}</h3>
                                <div class="store-category">${store.category}</div>
                                <p class="store-description">${store.description}</p>
                                <div class="store-stats">
                                    <div class="stat-item">
                                        <span class="stat-value">${store.monthlySales}</span>
                                        <span class="stat-label">${lang === 'nl' ? 'Verkopen' : 'Sales'}</span>
              </div>
                                    <div class="stat-item">
                                        <span class="stat-value">${store.shippingTime}</span>
                                        <span class="stat-label">${lang === 'nl' ? 'Levering' : 'Shipping'}</span>
              </div>
                                    <div class="stat-item">
                                        <span class="stat-value">${store.satisfaction}</span>
                                        <span class="stat-label">${lang === 'nl' ? 'Score' : 'Rating'}</span>
            </div>
                                </div>
            </div>
          </div>
        `).join('')}
      </div>
      
                <div class="custom-store" id="custom-store-section">
                    <h3 class="custom-title">${lang === 'nl' ? 'DHgate Winkel Toevoegen' : 'Add DHgate Store'}</h3>
                    <p class="custom-description">${lang === 'nl' ? 'Voeg je DHgate winkel URL toe om monitoring in te stellen' : 'Add your DHgate store URL to set up monitoring'}</p>
                    <div class="manual-input-wrapper">
                        <input type="url" class="custom-input" id="custom-store-url" placeholder="${lang === 'nl' ? 'Bijv: https://www.dhgate.com/store/21168508' : 'e.g: https://www.dhgate.com/store/21168508'}">
                        <button class="custom-button" onclick="addCustomStore()">${t.addStoreButton || (lang === 'nl' ? 'Winkel Toevoegen' : 'Add Store')}</button>
                        <div class="error-message" id="custom-store-error"></div>
                    </div>
                    <div class="help-text" style="margin-top: 1rem; padding: 1rem; background: var(--bg-secondary, #f8f9fa); border-radius: 8px;">
                        <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem;">
                            <strong>${lang === 'nl' ? 'Hoe vind je de store URL?' : 'How to find the store URL?'}</strong><br>
                            ${lang === 'nl' ? 
                              'Ga naar DHgate.com → Zoek je product → Klik op een winkel → Kopieer de URL uit je browser' : 
                              'Go to DHgate.com → Search your product → Click on a store → Copy the URL from your browser'
                            }
                        </p>
                    </div>
                </div>
                
                <div class="selection-counter" id="selection-counter"></div>
                <div class="error-message" id="store-error"></div>
            </div>
            <div class="button-group">
                <button class="btn btn-secondary" onclick="prevStep()">${t.backButton}</button>
                <button class="btn btn-primary" onclick="nextStep()">${t.nextButton}</button>
        </div>
      </div>
      
        <!-- Step 3: Search Terms -->
        <div class="step-content" id="step-3-content">
            <div class="form-group">
                <label class="form-label" for="tags-input">${t.tagsLabel}</label>
                <div class="form-description">${t.tagsDescription}</div>
                <textarea class="tags-input" id="tags-input" placeholder="${t.tagsPlaceholder}"></textarea>
                <div class="error-message" id="tags-error"></div>
            </div>
            <div class="button-group">
                <button class="btn btn-secondary" onclick="prevStep()">${t.backButton}</button>
                <button class="btn btn-primary" onclick="nextStep()">${t.nextButton}</button>
            </div>
    </div>
    
        <!-- Step 4: Confirmation -->
        <div class="step-content" id="step-4-content">
            <div class="form-group">
                <label class="form-label">${t.confirmTitle}</label>
                <div class="form-description">${t.confirmDescription}</div>
                
                <div class="summary-item">
                    <div class="summary-label">${t.emailLabel}:</div>
                    <div class="summary-value" id="summary-email"></div>
                </div>
                
                <div class="summary-item">
                    <div class="summary-label">${t.step2}:</div>
                    <div class="summary-value" id="summary-stores"></div>
                </div>
                
                <div class="summary-item">
                    <div class="summary-label">${t.tagsLabel}:</div>
                    <div class="summary-value" id="summary-tags"></div>
                </div>
            </div>
            <div class="button-group">
                <button class="btn btn-secondary" onclick="prevStep()">${t.backButton}</button>
                <button class="btn btn-primary" onclick="submitForm()" id="submit-btn">${t.submitButton}</button>
            </div>
        </div>
        
        <!-- Step 5: Success -->
        <div class="step-content" id="step-5-content">
            <div class="success-container">
                <div class="success-icon">✓</div>
                <h2 class="success-title">${t.successTitle}</h2>
                <p class="success-description">${t.successDescription}</p>
                <div class="button-group">
                    <button class="btn btn-primary" onclick="resetForm()">${t.doneButton}</button>
                </div>
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
            console.log('nextStep called, currentStep:', currentStep);
            try {
                if (validateCurrentStep()) {
                    if (currentStep < 5) {
                        currentStep++;
                        updateStep();
                    }
                }
            } catch (error) {
                console.error('Error in nextStep:', error);
                console.log('Available elements:', {
                    emailInput: document.getElementById('email-input'),
                    tagsInput: document.getElementById('tags-input'),
                    currentStep: currentStep
                });
            }
        }
        
        function prevStep() {
            if (currentStep > 1) {
                currentStep--;
                updateStep();
            }
        }
        
        function updateStep() {
            console.log('updateStep called with currentStep:', currentStep);
            
            // Update progress bar
            const progressFill = document.getElementById('progress-fill');
            const progressText = document.getElementById('progress-text');
            const progressBar = document.querySelector('.progress-bar');
            
            if (progressFill) {
                progressFill.style.width = ((currentStep - 1) / 4) * 100 + '%';
            }
            if (progressText) {
                progressText.textContent = '${t.accessibility.stepLabel} ' + currentStep + ' ${t.accessibility.ofLabel} 5';
            }
            if (progressBar) {
                progressBar.setAttribute('aria-valuenow', currentStep);
            }
            
            // Update step indicators
            for (let i = 1; i <= 5; i++) {
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
            for (let i = 1; i <= 5; i++) {
                const stepContent = document.getElementById('step-' + i + '-content');
                if (stepContent) {
                    if (i === currentStep) {
                        stepContent.className = 'step-content active';
                        console.log('Activated step content:', i);
                    } else {
                        stepContent.className = 'step-content';
                    }
                } else {
                    console.error('Step content not found for step:', i);
                }
            }
            
            // Update summary if on step 4
            if (currentStep === 4) {
                updateSummary();
            }
            
            // Initialize store search on step 2
            if (currentStep === 2) {
            }
        }
        
        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            const inputElement = elementId.replace('-error', '-input');
            const input = document.getElementById(inputElement);
            
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.add('show');
            }
            if (input) {
                input.classList.add('error');
                input.classList.remove('success');
            }
        }
        
        function clearError(elementId) {
            const errorElement = document.getElementById(elementId);
            const inputElement = elementId.replace('-error', '-input');
            const input = document.getElementById(inputElement);
            
            if (errorElement) {
                errorElement.classList.remove('show');
            }
            if (input) {
                input.classList.remove('error');
                input.classList.add('success');
            }
        }
        
        function clearAllErrors() {
            ['email-error', 'store-error', 'tags-error'].forEach(errorId => {
                const errorElement = document.getElementById(errorId);
                const inputElement = errorId.replace('-error', '-input');
                const input = document.getElementById(inputElement);
                
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
                if (input) {
                    input.classList.remove('error', 'success');
                }
            });
        }

        function validateCurrentStep() {
            clearAllErrors();
            
            if (currentStep === 1) {
                const emailInput = document.getElementById('email-input');
                if (!emailInput) {
                    console.error('Email input not found');
                    return false;
                }
                const email = emailInput.value.trim();
                if (!email) {
                    showError('email-error', '${lang === 'nl' ? 'Email adres is verplicht' : 'Email address is required'}');
                    return false;
                }
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showError('email-error', '${lang === 'nl' ? 'Voer een geldig email adres in' : 'Please enter a valid email address'}');
                    return false;
                }
                
                clearError('email-error');
            } else if (currentStep === 2) {
                if (selectedStores.length === 0) {
                    showError('store-error', '${lang === 'nl' ? 'Selecteer minimaal één winkel om te monitoren' : 'Please select at least one store to monitor'}');
                    return false;
                }
                clearError('store-error');
            } else if (currentStep === 3) {
                const tagsInput = document.getElementById('tags-input');
                if (!tagsInput) {
                    console.error('Tags input not found');
                    return false;
                }
                const tags = tagsInput.value.trim();
                if (!tags) {
                    showError('tags-error', '${lang === 'nl' ? 'Voer minimaal één zoekterm in (bijv. smartphone, handtas)' : 'Please enter at least one search term (e.g. smartphone, handbag)'}');
                    return false;
                }
                clearError('tags-error');
            }
            return true;
        }
        
        function showCustomStoreError(message) {
            const errorElement = document.getElementById('custom-store-error');
            const input = document.getElementById('custom-store-url');
            
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.add('show');
            }
            if (input) {
                input.classList.add('error');
                input.classList.remove('success');
            }
        }
        
        // Real-time validation
        function setupRealTimeValidation() {
            // Email validation on input
            const emailInput = document.getElementById('email-input');
            if (emailInput) {
                emailInput.addEventListener('blur', function() {
                    const email = this.value.trim();
                    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        showError('email-error', '${lang === 'nl' ? 'Voer een geldig email adres in' : 'Please enter a valid email address'}');
                    } else if (email) {
                        clearError('email-error');
                    }
                });
                
                emailInput.addEventListener('input', function() {
                    // Clear error as user types
                    const errorElement = document.getElementById('email-error');
                    if (errorElement && errorElement.classList.contains('show')) {
                        const email = this.value.trim();
                        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                            clearError('email-error');
                        }
                    }
                });
            }
            
            // Tags validation
            const tagsInput = document.getElementById('tags-input');
            if (tagsInput) {
                tagsInput.addEventListener('blur', function() {
                    const tags = this.value.trim();
                    if (currentStep === 3 && !tags) {
                        showError('tags-error', '${lang === 'nl' ? 'Voer minimaal één zoekterm in' : 'Please enter at least one search term'}');
                    } else if (tags) {
                        clearError('tags-error');
                    }
                });
                
                tagsInput.addEventListener('input', function() {
                    const tags = this.value.trim();
                    if (tags) {
                        clearError('tags-error');
                    }
                });
            }
        }
        
        // Store selection functions
        function selectStore(storeId) {
            const tile = document.querySelector(\`.store-tile[data-store-id="\${storeId}"]\`);
            const store = stores.find(s => s.id === storeId);
            
            if (!tile || !store) return;
            
            // Toggle selection
            if (tile.classList.contains('selected')) {
                tile.classList.remove('selected');
                selectedStores = selectedStores.filter(s => s.id !== storeId);
            } else {
                tile.classList.add('selected');
                selectedStores.push(store);
            }
            
            updateCounter();
        }
        
        function addCustomStore() {
            const urlInput = document.getElementById('custom-store-url');
            const customSection = document.getElementById('custom-store-section');
            const url = urlInput.value.trim();
            
            // Clear previous error
            const errorElement = document.getElementById('custom-store-error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
            if (urlInput) {
                urlInput.classList.remove('error', 'success');
            }
            
            if (!url) {
                showCustomStoreError('${lang === 'nl' ? 'Voer een winkel URL in' : 'Please enter a store URL'}');
                return;
            }
            
            // Validate DHgate URL
            if (!url.includes('dhgate.com/store/')) {
                showCustomStoreError('${lang === 'nl' ? 'Voer een geldige DHgate winkel URL in (bijv. https://www.dhgate.com/store/12345678)' : 'Please enter a valid DHgate store URL (e.g. https://www.dhgate.com/store/12345678)'}');
                return;
            }
            
            const existingStore = selectedStores.find(s => s.url === url);
            if (existingStore) {
                showCustomStoreError('${lang === 'nl' ? 'Deze winkel is al geselecteerd' : 'This store is already selected'}');
                return;
            }
            
            const customStore = {
                id: 'custom-' + Date.now(),
                name: 'Custom Store',
                url: url,
                category: 'Custom'
            };
            
            selectedStores.push(customStore);
            customStoreAdded = true;
            
            // Visual feedback
            customSection.classList.add('custom-store-selected');
            urlInput.style.borderColor = '#10b981';
            urlInput.value = '';
            
            setTimeout(() => {
                urlInput.style.borderColor = '';
            }, 2000);
            
            updateCounter();
        }
        
        function updateCounter() {
            const counter = document.getElementById('selection-counter');
            if (selectedStores.length === 0) {
                counter.style.display = 'none';
            } else {
                counter.style.display = 'block';
                counter.textContent = \`\${selectedStores.length} \${lang === 'nl' ? 'winkel(s) geselecteerd' : 'store(s) selected'}\`;
            }
        }
        
        function updateSummary() {
            const emailInput = document.getElementById('email-input');
            const tagsInput = document.getElementById('tags-input');
            const summaryEmail = document.getElementById('summary-email');
            const summaryStores = document.getElementById('summary-stores');
            const summaryTags = document.getElementById('summary-tags');
            
            if (emailInput && summaryEmail) {
                summaryEmail.textContent = emailInput.value;
            }
            
            if (summaryStores) {
                summaryStores.textContent = selectedStores.map(s => s.name).join(', ');
            }
            
            if (tagsInput && summaryTags) {
                summaryTags.textContent = tagsInput.value || '${lang === 'nl' ? 'Geen' : 'None'}';
            }
        }
        
        function submitForm() {
            const submitBtn = document.getElementById('submit-btn');
            const emailInput = document.getElementById('email-input');
            const tagsInput = document.getElementById('tags-input');
            
            if (!emailInput || !tagsInput) {
                console.error('Required form elements not found');
                return;
            }
            
            if (submitBtn) {
                submitBtn.textContent = '${t.loadingText}';
                submitBtn.disabled = true;
            }
            
            const email = emailInput.value;
            const tags = tagsInput.value;
            const selectedStoresData = selectedStores.map(store => ({
                name: store.name,
                url: store.url,
                category: store.category
            }));
            
            fetch('/api/widget-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    stores: selectedStoresData,
                    tags: tags,
                    lang: '${lang}'
                })
            })
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data);
                if (data.success) {
                    console.log('Success! Moving to step 5');
                    currentStep = 5;
                    updateStep();
                    submitBtn.textContent = '${t.submitButton}';
                    submitBtn.disabled = false;
                    
                    // Show success message based on actual email status
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success';
                    if (data.emailSent) {
                        successMessage.innerHTML = '${lang === 'nl' ? 'Aanmelding succesvol! Check je email voor bevestiging.' : 'Signup successful! Check your email for confirmation.'}';
                    } else {
                        successMessage.innerHTML = data.message || '${lang === 'nl' ? 'Aanmelding succesvol opgeslagen!' : 'Signup successfully saved!'}';
                    }
                    const targetContainer = document.querySelector('.subscription-card') || document.querySelector('.widget-container');
                    if (targetContainer) {
                        targetContainer.appendChild(successMessage);
                    } else {
                        console.error('Target container not found for success message');
                    }
                } else {
                    throw new Error(data.message || 'Signup failed');
                }
            })
            .catch(error => {
                console.error('Signup error:', error);
                submitBtn.textContent = '${t.submitButton}';
                submitBtn.disabled = false;
                
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'alert alert-error';
                errorMessage.innerHTML = '${lang === 'nl' ? 'Er is een fout opgetreden. Probeer het opnieuw.' : 'An error occurred. Please try again.'}';
                const targetContainer = document.querySelector('.subscription-card') || document.querySelector('.widget-container');
                if (targetContainer) {
                    targetContainer.appendChild(errorMessage);
                } else {
                    console.error('Target container not found for error message');
                }
            });
        }
        
        function resetForm() {
            currentStep = 1;
            selectedStores = [];
            customStoreAdded = false;
            
            const emailInput = document.getElementById('email-input');
            const tagsInput = document.getElementById('tags-input');
            const customStoreInput = document.getElementById('custom-store-url');
            const customStoreSection = document.getElementById('custom-store-section');
            
            if (emailInput) emailInput.value = '';
            if (tagsInput) tagsInput.value = '';
            if (customStoreInput) customStoreInput.value = '';
            if (customStoreSection) customStoreSection.classList.remove('custom-store-selected');
            
            document.querySelectorAll('.store-tile').forEach(tile => {
                tile.classList.remove('selected');
            });
            
            updateStep();
            updateCounter();
        }
        
        // Initialize
        updateCounter();
        setupRealTimeValidation();
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.target.classList.contains('store-tile')) {
                e.target.click();
            }
        });
    </script>
</body>
</html>`;
}