// ============================================================================
// DHGATE MONITOR WIDGET - COMPLETE 4-STEP FLOW
// ============================================================================
// Full widget implementation with 4 steps: Email → Stores → Keywords → Summary
// Maintains DHgate Monitor brand identity and backend compatibility

export function generateSignupWidget(env = null, lang = null, theme = 'light') {
  const widgetId = 'dhgate-signup-widget-' + Date.now();
  
  if (!lang) {
    lang = 'nl';
  }

  const t = lang === 'nl' ? {
    // Step 1
    step1Title: 'Start gratis met DHgate monitoring',
    step1Subtitle: 'Ontvang alerts voor trending producten en prijswijzigingen van jouw favoriete DHgate winkels',
    emailLabel: 'E-mailadres',
    emailPlaceholder: 'jouw@email.com',
    nextButton: 'Volgende stap',
    
    // Step 2
    step2Title: 'Selecteer DHgate winkels',
    step2Subtitle: 'Kies de winkels waarvan je prijsupdates wilt ontvangen',
    storeSearchPlaceholder: 'Zoek naar winkel naam of URL...',
    addStoreButton: 'Winkel toevoegen',
    noStoresText: 'Geen winkels toegevoegd',
    skipStep: 'Overslaan',
    
    // Step 3
    step3Title: 'Zoekwoorden instellen',
    step3Subtitle: 'Voeg zoekwoorden toe om relevante producten te volgen',
    keywordPlaceholder: 'bijv: telefoon, laptop, kleding...',
    addKeywordButton: 'Zoekwoord toevoegen',
    noKeywordsText: 'Geen zoekwoorden toegevoegd',
    
    // Step 4
    step4Title: 'Samenvatting en bevestiging',
    step4Subtitle: 'Controleer je instellingen en start je monitoring',
    emailText: 'E-mailadres:',
    storesText: 'Winkels:',
    keywordsText: 'Zoekwoorden:',
    finishButton: 'Start monitoring',
    
    // Progress
    stepOf: 'Stap {{current}} van {{total}}',
    backButton: 'Terug',
    processing: 'Bezig...',
    
    // GDPR Consent
    gdprConsent: 'Ik ga akkoord met het verwerken van mijn gegevens voor DHgate monitoring',
    privacyPolicy: 'Privacybeleid',
    consentRequired: 'Toestemming is verplicht om door te gaan'
  } : {
    // Step 1
    step1Title: 'Start free DHgate monitoring',
    step1Subtitle: 'Get alerts for trending products and price changes from your favorite DHgate stores',
    emailLabel: 'Email address',
    emailPlaceholder: 'your@email.com',
    nextButton: 'Next step',
    
    // Step 2
    step2Title: 'Select DHgate stores',
    step2Subtitle: 'Choose stores you want to receive price updates from',
    storeSearchPlaceholder: 'Search for store name or URL...',
    addStoreButton: 'Add store',
    noStoresText: 'No stores added',
    skipStep: 'Skip',
    
    // Step 3
    step3Title: 'Set up keywords',
    step3Subtitle: 'Add keywords to track relevant products',
    keywordPlaceholder: 'e.g: phone, laptop, clothing...',
    addKeywordButton: 'Add keyword',
    noKeywordsText: 'No keywords added',
    
    // Step 4
    step4Title: 'Summary and confirmation',
    step4Subtitle: 'Review your settings and start monitoring',
    emailText: 'Email:',
    storesText: 'Stores:',
    keywordsText: 'Keywords:',
    finishButton: 'Start monitoring',
    
    // Progress
    stepOf: 'Step {{current}} of {{total}}',
    backButton: 'Back',
    processing: 'Processing...',
    
    // GDPR Consent
    gdprConsent: 'I agree to the processing of my data for DHgate monitoring',
    privacyPolicy: 'Privacy Policy',
    consentRequired: 'Consent is required to continue'
  };

  return `
<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap');

body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.widget-container {
    font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 650px;
    width: 100%;
    margin: 2rem;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 20px;
    padding: 2.5rem;
    text-align: center;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: hidden;
}

.widget-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #2563EB, #EA580C);
}

.progress-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    position: relative;
}

.progress-step {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
}

.progress-step.active {
    background: linear-gradient(135deg, #2563EB, #1d4ed8);
    color: white;
    transform: scale(1.1);
}

.progress-step.completed {
    background: #22c55e;
    color: white;
}

.progress-step.inactive {
    background: #f1f5f9;
    color: #64748b;
}

.progress-line {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: #e2e8f0;
    z-index: 1;
    transform: translateY(-50%);
}

.progress-line-fill {
    height: 100%;
    background: linear-gradient(135deg, #2563EB, #22c55e);
    transition: width 0.5s ease;
    border-radius: 1px;
}

.step-content {
    display: none;
    animation: fadeIn 0.4s ease-in-out;
}

.step-content.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.step-title {
    font-size: 1.875rem;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 0.75rem;
    line-height: 1.2;
}

.step-subtitle {
    font-size: 1rem;
    color: #64748b;
    margin-bottom: 2rem;
    line-height: 1.5;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}

.form-group {
    margin-bottom: 1.5rem;
    text-align: left;
}

.form-label {
    display: block;
    font-size: 0.875rem;
    color: #0f172a;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-input {
    width: 100%;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 0.95rem;
    font-family: 'Raleway', sans-serif;
    background: white;
    color: #0f172a;
    transition: all 0.25s ease;
}

.form-input:focus {
    outline: none;
    border-color: #2563EB;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
    transform: translateY(-1px);
}

/* GDPR Consent Styling */
.gdpr-consent {
    margin-top: 1rem;
}

.checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    cursor: pointer;
    font-size: 0.9rem;
    line-height: 1.4;
}

.gdpr-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.checkmark {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border: 2px solid #d1d5db;
    border-radius: 4px;
    background: white;
    transition: all 0.2s ease;
    position: relative;
}

.gdpr-checkbox:checked + .checkmark {
    background: linear-gradient(135deg, #2563EB, #1d4ed8);
    border-color: #2563EB;
}

.gdpr-checkbox:checked + .checkmark::after {
    content: '';
    position: absolute;
    left: 6px;
    top: 2px;
    width: 6px;
    height: 10px;
    border: 2px solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.consent-text {
    color: #64748b;
    margin-top: 1px;
}

.privacy-link {
    color: #2563EB;
    text-decoration: underline;
    font-weight: 500;
    margin-left: 0.25rem;
}

.privacy-link:hover {
    color: #1d4ed8;
}

.error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    font-weight: 500;
}

.form-input::placeholder {
    color: #94a3b8;
}

/* Base button styles - only for buttons without specific classes */
.btn:not(.btn-primary):not(.btn-secondary):not(.btn-text) {
    background: linear-gradient(135deg, #2563EB, #1d4ed8);
    color: white;
    border: none;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: 'Raleway', sans-serif;
    cursor: pointer;
    transition: all 0.25s ease;
    min-width: 140px;
}

.btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #1d4ed8, #2563EB);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.btn-secondary {
    background: rgba(255, 255, 255, 0.8);
    color: #475569;
    border: 1px solid #cbd5e1;
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
    padding: 0.875rem 1.25rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    backdrop-filter: blur(8px);
}

.btn-secondary:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.95);
    color: #334155;
    border-color: #94a3b8;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.btn-primary {
    background: linear-gradient(135deg, #2563EB, #1d4ed8);
    color: white;
    border: none;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: 'Raleway', sans-serif;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.btn-primary:hover:not(:disabled) {
    background: linear-gradient(135deg, #1d4ed8, #2563EB);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);
}

.btn-primary:disabled, .btn-secondary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

/* Store Selection Buttons */
.store-selection-buttons {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    margin-top: 2rem;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
}

.btn-text {
    background: transparent;
    color: #64748b;
    border: none;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 500;
    font-family: 'Raleway', sans-serif;
    cursor: pointer;
    transition: all 0.25s ease;
    text-decoration: underline;
    text-underline-offset: 4px;
}

.btn-text:hover:not(:disabled) {
    color: #0f172a;
    text-decoration: none;
    background: #f8fafc;
}

.btn-text:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Important overrides to ensure button styling works correctly */
.button-group .btn-secondary {
    background: transparent !important;
    color: #64748b !important;
    border: 2px solid #e2e8f0 !important;
    font-family: 'Raleway', sans-serif !important;
    font-weight: 500 !important;
    padding: 1rem 1.5rem !important;
    border-radius: 12px !important;
    font-size: 0.95rem !important;
}

.button-group .btn-secondary:hover:not(:disabled) {
    background: #f8fafc !important;
    color: #0f172a !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.button-group .btn-primary {
    background: linear-gradient(135deg, #2563EB, #1d4ed8) !important;
    color: white !important;
    border: none !important;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.button-group .btn-primary:hover:not(:disabled) {
    background: linear-gradient(135deg, #1d4ed8, #2563EB) !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);
}

.button-group .btn-text {
    background: transparent !important;
    color: #64748b !important;
    border: none !important;
    text-decoration: underline;
    text-underline-offset: 4px;
}

.button-group .btn-text:hover:not(:disabled) {
    color: #0f172a !important;
    text-decoration: none;
    background: #f8fafc !important;
}

.add-item-container {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}

.add-item-container .form-input {
    flex: 1;
}

.add-item-container .btn {
    white-space: nowrap;
    padding: 1rem 1.25rem;
    min-width: auto;
}

.item-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    min-height: 40px;
    align-items: flex-start;
}

.item-tag {
    background: linear-gradient(135deg, #eff6ff, #dbeafe);
    border: 1px solid #bfdbfe;
    color: #1e40af;
    padding: 0.5rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s ease;
}

.item-tag:hover {
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
}

.item-remove {
    cursor: pointer;
    color: #64748b;
    font-weight: bold;
    transition: color 0.2s ease;
}

.item-remove:hover {
    color: #ef4444;
}

.empty-state {
    color: #94a3b8;
    font-style: italic;
    padding: 1rem;
    background: #f8fafc;
    border: 2px dashed #e2e8f0;
    border-radius: 12px;
    margin-bottom: 1.5rem;
}

.summary-section {
    background: #f8fafc;
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    text-align: left;
}

.summary-item {
    margin-bottom: 1rem;
}

.summary-item:last-child {
    margin-bottom: 0;
}

.summary-label {
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 0.25rem;
}

.summary-value {
    color: #64748b;
    font-size: 0.9rem;
}

.button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.selection-guidance {
    background: linear-gradient(135deg, #eff6ff, #dbeafe);
    border: 1px solid #bfdbfe;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.guidance-text {
    font-size: 0.875rem;
    color: #1e40af;
    font-weight: 500;
    margin: 0;
}

.selection-counter {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.counter-text {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
}

.counter-number {
    background: #2563EB;
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
    border-radius: 50%;
    min-width: 24px;
    text-align: center;
}

.recommended-stores {
    margin-bottom: 2rem;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.recommended-title {
    font-size: 1rem;
    font-weight: 600;
    color: #0f172a;
    margin: 0;
    text-align: left;
}

.quick-select-btn {
    background: transparent;
    border: 2px solid #e2e8f0;
    color: #64748b;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.25s ease;
}

.quick-select-btn:hover {
    border-color: #2563EB;
    color: #2563EB;
    background: #eff6ff;
}

.store-grid {
    display: grid;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

/* Store Selection Page Styling */
.store-selection-header {
    text-align: center;
    margin-bottom: 2rem;
}

.store-selection-title {
    font-size: 1.75rem;
    font-weight: 700;
    background: linear-gradient(135deg, #2563EB, #EA580C);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    line-height: 1.3;
}

.store-selection-subtitle {
    font-size: 1rem;
    color: #64748b;
    line-height: 1.5;
    max-width: 600px;
    margin: 0 auto;
}

/* Expert Stores Grid */
.expert-stores-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    max-width: 900px;
    margin: 0 auto 2rem auto;
}

@media (min-width: 768px) {
    .expert-stores-grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
}

@media (min-width: 1024px) {
    .expert-stores-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Expert Store Cards */
.expert-store-card {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 16px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    position: relative;
}

.expert-store-card:hover {
    border-color: #2563EB;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
    transform: translateY(-2px);
}

.expert-store-card.selected {
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border-color: #2563EB;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.store-card-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.store-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
}

.store-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
    line-height: 1.3;
    flex: 1;
}

.store-description {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.4;
    margin: 0;
    flex: 1;
}

.store-usp {
    margin-top: auto;
}

.usp-badge {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    display: inline-block;
}

/* Store Checkbox Styling */
.store-checkbox {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

.store-toggle {
    display: none;
}

.checkbox-label {
    width: 24px;
    height: 24px;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    background: white;
    position: relative;
}

.checkbox-label:before {
    content: '';
    width: 12px;
    height: 8px;
    border: 2px solid white;
    border-top: none;
    border-right: none;
    transform: rotate(-45deg) scale(0);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.store-toggle:checked + .checkbox-label {
    background: linear-gradient(135deg, #2563EB, #1d4ed8);
    border-color: #2563EB;
    transform: scale(1.05);
}

.store-toggle:checked + .checkbox-label:before {
    transform: rotate(-45deg) scale(1);
}

.checkbox-label:hover {
    border-color: #2563EB;
    background: #f8fafc;
}

.store-toggle:checked + .checkbox-label:hover {
    background: linear-gradient(135deg, #1d4ed8, #2563EB);
}

/* Custom Store Section */
.custom-store-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
}

.custom-store-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1rem;
    text-align: center;
}

.custom-store-input-group {
    display: flex;
    align-items: center;
    gap: 12px;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 12px 16px;
    transition: all 0.25s ease;
}

.custom-store-input-group:focus-within {
    border-color: #2563EB;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.custom-store-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 0.875rem;
    color: #1e293b;
    background: transparent;
    font-family: 'Raleway', sans-serif;
}

.custom-store-input::placeholder {
    color: #94a3b8;
}

.custom-store-checkbox {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

.url-validation-message {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    padding: 0.5rem;
    border-radius: 8px;
    font-weight: 500;
}

.url-validation-message.success {
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
}

.url-validation-message.error {
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
}

/* Selection Counter */
.selection-status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: 1.5rem 0;
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
}

.selection-count {
    background: linear-gradient(135deg, #2563EB, #1d4ed8);
    color: white;
    padding: 4px 10px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.75rem;
    min-width: 24px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
}

.store-card-minimal {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.store-card-minimal:hover {
    border-color: #2563EB;
    background: #f8fafc;
    transform: translateY(-1px);
}

.store-card-minimal.added {
    border-color: #22c55e;
    background: #f0fdf4;
}

.store-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.store-info-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.store-icon-mini {
    font-size: 0.875rem;
    font-weight: 700;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    color: white;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.store-card-minimal:hover .store-icon-mini {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.store-beauty {
    background: linear-gradient(135deg, #ec4899, #be185d);
}

.store-eyewear {
    background: linear-gradient(135deg, #f59e0b, #d97706);
}

.store-sports {
    background: linear-gradient(135deg, #10b981, #059669);
}

.store-details {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
}

.store-name-mini {
    font-weight: 600;
    color: #0f172a;
    font-size: 0.875rem;
    line-height: 1.2;
}

.store-rating-mini {
    color: #EA580C;
    font-size: 0.75rem;
    font-weight: 500;
}

.add-btn-mini {
    width: 28px;
    height: 28px;
    background: linear-gradient(135deg, #2563EB, #1d4ed8);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.25s ease;
}

.store-card-minimal:hover .add-btn-mini {
    transform: rotate(90deg) scale(1.1);
}

.store-card-minimal.added .add-btn-mini {
    background: #22c55e;
    transform: none;
}

.store-card-minimal.added .add-btn-mini::after {
    content: '✓';
    font-size: 0.875rem;
}

.store-card {
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 1rem;
    padding: 1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    position: relative;
    overflow: hidden;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

.store-card.simplified {
    min-height: 120px;
    cursor: default;
}

.store-card.simplified .store-header {
    flex: 1;
    margin-bottom: 0.75rem;
}

.store-info-compact {
    flex: 1;
}

.store-category {
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 500;
    margin-bottom: 0.25rem;
}

.store-rating {
    font-size: 0.75rem;
    color: #EA580C;
    font-weight: 600;
}

.store-add-btn {
    background: linear-gradient(135deg, #2563EB, #1d4ed8);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
}

.store-add-btn:hover {
    background: linear-gradient(135deg, #1d4ed8, #2563EB);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
}

.store-add-btn:active {
    transform: translateY(0);
}

.add-icon {
    font-size: 1.125rem;
    font-weight: bold;
    transition: transform 0.25s ease;
}

.store-add-btn:hover .add-icon {
    transform: rotate(90deg);
}

.store-card.added .store-add-btn {
    background: #22c55e;
    cursor: default;
}

.store-card.added .store-add-btn:hover {
    background: #22c55e;
    transform: none;
    box-shadow: none;
}

.store-card.added .add-icon {
    transform: none;
}

.store-card.added .add-text::after {
    content: ' ✓';
}

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

.store-card[data-store="beauty"]::before {
    background: 
        radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.08) 0%, transparent 60%),
        radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.06) 0%, transparent 60%);
}

.store-card[data-store="eyewear"]::before {
    background: 
        radial-gradient(circle at 60% 40%, rgba(251, 191, 36, 0.08) 0%, transparent 60%),
        radial-gradient(circle at 40% 60%, rgba(37, 99, 235, 0.06) 0%, transparent 60%);
}

.store-card[data-store="sports"]::before {
    background: 
        radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.08) 0%, transparent 60%),
        radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.06) 0%, transparent 60%);
}

.store-card > * {
    position: relative;
    z-index: 2;
}

.store-card:hover {
    border-color: #2563EB;
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

.ai-badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: linear-gradient(135deg, #2563EB, #EA580C);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    z-index: 5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.store-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
}

.store-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #2563EB, #1d4ed8);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.store-name-container {
    flex: 1;
}

.store-name {
    font-weight: 600;
    color: #0f172a;
    font-size: 1rem;
    margin-bottom: 0.25rem;
    line-height: 1.2;
}

.verified-badge {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #22c55e;
    font-size: 0.75rem;
    font-weight: 500;
}

.verified-badge svg {
    width: 12px;
    height: 12px;
}

.store-proposition {
    color: #64748b;
    font-size: 0.875rem;
    line-height: 1.4;
    margin-bottom: 0.75rem;
}

.store-kpi {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.kpi-label {
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 500;
}

.kpi-value {
    font-size: 0.875rem;
    font-weight: 600;
    color: #EA580C;
}

.store-check {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    width: 24px;
    height: 24px;
    background: #22c55e;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: 600;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.3s ease;
    z-index: 5;
}

.store-card.selected {
    border-color: #2563EB;
    background: rgba(37, 99, 235, 0.08);
    box-shadow: 
        0 0 0 2px rgba(37, 99, 235, 0.2),
        0 8px 25px rgba(37, 99, 235, 0.15);
    transform: translateY(-1px) scale(1.002);
}

.store-card.selected::before {
    opacity: 1;
}

.store-card.selected .store-check {
    opacity: 1;
    transform: scale(1);
}

.custom-store-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
}

.section-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 1rem;
    text-align: left;
}

.confirmation-container {
    text-align: center;
    padding: 2rem 1rem;
    max-width: 500px;
    margin: 0 auto;
    animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.success-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: bounce 0.6s ease-out 0.3s both;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
}

.confirmation-headline {
    font-size: 2rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.75rem;
    line-height: 1.2;
    letter-spacing: -0.025em;
}

.confirmation-subheader {
    font-size: 1rem;
    color: #64748b;
    margin-bottom: 2rem;
    line-height: 1.5;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
}

.success-subtitle {
    font-size: 1rem;
    color: #64748b;
    margin-bottom: 2rem;
    line-height: 1.5;
}

.dashboard-cta {
    background: linear-gradient(135deg, #eff6ff, #dbeafe);
    border: 2px solid #bfdbfe;
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2rem;
}

.cta-header {
    margin-bottom: 1.5rem;
}

.cta-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 0.5rem;
}

.cta-description {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.5;
    margin: 0;
}

.confirmation-cta-btn {
    background: linear-gradient(135deg, #2563EB, #1d4ed8);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 1rem 2.5rem;
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
    margin-bottom: 2rem;
    letter-spacing: 0.025em;
    display: inline-block;
}

.confirmation-cta-btn:hover {
    background: linear-gradient(135deg, #1d4ed8, #2563EB);
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(37, 99, 235, 0.3);
}

.confirmation-cta-btn:active {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
}

.btn-icon {
    font-size: 1.5rem;
}

.btn-arrow {
    font-size: 1.25rem;
    transition: transform 0.3s ease;
}

.dashboard-btn:hover .btn-arrow {
    transform: translateX(4px);
}

.confirmation-features {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 350px;
    margin: 0 auto;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
}

.feature-icon {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2563EB;
    box-shadow: 0 1px 4px rgba(37, 99, 235, 0.1);
}

.feature-text {
    font-size: 0.875rem;
    color: #475569;
    font-weight: 500;
    line-height: 1.3;
}

.steps-title {
    font-size: 1rem;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 1rem;
    text-align: center;
}

.steps-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.step-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
}

.step-icon {
    font-size: 1.25rem;
    width: 32px;
    text-align: center;
}

.step-text {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
}

.message {
    padding: 1rem;
    border-radius: 12px;
    margin-top: 1.5rem;
    display: none;
    border-left: 4px solid;
    font-weight: 500;
}

.success-message {
    background: #f0fdf4;
    border-left-color: #22c55e;
    color: #15803d;
}

.error-message {
    background: #fef2f2;
    border-left-color: #ef4444;
    color: #dc2626;
}

@media (max-width: 640px) {
    .widget-container {
        padding: 1.5rem;
        margin: 1rem;
    }
    
    .step-title {
        font-size: 1.5rem;
        line-height: 1.3;
    }
    
    .progress-step {
        width: 32px;
        height: 32px;
        font-size: 0.75rem;
    }
    
    .add-item-container {
        flex-direction: column;
    }
    
    .button-group {
        flex-direction: column;
    }
    
    .btn {
        width: 100%;
        font-size: 1rem;
        white-space: nowrap;
        padding: 1rem;
    }
    
    /* Improve store cards on mobile */
    .store-card-minimal {
        padding: 1rem;
    }
    
    .store-name-mini {
        font-size: 0.875rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 140px;
    }
    
    /* Section headers */
    .section-header {
        flex-direction: column;
        align-items: stretch;
        gap: 0.75rem;
    }
    
    .quick-select-btn {
        width: 100%;
        justify-content: center;
    }
    
    /* Form inputs - prevent iOS zoom */
    .form-input, .form-textarea {
        font-size: 16px;
    }
    
    /* Confirmation page mobile styling */
    .confirmation-container {
        padding: 1.5rem 1rem;
    }
    
    .confirmation-headline {
        font-size: 1.75rem;
        margin-bottom: 0.5rem;
    }
    
    .confirmation-subheader {
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
    }
    
    .confirmation-cta-btn {
        padding: 0.875rem 2rem;
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
    }
    
    .confirmation-features {
        max-width: 100%;
        gap: 0.75rem;
    }
    
    .feature-item {
        padding: 0.375rem 0;
    }
}

/* Tablet specific improvements */
@media (min-width: 641px) and (max-width: 1023px) {
    .widget-container {
        margin: 1.5rem;
        padding: 2rem;
    }
    
    .store-grid-minimal {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .btn {
        max-width: 300px;
    }
}

/* Desktop improvements */
@media (min-width: 1024px) {
    .widget-container {
        max-width: 700px;
    }
}
</style>

<div class="widget-container" id="${widgetId}">
    <!-- Progress Bar -->
    <div class="progress-bar">
        <div class="progress-line">
            <div class="progress-line-fill" id="progressFill" style="width: 25%"></div>
        </div>
        <div class="progress-step active" id="step1Progress">1</div>
        <div class="progress-step inactive" id="step2Progress">2</div>
        <div class="progress-step inactive" id="step3Progress">3</div>
        <div class="progress-step inactive" id="step4Progress">4</div>
    </div>

    <!-- Step 1: Email -->
    <div class="step-content active" id="step1">
        <h2 class="step-title">${t.step1Title}</h2>
        <p class="step-subtitle">${t.step1Subtitle}</p>
        
        <div class="form-group">
            <label class="form-label" for="emailInput">${t.emailLabel}</label>
            <input 
                type="email" 
                class="form-input" 
                id="emailInput" 
                placeholder="${t.emailPlaceholder}"
                required
            >
        </div>
        
        <div class="form-group">
            <div class="gdpr-consent">
                <label class="checkbox-label">
                    <input type="checkbox" class="gdpr-checkbox" id="gdprConsent" required>
                    <span class="checkmark"></span>
                    <span class="consent-text">
                        ${t.gdprConsent}
                        <a href="/privacy" target="_blank" class="privacy-link">${t.privacyPolicy}</a>
                    </span>
                </label>
                <div class="error-message" id="consentError" style="display: none;">${t.consentRequired}</div>
            </div>
        </div>
        
        <div class="button-group">
            <button type="button" class="btn" id="step1Next">${t.nextButton}</button>
        </div>
    </div>

    <!-- Step 2: Store Selection -->
    <div class="step-content" id="step2">
        <div class="store-selection-header">
            <h2 class="store-selection-title">${lang === 'nl' ? 'Selecteer DHgate winkels' : 'Select DHgate stores'}</h2>
            <p class="store-selection-subtitle">${lang === 'nl' ? 'Kies uit 3 aanbevolen winkels waarvan je prijsupdates wilt ontvangen.' : 'Choose from 3 recommended stores to receive price updates from.'}</p>
        </div>
        
        <!-- Expert Recommended Stores -->
        <div class="expert-stores-grid">
            <div class="expert-store-card" data-store-id="beauty">
                <div class="store-card-content">
                    <div class="store-header">
                        <h3 class="store-name">DHgate Beauty Misssecret</h3>
                        <div class="store-checkbox">
                            <input type="checkbox" id="store-beauty" class="store-toggle" data-store-name="DHgate Beauty Misssecret">
                            <label for="store-beauty" class="checkbox-label"></label>
                        </div>
                    </div>
                    <p class="store-description">${lang === 'nl' ? 'Premium beauty producten en cosmetica met internationale verzending.' : 'Premium beauty products and cosmetics with international shipping.'}</p>
                    <div class="store-usp">
                        <span class="usp-badge">${lang === 'nl' ? '4.8★ Hoge klantbeoordeling' : '4.8★ High customer rating'}</span>
                    </div>
                </div>
            </div>
            
            <div class="expert-store-card" data-store-id="eyewear">
                <div class="store-card-content">
                    <div class="store-header">
                        <h3 class="store-name">Luxury Eyewear LTD</h3>
                        <div class="store-checkbox">
                            <input type="checkbox" id="store-eyewear" class="store-toggle" data-store-name="Luxury Eyewear LTD">
                            <label for="store-eyewear" class="checkbox-label"></label>
                        </div>
                    </div>
                    <p class="store-description">${lang === 'nl' ? 'Designer brillen en zonnebrillen tegen groothandelsprijzen.' : 'Designer glasses and sunglasses at wholesale prices.'}</p>
                    <div class="store-usp">
                        <span class="usp-badge">${lang === 'nl' ? 'Snelle levertijd 7-14 dagen' : 'Fast delivery 7-14 days'}</span>
                    </div>
                </div>
            </div>
            
            <div class="expert-store-card" data-store-id="sports">
                <div class="store-card-content">
                    <div class="store-header">
                        <h3 class="store-name">Spider Jerseys</h3>
                        <div class="store-checkbox">
                            <input type="checkbox" id="store-sports" class="store-toggle" data-store-name="Spider Jerseys">
                            <label for="store-sports" class="checkbox-label"></label>
                        </div>
                    </div>
                    <p class="store-description">${lang === 'nl' ? 'Authentieke sportkleding en team jerseys van topkwaliteit.' : 'Authentic sportswear and team jerseys of top quality.'}</p>
                    <div class="store-usp">
                        <span class="usp-badge">${lang === 'nl' ? 'Topcategorie Sports' : 'Top category Sports'}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Custom Store Section -->
        <div class="custom-store-section">
            <h3 class="custom-store-title">${lang === 'nl' ? 'Eigen winkel toevoegen' : 'Add your own store'}</h3>
            <div class="custom-store-input-group">
                <input 
                    type="url" 
                    class="custom-store-input" 
                    id="customStoreInput" 
                    placeholder="${lang === 'nl' ? 'https://www.dhgate.com/store/...' : 'https://www.dhgate.com/store/...'}"
                >
                <div class="custom-store-checkbox">
                    <input type="checkbox" id="custom-store-toggle" class="store-toggle" disabled>
                    <label for="custom-store-toggle" class="checkbox-label"></label>
                </div>
            </div>
            <div class="url-validation-message" id="urlValidationMessage" style="display: none;"></div>
        </div>
        
        <!-- Selection Counter -->
        <div class="selection-status">
            <span class="selection-count" id="selectionCount">0</span>
            <span class="selection-text" id="selectionText">${lang === 'nl' ? 'winkels geselecteerd' : 'stores selected'}</span>
        </div>
        
        <!-- Navigation -->
        <div class="store-selection-buttons">
            <button type="button" class="btn-secondary" id="step2Back">${t.backButton}</button>
            <button type="button" class="btn-primary" id="step2Next" disabled>${lang === 'nl' ? 'Bevestigen en doorgaan' : 'Confirm and continue'}</button>
        </div>
    </div>

    <!-- Step 3: Keywords -->
    <div class="step-content" id="step3">
        <h2 class="step-title">${t.step3Title}</h2>
        <p class="step-subtitle">${t.step3Subtitle}</p>
        
        <div class="add-item-container">
            <input 
                type="text" 
                class="form-input" 
                id="keywordInput" 
                placeholder="${t.keywordPlaceholder}"
            >
            <button type="button" class="btn-secondary" id="addKeyword">${t.addKeywordButton}</button>
        </div>
        
        <div class="item-list" id="keywordList">
            <div class="empty-state">${t.noKeywordsText}</div>
        </div>
        
        <div class="button-group">
            <button type="button" class="btn-secondary" id="step3Back">${t.backButton}</button>
            <button type="button" class="btn-primary" id="step3Next">${t.nextButton}</button>
            <button type="button" class="btn-text" id="step3Skip">${t.skipStep}</button>
        </div>
    </div>

    <!-- Step 4: Summary & Dashboard -->
    <div class="step-content" id="step4">
        
        <div class="summary-section">
            <div class="summary-item">
                <div class="summary-label">${t.emailText}</div>
                <div class="summary-value" id="summaryEmail"></div>
            </div>
            <div class="summary-item">
                <div class="summary-label">${t.storesText}</div>
                <div class="summary-value" id="summaryStores"></div>
            </div>
            <div class="summary-item">
                <div class="summary-label">${t.keywordsText}</div>
                <div class="summary-value" id="summaryKeywords"></div>
            </div>
        </div>
        
        <!-- Success State (Hidden initially) -->
        <div class="confirmation-container" id="successContainer" style="display: none;">
            <h1 class="confirmation-headline">${lang === 'nl' ? 'Monitoring gestart!' : 'Monitoring started!'}</h1>
            <p class="confirmation-subheader">${lang === 'nl' ? 'Je account is succesvol geactiveerd. Ga direct naar je dashboard om te starten.' : 'Your account has been successfully activated. Go directly to your dashboard to start.'}</p>
            
            <button class="confirmation-cta-btn" id="dashboardBtn">
                ${lang === 'nl' ? 'Open Dashboard' : 'Open Dashboard'}
            </button>
            
            <div class="confirmation-features">
                <div class="feature-item">
                    <div class="feature-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                        </svg>
                    </div>
                    <span class="feature-text">${lang === 'nl' ? 'Real-time alerts' : 'Real-time alerts'}</span>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                            <path d="m9 12 2 2 4-4"/>
                        </svg>
                    </div>
                    <span class="feature-text">${lang === 'nl' ? 'Trending producten' : 'Trending products'}</span>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16.5 9.4 7.55 4.24"/>
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                            <path d="M3.29 7 12 12l8.71-5"/>
                            <path d="M12 22V12"/>
                        </svg>
                    </div>
                    <span class="feature-text">${lang === 'nl' ? 'Monitor favoriete winkels' : 'Monitor favorite stores'}</span>
                </div>
            </div>
        </div>
        
        <div class="button-group" id="step4Buttons">
            <button type="button" class="btn-secondary btn" id="step4Back">${t.backButton}</button>
            <button type="button" class="btn" id="finishButton">${t.finishButton}</button>
        </div>
    </div>
    
    <div class="success-message message" id="successMessage"></div>
    <div class="error-message message" id="errorMessage"></div>
</div>

<script>
(function() {
    let currentStep = 1;
    const totalSteps = 4;
    const data = {
        email: '',
        stores: [],
        keywords: []
    };

    // Progress management
    function updateProgress() {
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = (currentStep / totalSteps * 100) + '%';
        
        for (let i = 1; i <= totalSteps; i++) {
            const stepEl = document.getElementById(\`step\${i}Progress\`);
            if (i < currentStep) {
                stepEl.className = 'progress-step completed';
            } else if (i === currentStep) {
                stepEl.className = 'progress-step active';
            } else {
                stepEl.className = 'progress-step inactive';
            }
        }
    }

    function showStep(step) {
        console.log('showStep called with step:', step);
        
        // Validate step parameter
        if (!step || step < 1 || step > totalSteps) {
            console.error('Invalid step:', step);
            return;
        }
        
        // Hide all steps
        for (let i = 1; i <= totalSteps; i++) {
            const stepElement = document.getElementById(\`step\${i}\`);
            if (stepElement) {
                stepElement.classList.remove('active');
            }
        }
        
        // Show current step
        const targetStepElement = document.getElementById(\`step\${step}\`);
        if (targetStepElement) {
            targetStepElement.classList.add('active');
            currentStep = step;
            updateProgress();
        } else {
            console.error('Step element not found:', \`step\${step}\`);
            return;
        }
        
        // Initialize step-specific functionality
        if (step === 2) {
            console.log('Showing step 2, initializing store selection...');
            setTimeout(() => initializeStoreSelection(), 100);
        } else if (step === 3) {
            console.log('Showing step 3, initializing keyword handlers...');
            setTimeout(() => initializeStep3(), 100);
        } else if (step === 4) {
            console.log('Showing step 4, initializing summary handlers...');
            setTimeout(() => initializeStep4(), 100);
        }
    }

    function addItem(type, value) {
        if (!value.trim()) return;
        
        if (type === 'store') {
            if (!data.stores.includes(value)) {
                data.stores.push(value);
                renderStores();
            }
        } else if (type === 'keyword') {
            if (!data.keywords.includes(value)) {
                data.keywords.push(value);
                renderKeywords();
            }
        }
    }

    function removeItem(type, value) {
        if (type === 'store') {
            data.stores = data.stores.filter(s => s !== value);
            renderStores();
        } else if (type === 'keyword') {
            data.keywords = data.keywords.filter(k => k !== value);
            renderKeywords();
        }
    }

    function renderStores() {
        const container = document.getElementById('storeList');
        if (data.stores.length === 0) {
            container.innerHTML = '<div class="empty-state">${t.noStoresText}</div>';
        } else {
            container.innerHTML = data.stores.map(store => 
                \`<div class="item-tag">
                    \${store}
                    <span class="item-remove" onclick="removeItem('store', '\${store}')">×</span>
                </div>\`
            ).join('');
        }
    }

    function renderKeywords() {
        const container = document.getElementById('keywordList');
        if (data.keywords.length === 0) {
            container.innerHTML = '<div class="empty-state">${t.noKeywordsText}</div>';
        } else {
            container.innerHTML = data.keywords.map(keyword => 
                \`<div class="item-tag">
                    \${keyword}
                    <span class="item-remove" onclick="removeItem('keyword', '\${keyword}')">×</span>
                </div>\`
            ).join('');
        }
    }

    function updateSummary() {
        console.log('Updating summary with data:', data);
        
        document.getElementById('summaryEmail').textContent = data.email;
        
        // Handle selected stores
        if (data.selectedStores && data.selectedStores.length > 0) {
            const storeNames = data.selectedStores.map(store => store.name);
            document.getElementById('summaryStores').textContent = storeNames.join(', ');
        } else {
            document.getElementById('summaryStores').textContent = '${lang === 'nl' ? 'Geen winkels geselecteerd' : 'No stores selected'}';
        }
        
        // Handle keywords
        if (data.keywords && data.keywords.length > 0) {
            document.getElementById('summaryKeywords').textContent = data.keywords.join(', ');
        } else {
            document.getElementById('summaryKeywords').textContent = '${lang === 'nl' ? 'Geen zoekwoorden toegevoegd' : 'No keywords added'}';
        }
    }

    // Step 1 handlers
    document.getElementById('step1Next').addEventListener('click', function() {
        const email = document.getElementById('emailInput').value.trim();
        const gdprConsent = document.getElementById('gdprConsent').checked;
        
        // Validate email
        if (!email || !email.includes('@')) {
            showError('${lang === 'nl' ? 'Voer een geldig e-mailadres in' : 'Please enter a valid email address'}');
            return;
        }
        
        // Validate GDPR consent
        if (!gdprConsent) {
            document.getElementById('consentError').style.display = 'block';
            showError('${lang === 'nl' ? 'Toestemming is verplicht om door te gaan' : 'Consent is required to continue'}');
            return;
        }
        
        // Hide consent error if shown
        document.getElementById('consentError').style.display = 'none';
        
        data.email = email;
        data.gdprConsent = true;
        showStep(2);
    });

    // Step 2 handlers
    document.getElementById('addStore').addEventListener('click', function() {
        const input = document.getElementById('storeInput');
        addItem('store', input.value);
        input.value = '';
    });

    document.getElementById('storeInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('addStore').click();
        }
    });

    // Store selection handlers
    function initializeStoreSelection() {
        console.log('Initializing store selection...');
        
        // Prevent double initialization
        if (window.storeSelectionInitialized) {
            console.log('Store selection already initialized, skipping...');
            return;
        }
        window.storeSelectionInitialized = true;
        
        // Handle expert store checkboxes
        const storeToggles = document.querySelectorAll('.store-toggle');
        console.log('Found store toggles:', storeToggles.length);
        
        storeToggles.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                console.log('Store toggle changed:', this.checked);
                updateStoreSelection();
                updateSelectionCounter();
            });
        });
        
        // Handle expert store cards click
        document.querySelectorAll('.expert-store-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.type === 'checkbox') return; // Don't double-toggle
                const checkbox = this.querySelector('.store-toggle');
                if (checkbox && !checkbox.disabled) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            });
        });
        
        // Handle custom store input
        const customStoreInput = document.getElementById('customStoreInput');
        const customStoreCheckbox = document.getElementById('custom-store-toggle');
        const validationMessage = document.getElementById('urlValidationMessage');
        
        if (customStoreInput) {
            customStoreInput.addEventListener('input', function() {
                const url = this.value.trim();
                const isValidDHgateUrl = validateDHgateUrl(url);
                
                if (url === '') {
                    // Empty input - hide validation, disable checkbox
                    validationMessage.style.display = 'none';
                    customStoreCheckbox.disabled = true;
                    customStoreCheckbox.checked = false;
                } else if (isValidDHgateUrl) {
                    // Valid URL
                    validationMessage.className = 'url-validation-message success';
                    validationMessage.textContent = '${lang === 'nl' ? '✓ Geldige DHgate winkel URL' : '✓ Valid DHgate store URL'}';
                    validationMessage.style.display = 'block';
                    customStoreCheckbox.disabled = false;
                } else {
                    // Invalid URL
                    validationMessage.className = 'url-validation-message error';
                    validationMessage.textContent = '${lang === 'nl' ? '⚠ Voer een geldige DHgate winkel URL in' : '⚠ Please enter a valid DHgate store URL'}';
                    validationMessage.style.display = 'block';
                    customStoreCheckbox.disabled = true;
                    customStoreCheckbox.checked = false;
                }
                
                updateSelectionCounter();
            });
        }
        
        updateSelectionCounter();
        
        // Add navigation button event listeners here where elements exist
        const step2Back = document.getElementById('step2Back');
        const step2Next = document.getElementById('step2Next');
        const step2Skip = document.getElementById('step2Skip');
        
        if (step2Back) {
            step2Back.addEventListener('click', () => showStep(1));
        }
        
        if (step2Next) {
            step2Next.addEventListener('click', function() {
                console.log('Step 2 Next button clicked');
                const selectedStores = getSelectedStores();
                console.log('Selected stores:', selectedStores);
                
                if (selectedStores.length === 0) {
                    console.log('No stores selected, showing error');
                    showError('${lang === 'nl' ? 'Selecteer minimaal één winkel om door te gaan' : 'Please select at least one store to continue'}');
                    return;
                }
                
                data.selectedStores = selectedStores;
                hideMessages();
                showStep(3);
                console.log('Moving to step 3');
            });
        }
        
        if (step2Skip) {
            step2Skip.addEventListener('click', function() {
                data.selectedStores = [];
                showStep(3);
            });
        }
    }
    
    function validateDHgateUrl(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname === 'www.dhgate.com' && 
                   (urlObj.pathname.includes('/store/') || urlObj.pathname.includes('/wholesale/'));
        } catch {
            return false;
        }
    }
    
    function updateStoreSelection() {
        // Update visual state of expert store cards
        document.querySelectorAll('.expert-store-card').forEach(card => {
            const checkbox = card.querySelector('.store-toggle');
            if (checkbox.checked) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
    }
    
    function updateSelectionCounter() {
        const checkedStores = document.querySelectorAll('.store-toggle:checked:not(:disabled)');
        const selectionCount = document.getElementById('selectionCount');
        const selectionText = document.getElementById('selectionText');
        const selectionStatus = document.querySelector('.selection-status');
        
        const count = checkedStores.length;
        
        if (selectionCount) {
            selectionCount.textContent = count;
        }
        
        // Update text based on selection count
        if (selectionText) {
            if (count === 0) {
                selectionText.textContent = '${lang === 'nl' ? 'Geen winkels geselecteerd' : 'No stores selected'}';
                selectionText.style.color = '#ef4444';
            } else if (count === 1) {
                selectionText.textContent = '${lang === 'nl' ? 'winkel geselecteerd' : 'store selected'}';
                selectionText.style.color = '#64748b';
            } else {
                selectionText.textContent = '${lang === 'nl' ? 'winkels geselecteerd' : 'stores selected'}';
                selectionText.style.color = '#64748b';
            }
        }
        
        // Update button states
        const step2Next = document.getElementById('step2Next');
        if (step2Next) {
            step2Next.disabled = count === 0;
            if (count === 0) {
                step2Next.style.opacity = '0.5';
                step2Next.style.cursor = 'not-allowed';
            } else {
                step2Next.style.opacity = '1';
                step2Next.style.cursor = 'pointer';
            }
        }
    }
    
    function getSelectedStores() {
        const selectedStores = [];
        
        // Get expert stores
        document.querySelectorAll('.expert-store-card .store-toggle:checked').forEach(checkbox => {
            const storeName = checkbox.dataset.storeName;
            const card = checkbox.closest('.expert-store-card');
            const storeId = card.dataset.storeId;
            selectedStores.push({ id: storeId, name: storeName, type: 'expert' });
        });
        
        // Get custom store
        const customStoreCheckbox = document.getElementById('custom-store-toggle');
        const customStoreInput = document.getElementById('customStoreInput');
        if (customStoreCheckbox && customStoreCheckbox.checked && customStoreInput) {
            selectedStores.push({ 
                id: 'custom', 
                name: 'Custom Store', 
                url: customStoreInput.value.trim(),
                type: 'custom' 
            });
        }
        
        return selectedStores;
    }
    



    // Initialize Step 3 functionality
    function initializeStep3() {
        console.log('Initializing step 3 handlers...');
        
        // Prevent double initialization
        if (window.step3Initialized) {
            console.log('Step 3 already initialized, skipping...');
            return;
        }
        window.step3Initialized = true;
        
        // Step 3 button handlers with null checks
        const step3Back = document.getElementById('step3Back');
        const step3Next = document.getElementById('step3Next');
        const step3Skip = document.getElementById('step3Skip');
        
        console.log('Found step 3 buttons:', {
            back: !!step3Back,
            next: !!step3Next,
            skip: !!step3Skip
        });
        
        if (step3Back) {
            step3Back.addEventListener('click', () => {
                console.log('Step 3 Back clicked');
                showStep(2);
            });
        }
        
        if (step3Next) {
            step3Next.addEventListener('click', function() {
                console.log('Step 3 Next clicked');
                updateSummary();
                showStep(4);
            });
        }
        
        if (step3Skip) {
            step3Skip.addEventListener('click', function() {
                console.log('Step 3 Skip clicked');
                updateSummary();
                showStep(4);
            });
        }
        
        // Add keyword functionality
        const addKeywordBtn = document.getElementById('addKeyword');
        const keywordInput = document.getElementById('keywordInput');
        
        console.log('Found keyword elements:', {
            addKeywordBtn: !!addKeywordBtn,
            keywordInput: !!keywordInput
        });
        
        if (addKeywordBtn) {
            addKeywordBtn.addEventListener('click', function() {
                console.log('Add keyword clicked');
                const input = document.getElementById('keywordInput');
                if (input && input.value.trim()) {
                    addItem('keyword', input.value.trim());
                    input.value = '';
                } else {
                    console.log('No keyword text entered');
                }
            });
        }
        
        if (keywordInput) {
            keywordInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    console.log('Enter pressed in keyword input');
                    const addBtn = document.getElementById('addKeyword');
                    if (addBtn) {
                        addBtn.click();
                    }
                }
            });
        }
    }

    // Initialize Step 4 functionality
    function initializeStep4() {
        console.log('Initializing step 4 handlers...');
        
        // Prevent double initialization
        if (window.step4Initialized) {
            console.log('Step 4 already initialized, skipping...');
            return;
        }
        window.step4Initialized = true;
        
        // Step 4 button handlers with null checks
        const step4Back = document.getElementById('step4Back');
        const finishButton = document.getElementById('finishButton');
        
        console.log('Found step 4 buttons:', {
            back: !!step4Back,
            finish: !!finishButton
        });
        
        if (step4Back) {
            step4Back.addEventListener('click', () => {
                console.log('Step 4 Back clicked');
                showStep(3);
            });
        }
        
        if (finishButton) {
            finishButton.addEventListener('click', async function() {
        const button = this;
        const originalText = button.textContent;
        
        button.disabled = true;
        button.textContent = '${t.processing}';
        hideMessages();
        
        try {
            console.log('Submitting data:', data);
            
            const response = await fetch('/api/widget-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    stores: data.selectedStores || [],
                    tags: data.keywords || [],
                    lang: '${lang}'
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                const dashboardUrl = window.location.origin + '/dashboard?token=' + (result.dashboardToken || result.token || 'demo');
                
                // Hide summary and buttons, show success container
                document.querySelector('.summary-section').style.display = 'none';
                document.getElementById('step4Buttons').style.display = 'none';
                document.getElementById('successContainer').style.display = 'block';
                
                // Set up dashboard button
                const dashboardBtn = document.getElementById('dashboardBtn');
                dashboardBtn.addEventListener('click', function() {
                    window.open(dashboardUrl, '_blank');
                });
                
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            showError('${lang === 'nl' ? 'Er ging iets mis. Probeer het opnieuw.' : 'Something went wrong. Please try again.'}');
        } finally {
            button.disabled = false;
            button.textContent = originalText;
        }
            });
        }
    }

    function showError(message) {
        const errorEl = document.getElementById('errorMessage');
        errorEl.innerHTML = message;
        errorEl.style.display = 'block';
        document.getElementById('successMessage').style.display = 'none';
    }

    function showSuccess(message) {
        const successEl = document.getElementById('successMessage');
        successEl.innerHTML = message;
        successEl.style.display = 'block';
        document.getElementById('errorMessage').style.display = 'none';
    }

    function hideMessages() {
        document.getElementById('successMessage').style.display = 'none';
        document.getElementById('errorMessage').style.display = 'none';
    }

    // Function to update store counter
    function updateStoreCounter() {
        const counter = document.getElementById('storeCounter');
        if (counter) {
            counter.textContent = data.stores.length;
            
            // Update counter styling based on count
            counter.className = 'counter-number';
            if (data.stores.length >= 3) {
                counter.style.background = '#22c55e';
            } else if (data.stores.length >= 1) {
                counter.style.background = '#2563EB';
            } else {
                counter.style.background = '#94a3b8';
            }
        }
    }

    // Function to add recommended stores
    function addRecommendedStore(storeName) {
        if (!data.stores.includes(storeName)) {
            data.stores.push(storeName);
            renderStores();
            updateStoreCounter();
            
            // Add visual feedback to the card
            const storeCards = document.querySelectorAll('.store-card, .store-card-minimal');
            storeCards.forEach(card => {
                const cardName = card.getAttribute('data-store-name');
                if (cardName === storeName) {
                    card.classList.add('added');
                    
                    // For minimal cards, update the add button
                    const addBtnMini = card.querySelector('.add-btn-mini');
                    if (addBtnMini) {
                        addBtnMini.textContent = '';
                    }
                    
                    // For regular cards, update the text
                    const addText = card.querySelector('.add-text');
                    if (addText) {
                        addText.textContent = '${lang === 'nl' ? 'Toegevoegd' : 'Added'}';
                    }
                }
            });
        }
    }

    // Function to select all recommended stores
    function selectAllStores() {
        const allStores = ['Dhgate Beauty Misssecret', 'Luxury Eyewear LTD', 'Spider Jerseys'];
        allStores.forEach(storeName => {
            addRecommendedStore(storeName);
        });
    }

    // Add event listener for "Select all" button
    document.getElementById('selectAllStores').addEventListener('click', selectAllStores);
    
    // Update renderStores to also update counter
    const originalRenderStores = renderStores;
    renderStores = function() {
        originalRenderStores();
        updateStoreCounter();
    };

    // Make functions globally available
    window.removeItem = removeItem;
    window.addRecommendedStore = addRecommendedStore;
    window.selectAllStores = selectAllStores;
    
    // Initialize
    updateProgress();
    renderStores();
    renderKeywords();
})();
</script>
  `;
}

// Keep the simplified version available for embedding
export function generateSimplifiedSignupWidget(env = null, lang = null, theme = 'light') {
  const widgetId = 'simplified-signup-widget-' + Date.now();
  
  if (!lang) {
    lang = 'nl';
  }

  const t = lang === 'nl' ? {
    title: 'Start gratis met DHgate monitoring',
    subtitle: 'Ontvang alerts voor trending producten en prijswijzigingen van jouw favoriete DHgate winkels',
    emailPlaceholder: 'Jouw e-mailadres',
    submitButton: 'Start monitoring',
    processing: 'Bezig...'
  } : {
    title: 'Start free DHgate monitoring',
    subtitle: 'Get alerts for trending products and price changes from your favorite DHgate stores',
    emailPlaceholder: 'Your email address',
    submitButton: 'Start monitoring',
    processing: 'Processing...'
  };

  return `
<style>
.widget-container {
    font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 600px;
    width: 100%;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 16px;
    padding: 3rem;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.widget-container h1 {
    font-size: 2.25rem;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 1rem;
    line-height: 1.2;
}

.widget-container .subtitle {
    font-size: 1.125rem;
    color: #64748b;
    margin-bottom: 2.5rem;
    line-height: 1.5;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
}

.widget-container .form-group {
    margin-bottom: 2rem;
    text-align: left;
}

.widget-container .form-label {
    display: block;
    font-size: 0.875rem;
    color: #0f172a;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.widget-container .form-input {
    width: 100%;
    padding: 1.25rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    font-family: 'Raleway', sans-serif;
    background: white;
    color: #0f172a;
    transition: all 0.25s ease;
}

.widget-container .form-input:focus {
    outline: none;
    border-color: #2563EB;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
    transform: translateY(-1px);
}

.widget-container .form-input::placeholder {
    color: #94a3b8;
}

.widget-container .btn {
    background: linear-gradient(135deg, #2563EB, #1d4ed8);
    color: white;
    border: none;
    padding: 1.25rem 2rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    font-family: 'Raleway', sans-serif;
    cursor: pointer;
    transition: all 0.25s ease;
    min-width: 180px;
}

.widget-container .btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #1d4ed8, #2563EB);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
}

.widget-container .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.widget-container .message {
    padding: 1rem;
    border-radius: 12px;
    margin-top: 1.5rem;
    display: none;
    border-left: 4px solid;
    font-weight: 500;
}

.widget-container .success-message {
    background: #f0fdf4;
    border-left-color: #22c55e;
    color: #15803d;
}

.widget-container .error-message {
    background: #fef2f2;
    border-left-color: #ef4444;
    color: #dc2626;
}

@media (max-width: 640px) {
    .widget-container {
        padding: 2rem;
    }
    
    .widget-container h1 {
        font-size: 1.875rem;
    }
}
</style>

<div class="widget-container" id="${widgetId}">
    <h1>${t.title}</h1>
    <p class="subtitle">${t.subtitle}</p>
    
    <form id="signupForm">
        <div class="form-group">
            <label class="form-label" for="emailInput">${t.emailPlaceholder}</label>
            <input 
                type="email" 
                class="form-input" 
                id="emailInput" 
                placeholder="${t.emailPlaceholder}"
                required
            >
        </div>
        
        <button type="submit" class="btn" id="submitButton">
            ${t.submitButton}
        </button>
    </form>
    
    <div class="success-message message" id="successMessage"></div>
    <div class="error-message message" id="errorMessage"></div>
</div>

<script>
document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('emailInput');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    const email = emailInput.value.trim();
    
    if (!email || !email.includes('@')) {
        errorMessage.textContent = '${lang === 'nl' ? 'Voer een geldig e-mailadres in' : 'Please enter a valid email address'}';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }
    
    submitButton.disabled = true;
    submitButton.textContent = '${t.processing}';
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
    
    try {
        const response = await fetch('/api/widget-signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                stores: [],
                tags: [],
                lang: '${lang}'
            })
        });
        
        if (response.ok) {
            const result = await response.json();
            const dashboardUrl = window.location.origin + '/dashboard?token=' + (result.dashboardToken || result.token || 'demo');
            
            successMessage.innerHTML = \`
                <strong>${lang === 'nl' ? 'DHgate monitoring gestart!' : 'DHgate monitoring started!'}</strong><br>
                ${lang === 'nl' ? 'Check je e-mail voor bevestiging en gebruik onderstaande link voor direct toegang:' : 'Check your email for confirmation and use the link below for direct access:'}<br><br>
                <a href="\${dashboardUrl}" target="_blank" style="color: #2563EB; text-decoration: underline; font-weight: 600;">
                    ${lang === 'nl' ? '→ Ga naar je Dashboard' : '→ Go to your Dashboard'}
                </a>
            \`;
            successMessage.style.display = 'block';
            emailInput.value = '';
        } else {
            throw new Error('Registration failed');
        }
    } catch (error) {
        errorMessage.textContent = '${lang === 'nl' ? 'Er ging iets mis. Probeer het opnieuw.' : 'Something went wrong. Please try again.'}';
        errorMessage.style.display = 'block';
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = '${t.submitButton}';
    }
});
</script>
  `;
}