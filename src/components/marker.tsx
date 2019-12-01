import { RendererLike } from '../renderer/renderer-like';
import { CompType } from '../renderer/plugin/component/types';


export function Marker(_: {}, renderer: RendererLike<any, any | CompType>) {
  return <marker style="display: none"></marker>;
}
