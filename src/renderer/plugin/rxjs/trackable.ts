import { Bindable, Clearable } from "@connectv/core";
import { Observable, Subscription } from "rxjs";


export class Trackable<T> implements Bindable, Clearable {
  sub: Subscription;

  constructor(readonly obs: Observable<T>[]) {}

  bind() {
    this.sub = new Subscription();
    this.obs.forEach(ob => this.sub.add(ob.subscribe()));
    return this;
  }

  clear() {
    this.sub.unsubscribe();
    return this;
  }
}


export function trackable<T>(...obs: Observable<T>[]) {
  return new Trackable<T>(obs);
}


export default trackable;