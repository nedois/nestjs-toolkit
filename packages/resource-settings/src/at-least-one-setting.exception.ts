export class AtLastOneSettingException extends Error {
  constructor() {
    super('At least one setting must be provided');
  }
}
