// ============================================================================
// EMBEDDABLE DHGATE MONITOR SIGNUP WIDGET
// ============================================================================
// Standalone signup form that can be embedded via iframe on any website

import { generateEnhancedStoreBrowser } from './enhanced_store_browser_clean.js';

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
      description: lang === 'nl' ? 'Sportkleding en sneakers' : 'Sports apparel and sneakers',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&auto=format',
      color: '#fdf2f8'
    }
  ];

  const t = lang === 'nl' ? {
    title: 'Kies je winkel',
    addCustomTitle: 'Eigen winkel toevoegen',
    addCustomDescription: 'Monitor elke DHgate winkel door de URL in te voeren',
    addStorePlaceholder: 'https://www.dhgate.com/store/jouw-winkel',
    addStoreButton: 'Winkel toevoegen',
    nextButton: 'Volgende',
    backButton: 'Terug'
  } : {
    title: 'Choose your store',
    addCustomTitle: 'Add custom store',
    addCustomDescription: 'Monitor any DHgate store by entering the URL',
    addStorePlaceholder: 'https://www.dhgate.com/store/your-store',
    addStoreButton: 'Add store',
    nextButton: 'Next',
    backButton: 'Back'
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
        
        .widget-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            text-align: center;
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
        
        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <div class="widget-container">
        <h2 class="widget-title">${t.title}</h2>
        
        <div class="store-grid">
            ${featuredStores.map(store => `
                <div class="store-tile" data-store-id="${store.id}" onclick="selectStore(${store.id})">
                    <img src="${store.image}" alt="${store.name}" class="store-image">
                    <div class="store-check">✓</div>
                    <div class="store-content">
                        <h3 class="store-name">${store.name}</h3>
                        <div class="store-category">${store.category}</div>
                        <p class="store-description">${store.description}</p>
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
        
        <input type="hidden" id="selected-store-url" name="selected_store_url">
        <input type="hidden" id="selected-store-name" name="selected_store_name">
    </div>
    
    <script>
        // Store selection functionality
        let selectedStores = [];
        const stores = ${JSON.stringify(featuredStores)};
        
        function selectStore(storeId) {
            console.log('Selecting store:', storeId);
            
            const tile = document.querySelector(\`.store-tile[data-store-id="\${storeId}"]\`);
            const store = stores.find(s => s.id === storeId);
            
            if (!tile || !store) {
                console.error('Store not found:', storeId);
                return;
            }
            
            // Toggle selection
            if (tile.classList.contains('selected')) {
                // Deselect
                tile.classList.remove('selected');
                selectedStores = selectedStores.filter(s => s.id !== storeId);
            } else {
                // Select
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
            
            // Clear previous selections
            document.querySelectorAll('.store-tile').forEach(tile => {
                tile.classList.remove('selected');
            });
            
            // Add custom store
            const customStore = {
                id: 'custom-' + Date.now(),
                name: 'Custom Store',
                url: url,
                category: 'Custom'
            };
            
            selectedStores = [customStore];
            updateFormData();
            updateCounter();
            
            // Visual feedback
            urlInput.style.borderColor = '#10b981';
            urlInput.style.backgroundColor = '#f0fdf4';
            
            setTimeout(() => {
                urlInput.style.borderColor = '';
                urlInput.style.backgroundColor = '';
            }, 2000);
            
            console.log('Custom store added:', url);
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
        
        // Initialize
        console.log('Widget loaded successfully');
        updateCounter();
    </script>
</body>
</html>`;
}