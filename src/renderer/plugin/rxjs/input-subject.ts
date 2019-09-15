import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bindable, Clearable } from '@connectv/core';

import { RawValue } from '../../../shared/types';
import * as L from '../../../shared/life-cycle';

import { PropertyPlugin, PluginPriority } from '../plugin';


export class InputSubjectPlugin<R, T> implements PropertyPlugin<BehaviorSubject<RawValue> | R, T> {
  setprop(prop: string, target: RawValue | R | BehaviorSubject<RawValue>, host: HTMLElement): boolean {
    if (prop === '_state' && (
          host instanceof HTMLInputElement ||
          host instanceof HTMLTextAreaElement
        ) && target instanceof BehaviorSubject) {

      let sub = new Subscription();

      L.attach(<Bindable & Clearable>{
        bind() { 
          sub.add(fromEvent(host, 'input').pipe(map(() => host.value)).subscribe(target));
          sub.add(target.subscribe(v => host.value = v.toString()));
        },
        clear() { sub.unsubscribe(); },
      }, host);


      return true;
    }
    else return false;
  }

  priority = PluginPriority.High;
}