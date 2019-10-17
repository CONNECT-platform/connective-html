import { isPinLike, sink, source, Source } from "@connectv/core";
import { Subject } from "rxjs";

import * as L from "../../../shared/life-cycle";
import { RawValue, PropsType } from "../../../shared/types";

import { PluginPriority } from "../plugin";
import { CompFunc, ComponentSignature } from "../component/types";
import { CompIOPlugin } from "../component/basic-plugins";
import { BadComponentOutputTypeError } from "../component/errors/bad-output-type.error";


export class CompOutputPlugin<Renderable=RawValue, Tag=CompFunc<Renderable | string> | string>
implements CompIOPlugin<Renderable, Tag> {
  priority = PluginPriority.High;

  wire(
    node: Node, 
    signature: ComponentSignature, 
    props?: PropsType<RawValue | Renderable> | undefined, 
    ): void {
      if (signature.outputs && props) {
        Object.entries(signature.outputs).forEach(([name, output]) => {
          if (name in props && isPinLike(output)) {
            let prop = props[name];

            if (isPinLike(prop)) {
              if (output instanceof Source) {
                let src = output; src.to(prop);
                L.attach(src, node);
              }
              else {
                let src = source(); src.to(prop);
                L.attach(output.to(sink(v => src.send(v))), node);
                L.attach(src, node);
              }
            }
            else if (prop instanceof Subject) {
              let sub = prop;
              L.attach(output.to(sink(v => sub.next(v))), node);
            }
            else if (typeof prop === 'function') {
              let func = prop;
              L.attach(output.to(sink(v => func(v))), node);
            }
            else throw new BadComponentOutputTypeError(name, prop, ['PinLike', 'Subject', 'function']);
          }
        });
      }
    }
}