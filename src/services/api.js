// API service for making HTTP requests
// This is a placeholder that should be implemented based on your backend API

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

import { storage } from './storageService';

const CARS_KEY = 'cars';

export const carsAPI = {
  async list() {
    return storage.get(CARS_KEY, []);
  },

  async getById(id) {
    const items = storage.get(CARS_KEY, []);
    return items.find((c) => c.id === id) || null;
  },

  async create(payload) {
    const required = ['title', 'brand', 'model', 'pricePerDay'];
    const missing = required.filter((k) => !payload || payload[k] === undefined || payload[k] === '');
    if (missing.length) throw new Error('Missing required fields');

    const now = Date.now();
    let id = `car-${now}`;
    const itemsBefore = storage.get(CARS_KEY, []);
    if (itemsBefore.some((c) => c.id === id)) {
      let seq = 1;
      while (itemsBefore.some((c) => c.id === `${id}-${seq}`)) seq++;
      id = `${id}-${seq}`;
    }
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
      createdAt: new Date(now).toISOString(),
      updatedAt: new Date(now).toISOString(),
    };

    const items = storage.get(CARS_KEY, []);
    const next = [newCar, ...items];
    storage.set(CARS_KEY, next);
    return newCar;
  },

  async update(id, patch) {
    const items = storage.get(CARS_KEY, []);
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
    const items = storage.get(CARS_KEY, []);
    const next = items.filter((c) => c.id !== id);
    storage.set(CARS_KEY, next);
    return true;
  },
};

import { priceCalculator } from '../utils/priceCalculator';

const BOOKINGS_KEY = 'bookings';

export const bookingsAPI = {
  async create(payload) {
    const required = ['userId', 'agencyId', 'carId', 'pickup', 'dropoff', 'pricePerDay'];
    const missing = required.filter((k) => !payload || payload[k] === undefined || payload[k] === '');
    if (missing.length) throw new Error('Missing required fields');

    const now = Date.now();
    let id = `booking-${now}`;
    const itemsBefore = storage.get(BOOKINGS_KEY, []);
    if (itemsBefore.some((b) => b.id === id)) {
      let seq = 1;
      while (itemsBefore.some((b) => b.id === `${id}-${seq}`)) seq++;
      id = `${id}-${seq}`;
    }

    const totalPrice = priceCalculator.totalPrice(
      Number(payload.pricePerDay),
      payload.pickup,
      payload.dropoff,
      payload.extras || {}
    );

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
      createdAt: new Date(now).toISOString(),
      updatedAt: new Date(now).toISOString(),
    };

    const next = [booking, ...itemsBefore];
    storage.set(BOOKINGS_KEY, next);
    return booking;
  },

  async listByUser(userId) {
    const items = storage.get(BOOKINGS_KEY, []);
    return items.filter((b) => b.userId === userId);
  },

  async listByAgency(agencyId) {
    const items = storage.get(BOOKINGS_KEY, []);
    return items.filter((b) => b.agencyId === agencyId);
  },

  async updateStatus(id, status) {
    const items = storage.get(BOOKINGS_KEY, []);
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
