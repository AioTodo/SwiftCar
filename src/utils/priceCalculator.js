// Price calculations and commission helpers
import { daysBetween } from './dateHelpers';
import { CONSTANTS } from './constants';

export const priceCalculator = {
  rentalDays(pickup, dropoff) {
    return daysBetween(pickup, dropoff);
  },
  basePrice(pricePerDay, pickup, dropoff) {
    return Math.max(0, Math.round(pricePerDay * this.rentalDays(pickup, dropoff)));
  },
  extrasCost(extras = {}) {
    const map = {
      insurance: 15,
      gps: 5,
      childSeat: 7,
      additionalDriver: 10,
    };
    return Object.entries(extras).reduce((sum, [k, v]) => (v ? sum + (map[k] || 0) : sum), 0);
  },
  totalPrice(pricePerDay, pickup, dropoff, extras = {}) {
    return this.basePrice(pricePerDay, pickup, dropoff) + this.extrasCost(extras);
  },
  commission(total, rate = CONSTANTS.COMMISSION_DEFAULT_RATE) {
    return Math.round(total * rate);
  },
};
