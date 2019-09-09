import { sink, PinLike, isPinLike } from '@connectv/core';

import { RawValue } from '../../shared/types';
import * as L from '../../shared/life-cycle';

import { PropertyPlugin, AppendPlugin, PluginPriority } from './plugin';


export class PinPlugin<R=null, T=string> 
  implements PropertyPlugin<R | PinLike, T>, 
              AppendPlugin<R | PinLike, T> {

  priority = PluginPriority.Fallback;

  setprop(prop: string, target: RawValue | R | PinLike, host: HTMLElement): boolean {
    if (isPinLike(target)) {
      L.attach(target.to(sink(v => host.setAttribute(prop, v.toString()))), host);
      return true;
    }
    else return false;
  }

  append(target: RawValue | R | PinLike | Node | (RawValue | R | PinLike | Node)[], host: Node): boolean {
    if (isPinLike(target)) {
      let node = document.createTextNode('');
      L.attach(target.to(sink(v => node.textContent = v.toString())), node);
      host.appendChild(node);
      
      return true;
    }
    else
      return false;
  }
}
