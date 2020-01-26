import { isPinLike, wrap } from '@connectv/core';
import { fromEvent } from 'rxjs';

import { PluginPriority } from '../plugin';
import { PropertyPlugin } from '../basic-plugins';


export class PinEventHandlerPlugin<R, T> implements PropertyPlugin<HTML.EventHandler | R, T> {
  setprop(prop: string, target: R | RawValue | HTML.EventHandler, host: HTMLElement): boolean {
    if (prop.startsWith('on')) {
      const event = prop.substr(2).toLowerCase();

      if (isPinLike(target)) {
        wrap(fromEvent(host, event)).to(target);
        return true;
      }

      return false;
    }
    else return false;
  }
  
  priority = PluginPriority.High;
}
