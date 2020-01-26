import { isPinLike, source, Source } from "@connectv/core";
import { Subject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

import * as L from "../../../shared/life-cycle";

import { PluginPriority } from "../plugin";
import { CompType, ComponentSignature } from "../component/types";
import { CompPropPlugin } from "../component/basic-plugins";
import trackable from "./trackable";


export class CompOutputObservablePlugin<Renderable=RawValue, Tag=CompType<Renderable | string> | string>
implements CompPropPlugin<Renderable, Tag> {
  priority = PluginPriority.High;

  wireProp(name: string, prop: any, node: Node, signature: ComponentSignature) {
    if (signature.outputs && name in signature.outputs && signature.outputs[name] instanceof Observable) {
      let output = signature.outputs[name] as Observable<any>;
      if (prop instanceof Subject) {
        let sub = prop;
        L.attach(trackable(output.pipe(tap(v => sub.next(v)))), node);

        return true;
      }
      else if (isPinLike(prop)) {
        let src: Source;
        if (prop instanceof Source) src = prop;
        else src = prop.from(source()) as Source;

        L.attach(trackable(output.pipe(tap(v => src.send(v)))), node);
        
        return true;
      }
      else if (typeof prop == 'function') {
        let func = prop;
        L.attach(trackable(output.pipe(tap(v => func(v)))), node);

        return true;
      }
    }

    return false;
  }
}
