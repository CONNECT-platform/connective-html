import { Bindable, Clearable } from '@connectv/core';

import { RawValue } from '../../../shared/types';
import * as L from '../../../shared/life-cycle';

import { PluginPriority } from '../plugin';
import { CompProcessPlugin } from './basic-plugins';
import { CompFunc, TrackFunction } from './types';


export class TrackPlugin<Renderable=RawValue, Tag=CompFunc<Renderable | string> | string>
  implements CompProcessPlugin<Renderable, Tag> {
  prepare(
    _: CompFunc<Renderable, Tag>, 
    __: unknown,
    ___: unknown, 
    extras: { [name: string]: any; }
  ): (node: Node) => void {

    let tracked = <(Bindable | Clearable)[]>[];
    extras.track = <TrackFunction>((whatever: Bindable | Clearable) => tracked.push(whatever));

    return (node: Node) => {
      tracked.forEach(thing => L.attach(thing, node));
    }
  }

  priority = PluginPriority.High;
}