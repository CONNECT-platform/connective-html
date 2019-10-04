import { Bindable, Clearable } from '@connectv/core';
import { Observable, Subscription } from 'rxjs';

import { RawValue } from '../../../shared/types';
import * as L from '../../../shared/life-cycle';

import { PluginPriority } from '../plugin';
import { PropertyPlugin } from '../basic-plugins';


export class ObservableObjectValuePlugin<R, T> implements PropertyPlugin<Observable<any> | R, T> {
  priority = PluginPriority.High;

  setprop(prop: string, target: Observable<any> | R | RawValue, host: HTMLElement): boolean {
    if (prop === '_value' 
        && (host instanceof HTMLOptionElement || host instanceof HTMLInputElement)
        && target instanceof Observable) {
      let sub: Subscription;
      L.attach(<Bindable & Clearable>{
        bind() { sub = target.subscribe(v => (host as any)._value = v) },
        clear() { sub.unsubscribe(); },
      }, host);
      return true;
    }
    else return false;
  }
}
