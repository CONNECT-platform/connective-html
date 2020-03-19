import { should, expect } from 'chai'; should();
import jsdom from 'jsdom-global';

import { ExtensibleRenderer } from '../../extensible-renderer';
import { styled } from '../styled';


describe('styled()', () => {
  beforeEach(function() {
    this.jsdom = jsdom();
  });

  afterEach(function() {
    this.jsdom();
  });

  it('should add classes to elements based on their tag according to given map.', () => {
    const renderer = new ExtensibleRenderer().plug(styled({
      a: 'link',
      div: 'segment'
    }));

    expect((<a/>).getAttribute('class')).to.equal('link');
    expect((<div/>).getAttribute('class')).to.equal('segment');
  });

  it('should not replace classes set manually.', () => {
    const renderer = new ExtensibleRenderer().plug(styled({ a: 'AA' }));
    const el = <a class='XX'/>;

    el.classList.contains('XX').should.be.true;
    el.classList.contains('AA').should.be.true;
  });

  it('should keep only one styled plugin per renderer.', () => {
    const styledA = styled({a: 'anchor'});
    const styledB = styled({a: 'link'});
    const renderer = new ExtensibleRenderer().plug(styledA).plug(styledB);

    renderer.plugins.should.eql([styledB]);
  });
});