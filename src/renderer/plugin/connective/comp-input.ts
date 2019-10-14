import { isPinLike } from "@connectv/core";

import { RawValue, PropsType } from "../../../shared/types";

import { PluginPriority } from "../plugin";
import { CompFunc, ComponentSignature } from "../component/types";
import { CompIOPlugin } from "../component/basic-plugins";

import { CompInputPin } from "./comp-input-pin";


export class CompInputPlugin<Renderable=RawValue, Tag=CompFunc<Renderable | string> | string>
implements CompIOPlugin<Renderable, Tag> {
  priority = PluginPriority.High;

  wire(
    _: Node, 
    signature: ComponentSignature, 
    props?: PropsType<RawValue | Renderable> | undefined, 
    ): void {
      if (signature.inputs) {
        Object.entries(signature.inputs).forEach(([name, input]) => {
          if (isPinLike(input)) {
            let _input: CompInputPin<any>;

            if (input instanceof CompInputPin) _input = input;
            else _input = input.from(new CompInputPin()) as CompInputPin<any>;

            _input.name(name).read(props);
          }
        });
      }
    }
}