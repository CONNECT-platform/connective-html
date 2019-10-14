import { RawValue, PropsType } from '../../../shared/types';

import { PluginPriority, PluginHost } from '../plugin';
import { CompProcessPlugin, isCompIOPlugin } from './basic-plugins';
import { CompFunc, ComponentSignature, ExposeFunction } from './types';


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
      inputs: {},
      outputs: {},
      states: {}
    };
    
    let expose: ExposeFunction = ((signature: ComponentSignature) => {
      if (signature.inputs) Object.assign(_signature.inputs, signature.inputs);
      if (signature.outputs) Object.assign(_signature.outputs, signature.outputs);
      if (signature.states) Object.assign(_signature.states, signature.states);
    }) as any;

    expose.in = (name: string, input: any) => { expose({inputs: {[name]: input}}); }
    expose.out = (name: string, output: any) => { expose({outputs: {[name]: output}}); }
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