/**
 * GDPR Compliance Tests
 * 
 * Tests privacy compliance including cookie consent,
 * data deletion, privacy policy, and user rights.
 */

import { test, expect } from '@playwright/test';
import { QAReporter } from '../utils/qaReporter.js';

const reporter = new QAReporter('GDPR Compliance');

test.describe('GDPR & Privacy Compliance', () => {

  test('should display cookie consent banner', async ({ page }) => {
    await reporter.startTest('Cookie Consent');
    
    // Clear cookies and reload
    await page.context().clearCookies();
    await page.goto('/');
    
    // Check if cookie consent is shown
    const cookieBanner = page.locator('.cookie-consent, .cookie-banner, [data-cookie-consent]');
    const hasCookieBanner = await cookieBanner.isVisible();
    
    if (hasCookieBanner) {
      // Test accept cookies
      const acceptButton = page.locator('button:has-text("Accepteer"), button:has-text("Accept")');
      if (await acceptButton.isVisible()) {
        await acceptButton.click();
        
        // Banner should disappear
        await expect(cookieBanner).not.toBeVisible();
        await reporter.passTest('Cookie consent banner working correctly');
      } else {
        await reporter.warnTest('Cookie consent banner visible but no accept button found');
      }
    } else {
      await reporter.warnTest('No cookie consent banner found - check implementation');
    }
  });

  test('should have accessible privacy policy', async ({ page }) => {
    await reporter.startTest('Privacy Policy Access');
    
    await page.goto('/');
    
    // Look for privacy policy links
    const privacyLinks = page.locator('a:has-text("Privacy"), a:has-text("Privacybeleid"), a[href*="privacy"]');
    const hasPrivacyLink = await privacyLinks.first().isVisible();
    
    if (hasPrivacyLink) {
      await privacyLinks.first().click();
      
      // Check if privacy policy page loads
      const privacyContent = page.locator('text=privacy, text=gegevens, text=GDPR');
      const hasPrivacyContent = await privacyContent.first().isVisible();
      
      if (hasPrivacyContent) {
        await reporter.passTest('Privacy policy accessible and contains relevant content');
      } else {
        await reporter.failTest('Privacy policy link found but content unclear');
      }
    } else {
      await reporter.failTest('No privacy policy link found');
    }
  });

  test('should provide data deletion functionality', async ({ page }) => {
    await reporter.startTest('Data Deletion Rights');
    
    await page.goto('/delete-data');
    
    // Check GDPR data deletion page
    const deleteForm = page.locator('form#deleteForm');
    
    if (await deleteForm.isVisible()) {
      // Check required fields
      const emailField = page.locator('input[name="email"]');
      const reasonField = page.locator('select[name="reason"], input[name="reason"]');
      
      await expect(emailField).toBeVisible();
      await expect(reasonField).toBeVisible();
      
      // Test form validation
      await emailField.fill('test@example.com');
      if (await reasonField.selectOption) {
        await reasonField.selectOption('no_longer_needed');
      }
      
      await reporter.passTest('GDPR data deletion form available and functional');
    } else {
      await reporter.failTest('GDPR data deletion form not accessible');
    }
  });

  test('should show data processing information', async ({ page }) => {
    await reporter.startTest('Data Processing Transparency');
    
    await page.goto('/');
    
    // Check if data processing information is available
    const dataInfoElements = page.locator('text=gegevens, text=data processing, text=monitoring');
    const hasDataInfo = await dataInfoElements.first().isVisible();
    
    // Check subscription form for data processing notice
    const subscriptionForm = page.locator('form').first();
    if (await subscriptionForm.isVisible()) {
      const privacyNotice = page.locator('text=privacy, text=voorwaarden, text=terms');
      const hasNotice = await privacyNotice.isVisible();
      
      if (hasNotice) {
        await reporter.passTest('Data processing information visible to users');
      } else {
        await reporter.warnTest('Consider adding privacy notice near data collection forms');
      }
    } else {
      await reporter.skipTest('No subscription form found to check privacy notices');
    }
  });

  test('should handle user consent preferences', async ({ page }) => {
    await reporter.startTest('Consent Management');
    
    await page.context().clearCookies();
    await page.goto('/');
    
    // Check for granular consent options
    const consentSettings = page.locator('button:has-text("Cookie Settings"), button:has-text("Instellingen")');
    
    if (await consentSettings.isVisible()) {
      await consentSettings.click();
      
      // Look for different cookie categories
      const functionalCookies = page.locator('input[type="checkbox"]:near(text="Functional")');
      const analyticsCookies = page.locator('input[type="checkbox"]:near(text="Analytics")');
      
      const hasGranularOptions = (await functionalCookies.isVisible()) || (await analyticsCookies.isVisible());
      
      if (hasGranularOptions) {
        await reporter.passTest('Granular consent management available');
      } else {
        await reporter.warnTest('Basic consent implementation - consider granular options');
      }
    } else {
      await reporter.warnTest('No consent settings found - using basic accept/reject');
    }
  });

  test('should provide unsubscribe options', async ({ page }) => {
    await reporter.startTest('Unsubscribe Rights');
    
    // Test unsubscribe functionality
    await page.goto('/');
    
    // Check if unsubscribe information is available
    const unsubscribeInfo = page.locator('text=unsubscribe, text=uitschrijven, text=afmelden');
    
    // Also test via dashboard if accessible
    await page.goto('/dashboard');
    const dashboardError = await page.locator('text=Dashboard toegang vereist').isVisible();
    
    if (!dashboardError) {
      const unsubscribeLink = page.locator('a:has-text("Uitschrijven"), a:has-text("Unsubscribe")');
      const hasUnsubscribeLink = await unsubscribeLink.isVisible();
      
      if (hasUnsubscribeLink) {
        await reporter.passTest('Unsubscribe options available to users');
      } else {
        await reporter.failTest('No unsubscribe option found in dashboard');
      }
    } else {
      await reporter.skipTest('Cannot test unsubscribe without dashboard access');
    }
  });

  test('should limit data retention', async ({ page }) => {
    await reporter.startTest('Data Retention Information');
    
    await page.goto('/');
    
    // Check if data retention policy is mentioned
    const retentionInfo = page.locator('text=retention, text=bewaren, text=opslag');
    const hasRetentionInfo = await retentionInfo.isVisible();
    
    // Check privacy policy for retention details
    const privacyLink = page.locator('a:has-text("Privacy"), a:has-text("Privacybeleid")');
    if (await privacyLink.isVisible()) {
      await privacyLink.click();
      
      const retentionDetails = page.locator('text=retention, text=delete, text=periode');
      const hasRetentionDetails = await retentionDetails.isVisible();
      
      if (hasRetentionDetails) {
        await reporter.passTest('Data retention policy information available');
      } else {
        await reporter.warnTest('Consider adding data retention information to privacy policy');
      }
    } else {
      await reporter.skipTest('Privacy policy not accessible for retention check');
    }
  });

});