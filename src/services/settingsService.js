import { storage } from './storageService';

const SETTINGS_KEY = 'platform_settings';

const defaultSettings = {
  commissionRate: 0.06, // 6%
  maintenanceMode: false,
  maintenanceMessage:
    'SwiftCar is currently under maintenance. Some actions may be temporarily unavailable.',
  termsUrl: '',
  privacyUrl: '',
};

export const settingsService = {
  getSettings() {
    return storage.get(SETTINGS_KEY, defaultSettings);
  },

  updateSettings(patch) {
    const current = storage.get(SETTINGS_KEY, defaultSettings);
    const next = { ...current, ...patch };
    storage.set(SETTINGS_KEY, next);
    return next;
  },
};
