import type { SettingsStore } from './resource-settings.interface';
import { InMemoryStore } from './in-memory.store';

describe('InMemoryStore', () => {
  let store: SettingsStore;

  beforeEach(() => {
    store = new InMemoryStore();
  });

  test('get() should return the value for a given key', () => {
    store.set({ key: 'k1', resource: 'r1', value: 'v1' });
    store.set({ key: 'k2', resource: 'r2', value: 'v2' });
    store.set({ key: 'k3', resource: 'r3', resourceId: 'id3', value: 'v3' });

    expect(store.get({ key: 'k1', resource: 'r1' })).toBe('v1');
    expect(store.get({ key: 'k2', resource: 'r2' })).toBe('v2');
    expect(store.get({ key: 'k3', resource: 'r3', resourceId: 'id3' })).toBe('v3');
  });

  test('set() should set a value for a given key', () => {
    store.set({ key: 'k1', resource: 'r1', value: 'v1' });
    expect(store.get({ key: 'k1', resource: 'r1' })).toBe('v1');
  });

  test('set() should set multiple values when passed an array of arguments', () => {
    const testData = [
      { key: 'k1', resource: 'r1', value: 'v1' },
      { key: 'k2', resource: 'r1', value: 'v2' },
    ];
    store.set(testData);
    expect(store.get({ key: 'k1', resource: 'r1' })).toBe('v1');
    expect(store.get({ key: 'k2', resource: 'r1' })).toBe('v2');
  });
});
