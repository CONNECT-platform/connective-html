import { state, expr } from '@connectv/core';
import { map as _map } from 'rxjs/operators';

import { ComponentThis } from '../src/renderer/plugin/component/types';
import Renderer from '../src/renderer';
import { interval } from 'rxjs';


function MyComp(this: ComponentThis, props: {s?: any, onSChange?: any}, renderer: Renderer) {
  let s = state(0);
  let e = expr((n: number) => n + 1);
  s.to(e).to(s);

  this.expose({
    outputs: {o : interval(1000)},
    states: {s}
  });

  return <div onclick={e.control}>Count: {s}</div>;
}


let renderer = new Renderer();
let s = state();
let x = <MyComp s={s}/>;

x.addEventListener('onSChange', console.log);
x.addEventListener('o', console.log);

renderer.render(
  <fragment>
    {x}
    <input type="number" _state={s}/>
  </fragment>
).on(document.body);
