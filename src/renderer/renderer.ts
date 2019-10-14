import { PropsType, RawValue, isRawValue } from '../shared/types';

import { ToBeRendered, RendererLike } from './renderer-like';

import { UnsupportedTagTypeError } from './error/unsupported-tag.error';
import { UnsupportedPropError } from './error/unsupported-prop.error';
import { UnsupportedChildError } from './error/unsupported-child.error';


export class Renderer<Renderable=RawValue, Tag=string> implements RendererLike<Renderable, Tag> {
  public create(
    tag: string | Tag, 
    props: PropsType<Renderable | RawValue> | undefined, 
    ...children: (Renderable | RawValue | Node)[]
  ): Node {
    if (typeof tag == 'string') {
      let el: Node;
      if (tag === 'fragment') el = document.createDocumentFragment();
      else {
        el = document.createElement(tag);
        if (props)
          Object.entries(props).forEach(([prop, target]) => this.setprop(prop, target, el as HTMLElement));
      }
      
      children.forEach(child => this.append(child, el));
      return el;
    }
    else {
      throw new UnsupportedTagTypeError(tag, this);
    }
  }

  public setprop(prop: string, target: RawValue | Renderable, host: HTMLElement) {
    if (isRawValue(target)) {
      if (typeof target === 'boolean' && target)
        host.setAttribute(prop, '');
      else
        host.setAttribute(prop, target.toString());
    }
    else {
      throw new UnsupportedPropError(target, this);
    }
  }

  public append(target: RawValue | Renderable | Node | (RawValue | Renderable | Node)[], host: Node) {
    if (target instanceof Node)
      host.appendChild(target);
    else if (Array.isArray(target))
      target.forEach(_ => this.append(_, host));
    else if (isRawValue(target))
      host.appendChild(document.createTextNode(target.toString()));
    else {
      throw new UnsupportedChildError(target, this);
    }
  }

  public render<T extends Node>(node: T): ToBeRendered<T> {
    return {
      target: node,
      on(host: Node) {
        host.appendChild(node);
        return node;
      },
      before(ref: Node) {
        if (ref.parentNode)
          ref.parentNode.insertBefore(node, ref);
        return node;
      },
      after(ref: Node) {
        if (ref.parentNode)
          ref.parentNode.insertBefore(node, ref.nextSibling);
        return node;
      }
    };
  }
}


export default Renderer;
