import assert from 'node:assert';
import { Inject, Injectable } from '@nestjs/common';

import type {
  Setting,
  ResourceSettingsModuleOptions,
} from './resource-settings.interface';
import { MODULE_OPTIONS_TOKEN } from './resource-settings.module-definition';
import { KeyNotFoundException } from './key-not-found.exception';
import { InvalidSettingValueException } from './invalid-setting-value.exception';

@Injectable()
export class ResourceSettingsService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: ResourceSettingsModuleOptions
  ) {}

  async get(args: {
    key: string;
    resource: string;
    resourceId?: string | number;
  }) {
    const definition = this.getSettingDefinition(args);
    const value = await this.options.store.get(args);

    if (value === undefined) {
      // If the value is not found in the store
      // save the default value to the store and return it
      await this.options.store.set({ ...args, value: definition.defaultValue });

      return definition.defaultValue;
    }

    return value;
  }

  async set(args: {
    key: string;
    resource: string;
    resourceId?: string | number;
    value: unknown;
  }) {
    const definition = this.getSettingDefinition(args);
    const parsedValue = definition.allowedValues.safeParse(args.value);

    assert(
      parsedValue.success,
      new InvalidSettingValueException(args.key, args.resource, args.value)
    );

    await this.options.store.set({ ...args, value: parsedValue.data });
  }

  private getSettingDefinition(args: {
    key: string;
    resource: string;
  }): Setting {
    const setting = this.options.settings.find(
      (setting) =>
        setting.key === args.key && setting.resource === args.resource
    );

    assert(setting, new KeyNotFoundException(args.key, args.resource));

    return setting;
  }
}
