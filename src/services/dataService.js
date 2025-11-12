// Utilities for working with src/data/*.json or localStorage fallbacks
// For this project, prefer the real API (src/services/api.js). This is only for offline/mock flows.
import cars from '../data/cars.json';
import agencies from '../data/agencies.json';
import users from '../data/users.json';
import bookings from '../data/bookings.json';
import reviews from '../data/reviews.json';

export const dataService = {
  getAll(entity) {
    switch (entity) {
      case 'cars':
        return [...cars];
      case 'agencies':
        return [...agencies];
      case 'users':
        return users.map(({ password, ...u }) => u);
      case 'bookings':
        return [...bookings];
      case 'reviews':
        return [...reviews];
      default:
        return [];
    }
  },
};
