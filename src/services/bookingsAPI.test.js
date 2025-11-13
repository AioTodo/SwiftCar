import { bookingsAPI } from './api';
import { storage } from './storageService';
import { priceCalculator } from '../utils/priceCalculator';

const KEY = 'bookings';

describe('bookingsAPI (storage-backed)', () => {
  const MOCK_TS = 1736800000000;
  const base = {
    userId: 'user-1',
    agencyId: 'agency-1',
    carId: 'car-1',
    pricePerDay: 80,
    pickup: '2025-01-10',
    dropoff: '2025-01-13',
    extras: { insurance: true, gps: true }, // +20
  };

  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
    jest.spyOn(Date, 'now').mockReturnValue(MOCK_TS);
  });

  test('create should compute total and persist pending booking', async () => {
    const created = await bookingsAPI.create(base);
    expect(created.id).toBe(`booking-${MOCK_TS}`);
    expect(created.status).toBe('pending');

    const expectedTotal = priceCalculator.totalPrice(
      base.pricePerDay,
      base.pickup,
      base.dropoff,
      base.extras
    );
    expect(created.totalPrice).toBe(expectedTotal);

    const stored = storage.get(KEY, []);
    expect(stored[0]).toMatchObject({ id: created.id, status: 'pending', totalPrice: expectedTotal });
  });

  test('listByUser should return user bookings only', async () => {
    const a = await bookingsAPI.create({ ...base, userId: 'user-1', carId: 'car-A' });
    const b = await bookingsAPI.create({ ...base, userId: 'user-2', carId: 'car-B' });
    const c = await bookingsAPI.create({ ...base, userId: 'user-1', carId: 'car-C' });

    const list = await bookingsAPI.listByUser('user-1');
    expect(list.map(bk => bk.id)).toEqual([c.id, a.id]); // newest first
  });

  test('listByAgency should return agency bookings only', async () => {
    const a = await bookingsAPI.create({ ...base, agencyId: 'agency-1', carId: 'car-A' });
    const b = await bookingsAPI.create({ ...base, agencyId: 'agency-2', carId: 'car-B' });
    const c = await bookingsAPI.create({ ...base, agencyId: 'agency-1', carId: 'car-C' });

    const list = await bookingsAPI.listByAgency('agency-1');
    expect(list.map(bk => bk.id)).toEqual([c.id, a.id]);
  });

  test('updateStatus should change status and updatedAt', async () => {
    const created = await bookingsAPI.create(base);
    const updated = await bookingsAPI.updateStatus(created.id, 'confirmed');
    expect(updated.status).toBe('confirmed');
    expect(new Date(updated.updatedAt).getTime()).toBeGreaterThanOrEqual(MOCK_TS);
  });

  test('cancel should set status to cancelled', async () => {
    const created = await bookingsAPI.create(base);
    const cancelled = await bookingsAPI.cancel(created.id);
    expect(cancelled.status).toBe('cancelled');

    const stored = storage.get(KEY, []);
    expect(stored.find(b => b.id === created.id)?.status).toBe('cancelled');
  });

  test('create should validate required fields', async () => {
    await expect(bookingsAPI.create({})).rejects.toThrow('Missing required fields');
    await expect(
      bookingsAPI.create({ userId: 'u', carId: 'c', pickup: '2025-01-01' })
    ).rejects.toThrow('Missing required fields');
  });
});
