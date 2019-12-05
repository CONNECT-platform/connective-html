import { should, expect } from 'chai'; should();
import jsdom from 'jsdom-global';

import { Renderer } from '../renderer';


describe('Renderer', () => {
  beforeEach(function() {
    this.jsdom = jsdom();
  });

  afterEach(function() {
    this.jsdom();
  });

  it('should be TSX compliant.', () => {
    let renderer = new Renderer();
    renderer.render(<div id="hellow" tabindex={42 * 2}><span>World</span></div>).on(document.body);
    let div = document.getElementById('hellow') as HTMLElement;

    expect(div).to.not.be.null;
    expect(div.getAttribute('tabindex')).to.equal('84');
    expect(div.children.item(0)).to.not.be.null;
    expect((div.children.item(0) as HTMLElement).textContent).to.equal('World');
  });
});