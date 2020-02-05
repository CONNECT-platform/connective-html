import { State, SimpleDeep } from "@connectv/core";

import { PluginPriority } from "../plugin";
import { CompType, ComponentSignature } from "../component/types";
import { CompPropPlugin } from "../component/basic-plugins";


export class CompStateBindPlugin<Renderable=RawValue, Tag=CompType<Renderable | string> | string>
implements CompPropPlugin<Renderable, Tag> {
  wireProp(name: string, prop: any, _: Node, signature: ComponentSignature) {
    if (signature.states && name in signature.states
        && (signature.states[name] instanceof State || signature.states[name] instanceof SimpleDeep)
        && (prop instanceof State || prop instanceof SimpleDeep)) {
      let state = signature.states[name];

      prop.to(state).to(prop);

      return true;
    }

    return false;
  }

  priority = PluginPriority.High;
}
