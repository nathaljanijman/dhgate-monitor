// Clean Tile-Based Store Browser Component
// Modern, minimalist design with 4 featured store tiles

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
    title: 'Kies je winkel',
    addCustomTitle: 'Eigen winkel toevoegen', 
    addCustomDescription: 'Monitor elke DHgate winkel door de URL in te voeren',
    addStorePlaceholder: 'https://www.dhgate.com/store/jouw-winkel',
    addStoreButton: 'Winkel toevoegen',
    changeButton: 'Wijzigen'
  } : {
    title: 'Select a store',
    addCustomTitle: 'Add custom store',
    addCustomDescription: 'Monitor any DHgate store by entering its URL',
    addStorePlaceholder: 'https://www.dhgate.com/store/your-store',
    addStoreButton: 'Add store',
    changeButton: 'Change'
  };

  // Featured stores data (top 4) with real DHgate sellers
  const featuredStores = [
    {
      id: 1,
      name: 'ECOBAG Store',
      url: 'https://www.dhgate.com/store/20062391',
      rating: 4.9,
      reviews: 8547,
      products: 2834,
      category: lang === 'nl' ? 'Mode & Tassen' : 'Fashion & Bags',
      location: 'Guangzhou, China',
      logo: 'fashion',
      description: lang === 'nl' ? 'Luxe handtassen en mode accessoires' : 'Luxury handbags and fashion accessories',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop&auto=format',
      color: '#fef3e2'
    },
    {
      id: 2,
      name: 'Global Technology',
      url: 'https://www.dhgate.com/store/19998142',
      rating: 4.8,
      reviews: 12456,
      products: 5467,
      category: lang === 'nl' ? 'Elektronica' : 'Electronics',
      location: 'Shenzhen, China',
      logo: 'electronics',
      description: lang === 'nl' ? 'Telefoons, gadgets en elektronica' : 'Phones, gadgets and electronics',
      image: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=300&h=200&fit=crop&auto=format',
      color: '#e8f5e8'
    },
    {
      id: 3,
      name: 'Watch World',
      url: 'https://www.dhgate.com/store/20283981',
      rating: 4.7,
      reviews: 6789,
      products: 1234,
      category: lang === 'nl' ? 'Horloges' : 'Watches',
      location: 'Dongguan, China',
      logo: 'beauty',
      description: lang === 'nl' ? 'Premium horloges en sieraden' : 'Premium watches and jewelry',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop&auto=format',
      color: '#f0f9ff'
    },
    {
      id: 4,
      name: 'Sports Authority',
      url: 'https://www.dhgate.com/store/20147638',
      rating: 4.6,
      reviews: 4321,
      products: 3456,
      category: lang === 'nl' ? 'Sport & Outdoor' : 'Sports & Outdoors',
      location: 'Putian, China',
      logo: 'sports',
      description: lang === 'nl' ? 'Sportkleding en sneakers' : 'Sports apparel and sneakers',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&auto=format',
      color: '#fdf2f8'
    }
  ];

  return `
    <div class="tile-store-browser" data-theme="${theme}">
      <!-- Header -->
      <div class="browser-header">
        <h1 class="browser-title">${t.title}</h1>
      </div>

      <!-- Featured Store Tiles -->
      <div class="featured-tiles">
        <div class="tiles-grid" id="featured-stores-grid">
          ${featuredStores.map((store, index) => `
            <div class="store-tile tile-${index + 1}" data-store-id="${store.id}" style="background-color: ${store.color};" onclick="window.selectStoreGlobal(${store.id})">
              <div class="tile-content">
                <div class="tile-image">
                  <img src="${store.image}" alt="${store.name}" class="store-image" loading="lazy">
                  <div class="tile-overlay">
                    <div class="tile-rating">
                      <span class="rating-value">${store.rating}</span>
                      <span class="rating-reviews">${store.reviews}</span>
                    </div>
                  </div>
                </div>
                <div class="tile-body">
                  <div class="tile-header">
                    <h3 class="tile-title">${store.name}</h3>
                    <div class="tile-category">${store.category}</div>
                  </div>
                  <p class="tile-description">${store.description}</p>
                  <div class="tile-stats">
                    <span class="products-count">${store.products.toLocaleString()} ${lang === 'nl' ? 'producten' : 'products'}</span>
                  </div>
                </div>
                <div class="tile-action">
                  <div class="tile-buttons">
                    <button class="visit-store-btn" onclick="event.stopPropagation(); window.open('${store.url}', '_blank')" title="${lang === 'nl' ? 'Bezoek winkel' : 'Visit store'}">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" stroke-width="2"/>
                        <polyline points="15,3 21,3 21,9" stroke="currentColor" stroke-width="2"/>
                        <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </button>
                    <div class="select-indicator">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </div>
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
          <h3 class="add-store-title">${t.addCustomTitle}</h3>
          <p class="add-store-description">${t.addCustomDescription}</p>
          
          <div class="add-store-form">
            <div class="input-group">
              <input 
                type="url" 
                id="manual_store_url" 
                class="store-url-input" 
                placeholder="${t.addStorePlaceholder}"
                onblur="validateStoreUrl(this.value)"
              >
              <button type="button" class="add-store-btn" onclick="addCustomStore()">
                ${t.addStoreButton}
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
            ${t.changeButton}
          </button>
        </div>
      </div>

      <!-- Hidden inputs for form submission -->
      <input type="hidden" name="store_url" id="selected_store_url">
      <input type="hidden" name="store_name" id="selected_store_name">
    </div>

    <style>
      /* ===== CLEAN TILE-BASED STORE BROWSER ===== */
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
        gap: 1.5rem;
        max-width: 900px;
        margin: 0 auto;
        align-items: stretch;
      }
      
      .store-tile {
        border: 1px solid var(--border-light);
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
        min-height: 300px;
        display: flex;
        flex-direction: column;
      }
      
      .store-tile:hover {
        border-color: var(--primary-blue);
        box-shadow: 0 6px 20px rgba(37, 99, 235, 0.12);
        transform: translateY(-3px);
      }
      
      .store-tile.selected {
        border-color: var(--primary-blue) !important;
        background: linear-gradient(135deg, var(--card-bg) 0%, rgba(37, 99, 235, 0.08) 100%) !important;
        box-shadow: 0 8px 25px rgba(37, 99, 235, 0.2) !important;
        transform: translateY(-2px) !important;
      }
      
      .store-tile.selected .tile-action {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      
      .store-tile.selected::after {
        content: '✓';
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        width: 24px;
        height: 24px;
        background: var(--primary-blue);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
        z-index: 10;
      }
      
      .tile-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      
      /* Image Section */
      .tile-image {
        position: relative;
        height: 140px;
        overflow: hidden;
        border-radius: 15px 15px 0 0;
      }
      
      .store-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
      
      .store-tile:hover .store-image {
        transform: scale(1.05);
      }
      
      .tile-overlay {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 8px;
        padding: 0.5rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .tile-rating {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.8rem;
      }
      
      .rating-value {
        font-weight: 700;
        color: var(--primary-blue);
      }
      
      .rating-reviews {
        color: var(--text-muted);
        font-size: 0.75rem;
      }
      
      /* Content Section */
      .tile-body {
        padding: 1rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .tile-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.5rem;
      }
      
      .tile-title {
        font-size: 1rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
        line-height: 1.3;
        flex: 1;
      }
      
      .tile-category {
        background: rgba(37, 99, 235, 0.1);
        color: var(--primary-blue);
        font-size: 0.7rem;
        font-weight: 600;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        white-space: nowrap;
        margin-left: 0.5rem;
      }
      
      .tile-description {
        font-size: 0.85rem;
        color: var(--text-secondary);
        margin: 0;
        line-height: 1.4;
        flex: 1;
      }
      
      .tile-stats {
        margin-top: auto;
        padding-top: 0.5rem;
      }
      
      .products-count {
        font-size: 0.75rem;
        color: var(--text-muted);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .tile-action {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.2s ease;
      }
      
      .store-tile:hover .tile-action {
        opacity: 1;
        transform: translateY(0);
      }
      
      .tile-buttons {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .visit-store-btn {
        width: 32px;
        height: 32px;
        background: rgba(255, 255, 255, 0.95);
        border: 1px solid rgba(37, 99, 235, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-blue);
        cursor: pointer;
        transition: all 0.2s ease;
        backdrop-filter: blur(10px);
      }
      
      .visit-store-btn:hover {
        background: var(--primary-blue);
        color: white;
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
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
      
      .btn-secondary {
        background: transparent;
        color: var(--text-secondary);
        border: 1px solid var(--border-medium);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .btn-secondary:hover {
        background: var(--bg-secondary);
        border-color: var(--primary-blue);
        color: var(--primary-blue);
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
    </style>
    
    <script>
      // Store Browser JavaScript Functions
      let selectedStore = null;
      let selectedStoreId = null;
      let catalogStores = [];
      const featuredStores = ${JSON.stringify(featuredStores)};
      
      function handleTileClick(storeId, storeUrl) {
        console.log('Store tile clicked:', storeId, storeUrl);
        
        // Remove previous selection
        document.querySelectorAll('.store-tile').forEach(t => {
          t.classList.remove('selected');
          t.style.transform = '';
        });
        
        // Add selection to clicked tile
        const tile = document.querySelector('[data-store-id="' + storeId + '"]');
        if (tile) {
          tile.classList.add('selected');
          console.log('Added selected class to tile:', storeId);
          
          // Brief click animation
          tile.style.transform = 'scale(0.98)';
          setTimeout(() => {
            tile.style.transform = 'translateY(-2px)'; // Keep elevated
          }, 150);
        }
        
        // Select the store for monitoring
        selectStore(storeId);
      }
      
      function selectStore(storeId, customStore = null) {
        const store = customStore || featuredStores.find(s => s.id === storeId);
        
        if (store) {
          selectedStore = store;
          selectedStoreId = storeId;
          updateSelectedStoreDisplay();
          
          // Update hidden inputs
          document.getElementById('selected_store_url').value = store.url;
          document.getElementById('selected_store_name').value = store.name;
          
          console.log('Store selected:', store.name, 'ID:', storeId);
          
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
          name: storeName.replace(/-/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase()),
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
        urlInput.value = '';
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
      
      function updateSelectedStoreDisplay() {
        if (selectedStore) {
          document.getElementById('selected-store-name').textContent = selectedStore.name;
          const productsText = '${lang}' === 'nl' ? 'producten' : 'products';
          document.getElementById('selected-store-details').textContent = 
            selectedStore.rating + ' ★ • ' + selectedStore.products + ' ' + productsText + ' • ' + selectedStore.category;
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
      
      // Make store selection globally available
      window.selectStoreGlobal = function(storeId) {
        console.log('Global store selection called:', storeId);
        handleTileClick(storeId, featuredStores.find(s => s.id === storeId)?.url || '');
      };
      
      // Initialize
      console.log('Clean tile store browser loaded', { lang: '${lang}', featuredStores: featuredStores.length });
    </script>
  `;
}