import { RawValue, PropsType } from '../../../shared/types';

import { PluginPriority, PluginHost } from '../plugin';
import { CompProcessPlugin, isCompIOPlugin, isCompPropPlugin, isDefaultReactiveRecipientPlugin } from './basic-plugins';
import { CompType, ComponentSignature, ExposeFunction } from './types';
import { ComponentInputUnrecognizedError, ComponentOutputUnrecognizedError } from './errors/unhandled-signature-prop.error';


export class ExposePlugin<Renderable=RawValue, Tag=CompType<Renderable | string> | string>
  implements CompProcessPlugin<Renderable, Tag> {

  prepare(
    comp: CompType<RawValue | Renderable, Tag>, 
    props: PropsType<Renderable | RawValue>,
    children: (RawValue | Renderable | Node)[], 
    extras: { [name: string]: any; },
    pluginHost: PluginHost<RawValue | Renderable, Tag>,
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

    let _plugin = pluginHost.plugins.find(isDefaultReactiveRecipientPlugin);
    let _defaultI = () => _plugin?_plugin.defaultInput():undefined;
    let _defaultO = () => _plugin?_plugin.defaultOutput():undefined;
    let _defaultS = () => _plugin?_plugin.defaultState():undefined;

    expose.in = (name: string, i?: any) => { let _ = i || _defaultI(); expose({inputs: {[name]: _}}); return _ }
    expose.out = (name: string, o?: any) => { let _ = o || _defaultO(); expose({outputs: {[name]: _}}); return _ }
    expose.state = (name: string, s?: any) => { let _ = s || _defaultS(); expose({states: {[name]: _}}); return _ }

    extras.expose = expose;

    return (node: Node) => {
      pluginHost.plugins
        .filter(isCompIOPlugin)
        .forEach(plugin => 
          plugin.wire(node, _signature, props, comp, children, pluginHost)
        );

      let _propPlugins = pluginHost.plugins.filter(isCompPropPlugin);
      Object.entries(props).forEach(([name, prop]) => {
        if (!_propPlugins.find(plugin => plugin.wireProp(name, prop, node, _signature, pluginHost))) {
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