export class InputStateTypeError extends Error {
  constructor(readonly provided: any) {
    super(`_state property on inputs must be a state (https://connective.dev/docs/state), ${typeof provided} (${provided}) was provided instead`);
  }
}
