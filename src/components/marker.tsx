import { RendererLike } from '../renderer/renderer-like';
import { CompFunc } from '../renderer/plugin/component/types';


export function Marker(_: {}, renderer: RendererLike<any, any | CompFunc>) {
  return <marker style="display: none"></marker>;
}
