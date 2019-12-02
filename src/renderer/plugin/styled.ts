import { PluginPriority, Plugin } from './plugin';
import { PostCreatePlugin } from './basic-plugins';


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
      if (tag in this.map)
        node.classList.add(this.map[tag]);
    }
  }
}


export function styled(map: TagClassMap) {
  return new StyledPlugin<any, any>(map);
}


export default styled;