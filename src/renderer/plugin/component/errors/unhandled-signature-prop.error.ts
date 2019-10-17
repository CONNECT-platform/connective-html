export class ComponentInputUnrecognizedError extends Error {
  constructor(readonly name: string, readonly props: any) {
    super(`Provided component input was not recognizable: ${name} (${typeof props[name]})`);
  }
}

export class ComponentOutputUnrecognizedError extends Error {
  constructor(readonly name: string, readonly props: any) {
    super(`Provided component output was not recognizable: ${name} (${typeof props[name]})`);
  }
}
