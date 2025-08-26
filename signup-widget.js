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
    subtitle: 'Monitor je favoriete winkels en krijg updates over nieuwe producten',
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
    successTitle: 'Aanmelding voltooid',
    successDescription: 'Je ontvangt binnenkort een bevestigingsemail',
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
    subtitle: 'Monitor your favorite stores and get updates about new products',
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
    successTitle: 'Registration complete',
    successDescription: 'You will receive a confirmation email shortly',
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
            padding: 0.75rem 1.5rem;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s ease;
            font-size: 0.875rem;
        }
        
        .custom-button:hover {
            background: var(--primary-light);
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
        
        /* Buttons */
        .button-group {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }
        
        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.875rem;
            min-width: 100px;
        }
        
        .btn-primary {
            background: var(--primary);
            color: white;
        }
        
        .btn-primary:hover {
            background: var(--primary-light);
        }
        
        .btn-secondary {
            background: var(--bg-secondary);
            color: var(--text-primary);
            border: 1px solid var(--border);
        }
        
        .btn-secondary:hover {
            background: var(--border-light);
        }
        
        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
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
                    <h3 class="custom-title">${t.addCustomTitle}</h3>
        <p class="custom-description">${t.addCustomDescription}</p>
                    <input type="url" class="custom-input" id="custom-store-url" placeholder="${t.addStorePlaceholder}">
                    <button class="custom-button" onclick="addCustomStore()">${t.addStoreButton}</button>
                </div>
                
                <div class="selection-counter" id="selection-counter"></div>
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
            if (validateCurrentStep()) {
                if (currentStep < 5) {
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
            const progressText = document.getElementById('progress-text');
            const progressBar = document.querySelector('.progress-bar');
            
            progressFill.style.width = ((currentStep - 1) / 4) * 100 + '%';
            progressText.textContent = '${t.accessibility.stepLabel} ' + currentStep + ' ${t.accessibility.ofLabel} 5';
            progressBar.setAttribute('aria-valuenow', currentStep);
            
            // Update step indicators
            for (let i = 1; i <= 5; i++) {
                const stepIndicator = document.getElementById('step-' + i);
                const stepLabel = stepIndicator.nextElementSibling;
                
                if (i < currentStep) {
                    stepIndicator.className = 'step-indicator completed';
                    stepLabel.className = 'step-label completed';
                } else if (i === currentStep) {
                    stepIndicator.className = 'step-indicator active';
                    stepLabel.className = 'step-label active';
                } else {
                    stepIndicator.className = 'step-indicator';
                    stepLabel.className = 'step-label';
                }
            }
            
            // Update step content
            for (let i = 1; i <= 5; i++) {
                const stepContent = document.getElementById('step-' + i + '-content');
                if (i === currentStep) {
                    stepContent.className = 'step-content active';
                } else {
                    stepContent.className = 'step-content';
                }
            }
            
            // Update summary if on step 4
            if (currentStep === 4) {
                updateSummary();
            }
        }
        
        function validateCurrentStep() {
            if (currentStep === 1) {
                const email = document.getElementById('email-input').value;
                if (!email || !email.includes('@')) {
                    alert('${lang === 'nl' ? 'Voer een geldig email adres in' : 'Please enter a valid email address'}');
                    return false;
                }
            } else if (currentStep === 2) {
                if (selectedStores.length === 0) {
                    alert('${lang === 'nl' ? 'Selecteer minimaal één winkel' : 'Please select at least one store'}');
                    return false;
                }
            } else if (currentStep === 3) {
                const tags = document.getElementById('tags-input').value.trim();
                if (!tags) {
                    alert('${lang === 'nl' ? 'Voer minimaal één zoekterm in' : 'Please enter at least one search term'}');
                    return false;
                }
            }
            return true;
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
            
            if (!url) {
                alert('${lang === 'nl' ? 'Voer een winkel URL in' : 'Please enter a store URL'}');
                return;
            }
            
            // Validate DHgate URL
            if (!url.includes('dhgate.com/store/')) {
                alert('${lang === 'nl' ? 'Voer een geldige DHgate winkel URL in (bijv. https://www.dhgate.com/store/12345678)' : 'Please enter a valid DHgate store URL (e.g. https://www.dhgate.com/store/12345678)'}');
                return;
            }
            
            const existingStore = selectedStores.find(s => s.url === url);
            if (existingStore) {
                alert('${lang === 'nl' ? 'Deze winkel is al geselecteerd' : 'This store is already selected'}');
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
            const email = document.getElementById('email-input').value;
            const tags = document.getElementById('tags-input').value;
            
            document.getElementById('summary-email').textContent = email;
            document.getElementById('summary-stores').textContent = selectedStores.map(s => s.name).join(', ');
            document.getElementById('summary-tags').textContent = tags || '${lang === 'nl' ? 'Geen' : 'None'}';
        }
        
        function submitForm() {
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.textContent = '${t.loadingText}';
            submitBtn.disabled = true;
            
            const email = document.getElementById('email-input').value;
            const tags = document.getElementById('tags-input').value;
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
            .then(response => response.json())
            .then(data => {
                currentStep = 5;
                updateStep();
                submitBtn.textContent = '${t.submitButton}';
                submitBtn.disabled = false;
            })
            .catch(error => {
                currentStep = 5;
                updateStep();
                submitBtn.textContent = '${t.submitButton}';
                submitBtn.disabled = false;
            });
        }
        
        function resetForm() {
            currentStep = 1;
            selectedStores = [];
            customStoreAdded = false;
            document.getElementById('email-input').value = '';
            document.getElementById('tags-input').value = '';
            document.getElementById('custom-store-url').value = '';
            document.getElementById('custom-store-section').classList.remove('custom-store-selected');
            document.querySelectorAll('.store-tile').forEach(tile => {
          tile.classList.remove('selected');
        });
            updateStep();
            updateCounter();
        }
        
        // Initialize
        updateCounter();
        
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