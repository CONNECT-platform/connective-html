import { sink, PinLike, isPinLike } from '@connectv/core';

import * as L from '../../../shared/life-cycle';

import { PluginPriority } from '../plugin';
import { PropertyPlugin, AppendPlugin } from '../basic-plugins';


export class PinPlugin<R=never, T=string> 
  implements PropertyPlugin<R | PinLike, T>, 
              AppendPlugin<R | PinLike, T> {

  priority = PluginPriority.Fallback;

  setprop(prop: string, target: RawValue | R | PinLike, host: HTMLElement): boolean {
    if (isPinLike(target)) {
      L.attach(target.to(sink(v => {
        if (typeof v === 'boolean') {
          if (v) host.setAttribute(prop, '');
          else host.removeAttribute(prop);
        }
        else
          host.setAttribute(prop, (v !== undefined) ? v.toString() : '')
      })), host);
      return true;
    }
    else return false;
  }

  append(target: RawValue | R | PinLike | Node | (RawValue | R | PinLike | Node)[], host: Node): boolean {
    if (isPinLike(target)) {
      let node = document.createTextNode('');
      L.attach(target.to(sink(v => node.textContent = (v !== undefined) ? v.toString() : '')), node);
      host.appendChild(node);
      
      return true;
    }
    else
      return false;
  }
}
