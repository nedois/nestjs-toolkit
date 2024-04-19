import type { z } from 'zod';

export interface Setting<V extends z.ZodType = z.ZodType> {
  key: string;
  resource: string;
  description?: string;
  displayName?: string;
  allowedValues: V;
  defaultValue: z.infer<V>;
}

export interface ResourceSettingsModuleOptions<
  V extends z.ZodType = z.ZodType
> {
  settings: Setting<V>[];
  store: SettingsStore;
}

export interface SettingsStoreGetOneArgs {
  key: string;
  resource: string;
  resourceId?: string | number;
}

export interface SettingsStoreSetOneArgs {
  key: string;
  resource: string;
  value: any;
  resourceId?: string | number;
}

export interface SettingsStore {
  get<T>(args: SettingsStoreGetOneArgs): Promise<T> | T;

  set(args: SettingsStoreSetOneArgs): Promise<void> | void;
  set(args: SettingsStoreSetOneArgs[]): Promise<void> | void;
}
