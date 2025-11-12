// Centralized validation helpers for forms
export const validators = {
  required(value) {
    return value != null && String(value).trim().length > 0;
  },
  email(value) {
    if (!value) return false;
    return /[^@\s]+@[^@\s]+\.[^@\s]+/.test(String(value).toLowerCase());
  },
  minLength(value, len) {
    return String(value || '').length >= len;
  },
  passwordMatch(a, b) {
    return a === b && a.length > 0;
  },
};
