import { PinLike, isPinLike, sink } from '@connectv/core';

import { RawValue } from '../../../shared/types';
import * as L from '../../../shared/life-cycle';

import { PluginPriority } from '../plugin';
import { PropertyPlugin } from '../basic-plugins';


export class PinObjectValuePlugin<R, T> implements PropertyPlugin<PinLike | R, T> {
  priority = PluginPriority.High;

  setprop(prop: string, target: PinLike | R | RawValue, host: HTMLElement): boolean {
    if (prop === '_value' 
        && (host instanceof HTMLOptionElement || host instanceof HTMLInputElement)
        && isPinLike(target)) {
      L.attach(target.to(sink(v => (host as any)._value = v)), host);
      return true;
    }
    else return false;
  }
}
