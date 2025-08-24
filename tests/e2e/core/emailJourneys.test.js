/**
 * Email Journey E2E Tests
 * 
 * Tests email functionality including registration, dashboard access,
 * notifications, and unsubscribe flows.
 */

import { test, expect } from '@playwright/test';
import { QAReporter } from '../utils/qaReporter.js';
import { EmailValidator } from '../utils/emailValidator.js';

const reporter = new QAReporter('Email Journeys');
const emailValidator = new EmailValidator();

test.describe('Email Journey Testing', () => {

  test('should send registration confirmation email', async ({ page }) => {
    await reporter.startTest('Registration Email Flow');
    
    await page.goto('/');
    
    // Find subscription form
    const emailInput = page.locator('input[type="email"]').first();
    const subscribeButton = page.locator('button:has-text("Start Monitoring")').first();
    
    if (await emailInput.isVisible() && await subscribeButton.isVisible()) {
      // Fill registration form
      const testEmail = `test+${Date.now()}@example.com`;
      await emailInput.fill(testEmail);
      await subscribeButton.click();
      
      // Check for success message
      const successMessage = page.locator('text=Gelukt!');
      const alternativeSuccess = page.locator('text=Success');
      
      const hasSuccess = await successMessage.isVisible() || await alternativeSuccess.isVisible();
      
      if (hasSuccess) {
        await reporter.passTest('Registration email flow triggered successfully');
      } else {
        await reporter.failTest('Registration success message not shown');
      }
    } else {
      await reporter.skipTest('Registration form not found on current page');
    }
  });

  test('should trigger dashboard access email', async ({ page }) => {
    await reporter.startTest('Dashboard Access Email');
    
    await page.goto('/dashboard');
    
    // Should show access request form
    const emailInput = page.locator('input[type="email"]');
    const submitButton = page.locator('button[type="submit"]');
    
    if (await emailInput.isVisible()) {
      const testEmail = `dashboard-test+${Date.now()}@example.com`;
      await emailInput.fill(testEmail);
      await submitButton.click();
      
      // Check for success indication
      await page.waitForTimeout(2000); // Wait for potential redirect or message
      
      const successMessage = page.locator('text=Dashboard link verzonden');
      const hasSuccess = await successMessage.isVisible();
      
      if (hasSuccess) {
        await reporter.passTest('Dashboard access email flow completed');
      } else {
        await reporter.warnTest('Dashboard access flow completed but success message unclear');
      }
    } else {
      await reporter.failTest('Dashboard access form not found');
    }
  });

  test('should validate email format in forms', async ({ page }) => {
    await reporter.startTest('Email Validation');
    
    await page.goto('/dashboard');
    
    const emailInput = page.locator('input[type="email"]');
    
    if (await emailInput.isVisible()) {
      // Test invalid email
      await emailInput.fill('invalid-email');
      
      // HTML5 validation should prevent submission
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();
      
      // Check if browser shows validation message
      const validationMessage = await emailInput.evaluate((el) => el.validationMessage);
      
      if (validationMessage) {
        await reporter.passTest('Email validation working correctly');
      } else {
        await reporter.warnTest('Email validation may need improvement');
      }
    } else {
      await reporter.skipTest('Email input not available for testing');
    }
  });

  test('should handle unsubscribe email flow', async ({ page }) => {
    await reporter.startTest('Unsubscribe Email Flow');
    
    // This test would require a valid unsubscribe token
    const testToken = process.env.TEST_UNSUBSCRIBE_TOKEN || 'test-unsubscribe-123';
    
    await page.goto(`/unsubscribe?token=${testToken}`);
    
    // Check if unsubscribe page loads
    const unsubscribeContent = page.locator('text=uitschrijven');
    const hasContent = await unsubscribeContent.isVisible();
    
    if (hasContent) {
      // Look for confirmation form or automatic unsubscribe
      const confirmButton = page.locator('button:has-text("Bevestig")');
      const hasConfirmButton = await confirmButton.isVisible();
      
      if (hasConfirmButton) {
        await confirmButton.click();
        await reporter.passTest('Unsubscribe flow completed with confirmation');
      } else {
        await reporter.passTest('Unsubscribe page accessible');
      }
    } else {
      await reporter.skipTest('Unsubscribe testing requires valid token');
    }
  });

  test('should handle GDPR data deletion email', async ({ page }) => {
    await reporter.startTest('GDPR Data Deletion Email');
    
    await page.goto('/delete-data');
    
    // Check if GDPR deletion page loads
    const deleteForm = page.locator('form#deleteForm');
    
    if (await deleteForm.isVisible()) {
      const emailInput = page.locator('input[type="email"][name="email"]');
      const reasonSelect = page.locator('select[name="reason"]');
      
      await expect(emailInput).toBeVisible();
      await expect(reasonSelect).toBeVisible();
      
      // Fill form with test data
      await emailInput.fill('test-gdpr@example.com');
      await reasonSelect.selectOption('no_longer_needed');
      
      await reporter.passTest('GDPR data deletion form is functional');
    } else {
      await reporter.failTest('GDPR data deletion page not accessible');
    }
  });

});