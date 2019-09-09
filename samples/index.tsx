import Renderer from '../src/reactive-renderer';

import { map, wrap } from '@connectv/core';
import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';


let renderer = new Renderer();
let x = 
<h1 style={wrap(interval(1000/60)).to(map((x: any) => `font-size: ${12 + x}px`))}>
  {interval(1000).pipe(tap(console.log))}
</h1>;
let y: HTMLElement = <div>Counter: {x}</div>;

let z = renderer.create('', undefined, 'hellow');

renderer.render(z).on(document.body);
renderer.render(y).on(document.body);

setTimeout(() => y.remove(), 4000);