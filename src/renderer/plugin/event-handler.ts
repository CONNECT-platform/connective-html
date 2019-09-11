import { isPinLike, wrap, Source } from '@connectv/core';
import { fromEvent, Subject } from 'rxjs';

import { PropertyPlugin, PluginPriority } from './plugin';
import { RawValue } from '../../shared/types';


export class EventHandlerPlugin<R, T> implements PropertyPlugin<HTML.EventHandler | R, T> {
  setprop(prop: string, target: R | RawValue | HTML.EventHandler, host: HTMLElement): boolean {
    if (prop.startsWith('on')) {
      const event = prop.substr(2);

      if (target instanceof Subject) {
        host.addEventListener(event, (ev) => target.next(ev));
        return true;
      }
      else if (target instanceof Source) {
        host.addEventListener(event, (ev) => target.send(ev));
        return true;
      }
      else if (isPinLike(target)) {
        wrap(fromEvent(host, event)).to(target);
        return true;
      }
      else if (typeof target === 'function') {
        host.addEventListener(event, target as EventListener);
        return true;
      }

      return false;
    }
    else return false;
  }
  
  priority = PluginPriority.High;
}
