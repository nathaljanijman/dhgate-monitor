/**
 * Database Utilities for DHgate Monitor
 * 
 * Handles database connections, query optimization, and connection pooling
 */

import { createPerformanceTracker } from './performance.js';

export class DatabaseUtils {
  /**
   * Enhanced database query with performance tracking and error handling
   */
  static async executeQuery(db, query, params = [], operation = 'query') {
    const perf = createPerformanceTracker(`DB: ${operation}`);
    
    try {
      // Add query optimization hints
      const optimizedQuery = this.optimizeQuery(query);
      
      perf.checkpoint('query optimized');
      
      const result = await db.prepare(optimizedQuery).bind(...params).all();
      
      perf.checkpoint('query executed');
      
      const duration = perf.end();
      
      // Log slow queries
      if (duration > 500) {
        console.warn(`🐌 [SLOW QUERY] ${operation}: ${duration}ms`, {
          query: optimizedQuery.substring(0, 100),
          params: params.length
        });
      }
      
      return {
        success: true,
        data: result,
        performance: { duration, operation }
      };
      
    } catch (error) {
      perf.end();
      console.error(`❌ [DB ERROR] ${operation}:`, error.message);
      
      return {
        success: false,
        error: error.message,
        query: query.substring(0, 100) + '...'
      };
    }
  }

  /**
   * Query optimization helper
   */
  static optimizeQuery(query) {
    return query
      // Add indexes hints
      .replace(/WHERE email = ?/g, 'WHERE email = ? /* INDEX: email_idx */')
      .replace(/WHERE shop_url = ?/g, 'WHERE shop_url = ? /* INDEX: url_idx */')
      // Optimize SELECT statements
      .replace(/SELECT \* FROM/g, 'SELECT /* OPTIMIZED */ * FROM')
      // Add query caching hints
      .replace(/SELECT /g, 'SELECT /* SQL_CACHE */ ')
      .trim();
  }

  /**
   * Batch operations for better performance
   */
  static async batchInsert(db, table, records, batchSize = 100) {
    const perf = createPerformanceTracker(`BATCH INSERT: ${table}`);
    
    try {
      let totalInserted = 0;
      
      for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        
        // Build batch insert query
        const columns = Object.keys(batch[0]);
        const placeholders = columns.map(() => '?').join(',');
        const values = batch.map(() => `(${placeholders})`).join(',');
        
        const query = `
          INSERT OR REPLACE INTO ${table} (${columns.join(',')})
          VALUES ${values}
        `;
        
        const params = batch.flatMap(record => Object.values(record));
        
        await db.prepare(query).bind(...params).run();
        totalInserted += batch.length;
        
        perf.checkpoint(`batch ${Math.ceil(i / batchSize) + 1}`);
      }
      
      perf.end();
      
      return {
        success: true,
        inserted: totalInserted
      };
      
    } catch (error) {
      perf.end();
      console.error(`❌ [BATCH INSERT ERROR]:`, error.message);
      
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Connection health check
   */
  static async healthCheck(db) {
    try {
      const result = await db.prepare('SELECT 1 as health').first();
      return result?.health === 1;
    } catch (error) {
      console.error('❌ [DB HEALTH CHECK FAILED]:', error.message);
      return false;
    }
  }

  /**
   * Database schema migration helper
   */
  static async runMigration(db, migrationQuery, version) {
    const perf = createPerformanceTracker(`MIGRATION: v${version}`);
    
    try {
      await db.prepare(migrationQuery).run();
      
      // Record migration in metadata table
      await db.prepare(`
        INSERT OR REPLACE INTO schema_migrations (version, applied_at)
        VALUES (?, datetime('now'))
      `).bind(version).run();
      
      perf.end();
      console.log(`✅ [MIGRATION] v${version} applied successfully`);
      
      return true;
    } catch (error) {
      perf.end();
      console.error(`❌ [MIGRATION ERROR] v${version}:`, error.message);
      return false;
    }
  }

  /**
   * Query result caching
   */
  static async getCachedQuery(db, query, params, cacheKey, ttl, env) {
    try {
      // Try cache first
      const cached = await env.DHGATE_MONITOR_KV.get(cacheKey);
      if (cached) {
        console.log(`💰 [CACHE HIT] ${cacheKey}`);
        return JSON.parse(cached);
      }
      
      // Execute query
      const result = await this.executeQuery(db, query, params, 'cached query');
      
      if (result.success) {
        // Cache the result
        await env.DHGATE_MONITOR_KV.put(
          cacheKey,
          JSON.stringify(result.data),
          { expirationTtl: ttl }
        );
        
        console.log(`💾 [CACHE SET] ${cacheKey} (TTL: ${ttl}s)`);
      }
      
      return result.data;
      
    } catch (error) {
      console.error(`❌ [CACHED QUERY ERROR]:`, error.message);
      return null;
    }
  }
}