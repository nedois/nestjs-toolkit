import { ConfigurableModuleBuilder } from '@nestjs/common';

import type { ResourceSettingsModuleOptions } from './resource-settings.interface';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<ResourceSettingsModuleOptions>()
  .setExtras({ isGlobal: true }, (definition, extras) => ({
    ...definition,
    global: extras.isGlobal,
  }))
  .setClassMethodName('forRoot')
  .build();

export type ResourceSettingsAsyncModuleOptions = typeof ASYNC_OPTIONS_TYPE;
