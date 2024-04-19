import { Test } from '@nestjs/testing';
import { z } from 'zod';

import { InMemoryStore } from './in-memory.store';
import { ResourceSettingsModule } from './resource-settings.module';
import { OPTIONS_TYPE } from './resource-settings.module-definition';
import { AtLastOneSettingException } from './at-least-one-setting.exception';
import { UniqueResourceSettingKeyException } from './unique-resource-setting-key.exception';

describe('ResourceSettingsModule', () => {
  it('should initialize module with valid options', async () => {
    const module = await Test.createTestingModule({
      imports: [
        ResourceSettingsModule.forRoot({
          store: new InMemoryStore(),
          settings: [
            {
              key: 'allow_registration',
              resource: 'app',
              defaultValue: true,
              allowedValues: z.boolean(),
            },
          ],
        }),
      ],
    }).compile();

    expect(module).toBeDefined();
  });

  it('should throw an error if invalid options are provided', async () => {
    let options: typeof OPTIONS_TYPE = {
      store: new InMemoryStore(),
      settings: [],
    };

    expect(() => ResourceSettingsModule.forRoot(options)).toThrow(
      AtLastOneSettingException
    );

    options.settings = [
      {
        key: 'allow_registration',
        resource: 'app',
        defaultValue: true as never,
        allowedValues: z.boolean(),
      },
      {
        key: 'allow_registration',
        resource: 'app',
        defaultValue: true as never,
        allowedValues: z.boolean(),
      },
    ];

    expect(() => ResourceSettingsModule.forRoot(options)).toThrow(
      UniqueResourceSettingKeyException
    );
  });
});
