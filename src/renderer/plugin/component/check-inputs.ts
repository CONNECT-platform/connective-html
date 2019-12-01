import { RawValue, PropsType } from "../../../shared/types";

import { PluginPriority } from "../plugin";

import { CompType, ComponentSignature, isCompInputWithOptions, CompInputOptionsSpecified } from "./types";
import { CompIOPlugin } from "./basic-plugins";
import { ComponentInputMissingError } from "./errors/input-missing.error";


export class CheckCompInputsPlugin<Renderable=RawValue, Tag=CompType<Renderable | string> | string>
implements CompIOPlugin<Renderable, Tag> {
  wire(_: Node, signature: ComponentSignature, props: PropsType<Renderable>) {
    if (signature.inputs) {
      Object.entries(signature.inputs).forEach(([name, input]) => {
        if (isCompInputWithOptions<Renderable>(input) && !(name in props)) {
          if (input.inputOptions.default) {
            props[name] = input.inputOptions.default;
          }
          else if ((<CompInputOptionsSpecified<Renderable>>input.inputOptions).required)
            throw new ComponentInputMissingError(name, props);
        }
      });
    }
  }

  priority = PluginPriority.High;
}
