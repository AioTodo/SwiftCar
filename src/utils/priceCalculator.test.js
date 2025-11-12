import { priceCalculator } from './priceCalculator';
import { CONSTANTS } from './constants';

describe('priceCalculator', () => {
  describe('rentalDays', () => {
    test('should calculate rental days correctly for single day', () => {
      const result = priceCalculator.rentalDays('2025-01-10', '2025-01-11');
      expect(result).toBe(1);
    });

    test('should calculate rental days correctly for multiple days', () => {
      const result = priceCalculator.rentalDays('2025-01-10', '2025-01-15');
      expect(result).toBe(5);
    });

    test('should calculate rental days correctly for week-long rental', () => {
      const result = priceCalculator.rentalDays('2025-01-01', '2025-01-08');
      expect(result).toBe(7);
    });

    test('should handle same pickup and dropoff dates', () => {
      const result = priceCalculator.rentalDays('2025-01-10', '2025-01-10');
      expect(result).toBe(0);
    });

    test('should handle dates across months', () => {
      const result = priceCalculator.rentalDays('2025-01-28', '2025-02-03');
      expect(result).toBe(6);
    });

    test('should handle dates across years', () => {
      const result = priceCalculator.rentalDays('2024-12-30', '2025-01-02');
      expect(result).toBe(3);
    });

    test('should handle Date objects as input', () => {
      const pickup = new Date('2025-01-10');
      const dropoff = new Date('2025-01-15');
      const result = priceCalculator.rentalDays(pickup, dropoff);
      expect(result).toBe(5);
    });
  });

  describe('basePrice', () => {
    test('should calculate base price correctly for single day', () => {
      const result = priceCalculator.basePrice(50, '2025-01-10', '2025-01-11');
      expect(result).toBe(50);
    });

    test('should calculate base price correctly for multiple days', () => {
      const result = priceCalculator.basePrice(100, '2025-01-10', '2025-01-15');
      expect(result).toBe(500);
    });

    test('should round the base price', () => {
      const result = priceCalculator.basePrice(49.99, '2025-01-10', '2025-01-12');
      expect(result).toBe(100); // 49.99 * 2 = 99.98, rounded to 100
    });

    test('should return 0 for same pickup and dropoff dates', () => {
      const result = priceCalculator.basePrice(100, '2025-01-10', '2025-01-10');
      expect(result).toBe(0);
    });

    test('should handle zero price per day', () => {
      const result = priceCalculator.basePrice(0, '2025-01-10', '2025-01-15');
      expect(result).toBe(0);
    });

    test('should not return negative values', () => {
      const result = priceCalculator.basePrice(100, '2025-01-15', '2025-01-10');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('extrasCost', () => {
    test('should calculate cost with no extras', () => {
      const result = priceCalculator.extrasCost({});
      expect(result).toBe(0);
    });

    test('should calculate cost for insurance only', () => {
      const result = priceCalculator.extrasCost({ insurance: true });
      expect(result).toBe(15);
    });

    test('should calculate cost for GPS only', () => {
      const result = priceCalculator.extrasCost({ gps: true });
      expect(result).toBe(5);
    });

    test('should calculate cost for child seat only', () => {
      const result = priceCalculator.extrasCost({ childSeat: true });
      expect(result).toBe(7);
    });

    test('should calculate cost for additional driver only', () => {
      const result = priceCalculator.extrasCost({ additionalDriver: true });
      expect(result).toBe(10);
    });

    test('should calculate cost for multiple extras', () => {
      const result = priceCalculator.extrasCost({
        insurance: true,
        gps: true,
      });
      expect(result).toBe(20);
    });

    test('should calculate cost for all extras', () => {
      const result = priceCalculator.extrasCost({
        insurance: true,
        gps: true,
        childSeat: true,
        additionalDriver: true,
      });
      expect(result).toBe(37); // 15 + 5 + 7 + 10
    });

    test('should ignore extras with false value', () => {
      const result = priceCalculator.extrasCost({
        insurance: true,
        gps: false,
        childSeat: false,
      });
      expect(result).toBe(15);
    });

    test('should handle undefined extras parameter', () => {
      const result = priceCalculator.extrasCost();
      expect(result).toBe(0);
    });

    test('should ignore unknown extras', () => {
      const result = priceCalculator.extrasCost({
        insurance: true,
        unknownExtra: true,
        anotherUnknown: true,
      });
      expect(result).toBe(15); // Only insurance should count
    });
  });

  describe('totalPrice', () => {
    test('should calculate total price without extras', () => {
      const result = priceCalculator.totalPrice(100, '2025-01-10', '2025-01-15', {});
      expect(result).toBe(500); // 100 * 5 days
    });

    test('should calculate total price with extras', () => {
      const result = priceCalculator.totalPrice(100, '2025-01-10', '2025-01-15', {
        insurance: true,
        gps: true,
      });
      expect(result).toBe(520); // (100 * 5) + 15 + 5
    });

    test('should calculate total price with all extras', () => {
      const result = priceCalculator.totalPrice(50, '2025-01-10', '2025-01-12', {
        insurance: true,
        gps: true,
        childSeat: true,
        additionalDriver: true,
      });
      expect(result).toBe(137); // (50 * 2) + 37
    });

    test('should handle omitted extras parameter', () => {
      const result = priceCalculator.totalPrice(100, '2025-01-10', '2025-01-15');
      expect(result).toBe(500);
    });

    test('should calculate correctly for single day with extras', () => {
      const result = priceCalculator.totalPrice(75, '2025-01-10', '2025-01-11', {
        insurance: true,
      });
      expect(result).toBe(90); // (75 * 1) + 15
    });
  });

  describe('commission', () => {
    test('should calculate commission with default rate', () => {
      const result = priceCalculator.commission(1000);
      expect(result).toBe(60); // 1000 * 0.06
    });

    test('should calculate commission with custom rate', () => {
      const result = priceCalculator.commission(1000, 0.10);
      expect(result).toBe(100); // 1000 * 0.10
    });

    test('should round commission to nearest integer', () => {
      const result = priceCalculator.commission(333);
      expect(result).toBe(20); // 333 * 0.06 = 19.98, rounded to 20
    });

    test('should use default rate from CONSTANTS', () => {
      const result = priceCalculator.commission(500);
      expect(result).toBe(500 * CONSTANTS.COMMISSION_DEFAULT_RATE);
    });

    test('should handle zero total', () => {
      const result = priceCalculator.commission(0);
      expect(result).toBe(0);
    });

    test('should handle zero rate', () => {
      const result = priceCalculator.commission(1000, 0);
      expect(result).toBe(0);
    });

    test('should calculate commission for large amounts', () => {
      const result = priceCalculator.commission(10000, 0.05);
      expect(result).toBe(500);
    });

    test('should calculate commission for decimal amounts', () => {
      const result = priceCalculator.commission(99.99, 0.06);
      expect(result).toBe(6); // 99.99 * 0.06 = 5.9994, rounded to 6
    });
  });

  describe('Integration tests', () => {
    test('should calculate complete booking price with all components', () => {
      const pricePerDay = 80;
      const pickup = '2025-01-10';
      const dropoff = '2025-01-13'; // 3 days
      const extras = {
        insurance: true,
        gps: true,
      };

      const days = priceCalculator.rentalDays(pickup, dropoff);
      expect(days).toBe(3);

      const base = priceCalculator.basePrice(pricePerDay, pickup, dropoff);
      expect(base).toBe(240);

      const extrasCost = priceCalculator.extrasCost(extras);
      expect(extrasCost).toBe(20);

      const total = priceCalculator.totalPrice(pricePerDay, pickup, dropoff, extras);
      expect(total).toBe(260);

      const commission = priceCalculator.commission(total);
      expect(commission).toBe(16); // 260 * 0.06 = 15.6, rounded to 16
    });

    test('should calculate complete booking price without extras', () => {
      const pricePerDay = 100;
      const pickup = '2025-02-01';
      const dropoff = '2025-02-08'; // 7 days

      const total = priceCalculator.totalPrice(pricePerDay, pickup, dropoff);
      expect(total).toBe(700);

      const commission = priceCalculator.commission(total, 0.08);
      expect(commission).toBe(56); // 700 * 0.08
    });
  });
});
