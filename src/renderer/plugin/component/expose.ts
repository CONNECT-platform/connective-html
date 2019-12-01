import { RawValue, PropsType } from '../../../shared/types';

import { PluginPriority, PluginHost } from '../plugin';
import { CompProcessPlugin, isCompIOPlugin, isCompPropPlugin } from './basic-plugins';
import { CompType, ComponentSignature, ExposeFunction } from './types';
import { ComponentInputUnrecognizedError, ComponentOutputUnrecognizedError } from './errors/unhandled-signature-prop.error';


export class ExposePlugin<Renderable=RawValue, Tag=CompType<Renderable | string> | string>
  implements CompProcessPlugin<Renderable, Tag> {

  private _host: PluginHost<Renderable | RawValue, Tag | CompType<Renderable, Tag> | string>;

  plugged(host: PluginHost<Renderable | RawValue, Tag | CompType<Renderable, Tag> | string>) {
    this._host = host;
  }

  prepare(
    comp: CompType<RawValue | Renderable, Tag>, 
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

    return (node: Node) => {
      this._host.plugins
        .filter(isCompIOPlugin)
        .forEach(plugin => 
          plugin.wire(node, _signature, props, comp, children)
        );

      let _propPlugins = this._host.plugins.filter(isCompPropPlugin);
      Object.entries(props).forEach(([name, prop]) => {
        if (!_propPlugins.find(plugin => plugin.wireProp(name, prop, node, _signature))) {
          if (_signature.inputs && name in _signature.inputs)
            throw new ComponentInputUnrecognizedError(name, props);
          else if (_signature.outputs && name in _signature.outputs)
            throw new ComponentOutputUnrecognizedError(name, props);
        }
      });
    }
  }

  priority = PluginPriority.High;
}