import { isPinLike, sink, wrap } from '@connectv/core';
import { Observable } from 'rxjs';

import { LifeCycle } from './life-cycle';


export type PropsType = {[prop: string]: any};
export type CompType = (props?: PropsType) => HTMLElement;

export interface Renderable {
  on(host: Node): Node;
  target: HTMLElement;
}


class Renderer {
  public create(tagOrComp: string | CompType, props: PropsType | undefined, ...children: (any | Node)[]): HTMLElement {
    let el: HTMLElement;
    let fragment = document.createDocumentFragment();

    if (typeof tagOrComp === 'string') {
      el = document.createElement(tagOrComp);
      (el as any).lifecycle = new LifeCycle(el);
      (fragment as any).lifecycle = (el as any).lifecycle;
      if (props)
        Object.keys(props).forEach(prop => 
          el.setAttribute(prop, props[prop].toString())
        );
    }
    else el = tagOrComp(props);
    
    children.forEach(child => this.append(child, fragment));
    el.appendChild(fragment);

    return el;
  }

  public append(target: any | Node | any[], host: Node) {
    if (target instanceof Node)
      host.appendChild(target);
    else if (isPinLike(target) && (host as any).lifecycle) {
      let lifecycle = (host as any).lifecycle;
      let textNode = document.createTextNode('');
      let pin = target.to(sink(v => textNode.textContent = v));
      lifecycle.toBind(pin).toClear(pin);
      host.appendChild(textNode);
    }
    else if (target instanceof Observable) {
      this.append(wrap(target), host);
    }
    else if (Array.isArray(target))
      target.forEach(_ => this.append(_, host));
    else
      host.appendChild(document.createTextNode(target));
  }

  public render(el: HTMLElement): Renderable;
  public render(tagOrComp: string | CompType, props?: PropsType | null, ...children: (any | Node)[]): Renderable;
  public render(compOrEl: string | CompType | HTMLElement, props?: PropsType, ...children: (any | Node)[]): Renderable {
    if (compOrEl instanceof HTMLElement) {
      return <Renderable>{
        target: compOrEl,
        on(host: Node) {
          host.appendChild(compOrEl);
          if ((compOrEl as any).lifecycle) {
            if (document.contains(compOrEl))
              (compOrEl as any).lifecycle.bind();
          }

          return host;
        }
      };
    }
    else return this.render(this.create(compOrEl, props, ...children));
  }
}

export default new Renderer();