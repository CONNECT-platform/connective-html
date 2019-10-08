import { RawValue } from '../../shared/types';

import { PluginPriority } from './plugin';
import { PropertyPlugin } from './basic-plugins';


export class InnerHTMLPlugin<R, T> implements PropertyPlugin<any | R, T> {
  priority = PluginPriority.Fallback;

  setprop(prop: string, target: any | R | RawValue, host: HTMLElement): boolean {
    if (prop === '_innerHTML') {
      host.innerHTML = target;
      return true;
    }
    else return false;
  }
}
