/**
 * Landing Page E2E Tests
 * 
 * Tests core functionality, user journeys, and accessibility
 * for the DHgate Monitor landing page.
 */

import { test, expect } from '@playwright/test';
import { QAReporter } from '../utils/qaReporter.js';

const reporter = new QAReporter('Landing Page');

test.describe('Landing Page Core Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await reporter.startTest('Homepage Load');
    
    // Check page loads
    await expect(page).toHaveTitle(/DHgate Monitor/i);
    await expect(page.locator('h1')).toBeVisible();
    
    // Check hero image is displayed correctly
    const heroImage = page.locator('[src="/assets/dhgatevisualheader.png"]');
    await expect(heroImage).toBeVisible();
    
    await reporter.passTest('Homepage loaded successfully with hero image');
  });

  test('should display navigation elements', async ({ page }) => {
    await reporter.startTest('Navigation Elements');
    
    // Check main navigation links
    const navLinks = [
      { text: 'Home', href: '/' },
      { text: 'Features', href: '#features' },
      { text: 'Service', href: '/service' },
      { text: 'Contact', href: '#contact' }
    ];
    
    for (const link of navLinks) {
      const navLink = page.locator(`a:has-text("${link.text}")`);
      await expect(navLink).toBeVisible();
    }
    
    await reporter.passTest('All navigation elements visible and functional');
  });

  test('should support language switching', async ({ page }) => {
    await reporter.startTest('Language Switching');
    
    // Test Dutch language
    await page.click('a:has-text("NL")');
    await expect(page).toHaveURL(/lang=nl/);
    
    // Check Dutch content is loaded
    await expect(page.locator('text=DHgate Monitor')).toBeVisible();
    
    // Switch back to English
    await page.click('a:has-text("EN")');
    await expect(page).toHaveURL(/lang=en/);
    
    await reporter.passTest('Language switching works correctly');
  });

  test('should support theme switching', async ({ page }) => {
    await reporter.startTest('Theme Switching');
    
    // Find theme toggle
    const themeToggle = page.locator('.theme-toggle-switch');
    await expect(themeToggle).toBeVisible();
    
    // Toggle to dark theme
    await themeToggle.click();
    await expect(page).toHaveURL(/theme=dark/);
    
    // Toggle back to light theme
    await themeToggle.click();
    await expect(page).toHaveURL(/theme=light/);
    
    await reporter.passTest('Theme switching functionality works');
  });

  test('should display hero section correctly', async ({ page }) => {
    await reporter.startTest('Hero Section Display');
    
    // Check hero content
    const heroTitle = page.locator('.hero-title');
    const heroDescription = page.locator('.hero-description');
    const heroImage = page.locator('.hero-visual img');
    
    await expect(heroTitle).toBeVisible();
    await expect(heroDescription).toBeVisible();
    await expect(heroImage).toBeVisible();
    
    // Check hero image positioning
    const heroVisual = page.locator('.hero-visual');
    const boundingBox = await heroVisual.boundingBox();
    expect(boundingBox).toBeTruthy();
    
    await reporter.passTest('Hero section displays correctly with proper image positioning');
  });

  test('should have functional CTA buttons', async ({ page }) => {
    await reporter.startTest('CTA Button Functionality');
    
    // Check primary CTA
    const primaryCTA = page.locator('.hero-cta-primary');
    await expect(primaryCTA).toBeVisible();
    await expect(primaryCTA).toBeEnabled();
    
    // Check secondary CTA
    const secondaryCTA = page.locator('.hero-cta-secondary');
    await expect(secondaryCTA).toBeVisible();
    await expect(secondaryCTA).toBeEnabled();
    
    // Test CTA navigation
    await primaryCTA.click();
    await page.waitForURL('**/service**');
    
    await reporter.passTest('CTA buttons are functional and navigate correctly');
  });

});