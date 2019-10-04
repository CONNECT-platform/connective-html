import { RawValue } from '../../shared/types';
import { RendererLike } from '../renderer-like';


export enum PluginPriority {
  High = 1,
  Fallback = 2,
}


export interface PluginHost<Renderable, Tag> extends RendererLike<Renderable, Tag> {
  readonly plugins: Plugin<Renderable, Tag>[];
}


export interface Plugin<Renderable=RawValue, Tag=string> {
  priority: PluginPriority;
  plugged?(host: PluginHost<Renderable, Tag>): void;
  unique?(plugin: Plugin<Renderable, Tag>): boolean;
}
