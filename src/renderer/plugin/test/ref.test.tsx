import { should, expect } from 'chai'; should();
import jsdom from 'jsdom-global';

import { ref } from '../../ref';

import { ExtensibleRenderer } from '../../extensible-renderer';
import { RefPlugin } from '../ref';


describe('RefPlugin', () => {
  beforeEach(function() {
    this.jsdom = jsdom();
  });

  afterEach(function() {
    this.jsdom();
  });

  it('resolve given `Ref` object via `_ref` property to the rendered element.', () => {
    const renderer = new ExtensibleRenderer().plug(new RefPlugin());

    const el = ref<HTMLElement>();
    const el$ = <div _ref={el}/>;

    el.$.should.equal(el$);
  });
});