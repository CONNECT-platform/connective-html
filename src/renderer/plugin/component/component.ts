import { PluginPriority, PluginHost } from '../plugin';
import { CreatePlugin } from '../basic-plugins';
import { RawValue, PropsType } from '../../../shared/types';
import { isCompProcessPlugin } from './basic-plugins';
import { CompFunc } from './types';


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
    ...children: (RawValue | Renderable | Node)[]): Node | undefined {
    if (typeof tag === 'function') {
      let compFunc = tag as CompFunc<Renderable | RawValue, Tag>;
      let extras = {};
      let post = this._host.plugins
        .filter(isCompProcessPlugin)
        .map(plugin => plugin.prepare(compFunc, props, children, extras));

      let _res = compFunc.apply(extras, [props, this._host, children]);

      post.reverse().forEach(p => { if (p) p(_res); });

      return _res;
    }
    else return undefined;
  }
}