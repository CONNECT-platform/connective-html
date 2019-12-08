import { RawValue, PropsType } from "../../../shared/types";
import * as L from "../../../shared/life-cycle";
import * as Context from "../../../shared/context";

import { PluginPriority, PluginHost } from "../plugin";

import { CompType } from "./types";
import { CompProcessPlugin, isCompContextPlugin } from "./basic-plugins";
import { Subscription } from "rxjs";
import { UnhandledComponentContextError } from "./errors/unhandled-component-context.error";


export class ContextPlugin<Renderable=RawValue, Tag=CompType<Renderable | string> | string>
  implements CompProcessPlugin<Renderable, Tag> {

    prepare(
      _: CompType<RawValue | Renderable, Tag>, 
      __: PropsType<Renderable | RawValue>,
      ___: (RawValue | Renderable | Node)[], 
      extras: { [name: string]: any; },
      pluginHost: PluginHost<Renderable, Tag>,
    ): (node: Node) => void {

      const map: {[key: string]: any} = {};
      const context = <T>(key: string, recipient?: T): T => map[key] = map[key] || recipient;
      extras.context = context;

      return (node: Node) => {
        const sub = new Subscription();
        const _ctxPlugins = pluginHost.plugins.filter(isCompContextPlugin);

        L.attach({
          bind() {
            setImmediate(() => {
              let _ref = node;
              if (node instanceof DocumentFragment) _ref = L.getLifeCycleMarker(node);
  
              const ctx = Context.resolve(_ref, Object.keys(map));
              Object.entries(map).forEach(([key, recipient]) => {
                const value = ctx[key];
                if (!_ctxPlugins.find(p => p.wireContext(key, value, recipient, sub, _ref, pluginHost)))
                  throw new UnhandledComponentContextError(key, recipient, value);
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