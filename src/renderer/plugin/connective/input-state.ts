import { State, sink, wrap, map } from '@connectv/core';
import { fromEvent } from 'rxjs';

import { RawValue } from '../../../shared/types';
import * as L from '../../../shared/life-cycle';

import { PropertyPlugin, PluginPriority } from '../plugin';


export class InputStatePlugin<R, T> implements PropertyPlugin<State | R, T> {
  setprop(prop: string, target: RawValue | R | State, host: HTMLElement): boolean {
    if (prop === '_state' && (
          host instanceof HTMLInputElement ||
          host instanceof HTMLTextAreaElement
        ) && target instanceof State) {

      L.attach(
        wrap(fromEvent(host, 'input'))
        .to(map(() => host.value))
        .to(target)
        .to(sink(v => host.value = v)), 
      host);

      return true;
    }
    else return false;
  }

  priority = PluginPriority.High;
}