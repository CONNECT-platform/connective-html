import { wrap, map, sink } from '@connectv/core';
import { interval } from 'rxjs';

import { ComponentThis } from '../src/renderer/plugin/component/types';
import Renderer from '../src/renderer';
import input from '../src/renderer/plugin/connective/comp-input';


function MyComp(this: ComponentThis, props: {msg: string, i?: any}, renderer: Renderer) {
  let i = input({required: true});
  this.track(i.to(sink(console.log)));

  i.name('i').read(props);

  return <fragment>{props.msg}</fragment>;
}


let renderer = new Renderer();

let x = <div onclick={() => x.remove()}>
          <MyComp msg='hellow' i={interval(1000)}/>
        </div>;
renderer.render(x).on(document.body);

renderer.render(
  <div _innerHTML={wrap(interval(500)).to(map((x: number) => `<h1>${x}</h1>`))}></div>
).before(x);