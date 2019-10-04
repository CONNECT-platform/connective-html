import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bindable, Clearable } from '@connectv/core';

import { RawValue } from '../../../shared/types';
import * as L from '../../../shared/life-cycle';

import { PluginPriority } from '../plugin';
import { PropertyPlugin } from '../basic-plugins';
import { setInputValue, getInputValue } from '../util/input-value';


export class InputSubjectPlugin<R, T> implements PropertyPlugin<BehaviorSubject<any> | R, T> {
  setprop(prop: string, target: RawValue | R | BehaviorSubject<any>, host: HTMLElement): boolean {
    if (prop === '_state' && (
          host instanceof HTMLInputElement ||
          host instanceof HTMLTextAreaElement
        ) && target instanceof BehaviorSubject) {

      let sub = new Subscription();

      L.attach(<Bindable & Clearable>{
        bind() { 
          sub.add(fromEvent(host, 'input')
            .pipe(map(() => getInputValue(host))).subscribe(target));
          sub.add(target.subscribe(v => setInputValue(host, v)));
        },
        clear() { sub.unsubscribe(); },
      }, host);


      return true;
    }
    else return false;
  }

  priority = PluginPriority.High;
}