// ============================================================================
// EMBEDDABLE DHGATE MONITOR SIGNUP WIDGET
// ============================================================================
// Standalone signup form that can be embedded via iframe on any website

export function generateSignupWidget(env, lang = 'nl', theme = 'light') {
  const widgetId = 'dhgate-signup-widget-' + Date.now();
  
  // Featured stores data
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
      monthlySales: lang === 'nl' ? '2.847 verkopen/maand' : '2,847 sales/month',
      topProduct: lang === 'nl' ? 'Luxe lederen handtas' : 'Premium leather handbag',
      shippingTime: lang === 'nl' ? '7-12 dagen' : '7-12 days',
      returnRate: lang === 'nl' ? '98% tevredenheid' : '98% satisfaction',
      whyTrack: lang === 'nl' ? 'Trending mode items, snelle restocking, exclusieve designs' : 'Trending fashion items, fast restocking, exclusive designs',
      priceRange: lang === 'nl' ? '€15-€89' : '$15-$89'
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
      monthlySales: lang === 'nl' ? '5.234 verkopen/maand' : '5,234 sales/month',
      topProduct: lang === 'nl' ? 'Smartphone accessoires' : 'Smartphone accessories',
      shippingTime: lang === 'nl' ? '5-10 dagen' : '5-10 days',
      returnRate: lang === 'nl' ? '96% tevredenheid' : '96% satisfaction',
      whyTrack: lang === 'nl' ? 'Nieuwe tech releases, prijsdalingen, limited editions' : 'New tech releases, price drops, limited editions',
      priceRange: lang === 'nl' ? '€8-€156' : '$8-$156'
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
      monthlySales: lang === 'nl' ? '1.892 verkopen/maand' : '1,892 sales/month',
      topProduct: lang === 'nl' ? 'Luxe automatische horloges' : 'Luxury automatic watches',
      shippingTime: lang === 'nl' ? '10-15 dagen' : '10-15 days',
      returnRate: lang === 'nl' ? '99% tevredenheid' : '99% satisfaction',
      whyTrack: lang === 'nl' ? 'Exclusieve collecties, seizoensaanbiedingen, vintage stukken' : 'Exclusive collections, seasonal offers, vintage pieces',
      priceRange: lang === 'nl' ? '€45-€298' : '$45-$298'
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
      monthlySales: lang === 'nl' ? '3.156 verkopen/maand' : '3,156 sales/month',
      topProduct: lang === 'nl' ? 'Premium sneakers' : 'Premium sneakers',
      shippingTime: lang === 'nl' ? '8-14 dagen' : '8-14 days',
      returnRate: lang === 'nl' ? '97% tevredenheid' : '97% satisfaction',
      whyTrack: lang === 'nl' ? 'Nieuwe sportlijnen, outlet deals, team merchandise' : 'New sport lines, outlet deals, team merchandise',
      priceRange: lang === 'nl' ? '€22-€134' : '$22-$134'
    }
  ];

  const t = lang === 'nl' ? {
    title: 'DHgate Monitor',
    subtitle: 'Monitor je favoriete DHgate winkels en krijg real-time updates',
    step1: 'Email',
    step2: 'Winkel',
    step3: 'Zoektermen',
    step4: 'Bevestiging',
    step5: 'Succes',
    emailLabel: 'Email adres',
    emailPlaceholder: 'jouw@email.com',
    storeTitle: 'Kies je winkel',
    addCustomTitle: 'Eigen winkel toevoegen',
    addCustomDescription: 'Monitor elke DHgate winkel door de URL in te voeren',
    addStorePlaceholder: 'https://www.dhgate.com/store/jouw-winkel',
    addStoreButton: 'Winkel toevoegen',
    tagsLabel: 'Zoektermen',
    tagsPlaceholder: 'Voer zoektermen in (bijv. smartphone, handtas)',
    tagsDescription: 'Voeg zoektermen toe om specifieke producten te monitoren',
    confirmTitle: 'Bevestig je aanmelding',
    successTitle: 'Aanmelding Succesvol!',
    successSubtitle: 'Je bent succesvol aangemeld voor DHgate Monitor',
    successMessage: 'Je ontvangt binnenkort een bevestigingsemail met verdere instructies.',
    nextSteps: 'Wat gebeurt er nu?',
    nextStepsList: [
      'Je ontvangt een bevestigingsemail binnen 5 minuten',
      'We beginnen met het monitoren van je geselecteerde winkels',
      'Je krijgt dagelijks updates over nieuwe producten en prijzen',
      'Je kunt je voorkeuren altijd aanpassen via je dashboard'
    ],
    nextButton: 'Volgende',
    backButton: 'Terug',
    submitButton: 'Aanmelden',
    loadingText: 'Aanmelden...',
    doneButton: 'Klaar'
  } : {
    title: 'DHgate Monitor',
    subtitle: 'Monitor your favorite DHgate stores and get real-time updates',
    step1: 'Email',
    step2: 'Store',
    step3: 'Search Terms',
    step4: 'Confirmation',
    step5: 'Success',
    emailLabel: 'Email address',
    emailPlaceholder: 'your@email.com',
    storeTitle: 'Choose your store',
    addCustomTitle: 'Add custom store',
    addCustomDescription: 'Monitor any DHgate store by entering the URL',
    addStorePlaceholder: 'https://www.dhgate.com/store/your-store',
    addStoreButton: 'Add store',
    tagsLabel: 'Search terms',
    tagsPlaceholder: 'Enter search terms (e.g. smartphone, handbag)',
    tagsDescription: 'Add search terms to monitor specific products',
    confirmTitle: 'Confirm your registration',
    successTitle: 'Registration Successful!',
    successSubtitle: 'You have successfully signed up for DHgate Monitor',
    successMessage: 'You will receive a confirmation email shortly with further instructions.',
    nextSteps: 'What happens next?',
    nextStepsList: [
      'You will receive a confirmation email within 5 minutes',
      'We will start monitoring your selected stores',
      'You will get daily updates about new products and prices',
      'You can always adjust your preferences via your dashboard'
    ],
    nextButton: 'Next',
    backButton: 'Back',
    submitButton: 'Sign Up',
    loadingText: 'Signing up...',
    doneButton: 'Done'
  };
  
  return `<!DOCTYPE html>
<html lang="${lang}" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DHgate Monitor - ${lang === 'nl' ? 'Aanmelden' : 'Sign Up'}</title>
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --primary-blue: #2563eb;
            --accent-color: #2563eb;
            --success: #10b981;
            --bg-primary: ${theme === 'dark' ? '#0f172a' : '#ffffff'};
            --bg-secondary: ${theme === 'dark' ? '#1e293b' : '#f8fafc'};
            --text-primary: ${theme === 'dark' ? '#f1f5f9' : '#1e293b'};
            --text-secondary: ${theme === 'dark' ? '#94a3b8' : '#64748b'};
            --border-light: ${theme === 'dark' ? '#334155' : '#e2e8f0'};
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            padding: 2rem 1rem;
        }
        
        .widget-container {
            max-width: 900px;
            margin: 0 auto;
            background: var(--bg-primary);
            border-radius: 12px;
            padding: 2rem;
        }
        
        .widget-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .widget-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .widget-subtitle {
            font-size: 1.1rem;
            color: var(--text-secondary);
        }
        
        .progress-bar {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem;
            position: relative;
        }
        
        .progress-step {
            flex: 1;
            text-align: center;
            position: relative;
            z-index: 2;
        }
        
        .step-number {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--border-light);
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 0.5rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .step-number.active {
            background: var(--accent-color);
            color: white;
        }
        
        .step-number.completed {
            background: var(--success);
            color: white;
        }
        
        .step-label {
            font-size: 0.9rem;
            color: var(--text-secondary);
            font-weight: 500;
        }
        
        .step-label.active {
            color: var(--accent-color);
        }
        
        .step-label.completed {
            color: var(--success);
        }
        
        .progress-line {
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            height: 2px;
            background: var(--border-light);
            z-index: 1;
        }
        
        .progress-fill {
            height: 100%;
            background: var(--accent-color);
            transition: width 0.3s ease;
            width: 0%;
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
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--text-primary);
        }
        
        .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border-light);
            border-radius: 8px;
            background: var(--bg-primary);
            color: var(--text-primary);
            font-size: 1rem;
            transition: border-color 0.2s ease;
        }
        
        .form-input:focus {
            outline: none;
            border-color: var(--accent-color);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        
        .store-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .store-tile {
            border: 2px solid var(--border-light);
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            background: var(--bg-primary);
        }
        
        .store-tile:hover {
            border-color: var(--accent-color);
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.15);
            transform: translateY(-2px);
        }
        
        .store-tile.selected {
            border-color: var(--accent-color);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.2);
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
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .store-category {
            background: rgba(37, 99, 235, 0.1);
            color: var(--accent-color);
            font-size: 0.8rem;
            font-weight: 600;
            padding: 0.2rem 0.4rem;
            border-radius: 8px;
            display: inline-block;
            margin-bottom: 0.5rem;
        }
        
        .store-description {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: 0.5rem;
        }
        
        .store-rating {
            font-size: 0.8rem;
            color: var(--text-secondary);
            margin-top: 0.5rem;
        }
        
        .store-stats {
            margin: 0.75rem 0;
            padding: 0.75rem;
            background: var(--bg-secondary);
            border-radius: 8px;
            border-left: 3px solid var(--accent-color);
        }
        
        .stat-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.25rem;
            font-size: 0.8rem;
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
        
        .why-track {
            margin: 0.75rem 0;
            padding: 0.75rem;
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(16, 185, 129, 0.1));
            border-radius: 8px;
            border: 1px solid rgba(37, 99, 235, 0.2);
        }
        
        .why-track-title {
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--accent-color);
            margin-bottom: 0.25rem;
        }
        
        .why-track-text {
            font-size: 0.8rem;
            color: var(--text-secondary);
            line-height: 1.4;
        }
        
        .store-check {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: var(--accent-color);
            color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: scale(0.5);
            transition: all 0.3s ease;
        }
        
        .store-tile.selected .store-check {
            opacity: 1;
            transform: scale(1);
        }
        
        .custom-store {
            background: var(--bg-secondary);
            border: 1px solid var(--border-light);
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
        }
        
        .custom-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .custom-description {
            color: var(--text-secondary);
            margin-bottom: 1rem;
            font-size: 0.9rem;
        }
        
        .custom-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border-light);
            border-radius: 8px;
            background: var(--bg-primary);
            color: var(--text-primary);
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
        
        .custom-button {
            padding: 0.75rem 1rem;
            background: var(--accent-color);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s ease;
        }
        
        .custom-button:hover {
            background: #1d4ed8;
        }
        
        .selection-counter {
            text-align: center;
            margin: 1rem 0;
            font-weight: 600;
            color: var(--accent-color);
        }
        
        .tags-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border-light);
            border-radius: 8px;
            background: var(--bg-primary);
            color: var(--text-primary);
            font-size: 1rem;
            resize: vertical;
            min-height: 100px;
        }
        
        .tags-description {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-top: 0.5rem;
        }
        
        .summary-item {
            background: var(--bg-secondary);
            border: 1px solid var(--border-light);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
        }
        
        .summary-label {
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }
        
        .summary-value {
            color: var(--text-secondary);
        }
        
        .success-container {
            text-align: center;
            padding: 2rem 0;
        }
        
        .success-icon {
            width: 80px;
            height: 80px;
            background: var(--success);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 2rem;
            color: white;
        }
        
        .success-title {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--success);
        }
        
        .success-subtitle {
            font-size: 1.1rem;
            color: var(--text-secondary);
            margin-bottom: 1rem;
        }
        
        .success-message {
            background: var(--bg-secondary);
            border: 1px solid var(--border-light);
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            text-align: left;
        }
        
        .next-steps {
            background: var(--bg-secondary);
            border: 1px solid var(--border-light);
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            text-align: left;
        }
        
        .next-steps-title {
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--text-primary);
        }
        
        .next-steps-list {
            list-style: none;
        }
        
        .next-steps-list li {
            padding: 0.5rem 0;
            color: var(--text-secondary);
            position: relative;
            padding-left: 1.5rem;
        }
        
        .next-steps-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: var(--success);
            font-weight: bold;
        }
        
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
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 1rem;
        }
        
        .btn-primary {
            background: var(--accent-color);
            color: white;
        }
        
        .btn-primary:hover {
            background: #1d4ed8;
        }
        
        .btn-secondary {
            background: var(--bg-secondary);
            color: var(--text-primary);
            border: 1px solid var(--border-light);
        }
        
        .btn-secondary:hover {
            background: var(--border-light);
        }
        
        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .hidden {
            display: none;
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
        <div class="progress-bar">
            <div class="progress-line">
                <div class="progress-fill" id="progress-fill"></div>
            </div>
            <div class="progress-step">
                <div class="step-number active" id="step-1">1</div>
                <div class="step-label active">${t.step1}</div>
            </div>
            <div class="progress-step">
                <div class="step-number" id="step-2">2</div>
                <div class="step-label">${t.step2}</div>
            </div>
            <div class="progress-step">
                <div class="step-number" id="step-3">3</div>
                <div class="step-label">${t.step3}</div>
            </div>
            <div class="progress-step">
                <div class="step-number" id="step-4">4</div>
                <div class="step-label">${t.step4}</div>
            </div>
            <div class="progress-step">
                <div class="step-number" id="step-5">5</div>
                <div class="step-label">${t.step5}</div>
            </div>
        </div>
        
        <!-- Step 1: Email -->
        <div class="step-content active" id="step-1-content">
            <div class="form-group">
                <label class="form-label">${t.emailLabel}</label>
                <input type="email" class="form-input" id="email-input" placeholder="${t.emailPlaceholder}">
            </div>
            <div class="button-group">
                <button class="btn btn-primary" onclick="nextStep()">${t.nextButton}</button>
            </div>
        </div>
        
        <!-- Step 2: Store Selection -->
        <div class="step-content" id="step-2-content">
            <h2 class="form-label">${t.storeTitle}</h2>
            
            <div class="store-grid">
                ${featuredStores.map(store => `
                    <div class="store-tile" data-store-id="${store.id}" onclick="selectStore(${store.id})">
                        <img src="${store.image}" alt="${store.name}" class="store-image">
                        <div class="store-check">✓</div>
                        <div class="store-content">
                            <h3 class="store-name">${store.name}</h3>
                            <div class="store-category">${store.category}</div>
                            <p class="store-description">${store.description}</p>
                            
                            <div class="store-stats">
                                <div class="stat-row">
                                    <span class="stat-label">${lang === 'nl' ? 'Verkopen/maand' : 'Sales/month'}:</span>
                                    <span class="stat-value">${store.monthlySales}</span>
                                </div>
                                <div class="stat-row">
                                    <span class="stat-label">${lang === 'nl' ? 'Top product' : 'Top product'}:</span>
                                    <span class="stat-value">${store.topProduct}</span>
                                </div>
                                <div class="stat-row">
                                    <span class="stat-label">${lang === 'nl' ? 'Levering' : 'Shipping'}:</span>
                                    <span class="stat-value">${store.shippingTime}</span>
                                </div>
                                <div class="stat-row">
                                    <span class="stat-label">${lang === 'nl' ? 'Tevredenheid' : 'Satisfaction'}:</span>
                                    <span class="stat-value">${store.returnRate}</span>
                                </div>
                                <div class="stat-row">
                                    <span class="stat-label">${lang === 'nl' ? 'Prijsbereik' : 'Price range'}:</span>
                                    <span class="stat-value">${store.priceRange}</span>
                                </div>
                            </div>
                            
                            <div class="why-track">
                                <div class="why-track-title">${lang === 'nl' ? 'Waarom tracken?' : 'Why track?'}</div>
                                <div class="why-track-text">${store.whyTrack}</div>
                            </div>
                            
                            <div class="store-rating">★ ${store.rating} (${store.reviews} reviews)</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="custom-store">
                <h3 class="custom-title">${t.addCustomTitle}</h3>
                <p class="custom-description">${t.addCustomDescription}</p>
                <input type="url" class="custom-input" id="custom-store-url" placeholder="${t.addStorePlaceholder}">
                <button class="custom-button" onclick="addCustomStore()">${t.addStoreButton}</button>
            </div>
            
            <div class="selection-counter" id="selection-counter"></div>
            
            <div class="button-group">
                <button class="btn btn-secondary" onclick="prevStep()">${t.backButton}</button>
                <button class="btn btn-primary" onclick="nextStep()">${t.nextButton}</button>
            </div>
        </div>
        
        <!-- Step 3: Search Terms -->
        <div class="step-content" id="step-3-content">
            <div class="form-group">
                <label class="form-label">${t.tagsLabel}</label>
                <textarea class="tags-input" id="tags-input" placeholder="${t.tagsPlaceholder}"></textarea>
                <p class="tags-description">${t.tagsDescription}</p>
            </div>
            <div class="button-group">
                <button class="btn btn-secondary" onclick="prevStep()">${t.backButton}</button>
                <button class="btn btn-primary" onclick="nextStep()">${t.nextButton}</button>
            </div>
        </div>
        
        <!-- Step 4: Confirmation -->
        <div class="step-content" id="step-4-content">
            <h2 class="form-label">${t.confirmTitle}</h2>
            
            <div class="summary-item">
                <div class="summary-label">Email:</div>
                <div class="summary-value" id="summary-email"></div>
            </div>
            
            <div class="summary-item">
                <div class="summary-label">Selected Stores:</div>
                <div class="summary-value" id="summary-stores"></div>
            </div>
            
            <div class="summary-item">
                <div class="summary-label">Search Terms:</div>
                <div class="summary-value" id="summary-tags"></div>
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
                <p class="success-subtitle">${t.successSubtitle}</p>
                
                <div class="success-message">
                    <p>${t.successMessage}</p>
                </div>
                
                <div class="next-steps">
                    <h3 class="next-steps-title">${t.nextSteps}</h3>
                    <ul class="next-steps-list">
                        ${t.nextStepsList.map(step => `<li>${step}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="button-group">
                    <button class="btn btn-primary" onclick="resetForm()">${t.doneButton}</button>
                </div>
            </div>
        </div>
        
        <!-- Hidden form fields -->
        <input type="hidden" id="selected-store-url" name="selected_store_url">
        <input type="hidden" id="selected-store-name" name="selected_store_name">
        <input type="hidden" id="selected-tags" name="selected_tags">
    </div>
    
    <script>
        // Widget state
        let currentStep = 1;
        let selectedStores = [];
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
            progressFill.style.width = ((currentStep - 1) / 4) * 100 + '%';
            
            // Update step indicators
            for (let i = 1; i <= 5; i++) {
                const stepNumber = document.getElementById('step-' + i);
                const stepLabel = stepNumber.nextElementSibling;
                
                if (i < currentStep) {
                    stepNumber.className = 'step-number completed';
                    stepLabel.className = 'step-label completed';
                } else if (i === currentStep) {
                    stepNumber.className = 'step-number active';
                    stepLabel.className = 'step-label active';
                } else {
                    stepNumber.className = 'step-number';
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
                    alert('Please enter a valid email address');
                    return false;
                }
            } else if (currentStep === 2) {
                if (selectedStores.length === 0) {
                    alert('Please select at least one store');
                    return false;
                }
            } else if (currentStep === 3) {
                const tags = document.getElementById('tags-input').value.trim();
                if (!tags) {
                    alert('Please enter at least one search term');
                    return false;
                }
            }
            return true;
        }
        
        // Store selection functions
        function selectStore(storeId) {
            console.log('Selecting store:', storeId);
            
            const tile = document.querySelector(\`.store-tile[data-store-id="\${storeId}"]\`);
            const store = stores.find(s => s.id === storeId);
            
            if (!tile || !store) {
                console.error('Store not found:', storeId);
                return;
            }
            
            // Toggle selection (multiple stores allowed)
            if (tile.classList.contains('selected')) {
                // Deselect
                tile.classList.remove('selected');
                selectedStores = selectedStores.filter(s => s.id !== storeId);
            } else {
                // Select (add to existing selection)
                tile.classList.add('selected');
                selectedStores.push(store);
            }
            
            updateFormData();
            updateCounter();
            
            console.log('Selected stores:', selectedStores);
        }
        
        function addCustomStore() {
            const urlInput = document.getElementById('custom-store-url');
            const url = urlInput.value.trim();
            
            if (!url) {
                alert('Please enter a store URL');
                return;
            }
            
            // Check if URL already exists
            const existingStore = selectedStores.find(s => s.url === url);
            if (existingStore) {
                alert('This store is already selected!');
                return;
            }
            
            // Add custom store to existing selection
            const customStore = {
                id: 'custom-' + Date.now(),
                name: 'Custom Store',
                url: url,
                category: 'Custom'
            };
            
            selectedStores.push(customStore);
            updateFormData();
            updateCounter();
            
            // Clear input
            urlInput.value = '';
            
            // Visual feedback
            urlInput.style.borderColor = '#10b981';
            urlInput.style.backgroundColor = '#f0fdf4';
            
            setTimeout(() => {
                urlInput.style.borderColor = '';
                urlInput.style.backgroundColor = '';
            }, 2000);
            
            console.log('Custom store added:', url);
            console.log('Total selected stores:', selectedStores);
        }
        
        function updateFormData() {
            const urlField = document.getElementById('selected-store-url');
            const nameField = document.getElementById('selected-store-name');
            
            if (selectedStores.length === 0) {
                urlField.value = '';
                nameField.value = '';
            } else if (selectedStores.length === 1) {
                urlField.value = selectedStores[0].url;
                nameField.value = selectedStores[0].name;
            } else {
                urlField.value = JSON.stringify(selectedStores.map(s => s.url));
                nameField.value = selectedStores.map(s => s.name).join(', ');
            }
        }
        
        function updateCounter() {
            const counter = document.getElementById('selection-counter');
            if (selectedStores.length === 0) {
                counter.style.display = 'none';
            } else {
                counter.style.display = 'block';
                counter.textContent = \`\${selectedStores.length} store(s) selected\`;
            }
        }
        
        function updateSummary() {
            const email = document.getElementById('email-input').value;
            const tags = document.getElementById('tags-input').value;
            
            document.getElementById('summary-email').textContent = email;
            document.getElementById('summary-stores').textContent = selectedStores.map(s => s.name).join(', ');
            document.getElementById('summary-tags').textContent = tags || 'None';
        }
        
        function submitForm() {
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.textContent = '${t.loadingText}';
            submitBtn.disabled = true;
            
            // Get form data
            const email = document.getElementById('email-input').value;
            const tags = document.getElementById('tags-input').value;
            const selectedStoresData = selectedStores.map(store => ({
                name: store.name,
                url: store.url,
                category: store.category
            }));
            
            // Send confirmation email
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
                console.log('Signup response:', data);
                
                // Move to success step
                currentStep = 5;
                updateStep();
                
                // Reset button
                submitBtn.textContent = '${t.submitButton}';
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Signup error:', error);
                
                // Still move to success step even if email fails
                currentStep = 5;
                updateStep();
                
                // Reset button
                submitBtn.textContent = '${t.submitButton}';
                submitBtn.disabled = false;
            });
        }
        
        function resetForm() {
            // Reset form to step 1
            currentStep = 1;
            selectedStores = [];
            document.getElementById('email-input').value = '';
            document.getElementById('tags-input').value = '';
            document.querySelectorAll('.store-tile').forEach(tile => {
                tile.classList.remove('selected');
            });
            updateStep();
            updateCounter();
        }
        
        // Initialize
        console.log('Widget loaded successfully');
        updateCounter();
    </script>
</body>
</html>`;
}