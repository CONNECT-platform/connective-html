import { Plugin, PluginHost, PluginPriority } from '../plugin';
import { PropsType } from '../../../shared/types';
import { ChildType } from '../../renderer';
import { CompType, ComponentSignature } from './types';
import { Subscription } from 'rxjs';


export interface CompProcessPlugin<Renderable=RawValue, Tag=string>
  extends Plugin<Renderable | RawValue, Tag | string | CompType<Renderable, Tag>> {
  prepare(
    tag: CompType<Renderable | RawValue, Tag>,
    props: PropsType<RawValue | Renderable> | undefined,
    children: ChildType<Renderable>[],
    extra: {[name: string]: any},
    pluginHost: PluginHost<Renderable, Tag>,
  ): (result: Node) => void;
}


export function isCompProcessPlugin<Renderable, Tag>(whatever: Plugin<Renderable, Tag>):
  whatever is CompProcessPlugin<Renderable, Tag> {
  return whatever && (whatever as any).prepare && typeof (whatever as any).prepare == 'function';
}


export interface CompIOPlugin<Renderable=RawValue, Tag=string>
  extends Plugin<Renderable | RawValue, Tag | string | CompType<Renderable, Tag>> {
  wire(node: Node, signature: ComponentSignature,
      props: PropsType<RawValue | Renderable> | undefined,
      tag: CompType<Renderable, Tag>,
      children: (RawValue | Renderable | Node)[],
      pluginHost: PluginHost<Renderable, Tag>,
  ): void;
}


export function isCompIOPlugin<Renderable, Tag>(whatever: Plugin<Renderable, Tag>):
  whatever is CompIOPlugin<Renderable, Tag> {
  return whatever && (whatever as any).wire && typeof (whatever as any).wire == 'function';
}


export interface CompPropPlugin<Renderable=RawValue, Tag=string>
  extends Plugin<Renderable | RawValue, Tag | string | CompType<Renderable, Tag>> {
  wireProp(
    name: string,
    prop: any,
    node: Node,
    signature: ComponentSignature,
    pluginHost: PluginHost<Renderable, Tag>,
  ): boolean;
}


export function isCompPropPlugin<Renderable, Tag>(whatever: Plugin<Renderable, Tag>):
  whatever is CompPropPlugin<Renderable, Tag> {
  return whatever && (whatever as any).wireProp && typeof (whatever as any).wireProp == 'function';
}


export interface CompContextPlugin<Renderable=RawValue, Tag=string>
  extends Plugin<Renderable | RawValue, Tag | string | CompType<Renderable, Tag>> {
  wireContext(
    name: string,
    value: any,
    recipient: any,
    subReference: Subscription,
    node: Node,
    pluginHost: PluginHost<Renderable, Tag>,
  ): boolean;
}


export function isCompContextPlugin<Renderable, Tag>(whatever: Plugin<Renderable, Tag>):
  whatever is CompContextPlugin<Renderable, Tag> {
  return whatever && (whatever as any).wireContext && typeof (whatever as any).wireContext == 'function';
}


export abstract class DefaultReactiveRecipientPlugin<Renderable=RawValue, Tag=string>
  implements Plugin<Renderable | RawValue, Tag | string | CompType<Renderable, Tag>> {
  unique(plugin: Plugin<Renderable, Tag>) {
    return plugin instanceof DefaultReactiveRecipientPlugin;
  }

  abstract defaultInput(): any;
  abstract defaultOutput(): any;
  abstract defaultState(): any;
  abstract defaultContext(): any;

  priority = PluginPriority.Fallback;
}


export function isDefaultReactiveRecipientPlugin<Renderable, Tag>(whatever: Plugin<Renderable, Tag>):
  whatever is DefaultReactiveRecipientPlugin<Renderable, Tag> {
  return whatever instanceof DefaultReactiveRecipientPlugin;
}