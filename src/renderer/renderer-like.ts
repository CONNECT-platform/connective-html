import { RawValue, PropsType } from '../shared/types';


export interface ToBeRendered<T extends Node> {
  on(host: Node): T;
  after(ref: Node): T;
  before(ref: Node): T;
  target: T;
}


export interface RendererLike<Renderable, Tag> {
  create(
    tag: string | Tag, 
    props: PropsType<Renderable | RawValue> | undefined, 
    ...children: (Renderable | RawValue | Node)[]
  ): Node;

  setprop(prop: string, target: RawValue | Renderable, host: HTMLElement): void;
  append(target: RawValue | Renderable | Node | (RawValue | Renderable | Node)[], host: Node): void;
  render<T extends Node>(node: T): ToBeRendered<T>;
}
