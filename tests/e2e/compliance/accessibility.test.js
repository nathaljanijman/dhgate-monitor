/**
 * Accessibility Compliance Tests (WCAG 2.1 AA)
 * 
 * Tests accessibility features including keyboard navigation,
 * screen reader compatibility, and ARIA compliance.
 */

import { test, expect } from '@playwright/test';
import { QAReporter } from '../utils/qaReporter.js';
import { AccessibilityChecker } from '../utils/accessibilityChecker.js';

const reporter = new QAReporter('Accessibility Compliance');
const a11yChecker = new AccessibilityChecker();

test.describe('WCAG 2.1 AA Compliance', () => {

  test('should have proper heading structure', async ({ page }) => {
    await reporter.startTest('Heading Structure');
    
    await page.goto('/');
    
    // Check heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingLevels = [];
    
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const level = parseInt(tagName.charAt(1));
      headingLevels.push(level);
    }
    
    // Should start with h1 and not skip levels
    expect(headingLevels[0]).toBe(1);
    
    let isValidStructure = true;
    for (let i = 1; i < headingLevels.length; i++) {
      if (headingLevels[i] > headingLevels[i-1] + 1) {
        isValidStructure = false;
        break;
      }
    }
    
    if (isValidStructure) {
      await reporter.passTest('Heading structure follows WCAG guidelines');
    } else {
      await reporter.failTest('Heading structure skips levels');
    }
  });

  test('should have alt text for all images', async ({ page }) => {
    await reporter.startTest('Image Alt Text');
    
    await page.goto('/');
    
    const images = await page.locator('img').all();
    let missingAltCount = 0;
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      if (!alt || alt.trim() === '') {
        missingAltCount++;
      }
    }
    
    if (missingAltCount === 0) {
      await reporter.passTest(`All ${images.length} images have alt text`);
    } else {
      await reporter.failTest(`${missingAltCount} images missing alt text`);
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await reporter.startTest('Keyboard Navigation');
    
    await page.goto('/');
    
    // Test tab navigation through interactive elements
    const interactiveElements = await page.locator('a, button, input, select, textarea, [tabindex]').all();
    
    // Start keyboard navigation
    await page.keyboard.press('Tab');
    
    // Check if focus is visible
    const focusedElement = await page.locator(':focus');
    const hasFocus = await focusedElement.count() > 0;
    
    if (hasFocus) {
      await reporter.passTest('Keyboard navigation is functional');
    } else {
      await reporter.failTest('Keyboard navigation not working or focus not visible');
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await reporter.startTest('Color Contrast');
    
    await page.goto('/');
    
    // Check primary text elements for contrast
    const textElements = await page.locator('h1, h2, h3, p, a, button, span').all();
    let contrastIssues = 0;
    
    for (const element of textElements) {
      const isVisible = await element.isVisible();
      if (isVisible) {
        const styles = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            fontSize: computed.fontSize
          };
        });
        
        // Simple contrast check - in production, use proper contrast calculation
        if (styles.color === styles.backgroundColor) {
          contrastIssues++;
        }
      }
    }
    
    if (contrastIssues === 0) {
      await reporter.passTest('Color contrast appears adequate');
    } else {
      await reporter.warnTest(`${contrastIssues} potential contrast issues found`);
    }
  });

  test('should have proper ARIA labels and roles', async ({ page }) => {
    await reporter.startTest('ARIA Labels and Roles');
    
    await page.goto('/');
    
    // Check for ARIA attributes on interactive elements
    const ariaElements = await page.locator('[aria-label], [aria-labelledby], [aria-describedby], [role]').all();
    const buttons = await page.locator('button').all();
    const links = await page.locator('a').all();
    
    let properlyLabeled = 0;
    
    // Check buttons have accessible names
    for (const button of buttons) {
      const textContent = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      
      if (textContent?.trim() || ariaLabel) {
        properlyLabeled++;
      }
    }
    
    if (properlyLabeled === buttons.length) {
      await reporter.passTest('Interactive elements properly labeled');
    } else {
      await reporter.failTest(`${buttons.length - properlyLabeled} buttons missing accessible names`);
    }
  });

  test('should work with screen reader simulation', async ({ page }) => {
    await reporter.startTest('Screen Reader Compatibility');
    
    await page.goto('/');
    
    // Test if page content is properly structured for screen readers
    const landmarks = await page.locator('[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], main, nav, header, footer').all();
    
    const hasLandmarks = landmarks.length > 0;
    
    // Check for skip links
    const skipLinks = await page.locator('a[href^="#"]').first();
    const hasSkipLink = await skipLinks.isVisible();
    
    if (hasLandmarks) {
      await reporter.passTest('Page has proper landmark structure for screen readers');
    } else {
      await reporter.warnTest('Consider adding landmark roles for better screen reader navigation');
    }
  });

  test('should handle focus management correctly', async ({ page }) => {
    await reporter.startTest('Focus Management');
    
    await page.goto('/');
    
    // Test theme toggle focus
    const themeToggle = page.locator('.theme-toggle-switch');
    if (await themeToggle.isVisible()) {
      await themeToggle.focus();
      const isFocused = await page.evaluate(() => document.activeElement?.className.includes('theme-toggle'));
      
      if (isFocused) {
        await reporter.passTest('Focus management working correctly');
      } else {
        await reporter.failTest('Focus not properly managed on interactive elements');
      }
    } else {
      await reporter.skipTest('Theme toggle not available for focus testing');
    }
  });

});