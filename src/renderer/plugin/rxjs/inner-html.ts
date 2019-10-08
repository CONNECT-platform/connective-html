import { Bindable, Clearable } from '@connectv/core';
import { Observable, Subscription } from 'rxjs';

import { RawValue } from '../../../shared/types';
import * as L from '../../../shared/life-cycle';

import { PluginPriority } from '../plugin';
import { PropertyPlugin } from '../basic-plugins';


export class ObservableInnerHTMLPlugin<R, T> implements PropertyPlugin<Observable<any> | R, T> {
  priority = PluginPriority.High;

  setprop(prop: string, target: Observable<any> | R | RawValue, host: HTMLElement): boolean {
    if (prop === '_innerHTML' && target instanceof Observable) {
      let sub: Subscription;
      L.attach(<Bindable & Clearable>{
        bind() { sub = target.subscribe(v => host.innerHTML = v) },
        clear() { sub.unsubscribe(); },
      }, host);
      return true;
    }
    else return false;
  }
}
