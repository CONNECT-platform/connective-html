export class Ref<T extends Node = Node> {
  _resolved: boolean = false;
  _el: T;

  public get resolved() { return this._resolved }
  public get el() { return this._el; }

  public resolve(t: T) {
    if (this.resolved) return;
    this._el = t;
    this._resolved = true;
  }
}


export function ref<T extends Node = Node>() { return new Ref<T>(); }


export default ref;
