import { RawValue } from '../../shared/types';

import { PluginPriority } from './plugin';
import { PropertyPlugin } from './basic-plugins';


export class ObjectValuePlugin<R, T> implements PropertyPlugin<any | R, T> {
  priority = PluginPriority.Fallback;

  setprop(prop: string, target: any | R | RawValue, host: HTMLElement): boolean {
    if (prop === '_value' && (host instanceof HTMLOptionElement || host instanceof HTMLInputElement)) {
      (host as any)._value = target;
      return true;
    }
    else return false;
  }
}
