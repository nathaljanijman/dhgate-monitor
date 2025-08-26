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
    <div class="tile-store-browser" data-theme="${theme}">
      <div class="browser-header">
        <h1 class="browser-title">${t.title}</h1>
        <p class="browser-subtitle">${t.subtitle}</p>
      </div>

      <!-- Featured Store Tiles -->
      <div class="featured-tiles">
        <div class="tiles-grid" id="featured-stores-grid">
            ${recommendedStores.slice(0, 4).map((store, index) => `
              <div class="store-tile tile-${index + 1}" data-store-id="${store.id}" onclick="selectStore(${store.id})">
                <div class="tile-content">
                  <div class="tile-header">
                    <h3 class="tile-title">${store.name}</h3>
                    <div class="tile-rating">
                      <span class="rating-value">${store.rating}</span>
                      <span class="rating-label">${store.reviews} reviews</span>
                    </div>
                  </div>
                  <div class="tile-body">
                    <p class="tile-description">${store.description}</p>
                    <div class="tile-stats">
                      <div class="tile-stat">
                        <strong>${store.products.toLocaleString()}</strong> products
                      </div>
                      <div class="tile-stat">
                        <strong>${store.category}</strong>
                      </div>
                    </div>
                  </div>
                  <div class="tile-action">
                    <div class="select-indicator">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      
      <!-- Add Store Section -->
      <div class="add-store-section">
        <div class="add-store-content">
          <h3 class="add-store-title">Add Custom Store</h3>
          <p class="add-store-description">Monitor any DHgate store by entering its URL</p>
          
          <div class="add-store-form">
            <div class="input-group">
              <input 
                type="url" 
                id="manual_store_url" 
                class="store-url-input" 
                placeholder="https://www.dhgate.com/store/your-store"
                onblur="validateStoreUrl(this.value)"
              >
              <button type="button" class="add-store-btn" onclick="addCustomStore()">
                Add Store
              </button>
            </div>
            <div id="url-validation" class="url-validation"></div>
          </div>
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
      /* ===== TILE-BASED STORE BROWSER ===== */
      .tile-store-browser {
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        max-width: 1200px;
        margin: 0 auto;
        background: var(--bg-primary);
        padding: 2rem;
      }
      
      /* Header */
      .browser-header {
        text-align: center;
        margin-bottom: 3rem;
      }
      
      .browser-title {
        font-size: 2.5rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 0.75rem 0;
        letter-spacing: -0.01em;
      }
      
      .browser-subtitle {
        font-size: 1.1rem;
        color: var(--text-secondary);
        margin: 0;
        font-weight: 400;
      }
      
      /* Featured Store Tiles */
      .featured-tiles {
        margin-bottom: 3rem;
      }
      
      .tiles-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        max-width: 800px;
        margin: 0 auto;
      }
      
      .store-tile {
        background: var(--bg-primary);
        border: 1px solid var(--border-light);
        border-radius: 16px;
        padding: 1.5rem;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
        min-height: 140px;
      }
      
      .store-tile:hover {
        border-color: var(--primary-blue);
        box-shadow: 0 4px 20px rgba(37, 99, 235, 0.1);
        transform: translateY(-2px);
      }
      
      /* Tile Color Variations */
      .tile-1 { background: linear-gradient(135deg, #e8f5e8 0%, #ffffff 100%); }
      .tile-2 { background: linear-gradient(135deg, #fef3e2 0%, #ffffff 100%); }
      .tile-3 { background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%); }
      .tile-4 { background: linear-gradient(135deg, #fdf2f8 0%, #ffffff 100%); }
      
      .tile-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      
      .tile-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.75rem;
        gap: 1rem;
      }
      
      .tile-title {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
        line-height: 1.3;
      }
      
      .tile-rating {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        flex-shrink: 0;
      }
      
      .rating-value {
        font-size: 1.25rem;
        font-weight: 800;
        color: var(--primary-blue);
        line-height: 1;
      }
      
      .rating-label {
        font-size: 0.7rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 500;
      }
      
      .tile-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      
      .tile-description {
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin: 0;
        line-height: 1.4;
      }
      
      .tile-stats {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        margin-top: auto;
      }
      
      .tile-stat {
        font-size: 0.8rem;
        color: var(--text-muted);
      }
      
      .tile-stat strong {
        color: var(--text-primary);
        font-weight: 600;
      }
      
      .tile-action {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.2s ease;
      }
      
      .store-tile:hover .tile-action {
        opacity: 1;
        transform: scale(1);
      }
      
      .select-indicator {
        width: 32px;
        height: 32px;
        background: var(--primary-blue);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
      }
      
      /* Add Store Section */
      .add-store-section {
        max-width: 600px;
        margin: 0 auto;
        text-align: center;
        padding: 2rem;
        background: var(--bg-secondary);
        border-radius: 16px;
        border: 1px solid var(--border-light);
      }
      
      .add-store-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 0.5rem 0;
      }
      
      .add-store-description {
        color: var(--text-secondary);
        margin: 0 0 2rem 0;
        font-size: 1rem;
        line-height: 1.4;
      }
      
      .input-group {
        display: flex;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }
      
      .store-url-input {
        flex: 1;
        padding: 0.875rem 1rem;
        border: 1px solid var(--border-light);
        border-radius: 8px;
        font-size: 0.95rem;
        background: var(--bg-primary);
        color: var(--text-primary);
        transition: all 0.2s ease;
      }
      
      .store-url-input:focus {
        outline: none;
        border-color: var(--primary-blue);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
      }
      
      .store-url-input::placeholder {
        color: var(--text-muted);
      }
      
      .add-store-btn {
        padding: 0.875rem 1.5rem;
        background: var(--primary-blue);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
      }
      
      .add-store-btn:hover {
        background: var(--primary-blue-hover);
        transform: translateY(-1px);
      }
      
      .add-store-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
      
      /* Form Validation */
      .url-validation {
        text-align: left;
        padding: 0.75rem;
        border-radius: 6px;
        font-size: 0.9rem;
        margin-top: 0.5rem;
      }
      
      .url-validation.success {
        background: rgba(16, 185, 129, 0.08);
        color: #059669;
        border: 1px solid rgba(16, 185, 129, 0.2);
      }
      
      .url-validation.error {
        background: rgba(239, 68, 68, 0.08);
        color: #dc2626;
        border: 1px solid rgba(239, 68, 68, 0.2);
      }
      
      /* Selected Store Display */
      .selected-store-display {
        margin-top: 2rem;
        padding: 1.25rem;
        background: rgba(16, 185, 129, 0.08);
        border: 1px solid rgba(16, 185, 129, 0.2);
        border-radius: 12px;
        text-align: center;
      }
      
      .selected-store-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }
      
      .selected-store-info h4 {
        margin: 0 0 0.25rem 0;
        color: var(--text-primary);
        font-weight: 600;
      }
      
      .selected-store-info p {
        margin: 0;
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
      
      /* Responsive Design */
      @media (max-width: 768px) {
        .tile-store-browser {
          padding: 1.5rem 1rem;
        }
        
        .browser-title {
          font-size: 2rem;
        }
        
        .browser-subtitle {
          font-size: 1rem;
        }
        
        .tiles-grid {
          grid-template-columns: 1fr;
          max-width: 400px;
        }
        
        .store-tile {
          min-height: 120px;
          padding: 1.25rem;
        }
        
        .tile-title {
          font-size: 1rem;
        }
        
        .rating-value {
          font-size: 1.1rem;
        }
        
        .add-store-section {
          padding: 1.5rem;
        }
        
        .input-group {
          flex-direction: column;
        }
        
        .add-store-btn {
          width: 100%;
        }
        
        .selected-store-card {
          flex-direction: column;
          text-align: center;
          gap: 1rem;
        }
      }
      
      @media (max-width: 480px) {
        .browser-title {
          font-size: 1.75rem;
        }
        
        .store-tile {
          min-height: 100px;
          padding: 1rem;
        }
        
        .tile-header {
          gap: 0.5rem;
        }
        
        .add-store-title {
          font-size: 1.25rem;
        }
      }
      
      /* Minimal Navigation */
      .navigation-container {
        margin-bottom: 3rem;
        display: flex;
        justify-content: center;
      }
      
      .tab-navigation {
        display: inline-flex;
        background: var(--bg-secondary);
        border-radius: 8px;
        padding: 4px;
        gap: 4px;
      }
      
      .nav-tab {
        background: transparent;
        border: none;
        padding: 0.75rem 1.5rem;
        color: var(--text-muted);
        font-weight: 500;
        font-size: 0.95rem;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .nav-tab:hover {
        color: var(--text-primary);
        background: rgba(37, 99, 235, 0.04);
      }
      
      .nav-tab.active {
        background: var(--bg-primary);
        color: var(--primary-blue);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      
      /* Content Layout */
      .tab-content {
        display: none;
      }
      
      .tab-content.active {
        display: block;
      }
      
      .content-container {
        max-width: 100%;
      }
      
      /* Clean Store Grid */
      .store-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 1.5rem;
      }
      
      /* Minimalist Store Cards */
      .store-card {
        background: var(--bg-primary);
        border: 1px solid var(--border-light);
        border-radius: 12px;
        padding: 1.5rem;
        transition: all 0.2s ease;
        cursor: pointer;
      }
      
      .store-card:hover {
        border-color: var(--primary-blue);
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
        transform: translateY(-2px);
      }
      
      .card-header {
        margin-bottom: 1.25rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-light);
      }
      
      .store-identity {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
      }
      
      .store-name {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0;
        line-height: 1.3;
        flex: 1;
      }
      
      .store-rating {
        display: flex;
        align-items: baseline;
        gap: 0.25rem;
        flex-shrink: 0;
      }
      
      .rating-value {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--primary-blue);
      }
      
      .rating-reviews {
        font-size: 0.9rem;
        color: var(--text-muted);
      }
      
      .card-body {
        margin-bottom: 1.25rem;
      }
      
      .store-description {
        color: var(--text-secondary);
        margin: 0 0 1.25rem 0;
        line-height: 1.5;
        font-size: 0.95rem;
      }
      
      .store-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
      }
      
      .stat {
        text-align: center;
        padding: 0.75rem 0.5rem;
        background: var(--bg-secondary);
        border-radius: 8px;
      }
      
      .stat-value {
        display: block;
        font-weight: 600;
        color: var(--text-primary);
        font-size: 0.95rem;
        margin-bottom: 0.25rem;
      }
      
      .stat-label {
        display: block;
        font-size: 0.8rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 500;
      }
      
      .card-actions {
        display: flex;
        gap: 0.75rem;
      }
      
      .btn-primary, .btn-secondary {
        flex: 1;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        font-weight: 500;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 1px solid transparent;
      }
      
      .btn-primary {
        background: var(--primary-blue);
        color: white;
      }
      
      .btn-primary:hover {
        background: var(--primary-blue-hover);
        transform: translateY(-1px);
      }
      
      .btn-secondary {
        background: transparent;
        color: var(--text-secondary);
        border-color: var(--border-medium);
      }
      
      .btn-secondary:hover {
        background: var(--bg-secondary);
        border-color: var(--primary-blue);
        color: var(--primary-blue);
      }
      
      /* Legacy Support */
      .store-tab-content {
        display: none;
      }
      
      .store-tab-content.active {
        display: block;
      }
      
      .premium-tab-content {
        display: none;
      }
      
      .premium-tab-content.active {
        display: block;
      }
      
      /* Selected Store Display */
      .selected-store-display {
        margin-top: 2rem;
        padding: 1.25rem;
        background: var(--bg-secondary);
        border: 1px solid var(--border-light);
        border-radius: 8px;
      }
      
      .selected-store-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }
      
      .selected-store-info h4 {
        margin: 0 0 0.25rem 0;
        color: var(--text-primary);
        font-weight: 600;
      }
      
      .selected-store-info p {
        margin: 0;
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
      
      /* Form Validation */
      .url-validation {
        margin-top: 0.75rem;
        padding: 0.75rem;
        border-radius: 6px;
        font-size: 0.9rem;
      }
      
      .url-validation.success {
        background: rgba(16, 185, 129, 0.08);
        color: #059669;
        border: 1px solid rgba(16, 185, 129, 0.2);
      }
      
      .url-validation.error {
        background: rgba(239, 68, 68, 0.08);
        color: #dc2626;
        border: 1px solid rgba(239, 68, 68, 0.2);
      }
      
      /* Responsive Design */
      @media (max-width: 768px) {
        .modern-store-browser {
          padding: 2rem 1rem 1.5rem;
        }
        
        .browser-title {
          font-size: 2rem;
        }
        
        .browser-subtitle {
          font-size: 1.1rem;
        }
        
        .navigation-container {
          margin-bottom: 2rem;
        }
        
        .tab-navigation {
          width: 100%;
          justify-content: center;
        }
        
        .nav-tab {
          flex: 1;
          text-align: center;
        }
        
        .store-grid {
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        .store-stats {
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }
        
        .card-actions {
          flex-direction: column;
        }
        
        .selected-store-card {
          flex-direction: column;
          text-align: center;
          gap: 1rem;
        }
      }
        padding: 4rem 3rem 3rem;
        text-align: center;
        overflow: hidden;
      }
      
      .hero-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      }
      
      .hero-gradient {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--bg-hero);
        opacity: 0.95;
      }
      
      .hero-particles {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
          radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 60% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
        animation: float 20s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(-10px, -5px) scale(1.02); }
        50% { transform: translate(5px, -10px) scale(0.98); }
        75% { transform: translate(-5px, 5px) scale(1.01); }
      }
      
      .hero-content {
        position: relative;
        z-index: 2;
        color: var(--text-white);
      }
      
      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50px;
        padding: 0.75rem 1.5rem;
        margin-bottom: 1.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .badge-icon svg {
        color: currentColor;
      }
      
      .hero-title {
        font-size: clamp(2.5rem, 5vw, 3.5rem);
        font-weight: 800;
        margin: 0 0 1rem;
        background: linear-gradient(45deg, #ffffff, rgba(255, 255, 255, 0.8));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        line-height: 1.1;
      }
      
      .hero-subtitle {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0 0 1rem;
        opacity: 0.9;
        line-height: 1.3;
      }
      
      .hero-description {
        font-size: 1.1rem;
        margin: 0;
        opacity: 0.8;
        line-height: 1.5;
        max-width: 600px;
        margin: 0 auto;
      }
      
      /* Premium Tabs Navigation */
      .premium-tabs-container {
        position: relative;
        padding: 0 3rem 2rem;
        background: var(--card-bg);
      }
      
      .premium-tabs {
        display: flex;
        gap: 1rem;
        background: var(--bg-secondary);
        border-radius: 16px;
        padding: 0.5rem;
        position: relative;
      }
      
      .premium-tab {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 1.5rem;
        border: none;
        background: transparent;
        color: var(--text-secondary);
        font-weight: 600;
        font-size: 0.95rem;
        cursor: pointer;
        border-radius: 12px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        min-height: 80px;
      }
      
      .premium-tab:hover:not(.active) {
        background: rgba(37, 99, 235, 0.05);
        color: var(--primary-blue);
        transform: translateY(-1px);
      }
      
      .premium-tab.active {
        background: var(--primary-blue);
        color: var(--text-white);
        box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
        transform: translateY(-2px);
      }
      
      .premium-tab .tab-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        transition: all 0.3s ease;
      }
      
      .premium-tab.active .tab-icon {
        background: rgba(255, 255, 255, 0.2);
      }
      
      .premium-tab .tab-content {
        flex: 1;
        text-align: left;
      }
      
      .premium-tab .tab-label {
        display: block;
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
      }
      
      .premium-tab .tab-description {
        display: block;
        font-size: 0.8rem;
        opacity: 0.8;
        font-weight: 500;
      }
      
      .premium-tab .tab-indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: var(--accent-orange);
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }
      
      .premium-tab.active .tab-indicator {
        transform: scaleX(1);
      }
      
      /* Premium Tab Content */
      .premium-tab-content {
        display: none;
        background: var(--card-bg);
        padding: 3rem;
      }
      
      .premium-tab-content.active {
        display: block;
      }
      
      /* Premium Showcase */
      .premium-showcase {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .showcase-header {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 3rem;
        margin-bottom: 3rem;
        align-items: start;
      }
      
      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 2rem;
      }
      
      .section-info {
        flex: 1;
      }
      
      .section-title {
        font-size: 2rem;
        font-weight: 800;
        color: var(--text-primary);
        margin: 0 0 0.5rem;
        line-height: 1.2;
      }
      
      .section-subtitle {
        font-size: 1.1rem;
        color: var(--text-secondary);
        margin: 0;
        line-height: 1.4;
      }
      
      .header-stats {
        display: flex;
        gap: 1rem;
      }
      
      .stat-box {
        text-align: center;
        padding: 1rem;
        background: var(--bg-secondary);
        border-radius: 12px;
        min-width: 80px;
      }
      
      .stat-number {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--primary-blue);
        line-height: 1;
      }
      
      .stat-label {
        font-size: 0.8rem;
        color: var(--text-muted);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-top: 0.25rem;
      }
      
      .showcase-cta {
        background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        border-radius: 16px;
        padding: 2rem;
        border: 1px solid var(--border-light);
      }
      
      .cta-card {
        text-align: center;
      }
      
      .cta-content {
        margin-bottom: 1.5rem;
      }
      
      .cta-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0 0 0.5rem;
      }
      
      .cta-description {
        font-size: 0.95rem;
        color: var(--text-secondary);
        margin: 0;
        line-height: 1.4;
      }
      
      .cta-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
      }
      
      .btn-premium {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--primary-blue);
        color: var(--text-white);
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
      }
      
      .btn-premium:hover {
        background: var(--primary-blue-hover);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
      }
      
      .btn-outline {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: transparent;
        color: var(--primary-blue);
        border: 2px solid var(--primary-blue);
        padding: 0.75rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .btn-outline:hover {
        background: rgba(37, 99, 235, 0.05);
        transform: translateY(-1px);
      }
      
      /* Premium Store Grid */
      .premium-store-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }
      
      /* Premium Store Cards */
      .premium-store-card {
        position: relative;
        background: var(--card-bg);
        border-radius: 20px;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid var(--border-light);
        cursor: pointer;
      }
      
      .premium-store-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        border-color: var(--primary-blue);
      }
      
      .premium-store-card:hover .card-glow {
        opacity: 1;
        transform: scale(1.1);
      }
      
      .card-glow {
        position: absolute;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        background: radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%);
        opacity: 0;
        transition: all 0.6s ease;
        z-index: 1;
        pointer-events: none;
      }
      
      .card-content {
        position: relative;
        z-index: 2;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      
      .store-card-header {
        padding: 1.5rem 1.5rem 1rem;
        background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
      }
      
      .store-visual {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
      }
      
      .store-avatar {
        width: 60px;
        height: 60px;
        background: var(--primary-blue);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
      }
      
      .store-avatar svg {
        width: 30px;
        height: 30px;
        color: white;
      }
      
      .store-badges {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .premium-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        background: linear-gradient(45deg, var(--primary-blue), var(--primary-blue-hover));
        color: white;
        padding: 0.35rem 0.75rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
      }
      
      .top-rated-badge {
        background: linear-gradient(45deg, var(--accent-orange), var(--accent-orange-hover));
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 15px;
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
      }
      
      .store-info {
        flex: 1;
      }
      
      .store-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0 0 0.5rem;
        line-height: 1.2;
      }
      
      .rating-display {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .rating-stars {
        display: flex;
        gap: 0.1rem;
        color: #fbbf24;
      }
      
      .rating-value {
        font-weight: 700;
        color: var(--text-primary);
        font-size: 0.9rem;
      }
      
      .rating-count {
        color: var(--text-muted);
        font-size: 0.85rem;
      }
      
      .store-card-body {
        padding: 1rem 1.5rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      
      .store-description {
        color: var(--text-secondary);
        line-height: 1.5;
        margin: 0;
        font-size: 0.95rem;
      }
      
      .store-metrics {
        display: flex;
        gap: 1rem;
      }
      
      .metric-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--bg-secondary);
        padding: 0.75rem 1rem;
        border-radius: 12px;
        flex: 1;
      }
      
      .metric-icon {
        color: var(--primary-blue);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .metric-info {
        flex: 1;
        min-width: 0;
      }
      
      .metric-value {
        font-weight: 700;
        color: var(--text-primary);
        font-size: 0.9rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .metric-label {
        font-size: 0.75rem;
        color: var(--text-muted);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .category-display {
        margin-top: auto;
      }
      
      .category-chip {
        display: inline-block;
        background: linear-gradient(45deg, var(--primary-blue), var(--primary-blue-hover));
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .store-card-actions {
        padding: 1rem 1.5rem 1.5rem;
        display: flex;
        gap: 0.75rem;
        border-top: 1px solid var(--border-light);
        background: var(--bg-secondary);
      }
      
      .action-btn {
        flex: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.875rem 1rem;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .preview-btn {
        background: var(--bg-primary);
        color: var(--text-primary);
        border: 2px solid var(--border-medium);
      }
      
      .preview-btn:hover {
        background: var(--bg-secondary);
        border-color: var(--primary-blue);
        color: var(--primary-blue);
        transform: translateY(-2px);
      }
      
      .select-btn {
        background: var(--primary-blue);
        color: white;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
      }
      
      .select-btn:hover {
        background: var(--primary-blue-hover);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
      }
      
      /* Legacy Tab Content Support */
      .store-tab-content {
        display: none;
        background: var(--card-bg);
        padding: 3rem;
      }
      
      .store-tab-content.active {
        display: block;
      }
      
      /* Selected Store Display */
      .selected-store-display {
        margin-top: 2rem;
        padding: 1.5rem;
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%);
        border: 2px solid rgba(16, 185, 129, 0.2);
        border-radius: 16px;
        backdrop-filter: blur(10px);
      }
      
      .selected-store-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }
      
      .selected-store-info h4 {
        margin: 0 0 0.25rem 0;
        color: var(--text-primary);
        font-weight: 700;
      }
      
      .selected-store-info p {
        margin: 0;
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
      
      /* Form Integration */
      .url-validation {
        margin-top: 0.75rem;
        padding: 1rem;
        border-radius: 12px;
        font-size: 0.9rem;
        font-weight: 500;
      }
      
      .url-validation.success {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%);
        color: #059669;
        border: 1px solid rgba(16, 185, 129, 0.3);
      }
      
      .url-validation.error {
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
        color: #dc2626;
        border: 1px solid rgba(239, 68, 68, 0.3);
      }
      
      /* Loading States */
      .catalog-loading {
        text-align: center;
        padding: 4rem 2rem;
        color: var(--text-secondary);
      }
      
      .loading-spinner {
        width: 48px;
        height: 48px;
        border: 3px solid var(--border-light);
        border-top: 3px solid var(--primary-blue);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1.5rem;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      /* Responsive Design */
      @media (max-width: 1200px) {
        .showcase-header {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        .header-content {
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .header-stats {
          justify-content: center;
        }
      }
      
      @media (max-width: 768px) {
        .luxury-store-browser {
          border-radius: 16px;
          margin: 0 1rem;
        }
        
        .store-browser-hero {
          padding: 2.5rem 2rem 2rem;
        }
        
        .hero-title {
          font-size: 2rem;
        }
        
        .hero-subtitle {
          font-size: 1.1rem;
        }
        
        .premium-tabs-container {
          padding: 0 2rem 2rem;
        }
        
        .premium-tabs {
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .premium-tab {
          min-height: 60px;
          padding: 1rem;
        }
        
        .premium-tab .tab-content {
          text-align: center;
        }
        
        .premium-tab-content {
          padding: 2rem;
        }
        
        .premium-store-grid {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        .showcase-header {
          margin-bottom: 2rem;
        }
        
        .section-title {
          font-size: 1.5rem;
        }
        
        .selected-store-card {
          flex-direction: column;
          text-align: center;
          gap: 1rem;
        }
        
        .metric-item {
          flex-direction: column;
          text-align: center;
          gap: 0.25rem;
        }
        
        .store-card-actions {
          flex-direction: column;
        }
      }
      
      @media (max-width: 480px) {
        .store-browser-hero {
          padding: 2rem 1.5rem 1.5rem;
        }
        
        .premium-tabs-container {
          padding: 0 1.5rem 1.5rem;
        }
        
        .premium-tab-content {
          padding: 1.5rem;
        }
        
        .cta-actions {
          flex-direction: column;
        }
        
        .showcase-cta {
          padding: 1.5rem;
        }
      }
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


      /* End of tile CSS */

    </style>
    
    <script>
      // Store Browser JavaScript Functions
      let selectedStore = null;
      let catalogStores = [];
      
      
      function switchStoreTab(tabName) {
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
        // Hide all tab contents (support all class names)
        document.querySelectorAll('.store-tab-content, .premium-tab-content, .tab-content').forEach(tab => {
          tab.classList.remove('active');
        });
        
        // Remove active class from all tab buttons (support all class names)
        document.querySelectorAll('.tab-button, .premium-tab, .nav-tab').forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });
        
        // Show selected tab content
        const tabContent = document.getElementById(tabName + '-tab');
        if (tabContent) {
          tabContent.classList.add('active');
        }
        
        // Add active class to clicked button
        const clickedButton = event.target.closest('.tab-button, .premium-tab, .nav-tab');
        if (clickedButton) {
          clickedButton.classList.add('active');
          clickedButton.setAttribute('aria-selected', 'true');
        }
        
        // Load catalog data if switching to catalog tab
        if (tabName === 'catalog') {
          loadCatalogStores();
        }
        
        // Track tab switch for analytics
        if (typeof window.trackDHgateEvent === 'function') {
          window.trackDHgateEvent('store_browser_tab_switch', {
            tab_name: tabName,
            component: 'modern_store_browser'
          });
        }
      }
      
      function addCustomStore() {
        const urlInput = document.getElementById('manual_store_url');
        const url = urlInput.value.trim();
        
        if (!url) {
          showUrlValidation('Please enter a store URL', 'error');
          return;
        }
        
        const dhgatePattern = /^https?:\/\/(www\.)?dhgate\.com\/store\/[a-zA-Z0-9-_]+/;
        if (!dhgatePattern.test(url)) {
          showUrlValidation('Please enter a valid DHgate store URL', 'error');
          return;
        }
        
        // Extract store name from URL
        const storeName = url.split('/store/')[1]?.split('?')[0] || 'Custom Store';
        
        // Create custom store object
        const customStore = {
          id: 'custom_' + Date.now(),
          name: storeName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          url: url,
          rating: 'N/A',
          reviews: 0,
          products: 'N/A',
          category: 'Custom',
          location: 'N/A',
          description: 'Custom store added manually'
        };
        
        selectStore(customStore.id, customStore);
        showUrlValidation('Store added successfully!', 'success');
        
        // Clear the input
        urlInput.value = '';
        
        // Track custom store addition
        if (typeof window.trackDHgateEvent === 'function') {
          window.trackDHgateEvent('custom_store_added', {
            store_name: customStore.name,
            store_url: url
          });
        }
      }
      
      function showUrlValidation(message, type) {
        const validationEl = document.getElementById('url-validation');
        validationEl.textContent = message;
        validationEl.className = 'url-validation ' + type;
        
        if (type === 'success') {
          setTimeout(() => {
            validationEl.textContent = '';
            validationEl.className = 'url-validation';
          }, 3000);
        }
      }

      function selectStore(storeId, customStore = null) {
        const store = customStore || 
                     recommendedStores.find(s => s.id === storeId) || 
                     catalogStores.find(s => s.id === storeId);
        
        if (store) {
          selectedStore = store;
          updateSelectedStoreDisplay();
          
          // Update hidden inputs
          document.getElementById('selected_store_url').value = store.url;
          document.getElementById('selected_store_name').value = store.name;
          
          // Track store selection
          if (typeof window.trackDHgateEvent === 'function') {
            window.trackDHgateEvent('store_selected', {
              store_id: store.id,
              store_name: store.name,
              store_type: customStore ? 'custom' : 'featured'
            });
          }
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
