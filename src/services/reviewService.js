// Review service to resolve reviews by car using bookings mapping
import { storage } from './storageService';

const REVIEWS_KEY = 'reviews';
const BOOKINGS_KEY = 'bookings';

export const reviewService = {
  getByCarId(carId) {
    const reviews = storage.get(REVIEWS_KEY, []);
    const bookings = storage.get(BOOKINGS_KEY, []);
    const bookingById = new Map(bookings.map((b) => [b.id, b]));

    // Only show reviews tied to this car that have not been removed by admins
    const filtered = reviews.filter((r) => {
      const b = bookingById.get(r.bookingId);
      if (!b || b.carId !== carId) return false;
      const moderationStatus = r.moderationStatus || 'approved';
      return moderationStatus !== 'removed';
    });

    const avg = filtered.length
      ? Math.round((filtered.reduce((s, r) => s + Number(r.rating || 0), 0) / filtered.length) * 10) / 10
      : 0;

    return { items: filtered, average: avg, count: filtered.length };
  },

  getByBookingId(bookingId) {
    const reviews = storage.get(REVIEWS_KEY, []);
    if (!Array.isArray(reviews)) return null;
    const match = reviews.find((r) => {
      if (r.bookingId !== bookingId) return false;
      const moderationStatus = r.moderationStatus || 'approved';
      return moderationStatus !== 'removed';
    });
    return match || null;
  },
};
