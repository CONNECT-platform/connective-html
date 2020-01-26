import { PropsType } from '../../../shared/types';

import { ChildType } from '../../renderer';
import { PluginPriority, PluginHost } from '../plugin';
import { CreatePlugin } from '../basic-plugins';

import { isCompProcessPlugin } from './basic-plugins';
import { CompType, isCompClass } from './types';


export class ComponentPlugin<Renderable=RawValue, Tag=CompType<Renderable, string> | string>
  implements CreatePlugin<Renderable | RawValue, Tag | CompType<Renderable, Tag> | string> {

  priority = PluginPriority.High;

  create(
    tag: string | CompType<Renderable, Tag> | Tag, 
    props: PropsType<RawValue | Renderable> | undefined, 
    children: ChildType<Renderable>[],
    host: PluginHost<Renderable | RawValue, Tag | CompType<Renderable, Tag> | string>
  ): Node | undefined {
    if (typeof tag === 'function') {
      let compFunc = tag as CompType<Renderable | RawValue, Tag>;
      let extras = {};
      let _props = props || {};
      let post = host.plugins
        .filter(isCompProcessPlugin)
        .map(plugin => plugin.prepare(compFunc, _props, children, extras, host));

      let _res: Node;
      if (isCompClass(compFunc)) {
        let comp = new compFunc(_props, children, extras as any);
        _res = comp.render(host as any);

        if (_props && _props._ref)
          (_props._ref as any).resolve(comp);
      }
      else
        _res = compFunc.apply(extras, [_props, host, children]);

      post.reverse().forEach(p => { if (p) p(_res); });

      return _res;
    }
    else return undefined;
  }
}