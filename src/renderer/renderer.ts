import { PropsType, RawValue, isRawValue } from '../shared/types';

import { UnsupportedTagTypeError } from './error/unsupported-tag.error';
import { UnsupportedPropError } from './error/unsupported-prop.error';
import { UnsupportedChildError } from './error/unsupported-child.error';


export interface ToBeRendered {
  on(host: Node): Node;
  target: Node;
}


export class Renderer<Renderable=RawValue, Tag=string> {
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
    if (isRawValue(target))
      host.setAttribute(prop, target.toString());
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

  public render(node: Node): ToBeRendered {
    return {
      target: node,
      on(host: Node) {
        host.appendChild(node);
        return host;
      }
    };
  }
}

export default Renderer;
