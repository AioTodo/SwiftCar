import { carsAPI } from './api';
import { storage } from './storageService';

const KEY = 'cars';

describe('carsAPI (storage-backed)', () => {
  const MOCK_TS = 1736800000000; // fixed timestamp for deterministic ids
  const baseCar = {
    agencyId: 'agency-1',
    title: 'Economy Sedan',
    brand: 'Toyota',
    model: 'Corolla',
    pricePerDay: 45,
    location: 'NYC',
    features: ['AC', 'Automatic'],
    images: ['https://example.com/car.jpg'],
    available: true,
  };

  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
    jest.spyOn(Date, 'now').mockReturnValue(MOCK_TS);
  });

  test('list should return empty array when no cars stored', async () => {
    const list = await carsAPI.list();
    expect(list).toEqual([]);
  });

  test('create should persist a car with generated id and timestamps', async () => {
    const created = await carsAPI.create(baseCar);
    expect(created.id).toBe(`car-${MOCK_TS}`);
    expect(created.createdAt).toBeTruthy();
    expect(created.updatedAt).toBeTruthy();

    const stored = storage.get(KEY, []);
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({
      id: `car-${MOCK_TS}`,
      title: baseCar.title,
      brand: baseCar.brand,
      model: baseCar.model,
      pricePerDay: baseCar.pricePerDay,
      available: true,
    });
  });

  test('getById should retrieve a car by id or return null', async () => {
    const created = await carsAPI.create(baseCar);
    const fetched = await carsAPI.getById(created.id);
    expect(fetched).toMatchObject({ id: created.id, title: baseCar.title });

    const missing = await carsAPI.getById('does-not-exist');
    expect(missing).toBeNull();
  });

  test('update should merge fields and bump updatedAt', async () => {
    const created = await carsAPI.create(baseCar);
    const patch = { title: 'Updated Sedan', pricePerDay: 49 };
    const updated = await carsAPI.update(created.id, patch);

    expect(updated).toMatchObject({ id: created.id, ...patch });
    expect(new Date(updated.updatedAt).getTime()).toBeGreaterThanOrEqual(MOCK_TS);

    const stored = storage.get(KEY, []);
    expect(stored[0]).toMatchObject({ id: created.id, ...patch });
  });

  test('update should throw when car not found', async () => {
    await expect(carsAPI.update('missing', { title: 'X' })).rejects.toThrow('Car not found');
  });

  test('remove should delete a car and return true', async () => {
    const a = await carsAPI.create({ ...baseCar, title: 'A', model: 'A' });
    const b = await carsAPI.create({ ...baseCar, title: 'B', model: 'B' });

    const ok = await carsAPI.remove(a.id);
    expect(ok).toBe(true);

    const list = await carsAPI.list();
    expect(list.map(c => c.id)).toEqual([b.id]);
  });

  test('create should validate required fields', async () => {
    await expect(carsAPI.create({})).rejects.toThrow('Missing required fields');
    await expect(carsAPI.create({ title: 'X', brand: 'Y' })).rejects.toThrow('Missing required fields');
  });
});
