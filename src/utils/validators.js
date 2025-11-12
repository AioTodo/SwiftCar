// Centralized validation helpers for forms
export const validators = {
  required(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    // Treat numbers, booleans, arrays, and objects as provided
    return true;
  },
  email(value) {
    if (!value) return false;
    return /[^@\s]+@[^@\s]+\.[^@\s]+/.test(String(value).toLowerCase());
  },
  minLength(value, len) {
    return String(value || '').length >= len;
  },
  passwordMatch(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') return false;
    return a.length > 0 && a === b;
  },
};
