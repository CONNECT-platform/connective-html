import { Observable, Subscription } from 'rxjs';
import { Bindable, Clearable } from '@connectv/core';

import * as L from '../../../shared/life-cycle';
import * as _ClassListFixed from '../../../shared/class-list-fixed';

import { PluginPriority } from '../plugin';
import { PropertyPlugin } from '../basic-plugins';


export class ObservableClassPlugin<R=never, T=string> 
  implements PropertyPlugin<R | Observable<RawValue>, T> {

  priority = PluginPriority.High;

  setprop(prop: string, target: RawValue | R | Observable<RawValue>, host: HTMLElement): boolean {
    if (prop === 'class' && target instanceof Observable) {
      let sub: Subscription;

      L.attach(<Bindable & Clearable>{
        bind() {
          sub = target.subscribe(v => {
            let classes = (v !== undefined) ? v.toString() : '';
            const fixed = _ClassListFixed.get(host);
            if (fixed.length > 0)
              classes += ' ' + fixed.join(' ');
    
            host.setAttribute('class', classes);
          }); 
        },
        clear() { sub.unsubscribe(); },
      }, host);

      return true;
    }
    else
      return false
  }
}
