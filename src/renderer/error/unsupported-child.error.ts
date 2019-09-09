export class UnsupportedChildError extends Error {
  constructor(readonly child: any, readonly renderer: any) {
    super(`Renderer cannot attach child of type ${typeof child} to tree (child: ${child})`);
  }
}