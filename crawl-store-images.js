import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function crawlStoreImages() {
  const browser = await chromium.launch({ 
    headless: false, // Set to true for production
    slowMo: 1000 // Slow down to avoid detection
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 720 }
  });

  const stores = [
    {
      id: 1,
      url: 'https://www.dhgate.com/store/products/20522858.html',
      storeId: '20522858',
      name: 'Dhgate Beauty Misssecret'
    },
    {
      id: 2,
      url: 'https://www.dhgate.com/store/top-selling/19846261.html',
      storeId: '19846261',
      name: 'Luxury Eyewear LTD'
    },
    {
      id: 3,
      url: 'https://www.dhgate.com/store/21168508',
      storeId: '21168508',
      name: 'Spider Jerseys'
    }
  ];

  const storeImages = [];

  for (const store of stores) {
    try {
      console.log(`\n🔄 Crawling images for store ${store.storeId}...`);
      
      const page = await context.newPage();
      
      // Add random delay to avoid detection
      await page.waitForTimeout(Math.random() * 2000 + 1000);
      
      await page.goto(store.url, { waitUntil: 'networkidle' });
      
      // Wait for page to load
      await page.waitForTimeout(3000);
      
      // Extract store images
      const images = await extractStoreImages(page, store);
      storeImages.push(images);
      
      console.log(`✅ Store ${store.storeId} images extracted:`, images);
      
      await page.close();
      
      // Random delay between requests
      await page.waitForTimeout(Math.random() * 3000 + 2000);
      
    } catch (error) {
      console.error(`❌ Error crawling store ${store.storeId}:`, error.message);
      
      // Add fallback data
      storeImages.push({
        id: store.id,
        storeId: store.storeId,
        name: store.name,
        backgroundImage: null,
        logoImage: null,
        fallback: true
      });
    }
  }

  await browser.close();
  
  console.log('\n📊 Final store images data:');
  console.log(JSON.stringify(storeImages, null, 2));
  
  return storeImages;
}

async function extractStoreImages(page, store) {
  try {
    let backgroundImage = null;
    let logoImage = null;
    let description = null;
    let kpi = null;
    let kpiLabel = null;
    let bestSellingProduct = null;
    
    // Try to find store banner/background image
    try {
      const bannerSelectors = [
        '.store-banner img',
        '.store-header img',
        '.seller-banner img',
        '.store-cover img',
        '.banner img',
        '.hero img',
        '.store-logo img',
        '.seller-logo img'
      ];
      
      for (const selector of bannerSelectors) {
        const bannerElement = await page.$(selector);
        if (bannerElement) {
          const src = await bannerElement.getAttribute('src');
          if (src && (src.includes('http') || src.startsWith('//'))) {
            backgroundImage = src.startsWith('//') ? `https:${src}` : src;
            console.log(`Found banner image for ${store.storeId}: ${backgroundImage}`);
            break;
          }
        }
      }
    } catch (e) {
      console.log(`Could not extract banner image for ${store.storeId}`);
    }

    // Try to find store logo
    try {
      const logoSelectors = [
        '.store-logo img',
        '.seller-logo img',
        '.logo img',
        '.store-avatar img',
        '.seller-avatar img'
      ];
      
      for (const selector of logoSelectors) {
        const logoElement = await page.$(selector);
        if (logoElement) {
          const src = await logoElement.getAttribute('src');
          if (src && (src.includes('http') || src.startsWith('//'))) {
            logoImage = src.startsWith('//') ? `https:${src}` : src;
            console.log(`Found logo image for ${store.storeId}: ${logoImage}`);
            break;
          }
        }
      }
    } catch (e) {
      console.log(`Could not extract logo image for ${store.storeId}`);
    }

    // Extract store description
    try {
      const descSelectors = [
        '.store-description',
        '.seller-description',
        '.store-intro',
        '.store-summary',
        '.store-about',
        '.seller-about',
        '.store-info',
        '.seller-info'
      ];
      
      for (const selector of descSelectors) {
        const descElement = await page.$(selector);
        if (descElement) {
          const descText = await descElement.textContent();
          if (descText && descText.trim()) {
            description = descText.trim().substring(0, 120) + '...';
            console.log(`Found description for ${store.storeId}: ${description}`);
            break;
          }
        }
      }
    } catch (e) {
      console.log(`Could not extract description for ${store.storeId}`);
    }

    // Extract KPI (rating, review count, etc.)
    try {
      // Try to find rating
      const ratingSelectors = [
        '.rating',
        '.store-rating',
        '.seller-rating',
        '.review-score',
        '.score',
        '.rating-score'
      ];
      
      for (const selector of ratingSelectors) {
        const ratingElement = await page.$(selector);
        if (ratingElement) {
          const ratingText = await ratingElement.textContent();
          if (ratingText && ratingText.trim()) {
            kpi = ratingText.trim();
            kpiLabel = 'Rating';
            console.log(`Found rating for ${store.storeId}: ${kpi}`);
            break;
          }
        }
      }

      // If no rating, try to find review count
      if (!kpi) {
        const reviewSelectors = [
          '.review-count',
          '.reviews-count',
          '.total-reviews',
          '.review-num'
        ];
        
        for (const selector of reviewSelectors) {
          const reviewElement = await page.$(selector);
          if (reviewElement) {
            const reviewText = await reviewElement.textContent();
            if (reviewText && reviewText.trim()) {
              kpi = reviewText.trim();
              kpiLabel = 'Reviews';
              console.log(`Found review count for ${store.storeId}: ${kpi}`);
              break;
            }
          }
        }
      }

      // If still no KPI, try to find product count
      if (!kpi) {
        const productSelectors = [
          '.product-count',
          '.item-count',
          '.goods-count',
          '.total-products'
        ];
        
        for (const selector of productSelectors) {
          const productElement = await page.$(selector);
          if (productElement) {
            const productText = await productElement.textContent();
            if (productText && productText.trim()) {
              kpi = productText.trim();
              kpiLabel = 'Products';
              console.log(`Found product count for ${store.storeId}: ${kpi}`);
              break;
            }
          }
        }
      }
    } catch (e) {
      console.log(`Could not extract KPI for ${store.storeId}`);
    }

    // Try to find best selling product image
    try {
      console.log(`🔍 Looking for best selling product in ${store.storeId}...`);
      
      // Look for best selling or top selling sections
      const bestSellingSelectors = [
        '.best-selling img',
        '.top-selling img',
        '.hot-product img',
        '.featured-product img',
        '.recommended img',
        '.popular img',
        '.trending img',
        '.bestseller img',
        '.top-item img',
        '.hot-item img',
        '.product-item img',
        '.item img',
        '.goods-item img',
        '.product-card img',
        'img[src*="dhgate.com"]',
        'img[src*="product"]',
        'img[src*="item"]',
        'img[src*="goods"]'
      ];
      
      for (const selector of bestSellingSelectors) {
        const bestSellingElement = await page.$(selector);
        if (bestSellingElement) {
          const src = await bestSellingElement.getAttribute('src');
          if (src && (src.includes('http') || src.startsWith('//'))) {
            bestSellingProduct = src.startsWith('//') ? `https:${src}` : src;
            console.log(`Found best selling product for ${store.storeId}: ${bestSellingProduct}`);
            break;
          }
        }
      }
      
      // If no best selling found, look for products with highest sales numbers
      if (!bestSellingProduct) {
        const productElements = await page.$$('.product-item, .item, .goods-item, .product-card');
        
        if (productElements.length > 0) {
          // Try to find product with sales data
          for (const product of productElements.slice(0, 5)) {
            try {
              const salesText = await product.$eval('.sales, .sold, .orders, .sale-count', el => el.textContent);
              if (salesText && salesText.includes('sold') || salesText.includes('orders')) {
                const img = await product.$('img');
                if (img) {
                  const src = await img.getAttribute('src');
                  if (src && (src.includes('http') || src.startsWith('//'))) {
                    bestSellingProduct = src.startsWith('//') ? `https:${src}` : src;
                    console.log(`Found high-selling product for ${store.storeId}: ${bestSellingProduct}`);
                    break;
                  }
                }
              }
            } catch (e) {
              // Continue to next product
            }
          }
        }
      }
      
      // If still no best selling, get the first product image
      if (!bestSellingProduct) {
        const firstProductImg = await page.$('.product-item img, .item img, .goods-item img, .product-card img');
        if (firstProductImg) {
          const src = await firstProductImg.getAttribute('src');
          if (src && (src.includes('http') || src.startsWith('//'))) {
            bestSellingProduct = src.startsWith('//') ? `https:${src}` : src;
            console.log(`Using first product image for ${store.storeId}: ${bestSellingProduct}`);
          }
        }
      }
      
    } catch (e) {
      console.log(`Could not extract best selling product for ${store.storeId}:`, e.message);
    }

    // Use best selling product as background if no banner found
    if (!backgroundImage && bestSellingProduct) {
      backgroundImage = bestSellingProduct;
      console.log(`Using best selling product as background for ${store.storeId}: ${backgroundImage}`);
    }
    
    // If no specific images found, try to get any product images as fallback
    if (!backgroundImage && !logoImage) {
      try {
        const productImages = await page.$$eval('img[src*="product"], img[src*="item"], img[src*="goods"]', imgs => 
          imgs.slice(0, 3).map(img => img.src).filter(src => src && src.includes('http'))
        );
        
        if (productImages.length > 0) {
          backgroundImage = productImages[0];
          console.log(`Using product image as background for ${store.storeId}: ${backgroundImage}`);
        }
      } catch (e) {
        console.log(`Could not extract product images for ${store.storeId}`);
      }
    }

    return {
      id: store.id,
      storeId: store.storeId,
      name: store.name,
      backgroundImage: backgroundImage,
      logoImage: logoImage,
      bestSellingProduct: bestSellingProduct,
      description: description,
      kpi: kpi,
      kpiLabel: kpiLabel,
      fallback: false
    };

  } catch (error) {
    console.error(`Error extracting data for ${store.storeId}:`, error);
    return {
      id: store.id,
      storeId: store.storeId,
      name: store.name,
      backgroundImage: null,
      logoImage: null,
      bestSellingProduct: null,
      description: null,
      kpi: null,
      kpiLabel: null,
      fallback: true
    };
  }
}

// Run the image crawler
crawlStoreImages()
  .then(data => {
    console.log('\n🎉 Image crawling completed successfully!');
    
    // Save results to a JSON file for use in the widget
    fs.writeFileSync('store-images.json', JSON.stringify(data, null, 2));
    console.log('📁 Store images saved to store-images.json');
    
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Image crawling failed:', error);
    process.exit(1);
  });
