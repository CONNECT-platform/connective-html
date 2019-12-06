import { should, expect } from 'chai'; should();


export function testRendererSpec(rendererFactory: <R=any, T=any>(...args: any[]) => any) {
  it('should be TSX compliant.', () => {
    let renderer = rendererFactory();
    renderer.render(<div id="hellow" tabindex={42 * 2}><span>World</span></div>).on(document.body);
    let div = document.getElementById('hellow') as HTMLElement;

    expect(div).to.not.be.null;
    expect(div.getAttribute('tabindex')).to.equal('84');
    expect(div.children.item(0)).to.not.be.null;
    expect((div.children.item(0) as HTMLElement).textContent).to.equal('World');
  });

  it('should create HTMLElements with TSX syntax.', () => {
    let renderer = rendererFactory();
    expect(<div>hellow</div>).to.be.instanceOf(HTMLElement);
  });

  it('should render the created html elements on the DOM (not another object).', () => {
    let renderer = rendererFactory();
    let x = <div id='hellow'>Hellow</div>;
    renderer.render(x).on(document.body);
    expect(document.getElementById('hellow')).to.equal(x);
  });

  describe('.create()', () => {
    it('should create an html element with given tag.', () => {
      let renderer = rendererFactory();
      renderer.create('img', {}).should.be.instanceOf(HTMLImageElement);
      renderer.create('span', {}).should.be.instanceOf(HTMLSpanElement);
      renderer.create('div', {}).should.be.instanceOf(HTMLDivElement);
    });

    it('should create a `DocumentFragment` when passed tag is "fragment".', () => {
      let renderer = rendererFactory();
      renderer.create('fragment', {}).should.be.instanceOf(DocumentFragment);
    });

    it('should set given properties on created element.', () => {
      let renderer = rendererFactory();
      let div = renderer.create('div', {class: 'hellow', 'data-whatever': 'whatever'}) as HTMLElement;
      
      expect(div.getAttribute('class')).to.equal('hellow');
      div.classList.contains('hellow').should.be.true;
      div.classList.contains('world').should.be.false;

      expect(div.getAttribute('data-whatever')).to.equal('whatever');
      expect(div.dataset['whatever']).to.equal('whatever');
    });

    it('should append given elements to the created element.', () => {
      let renderer = rendererFactory();
      let child1 = renderer.create('div', {});
      let child2 = renderer.create('div', {});
      let parent = renderer.create('div', {}, child1, child2);
      parent.childNodes.item(0).should.equal(child1);
      parent.childNodes.item(1).should.equal(child2);
      parent.childNodes.length.should.equal(2);
    });

    it('should append given raw values in string form as a text node to the created element.', () => {
      let renderer = rendererFactory();
      let div = renderer.create('div', {}, 'hellow', true, 42);

      div.childNodes.item(0).should.be.instanceOf(Text);
      expect((div.childNodes.item(0) as Text).textContent).to.equal('hellow');

      div.childNodes.item(1).should.be.instanceOf(Text);
      expect((div.childNodes.item(1) as Text).textContent).to.equal('true');

      div.childNodes.item(2).should.be.instanceOf(Text);
      expect((div.childNodes.item(2) as Text).textContent).to.equal('42');
    });

    it('should append each element of passed arrays to the created element.', () => {
      let renderer = rendererFactory();
      let child1 = renderer.create('div', {});
      let child2 = renderer.create('div', {});
      let div = renderer.create('div', {}, child1, [false, 'yo'], 'world', [child2, [true, 42]]);

      div.childNodes.item(0).should.equal(child1);
      expect(div.childNodes.item(1).textContent).to.equal('false');
      expect(div.childNodes.item(2).textContent).to.equal('yo');
      expect(div.childNodes.item(3).textContent).to.equal('world');
      div.childNodes.item(4).should.equal(child2);
      expect(div.childNodes.item(5).textContent).to.equal('true');
      expect(div.childNodes.item(6).textContent).to.equal('42');
    });

    it('should throw an error if a non-string tag is given.', () => {
      let renderer = rendererFactory<any, number>();
      expect(() => renderer.create(42, {})).to.throw();
    });

    it('should throw an error if a non-raw attribute is given.', () => {
      let renderer = rendererFactory<any>();
      expect(() => renderer.create('div', {x: [42]})).to.throw();
    });

    it('should throw an error if a non-renderable child is given.', () => {
      let renderer = rendererFactory<any>();
      expect(() => renderer.create('div', {}, {x : 42})).to.throw();
    });
  });

  describe('.render()', () => {
    describe('.on()', () => {
      it('should render given node on given parent.', () => {
        let renderer = rendererFactory();
        let parent = <div></div>;
        let child = <div></div>;
        renderer.render(child).on(parent);

        parent.childNodes.item(0).should.equal(child);
        parent.childNodes.length.should.equal(1);
      });
    });

    describe('.before()', () => {
      it('should render given node before the given reference node.', () => {
        let renderer = rendererFactory();
        let ref = <div></div>;
        let parent = <div>{ref}</div>;
        let child = <div></div>;

        parent.childNodes.length.should.equal(1);
        renderer.render(child).before(ref);
        parent.childNodes.length.should.equal(2);
        parent.childNodes.item(0).should.equal(child);
      });
    });

    describe('.after()', () => {
      it('should render given node after the given reference node.', () => {
        let renderer = rendererFactory();
        let ref = <div></div>;
        let parent = <div>{ref}</div>;
        let child = <div></div>;

        parent.childNodes.length.should.equal(1);
        renderer.render(child).after(ref);
        parent.childNodes.length.should.equal(2);
        parent.childNodes.item(1).should.equal(child);
      });
    });
  });
}