import { RawValue, PropsType } from '../shared/types';

import { Renderer } from './renderer';
import { Plugin, PluginHost } from './plugin/plugin';
import { isCreatePlugin, isPostCreatePlugin, isPropertyPlugin, isAppendPlugin, isPostRenderPlugin } 
  from './plugin/basic-plugins';


export class ExtensibleRenderer<Renderable=RawValue, Tag=string> 
  extends Renderer<Renderable, Tag>
  implements PluginHost<Renderable, Tag> {
  readonly plugins: Plugin<Renderable, Tag>[];

  constructor(...plugins: Plugin<Renderable, Tag>[]) {
    super();
    this.plugins = [];

    for (let i = 0; i < plugins.length; i++) {
      const plugin = plugins[i];

      if (!this.plugins.includes(plugin)) {
        if (plugin.unique !== undefined) {
          let filter = plugin.unique;
          this.plugins = this.plugins.filter(p => !filter(p));
        }
  
        this.plugins.push(plugin);
        if (plugin.plugged) plugin.plugged(this);
      }
    }

    this.plugins.sort((a, b) => a.priority - b.priority);
  }

  public plug(...plugins: Plugin<Renderable, Tag>[]) {
    return new ExtensibleRenderer<Renderable, Tag>(...(<Plugin<Renderable, Tag>[]>[]).concat(this.plugins, plugins));
  }

  public create(
      tag: Tag | string, 
      props: PropsType<RawValue | Renderable> | undefined, 
      ...children: (RawValue | Renderable | Node)[]
  ): Node {
    let _node: Node | undefined = undefined;
    this.plugins.some(plugin => isCreatePlugin(plugin) && !!(_node = plugin.create(tag, props, ...children)));
    if (_node) return _node;

    _node = super.create(tag, props, ...children);
    this.plugins.filter(isPostCreatePlugin).forEach(plugin => plugin.postCreate(_node as Node));
    return _node;
  }

  public setprop(prop: string, target: RawValue | Renderable, host: HTMLElement) {
    if (this.plugins.some(plugin => isPropertyPlugin(plugin) && plugin.setprop(prop, target, host))) return;
    super.setprop(prop, target, host);
  }

  public append(target: RawValue | Renderable | Node | (RawValue | Renderable | Node)[], host: Node) {
    if (this.plugins.some(plugin => isAppendPlugin(plugin) && plugin.append(target, host))) return;
    super.append(target, host);
  }

  public render(node: Node) {
    let _res = super.render(node);
    let _postRender = this.plugins.filter(isPostRenderPlugin);

    let _do = (_fn: () => Node) => {
      let children;
      if (node instanceof DocumentFragment) children = Array.from(node.childNodes);

      let _R = _fn();

      if (children)
        children.forEach(child => _postRender.forEach(plugin => plugin.postRender(child)));
      else
        _postRender.forEach(plugin => plugin.postRender(node));
      return _R;
    };

    return {
      target: _res.target,
      on(host: Node) { return _do(() => _res.on(host)); },
      before(ref: Node) { return _do(() => _res.before(ref)); },
      after(ref: Node) { return _do(() => _res.after(ref)); }
    }
  }
}
