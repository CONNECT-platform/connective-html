import { Bindable, Clearable, isBindable, isClearable } from '@connectv/core';


export interface LifeCycleInfo {
  bindables?: Bindable[];
  clearables?: Clearable[];
}


export function lifeCycleInfo(node: Node): LifeCycleInfo | undefined;
export function lifeCycleInfo(node: Node, createIfNonExistent: boolean): LifeCycleInfo;
export function lifeCycleInfo(node: Node, createIfNonExistent: boolean = false): LifeCycleInfo | undefined {
  let _node = node as any;

  if (_node.lifecycle) return _node.lifecycle as LifeCycleInfo;
  else if (createIfNonExistent) {
    _node.lifecycle = <LifeCycleInfo>{};
    return _node.lifecycle;
  }
}


export function bind(node: Node) {
  let lifecycle = lifeCycleInfo(node);
  if (lifecycle && lifecycle.bindables) lifecycle.bindables.forEach(b => b.bind());

  node.childNodes.forEach(bind);

  if (node.parentNode) {
    let observer = new MutationObserver(changes => {
      setImmediate(() => {
        if (changes.some(change => {
          if (!change.removedNodes) return false;
          for (let i = 0; i < change.removedNodes.length; i++) {
            if (change.removedNodes.item(i) === node) return true;
          }

          return false;
        })) {
          clear(node);
          observer.disconnect();
        }
      });
    });

    observer.observe(node.parentNode, { childList: true });
  }
}


export function clear(node: Node) {
  let lifecycle = lifeCycleInfo(node);
  if (lifecycle && lifecycle.clearables) lifecycle.clearables.forEach(c => c.clear());

  node.childNodes.forEach(clear);
}

export function attach(thing: Bindable | Clearable, node: Node) {
  let lifecycle = lifeCycleInfo(node, true);
  if (isBindable(thing)) (lifecycle.bindables || (lifecycle.bindables = [])).push(thing);
  if (isClearable(thing)) (lifecycle.clearables || (lifecycle.clearables = [])).push(thing);
}


export function detach(thing: Bindable | Clearable, node: Node) {
  let lifecycle = lifeCycleInfo(node);
  if (lifecycle) {
    if (lifecycle.bindables) lifecycle.bindables = lifecycle.bindables.filter(b => b !== thing);
    if (lifecycle.clearables) lifecycle.clearables = lifecycle.clearables.filter(b => b !== thing);
  }
}
