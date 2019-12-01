import { PluginPriority, PluginHost } from '../plugin';
import { CreatePlugin } from '../basic-plugins';
import { RawValue, PropsType } from '../../../shared/types';
import { isCompProcessPlugin } from './basic-plugins';
import { CompType, isCompClass } from './types';


export class ComponentPlugin<Renderable=RawValue, Tag=CompType<Renderable, string> | string>
  implements CreatePlugin<Renderable | RawValue, Tag | CompType<Renderable, Tag> | string> {

  priority = PluginPriority.High;

  private _host: PluginHost<Renderable | RawValue, Tag | CompType<Renderable, Tag> | string>;

  plugged(host: PluginHost<Renderable | RawValue, Tag | CompType<Renderable, Tag> | string>) {
    this._host = host;
  }

  create(
    tag: string | CompType<Renderable, Tag> | Tag, 
    props: PropsType<RawValue | Renderable> | undefined, 
    ...children: (RawValue | Renderable | Node)[]): Node | undefined {
    if (typeof tag === 'function') {
      let compFunc = tag as CompType<Renderable | RawValue, Tag>;
      let extras = {};
      let _props = props || {};
      let post = this._host.plugins
        .filter(isCompProcessPlugin)
        .map(plugin => plugin.prepare(compFunc, _props, children, extras));

      let _res: Node;
      if (isCompClass(compFunc)) {
        let comp = new compFunc(_props, children, extras as any);
        _res = comp.render(this._host as any);

        if (_props && _props._ref)
          (_props._ref as any).resolve(comp);
      }
      else
        _res = compFunc.apply(extras, [_props, this._host, children]);

      post.reverse().forEach(p => { if (p) p(_res); });

      return _res;
    }
    else return undefined;
  }
}