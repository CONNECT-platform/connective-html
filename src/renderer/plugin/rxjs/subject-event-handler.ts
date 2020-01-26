import { Subject, fromEvent } from 'rxjs';

import { PluginPriority } from '../plugin';
import { PropertyPlugin } from '../basic-plugins';


export class SubjectEventHandlerPlugin<R, T> implements PropertyPlugin<HTML.EventHandler | R, T> {
  setprop(prop: string, target: R | RawValue | HTML.EventHandler, host: HTMLElement): boolean {
    if (prop.startsWith('on') && target instanceof Subject) {
      const event = prop.substr(2).toLowerCase();
      fromEvent(host, event).subscribe(target);
      return true;
    }
    else return false;
  }
  
  priority = PluginPriority.High;
}
