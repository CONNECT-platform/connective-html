import { Subject, Observable } from "rxjs";
import { isPinLike, Bindable, sink } from "@connectv/core";

import * as L from "../../../shared/life-cycle";
import { RawValue } from "../../../shared/types";

import { PluginPriority } from "../plugin";
import { CompInputOptions, CompFunc, ComponentSignature, CompInputWithOptions } from "../component/types";
import { CompPropPlugin } from "../component/basic-plugins";


export class CompInputSubject<T> extends Subject<T> implements CompInputWithOptions<T> {
  constructor(readonly inputOptions: CompInputOptions<T> = {}) {
    super();
  }
}


export class CompInputSubjectPlugin<Renderable=RawValue, Tag=CompFunc<Renderable | string> | string>
implements CompPropPlugin<Renderable, Tag> {
  wireProp(name: string, prop: any, node: Node, signature: ComponentSignature) {
    if (signature.inputs && name in signature.inputs && signature.inputs[name] instanceof Subject) {
      let input = signature.inputs[name] as Subject<any>;
      if (prop instanceof Observable) prop.subscribe(input);
      else if (isPinLike(prop)) L.attach(prop.to(sink(v => input.next(v))), node);
      else {
        L.attach(<Bindable>{
          bind() {
            setImmediate(() => {
              input.next(prop);
              input.complete();
            })
          }
        }, node);
      }

      return true;
    }

    return false;
  }

  priority = PluginPriority.High;
}

