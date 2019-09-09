export class UnsupportedTagTypeError extends Error {
  constructor(readonly tag: any, readonly renderer: any) {
    super(`Renderer cannot render given tag type: ${typeof tag} (tag: ${tag})`);
  }
}
