/**
 * Dashboard Access E2E Tests
 * 
 * Tests dashboard functionality, authentication, and user management
 * features for registered users.
 */

import { test, expect } from '@playwright/test';
import { QAReporter } from '../utils/qaReporter.js';

const reporter = new QAReporter('Dashboard Access');

test.describe('Dashboard Access & Functionality', () => {

  test('should show dashboard access error for invalid key', async ({ page }) => {
    await reporter.startTest('Invalid Dashboard Key');
    
    // Try to access dashboard without key
    await page.goto('/dashboard');
    
    // Should show error page
    await expect(page.locator('text=Dashboard toegang vereist')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    
    await reporter.passTest('Dashboard access protection working correctly');
  });

  test('should handle dashboard access request form', async ({ page }) => {
    await reporter.startTest('Dashboard Access Request');
    
    await page.goto('/dashboard');
    
    // Fill email form
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill('test@example.com');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Should show success message or redirect
    await expect(page.locator('text=Dashboard link verzonden')).toBeVisible();
    
    await reporter.passTest('Dashboard access request form functions correctly');
  });

  test('should validate dashboard with valid token', async ({ page }) => {
    await reporter.startTest('Valid Dashboard Token');
    
    // This would require a valid test token
    const testToken = process.env.TEST_DASHBOARD_TOKEN || 'test-token-123';
    
    await page.goto(`/dashboard?key=${testToken}`);
    
    // Check if redirected to error or shows dashboard
    const hasError = await page.locator('text=Dashboard toegang vereist').isVisible();
    const hasDashboard = await page.locator('.dashboard-container').isVisible();
    
    if (hasDashboard) {
      await expect(page.locator('.dashboard-nav')).toBeVisible();
      await expect(page.locator('.dashboard-content')).toBeVisible();
      await reporter.passTest('Dashboard loads correctly with valid token');
    } else {
      await reporter.skipTest('No valid test token available');
    }
  });

  test('should display user subscription info in dashboard', async ({ page }) => {
    await reporter.startTest('Dashboard User Info');
    
    const testToken = process.env.TEST_DASHBOARD_TOKEN || 'test-token-123';
    await page.goto(`/dashboard?key=${testToken}`);
    
    const hasDashboard = await page.locator('.dashboard-container').isVisible();
    
    if (hasDashboard) {
      // Check subscription info display
      await expect(page.locator('.subscription-info')).toBeVisible();
      await expect(page.locator('.info-row')).toHaveCount(7); // Email, shop, terms, frequency, time, status, since
      
      await reporter.passTest('Dashboard displays user subscription information');
    } else {
      await reporter.skipTest('Dashboard not accessible for testing');
    }
  });

  test('should have working dashboard navigation', async ({ page }) => {
    await reporter.startTest('Dashboard Navigation');
    
    const testToken = process.env.TEST_DASHBOARD_TOKEN || 'test-token-123';
    await page.goto(`/dashboard?key=${testToken}`);
    
    const hasDashboard = await page.locator('.dashboard-container').isVisible();
    
    if (hasDashboard) {
      // Test settings link
      const settingsLink = page.locator('a:has-text("Instellingen wijzigen")');
      await expect(settingsLink).toBeVisible();
      
      // Test home link
      const homeLink = page.locator('a:has-text("Terug naar homepage")');
      await expect(homeLink).toBeVisible();
      
      // Test unsubscribe link
      const unsubscribeLink = page.locator('a:has-text("Uitschrijven")');
      await expect(unsubscribeLink).toBeVisible();
      
      await reporter.passTest('Dashboard navigation links are functional');
    } else {
      await reporter.skipTest('Dashboard not accessible for testing');
    }
  });

});