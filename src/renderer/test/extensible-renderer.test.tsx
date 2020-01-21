import { should, expect } from 'chai'; should();
import jsdom from 'jsdom-global';

import { ExtensibleRenderer } from '../extensible-renderer';

import { testRendererSpec } from './renderer.spec';
import { Plugin, PluginPriority, PluginHost } from '../plugin/plugin';
import { CreatePlugin, PostCreatePlugin, PropertyPlugin, AppendPlugin, PostRenderPlugin } from '../plugin/basic-plugins';
import { PropsType } from '../../shared/types';
import { ChildType } from '../renderer';


class MockPlugin implements Plugin {
  constructor(readonly priority: PluginPriority = PluginPriority.Fallback){}
}

class MockUniquePlugin extends MockPlugin {
  constructor(readonly _unique: (x : Plugin) => boolean, priority = PluginPriority.Fallback) { super(priority); }
  unique(plugin: Plugin) { return this._unique(plugin); }
}

class MockCreatePlugin extends MockPlugin implements CreatePlugin<any, any> {
  constructor(private callback: (a: any, b: any, c: any, d: any) => any,
    readonly priority: PluginPriority = PluginPriority.Fallback) 
    { super(priority); }
    create(tag: any, props: PropsType<any> | undefined, children: ChildType<any>[], pluginHost: PluginHost<any, any>) {
      return this.callback(tag, props, children, pluginHost);
    }
}

class MockPostCreatePlugin extends MockPlugin implements PostCreatePlugin<any, any> {
  constructor(private callback: (a: any, b: any) => any,
  readonly priority: PluginPriority = PluginPriority.Fallback) 
  { super(priority); }
  postCreate(node: Node, pluginHost: PluginHost<any, any>) {
    return this.callback(node, pluginHost);
  }
}

class MockPropertyPlugin extends MockPlugin implements PropertyPlugin<any, any> {
  constructor(private callback: (a: any, b: any, c: any, d: any) => any,
  readonly priority: PluginPriority = PluginPriority.Fallback) 
  { super(priority); }
  setprop(prop: any, target: any, host: HTMLElement, pluginHost: PluginHost<any, any>): boolean {
    return this.callback(prop, target, host, pluginHost);
  }
}

class MockAppendPlugin extends MockPlugin implements AppendPlugin<any, any> {
  constructor(private callback: (a: any, b: any, c: any) => any,
  readonly priority: PluginPriority = PluginPriority.Fallback) 
  { super(priority); }
  append(target: any, host: Node, pluginHost: PluginHost<any, any>): boolean {
    return this.callback(target, host, pluginHost);
  }
}

class MockPostRenderPlugin extends MockPlugin implements PostRenderPlugin<any, any> {
  constructor(private callback: (a: any, b: any) => any,
  readonly priority: PluginPriority = PluginPriority.Fallback) 
  { super(priority); }
  postRender(node: Node, pluginHost: PluginHost<any, any>) {
    return this.callback(node, pluginHost);
  }
}


describe.only('ExtensibleRenderer', () => {
  beforeEach(function() {
    this.jsdom = jsdom();
  });

  afterEach(function() {
    this.jsdom();
  });

  describe('`Renderer`-like behavior when no plugins given', () => {
    testRendererSpec(<R, T>() => new ExtensibleRenderer<R, T>());
  });

  describe('.plugins', () => {
    it('should include the plugins passed to the constructor.', () => {
      let a = new MockPlugin();
      let b = new MockPlugin();
      let c = new MockPlugin();

      let r = new ExtensibleRenderer(a, b, c);
      r.plugins.should.have.members([a, b, c]);
    });
    it('should have the plugins ordered by their priority.', () => {
      let a = new MockPlugin(PluginPriority.Fallback);
      let b = new MockPlugin(PluginPriority.High);

      let r = new ExtensibleRenderer(a, b);
      r.plugins.should.eql([b, a]);
    });
    it('should remove plugins that collide with `.unique()` of a later-added plugin.', () => {
      let a = new MockPlugin();
      let b = new MockPlugin();
      let c = new MockUniquePlugin(x => x == a);

      let r = new ExtensibleRenderer(a, b, c);
      r.plugins.should.have.members([b, c]);
      r.plugins.length.should.equal(2);
    });
  });

  describe('.plug()', () => {
    it('should create a new renderer with the same plugins and the newly added plugins.', () => {
      let a = new MockPlugin();
      let b = new MockPlugin();
      let c = new MockPlugin();

      let r = new ExtensibleRenderer(a, b);
      let r2 = r.plug(c);

      r.should.not.equal(r2);
      r2.plugins.should.have.members([a, b, c]);
    });

    it('should remove old plugins that would collide with `.unique` of one of the newly added plugins.', () => {
      let a = new MockPlugin();
      let r = new ExtensibleRenderer(a);

      let b = new MockUniquePlugin(x => x == a);
      let r2 = r.plug(b);

      r2.plugins.should.eql([b]);
    });
  });

  describe('.create()', () => {
    describe('Creation process', () => {
      it('should use the first plugin that can support given tag for creating a node.', () => {
        let _A = document.createElement('a'); let _B = document.createElement('b');
        let a = new MockCreatePlugin(tag => tag=='hellow'?_A:undefined);
        let b = new MockCreatePlugin(tag => tag=='world'?_B:undefined);

        let renderer = new ExtensibleRenderer(a, b);
        let X = 'hellow'; (<X></X>).should.equal(_A);
        let Y = 'world'; (<Y></Y>).should.equal(_B);
      });

      it('should test plugins by order of priority.', () => {
        let _A = document.createElement('a'); let _B = document.createElement('b');
        let a = new MockCreatePlugin(tag => tag=='hellow'?_A:undefined, PluginPriority.High);
        let b = new MockCreatePlugin(tag => _B, PluginPriority.Fallback);

        let renderer = new ExtensibleRenderer(b, a);
        let X = 'hellow'; (<X></X>).should.equal(_A);
        (<div></div>).should.equal(_B);
      });

      it('should invoke parent\'s node creation process when no plugin accepts the tag', () => {
        let _A = document.createElement('a');
        let a = new MockCreatePlugin(tag => tag=='hellow'?_A:undefined);

        let renderer = new ExtensibleRenderer(a);
        let X = 'hellow'; (<X></X>).should.equal(_A);
        (<div></div>).should.be.instanceOf(HTMLDivElement);
      });
    });

    describe('Property setting process', () => {
      it('should use the first plugin that supports the given property for setting the property.', () => {
        let a = new MockPropertyPlugin((prop, _, host) => { 
          if (prop == 'a') { 
            host.setAttribute('aprop', '42');
            return true; 
          }
        });

        let b = new MockPropertyPlugin((_, target, host) => { 
          if (target == 'b') { 
            host.setAttribute('bprop', '43');
            return true; 
          }
        });

        let renderer = new ExtensibleRenderer(b, a);
        let X = 'div';
        (<X a='halo'></X> as any).getAttribute('aprop').should.equal('42');
        (<X a='b'></X> as any).getAttribute('bprop').should.equal('43');
      });

      it('should test plugins by order of priority.', () => {
        let a = new MockPropertyPlugin((prop, _, host) => { 
          if (prop == 'a') { 
            host.setAttribute('aprop', '42');
            return true; 
          }
        }, PluginPriority.Fallback);

        let b = new MockPropertyPlugin((_, target, host) => { 
          if (target == 'b') { 
            host.setAttribute('bprop', '43');
            return true; 
          }
        }, PluginPriority.High);

        let renderer = new ExtensibleRenderer(a, b);
        let X = 'div';
        (<X a='halo'></X> as any).getAttribute('aprop').should.equal('42');
        (<X a='b'></X> as any).getAttribute('bprop').should.equal('43');
      });

      it('should invoke parent\'s property setting mechanism when no plugin supports given property', () => {
        let a = new MockPropertyPlugin((prop, _, host) => { 
          if (prop == 'a') { 
            host.setAttribute('aprop', '42');
            return true; 
          }
        });

        let renderer = new ExtensibleRenderer(a);
        let X = 'div';
        (<X a='halo'></X> as any).getAttribute('aprop').should.equal('42');
        (<X x='b'></X> as any).getAttribute('x').should.equal('b');
      });
    });

    describe.only('Appending process', () => {
      it('should use the first plugin that can support given node and host combination.');
      it('should test plugins by order of priority.');
      it('should invoke parent\'s node appending process when no plugin accepts the combination.');
    });

    describe('Post creation process', () => {
      it('should invoke all post create plugins on created nodes.');
      it('should invoke post create plugins by order of priority.');
    });
  });

  describe('.render()', () => {
    it('should invoke all post render plugins on rendered nodes.');
    it('should invoke post render plugins by order of priority.');
    it('should invoke post render plugins correctly on children of a document fragment.');
  });
});