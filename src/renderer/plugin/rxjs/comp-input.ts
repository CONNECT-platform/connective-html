import { Subject, Observable } from "rxjs";
import { isPinLike, PinLike } from "@connectv/core";

import * as L from "../../../shared/life-cycle";
import { RawValue, PropsType } from "../../../shared/types";

import { PluginPriority } from "../plugin";
import { CompInputOptions, CompFunc, ComponentSignature, CompInputOptionsSpecified } from "../component/types";
import { CompIOPlugin } from "../component/basic-plugins";
import { ComponentInputMissingError } from "../component/errors/input-missing.error";
import { Bindable } from "@connectv/core/dist/es5";



export class CompInputSubject<T> extends Subject<T> {
  constructor(readonly options: CompInputOptions<T>) {
    super();
  }
}


export class CompInputPlugin<Renderable=RawValue, Tag=CompFunc<Renderable | string> | string>
implements CompIOPlugin<Renderable, Tag> {
  wire(
    node: Node, 
    signature: ComponentSignature, 
    props?: PropsType<RawValue | Renderable> | undefined, 
    ): void {
    if (signature.inputs) {
      Object.entries(signature.inputs).forEach(([name, input]) => {
        if (input instanceof Subject) {
          let options: CompInputOptions<any> = { required: false };
          if (input instanceof CompInputSubject) options = input.options;

          if (props && name in props) {
            let prop = props[name];
            if (prop instanceof Observable) prop.subscribe(input);
            else if (isPinLike(prop)) {
              let pin = prop;
              L.attach(<Bindable>{
                bind() {
                  pin.observable.subscribe(input);
                }
              }, node);
            }
            else {
              L.attach(<Bindable>{
                bind() {
                  setImmediate(() => {
                    input.next(prop);
                    input.complete();
                  });
                }
              }, node);
            }
          }
          else {
            if ((<CompInputOptionsSpecified<any>>options).required) {
              throw new ComponentInputMissingError(name, props);
            }
            else {
              if (options.default) {
                L.attach(<Bindable>{
                  bind() {
                    setImmediate(() => {
                      input.next(options.default);
                      input.complete();
                    });
                  }
                }, node);
              }
            }
          }
        }
      });
    }
  }  
  
  priority = PluginPriority.High;
}