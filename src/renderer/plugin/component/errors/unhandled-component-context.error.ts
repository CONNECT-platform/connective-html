export class UnhandledComponentContextError extends Error {
  constructor(readonly key: string, readonly recipient: any, readonly value: any) {
    super(`Unrecognized component context recipient for key ${key}: ${recipient} (${typeof recipient})`);
  }
}
