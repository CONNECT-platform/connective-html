import { PropsType, RawValue, isRawValue } from './types';

import * as lifcycle from './life-cycle';


export interface ToBeRendered {
  on(host: Node): Node;
  target: Node;
}


export class Renderer<Renderable=RawValue> {
  public create(
    tag: string, 
    props: PropsType<Renderable | RawValue> | undefined, 
    ...children: (Renderable | RawValue | Node)[]
  ): Node {
    if (tag == '') {
      return document.createTextNode((children || []).join(''));
    }
    else {
      let el = document.createElement(tag);
      if (props)
        Object.entries(props).forEach(([prop, target]) => this.setprop(prop, target, el));
      
      children.forEach(child => this.append(child, el));
      return el;
    }
  }

  public setprop(prop: string, target: RawValue | Renderable, host: HTMLElement) {
    if (isRawValue(target))
      host.setAttribute(prop, target.toString());
    else {
      //TODO: throw error
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
      //TODO: throw error
    }
  }

  public render(node: Node): ToBeRendered {
    return {
      target: node,
      on(host: Node) {
        host.appendChild(node);
        if (document.contains(node))
          lifcycle.bind(node);

        return host;
      }
    };
  }
}

export default Renderer;