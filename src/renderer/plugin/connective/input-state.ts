import { State, sink, wrap, map } from '@connectv/core';
import { fromEvent } from 'rxjs';

import { RawValue } from '../../../shared/types';
import * as L from '../../../shared/life-cycle';

import { PropertyPlugin, PluginPriority } from '../plugin';
import { setInputValue, getInputValue } from '../util/input-value';


export class InputStatePlugin<R, T> implements PropertyPlugin<State | R, T> {
  setprop(prop: string, target: RawValue | R | State, host: HTMLElement): boolean {
    if (prop === '_state' && (
          host instanceof HTMLInputElement ||
          host instanceof HTMLTextAreaElement ||
          host instanceof HTMLSelectElement
        ) && target instanceof State) {

      L.attach(
        wrap(fromEvent(host, 'input'))
        .to(map(() => getInputValue(host)))
        .to(target)
        .to(sink(v => setInputValue(host, v))), 
      host);

      return true;
    }
    else return false;
  }

  priority = PluginPriority.High;
}