import { Test, TestingModule } from '@nestjs/testing';
import { z } from 'zod';

import { ResourceSettingsService } from './resource-settings.service';
import { ResourceSettingsModule } from './resource-settings.module';
import { SettingsStore } from './resource-settings.interface';

describe('ResourceSettingsService', () => {
  let module: TestingModule;
  let store: SettingsStore;
  let resourceSettingsService: ResourceSettingsService;

  beforeEach(async () => {
    store = { get: jest.fn(), set: jest.fn() };
    module = await Test.createTestingModule({
      imports: [
        ResourceSettingsModule.forRoot({
          store,
          settings: [
            {
              key: 'is_maintenance_mode',
              resource: 'app',
              defaultValue: false,
              allowedValues: z.boolean(),
            },
          ],
        }),
      ],
    }).compile();

    resourceSettingsService = module.get<ResourceSettingsService>(ResourceSettingsService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(resourceSettingsService).toBeDefined();
  });

  it('should return the definition default value if resource value not in store and save it', async () => {
    jest.spyOn(store, 'set').mockImplementation(() => undefined);
    jest.spyOn(store, 'get').mockImplementation(() => undefined);

    const value = await resourceSettingsService.get({
      key: 'is_maintenance_mode',
      resource: 'app',
    });

    expect(value).toBe(false);
    expect(store.set).toHaveBeenCalledTimes(1);
    expect(store.set).toHaveBeenCalledWith({
      key: 'is_maintenance_mode',
      resource: 'app',
      value: false,
    });

    jest.spyOn(store, 'get').mockImplementation(() => true);
    expect(store.get({ key: 'is_maintenance_mode', resource: 'app' })).toBe(true);
  });
});
