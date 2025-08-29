// ============================================================================
// PREMIUM PRODUCT/SHOP TRACKING WIDGET
// ============================================================================
// Premium extension of the shop tracker with product-specific monitoring

export function generatePremiumTrackingWidget(env = null, lang = 'nl', theme = 'light') {
  const widgetId = 'dhgate-premium-widget-' + Date.now();
  
  const t = lang === 'nl' ? {
    // Premium branding
    title: 'DHgate Monitor Premium',
    subtitle: 'Geavanceerde product- en shop tracking met prijs-, voorraad- en reviewalerts',
    premiumBadge: 'Premium Feature',
    
    // Tracking type selection
    trackingTypeLabel: 'Wat wil je tracken?',
    shopTracking: 'Shop tracking',
    productTracking: 'Product tracking',
    shopDescription: 'Monitor een hele shop voor nieuwe producten',
    productDescription: 'Track specifieke producten met prijs- en voorraadalerts',
    
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
            grid-template-columns: 1fr 1fr;
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
        
        <form id="premium-tracking-form" novalidate>
            <!-- Tracking Type Selection -->
            <div class="form-section">
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
            </div>
            
            <!-- Shop/Product Input -->
            <div class="form-section" id="input-section" style="display: none;">
                <div class="form-group" id="shop-input-group" style="display: none;">
                    <label class="form-label" for="shop-input">${t.shopInputLabel}</label>
                    <input type="text" id="shop-input" class="form-input" placeholder="${t.shopInputPlaceholder}" aria-describedby="shop-error">
                    <div class="error-message" id="shop-error"></div>
                </div>
                
                <div class="form-group" id="product-input-group" style="display: none;">
                    <label class="form-label" for="product-input">${t.productInputLabel}</label>
                    <input type="url" id="product-input" class="form-input" placeholder="${t.productInputPlaceholder}" aria-describedby="product-error">
                    <div class="error-message" id="product-error"></div>
                </div>
            </div>
            
            <!-- Triggers Section -->
            <div class="form-section" id="triggers-section" style="display: none;">
                <h2 class="form-section-title">${t.triggersTitle}</h2>
                <div class="triggers-grid">
                    <div class="form-group">
                        <label class="form-label" for="price-trigger">${t.priceTriggerLabel}</label>
                        <input type="number" id="price-trigger" class="form-input" placeholder="${t.priceTriggerPlaceholder}" step="0.01" min="0">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="stock-trigger">${t.stockTriggerLabel}</label>
                        <input type="number" id="stock-trigger" class="form-input" placeholder="${t.stockTriggerPlaceholder}" min="0">
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
            </div>
            
            <!-- Email and Consent -->
            <div class="form-section">
                <div class="form-group">
                    <label class="form-label" for="email-input">${t.emailLabel}</label>
                    <input type="email" id="email-input" class="form-input" placeholder="${t.emailPlaceholder}" required aria-describedby="email-error">
                    <div class="error-message" id="email-error"></div>
                    <small style="color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'}; font-size: 0.875rem; margin-top: 0.25rem;">${t.emailDescription}</small>
                </div>
                
                <div class="consent-group">
                    <input type="checkbox" id="consent-checkbox" class="consent-checkbox" required>
                    <div class="consent-text">
                        ${t.consentLabel} 
                        <a href="/privacy?lang=${lang}" class="consent-link" target="_blank">${t.consentLink}</a>
                    </div>
                </div>
            </div>
            
            <!-- Submit Button -->
            <button type="submit" id="submit-button" class="submit-button" disabled>
                ${t.submitButton}
            </button>
        </form>
        
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
            const form = document.getElementById('premium-tracking-form');
            const trackingTypeInputs = document.querySelectorAll('input[name="trackingType"]');
            const inputSection = document.getElementById('input-section');
            const shopInputGroup = document.getElementById('shop-input-group');
            const productInputGroup = document.getElementById('product-input-group');
            const triggersSection = document.getElementById('triggers-section');
            const emailInput = document.getElementById('email-input');
            const consentCheckbox = document.getElementById('consent-checkbox');
            const submitButton = document.getElementById('submit-button');
            const successMessage = document.getElementById('success-message');
            
            let currentTrackingType = null;
            
            // Tracking type selection
            trackingTypeInputs.forEach(input => {
                input.addEventListener('change', function() {
                    currentTrackingType = this.value;
                    
                    // Update UI
                    document.querySelectorAll('.tracking-option').forEach(option => {
                        option.classList.remove('selected');
                    });
                    this.closest('.tracking-option').classList.add('selected');
                    
                    // Show/hide sections
                    inputSection.style.display = 'block';
                    triggersSection.style.display = 'block';
                    
                    if (currentTrackingType === 'shop') {
                        shopInputGroup.style.display = 'block';
                        productInputGroup.style.display = 'none';
                    } else {
                        shopInputGroup.style.display = 'none';
                        productInputGroup.style.display = 'block';
                    }
                    
                    validateForm();
                });
            });
            
            // Form validation
            function validateForm() {
                let isValid = true;
                
                // Email validation
                const email = emailInput.value.trim();
                const emailError = document.getElementById('email-error');
                if (!email || !isValidEmail(email)) {
                    showError(emailError, t.invalidEmail);
                    isValid = false;
                } else {
                    hideError(emailError);
                }
                
                // Input validation based on tracking type
                if (currentTrackingType === 'shop') {
                    const shopInput = document.getElementById('shop-input');
                    const shopError = document.getElementById('shop-error');
                    if (!shopInput.value.trim()) {
                        showError(shopError, t.invalidShop);
                        isValid = false;
                    } else {
                        hideError(shopError);
                    }
                } else if (currentTrackingType === 'product') {
                    const productInput = document.getElementById('product-input');
                    const productError = document.getElementById('product-error');
                    if (!productInput.value.trim() || !isValidProductUrl(productInput.value)) {
                        showError(productError, t.invalidProductUrl);
                        isValid = false;
                    } else {
                        hideError(productError);
                    }
                }
                
                // Consent validation
                if (!consentCheckbox.checked) {
                    isValid = false;
                }
                
                // Update submit button
                if (isValid && currentTrackingType) {
                    submitButton.classList.add('active');
                    submitButton.disabled = false;
                } else {
                    submitButton.classList.remove('active');
                    submitButton.disabled = true;
                }
            }
            
            // Validation helpers
            function isValidEmail(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            }
            
            function isValidProductUrl(url) {
                return url.includes('dhgate.com/product/') || url.includes('dhgate.com/wholesale/');
            }
            
            function showError(errorElement, message) {
                errorElement.textContent = message;
                errorElement.classList.add('show');
            }
            
            function hideError(errorElement) {
                errorElement.classList.remove('show');
            }
            
            // Event listeners
            emailInput.addEventListener('input', validateForm);
            consentCheckbox.addEventListener('change', validateForm);
            
            document.getElementById('shop-input')?.addEventListener('input', validateForm);
            document.getElementById('product-input')?.addEventListener('input', validateForm);
            
            // Form submission
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                if (submitButton.disabled) return;
                
                submitButton.disabled = true;
                submitButton.textContent = '${t.loadingText}';
                
                try {
                    const formData = {
                        trackingType: currentTrackingType,
                        email: emailInput.value.trim(),
                        triggers: {
                            price: document.getElementById('price-trigger').value,
                            stock: document.getElementById('stock-trigger').value,
                            newVariants: document.getElementById('new-variants').checked,
                            reviewScore: document.getElementById('review-score').value
                        }
                    };
                    
                    if (currentTrackingType === 'shop') {
                        formData.shop = document.getElementById('shop-input').value.trim();
                    } else {
                        formData.productUrl = document.getElementById('product-input').value.trim();
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
            });
            
            function showSuccess(result) {
                form.style.display = 'none';
                successMessage.classList.add('show');
                
                const successTitle = document.getElementById('success-title');
                const successDescription = document.getElementById('success-description');
                
                if (currentTrackingType === 'shop') {
                    successDescription.textContent = t.shopSuccessMessage
                        .replace('{shopName}', result.shopName || formData.shop)
                        .replace('{email}', emailInput.value.trim());
                } else {
                    successDescription.textContent = t.productSuccessMessage
                        .replace('{productName}', result.productName || 'Product')
                        .replace('{email}', emailInput.value.trim());
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
