import { State } from '@connectv/core';

import * as L from '../../../shared/life-cycle';

import { PluginPriority } from "../plugin";

import { CompType, ComponentSignature } from "../component/types";
import { CompIOPlugin } from "../component/basic-plugins";


export class CompStateTrackPlugin<Renderable=RawValue, Tag=CompType<Renderable | string> | string>
implements CompIOPlugin<Renderable, Tag> {
  wire(node: Node, signature: ComponentSignature) {
    if (signature.states) {
      Object.values(signature.states).forEach(state => {
        if (state instanceof State)
          L.attach(state, node);
      });
    }
  }

  priority = PluginPriority.High;
}
