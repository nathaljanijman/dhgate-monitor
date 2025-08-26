// Enhanced Store Browser Component for DHgate Monitor
// This component provides a visual store selection interface with recommended stores,
// catalog browsing, and manual URL input functionality.

export function generateEnhancedStoreBrowser(lang = 'nl', theme = 'light') {
  // Function to get store icon based on category
  function getStoreIconByType(logoType) {
    const icons = {
      electronics: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.5"/></svg>',
      fashion: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" stroke-width="1.5"/></svg>',
      sports: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" stroke-width="1.5"/></svg>',
      home: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" stroke-width="1.5"/><polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="1.5"/></svg>',
      beauty: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" stroke-width="1.5"/></svg>',
      gadget: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" stroke-width="1.5"/></svg>'
    };
    return icons[logoType] || icons.electronics;
  }

  const t = lang === 'nl' ? {
    title: 'Ontdek Geweldige Winkels',
    subtitle: 'Word gevonden door duizenden kopers wereldwijd',
    description: 'Bekijk onze featured stores, ontdek nieuwe winkels, of voeg je eigen winkel toe.',
    recommended: 'Featured',
    catalog: 'Ontdekken',
    manual: 'Toevoegen',
    featuredStores: '🏆 Featured Stores - Word Gevonden!',
    discoverStores: '🔍 Ontdek Geweldige Winkels',
    addYourStore: '💡 Wil je hier je winkel tonen?',
    joinStores: 'Sluit je aan bij 500+ winkels die dagelijks worden ontdekt!',
    addStore: 'Winkel Toevoegen',
    learnMore: 'Meer Info',
    searchCatalog: 'Zoek winkels...',
    allCategories: 'Alle categorieën',
    allRatings: 'Alle ratings',
    sortBy: 'Sorteren op',
    popular: 'Populair',
    newest: 'Nieuwste',
    rating: 'Rating',
    products: 'Producten',
    storeUrl: 'DHgate Store URL',
    storeUrlPlaceholder: 'https://www.dhgate.com/store/example-store',
    storeUrlHelp: 'Plak de volledige URL van je DHgate winkel',
    loadingStores: 'Winkels laden...',
    change: 'Wijzigen',
    selectStore: 'Deze winkel selecteren',
    previewStore: 'Winkel bekijken',
    visitStore: 'Winkel bezoeken',
    contactStore: 'Contact opnemen',
    startMonitoring: 'Monitoring starten',
    noStoresFound: 'Geen winkels gevonden',
    storeRating: 'Rating',
    storeProducts: 'producten',
    storeLocation: 'Locatie',
    storeCategory: 'Categorie',
    activeHours: 'Actief',
    lastUpdated: 'Laatst bijgewerkt'
  } : {
    title: 'Discover Amazing Stores',
    subtitle: 'Get found by thousands of buyers worldwide',
    description: 'Browse our featured stores, discover new shops, or add your own store.',
    recommended: 'Featured',
    catalog: 'Discover',
    manual: 'Add',
    featuredStores: '🏆 Featured Stores - Get Discovered!',
    discoverStores: '🔍 Discover Amazing Stores',
    addYourStore: '💡 Want to showcase your store here?',
    joinStores: 'Join 500+ stores already being discovered daily!',
    addStore: 'Add Your Store',
    learnMore: 'Learn More',
    searchCatalog: 'Search stores...',
    allCategories: 'All categories',
    allRatings: 'All ratings',
    sortBy: 'Sort by',
    popular: 'Popular',
    newest: 'Newest',
    rating: 'Rating',
    products: 'Products',
    storeUrl: 'DHgate Store URL',
    storeUrlPlaceholder: 'https://www.dhgate.com/store/example-store',
    storeUrlHelp: 'Paste the full URL of your DHgate store',
    loadingStores: 'Loading stores...',
    change: 'Change',
    selectStore: 'Select this store',
    previewStore: 'View store',
    visitStore: 'Visit store',
    contactStore: 'Contact store',
    startMonitoring: 'Start monitoring',
    noStoresFound: 'No stores found',
    storeRating: 'Rating',
    storeProducts: 'products',
    storeLocation: 'Location',
    storeCategory: 'Category',
    activeHours: 'Active',
    lastUpdated: 'Last updated'
  };

  // Mock data for recommended stores
  const recommendedStores = [
    {
      id: 1,
      name: 'TechWorld Store',
      url: 'https://www.dhgate.com/store/techworld',
      rating: 4.8,
      reviews: 2347,
      products: 1234,
      category: 'Electronics',
      location: 'Shenzhen, China',
      logo: 'electronics',
      description: 'Premium electronics and gadgets'
    },
    {
      id: 2,
      name: 'Fashion Elite',
      url: 'https://www.dhgate.com/store/fashion-elite',
      rating: 4.6,
      reviews: 1856,
      products: 856,
      category: 'Fashion',
      location: 'Guangzhou, China',
      logo: 'fashion',
      description: 'Trendy fashion and accessories'
    },
    {
      id: 3,
      name: 'Sports Pro',
      url: 'https://www.dhgate.com/store/sports-pro',
      rating: 4.7,
      reviews: 3142,
      products: 2145,
      category: 'Sports',
      location: 'Shanghai, China',
      logo: 'sports',
      description: 'Professional sports equipment'
    },
    {
      id: 4,
      name: 'Home & Garden Plus',
      url: 'https://www.dhgate.com/store/home-garden-plus',
      rating: 4.5,
      reviews: 1234,
      products: 567,
      category: 'Home & Garden',
      location: 'Beijing, China',
      logo: 'home',
      description: 'Quality home and garden products'
    },
    {
      id: 5,
      name: 'Beauty Central',
      url: 'https://www.dhgate.com/store/beauty-central',
      rating: 4.4,
      reviews: 987,
      products: 432,
      category: 'Beauty',
      location: 'Hangzhou, China',
      logo: 'beauty',
      description: 'Beauty and personal care'
    },
    {
      id: 6,
      name: 'Gadget Hub',
      url: 'https://www.dhgate.com/store/gadget-hub',
      rating: 4.9,
      reviews: 3456,
      products: 1890,
      category: 'Electronics',
      location: 'Shenzhen, China',
      logo: 'gadget',
      description: 'Latest gadgets and tech'
    }
  ];

  return `
    <div class="enhanced-store-browser" data-theme="${theme}">
      <div class="store-browser-header">
        <h2 class="store-browser-title">${t.title}</h2>
        <p class="store-browser-subtitle">${t.subtitle}</p>
        <p class="store-browser-description">${t.description}</p>
      </div>

      <!-- Store Selection Tabs -->
      <div class="store-selection-tabs">
        <button type="button" class="tab-button active" data-tab="recommended" onclick="switchStoreTab('recommended')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          ${t.recommended}
        </button>
        <button type="button" class="tab-button" data-tab="catalog" onclick="switchStoreTab('catalog')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h6v2H7v-2z" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          ${t.catalog}
        </button>
        <button type="button" class="tab-button" data-tab="manual" onclick="switchStoreTab('manual')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          ${t.manual}
        </button>
      </div>

            <!-- Featured Stores Tab -->
      <div id="recommended-tab" class="store-tab-content active">
        <div class="featured-stores">
          <div class="featured-header">
            <h3 class="section-title">${t.featuredStores}</h3>
            <div class="featured-cta">
              <p class="cta-text">${t.addYourStore}</p>
              <p class="cta-subtext">${t.joinStores}</p>
              <div class="cta-buttons">
                <button class="btn-primary" onclick="showAddStoreModal()">${t.addStore}</button>
                <button class="btn-secondary" onclick="showLearnMore()">${t.learnMore}</button>
              </div>
            </div>
          </div>
          <div class="store-showcase-grid" id="recommended-stores-grid">
            ${recommendedStores.map(store => `
              <div class="store-showcase-card" data-store-id="${store.id}">
                <div class="store-banner">
                  <div class="store-logo-large">
                    ${getStoreIconByType(store.logo)}
                  </div>
                  <div class="store-badge">
                    <span class="badge-text">Featured</span>
                  </div>
                </div>
                <div class="store-showcase-content">
                  <div class="store-header">
                    <h4 class="store-name">${store.name}</h4>
                    <div class="store-rating">
                      <span class="rating-stars">${'★'.repeat(Math.floor(store.rating))}</span>
                      <span class="rating-text">${store.rating} (${store.reviews})</span>
                    </div>
                  </div>
                  <p class="store-description">${store.description}</p>
                  <div class="store-stats">
                    <div class="stat-item">
                      <span class="stat-icon">📦</span>
                      <span class="stat-value">${store.products}</span>
                      <span class="stat-label">${t.storeProducts}</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-icon">📍</span>
                      <span class="stat-value">${store.location}</span>
                    </div>
                  </div>
                  <div class="store-category">
                    <span class="category-tag">${store.category}</span>
                  </div>
                  <div class="store-actions">
                    <button class="btn-view" onclick="previewStore(${store.id})">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                      </svg>
                      ${t.previewStore}
                    </button>
                    <button class="btn-monitor" onclick="selectStore(${store.id})">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2v20M2 12h20" stroke="currentColor" stroke-width="2"/>
                      </svg>
                      ${t.startMonitoring}
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Catalog Tab -->
      <div id="catalog-tab" class="store-tab-content">
        <div class="catalog-search">
          <div class="search-wrapper">
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
              </svg>
              <input 
                type="text" 
                id="catalog_search" 
                class="form-control" 
                placeholder="${t.searchCatalog}" 
                onkeyup="searchCatalog(this.value)"
                autocomplete="off"
              >
            </div>
          </div>
          
          <div class="catalog-filters">
            <select id="category_filter" onchange="filterCatalog()">
              <option value="">${t.allCategories}</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="sports">Sports</option>
              <option value="home">Home & Garden</option>
              <option value="beauty">Beauty</option>
            </select>
            <select id="rating_filter" onchange="filterCatalog()">
              <option value="">${t.allRatings}</option>
              <option value="4.5">4.5+ ⭐</option>
              <option value="4.0">4.0+ ⭐</option>
              <option value="3.5">3.5+ ⭐</option>
            </select>
          </div>
          
          <div class="catalog-stores" id="catalog-stores-grid">
            <!-- Will be populated by JavaScript -->
          </div>
          
          <div class="catalog-loading" id="catalog-loading" style="display: none;">
            <div class="loading-spinner"></div>
            <p>${t.loadingStores}</p>
          </div>
        </div>
      </div>

      <!-- Manual URL Tab -->
      <div id="manual-tab" class="store-tab-content">
        <div class="manual-store-input">
          <label for="manual_store_url" class="form-label">${t.storeUrl}</label>
          <div class="input-wrapper">
            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" stroke-width="2"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="2"/>
            </svg>
            <input 
              type="url" 
              id="manual_store_url" 
              class="form-control" 
              placeholder="${t.storeUrlPlaceholder}"
              onblur="validateStoreUrl(this.value)"
            >
          </div>
          <div class="form-text">${t.storeUrlHelp}</div>
          <div id="url-validation" class="url-validation"></div>
        </div>
      </div>

      <!-- Selected Store Display -->
      <div id="selected-store-display" class="selected-store-display" style="display: none;">
        <div class="selected-store-card">
          <div class="selected-store-info">
            <h4 id="selected-store-name"></h4>
            <p id="selected-store-details"></p>
          </div>
          <button type="button" class="btn-secondary" onclick="clearStoreSelection()">
            ${t.change}
          </button>
        </div>
      </div>

      <!-- Hidden inputs for form submission -->
      <input type="hidden" name="store_url" id="selected_store_url">
      <input type="hidden" name="store_name" id="selected_store_name">
    </div>

    <script>

    <style>
      .enhanced-store-browser {
        font-family: 'Raleway', sans-serif;
        max-width: 1200px;
        margin: 0 auto;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      }

      .store-browser-header {
        text-align: center;
        margin-bottom: 3rem;
        color: white;
      }

      .store-browser-title {
        font-size: 2.5rem;
        font-weight: 800;
        margin: 0 0 0.5rem 0;
        background: linear-gradient(45deg, #fff, #f0f8ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .store-browser-subtitle {
        font-size: 1.2rem;
        font-weight: 600;
        margin: 0 0 1rem 0;
        opacity: 0.9;
      }

      .store-browser-description {
        font-size: 1rem;
        margin: 0;
        line-height: 1.6;
        opacity: 0.8;
      }

      .store-selection-tabs {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 2rem;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 1rem;
      }

      .tab-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border: none;
        background: none;
        color: var(--text-secondary);
        font-weight: 600;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.3s ease;
      }

      .tab-button:hover {
        background: var(--bg-secondary);
        color: var(--text-primary);
      }

      .tab-button.active {
        background: var(--primary-blue);
        color: white;
      }

      .store-tab-content {
        display: none;
      }

      .store-tab-content.active {
        display: block;
      }

      .featured-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        background: rgba(255, 255, 255, 0.1);
        padding: 1.5rem;
        border-radius: 15px;
        backdrop-filter: blur(10px);
      }

      .section-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
        margin: 0;
      }

      .featured-cta {
        text-align: right;
        color: white;
      }

      .cta-text {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
      }

      .cta-subtext {
        font-size: 0.9rem;
        opacity: 0.8;
        margin: 0 0 1rem 0;
      }

      .cta-buttons {
        display: flex;
        gap: 0.75rem;
      }

      .btn-primary {
        background: linear-gradient(45deg, #ff6b6b, #ee5a24);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
      }

      .btn-secondary {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
      }

      .store-showcase-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
      }

      .store-showcase-card {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        cursor: pointer;
      }

      .store-showcase-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      }

      .store-banner {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2rem;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .store-logo-large {
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
      }

      .store-logo-large svg {
        width: 40px;
        height: 40px;
        color: white;
      }

      .store-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: linear-gradient(45deg, #ff6b6b, #ee5a24);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
      }

            .store-showcase-content {
        padding: 2rem;
      }

      .store-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
      }

      .store-name {
        font-size: 1.5rem;
        font-weight: 700;
        color: #2d3748;
        margin: 0;
        line-height: 1.2;
      }

      .store-rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: #f7fafc;
        padding: 0.5rem 1rem;
        border-radius: 20px;
      }

      .rating-stars {
        color: #fbbf24;
        font-size: 0.9rem;
      }

      .rating-text {
        font-size: 0.9rem;
        font-weight: 600;
        color: #4a5568;
      }

      .store-rating {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.875rem;
      }

             .rating-stars {
         color: #fbbf24;
         font-size: 0.875rem;
       }

      .rating-number {
        font-weight: 700;
        color: var(--text-primary);
      }

      .rating-count {
        color: var(--text-muted);
      }

      .store-card-body {
        margin-bottom: 1rem;
      }

      .store-name {
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0 0 0.5rem 0;
      }

      .store-description {
        color: #718096;
        margin: 0 0 1.5rem 0;
        line-height: 1.6;
        font-size: 1rem;
      }

      .store-stats {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: #f7fafc;
        padding: 0.75rem 1rem;
        border-radius: 12px;
        font-size: 0.9rem;
      }

      .stat-icon {
        font-size: 1.1rem;
      }

      .stat-value {
        font-weight: 600;
        color: #2d3748;
      }

      .stat-label {
        color: #718096;
      }

      .store-category {
        margin-bottom: 1.5rem;
      }

      .category-tag {
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .store-actions {
        display: flex;
        gap: 1rem;
      }

      .btn-view, .btn-monitor {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 12px;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        flex: 1;
      }

      .btn-view {
        background: #f7fafc;
        color: #4a5568;
        border: 2px solid #e2e8f0;
      }

      .btn-view:hover {
        background: #edf2f7;
        border-color: #cbd5e0;
        transform: translateY(-2px);
      }

      .btn-monitor {
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
      }

      .btn-monitor:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
      }

      .btn-view svg, .btn-monitor svg {
        width: 16px;
        height: 16px;
      }

      .search-wrapper {
        margin-bottom: 1.5rem;
      }

      .catalog-filters {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .catalog-filters select {
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background: var(--card-bg);
        color: var(--text-primary);
        font-size: 0.875rem;
      }

      .catalog-loading {
        text-align: center;
        padding: 3rem;
        color: var(--text-secondary);
      }

      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid var(--border-color);
        border-top: 3px solid var(--primary-blue);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .selected-store-display {
        margin-top: 2rem;
        padding: 1.5rem;
        background: var(--bg-secondary);
        border-radius: 12px;
        border: 2px solid var(--success);
      }

      .selected-store-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .selected-store-info h4 {
        margin: 0 0 0.25rem 0;
        color: var(--text-primary);
      }

      .selected-store-info p {
        margin: 0;
        color: var(--text-secondary);
      }

      .url-validation {
        margin-top: 0.5rem;
        padding: 0.75rem;
        border-radius: 6px;
        font-size: 0.875rem;
      }

      .url-validation.success {
        background: rgba(16, 185, 129, 0.1);
        color: var(--success);
        border: 1px solid var(--success);
      }

      .url-validation.error {
        background: rgba(239, 68, 68, 0.1);
        color: var(--error);
        border: 1px solid var(--error);
      }

      @media (max-width: 768px) {
        .store-grid {
          grid-template-columns: 1fr;
        }

        .store-selection-tabs {
          flex-direction: column;
        }

        .catalog-filters {
          flex-direction: column;
        }

        .selected-store-card {
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }
      }
    </style>

    <script>
      // Store Browser JavaScript Functions
      let selectedStore = null;
      let catalogStores = [];

      function switchStoreTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.store-tab-content').forEach(tab => {
          tab.classList.remove('active');
        });
        
        // Remove active class from all tab buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Show selected tab content
        document.getElementById(tabName + '-tab').classList.add('active');
        
        // Add active class to clicked button
        event.target.closest('.tab-button').classList.add('active');
        
        // Load catalog data if switching to catalog tab
        if (tabName === 'catalog') {
          loadCatalogStores();
        }
      }

      function selectStore(storeId) {
        const store = recommendedStores.find(s => s.id === storeId) || 
                     catalogStores.find(s => s.id === storeId);
        
        if (store) {
          selectedStore = store;
          updateSelectedStoreDisplay();
          
          // Update hidden inputs
          document.getElementById('selected_store_url').value = store.url;
          document.getElementById('selected_store_name').value = store.name;
        }
      }

      function previewStore(storeId) {
        const store = recommendedStores.find(s => s.id === storeId) || 
                     catalogStores.find(s => s.id === storeId);
        
        if (store) {
          // Open store preview modal
          showStorePreview(store);
        }
      }

      function showStorePreview(store) {
        const modal = document.createElement('div');
        modal.className = 'store-preview-modal';
                 modal.innerHTML = \`
           <div class="modal-overlay">
             <div class="modal-content">
               <div class="modal-header">
                 <h3>\${store.name}</h3>
                 <button onclick="this.closest('.store-preview-modal').remove()">&times;</button>
               </div>
               <div class="modal-body">
                 <div class="store-preview-info">
                   <div class="store-preview-logo">\${getStoreIconByType(store.logo)}</div>
                   <div class="store-preview-details">
                     <p><strong>Rating:</strong> \${store.rating} ★ (\${store.reviews} reviews)</p>
                     <p><strong>Products:</strong> \${store.products}</p>
                     <p><strong>Category:</strong> \${store.category}</p>
                     <p><strong>Location:</strong> \${store.location}</p>
                   </div>
                 </div>
                <div class="store-preview-actions">
                  <button onclick="selectStore(\${store.id}); this.closest('.store-preview-modal').remove()">
                    \${t.selectStore}
                  </button>
                  <a href="\${store.url}" target="_blank" class="btn-secondary">
                    Visit Store
                  </a>
                </div>
              </div>
            </div>
          </div>
        \`;
        
        document.body.appendChild(modal);
      }

             function updateSelectedStoreDisplay() {
         if (selectedStore) {
           document.getElementById('selected-store-name').textContent = selectedStore.name;
           document.getElementById('selected-store-details').textContent = 
             \`\${selectedStore.rating} ★ • \${selectedStore.products} products • \${selectedStore.category}\`;
           document.getElementById('selected-store-display').style.display = 'block';
         } else {
           document.getElementById('selected-store-display').style.display = 'none';
         }
       }

      function clearStoreSelection() {
        selectedStore = null;
        document.getElementById('selected_store_url').value = '';
        document.getElementById('selected_store_name').value = '';
        updateSelectedStoreDisplay();
      }

      async function loadCatalogStores() {
        const loadingEl = document.getElementById('catalog-loading');
        const gridEl = document.getElementById('catalog-stores-grid');
        
        loadingEl.style.display = 'block';
        gridEl.innerHTML = '';
        
        try {
          // Simulate API call to load catalog stores
          await new Promise(resolve => setTimeout(resolve, 1500));
          
                     // Mock catalog data
           catalogStores = [
             {
               id: 101,
               name: 'Electronics Pro',
               url: 'https://www.dhgate.com/store/electronics-pro',
               rating: 4.7,
               reviews: 1890,
               products: 2341,
               category: 'Electronics',
               location: 'Shenzhen, China',
               logo: 'electronics',
               description: 'Professional electronics store'
             },
             {
               id: 102,
               name: 'Fashion Trends',
               url: 'https://www.dhgate.com/store/fashion-trends',
               rating: 4.5,
               reviews: 1234,
               products: 987,
               category: 'Fashion',
               location: 'Guangzhou, China',
               logo: 'fashion',
               description: 'Latest fashion trends'
             }
             // Add more catalog stores as needed
           ];
          
          renderCatalogStores(catalogStores);
        } catch (error) {
          console.error('Error loading catalog stores:', error);
          gridEl.innerHTML = '<p class="error-message">Error loading stores. Please try again.</p>';
        } finally {
          loadingEl.style.display = 'none';
        }
      }

      function renderCatalogStores(stores) {
        const gridEl = document.getElementById('catalog-stores-grid');
        
        if (stores.length === 0) {
          gridEl.innerHTML = '<p class="no-results">${t.noStoresFound}</p>';
          return;
        }
        
                                   gridEl.innerHTML = stores.map(store => \`
            <div class="store-card" data-store-id="\${store.id}" onclick="selectStore(\${store.id})">
              <div class="store-card-header">
                <div class="store-logo">
                  \${getStoreIconByType(store.logo)}
                </div>
               <div class="store-rating">
                 <span class="rating-stars">\${'★'.repeat(Math.floor(store.rating))}</span>
                 <span class="rating-number">\${store.rating}</span>
                 <span class="rating-count">(\${store.reviews})</span>
               </div>
             </div>
            <div class="store-card-body">
              <h5 class="store-name">\${store.name}</h5>
              <p class="store-description">\${store.description}</p>
              <div class="store-meta">
                <span class="store-products">\${store.products} ${t.storeProducts}</span>
                <span class="store-category">\${store.category}</span>
              </div>
              <div class="store-location">\${store.location}</div>
            </div>
            <div class="store-card-actions">
              <button type="button" class="btn-preview" onclick="previewStore(\${store.id})">
                ${t.previewStore}
              </button>
              <button type="button" class="btn-select" onclick="selectStore(\${store.id})">
                ${t.selectStore}
              </button>
            </div>
          </div>
        \`).join('');
      }

      function searchCatalog(query) {
        if (!query.trim()) {
          renderCatalogStores(catalogStores);
          return;
        }
        
        const filtered = catalogStores.filter(store => 
          store.name.toLowerCase().includes(query.toLowerCase()) ||
          store.description.toLowerCase().includes(query.toLowerCase()) ||
          store.category.toLowerCase().includes(query.toLowerCase())
        );
        
        renderCatalogStores(filtered);
      }

      function filterCatalog() {
        const categoryFilter = document.getElementById('category_filter').value;
        const ratingFilter = document.getElementById('rating_filter').value;
        
        let filtered = catalogStores;
        
        if (categoryFilter) {
          filtered = filtered.filter(store => 
            store.category.toLowerCase() === categoryFilter.toLowerCase()
          );
        }
        
        if (ratingFilter) {
          filtered = filtered.filter(store => 
            store.rating >= parseFloat(ratingFilter)
          );
        }
        
        renderCatalogStores(filtered);
      }

      function validateStoreUrl(url) {
        const validationEl = document.getElementById('url-validation');
        
        if (!url) {
          validationEl.innerHTML = '';
          validationEl.className = 'url-validation';
          return;
        }
        
        const dhgatePattern = /^https?:\/\/(www\.)?dhgate\.com\/store\/[a-zA-Z0-9-_]+/;
        
        if (dhgatePattern.test(url)) {
          validationEl.innerHTML = '✅ Valid DHgate store URL';
          validationEl.className = 'url-validation success';
          
          // Extract store name from URL
          const storeName = url.split('/store/')[1]?.split('?')[0] || 'Unknown Store';
          document.getElementById('selected_store_url').value = url;
          document.getElementById('selected_store_name').value = storeName;
          
          selectedStore = {
            name: storeName,
            url: url,
            rating: 'N/A',
            products: 'N/A',
            category: 'Manual Entry',
            location: 'N/A'
          };
          
          updateSelectedStoreDisplay();
        } else {
          validationEl.innerHTML = '❌ Please enter a valid DHgate store URL';
          validationEl.className = 'url-validation error';
        }
      }

      // Initialize the store browser
      document.addEventListener('DOMContentLoaded', function() {
        // Load recommended stores (already rendered in HTML)
        console.log('Enhanced Store Browser initialized');
      });
    </script>
  `;
}
