import { should, expect } from 'chai'; should();
import jsdom from 'jsdom-global';

import * as L from '../../../shared/life-cycle';

import { ExtensibleRenderer } from '../../extensible-renderer';
import { LifeCyclePlugin } from '../life-cycle';


describe('LifeCyclePlugin', () => {
  beforeEach(function() {
    this.jsdom = jsdom();
  });

  afterEach(function() {
    this.jsdom();
  });

  it('should invoke the bind life-cycle handler of the element when it is rendered on the document.', done => {
    const renderer = new ExtensibleRenderer().plug(new LifeCyclePlugin());

    const el = <div/>;

    L.attach({
      bind() { done(); }
    }, el);

    const parent = <div/>;
    renderer.render(el).on(parent);            // --> not invoked yet.
    renderer.render(parent).on(document.body); // --> now it should be invoked.
  });
});