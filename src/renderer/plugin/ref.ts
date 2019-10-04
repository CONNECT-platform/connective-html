import { Ref } from '../ref';
import { RawValue } from '../../shared/types';

import { PluginPriority } from './plugin';
import { PropertyPlugin } from './basic-plugins';


export class RefPlugin<R, T> implements PropertyPlugin<Ref | R, T> {
  setprop(prop: string, target: R | RawValue | Ref, host: HTMLElement): boolean {
    if (prop === '_ref' && target instanceof Ref) {
      target.resolve(host);
      return true;
    }
    else return false;
  }
  
  priority = PluginPriority.High;
}
