import { Plugin } from './plugin';
import { RawValue, PropsType } from '../../shared/types';
import { RendererLike } from '../renderer-like';


export type CompFunc<Renderable=RawValue, Tag=string> = (
  props: PropsType<RawValue | Renderable> | undefined,
  renderer: RendererLike<Renderable, Tag|CompFunc<Renderable, Tag>>,
  children: (RawValue | Renderable | Node)[],
  ...rest: any[]) => Node | [Node, ...any[]];
  

export interface CompInvokePlugin<Renderable=RawValue, Tag=string>
  extends Plugin<Renderable, Tag | CompFunc<Renderable, Tag>> {
  invoke(
    props: PropsType<RawValue | Renderable> | undefined,
    renderer: RendererLike<Renderable, Tag>, 
    ...children: (RawValue | Renderable | Node)[]
  ): Node | [Node, ...any[]] | undefined;
}


export function isCompInvokePlugin<Renderable, Tag>(whatever: Plugin<Renderable, Tag>):
  whatever is CompInvokePlugin<Renderable, Tag> {
  return whatever && (whatever as any).invoke && typeof (whatever as any).invoke == 'function';
}


export interface CompPostInvokePlugin<Renderable=RawValue, Tag=string>
  extends Plugin<Renderable, Tag | CompFunc<Renderable, Tag>> {
  postInvoke(invoked: Node | [Node, ...any[]]): void;
}


export function isCompPostInvokePlugin<Renderable, Tag>(whatever: Plugin<Renderable, Tag>):
  whatever is CompPostInvokePlugin<Renderable, Tag> {
  return whatever && (whatever as any).invoke && typeof (whatever as any).postInvoke == 'function';
}
