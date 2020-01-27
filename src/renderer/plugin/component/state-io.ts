import { PluginPriority } from "../plugin";

import { CompType, ComponentSignature } from "./types";
import { CompIOPlugin } from "./basic-plugins";


export class CompStateIOPlugin<Renderable=RawValue, Tag=CompType<Renderable | string> | string>
implements CompIOPlugin<Renderable, Tag> {
  wire(_: Node, signature: ComponentSignature) {
    if (signature.states) {
      Object.entries(signature.states).forEach(([name, state]) => {
        signature.inputs = signature.inputs || {};
        signature.outputs = signature.outputs || {};

        signature.inputs[name] = state;
        signature.outputs[`on${name[0].toUpperCase() + name.substr(1)}Change`] = state;
      });
    }
  }

  priority = PluginPriority.High;
}
