import { RawValue, PropsType } from '../../shared/types';
import { Plugin } from './plugin';


export interface CreatePlugin<Renderable=RawValue, Tag=string> extends Plugin<Renderable, Tag> {
  create(tag: string | Tag, props: PropsType<RawValue | Renderable> | undefined, 
    ...children: (Renderable | RawValue | Node)[]): Node | undefined;
}


export function isCreatePlugin<Renderable, Tag>(whatever: Plugin<Renderable, Tag>): 
  whatever is CreatePlugin<Renderable, Tag> {
  return whatever && (whatever as any).create && typeof (whatever as any).create == 'function';
}


export interface PostCreatePlugin<Renderable=RawValue, Tag=string> extends Plugin<Renderable, Tag> {
  postCreate(node: Node): Node;
}


export function isPostCreatePlugin<Renderable, Tag>(whatever: Plugin<Renderable, Tag>): 
  whatever is PostCreatePlugin<Renderable, Tag> {
  return whatever && (whatever as any).postCreate && typeof (whatever as any).postCreate == 'function';
}


export interface PropertyPlugin<Renderable=RawValue, Tag=string> extends Plugin<Renderable, Tag> {
  setprop(prop: string, target: Renderable | RawValue, host: HTMLElement): boolean;
}


export function isPropertyPlugin<Renderable, Tag>(whatever: Plugin<Renderable, Tag>): 
  whatever is PropertyPlugin<Renderable, Tag> {
  return whatever && (whatever as any).setprop && typeof (whatever as any).setprop == 'function';
}


export interface AppendPlugin<Renderable=RawValue, Tag=String> extends Plugin<Renderable, Tag> {
  append(target: RawValue | Renderable | Node | (RawValue | Renderable | Node)[], host: Node): boolean;
}


export function isAppendPlugin<Renderable, Tag>(whatever: Plugin<Renderable, Tag>): 
  whatever is AppendPlugin<Renderable, Tag> {
  return whatever && (whatever as any).append && typeof (whatever as any).append == 'function';
}


export interface PostRenderPlugin<Renderable=RawValue, Tag=string> extends Plugin<Renderable, Tag> {
  postRender(node: Node): void;
}


export function isPostRenderPlugin<Renderable, Tag>(whatever: Plugin<Renderable, Tag>): 
  whatever is PostRenderPlugin<Renderable, Tag> {
  return whatever && (whatever as any).postRender && typeof (whatever as any).postRender == 'function';
}
