// In-browser entity store with localStorage persistence seeded from src/data/*.json
import { storage } from './storageService';
import carsSeed from '../data/cars.json';
import usersSeed from '../data/users.json';
import agenciesSeed from '../data/agencies.json';
import bookingsSeed from '../data/bookings.json';
import reviewsSeed from '../data/reviews.json';
import paymentsSeed from '../data/payments.json';
import commissionsSeed from '../data/commissions.json';
import driversSeed from '../data/drivers.json';
import notificationsSeed from '../data/notifications.json';

const KEY_PREFIX = 'swiftcar_';

const seeds = {
  cars: carsSeed,
  users: usersSeed,
  agencies: agenciesSeed,
  bookings: bookingsSeed,
  reviews: reviewsSeed,
  payments: paymentsSeed,
  commissions: commissionsSeed,
  drivers: driversSeed,
  notifications: notificationsSeed,
  // alias
  rides: bookingsSeed,
};

function keyFor(entity) {
  return `${KEY_PREFIX}${entity}`;
}

function ensure(entity) {
  const k = keyFor(entity);
  let list = storage.get(k);
  if (!list) {
    list = Array.isArray(seeds[entity]) ? seeds[entity] : [];
    storage.set(k, list);
  }
  return list;
}

function nextId(entity) {
  const list = ensure(entity);
  const field = inferIdField(entity);
  const max = list.reduce((m, it) => Math.max(m, Number(it[field]) || 0), 0);
  return max + 1;
}

function inferIdField(entity) {
  switch (entity) {
    case 'cars': return 'carId';
    case 'users': return 'userId';
    case 'agencies': return 'agencyId';
    case 'bookings': return 'bookingId';
    case 'reviews': return 'reviewId';
    case 'payments': return 'paymentId';
    case 'commissions': return 'commissionId';
    case 'drivers': return 'driverId';
    case 'notifications': return 'notificationId';
    case 'rides': return 'bookingId';
    default: return 'id';
  }
}

export const entityStore = {
  async getAll(entity) {
    const data = ensure(entity);
    // simulate latency
    await new Promise((r) => setTimeout(r, 200));
    return data;
  },

  async getById(entity, id) {
    const data = ensure(entity);
    const field = inferIdField(entity);
    await new Promise((r) => setTimeout(r, 150));
    return data.find((it) => String(it[field]) === String(id)) || null;
  },

  async create(entity, item) {
    const field = inferIdField(entity);
    const list = ensure(entity);
    const id = nextId(entity);
    const toInsert = { ...item, [field]: id };
    const newList = [...list, toInsert];
    storage.set(keyFor(entity), newList);
    await new Promise((r) => setTimeout(r, 150));
    return toInsert;
  },

  async update(entity, id, patch) {
    const field = inferIdField(entity);
    const list = ensure(entity);
    const idx = list.findIndex((it) => String(it[field]) === String(id));
    if (idx === -1) return null;
    const updated = { ...list[idx], ...patch };
    const newList = [...list];
    newList[idx] = updated;
    storage.set(keyFor(entity), newList);
    await new Promise((r) => setTimeout(r, 150));
    return updated;
  },

  async remove(entity, id) {
    const field = inferIdField(entity);
    const list = ensure(entity);
    const newList = list.filter((it) => String(it[field]) !== String(id));
    storage.set(keyFor(entity), newList);
    await new Promise((r) => setTimeout(r, 150));
    return { success: true };
  },
};