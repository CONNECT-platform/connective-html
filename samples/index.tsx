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

setTimeout(() => x.remove(), 5000);