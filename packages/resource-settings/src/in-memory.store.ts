import type {
  SettingsStore,
  SettingsStoreGetOneArgs,
  SettingsStoreSetOneArgs,
} from './resource-settings.interface';

const store = new Map<string, any>();

export class InMemoryStore implements SettingsStore {
  get<T>(args: SettingsStoreGetOneArgs): T {
    const key = this.getKey(args);
    return store.get(key);
  }

  set(args: SettingsStoreSetOneArgs): void;
  set(args: SettingsStoreSetOneArgs[]): void;
  set(args: unknown): void {
    if (Array.isArray(args)) {
      args.forEach((arg) => {
        this.set(arg);
      });
    }

    const key = this.getKey(args as SettingsStoreSetOneArgs);
    store.set(key, (args as SettingsStoreSetOneArgs).value);
  }

  private getKey(args: {
    key: string;
    resource: string;
    resourceId?: string | number;
  }) {
    const { key, resource, resourceId } = args;
    return `${resource}:${key}`.concat(resourceId ? `:${resourceId}` : '');
  }
}
