import { storage } from './storageService';

describe('storageService', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Restore any mocked implementations from previous tests
    jest.restoreAllMocks();
  });

  describe('get', () => {
    test('should retrieve and parse stored item from localStorage', () => {
      const testData = { name: 'John', age: 30 };
      localStorage.setItem('user', JSON.stringify(testData));

      const result = storage.get('user');

      expect(result).toEqual(testData);
    });

    test('should return fallback value when item does not exist', () => {
      const fallback = { default: true };
      const result = storage.get('nonexistent', fallback);

      expect(result).toEqual(fallback);
    });

    test('should return null as default fallback when item does not exist', () => {
      const result = storage.get('nonexistent');

      expect(result).toBeNull();
    });

    test('should handle arrays correctly', () => {
      const testArray = [1, 2, 3, 4, 5];
      localStorage.setItem('numbers', JSON.stringify(testArray));

      const result = storage.get('numbers');

      expect(result).toEqual(testArray);
    });

    test('should handle nested objects correctly', () => {
      const testData = {
        user: { name: 'Jane', address: { city: 'New York', zip: '10001' } },
        items: [{ id: 1 }, { id: 2 }],
      };
      localStorage.setItem('complex', JSON.stringify(testData));

      const result = storage.get('complex');

      expect(result).toEqual(testData);
    });

    test('should return fallback when localStorage contains invalid JSON', () => {
      localStorage.setItem('invalid', 'not a json string');
      const fallback = { error: true };

      const result = storage.get('invalid', fallback);

      expect(result).toEqual(fallback);
    });

    test('should return fallback when localStorage throws error', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('Storage error');
      });

      const fallback = { error: true };
      const result = storage.get('key', fallback);

      expect(result).toEqual(fallback);
    });
  });

  describe('set', () => {
    test('should store item in localStorage with JSON serialization', () => {
      const testData = { name: 'Alice', role: 'admin' };

      const result = storage.set('user', testData);

      expect(result).toBe(true);
      expect(localStorage.getItem('user')).toBe(JSON.stringify(testData));
    });

    test('should store arrays correctly', () => {
      const testArray = ['apple', 'banana', 'cherry'];

      const result = storage.set('fruits', testArray);

      expect(result).toBe(true);
      expect(localStorage.getItem('fruits')).toBe(JSON.stringify(testArray));
    });

    test('should store primitive values', () => {
      storage.set('count', 42);
      expect(localStorage.getItem('count')).toBe('42');

      storage.set('enabled', true);
      expect(localStorage.getItem('enabled')).toBe('true');

      storage.set('message', 'hello');
      expect(localStorage.getItem('message')).toBe('"hello"');
    });

    test('should overwrite existing value', () => {
      storage.set('key', 'original');
      storage.set('key', 'updated');

      const result = storage.get('key');
      expect(result).toBe('updated');
    });

    test('should return false when localStorage throws error', () => {
      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage full');
      });

      const result = storage.set('key', 'value');

      expect(result).toBe(false);
    });

    test('should handle null and undefined values', () => {
      storage.set('nullValue', null);
      expect(storage.get('nullValue')).toBeNull();

      storage.set('undefinedValue', undefined);
      expect(localStorage.getItem('undefinedValue')).toBe('undefined');
    });
  });

  describe('remove', () => {
    test('should remove item from localStorage', () => {
      localStorage.setItem('toRemove', JSON.stringify({ data: 'test' }));
      expect(localStorage.getItem('toRemove')).not.toBeNull();

      storage.remove('toRemove');

      expect(localStorage.getItem('toRemove')).toBeNull();
    });

    test('should not throw error when removing non-existent item', () => {
      expect(() => {
        storage.remove('nonexistent');
      }).not.toThrow();
    });

    test('should handle localStorage errors silently', () => {
      jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('Storage error');
      });

      expect(() => {
        storage.remove('key');
      }).not.toThrow();
    });

    test('should remove multiple items independently', () => {
      storage.set('item1', 'value1');
      storage.set('item2', 'value2');
      storage.set('item3', 'value3');

      storage.remove('item1');
      storage.remove('item3');

      expect(storage.get('item1')).toBeNull();
      expect(storage.get('item2')).toBe('value2');
      expect(storage.get('item3')).toBeNull();
    });
  });

  describe('Integration tests', () => {
    test('should support complete workflow: set, get, remove', () => {
      const userData = { id: 1, name: 'Test User' };

      // Set
      const setResult = storage.set('user', userData);
      expect(setResult).toBe(true);

      // Get
      const retrievedUser = storage.get('user');
      expect(retrievedUser).toEqual(userData);

      // Remove
      storage.remove('user');
      const afterRemove = storage.get('user');
      expect(afterRemove).toBeNull();
    });

    test('should handle multiple key-value pairs independently', () => {
      storage.set('key1', 'value1');
      storage.set('key2', { nested: true });
      storage.set('key3', [1, 2, 3]);

      expect(storage.get('key1')).toBe('value1');
      expect(storage.get('key2')).toEqual({ nested: true });
      expect(storage.get('key3')).toEqual([1, 2, 3]);
    });
  });
});
