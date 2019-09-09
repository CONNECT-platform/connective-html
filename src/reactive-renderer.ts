import { isPinLike, PinLike, sink, wrap } from '@connectv/core';
import { Observable } from 'rxjs';

import * as lifcycle from './shared/life-cycle';

import { RawValue } from './shared/types';
import { Renderer } from './renderer/renderer';


export type Renderable = PinLike | Observable<RawValue> | RawValue;


export class ReactiveRenderer extends Renderer<Renderable> {
  append(target: Renderable | Node | (Renderable | Node)[], host: Node) {
    if (isPinLike(target)) {
      let node = super.create('', undefined);
      lifcycle.attach(target.to(sink(v => node.textContent = v)), node);
      host.appendChild(node);
    }
    else if (target instanceof Observable)
      this.append(wrap(target), host);
    else super.append(target, host);
  }

  setprop(prop: string, target: Renderable, host: HTMLElement) {
    if (isPinLike(target)) {
      lifcycle.attach(target.to(sink(v => host.setAttribute(prop, v.toString()))), host);
    }
    else if (target instanceof Observable)
      this.setprop(prop, wrap(target), host);
    else super.setprop(prop, target, host);
  }
}


export default ReactiveRenderer;
