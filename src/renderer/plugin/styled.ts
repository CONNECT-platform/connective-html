import { PluginPriority, Plugin } from './plugin';
import { PostCreatePlugin } from './basic-plugins';

import * as _ClassListFixed from '../../shared/class-list-fixed';


export type TagClassMap = {[tagName: string]: string};


export class StyledPlugin<R, T> implements PostCreatePlugin<R, T> {
  priority = PluginPriority.High;

  constructor(readonly map: TagClassMap) {}

  unique(plugin: Plugin<R, T>) {
    return plugin instanceof StyledPlugin;
  }

  postCreate(node: Node) {
    if (node instanceof HTMLElement) {
      const tag = node.tagName.toLocaleLowerCase();
      if (tag in this.map) {
        let clazz = this.map[tag];
        node.classList.add(clazz);
        _ClassListFixed.add(node, clazz);
      }
    }
  }
}


export function styled<R, T>(map: TagClassMap) {
  return new StyledPlugin<R, T>(map);
}


export default styled;