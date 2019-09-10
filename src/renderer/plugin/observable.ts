import { Observable, Subscription } from 'rxjs';
import { Bindable, Clearable } from '@connectv/core';

import { RawValue } from '../../shared/types';
import * as L from '../../shared/life-cycle';

import { PropertyPlugin, AppendPlugin, PluginPriority } from './plugin';


export class ObservablePlugin<R=never, T=string> 
  implements PropertyPlugin<R | Observable<RawValue>, T>, 
            AppendPlugin<R | Observable<RawValue>, T> {

  priority = PluginPriority.Fallback;

  setprop(prop: string, target: RawValue | R | Observable<RawValue>, host: HTMLElement): boolean {
    if (target instanceof Observable) {
      let sub: Subscription;

      L.attach(<Bindable & Clearable>{
        bind() { sub = target.subscribe(v => host.setAttribute(prop, v.toString())) },
        clear() { sub.unsubscribe(); },
      }, host);

      return true;
    }
    else
      return false
  }

  append(target: RawValue | R | Observable<RawValue> | Node | (RawValue | R | Observable<RawValue> | Node)[], 
        host: Node): boolean {
    if (target instanceof Observable) {
      let node = document.createTextNode('');
      let sub: Subscription;

      L.attach(<Bindable & Clearable>{
        bind() { sub = target.subscribe(v => node.textContent = v.toString()); },
        clear() { sub.unsubscribe(); },
      }, node);

      host.appendChild(node);

      return true;
    }
    else
      return false;
  }
}
