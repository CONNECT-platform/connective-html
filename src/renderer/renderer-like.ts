import { RawValue, PropsType } from '../shared/types';


export interface ToBeRendered {
  on(host: Node): Node;
  after(ref: Node): Node;
  before(ref: Node): Node;
  target: Node;
}


export interface RendererLike<Renderable, Tag> {
  create(
    tag: string | Tag, 
    props: PropsType<Renderable | RawValue> | undefined, 
    ...children: (Renderable | RawValue | Node)[]
  ): Node;

  setprop(prop: string, target: RawValue | Renderable, host: HTMLElement): void;
  append(target: RawValue | Renderable | Node | (RawValue | Renderable | Node)[], host: Node): void;
  render(node: Node): ToBeRendered;
}
