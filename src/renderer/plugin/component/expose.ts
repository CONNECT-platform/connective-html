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

    /**
     * 
     * FUTURE CHANGE PROPOSAL:
     * 
     * Also run dedicated input, output and state wiring plugins for each of the
     * specified inputs, outputs and states of the given signature that is also provided via
     * the props. These plugins should behave in a non-overlapping manner, i.e. the first plugin 
     * to take responsibility to act upon a specific entry would be the only plugin to do so. 
     * After running these plugins, if a particular entry present in the provided props is not
     * handled by any of the plugins, an error should be thrown.
     * 
     * # Reasoning:
     * 
     * Take the case of a signature entry of type X and a corresponding property of type Y. 
     * Now imagine all plugins that can handle on entries of type X in an overlapping manner.
     * If one such plugin cannot handle the provided type pair, it can either throw an error,
     * which will block other overlapping plugins that might have been able to handle the pair,
     * or it can remain silent, which runs the risk of the pair remaining unhandled silently.
     * 
     * # Impact of Change:
     * 
     * This change would naturally necessitate a change of current CompIO plugins that work on
     * binding inputs and outputs, as they currently will throw an error in case of unrecognized pairs,
     * but with this architecture, they would remain silent and the error would be thrown from here.
     * 
     * # Notice
     * 
     * Further thoughts on this proposed architecture is required, particularly on handling
     * required inputs, or inputs with default values.
     * 
     */
    return (node: Node) => this._host.plugins
                                .filter(isCompIOPlugin)
                                .forEach(plugin => 
                                  plugin.wire(node, _signature, props, comp, children)
                                );
  }

  priority = PluginPriority.High;
}