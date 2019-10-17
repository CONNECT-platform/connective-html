import { isPinLike, PinLike, Source, source, sink } from "@connectv/core";
import { Subject } from "rxjs";

import * as L from "../../../shared/life-cycle";
import { RawValue } from "../../../shared/types";

import { PluginPriority } from "../plugin";
import { CompFunc, ComponentSignature } from "../component/types";
import { CompPropPlugin } from "../component/basic-plugins";


export class CompOutputPinPlugin<Renderable=RawValue, Tag=CompFunc<Renderable | string> | string>
implements CompPropPlugin<Renderable, Tag> {
  priority = PluginPriority.High;

  wireProp(name: string, prop: any, node: Node, signature: ComponentSignature) {
    if (signature.outputs && name in signature.outputs && isPinLike(signature.outputs[name])) {
      let output = signature.outputs[name] as PinLike;
      let src = (output instanceof Source)?output:(output.to(source()) as Source);
      L.attach(src, node);

      if (isPinLike(prop)) {
        src.to(prop);
        return true;
      }
      else if (prop instanceof Subject) {
        L.attach(src.to(sink(v => prop.next(v))), node);
        return true;
      }
      else if (typeof prop == 'function') {
        L.attach(src.to(sink(v => prop(v))), node);
        return true;
      }
    }

    return false;
  }
}