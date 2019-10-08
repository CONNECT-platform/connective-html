import { Plugin } from '../plugin';
import { RawValue, PropsType } from '../../../shared/types';
import { RendererLike } from '../../renderer-like';


export type CompFunc<Renderable=RawValue, Tag=string> = (
  props: PropsType<RawValue | Renderable> | undefined,
  renderer: RendererLike<Renderable | RawValue, Tag | string | CompFunc<Renderable, Tag>>,
  children?: (RawValue | Renderable | Node)[]) => Node;


export interface CompInSignature {
  in: {[name: string]: any};
  out?: {[name: string]: any};
  states?: {[name: string]: any};
}

export interface CompOutSignature {
  in?: {[name: string]: any};
  out: {[name: string]: any};
  states?: {[name: string]: any};
}

export interface CompStateSignature {
  in?: {[name: string]: any};
  out?: {[name: string]: any};
  states: {[name: string]: any};
}

export type ComponentSignature = CompInSignature | CompOutSignature | CompStateSignature;


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
      props?: PropsType<RawValue | Renderable> | undefined,
      tag?: CompFunc<Renderable, Tag>,
      children?: (RawValue | Renderable | Node)[]): void;
}


export function isCompIOPlugin<Renderable, Tag>(whatever: Plugin<Renderable, Tag>):
  whatever is CompIOPlugin<Renderable, Tag> {
  return whatever && (whatever as any).wire && typeof (whatever as any).wire == 'function';
}
