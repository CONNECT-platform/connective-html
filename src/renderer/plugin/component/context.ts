import { source, Source, isPinLike } from "@connectv/core";

import { RawValue, PropsType } from "../../../shared/types";
import * as L from "../../../shared/life-cycle";
import * as Context from "../../../shared/context";

import { PluginPriority } from "../plugin";

import { CompType, ContextFunction } from "./types";
import { CompProcessPlugin } from "./basic-plugins";
import { Subscription, Observable } from "rxjs";


export class ContextPlugin<Renderable=RawValue, Tag=CompType<Renderable | string> | string>
  implements CompProcessPlugin<Renderable, Tag> {

    prepare(
      _: CompType<RawValue | Renderable, Tag>, 
      __: PropsType<Renderable | RawValue>,
      ___: (RawValue | Renderable | Node)[], 
      extras: { [name: string]: any; }
    ): (node: Node) => void {

      const map: {[key: string]: Source} = {};
      const context: ContextFunction = (key: string) => map[key] = map[key] || source();
      extras.context = context;

      return (node: Node) => {
        const sub = new Subscription();
        L.attach({
          bind() {
            setImmediate(() => {
              let _ref = node;
              if (node instanceof DocumentFragment) _ref = L.getLifeCycleMarker(node);
  
              const ctx = Context.resolve(_ref, Object.keys(map));
              Object.entries(map).forEach(([key, source]) => {
                const value = ctx[key];
                if (isPinLike(value)) sub.add(value.subscribe(v => source.send(v)));
                else if (value instanceof Observable) sub.add(value.subscribe(v => source.send(v)));
                else source.send(value);
              });
            });
          },
          clear() {
            sub.unsubscribe();
          }
        }, node);
      }
    }

  priority = PluginPriority.High;
}