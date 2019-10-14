import { Bindable, Clearable, isBindable, isClearable } from '@connectv/core';


export interface LifeCycleInfo {
  bindables?: Bindable[];
  clearables?: Clearable[];
}


export function lifeCycleInfo(node: Node): LifeCycleInfo | undefined;
export function lifeCycleInfo(node: Node, createIfNonExistent: boolean): LifeCycleInfo;
export function lifeCycleInfo(node: Node, createIfNonExistent: boolean = false): LifeCycleInfo | undefined {
  let _node = node as any;

  if (node instanceof DocumentFragment) {
    if (_node.lifecycleMarker) return lifeCycleInfo(_node.lifecycleMarker, createIfNonExistent);
    else if (createIfNonExistent) {
      _node.lifecycleMarker = document.createElement('i');
      _node.lifecycleMarker.setAttribute('hidden', '');
      node.appendChild(_node.lifecycleMarker);
      return lifeCycleInfo(_node.lifecycleMarker, true);
    }
  }
  else {
    if (_node.lifecycle) return _node.lifecycle as LifeCycleInfo;
    else if (createIfNonExistent) {
      _node.lifecycle = <LifeCycleInfo>{};
      return _node.lifecycle;
    }
  }
}


export function bind(node: Node) {
  let lifecycle = lifeCycleInfo(node);
  if (lifecycle && lifecycle.bindables) lifecycle.bindables.forEach(b => b.bind());

  node.childNodes.forEach(bind);

  if (node.parentNode && !(node.parentNode as any).childObserver) {
    let observer = new MutationObserver(changes => {
      changes.forEach(change => {
        if (change.removedNodes)
          change.removedNodes.forEach(node => setImmediate(() => {
            if (!document.contains(node))
              clear(node);
          }));
      });
    });

    observer.observe(node.parentNode, { childList: true });
    (node.parentNode as any).childObserver = observer;
    attach(<Clearable>{
      clear() { observer.disconnect(); }
    }, node.parentNode);
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
