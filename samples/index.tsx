import { wrap, map, sink } from '@connectv/core';
import { interval } from 'rxjs';

import { ComponentThis } from '../src/renderer/plugin/component/types';
import Renderer from '../src/renderer';


function MyComp(this: ComponentThis, {msg}: {msg: string}, renderer: Renderer) {
  this.track(wrap(interval(1000)).to(sink(console.log)));
  return <div>{msg}</div>;
}


let renderer = new Renderer();
let x = <MyComp msg='hellow'/>;
renderer.render(x).on(document.body);

x.addEventListener('click', () => x.remove());

renderer.render(
  <div _innerHTML={wrap(interval(500)).to(map((x: number) => `<h1>${x}</h1>`))}></div>
).before(x);