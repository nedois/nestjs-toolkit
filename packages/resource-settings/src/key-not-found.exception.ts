export class KeyNotFoundException extends Error {
  constructor(key: string, resource: string) {
    super(`Setting key "${key}" not found for resource "${resource}"`);
  }
}
