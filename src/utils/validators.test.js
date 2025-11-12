import { validators } from './validators';

describe('validators', () => {
  describe('required', () => {
    test('should return true for non-empty string', () => {
      expect(validators.required('hello')).toBe(true);
    });

    test('should return true for string with spaces', () => {
      expect(validators.required('hello world')).toBe(true);
    });

    test('should return false for empty string', () => {
      expect(validators.required('')).toBe(false);
    });

    test('should return false for string with only whitespace', () => {
      expect(validators.required('   ')).toBe(false);
    });

    test('should return true for number', () => {
      expect(validators.required(0)).toBe(true);
      expect(validators.required(42)).toBe(true);
      expect(validators.required(-1)).toBe(true);
    });

    test('should return false for null', () => {
      expect(validators.required(null)).toBe(false);
    });

    test('should return false for undefined', () => {
      expect(validators.required(undefined)).toBe(false);
    });

    test('should return true for boolean false', () => {
      expect(validators.required(false)).toBe(true);
    });

    test('should return true for boolean true', () => {
      expect(validators.required(true)).toBe(true);
    });

    test('should return true for arrays', () => {
      expect(validators.required([1, 2, 3])).toBe(true);
      expect(validators.required([])).toBe(true);
    });

    test('should return true for objects', () => {
      expect(validators.required({ key: 'value' })).toBe(true);
      expect(validators.required({})).toBe(true);
    });

    test('should trim string before checking length', () => {
      expect(validators.required('  a  ')).toBe(true);
      expect(validators.required('  ')).toBe(false);
    });
  });

  describe('email', () => {
    test('should return true for valid email addresses', () => {
      expect(validators.email('user@example.com')).toBe(true);
      expect(validators.email('john.doe@company.co.uk')).toBe(true);
      expect(validators.email('test+filter@gmail.com')).toBe(true);
      expect(validators.email('user_123@test-domain.com')).toBe(true);
    });

    test('should return false for invalid email addresses', () => {
      expect(validators.email('notanemail')).toBe(false);
      expect(validators.email('missing@domain')).toBe(false);
      expect(validators.email('@nodomain.com')).toBe(false);
      expect(validators.email('user@.com')).toBe(false);
      expect(validators.email('user @domain.com')).toBe(false);
    });

    test('should return false for empty string', () => {
      expect(validators.email('')).toBe(false);
    });

    test('should return false for null', () => {
      expect(validators.email(null)).toBe(false);
    });

    test('should return false for undefined', () => {
      expect(validators.email(undefined)).toBe(false);
    });

    test('should handle lowercase conversion', () => {
      expect(validators.email('USER@EXAMPLE.COM')).toBe(true);
      expect(validators.email('MixedCase@Domain.Com')).toBe(true);
    });

    test('should return false for email without @ symbol', () => {
      expect(validators.email('userexample.com')).toBe(false);
    });

    test('should return false for email without dot after @', () => {
      expect(validators.email('user@domain')).toBe(false);
    });

    test('should return false for email with multiple @ symbols', () => {
      expect(validators.email('user@@example.com')).toBe(false);
    });

    test('should return false for email with spaces', () => {
      expect(validators.email('user @example.com')).toBe(false);
      expect(validators.email('user@ example.com')).toBe(false);
    });
  });

  describe('minLength', () => {
    test('should return true when string length meets minimum', () => {
      expect(validators.minLength('hello', 5)).toBe(true);
    });

    test('should return true when string length exceeds minimum', () => {
      expect(validators.minLength('hello world', 5)).toBe(true);
    });

    test('should return false when string length is below minimum', () => {
      expect(validators.minLength('hi', 5)).toBe(false);
    });

    test('should return true for exact minimum length', () => {
      expect(validators.minLength('12345', 5)).toBe(true);
    });

    test('should return false for empty string with non-zero minimum', () => {
      expect(validators.minLength('', 1)).toBe(false);
    });

    test('should return true for empty string with zero minimum', () => {
      expect(validators.minLength('', 0)).toBe(true);
    });

    test('should handle null value', () => {
      expect(validators.minLength(null, 5)).toBe(false);
    });

    test('should handle undefined value', () => {
      expect(validators.minLength(undefined, 5)).toBe(false);
    });

    test('should convert numbers to strings', () => {
      expect(validators.minLength(12345, 5)).toBe(true);
      expect(validators.minLength(123, 5)).toBe(false);
    });

    test('should handle zero as minimum length', () => {
      expect(validators.minLength('any', 0)).toBe(true);
    });

    test('should handle negative minimum length', () => {
      expect(validators.minLength('test', -1)).toBe(true);
    });

    test('should count all characters including spaces', () => {
      expect(validators.minLength('a b c', 5)).toBe(true);
      expect(validators.minLength('   ', 3)).toBe(true);
    });
  });

  describe('passwordMatch', () => {
    test('should return true when passwords match and are non-empty', () => {
      expect(validators.passwordMatch('password123', 'password123')).toBe(true);
    });

    test('should return false when passwords do not match', () => {
      expect(validators.passwordMatch('password123', 'password456')).toBe(false);
    });

    test('should return false when both passwords are empty', () => {
      expect(validators.passwordMatch('', '')).toBe(false);
    });

    test('should return false when first password is empty', () => {
      expect(validators.passwordMatch('', 'password')).toBe(false);
    });

    test('should return false when second password is empty', () => {
      expect(validators.passwordMatch('password', '')).toBe(false);
    });

    test('should be case-sensitive', () => {
      expect(validators.passwordMatch('Password', 'password')).toBe(false);
    });

    test('should consider whitespace differences', () => {
      expect(validators.passwordMatch('password ', 'password')).toBe(false);
      expect(validators.passwordMatch(' password', 'password')).toBe(false);
    });

    test('should handle special characters', () => {
      expect(validators.passwordMatch('p@ssw0rd!', 'p@ssw0rd!')).toBe(true);
      expect(validators.passwordMatch('p@ssw0rd!', 'p@ssw0rd')).toBe(false);
    });

    test('should handle numeric passwords', () => {
      expect(validators.passwordMatch('123456', '123456')).toBe(true);
      expect(validators.passwordMatch('123456', '654321')).toBe(false);
    });

    test('should handle very long passwords', () => {
      const longPassword = 'a'.repeat(100);
      expect(validators.passwordMatch(longPassword, longPassword)).toBe(true);
    });

    test('should return false for null values', () => {
      expect(validators.passwordMatch(null, null)).toBe(false);
      expect(validators.passwordMatch('password', null)).toBe(false);
      expect(validators.passwordMatch(null, 'password')).toBe(false);
    });

    test('should return false for undefined values', () => {
      expect(validators.passwordMatch(undefined, undefined)).toBe(false);
      expect(validators.passwordMatch('password', undefined)).toBe(false);
      expect(validators.passwordMatch(undefined, 'password')).toBe(false);
    });
  });

  describe('Integration scenarios', () => {
    test('should validate complete signup form', () => {
      const form = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'SecurePass123',
        confirmPassword: 'SecurePass123',
      };

      expect(validators.required(form.firstName)).toBe(true);
      expect(validators.required(form.lastName)).toBe(true);
      expect(validators.email(form.email)).toBe(true);
      expect(validators.minLength(form.password, 8)).toBe(true);
      expect(validators.passwordMatch(form.password, form.confirmPassword)).toBe(true);
    });

    test('should catch validation errors in signup form', () => {
      const invalidForm = {
        firstName: '  ',
        lastName: 'Doe',
        email: 'invalid-email',
        password: '123',
        confirmPassword: '456',
      };

      expect(validators.required(invalidForm.firstName)).toBe(false);
      expect(validators.email(invalidForm.email)).toBe(false);
      expect(validators.minLength(invalidForm.password, 8)).toBe(false);
      expect(validators.passwordMatch(invalidForm.password, invalidForm.confirmPassword)).toBe(false);
    });

    test('should validate form with edge case inputs', () => {
      expect(validators.required(0)).toBe(true);
      expect(validators.required(false)).toBe(true);
      expect(validators.minLength('a', 1)).toBe(true);
      expect(validators.passwordMatch('a', 'a')).toBe(true);
    });
  });
});
