import { RawValue, PropsType } from '../shared/types';
import { Renderer } from './renderer';
import { Plugin, CreatePlugin, isCreatePlugin, PostCreatePlugin, isPostCreatePlugin, PropertyPlugin, isPropertyPlugin,
  AppendPlugin, isAppendPlugin,PostRenderPlugin, isPostRenderPlugin,
} from './plugin/plugin';


export class ExtensibleRenderer<Renderable=RawValue, Tag=string> extends Renderer<Renderable, Tag> {
  readonly plugins: Plugin<Renderable, Tag>[];
  private _create: CreatePlugin<Renderable, Tag>[];
  private _postCreate: PostCreatePlugin[];
  private _property: PropertyPlugin<Renderable>[];
  private _append: AppendPlugin<Renderable>[];
  private _postRender: PostRenderPlugin[];

  private _plug<T extends Plugin<Renderable, Tag>>(plugin: T, list: T[]) {
    if (!list) list = [];
    if (!list.includes(plugin)) {
      list.push(plugin);
      list.sort((a, b) => a.priority - b.priority);
    }

    return list;
  }

  constructor(...plugins: Plugin<Renderable, Tag>[]) {
    super();
    plugins.forEach(plugin => {
      if (isCreatePlugin(plugin)) this._create = this._plug(plugin, this._create);
      if (isPostCreatePlugin(plugin)) this._postCreate = this._plug(plugin, this._postCreate);
      if (isPropertyPlugin(plugin)) this._property = this._plug(plugin, this._property);
      if (isAppendPlugin(plugin)) this._append = this._plug(plugin, this._append);
      if (isPostRenderPlugin(plugin)) this._postRender = this._plug(plugin, this._postRender);
    });

    this.plugins = plugins;
  }

  public plug(...plugins: Plugin<Renderable, Tag>[]) {
    return new ExtensibleRenderer<Renderable, Tag>(...(<Plugin<Renderable, Tag>[]>[]).concat(this.plugins, plugins));
  }

  public create(
      tag: Tag | string, 
      props: PropsType<RawValue | Renderable> | undefined, 
      ...children: (RawValue | Renderable | Node)[]
  ): Node {
    if (this._create) {
      let _node: Node;
      for (let plugin of this._create) {
        _node = plugin.create(tag, props, ...children);
        if (_node) return _node;
      }
    }

    let _node = super.create(tag, props, ...children);
    if (this._postCreate) this._postCreate.forEach(plugin => plugin.postCreate(_node));
    return _node;
  }

  public setprop(prop: string, target: RawValue | Renderable, host: HTMLElement) {
    if (this._property)
      for (let plugin of this._property)
        if(plugin.setprop(prop, target, host)) return;

    super.setprop(prop, target, host);
  }

  public append(target: RawValue | Renderable | Node | (RawValue | Renderable | Node)[], host: Node) {
    if (this._append)
      for (let plugin of this._append)
        if(plugin.append(target, host)) return;

    super.append(target, host);
  }

  public render(node: Node) {
    let _res = super.render(node);
    if (this._postRender) {
      let _this = this;
      return {
        target: _res.target,
        on(host: Node) {
          let children;
          if (node instanceof DocumentFragment) children = Array.from(node.childNodes);

          _res.on(host);

          if (children)
            children.forEach(child => _this._postRender.forEach(plugin => plugin.postRender(child)));
          else
            _this._postRender.forEach(plugin => plugin.postRender(node));
          return host;
        }
      }
    }
    else
      return _res;
  }
}
