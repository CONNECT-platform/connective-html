import { should, expect } from 'chai'; should();
import jsdom from 'jsdom-global';

import { ExtensibleRenderer } from '../../extensible-renderer';
import { InnerHTMLPlugin } from '../inner-html';


describe('InnerHTMLPlugin', () => {
  beforeEach(function() {
    this.jsdom = jsdom();
  });

  afterEach(function() {
    this.jsdom();
  });

  it('should allow setting inner html using _innerHTML proprety.', () => {
    const renderer = new ExtensibleRenderer().plug(new InnerHTMLPlugin());
    const el = <div _innerHTML='<p>Halo</p>'/>;
    el.childNodes.length.should.equal(1);
    expect((el.childNodes.item(0) as HTMLElement).tagName).to.equal('P');
    expect(el.childNodes.item(0).textContent).to.equal('Halo');
  });
});