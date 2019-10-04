import { Bindable, Clearable } from '@connectv/core';

import { RawValue } from '../../../shared/types';
import * as L from '../../../shared/life-cycle';

import { PluginPriority } from '../plugin';
import { CompProcessPlugin, CompFunc } from './basic-plugins';
import { FragmentTrackingError } from './errors/fragment-tracking.error';


export type TrackFunction = (whatever: Bindable | Clearable) => void;


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
      if (node instanceof DocumentFragment)
        throw new FragmentTrackingError(_);
      tracked.forEach(thing => L.attach(thing, node));
    }
  }

  priority = PluginPriority.High;
}