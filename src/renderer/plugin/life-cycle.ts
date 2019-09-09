import { RawValue } from '../../shared/types';
import * as L from '../../shared/life-cycle';

import { PostRenderPlugin, PluginPriority } from './plugin';


export class LifeCyclePlugin<R=RawValue, T=String> implements PostRenderPlugin<R, T> {
  priority = PluginPriority.High;

  postRender(node: Node): void {
    if (document.contains(node)) {
      L.bind(node);
    }
  }
}
