import { Bindable, Clearable } from '@connectv/core';

import { RawValue } from '../../../shared/types';
import * as L from '../../../shared/life-cycle';

import { PluginPriority } from '../plugin';
import { CompProcessPlugin } from './basic-plugins';
import { CompType } from './types';


export class TrackPlugin<Renderable=RawValue, Tag=CompType<Renderable | string> | string>
  implements CompProcessPlugin<Renderable, Tag> {
  prepare(
    _: CompType<Renderable | RawValue, Tag>, 
    __: unknown,
    ___: unknown, 
    extras: { [name: string]: any; }
  ): (node: Node) => void {

    let tracked = <(Bindable | Clearable)[]>[];
    let marker: undefined | Node = undefined;
    extras.track = ((whatever: Bindable | Clearable) => tracked.push(whatever)) as any;
    extras.track.mark = (node: Node) => marker = node;

    return (node: Node) => {
      if (node instanceof DocumentFragment && marker)
        L.setLifeCycleMarker(node, marker);

      tracked.forEach(thing => L.attach(thing, node));
    }
  }

  priority = PluginPriority.High;
}