/**
 * Basic Tests for DHgate Monitor
 * 
 * Simple tests to verify Jest is working correctly
 */

describe('DHgate Monitor Basic Tests', () => {
  test('basic math works', () => {
    expect(2 + 2).toBe(4);
  });

  test('string manipulation works', () => {
    const test = 'hello world';
    expect(test.toUpperCase()).toBe('HELLO WORLD');
  });

  test('arrays work', () => {
    const arr = [1, 2, 3];
    expect(arr.length).toBe(3);
    expect(arr.includes(2)).toBe(true);
  });

  test('objects work', () => {
    const obj = { name: 'DHgate Monitor', version: '2.0.0' };
    expect(obj.name).toBe('DHgate Monitor');
    expect(obj.version).toBe('2.0.0');
  });
});

// Email validation test
describe('Email Validation', () => {
  test('basic email validation', () => {
    const validEmail = 'test@example.com';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(validEmail)).toBe(true);
  });

  test('invalid email formats', () => {
    const invalidEmails = ['invalid-email', '@example.com', 'test@'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    invalidEmails.forEach(email => {
      expect(emailRegex.test(email)).toBe(false);
    });
  });
});