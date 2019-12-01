import { isPinLike, PinLike, wrap, value } from "@connectv/core";
import { Pin } from "@connectv/core/dist/es5";
import { Observable } from "rxjs";

import { RawValue } from "../../../shared/types";

import { PluginPriority } from "../plugin";
import { CompInputWithOptions, CompInputOptions, CompType, ComponentSignature } from "../component/types";
import { CompPropPlugin } from "../component/basic-plugins";


export class CompInputPin extends Pin implements CompInputWithOptions<any> {
  constructor(readonly inputOptions: CompInputOptions<any> = {}) { 
    super();
  }
}


export class CompInputPinPlugin<Renderable=RawValue, Tag=CompType<Renderable | string> | string>
implements CompPropPlugin<Renderable, Tag> {
  wireProp(name: string, prop: any, _: Node, signature: ComponentSignature) {
    if (signature.inputs && name in signature.inputs && isPinLike(signature.inputs[name])) {
      let input = signature.inputs[name] as PinLike;
      if (isPinLike(prop)) prop.to(input);
      else if (prop instanceof Observable) wrap(prop).to(input);
      else value(prop).to(input);

      return true;
    }

    return false;
  }

  priority = PluginPriority.High;
}
