// API service for making HTTP requests
// This is a placeholder that should be implemented based on your backend API

import { storage } from './storageService';
import { priceCalculator } from '../utils/priceCalculator';
import carsSeed from '../data/cars.json';
import bookingsSeed from '../data/bookings.json';

const generateUniqueId = (prefix, existingItems) => {
  const now = Date.now();
  const baseId = `${prefix}-${now}`;
  let candidate = baseId;
  let seq = 1;

  while (existingItems.some((item) => item.id === candidate)) {
    candidate = `${baseId}-${seq}`;
    seq += 1;
  }

  return candidate;
};

export const usersAPI = {
  async create(userData) {
    // TODO: Implement actual API call
    // For now, this is a mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: Date.now(), ...userData });
      }, 100);
    });
  },
  
  async getById(id) {
    // TODO: Implement actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, email: 'user@example.com' });
      }, 100);
    });
  },
  
  async update(id, userData) {
    // TODO: Implement actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, ...userData });
      }, 100);
    });
  },
  
  async delete(id) {
    // TODO: Implement actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 100);
    });
  },
};

const CARS_KEY = 'cars';

const ensureCars = () => {
  let items = storage.get(CARS_KEY);
  if (!items || items.length === 0) {
    items = Array.isArray(carsSeed) ? carsSeed : [];
    storage.set(CARS_KEY, items);
  }
  return items;
};

export const carsAPI = {
  async list() {
    return ensureCars();
  },

  async getById(id) {
    const items = ensureCars();
    return items.find((c) => c.id === id) || null;
  },

  async create(payload) {
    const required = ['title', 'brand', 'model', 'pricePerDay'];
    const missing = required.filter((k) => !payload || payload[k] === undefined || payload[k] === '');
    if (missing.length) throw new Error('Missing required fields');

    const itemsBefore = ensureCars();
    const id = generateUniqueId('car', itemsBefore);
    const now = Date.now();
    const timestamp = new Date(now).toISOString();

    const newCar = {
      id,
      agencyId: payload.agencyId || null,
      title: payload.title.trim(),
      brand: payload.brand.trim(),
      model: payload.model.trim(),
      pricePerDay: Number(payload.pricePerDay),
      location: payload.location || '',
      features: Array.isArray(payload.features) ? payload.features : [],
      images: Array.isArray(payload.images) ? payload.images : [],
      available: payload.available !== false,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const items = ensureCars();
    const next = [newCar, ...items];
    storage.set(CARS_KEY, next);
    return newCar;
  },

  async update(id, patch) {
    const items = ensureCars();
    const idx = items.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Car not found');
    const updated = {
      ...items[idx],
      ...patch,
      updatedAt: new Date(Date.now()).toISOString(),
    };
    const next = [...items];
    next[idx] = updated;
    storage.set(CARS_KEY, next);
    return updated;
  },

  async remove(id) {
    const items = ensureCars();
    const next = items.filter((c) => c.id !== id);
    storage.set(CARS_KEY, next);
    return true;
  },
};

const BOOKINGS_KEY = 'bookings';

const ensureBookings = () => {
  let items = storage.get(BOOKINGS_KEY);
  if (!items || items.length === 0) {
    items = Array.isArray(bookingsSeed) ? bookingsSeed : [];
    storage.set(BOOKINGS_KEY, items);
  }
  return items;
};

export const bookingsAPI = {
  async create(payload) {
    const required = ['userId', 'agencyId', 'carId', 'pickup', 'dropoff', 'pricePerDay'];
    const missing = required.filter((k) => !payload || payload[k] === undefined || payload[k] === '');
    if (missing.length) throw new Error('Missing required fields');

    const itemsBefore = ensureBookings();
    const id = generateUniqueId('booking', itemsBefore);

    const totalPrice = priceCalculator.totalPrice(
      Number(payload.pricePerDay),
      payload.pickup,
      payload.dropoff,
      payload.extras || {}
    );

    const now = Date.now();
    const timestamp = new Date(now).toISOString();

    const booking = {
      id,
      userId: payload.userId,
      agencyId: payload.agencyId,
      carId: payload.carId,
      pickup: payload.pickup,
      dropoff: payload.dropoff,
      extras: payload.extras || {},
      pricePerDay: Number(payload.pricePerDay),
      totalPrice,
      status: 'pending',
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const next = [booking, ...itemsBefore];
    storage.set(BOOKINGS_KEY, next);
    return booking;
  },

  async listByUser(userId) {
    const items = ensureBookings();
    return items.filter((b) => b.userId === userId);
  },

  async getById(id) {
    const items = ensureBookings();
    return items.find((b) => b.id === id) || null;
  },

  async listByAgency(agencyId) {
    const items = ensureBookings();
    return items.filter((b) => b.agencyId === agencyId);
  },

  async listByCar(carId) {
    const items = ensureBookings();
    return items.filter((b) => b.carId === carId && b.status !== 'cancelled');
  },

  async updateStatus(id, status) {
    const items = ensureBookings();
    const idx = items.findIndex((b) => b.id === id);
    if (idx === -1) throw new Error('Booking not found');
    const updated = { ...items[idx], status, updatedAt: new Date(Date.now()).toISOString() };
    const next = [...items];
    next[idx] = updated;
    storage.set(BOOKINGS_KEY, next);
    return updated;
  },

  async cancel(id) {
    return this.updateStatus(id, 'cancelled');
  },
};

export const reviewsAPI = {
  async create(reviewData) {
    // TODO: Implement actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: Date.now(), ...reviewData });
      }, 100);
    });
  },
  
  async getByCarId(carId) {
    // TODO: Implement actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 100);
    });
  },
};
