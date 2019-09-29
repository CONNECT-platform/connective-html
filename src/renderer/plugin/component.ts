import { CreatePlugin, PluginPriority, PluginHost } from './plugin';
import { RawValue, PropsType } from '../../shared/types';
import { Renderer } from '../renderer';
import { CompFunc, isCompInvokePlugin, isCompPostInvokePlugin } from './comp-plugins';


export class ComponentPlugin<Renderable=RawValue, Tag=CompFunc<Renderable, string> | string>
  implements CreatePlugin<Renderable | RawValue, Tag | CompFunc<Renderable, Tag> | string> {

  priority = PluginPriority.High;

  private _host: PluginHost<Renderable | RawValue, Tag | CompFunc<Renderable, Tag> | string>;

  plugged(host: PluginHost<Renderable | RawValue, Tag | CompFunc<Renderable, Tag> | string>) {
    this._host = host;
  }

  create(
    tag: string | CompFunc<Renderable, Tag> | Tag, 
    props: PropsType<RawValue | Renderable> | undefined, 
    ...children: (RawValue | Renderable | Node)[]): Node | undefined{
    if (typeof tag === 'function') {
      let compFunc = tag as CompFunc<Renderable, Tag>;
      let _res: Node | [Node, ...any[]] | undefined = undefined;
      this._host.plugins.some(plugin => isCompInvokePlugin(plugin) && 
        !!(_res = plugin.invoke(props, this._host, ...children)));
      
      if (!_res) _res = compFunc(props, this._host, children);
      if (_res) {
        let _R = _res;
        this._host.plugins.filter(isCompPostInvokePlugin).forEach(p => p.postInvoke(_R));
        
        if (Array.isArray(_R)) return _R[0];
        else return _R;
      }
      else {
        //TODO: throw error
      }
    }
    else return undefined;
  }
}