export class BadComponentOutputTypeError extends Error {
  constructor(readonly prop: string, readonly given: any, readonly acceptable: string[]) {
    super(`Component output of type ${typeof given} cannot be passed to output "${prop}".` 
          + ` Should be of type ${acceptable.join(' or ')}`);
  }
}