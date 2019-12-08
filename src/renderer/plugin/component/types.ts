import { Bindable, Clearable, isBindable, isClearable, PinLike } from "@connectv/core";
import { Unsubscribable } from "rxjs";

import { RawValue, PropsType } from "../../../shared/types";
import { ChildType } from "../../renderer";
import { RendererLike } from "../../renderer-like";


export abstract class Component<Renderable=RawValue, Tag=string> {
  static __CVH_component_class__ = true;

  constructor(
    protected props: PropsType<RawValue | Renderable>,
    protected children: ChildType<Renderable>[],
    private _adapter: ComponentThis,
  ) {
    _adapter.track(this);
    this.init();

    let _signature = this.signature();
    if (_signature) _adapter.expose(_signature);
  }

  protected init() {}
  public bind() {}
  public clear() {}
  protected signature(): ComponentSignature | undefined { return undefined; }
  public abstract render(
    renderer: RendererLike<Renderable | RawValue, Tag | string | CompType<Renderable | RawValue, Tag>>): Node;

  protected track(sub: Unsubscribable | Bindable | Clearable) {
    if (isBindable(sub) || isClearable(sub))
      this._adapter.track(sub);
    else
      this._adapter.track({
        clear() { sub.unsubscribe() }
      });
  }
}


export type CompClass<Renderable=RawValue, Tag=string> = {
  new(
    props: PropsType<RawValue | Renderable>,
    children: ChildType<Renderable>[],
    _adapter: ComponentThis,
  ): Component<Renderable, Tag>
};

export type CompFunc<Renderable=RawValue, Tag=string> = (
  props: PropsType<RawValue | Renderable> | undefined,
  renderer: RendererLike<Renderable | RawValue, Tag | string | CompType<Renderable, Tag>>,
  children?: ChildType<Renderable>[]) => Node;

export type CompType<Renderable=RawValue, Tag=string> = CompClass<Renderable, Tag> | CompFunc<Renderable, Tag>;

export function isCompClass<Renderable, Tag>(comp: CompType<Renderable, Tag>): comp is CompClass<Renderable, Tag> {
  return (comp as any).__CVH_component_class__;
}


export interface CompInSignature {
  inputs: {[name: string]: any};
  outputs?: {[name: string]: any};
  states?: {[name: string]: any};
}

export interface CompOutSignature {
  inputs?: {[name: string]: any};
  outputs: {[name: string]: any};
  states?: {[name: string]: any};
}

export interface CompStateSignature {
  inputs?: {[name: string]: any};
  outputs?: {[name: string]: any};
  states: {[name: string]: any};
}

export type ComponentSignature = CompInSignature | CompOutSignature | CompStateSignature;


interface CompInputOptionsRequired {
  required: true;
  default?: never;
}

interface CompInputOptionsNotRequired<T> {
  required: false;
  default?: T;
}

export type CompInputOptionsSpecified<T> = CompInputOptionsNotRequired<T> | CompInputOptionsRequired;

interface CompInputOptionsNotSpecified<T> {
  default?: T;
}

export type CompInputOptions<T> = CompInputOptionsSpecified<T> | CompInputOptionsNotSpecified<T>;

export interface CompInputWithOptions<T> {
  inputOptions: CompInputOptions<T>;
}


export function isCompInputWithOptions<T>(whatever: any):
  whatever is CompInputWithOptions<T> {
  return whatever && whatever.inputOptions;
}


export type ExposeFunction = {
  (signature: ComponentSignature): void;
  in: (name: string, input?: any) => void;
  out: (name: string, output?: any) => void;
  state: (name: string, state?: any) => void;
};


export type TrackFunction = {
  (whatever: Bindable | Clearable): void;
  mark: (marker: Node) => void;
}


export type ContextFunction = <T=PinLike>(key: string, recipient?: T) => T;


export type ComponentThis = {
  track: TrackFunction;
  expose: ExposeFunction;
  context: ContextFunction;
}


export type SafeComponentThis = {
  track?: TrackFunction;
  expose?: ExposeFunction;
  context?: ContextFunction;
}