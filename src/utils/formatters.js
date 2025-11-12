// Simple string/number formatters
export const currency = (amount, currency = 'USD') =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(Number(amount || 0));

export const capitalize = (str = '') => str.charAt(0).toUpperCase() + str.slice(1);
