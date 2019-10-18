import { isPinLike, sink } from '@connectv/core';

import * as L from '../../../shared/life-cycle';
import { RawValue } from "../../../shared/types";

import { polyfillCustomEvent } from '../util/custom-event.polyfill';
import { PluginPriority } from "../plugin";

import { CompFunc, ComponentSignature } from "../component/types";
import { CompIOPlugin } from "../component/basic-plugins";


export class CompOutputPinEventsPlugin<Renderable=RawValue, Tag=CompFunc<Renderable | string> | string>
implements CompIOPlugin<Renderable, Tag> {
  wire(node: Node, signature: ComponentSignature) {
    if (!(node instanceof DocumentFragment) && signature.outputs) {

      polyfillCustomEvent();

      Object.entries(signature.outputs).forEach(([name, output]) => {
        if (isPinLike(output))
          L.attach(output.to(
              sink(value => 
                node.dispatchEvent(new CustomEvent(name, {detail: {value}}))
              )
          ), node);
      });
    }
  }

  priority = PluginPriority.High;
}
