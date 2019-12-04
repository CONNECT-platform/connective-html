import { set } from '../shared/context';

import { RendererLike } from '../renderer/renderer-like';
import { CompType } from '../renderer/plugin/component/types';


export function Context(props: any, renderer: RendererLike<any, any | CompType>, children: any[]) {
  let scope = <marker>{children}</marker>;
  set(scope, props);
  return scope;
}
