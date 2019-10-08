export class UnnamedComponentInputError extends Error {
  constructor() {
    super(`Attempting to read an unnamed component input from props.`);
  }
}