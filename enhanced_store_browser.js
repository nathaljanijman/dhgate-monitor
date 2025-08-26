// Enhanced Store Browser Component for DHgate Monitor
// This component provides a visual store selection interface with recommended stores,
// catalog browsing, and manual URL input functionality.

export function generateEnhancedStoreBrowser(lang = 'nl', theme = 'light') {
  const t = lang === 'nl' ? {
    title: 'Welke winkel wil je monitoren?',
    description: 'Kies uit aanbevolen winkels, zoek in de catalogus, of voeg een winkel handmatig toe via URL.',
    recommended: 'Aanbevolen',
    catalog: 'Catalogus',
    manual: 'Handmatig',
    popularStores: '🏆 Populaire Winkels',
    searchCatalog: 'Zoek in catalogus...',
    allCategories: 'Alle categorieën',
    allRatings: 'Alle ratings',
    storeUrl: 'DHgate Store URL',
    storeUrlPlaceholder: 'https://www.dhgate.com/store/example-store',
    storeUrlHelp: 'Plak de volledige URL van de DHgate winkel die je wilt monitoren',
    loadingStores: 'Winkels laden...',
    change: 'Wijzigen',
    selectStore: 'Deze winkel selecteren',
    previewStore: 'Voorvertoning bekijken',
    noStoresFound: 'Geen winkels gevonden',
    storeRating: 'Rating',
    storeProducts: 'producten',
    storeLocation: 'Locatie',
    storeCategory: 'Categorie'
  } : {
    title: 'Which store do you want to monitor?',
    description: 'Choose from recommended stores, search the catalog, or add a store manually via URL.',
    recommended: 'Recommended',
    catalog: 'Catalog',
    manual: 'Manual',
    popularStores: '🏆 Popular Stores',
    searchCatalog: 'Search catalog...',
    allCategories: 'All categories',
    allRatings: 'All ratings',
    storeUrl: 'DHgate Store URL',
    storeUrlPlaceholder: 'https://www.dhgate.com/store/example-store',
    storeUrlHelp: 'Paste the full URL of the DHgate store you want to monitor',
    loadingStores: 'Loading stores...',
    change: 'Change',
    selectStore: 'Select this store',
    previewStore: 'Preview store',
    noStoresFound: 'No stores found',
    storeRating: 'Rating',
    storeProducts: 'products',
    storeLocation: 'Location',
    storeCategory: 'Category'
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
      logo: '🏪',
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
      logo: '👕',
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
      logo: '⚽',
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
      logo: '🏡',
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
      logo: '💄',
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
      logo: '📱',
      description: 'Latest gadgets and tech'
    }
  ];

  return `
    <div class="enhanced-store-browser" data-theme="${theme}">
      <div class="store-browser-header">
        <h3 class="store-browser-title">${t.title}</h3>
        <p class="store-browser-description">${t.description}</p>
      </div>

      <!-- Store Selection Tabs -->
      <div class="store-selection-tabs">
        <button type="button" class="tab-button active" data-tab="recommended" onclick="switchStoreTab('recommended')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" stroke-width="2"/>
          </svg>
          ${t.recommended}
        </button>
        <button type="button" class="tab-button" data-tab="catalog" onclick="switchStoreTab('catalog')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h6v2H7v-2z" stroke="currentColor" stroke-width="2"/>
          </svg>
          ${t.catalog}
        </button>
        <button type="button" class="tab-button" data-tab="manual" onclick="switchStoreTab('manual')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" stroke="currentColor" stroke-width="2"/>
          </svg>
          ${t.manual}
        </button>
      </div>

      <!-- Recommended Stores Tab -->
      <div id="recommended-tab" class="store-tab-content active">
        <div class="recommended-stores">
          <h4 class="section-title">${t.popularStores}</h4>
          <div class="store-grid" id="recommended-stores-grid">
            ${recommendedStores.map(store => `
              <div class="store-card" data-store-id="${store.id}" onclick="selectStore(${store.id})">
                <div class="store-card-header">
                  <div class="store-logo">${store.logo}</div>
                  <div class="store-rating">
                    <span class="rating-stars">${'⭐'.repeat(Math.floor(store.rating))}</span>
                    <span class="rating-number">${store.rating}</span>
                    <span class="rating-count">(${store.reviews})</span>
                  </div>
                </div>
                <div class="store-card-body">
                  <h5 class="store-name">${store.name}</h5>
                  <p class="store-description">${store.description}</p>
                  <div class="store-meta">
                    <span class="store-products">${store.products} ${t.storeProducts}</span>
                    <span class="store-category">${store.category}</span>
                  </div>
                  <div class="store-location">${store.location}</div>
                </div>
                <div class="store-card-actions">
                  <button type="button" class="btn-preview" onclick="previewStore(${store.id})">
                    ${t.previewStore}
                  </button>
                  <button type="button" class="btn-select" onclick="selectStore(${store.id})">
                    ${t.selectStore}
                  </button>
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

    <style>
      .enhanced-store-browser {
        font-family: 'Raleway', sans-serif;
        max-width: 800px;
        margin: 0 auto;
      }

      .store-browser-header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .store-browser-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0 0 0.5rem 0;
      }

      .store-browser-description {
        color: var(--text-secondary);
        margin: 0;
        line-height: 1.6;
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

      .section-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0 0 1.5rem 0;
      }

      .store-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }

      .store-card {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .store-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        border-color: var(--primary-blue);
      }

      .store-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .store-logo {
        font-size: 2rem;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-secondary);
        border-radius: 8px;
      }

      .store-rating {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.875rem;
      }

      .rating-stars {
        color: #fbbf24;
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
        color: var(--text-secondary);
        margin: 0 0 1rem 0;
        line-height: 1.5;
      }

      .store-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
      }

      .store-products {
        color: var(--success);
        font-weight: 600;
      }

      .store-category {
        color: var(--primary-blue);
        font-weight: 600;
      }

      .store-location {
        color: var(--text-muted);
        font-size: 0.875rem;
      }

      .store-card-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
      }

      .btn-preview, .btn-select {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .btn-preview {
        background: var(--bg-secondary);
        color: var(--text-primary);
      }

      .btn-preview:hover {
        background: var(--border-color);
      }

      .btn-select {
        background: var(--primary-blue);
        color: white;
        flex: 1;
      }

      .btn-select:hover {
        background: var(--primary-dark);
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
                  <div class="store-preview-logo">\${store.logo}</div>
                  <div class="store-preview-details">
                    <p><strong>Rating:</strong> \${store.rating} ⭐ (\${store.reviews} reviews)</p>
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
            \`\${selectedStore.rating} ⭐ • \${selectedStore.products} products • \${selectedStore.category}\`;
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
              logo: '📱',
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
              logo: '👗',
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
              <div class="store-logo">\${store.logo}</div>
              <div class="store-rating">
                <span class="rating-stars">\${'⭐'.repeat(Math.floor(store.rating))}</span>
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
