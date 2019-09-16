import { PropertyPlugin, PluginPriority } from './plugin';
import { Ref } from '../ref';
import { RawValue } from '../../shared/types';


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
