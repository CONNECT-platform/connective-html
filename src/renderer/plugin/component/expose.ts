import { RawValue, PropsType } from '../../../shared/types';

import { PluginPriority, PluginHost } from '../plugin';
import { CompProcessPlugin, CompFunc, ComponentSignature, isCompIOPlugin } from './basic-plugins';


export type ExposeFunction = {
  (signature: ComponentSignature): void;
  in: (name: string, input: any) => void;
  out: (name: string, output: any) => void;
  state: (name: string, state: any) => void;
};


export class ExposePlugin<Renderable=RawValue, Tag=CompFunc<Renderable | string> | string>
  implements CompProcessPlugin<Renderable, Tag> {

  private _host: PluginHost<Renderable | RawValue, Tag | CompFunc<Renderable, Tag> | string>;

  plugged(host: PluginHost<Renderable | RawValue, Tag | CompFunc<Renderable, Tag> | string>) {
    this._host = host;
  }

  prepare(
    comp: CompFunc<RawValue | Renderable, Tag>, 
    props: PropsType<Renderable | RawValue>,
    children: (RawValue | Renderable | Node)[], 
    extras: { [name: string]: any; }
  ): (node: Node) => void {

    let _signature = <ComponentSignature>{
      in: {},
      out: {},
      states: {}
    };
    
    let expose: ExposeFunction = ((signature: ComponentSignature) => {
      if (signature.in) Object.assign(_signature.in, signature.in);
      if (signature.out) Object.assign(_signature.out, signature.out);
      if (signature.states) Object.assign(_signature.states, signature.states);
    }) as any;

    expose.in = (name: string, input: any) => { expose({in: {[name]: input}}); }
    expose.out = (name: string, output: any) => { expose({out: {[name]: output}}); }
    expose.state = (name: string, state: any) => { expose({states: {[name]: state}}); }
    
    extras.expose = expose;
    
    return (node: Node) => this._host.plugins
                                .filter(isCompIOPlugin)
                                .forEach(plugin => 
                                  plugin.wire(node, _signature, props, comp, children)
                                );
  }

  priority = PluginPriority.High;
}