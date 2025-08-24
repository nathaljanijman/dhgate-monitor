/**
 * SEO & Performance Tests
 * 
 * Tests search engine optimization, metadata, structured data,
 * and performance metrics for better search visibility.
 */

import { test, expect } from '@playwright/test';
import { QAReporter } from '../utils/qaReporter.js';

const reporter = new QAReporter('SEO & Performance');

test.describe('SEO Optimization', () => {

  test('should have proper meta tags', async ({ page }) => {
    await reporter.startTest('Meta Tags');
    
    await page.goto('/');
    
    // Check title tag
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThan(60);
    
    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription.length).toBeGreaterThan(50);
    expect(metaDescription.length).toBeLessThan(160);
    
    // Check charset
    const charset = await page.locator('meta[charset]').getAttribute('charset');
    expect(charset).toBe('UTF-8');
    
    // Check viewport
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
    
    await reporter.passTest('Meta tags properly configured');
  });

  test('should have Open Graph tags', async ({ page }) => {
    await reporter.startTest('Open Graph Tags');
    
    await page.goto('/');
    
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    
    expect(ogTitle).toBeTruthy();
    expect(ogDescription).toBeTruthy();
    expect(ogImage).toBeTruthy();
    expect(ogUrl).toBeTruthy();
    expect(ogType).toBe('website');
    
    await reporter.passTest('Open Graph tags properly configured');
  });

  test('should have Twitter Card tags', async ({ page }) => {
    await reporter.startTest('Twitter Cards');
    
    await page.goto('/');
    
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
    const twitterDescription = await page.locator('meta[name="twitter:description"]').getAttribute('content');
    const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute('content');
    
    expect(twitterCard).toBeTruthy();
    expect(twitterTitle).toBeTruthy();
    expect(twitterDescription).toBeTruthy();
    expect(twitterImage).toBeTruthy();
    
    await reporter.passTest('Twitter Card tags properly configured');
  });

  test('should have structured data (JSON-LD)', async ({ page }) => {
    await reporter.startTest('Structured Data');
    
    await page.goto('/');
    
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
    expect(jsonLdScripts.length).toBeGreaterThan(0);
    
    // Validate JSON-LD structure
    for (const script of jsonLdScripts) {
      const content = await script.textContent();
      expect(content).toBeTruthy();
      
      // Try to parse as JSON
      const parsedData = JSON.parse(content);
      expect(parsedData['@context']).toBeTruthy();
      expect(parsedData['@type']).toBeTruthy();
    }
    
    await reporter.passTest('Structured data (JSON-LD) properly implemented');
  });

  test('should have canonical URLs', async ({ page }) => {
    await reporter.startTest('Canonical URLs');
    
    await page.goto('/');
    
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBeTruthy();
    expect(canonical).toMatch(/^https?:\/\//);
    
    // Test other pages
    const pages = ['/service', '/dashboard'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      const pageCanonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(pageCanonical).toBeTruthy();
    }
    
    await reporter.passTest('Canonical URLs properly set on all pages');
  });

  test('should have proper robots.txt', async ({ page }) => {
    await reporter.startTest('Robots.txt');
    
    const response = await page.goto('/robots.txt');
    expect(response.status()).toBe(200);
    
    const content = await page.textContent('body');
    expect(content).toContain('User-agent');
    expect(content).toContain('Sitemap');
    
    await reporter.passTest('Robots.txt accessible and properly formatted');
  });

  test('should have sitemap.xml', async ({ page }) => {
    await reporter.startTest('Sitemap.xml');
    
    const response = await page.goto('/sitemap.xml');
    expect(response.status()).toBe(200);
    
    const content = await page.textContent('body');
    expect(content).toContain('<urlset');
    expect(content).toContain('<url>');
    expect(content).toContain('<loc>');
    
    await reporter.passTest('Sitemap.xml accessible and properly formatted');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await reporter.startTest('SEO Heading Structure');
    
    await page.goto('/');
    
    // Should have exactly one H1
    const h1Elements = await page.locator('h1').all();
    expect(h1Elements.length).toBe(1);
    
    // H1 should have meaningful content
    const h1Text = await h1Elements[0].textContent();
    expect(h1Text.trim().length).toBeGreaterThan(10);
    
    // Check other heading levels exist
    const h2Elements = await page.locator('h2').all();
    expect(h2Elements.length).toBeGreaterThan(0);
    
    await reporter.passTest('SEO heading structure properly implemented');
  });

  test('should have fast page load times', async ({ page }) => {
    await reporter.startTest('Page Load Performance');
    
    const startTime = Date.now();
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    if (loadTime < 1000) {
      await reporter.passTest(`Excellent page load time: ${loadTime}ms`);
    } else if (loadTime < 2000) {
      await reporter.passTest(`Good page load time: ${loadTime}ms`);
    } else {
      await reporter.warnTest(`Page load time could be improved: ${loadTime}ms`);
    }
  });

  test('should be mobile-friendly', async ({ page }) => {
    await reporter.startTest('Mobile Friendliness');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if content is visible without horizontal scrolling
    const body = await page.locator('body').boundingBox();
    expect(body.width).toBeLessThanOrEqual(375);
    
    // Check if touch targets are appropriately sized (minimum 44px)
    const buttons = await page.locator('button, a').all();
    let smallTargets = 0;
    
    for (const button of buttons) {
      const box = await button.boundingBox();
      if (box && (box.width < 44 || box.height < 44)) {
        smallTargets++;
      }
    }
    
    if (smallTargets === 0) {
      await reporter.passTest('Mobile-friendly with proper touch targets');
    } else {
      await reporter.warnTest(`${smallTargets} touch targets may be too small`);
    }
  });

  test('should have optimized images', async ({ page }) => {
    await reporter.startTest('Image Optimization');
    
    await page.goto('/');
    
    const images = await page.locator('img').all();
    let unoptimizedImages = 0;
    
    for (const img of images) {
      const src = await img.getAttribute('src');
      const width = await img.getAttribute('width');
      const height = await img.getAttribute('height');
      
      // Check if images have dimensions specified
      if (!width || !height) {
        unoptimizedImages++;
      }
      
      // Check for modern image formats (webp, avif)
      if (src && !src.match(/\.(webp|avif)$/i)) {
        // This is just a suggestion, not a failure
      }
    }
    
    if (unoptimizedImages === 0) {
      await reporter.passTest('Images properly optimized with dimensions');
    } else {
      await reporter.warnTest(`${unoptimizedImages} images missing width/height attributes`);
    }
  });

});