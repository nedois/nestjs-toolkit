import assert from 'node:assert';
import { type DynamicModule, Module } from '@nestjs/common';

import {
  OPTIONS_TYPE,
  ConfigurableModuleClass,
} from './resource-settings.module-definition';
import { ResourceSettingsService } from './resource-settings.service';
import { AtLastOneSettingException } from './at-least-one-setting.exception';
import { UniqueResourceSettingKeyException } from './unique-resource-setting-key.exception';

@Module({
  providers: [ResourceSettingsService],
  exports: [ResourceSettingsService],
})
export class ResourceSettingsModule extends ConfigurableModuleClass {
  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    ResourceSettingsModule.validateOptions(options);
    return super.forRoot(options);
  }

  static validateOptions({ settings }: typeof OPTIONS_TYPE) {
    assert(settings.length > 0, new AtLastOneSettingException());

    const keys = new Set<string>();

    for (const { key, resource } of settings) {
      const compositeKey = `${key}:${resource}`;

      assert(
        !keys.has(compositeKey),
        new UniqueResourceSettingKeyException(key, resource)
      );

      keys.add(compositeKey);
    }
  }
}
