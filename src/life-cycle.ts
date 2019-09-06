import { Bindable, Clearable } from '@connectv/core';


export class LifeCycle implements Bindable, Clearable {
  private bindables: Bindable[];
  private clearables: Clearable[];

  constructor(readonly elem?: Node) {}

  toBind(bindable: Bindable): this {
    if (!this.bindables)
      this.bindables = [];
    
    this.bindables.push(bindable);
    return this;
  }

  dontBind(bindable: Bindable): this {
    if (this.bindables)
      this.bindables = this.bindables.filter(b => b !== bindable);

    return this;
  }

  toClear(clearable: Clearable) {
    if (!this.clearables)
      this.clearables = [];
    
    this.clearables.push(clearable);
    return this;
  }

  dontClear(clearable: Clearable) {
    if (this.clearables)
      this.clearables = this.clearables.filter(c => c !== clearable);
    
    return this;
  }

  bind() {
    if (this.elem) {
      this.elem.childNodes.forEach(node => {
        if ((node as any).lifecycle)
          (node as any).lifecycle.bind();
      });

      let obesrver = new MutationObserver(changes => {
        if (changes.some(change => {
          if (!change.removedNodes) return false;
          let me = false;
          change.removedNodes.forEach(node => {
            if (node === this.elem)
              me = true;
          });

          return me;
        })) {
          this.clear();
          obesrver.disconnect();
        }
      });

      if (this.elem.parentNode)
        obesrver.observe(this.elem.parentNode, { childList: true });
    }

    if (this.bindables)
      this.bindables.forEach(b => b.bind());

    return this;
  }

  clear() {
    if (this.elem) {
      this.elem.childNodes.forEach(node => {
        if ((node as any).lifecycle)
          (node as any).lifecycle.clear();
      })
    }

    if (this.clearables)
      this.clearables.forEach(c => c.clear());

    return this;
  }
}