export class UnsupportedPropError extends Error {
  constructor(readonly target: any, readonly renderer: any) {
    super(`Renderer cannot set property to type ${target} (prop: ${target})`);
  }
}