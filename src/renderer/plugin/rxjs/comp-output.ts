import { isPinLike, source, Source } from "@connectv/core";
import { Subject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

import * as L from "../../../shared/life-cycle";
import { RawValue, PropsType } from "../../../shared/types";

import { PluginPriority } from "../plugin";
import { CompFunc, ComponentSignature } from "../component/types";
import { CompIOPlugin } from "../component/basic-plugins";
import { BadComponentOutputTypeError } from "../component/errors/bad-output-type.error";
import trackable from "./trackable";


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
          if (name in props && output instanceof Observable) {
            let prop = props[name];

            if (prop instanceof Subject) {
              let sub = prop;
              L.attach(trackable(output.pipe(tap(v => sub.next(v)))), node);
            }
            else if (isPinLike(prop)) {
              let src: Source;
              if (prop instanceof Source) src = prop;
              else src = prop.from(source()) as Source;

              L.attach(trackable(output.pipe(tap(v => src.send(v)))), node);
            }
            else if (typeof prop === 'function') {
              let func = prop;
              L.attach(trackable(output.pipe(tap(v => func(v)))), node);
            }
            else throw new BadComponentOutputTypeError(name, prop, ['PinLike', 'Subject', 'function']);
          }
        });
      }
    }
}