import { PropertyPlugin, PluginPriority } from './plugin';
import { RawValue } from '../../shared/types';


export class EventHandlerPlugin<R, T> implements PropertyPlugin<HTML.EventHandler | R, T> {
  setprop(prop: string, target: R | RawValue | HTML.EventHandler, host: HTMLElement): boolean {
    if (prop.startsWith('on') && typeof target === 'function') {
      const event = prop.substr(2).toLowerCase();
      host.addEventListener(event, target as EventListener);
      return true;
    }
    else return false;
  }
  
  priority = PluginPriority.High;
}
