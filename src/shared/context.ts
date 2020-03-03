export type ContextType = {[key: string]: any};

interface _InternalContext {
  values: ContextType;
  ref: Node;
}


export function set(node: Node, context: ContextType) {
  (node as any).context = {
    values: context || {},
    ref: node
  };
}


function _resolve(node: Node, keys: string[]): _InternalContext {
  const _node = node as any;
  if (_node.context) {
    const missing = keys.filter(k => !(k in _node.context.values));
    if (missing.length > 0) {
      const _ref = _node.context.ref;
      if (_ref) {
        const _parent = _ref.parentNode;
        if (_parent) {
          const ctx = _resolve(_parent, missing);
          missing.forEach(key => _node.context.values[key] = ctx.values[key]);
        }
      }
    }

    return _node.context;
  } else {
    const _parent = node.parentNode;
    if (_parent) {
      const ctx = _resolve(_parent, keys);
      _node.context = ctx;
      return ctx;
    }
    else return {
      values: {},
      ref: node
    }
  }
}


export function resolve(node: Node, keys: string[]): ContextType {
  return _resolve(node, keys).values;
}


export const CTX = { set, resolve }