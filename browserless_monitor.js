/**
 * Cloudflare Workers with Browserless.io
 * Professional cloud Selenium solution
 */

export default {
  async fetch(request, env, ctx) {
    // Handle regular web requests
    const response = await import('./cloudflare_app.js');
    return response.default.fetch(request, env, ctx);
  },

  async scheduled(event, env, ctx) {
    try {
      console.log('🌩️ Starting Browserless.io monitoring...');
      
      // Use Browserless.io for cloud Selenium
      const results = await runBrowserlessMonitoring(env);
      
      if (results.newProducts > 0) {
        console.log(`🎉 Found ${results.newProducts} new products!`);
        await sendEmailNotification(env, results);
      } else {
        console.log('ℹ️ No new products found');
      }
      
    } catch (error) {
      console.error('❌ Browserless monitoring error:', error);
    }
  }
};

async function runBrowserlessMonitoring(env) {
  const browserlessToken = env.BROWSERLESS_TOKEN;
  const browserlessUrl = `https://chrome.browserless.io/content?token=${browserlessToken}`;
  
  // Get shops from KV
  const shopsData = await env.DHGATE_MONITOR_KV.get('shops');
  const shops = shopsData ? JSON.parse(shopsData) : [];
  
  const results = { newProducts: 0, details: [] };
  
  for (const shop of shops) {
    try {
      // Browserless.io request for real browser automation
      const response = await fetch(browserlessUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: shop.search_url,
          gotoOptions: {
            waitUntil: 'networkidle2',
            timeout: 30000
          },
          evaluate: `
            // Run in browser context - find kids products
            const productLinks = Array.from(document.querySelectorAll('a[href*="/product/"]'));
            const kidsProducts = productLinks.filter(link => 
              link.textContent.toLowerCase().includes('kids') ||
              link.textContent.toLowerCase().includes('children') ||
              link.textContent.toLowerCase().includes('youth')
            );
            
            return kidsProducts.map(link => ({
              title: link.textContent.trim(),
              url: link.href,
              found_at: new Date().toISOString()
            })).slice(0, 10); // Limit to 10 products
          `
        })
      });
      
      if (response.ok) {
        const products = await response.json();
        
        if (products && products.length > 0) {
          results.newProducts += products.length;
          results.details.push({
            shop: shop.name,
            products: products
          });
          
          console.log(`🏪 ${shop.name}: Found ${products.length} kids products`);
        }
      }
      
    } catch (error) {
      console.error(`Error checking shop ${shop.name}:`, error);
    }
  }
  
  return results;
}

async function sendEmailNotification(env, results) {
  // Store results in KV for email processing
  await env.DHGATE_MONITOR_KV.put('latest_results', JSON.stringify({
    timestamp: new Date().toISOString(),
    results: results
  }));
  
  console.log('📧 Results stored for email notification');
}