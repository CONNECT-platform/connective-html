import { Observable, Subscription } from 'rxjs';
import { Bindable, Clearable } from '@connectv/core';

import * as L from '../../../shared/life-cycle';

import { PluginPriority } from '../plugin';
import { PropertyPlugin, AppendPlugin } from '../basic-plugins';


export class ObservablePlugin<R=never, T=string> 
  implements PropertyPlugin<R | Observable<RawValue>, T>, 
            AppendPlugin<R | Observable<RawValue>, T> {

  priority = PluginPriority.Fallback;

  setprop(prop: string, target: RawValue | R | Observable<RawValue>, host: HTMLElement): boolean {
    if (target instanceof Observable) {
      let sub: Subscription;

      L.attach(<Bindable & Clearable>{
        bind() { 
          sub = target.subscribe(v => {
            if (typeof v === 'boolean') {
              if (v) host.setAttribute(prop, '');
              else host.removeAttribute(prop);
            }
            else
              host.setAttribute(prop, (v !== undefined) ? v.toString() : '')
          }); 
        },
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
        bind() { sub = target.subscribe(v => node.textContent = (v !== undefined) ? v.toString() : ''); },
        clear() { sub.unsubscribe(); },
      }, node);

      host.appendChild(node);

      return true;
    }
    else
      return false;
  }
}
