// ============================================================================
// PREMIUM PRODUCT/SHOP TRACKING WIDGET
// ============================================================================
// Premium extension of the shop tracker with product-specific monitoring

export function generatePremiumTrackingWidget(env = null, lang = 'nl', theme = 'light') {
  const widgetId = 'dhgate-premium-widget-' + Date.now();
  
  // Featured stores data - hergebruik van signup widget
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
    // Premium branding
    title: 'DHgate Monitor Premium',
    subtitle: 'Geavanceerde product- en shop tracking met prijs-, voorraad- en reviewalerts',
    premiumBadge: 'Premium Feature',
    
    // Steps for shop tracking (hergebruik van signup widget)
    step1: 'Email',
    step2: 'Winkel',
    step3: 'Zoektermen',
    step4: 'Triggers',
    step5: 'Bevestiging',
    step6: 'Klaar',
    
    // Tracking type selection
    trackingTypeLabel: 'Wat wil je tracken?',
    shopTracking: 'Shop tracking',
    productTracking: 'Product tracking',
    shopDescription: 'Monitor een hele shop voor nieuwe producten',
    productDescription: 'Track specifieke producten met prijs- en voorraadalerts',
    
    // Shop tracking fields (hergebruik van signup widget)
    storeTitle: 'Kies je winkel',
    storeDescription: 'Selecteer de winkels die je wilt monitoren',
    addCustomTitle: 'Eigen winkel toevoegen',
    addCustomDescription: 'Voeg een DHgate winkel toe via URL',
    addStorePlaceholder: 'https://www.dhgate.com/store/jouw-winkel',
    addStoreButton: 'Toevoegen',
    tagsLabel: 'Zoektermen',
    tagsPlaceholder: 'bijv. smartphone, handtas, sneakers',
    tagsDescription: 'Voeg zoektermen toe om specifieke producten te vinden',
    
    // Input fields
    shopInputLabel: 'Shop naam of ID',
    shopInputPlaceholder: 'bijv. ECOBAG Store of 20062391',
    productInputLabel: 'Product URL',
    productInputPlaceholder: 'https://www.dhgate.com/product/...',
    
    // Triggers
    triggersTitle: 'Alert triggers',
    priceTriggerLabel: 'Prijs daalt onder',
    priceTriggerPlaceholder: '€ 50,00',
    stockTriggerLabel: 'Voorraad onder',
    stockTriggerPlaceholder: '10 stuks',
    discountTriggerLabel: 'Korting boven',
    discountTriggerPlaceholder: '20%',
    newVariantsLabel: 'Nieuwe varianten toegevoegd',
    reviewScoreLabel: 'Review score verandert',
    reviewScoreOptions: {
      increases: 'Stijgt',
      decreases: 'Daalt', 
      both: 'Beide'
    },
    
    // Email and consent
    emailLabel: 'Email voor alerts',
    emailPlaceholder: 'jouw@email.com',
    emailDescription: 'Je ontvangt magic link login, geen account nodig',
    consentLabel: 'Ik ga akkoord met de privacyvoorwaarden',
    consentLink: 'Privacybeleid',
    
    // Validation messages
    invalidShop: 'Voer een geldige shop naam of ID in',
    invalidProductUrl: 'Voer een geldige DHgate product URL in',
    invalidEmail: 'Voer een geldig email adres in',
    consentRequired: 'Je moet akkoord gaan met de privacyvoorwaarden',
    
    // Success messages
    successTitle: 'Premium tracking geactiveerd!',
    shopSuccessMessage: 'We monitoren nu shop "{shopName}". Je ontvangt meldingen op {email}.',
    productSuccessMessage: 'We monitoren nu product "{productName}". Je ontvangt meldingen op {email}.',
    premiumNote: 'Dit is een premium feature bovenop de basis shop tracker.',
    
    // Buttons
    validateButton: 'Valideren',
    submitButton: 'Start premium tracking',
    loadingText: 'Bezig...',
    
    // Accessibility
    accessibility: {
      trackingTypeLabel: 'Selecteer tracking type',
      shopInputLabel: 'Shop naam of ID invoeren',
      productInputLabel: 'Product URL invoeren',
      triggersLabel: 'Alert triggers instellen',
      emailLabel: 'Email adres voor alerts',
      consentLabel: 'Privacyvoorwaarden accepteren'
    }
  } : {
    // Premium branding
    title: 'DHgate Monitor Premium',
    subtitle: 'Advanced product and shop tracking with price, stock, and review alerts',
    premiumBadge: 'Premium Feature',
    
    // Tracking type selection
    trackingTypeLabel: 'What do you want to track?',
    shopTracking: 'Shop tracking',
    productTracking: 'Product tracking',
    shopDescription: 'Monitor an entire shop for new products',
    productDescription: 'Track specific products with price and stock alerts',
    
    // Input fields
    shopInputLabel: 'Shop name or ID',
    shopInputPlaceholder: 'e.g. ECOBAG Store or 20062391',
    productInputLabel: 'Product URL',
    productInputPlaceholder: 'https://www.dhgate.com/product/...',
    
    // Triggers
    triggersTitle: 'Alert triggers',
    priceTriggerLabel: 'Price drops below',
    priceTriggerPlaceholder: '$ 50.00',
    stockTriggerLabel: 'Stock below',
    stockTriggerPlaceholder: '10 items',
    discountTriggerLabel: 'Discount above',
    discountTriggerPlaceholder: '20%',
    newVariantsLabel: 'New variants added',
    reviewScoreLabel: 'Review score changes',
    reviewScoreOptions: {
      increases: 'Increases',
      decreases: 'Decreases',
      both: 'Both'
    },
    
    // Email and consent
    emailLabel: 'Email for alerts',
    emailPlaceholder: 'your@email.com',
    emailDescription: 'You\'ll receive magic link login, no account needed',
    consentLabel: 'I agree to the privacy policy',
    consentLink: 'Privacy Policy',
    
    // Validation messages
    invalidShop: 'Please enter a valid shop name or ID',
    invalidProductUrl: 'Please enter a valid DHgate product URL',
    invalidEmail: 'Please enter a valid email address',
    consentRequired: 'You must agree to the privacy policy',
    
    // Success messages
    successTitle: 'Premium tracking activated!',
    shopSuccessMessage: 'We\'re now monitoring shop "{shopName}". You\'ll receive alerts at {email}.',
    productSuccessMessage: 'We\'re now monitoring product "{productName}". You\'ll receive alerts at {email}.',
    premiumNote: 'This is a premium feature on top of the basic shop tracker.',
    
    // Buttons
    validateButton: 'Validate',
    submitButton: 'Start premium tracking',
    loadingText: 'Loading...',
    
    // Accessibility
    accessibility: {
      trackingTypeLabel: 'Select tracking type',
      shopInputLabel: 'Enter shop name or ID',
      productInputLabel: 'Enter product URL',
      triggersLabel: 'Set alert triggers',
      emailLabel: 'Email address for alerts',
      consentLabel: 'Accept privacy policy'
    }
  };

  return `
<!DOCTYPE html>
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
        
        body {
            font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: ${theme === 'dark' ? '#1a1a1a' : '#f8fafc'};
            color: ${theme === 'dark' ? '#ffffff' : '#111827'};
            line-height: 1.6;
        }
        
        .premium-widget-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 2rem;
            background: ${theme === 'dark' ? '#2d2d2d' : '#ffffff'};
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            border: 1px solid ${theme === 'dark' ? '#404040' : '#e5e7eb'};
        }
        
        .premium-header {
            text-align: center;
            margin-bottom: 2rem;
            position: relative;
        }
        
        .premium-badge {
            position: absolute;
            top: -10px;
            right: -10px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .premium-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: ${theme === 'dark' ? '#ffffff' : '#111827'};
            margin-bottom: 0.5rem;
        }
        
        .premium-subtitle {
            font-size: 1rem;
            color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
            margin-bottom: 1rem;
        }
        
        .tracking-type-selector {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .tracking-option {
            padding: 1.5rem;
            border: 2px solid ${theme === 'dark' ? '#404040' : '#e5e7eb'};
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
        }
        
        .tracking-option:hover {
            border-color: #667eea;
            transform: translateY(-2px);
        }
        
        .tracking-option.selected {
            border-color: #667eea;
            background: rgba(102, 126, 234, 0.05);
        }
        
        .tracking-option input[type="radio"] {
            display: none;
        }
        
        .tracking-option-label {
            font-weight: 600;
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            display: block;
        }
        
        .tracking-option-description {
            font-size: 0.9rem;
            color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
        }
        
        .form-section {
            margin-bottom: 2rem;
        }
        
        .form-section-title {
            font-weight: 600;
            font-size: 1.1rem;
            margin-bottom: 1rem;
            color: ${theme === 'dark' ? '#ffffff' : '#111827'};
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-label {
            display: block;
            font-weight: 500;
            margin-bottom: 0.5rem;
            color: ${theme === 'dark' ? '#ffffff' : '#374151'};
        }
        
        .form-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid ${theme === 'dark' ? '#404040' : '#e5e7eb'};
            border-radius: 8px;
            font-size: 1rem;
            background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
            color: ${theme === 'dark' ? '#ffffff' : '#111827'};
            transition: border-color 0.3s ease;
        }
        
        .form-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .form-input.error {
            border-color: #ef4444;
        }
        
        .error-message {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: none;
        }
        
        .error-message.show {
            display: block;
        }
        
        .triggers-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1rem;
        }
        
        .trigger-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .trigger-item input[type="checkbox"] {
            width: 18px;
            height: 18px;
            accent-color: #667eea;
        }
        
        .trigger-item select {
            padding: 0.5rem;
            border: 1px solid ${theme === 'dark' ? '#404040' : '#e5e7eb'};
            border-radius: 6px;
            background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
            color: ${theme === 'dark' ? '#ffffff' : '#111827'};
        }
        
        .consent-group {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            margin-bottom: 2rem;
        }
        
        .consent-checkbox {
            width: 20px;
            height: 20px;
            accent-color: #667eea;
            margin-top: 0.125rem;
        }
        
        .consent-text {
            font-size: 0.9rem;
            color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
        }
        
        .consent-link {
            color: #667eea;
            text-decoration: none;
        }
        
        .consent-link:hover {
            text-decoration: underline;
        }
        
        .submit-button {
            width: 100%;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            opacity: 0.5;
            pointer-events: none;
        }
        
        .submit-button.active {
            opacity: 1;
            pointer-events: all;
        }
        
        .submit-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }
        
        .submit-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
        
        .success-message {
            display: none;
            text-align: center;
            padding: 2rem;
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.2);
            border-radius: 12px;
            margin-top: 2rem;
        }
        
        .success-message.show {
            display: block;
        }
        
        .success-icon {
            font-size: 3rem;
            color: #22c55e;
            margin-bottom: 1rem;
        }
        
        .success-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: ${theme === 'dark' ? '#ffffff' : '#111827'};
            margin-bottom: 1rem;
        }
        
        .success-description {
            color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
            margin-bottom: 1rem;
        }
        
        .premium-note {
            background: rgba(102, 126, 234, 0.1);
            border: 1px solid rgba(102, 126, 234, 0.2);
            border-radius: 8px;
            padding: 1rem;
            font-size: 0.9rem;
            color: #667eea;
            font-weight: 500;
        }
        
        /* Progress Steps */
        .progress-steps {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem;
            padding: 0 1rem;
        }
        
        .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            position: relative;
        }
        
        .step:not(:last-child)::after {
            content: '';
            position: absolute;
            top: 20px;
            left: 50%;
            width: 100%;
            height: 2px;
            background: ${theme === 'dark' ? '#404040' : '#e5e7eb'};
            z-index: 1;
        }
        
        .step.active:not(:last-child)::after {
            background: #667eea;
        }
        
        .step-number {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: ${theme === 'dark' ? '#404040' : '#e5e7eb'};
            color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            margin-bottom: 0.5rem;
            position: relative;
            z-index: 2;
        }
        
        .step.active .step-number {
            background: #667eea;
            color: white;
        }
        
        .step-label {
            font-size: 0.75rem;
            color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
            text-align: center;
        }
        
        .step.active .step-label {
            color: #667eea;
            font-weight: 600;
        }
        
        /* Step Content */
        .step-content {
            margin-bottom: 2rem;
        }
        
        .form-description {
            color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
            margin-bottom: 1.5rem;
            text-align: center;
        }
        
        /* Featured Stores */
        .featured-stores {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .store-card {
            border: 2px solid ${theme === 'dark' ? '#404040' : '#e5e7eb'};
            border-radius: 12px;
            padding: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
        }
        
        .store-card:hover {
            border-color: #667eea;
            transform: translateY(-2px);
        }
        
        .store-card.selected {
            border-color: #667eea;
            background: rgba(102, 126, 234, 0.05);
        }
        
        .store-image {
            width: 100%;
            height: 120px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        
        .store-name {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: ${theme === 'dark' ? '#ffffff' : '#111827'};
        }
        
        .store-category {
            color: #667eea;
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
        }
        
        .store-stats {
            display: flex;
            gap: 1rem;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
            color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
        }
        
        .store-description {
            font-size: 0.875rem;
            color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
            line-height: 1.4;
        }
        
        /* Custom Store Section */
        .custom-store-section {
            border-top: 1px solid ${theme === 'dark' ? '#404040' : '#e5e7eb'};
            padding-top: 1.5rem;
            margin-top: 1.5rem;
        }
        
        /* Product List */
        .product-list {
            margin-bottom: 1.5rem;
        }
        
        .product-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            border: 1px solid ${theme === 'dark' ? '#404040' : '#e5e7eb'};
            border-radius: 8px;
            margin-bottom: 0.5rem;
            background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
        }
        
        .product-info {
            flex: 1;
        }
        
        .product-name {
            font-weight: 600;
            color: ${theme === 'dark' ? '#ffffff' : '#111827'};
            margin-bottom: 0.25rem;
        }
        
        .product-url {
            font-size: 0.875rem;
            color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
            word-break: break-all;
        }
        
        .remove-button {
            background: #ef4444;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 0.5rem;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.3s ease;
        }
        
        .remove-button:hover {
            background: #dc2626;
        }
        
        /* Add Product Section */
        .add-product-section {
            border-top: 1px solid ${theme === 'dark' ? '#404040' : '#e5e7eb'};
            padding-top: 1.5rem;
            margin-top: 1.5rem;
        }
        
        .custom-store-section h3 {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: ${theme === 'dark' ? '#ffffff' : '#111827'};
        }
        
        .input-group {
            display: flex;
            gap: 0.5rem;
        }
        
        .add-button {
            padding: 0.75rem 1rem;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .add-button:hover {
            background: #5a67d8;
        }
        
        /* Button Groups */
        .button-group {
            display: flex;
            gap: 1rem;
            justify-content: space-between;
            margin-top: 2rem;
        }
        
        .next-button, .back-button {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .next-button {
            background: #667eea;
            color: white;
        }
        
        .next-button:hover:not(:disabled) {
            background: #5a67d8;
        }
        
        .next-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .back-button {
            background: ${theme === 'dark' ? '#404040' : '#e5e7eb'};
            color: ${theme === 'dark' ? '#ffffff' : '#111827'};
        }
        
        .back-button:hover {
            background: ${theme === 'dark' ? '#4b5563' : '#d1d5db'};
        }
        
        /* Confirmation Details */
        .confirmation-details {
            background: ${theme === 'dark' ? '#1a1a1a' : '#f9fafb'};
            border: 1px solid ${theme === 'dark' ? '#404040' : '#e5e7eb'};
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
        }
        
        @media (max-width: 768px) {
            .premium-widget-container {
                margin: 1rem;
                padding: 1.5rem;
            }
            
            .tracking-type-selector {
                grid-template-columns: 1fr;
            }
            
            .triggers-grid {
                grid-template-columns: 1fr;
            }
            
            .featured-stores {
                grid-template-columns: 1fr;
            }
            
            .button-group {
                flex-direction: column;
            }
            
            .input-group {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="premium-widget-container">
        <div class="premium-header">
            <div class="premium-badge">${t.premiumBadge}</div>
            <h1 class="premium-title">${t.title}</h1>
            <p class="premium-subtitle">${t.subtitle}</p>
        </div>
        
        <!-- Progress Steps -->
        <div class="progress-steps" id="progress-steps" style="display: none;">
            <div class="step active" data-step="1">
                <div class="step-number">1</div>
                <div class="step-label">${t.step1}</div>
            </div>
            <div class="step" data-step="2">
                <div class="step-number">2</div>
                <div class="step-label">${t.step2}</div>
            </div>
            <div class="step" data-step="3">
                <div class="step-number">3</div>
                <div class="step-label">${t.step3}</div>
            </div>
            <div class="step" data-step="4">
                <div class="step-number">4</div>
                <div class="step-label">${t.step4}</div>
            </div>
            <div class="step" data-step="5">
                <div class="step-number">5</div>
                <div class="step-label">${t.step5}</div>
            </div>
        </div>

        <!-- Step 1: Tracking Type Selection -->
        <div class="step-content" id="step-1">
            <h2 class="form-section-title" id="tracking-type-label">${t.trackingTypeLabel}</h2>
            <div class="tracking-type-selector" role="radiogroup" aria-labelledby="tracking-type-label">
                <label class="tracking-option" for="shop-tracking">
                    <input type="radio" id="shop-tracking" name="trackingType" value="shop" aria-describedby="shop-description">
                    <span class="tracking-option-label">${t.shopTracking}</span>
                    <span class="tracking-option-description" id="shop-description">${t.shopDescription}</span>
                </label>
                <label class="tracking-option" for="product-tracking">
                    <input type="radio" id="product-tracking" name="trackingType" value="product" aria-describedby="product-description">
                    <span class="tracking-option-label">${t.productTracking}</span>
                    <span class="tracking-option-description" id="product-description">${t.productDescription}</span>
                </label>
            </div>
            <button type="button" class="next-button" id="next-step-1" disabled>${t.nextButton}</button>
        </div>

        <!-- Step 2: Email -->
        <div class="step-content" id="step-2" style="display: none;">
            <h2 class="form-section-title">${t.step1}</h2>
            <div class="form-group">
                <label class="form-label" for="email-input">${t.emailLabel}</label>
                <input type="email" id="email-input" class="form-input" placeholder="${t.emailPlaceholder}" required aria-describedby="email-error">
                <div class="error-message" id="email-error"></div>
                <small style="color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'}; font-size: 0.875rem; margin-top: 0.25rem;">${t.emailDescription}</small>
            </div>
            <div class="button-group">
                <button type="button" class="back-button" id="back-step-2">${t.backButton}</button>
                <button type="button" class="next-button" id="next-step-2" disabled>${t.nextButton}</button>
            </div>
        </div>

        <!-- Step 3: Shop Selection (for shop tracking) -->
        <div class="step-content" id="step-3-shop" style="display: none;">
            <h2 class="form-section-title">${t.step2}</h2>
            <p class="form-description">${t.storeDescription}</p>
            
            <!-- Featured Stores -->
            <div class="featured-stores">
                ${featuredStores.map(store => `
                    <div class="store-card" data-store-url="${store.url}">
                        <img src="${store.image}" alt="${store.name}" class="store-image">
                        <div class="store-info">
                            <h3 class="store-name">${store.name}</h3>
                            <p class="store-category">${store.category}</p>
                            <div class="store-stats">
                                <span class="rating">⭐ ${store.rating}</span>
                                <span class="reviews">(${store.reviews.toLocaleString()})</span>
                                <span class="sales">${store.monthlySales}</span>
                            </div>
                            <p class="store-description">${store.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Custom Store Input -->
            <div class="custom-store-section">
                <h3>${t.addCustomTitle}</h3>
                <p>${t.addCustomDescription}</p>
                <div class="input-group">
                    <input type="url" id="custom-store-input" class="form-input" placeholder="${t.addStorePlaceholder}">
                    <button type="button" id="add-store-button" class="add-button">${t.addStoreButton}</button>
                </div>
            </div>
            
            <div class="button-group">
                <button type="button" class="back-button" id="back-step-3-shop">${t.backButton}</button>
                <button type="button" class="next-button" id="next-step-3-shop" disabled>${t.nextButton}</button>
            </div>
        </div>

        <!-- Step 3: Product URLs (for product tracking) -->
        <div class="step-content" id="step-3-product" style="display: none;">
            <h2 class="form-section-title">${t.productInputLabel}</h2>
            <p class="form-description">Voeg meerdere producten toe om te tracken</p>
            
            <!-- Product List -->
            <div class="product-list" id="product-list">
                <!-- Products will be added here dynamically -->
            </div>
            
            <!-- Add Product Input -->
            <div class="add-product-section">
                <div class="input-group">
                    <input type="url" id="product-input" class="form-input" placeholder="${t.productInputPlaceholder}">
                    <button type="button" id="add-product-button" class="add-button">Toevoegen</button>
                </div>
            </div>
            
            <div class="button-group">
                <button type="button" class="back-button" id="back-step-3-product">${t.backButton}</button>
                <button type="button" class="next-button" id="next-step-3-product" disabled>${t.nextButton}</button>
            </div>
        </div>

        <!-- Step 4: Tags (for shop tracking) -->
        <div class="step-content" id="step-4-shop" style="display: none;">
            <h2 class="form-section-title">${t.step3}</h2>
            <p class="form-description">${t.tagsDescription}</p>
            <div class="form-group">
                <input type="text" id="tags-input" class="form-input" placeholder="${t.tagsPlaceholder}">
            </div>
            <div class="button-group">
                <button type="button" class="back-button" id="back-step-4-shop">${t.backButton}</button>
                <button type="button" class="next-button" id="next-step-4-shop">${t.nextButton}</button>
            </div>
        </div>

        <!-- Step 4: Triggers (for product tracking) -->
        <div class="step-content" id="step-4-product" style="display: none;">
            <h2 class="form-section-title">${t.step4}</h2>
            <div class="triggers-grid">
                <div class="form-group">
                    <label class="form-label" for="price-trigger">${t.priceTriggerLabel}</label>
                    <input type="number" id="price-trigger" class="form-input" placeholder="${t.priceTriggerPlaceholder}" step="0.01" min="0">
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="stock-trigger">${t.stockTriggerLabel}</label>
                    <input type="number" id="stock-trigger" class="form-input" placeholder="${t.stockTriggerPlaceholder}" min="0">
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="discount-trigger">${t.discountTriggerLabel}</label>
                    <input type="number" id="discount-trigger" class="form-input" placeholder="${t.discountTriggerPlaceholder}" min="0" max="100" step="1">
                </div>
                
                <div class="trigger-item">
                    <input type="checkbox" id="new-variants" name="triggers" value="newVariants">
                    <label for="new-variants">${t.newVariantsLabel}</label>
                </div>
                
                <div class="trigger-item">
                    <label for="review-score">${t.reviewScoreLabel}</label>
                    <select id="review-score" class="form-input">
                        <option value="">${lang === 'nl' ? 'Geen' : 'None'}</option>
                        <option value="increases">${t.reviewScoreOptions.increases}</option>
                        <option value="decreases">${t.reviewScoreOptions.decreases}</option>
                        <option value="both">${t.reviewScoreOptions.both}</option>
                    </select>
                </div>
            </div>
            <div class="button-group">
                <button type="button" class="back-button" id="back-step-4-product">${t.backButton}</button>
                <button type="button" class="next-button" id="next-step-4-product">${t.nextButton}</button>
            </div>
        </div>

        <!-- Step 5: Confirmation -->
        <div class="step-content" id="step-5" style="display: none;">
            <h2 class="form-section-title">${t.step5}</h2>
            <div class="confirmation-details" id="confirmation-details">
                <!-- Will be populated by JavaScript -->
            </div>
            
            <div class="consent-group">
                <input type="checkbox" id="consent-checkbox" class="consent-checkbox" required>
                <div class="consent-text">
                    ${t.consentLabel} 
                    <a href="/privacy?lang=${lang}" class="consent-link" target="_blank">${t.consentLink}</a>
                </div>
            </div>
            
            <div class="button-group">
                <button type="button" class="back-button" id="back-step-5">${t.backButton}</button>
                <button type="submit" id="submit-button" class="submit-button" disabled>
                    ${t.submitButton}
                </button>
            </div>
        </div>
        
        <!-- Success Message -->
        <div class="success-message" id="success-message">
            <div class="success-icon">✓</div>
            <h3 class="success-title" id="success-title">${t.successTitle}</h3>
            <p class="success-description" id="success-description"></p>
            <div class="premium-note">${t.premiumNote}</div>
        </div>
    </div>
    
    <script>
        // Premium Tracking Widget Logic
        (function() {
            let currentStep = 1;
            let currentTrackingType = null;
            let selectedStores = [];
            let selectedProducts = [];
            let selectedTags = [];
            
            // Initialize
            initializeWidget();
            
            function initializeWidget() {
                // Show progress steps
                document.getElementById('progress-steps').style.display = 'flex';
                
                // Add event listeners
                addEventListeners();
                
                // Initialize product list
                updateProductList();
                
                // Update step display
                updateStepDisplay();
            }
            
            function addEventListeners() {
                // Tracking type selection
                document.querySelectorAll('input[name="trackingType"]').forEach(input => {
                    input.addEventListener('change', handleTrackingTypeChange);
                });
                
                // Step navigation buttons
                document.getElementById('next-step-1').addEventListener('click', () => nextStep());
                document.getElementById('next-step-2').addEventListener('click', () => nextStep());
                document.getElementById('next-step-3-shop').addEventListener('click', () => nextStep());
                document.getElementById('next-step-3-product').addEventListener('click', () => nextStep());
                document.getElementById('next-step-4-shop').addEventListener('click', () => nextStep());
                document.getElementById('next-step-4-product').addEventListener('click', () => nextStep());
                
                // Back buttons
                document.getElementById('back-step-2').addEventListener('click', () => previousStep());
                document.getElementById('back-step-3-shop').addEventListener('click', () => previousStep());
                document.getElementById('back-step-3-product').addEventListener('click', () => previousStep());
                document.getElementById('back-step-4-shop').addEventListener('click', () => previousStep());
                document.getElementById('back-step-4-product').addEventListener('click', () => previousStep());
                document.getElementById('back-step-5').addEventListener('click', () => previousStep());
                
                // Store selection
                document.querySelectorAll('.store-card').forEach(card => {
                    card.addEventListener('click', handleStoreSelection);
                });
                
                // Custom store input
                document.getElementById('add-store-button').addEventListener('click', handleAddCustomStore);
                
                // Custom product input
                document.getElementById('add-product-button').addEventListener('click', handleAddProduct);
                
                // Form inputs
                document.getElementById('email-input').addEventListener('input', validateCurrentStep);
                document.getElementById('product-input').addEventListener('input', validateCurrentStep);
                document.getElementById('tags-input').addEventListener('input', validateCurrentStep);
                document.getElementById('consent-checkbox').addEventListener('change', validateCurrentStep);
                
                // Submit button
                document.getElementById('submit-button').addEventListener('click', handleSubmit);
            }
            
            function handleTrackingTypeChange() {
                currentTrackingType = this.value;
                
                // Update UI
                document.querySelectorAll('.tracking-option').forEach(option => {
                    option.classList.remove('selected');
                });
                this.closest('.tracking-option').classList.add('selected');
                
                // Enable next button
                document.getElementById('next-step-1').disabled = false;
            }
            
            function handleStoreSelection() {
                const storeUrl = this.dataset.storeUrl;
                const storeName = this.querySelector('.store-name').textContent;
                
                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                    selectedStores = selectedStores.filter(store => store.url !== storeUrl);
                } else {
                    this.classList.add('selected');
                    selectedStores.push({ url: storeUrl, name: storeName });
                }
                
                validateCurrentStep();
            }
            
            function handleAddCustomStore() {
                const input = document.getElementById('custom-store-input');
                const url = input.value.trim();
                
                if (url && isValidStoreUrl(url)) {
                    const storeName = extractStoreNameFromUrl(url);
                    selectedStores.push({ url: url, name: storeName });
                    input.value = '';
                    validateCurrentStep();
                }
            }
            
            function handleAddProduct() {
                const input = document.getElementById('product-input');
                const url = input.value.trim();
                
                if (url && isValidProductUrl(url)) {
                    const productName = extractProductNameFromUrl(url);
                    selectedProducts.push({ url: url, name: productName });
                    input.value = '';
                    updateProductList();
                    validateCurrentStep();
                }
            }
            
            function removeProduct(productUrl) {
                selectedProducts = selectedProducts.filter(product => product.url !== productUrl);
                updateProductList();
                validateCurrentStep();
            }
            
            function updateProductList() {
                const productList = document.getElementById('product-list');
                
                if (selectedProducts.length === 0) {
                    productList.innerHTML = '<p style="color: #6b7280; text-align: center; font-style: italic;">Nog geen producten toegevoegd</p>';
                    return;
                }
                
                productList.innerHTML = selectedProducts.map(product => 
                    '<div class="product-item">' +
                        '<div class="product-info">' +
                            '<div class="product-name">' + product.name + '</div>' +
                            '<div class="product-url">' + product.url + '</div>' +
                        '</div>' +
                        '<button type="button" class="remove-button" onclick="removeProduct(\'' + product.url + '\')">' +
                            'Verwijderen' +
                        '</button>' +
                    '</div>'
                ).join('');
            }
            
            function nextStep() {
                if (validateCurrentStep()) {
                    currentStep++;
                    updateStepDisplay();
                }
            }
            
            function previousStep() {
                currentStep--;
                updateStepDisplay();
            }
            
            function updateStepDisplay() {
                // Hide all step content
                document.querySelectorAll('.step-content').forEach(content => {
                    content.style.display = 'none';
                });
                
                // Update progress steps
                document.querySelectorAll('.step').forEach((step, index) => {
                    if (index + 1 <= currentStep) {
                        step.classList.add('active');
                    } else {
                        step.classList.remove('active');
                    }
                });
                
                // Show current step content
                let currentStepId = 'step-' + currentStep;
                
                // Handle different paths for shop vs product tracking
                if (currentStep === 3 && currentTrackingType === 'shop') {
                    currentStepId = 'step-3-shop';
                } else if (currentStep === 3 && currentTrackingType === 'product') {
                    currentStepId = 'step-3-product';
                } else if (currentStep === 4 && currentTrackingType === 'shop') {
                    currentStepId = 'step-4-shop';
                } else if (currentStep === 4 && currentTrackingType === 'product') {
                    currentStepId = 'step-4-product';
                }
                
                document.getElementById(currentStepId).style.display = 'block';
                
                // Update confirmation details if on step 5
                if (currentStep === 5) {
                    updateConfirmationDetails();
                }
            }
            
            function validateCurrentStep() {
                let isValid = true;
                
                switch (currentStep) {
                    case 1:
                        isValid = currentTrackingType !== null;
                        document.getElementById('next-step-1').disabled = !isValid;
                        break;
                        
                    case 2:
                        const email = document.getElementById('email-input').value.trim();
                        isValid = email && isValidEmail(email);
                        document.getElementById('next-step-2').disabled = !isValid;
                        break;
                        
                    case 3:
                        if (currentTrackingType === 'shop') {
                            isValid = selectedStores.length > 0;
                            document.getElementById('next-step-3-shop').disabled = !isValid;
                        } else {
                            isValid = selectedProducts.length > 0;
                            document.getElementById('next-step-3-product').disabled = !isValid;
                        }
                        break;
                        
                    case 4:
                        if (currentTrackingType === 'shop') {
                            // Tags are optional for shop tracking
                            isValid = true;
                            document.getElementById('next-step-4-shop').disabled = false;
                        } else {
                            // Triggers are optional for product tracking
                            isValid = true;
                            document.getElementById('next-step-4-product').disabled = false;
                        }
                        break;
                        
                    case 5:
                        const consent = document.getElementById('consent-checkbox').checked;
                        isValid = consent;
                        document.getElementById('submit-button').disabled = !isValid;
                        break;
                }
                
                return isValid;
            }
            
            function updateConfirmationDetails() {
                const details = document.getElementById('confirmation-details');
                const email = document.getElementById('email-input').value.trim();
                
                let html = '<h4>Bevestig je aanmelding:</h4>';
                html += '<p><strong>Email:</strong> ' + email + '</p>';
                
                if (currentTrackingType === 'shop') {
                    html += '<p><strong>Type:</strong> Shop tracking</p>';
                    html += '<p><strong>Geselecteerde shops:</strong></p><ul>';
                    selectedStores.forEach(store => {
                        html += '<li>' + store.name + '</li>';
                    });
                    html += '</ul>';
                    
                    const tags = document.getElementById('tags-input').value.trim();
                    if (tags) {
                        html += '<p><strong>Zoektermen:</strong> ' + tags + '</p>';
                    }
                } else {
                    html += '<p><strong>Type:</strong> Product tracking</p>';
                    html += '<p><strong>Geselecteerde producten:</strong></p><ul>';
                    selectedProducts.forEach(product => {
                        html += '<li>' + product.name + '</li>';
                    });
                    html += '</ul>';
                    
                    // Show triggers
                    const priceTrigger = document.getElementById('price-trigger').value;
                    const stockTrigger = document.getElementById('stock-trigger').value;
                    const discountTrigger = document.getElementById('discount-trigger').value;
                    const newVariants = document.getElementById('new-variants').checked;
                    const reviewScore = document.getElementById('review-score').value;
                    
                    if (priceTrigger || stockTrigger || discountTrigger || newVariants || reviewScore) {
                        html += '<p><strong>Triggers:</strong></p><ul>';
                        if (priceTrigger) html += '<li>Prijs daalt onder €' + priceTrigger + '</li>';
                        if (stockTrigger) html += '<li>Voorraad onder ' + stockTrigger + ' stuks</li>';
                        if (discountTrigger) html += '<li>Korting boven ' + discountTrigger + '%</li>';
                        if (newVariants) html += '<li>Nieuwe varianten toegevoegd</li>';
                        if (reviewScore) html += '<li>Review score ' + reviewScore + '</li>';
                        html += '</ul>';
                    }
                }
                
                details.innerHTML = html;
            }
            
            async function handleSubmit() {
                const submitButton = document.getElementById('submit-button');
                submitButton.disabled = true;
                submitButton.textContent = '${t.loadingText}';
                
                try {
                    const formData = {
                        trackingType: currentTrackingType,
                        email: document.getElementById('email-input').value.trim(),
                        lang: '${lang}'
                    };
                    
                    if (currentTrackingType === 'shop') {
                        formData.shops = selectedStores;
                        formData.tags = document.getElementById('tags-input').value.trim();
                    } else {
                        formData.products = selectedProducts;
                                            formData.triggers = {
                        price: document.getElementById('price-trigger').value,
                        stock: document.getElementById('stock-trigger').value,
                        discount: document.getElementById('discount-trigger').value,
                        newVariants: document.getElementById('new-variants').checked,
                        reviewScore: document.getElementById('review-score').value
                    };
                    }
                    
                    // Send to backend
                    const response = await fetch('/api/premium-tracking', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        showSuccess(result);
                    } else {
                        throw new Error(result.message || 'Tracking activation failed');
                    }
                    
                } catch (error) {
                    console.error('Premium tracking error:', error);
                    alert(error.message);
                } finally {
                    submitButton.disabled = false;
                    submitButton.textContent = '${t.submitButton}';
                }
            }
            
            function showSuccess(result) {
                // Hide all step content
                document.querySelectorAll('.step-content').forEach(content => {
                    content.style.display = 'none';
                });
                
                // Show success message
                document.getElementById('success-message').classList.add('show');
                
                const successDescription = document.getElementById('success-description');
                
                if (currentTrackingType === 'shop') {
                    successDescription.textContent = 'We monitoren nu ' + selectedStores.length + ' shop(s). Je ontvangt meldingen op ' + document.getElementById('email-input').value.trim() + '.';
                } else {
                    successDescription.textContent = 'We monitoren nu ' + selectedProducts.length + ' product(en). Je ontvangt meldingen op ' + document.getElementById('email-input').value.trim() + '.';
                }
            }
            
            // Validation helpers
            function isValidEmail(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            }
            
            function isValidProductUrl(url) {
                return url.includes('dhgate.com/product/') || url.includes('dhgate.com/wholesale/');
            }
            
            function isValidStoreUrl(url) {
                return url.includes('dhgate.com/store/');
            }
            
            function extractStoreNameFromUrl(url) {
                try {
                    const urlObj = new URL(url);
                    const pathParts = urlObj.pathname.split('/');
                    const storeId = pathParts.find(part => part.length > 5 && /^\d+$/.test(part));
                    return storeId ? 'DHgate Store #' + storeId : 'Custom Store';
                } catch (error) {
                    return 'Custom Store';
                }
            }
            
            // Accessibility improvements
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && e.target.classList.contains('tracking-option')) {
                    e.target.querySelector('input[type="radio"]').click();
                }
            });
        })();
    </script>
</body>
</html>`;
}
