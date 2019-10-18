import { State } from "@connectv/core";

import { RawValue } from "../../../shared/types";

import { PluginPriority } from "../plugin";
import { CompFunc, ComponentSignature } from "../component/types";
import { CompPropPlugin } from "../component/basic-plugins";


export class CompStateBindPlugin<Renderable=RawValue, Tag=CompFunc<Renderable | string> | string>
implements CompPropPlugin<Renderable, Tag> {
  wireProp(name: string, prop: any, _: Node, signature: ComponentSignature) {
    if (signature.states && name in signature.states 
        && signature.states[name] instanceof State 
        && prop instanceof State) {
      let state = signature.states[name];

      prop.to(state).to(prop);

      return true;
    }

    return false;
  }

  priority = PluginPriority.High;
}
