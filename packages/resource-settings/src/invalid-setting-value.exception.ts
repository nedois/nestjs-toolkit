export class InvalidSettingValueException extends Error {
  constructor(key: string, resource: string, value: unknown) {
    super(`Invalid value for setting ${key} in resource ${resource}: ${value}`);
  }
}
