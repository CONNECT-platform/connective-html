export class Ref<T = Node> {
  _resolved: boolean = false;
  _$: T;

  public get resolved() { return this._resolved }
  public get $() { return this._$; }

  public resolve(t: T) {
    if (this.resolved) return;
    this._$ = t;
    this._resolved = true;
  }
}


export function ref<T = Node>() { return new Ref<T>(); }


export default ref;
