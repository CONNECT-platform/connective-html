import { Plugin } from '../plugin';
import { RawValue, PropsType } from '../../../shared/types';
import { RendererLike } from '../../renderer-like';
import { CompFunc, ComponentSignature } from './types';


export interface CompProcessPlugin<Renderable=RawValue, Tag=string>
  extends Plugin<Renderable | RawValue, Tag | string | CompFunc<Renderable, Tag>> {
  prepare(
    tag: CompFunc<Renderable, Tag>,
    props: PropsType<RawValue | Renderable> | undefined,
    children: (RawValue | Renderable | Node)[],
    extra: {[name: string]: any}
  ): (result: Node) => void;
}


export function isCompProcessPlugin<Renderable, Tag>(whatever: Plugin<Renderable, Tag>):
  whatever is CompProcessPlugin<Renderable, Tag> {
  return whatever && (whatever as any).prepare && typeof (whatever as any).prepare == 'function';
}


export interface CompIOPlugin<Renderable=RawValue, Tag=string>
  extends Plugin<Renderable | RawValue, Tag | string | CompFunc<Renderable, Tag>> {
  wire(node: Node, signature: ComponentSignature,
      props: PropsType<RawValue | Renderable> | undefined,
      tag?: CompFunc<Renderable, Tag>,
      children?: (RawValue | Renderable | Node)[]): void;
}


export function isCompIOPlugin<Renderable, Tag>(whatever: Plugin<Renderable, Tag>):
  whatever is CompIOPlugin<Renderable, Tag> {
  return whatever && (whatever as any).wire && typeof (whatever as any).wire == 'function';
}


export interface CompPropPlugin<Renderable=RawValue, Tag=string>
  extends Plugin<Renderable | RawValue, Tag | string | CompFunc<Renderable, Tag>> {
  wireProp(
    name: string, 
    prop: any, 
    node: Node,
    signature: ComponentSignature): boolean;
}


export function isCompPropPlugin<Renderable, Tag>(whatever: Plugin<Renderable, Tag>):
  whatever is CompPropPlugin<Renderable, Tag> {
  return whatever && (whatever as any).wireProp && typeof (whatever as any).wireProp == 'function';
}
