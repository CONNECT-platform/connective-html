import * as L from '../../shared/life-cycle';

import { PluginPriority } from './plugin';
import { PostRenderPlugin } from './basic-plugins';


export class LifeCyclePlugin<R=RawValue, T=String> implements PostRenderPlugin<R, T> {
  priority = PluginPriority.High;

  postRender(node: Node): void {
    if (document.contains(node)) {
      L.bind(node);
    }
  }
}
