import { Bindable } from "@connectv/core";
import { Clearable } from "@connectv/core/dist/es5";
import { RawValue, PropsType } from "../../../shared/types";
import { RendererLike } from "../../renderer-like";


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


export type ExposeFunction = {
  (signature: ComponentSignature): void;
  in: (name: string, input: any) => void;
  out: (name: string, output: any) => void;
  state: (name: string, state: any) => void;
};


export type TrackFunction = (whatever: Bindable | Clearable) => void;


export type ComponentThis = {
  track: TrackFunction;
  expose: ExposeFunction;
}


export type SafeComponentThis = {
  track?: TrackFunction;
  expose?: ExposeFunction;
}