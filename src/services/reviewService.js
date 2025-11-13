// Review service to resolve reviews by car using bookings mapping
import { storage } from './storageService';

const REVIEWS_KEY = 'reviews';
const BOOKINGS_KEY = 'bookings';

export const reviewService = {
  getByCarId(carId) {
    const reviews = storage.get(REVIEWS_KEY, []);
    const bookings = storage.get(BOOKINGS_KEY, []);
    const bookingById = new Map(bookings.map(b => [b.id, b]));

    const filtered = reviews.filter((r) => {
      const b = bookingById.get(r.bookingId);
      return b && b.carId === carId;
    });

    const avg = filtered.length
      ? Math.round((filtered.reduce((s, r) => s + Number(r.rating || 0), 0) / filtered.length) * 10) / 10
      : 0;

    return { items: filtered, average: avg, count: filtered.length };
  },
};
