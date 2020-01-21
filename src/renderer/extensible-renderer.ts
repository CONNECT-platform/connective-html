import { RawValue, PropsType } from '../shared/types';

import { Renderer, ChildType } from './renderer';
import { Plugin, PluginHost } from './plugin/plugin';
import { isCreatePlugin, isPostCreatePlugin, isPropertyPlugin, isAppendPlugin, isPostRenderPlugin } 
  from './plugin/basic-plugins';
import { ToBeRendered } from './renderer-like';


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
          let filter = plugin.unique.bind(plugin);
          this.plugins = this.plugins.filter(p => !filter(p));
        }
  
        this.plugins.push(plugin);
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
      ...children: ChildType<Renderable>[]
  ): Node {
    let _node: Node | undefined = undefined;
    this.plugins.some(plugin => isCreatePlugin(plugin) && !!(_node = plugin.create(tag, props, children, this)));

    if (!_node) _node = super.create(tag, props, ...children);
    this.plugins.filter(isPostCreatePlugin).forEach(plugin => plugin.postCreate(_node as Node, this));
    return _node;
  }

  public setprop(prop: string, target: RawValue | Renderable, host: HTMLElement) {
    if (this.plugins.some(plugin => isPropertyPlugin(plugin) && plugin.setprop(prop, target, host, this))) return;
    super.setprop(prop, target, host);
  }

  public append(target: ChildType<Renderable>, host: Node) {
    if (Array.isArray(target)) {
      target.forEach(_ => this.append(_, host));
    }
    else {
      if (this.plugins.some(plugin => isAppendPlugin(plugin) && plugin.append(target, host, this))) return;
      super.append(target, host);
    }
  }

  public render<T extends Node>(node: T): ToBeRendered<T> {
    let _res = super.render(node);
    let _postRender = this.plugins.filter(isPostRenderPlugin);

    let _do = (_fn: () => T) => {
      let children;
      if (node instanceof DocumentFragment) children = Array.from(node.childNodes);

      let _R = _fn();

      if (children)
        children.forEach(child => _postRender.forEach(plugin => plugin.postRender(child, this)));
      else
        _postRender.forEach(plugin => plugin.postRender(node, this));
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
