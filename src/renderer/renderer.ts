import { PropsType, isRawValue } from '../shared/types';

import { ToBeRendered, RendererLike } from './renderer-like';

import { UnsupportedTagTypeError } from './error/unsupported-tag.error';
import { UnsupportedPropError } from './error/unsupported-prop.error';
import { UnsupportedChildError } from './error/unsupported-child.error';


export type ChildType<Renderable> = Renderable | RawValue | Node | ChildArray<Renderable>;
export interface ChildArray<Renderable> extends Array<ChildType<Renderable>> {}


/**
 *
 * Wraps DOM API so that it is compatible with JSX/TSX expected syntax, by providing
 * a JSX factory function with the necessary signature. Additionally, provides some functions
 * to make working with DOM APIs a bit easier (to read/write).
 *
 * For proper JSX/TSX compilation, a JSX factory function is required with a predetermined
 * signature. Assuming that `renderer` is an instance of `Renderer` (this class),
 * `renderer.create()` is such a factory function. So assuming that the renderer in any context
 * is always named `renderer`, configuring typescript to use `renderer.create` function as
 * its TSX factory allows for proper TSX compilation by Typescript compiler.
 *
 */
export class Renderer<Renderable=RawValue, Tag=string> implements RendererLike<Renderable, Tag> {
  /**
   *
   * Creates an HTML `Node` based on given parameters. The signature of this function is designed
   * so that it matches the arguments passed to it match what Typescript compiler passes to
   * a JSX factory.
   *
   * @param tag       the tag of the HTML element to be created. The compiler passes a string in case of
   *                  lowercase-leading arguments (i.e. `sometag`) and passes the object in the context of the same name
   *                  if the first character is uppercase (i.e. `SomeTag`). The former is conventionally
   *                  used to denote native HTML elements, while the latter is used to denote custom elements.
   *                  Passing `fragment` as the tag will cause the renderer to create and return a `DocumentFragment`.
   *
   *
   *                  **NOTE** that the base renderer class is unable to handle custom elements, and in response
   *                  will throw an `UnsupportedTagTypeError`. Any child renderer class might also still
   *                  be unable to handle given custom tags and throw the same error.
   * @param props     The properties of the HTML element to be created. Must be an object whose keys denote the name
   *                  of the property and its values the corresponding values of those properties.
   *                  Uses {@link Renderer#setprop} method to set each property.
   * @param children  Child elements of the HTML element to be created. Each child is appended to the created
   *                  element using {@link Renderer#append} method.
   * @returns {Node}  A `Node` element with given tag (or resolved final tag based on given custom-element), or
   *                  a `DocumentFragment` in-case a fragment is passed.
   *
   * @see Renderer#setprop
   * @see Renderer#append
   *
   */
  public create(
    tag: string | Tag, 
    props: PropsType<Renderable | RawValue> | undefined, 
    ...children: ChildType<Renderable>[]
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

  /**
   *
   * Sets properties (attributes) of created node based on given properties.
   * The base-renderer is able to handle raw values (`number | boolean | string`),
   * and will throw an `UnsupportedPropError` if other unhandled property types
   * are given.
   *
   * @param prop   the name of the property (attribute) to be set
   * @param target the to be set for the property (attribute)
   * @param host   the element on which the property (attribute) is to be set.
   *
   */
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

  /**
   *
   * Appends given child on given host `Node`. If passed an array, will append every element of it (recursively).
   * If a raw value (`number | boolean | string`) is passed, a `TextNode` containing the string format will be appended.
   * In case of an unsupported type, an `UnsupportedChildError` will be thrown.
   *
   * @param target the target to be appended.
   * @param host   the host to which the target should be appended to.
   *
   */
  public append(target: ChildType<Renderable>, host: Node) {
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

  /**
   *
   * Renders given `Node` on, before or after another `Node`. Usage example:
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
   * @param node the `Node` to be rendered.
   * @returns a `TobeRendered` object that can be used to render the given node on, before or after another `Node`.
   *
   */
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
