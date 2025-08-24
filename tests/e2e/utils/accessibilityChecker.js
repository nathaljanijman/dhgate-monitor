/**
 * Accessibility Checker Utility
 * 
 * Utilities for testing WCAG 2.1 AA compliance,
 * keyboard navigation, and screen reader compatibility.
 */

export class AccessibilityChecker {
  constructor() {
    this.wcagRules = {
      colorContrast: 4.5, // Minimum contrast ratio for AA
      largeTextContrast: 3.0, // Minimum for large text
      touchTargetSize: 44, // Minimum touch target size in pixels
      maxLineLength: 80 // Maximum characters per line for readability
    };
  }

  // Check color contrast ratio
  calculateContrastRatio(color1, color2) {
    const getLuminance = (color) => {
      // Convert hex to RGB
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      // Calculate relative luminance
      const getLinearValue = (val) => {
        if (val <= 0.03928) {
          return val / 12.92;
        }
        return Math.pow((val + 0.055) / 1.055, 2.4);
      };
      
      const rLin = getLinearValue(r);
      const gLin = getLinearValue(g);
      const bLin = getLinearValue(b);
      
      return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
    };
    
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  }

  // Check if contrast meets WCAG AA standards
  meetsContrastRequirement(ratio, isLargeText = false) {
    const required = isLargeText ? this.wcagRules.largeTextContrast : this.wcagRules.colorContrast;
    return {
      passes: ratio >= required,
      ratio: ratio,
      required: required,
      level: ratio >= 7 ? 'AAA' : ratio >= required ? 'AA' : 'Fail'
    };
  }

  // Generate accessibility test scenarios
  getAccessibilityTestScenarios() {
    return [
      {
        name: 'Keyboard Navigation',
        description: 'Test tab navigation through interactive elements',
        type: 'keyboard',
        steps: [
          'Start at top of page',
          'Press Tab to navigate through focusable elements',
          'Verify focus is visible on each element',
          'Check tab order is logical',
          'Test Shift+Tab for reverse navigation'
        ]
      },
      {
        name: 'Screen Reader Structure',
        description: 'Test page structure for screen readers',
        type: 'structure',
        steps: [
          'Check for proper heading hierarchy (h1, h2, h3...)',
          'Verify all images have alt text',
          'Check for ARIA labels on interactive elements',
          'Verify form labels are properly associated',
          'Check for landmark roles (main, nav, etc.)'
        ]
      },
      {
        name: 'Color Accessibility',
        description: 'Test color contrast and color-blind accessibility',
        type: 'color',
        steps: [
          'Check text contrast against backgrounds',
          'Verify links are distinguishable from text',
          'Test with color-blind simulation',
          'Check focus indicators are visible',
          'Verify no information is conveyed by color alone'
        ]
      },
      {
        name: 'Mobile Accessibility',
        description: 'Test accessibility on mobile devices',
        type: 'mobile',
        steps: [
          'Check touch target sizes (minimum 44px)',
          'Test zoom functionality up to 200%',
          'Verify content reflows properly',
          'Check orientation support',
          'Test voice input compatibility'
        ]
      }
    ];
  }

  // Validate heading structure
  validateHeadingStructure(headings) {
    const issues = [];
    let expectedLevel = 1;
    
    if (headings.length === 0) {
      issues.push('No headings found on page');
      return { valid: false, issues };
    }
    
    if (headings[0].level !== 1) {
      issues.push('Page should start with h1 heading');
    }
    
    for (let i = 0; i < headings.length; i++) {
      const current = headings[i];
      const next = headings[i + 1];
      
      // Check for empty headings
      if (!current.text || current.text.trim().length === 0) {
        issues.push(`Empty heading found: h${current.level}`);
      }
      
      // Check heading sequence
      if (next && next.level > current.level + 1) {
        issues.push(`Heading level jumps from h${current.level} to h${next.level} (skips levels)`);
      }
    }
    
    return {
      valid: issues.length === 0,
      issues,
      headingCount: headings.length,
      structure: headings.map(h => ({ level: h.level, text: h.text.substring(0, 50) }))
    };
  }

  // Check ARIA implementation
  validateARIA(elements) {
    const issues = [];
    const recommendations = [];
    
    elements.forEach(element => {
      // Check for required ARIA labels
      if (element.type === 'button' && !element.accessibleName) {
        issues.push(`Button missing accessible name: ${element.selector}`);
      }
      
      if (element.type === 'link' && !element.accessibleName) {
        issues.push(`Link missing accessible name: ${element.selector}`);
      }
      
      // Check for proper ARIA usage
      if (element.ariaLabel && element.textContent && element.ariaLabel === element.textContent) {
        recommendations.push(`Redundant aria-label on ${element.selector} - remove if text content is descriptive`);
      }
      
      // Check for interactive elements without proper roles
      if (element.onclick && !element.role && element.type !== 'button' && element.type !== 'link') {
        issues.push(`Interactive element missing role: ${element.selector}`);
      }
    });
    
    return {
      valid: issues.length === 0,
      issues,
      recommendations,
      elementsChecked: elements.length
    };
  }

  // Generate accessibility report
  generateAccessibilityReport(results) {
    const {
      headingStructure,
      ariaCompliance,
      colorContrast,
      keyboardNavigation,
      touchTargets
    } = results;
    
    const overallScore = this.calculateAccessibilityScore(results);
    
    return {
      timestamp: new Date().toISOString(),
      overallScore,
      level: overallScore >= 80 ? 'AA' : overallScore >= 60 ? 'Partial' : 'Needs Work',
      sections: {
        headingStructure: {
          score: headingStructure.valid ? 100 : Math.max(0, 100 - (headingStructure.issues.length * 25)),
          status: headingStructure.valid ? 'PASS' : 'FAIL',
          issues: headingStructure.issues
        },
        ariaCompliance: {
          score: ariaCompliance.valid ? 100 : Math.max(0, 100 - (ariaCompliance.issues.length * 20)),
          status: ariaCompliance.valid ? 'PASS' : 'FAIL',
          issues: ariaCompliance.issues,
          recommendations: ariaCompliance.recommendations
        },
        colorContrast: {
          score: colorContrast.averageScore || 0,
          status: colorContrast.allPass ? 'PASS' : 'FAIL',
          issues: colorContrast.failures || []
        },
        keyboardNavigation: {
          score: keyboardNavigation.success ? 100 : 0,
          status: keyboardNavigation.success ? 'PASS' : 'FAIL',
          issues: keyboardNavigation.issues || []
        },
        touchTargets: {
          score: touchTargets.passPercentage || 0,
          status: touchTargets.allPass ? 'PASS' : 'WARN',
          issues: touchTargets.smallTargets || []
        }
      }
    };
  }

  // Calculate overall accessibility score
  calculateAccessibilityScore(results) {
    const weights = {
      headingStructure: 0.2,
      ariaCompliance: 0.3,
      colorContrast: 0.25,
      keyboardNavigation: 0.15,
      touchTargets: 0.1
    };
    
    let totalScore = 0;
    
    Object.keys(weights).forEach(key => {
      const result = results[key];
      let sectionScore = 0;
      
      if (key === 'headingStructure') {
        sectionScore = result.valid ? 100 : Math.max(0, 100 - (result.issues.length * 25));
      } else if (key === 'ariaCompliance') {
        sectionScore = result.valid ? 100 : Math.max(0, 100 - (result.issues.length * 20));
      } else if (key === 'colorContrast') {
        sectionScore = result.averageScore || 0;
      } else if (key === 'keyboardNavigation') {
        sectionScore = result.success ? 100 : 0;
      } else if (key === 'touchTargets') {
        sectionScore = result.passPercentage || 0;
      }
      
      totalScore += sectionScore * weights[key];
    });
    
    return Math.round(totalScore);
  }
}

export default AccessibilityChecker;