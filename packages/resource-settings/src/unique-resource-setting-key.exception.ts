export class UniqueResourceSettingKeyException extends Error {
  constructor(key: string, resource: string) {
    super(`Setting key "${key}" is not unique for resource "${resource}"`);
  }
}
