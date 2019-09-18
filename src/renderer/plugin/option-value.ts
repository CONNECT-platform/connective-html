import { PropertyPlugin, PluginPriority } from './plugin';
import { RawValue } from '../../shared/types';


export class OptionValuePlugin<R, T> implements PropertyPlugin<any | R, T> {
  priority = PluginPriority.High;

  setprop(prop: string, target: any | R | RawValue | HTML.EventHandler, host: HTMLElement): boolean {
    if (prop === '_value' && host instanceof HTMLOptionElement) {
      (host as any)._value = target;
      return true;
    }
    else return false;
  }
}
