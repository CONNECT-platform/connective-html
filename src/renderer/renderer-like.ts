import { PropsType } from '../shared/types';


/**
 *
 * Denotes a function that requires a renderer to be able to render a `Node`,
 * hence can be rendered by any renderer like
 *
 */
export type RenderableFunction<Renderable, Tag, 
      NodeType extends Node=Node, 
      Renderer extends RendererLike<Renderable, Tag> = RendererLike<Renderable, Tag>> 
      = (renderer: Renderer) => NodeType;


/**
 *
 * Wraps a `Node` that is to be rendered on, before or after on another,
 * yet undetermined `Node`. Usage example:
 *
 * ```tsx
 * renderer.render(<Whatever/>)
 *         .on(document.body);
 *
 * renderer.render(<input/>)
 *         .before(X);
 *
 * renderer.render(Y)
 *         .after(someRef.$);
 * ```
 *
 */
export interface ToBeRendered<T extends Node> {
  /**
   *
   * Renders its `target` on given `Node`.
   *
   * @param host the `Node` on which the `target` should be rendered.
   *
   */
  on(host: Node): T;

  /**
   *
   * Renders its `target` after given `Node`.
   *
   * @param ref the `Node` after which the `target` should be rendered.
   *
   */
  after(ref: Node): T;

  /**
   *
   * Renders its `target` before given `Node`.
   *
   * @param ref the `Node` before which the `target` should be rendered.
   *
   */
  before(ref: Node): T;

  /**
   *
   * The target `Node` that is to be rendered on, before or after another `Node`.
   *
   */
  target: T;
}


/**
 *
 * Denotes any object that behaves like a JSX-compliant renderer, i.e. with API compatible
 * with JSX factory configuration `renderer.create`.
 *
 */
export interface RendererLike<Renderable, Tag> {
  create(
    tag: string | Tag,
    props: PropsType<Renderable | RawValue> | undefined,
    ...children: (Renderable | RawValue | Node)[]
  ): Node;

  setprop(prop: string, target: RawValue | Renderable, host: HTMLElement): void;
  append(target: RawValue | Renderable | Node | (RawValue | Renderable | Node)[], host: Node): void;
  render<T extends Node>(node: T | RenderableFunction<Renderable, Tag, T>): ToBeRendered<T>;
}
