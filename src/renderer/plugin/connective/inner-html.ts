import { PinLike, isPinLike, sink } from '@connectv/core';

import * as L from '../../../shared/life-cycle';

import { PluginPriority } from '../plugin';
import { PropertyPlugin } from '../basic-plugins';


export class PinInnerHTMLPlugin<R, T> implements PropertyPlugin<PinLike | R, T> {
  priority = PluginPriority.High;

  setprop(prop: string, target: PinLike | R | RawValue, host: HTMLElement): boolean {
    if (prop === '_innerHTML' && isPinLike(target)) {
      L.attach(target.to(sink(v => host.innerHTML = v)), host);
      return true;
    }
    else return false;
  }
}
