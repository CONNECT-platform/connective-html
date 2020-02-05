import { sink, PinLike, isPinLike } from '@connectv/core';

import * as L from '../../../shared/life-cycle';
import * as _ClassListFixed from '../../../shared/class-list-fixed';

import { PluginPriority } from '../plugin';
import { PropertyPlugin } from '../basic-plugins';


export class PinClassPlugin<R=never, T=string>
  implements PropertyPlugin<R | PinLike, T> {

  priority = PluginPriority.High;

  setprop(prop: string, target: RawValue | R | PinLike, host: HTMLElement): boolean {
    if (prop === 'class' && isPinLike(target)) {
      L.attach(target.to(sink(v => {
        let classes = (v !== undefined) ? v.toString() : '';
        const fixed = _ClassListFixed.get(host);
        if (fixed.length > 0)
          classes += ' ' + fixed.join(' ');

        host.setAttribute('class', classes);
      })), host);
      return true;
    }
    else return false;
  }
}
