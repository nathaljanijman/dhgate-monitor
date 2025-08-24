/**
 * Email Validation Utility
 * 
 * Utilities for testing email functionality, validation,
 * and deliverability in QA tests.
 */

export class EmailValidator {
  constructor() {
    this.testEmails = [];
    this.domains = ['example.com', 'test.local', 'qa-test.com'];
  }

  // Generate unique test email
  generateTestEmail(prefix = 'qa-test') {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const domain = this.domains[Math.floor(Math.random() * this.domains.length)];
    
    const email = `${prefix}-${timestamp}-${random}@${domain}`;
    this.testEmails.push({
      email,
      created: new Date(),
      used: false
    });
    
    return email;
  }

  // Validate email format
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Check if email is from test domain
  isTestEmail(email) {
    return this.domains.some(domain => email.endsWith(`@${domain}`));
  }

  // Mark test email as used
  markEmailUsed(email) {
    const testEmail = this.testEmails.find(te => te.email === email);
    if (testEmail) {
      testEmail.used = true;
      testEmail.usedAt = new Date();
    }
  }

  // Get list of unused test emails
  getUnusedEmails() {
    return this.testEmails.filter(te => !te.used);
  }

  // Clean up old test emails
  cleanupTestEmails(maxAge = 24 * 60 * 60 * 1000) { // 24 hours
    const cutoff = new Date(Date.now() - maxAge);
    this.testEmails = this.testEmails.filter(te => te.created > cutoff);
  }

  // Simulate email sending for testing
  async simulateEmailSend(to, subject, body) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`📧 Simulated email sent to: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body preview: ${body.substring(0, 100)}...`);
        
        resolve({
          success: true,
          messageId: `test-${Date.now()}`,
          to,
          subject,
          timestamp: new Date().toISOString()
        });
      }, 100); // Simulate network delay
    });
  }

  // Check email deliverability factors
  checkDeliverability(email, subject, body) {
    const issues = [];
    
    // Check subject line
    if (!subject || subject.length === 0) {
      issues.push('Empty subject line');
    }
    if (subject && subject.length > 78) {
      issues.push('Subject line too long (>78 characters)');
    }
    if (subject && /[!]{2,}|[?]{2,}/.test(subject)) {
      issues.push('Excessive punctuation in subject');
    }
    
    // Check body content
    if (!body || body.length === 0) {
      issues.push('Empty email body');
    }
    
    // Check email address
    if (!this.isValidEmail(email)) {
      issues.push('Invalid email format');
    }
    
    // Check for spam-like content
    const spamWords = ['FREE', 'URGENT', 'ACT NOW', 'CLICK HERE', 'GUARANTEE'];
    const upperCaseWords = body.match(/\b[A-Z]{2,}\b/g) || [];
    const spamWordCount = upperCaseWords.filter(word => spamWords.includes(word)).length;
    
    if (spamWordCount > 2) {
      issues.push('Contains potential spam words');
    }
    
    return {
      score: Math.max(0, 100 - (issues.length * 20)),
      issues,
      recommendation: issues.length === 0 ? 'Good deliverability expected' : 'Review and fix issues'
    };
  }

  // Generate test data for different email scenarios
  getEmailTestScenarios() {
    return [
      {
        name: 'Valid Registration',
        email: this.generateTestEmail('registration'),
        scenario: 'new_user_registration',
        expectedResult: 'success'
      },
      {
        name: 'Dashboard Access Request',
        email: this.generateTestEmail('dashboard'),
        scenario: 'dashboard_access',
        expectedResult: 'success'
      },
      {
        name: 'Invalid Email Format',
        email: 'invalid-email-format',
        scenario: 'registration',
        expectedResult: 'validation_error'
      },
      {
        name: 'Existing User',
        email: this.generateTestEmail('existing'),
        scenario: 'duplicate_registration',
        expectedResult: 'user_exists_warning'
      },
      {
        name: 'Unsubscribe Request',
        email: this.generateTestEmail('unsubscribe'),
        scenario: 'unsubscribe',
        expectedResult: 'success'
      }
    ];
  }
}

export default EmailValidator;