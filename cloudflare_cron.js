/**
 * Cloudflare Workers - Scheduled Monitoring
 * Runs basic DHgate monitoring via HTTP requests (without Selenium)
 */

export default {
  async fetch(request, env, ctx) {
    // Handle regular web requests
    const response = await import('./cloudflare_app.js');
    return response.default.fetch(request, env, ctx);
  },

  async scheduled(event, env, ctx) {
    try {
      console.log('🤖 Starting scheduled DHgate monitoring...');
      console.log('⏰ Timestamp:', new Date().toISOString());
      
      // Get shops from KV storage
      const shops = await getShops(env);
      
      if (!shops || shops.length === 0) {
        console.log('ℹ️  No shops configured for monitoring');
        return;
      }
      
      // Basic HTTP-based monitoring (without Selenium)
      const results = await monitorShops(shops);
      
      if (results.newProducts > 0) {
        console.log(`🎉 Found ${results.newProducts} new products!`);
        
        // Send notification (you could integrate with email service here)
        await sendNotification(env, results);
      } else {
        console.log('ℹ️  No new products found');
      }
      
      console.log('✅ Scheduled monitoring completed');
      
    } catch (error) {
      console.error('❌ Error in scheduled monitoring:', error);
      throw error;
    }
  }
};

async function getShops(env) {
  try {
    const shopsData = await env.DHGATE_MONITOR_KV.get('shops');
    return shopsData ? JSON.parse(shopsData) : [];
  } catch (error) {
    console.error('Error getting shops:', error);
    return [];
  }
}

async function monitorShops(shops) {
  const results = {
    newProducts: 0,
    shops: []
  };
  
  for (const shop of shops) {
    try {
      console.log(`🏪 Checking shop: ${shop.name}`);
      
      // Basic HTTP request to shop URL
      const response = await fetch(shop.search_url);
      const html = await response.text();
      
      // Simple text search for "kids" keyword
      const kidsMatches = (html.match(/kids/gi) || []).length;
      
      console.log(`📦 Found ${kidsMatches} potential kids references in ${shop.name}`);
      
      results.shops.push({
        name: shop.name,
        matches: kidsMatches,
        checked_at: new Date().toISOString()
      });
      
      // For demo: consider any matches as "new products"
      if (kidsMatches > 0) {
        results.newProducts += Math.min(kidsMatches, 5); // Cap at 5 per shop
      }
      
    } catch (error) {
      console.error(`Error checking shop ${shop.name}:`, error);
    }
  }
  
  return results;
}

async function sendNotification(env, results) {
  try {
    // Store notification in KV for web interface to display
    const notification = {
      timestamp: new Date().toISOString(),
      newProducts: results.newProducts,
      shops: results.shops,
      message: `Scheduled monitoring found ${results.newProducts} potential new kids products`
    };
    
    await env.DHGATE_MONITOR_KV.put('last_notification', JSON.stringify(notification));
    
    console.log('📢 Notification stored in KV storage');
    
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}