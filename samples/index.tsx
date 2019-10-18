import { state } from '@connectv/core';
import { map as _map } from 'rxjs/operators';

import { ComponentThis } from '../src/renderer/plugin/component/types';
import Renderer from '../src/renderer';


function MyComp(this: ComponentThis, props: {s?: any, onSChange?: any}, renderer: Renderer) {
  let s = state(0);

  this.expose({
    states: {s}
  });

  return <div onclick={() => s.value = s.value + 1}>Count: {s}</div>;
}


let renderer = new Renderer();
let s = state();

renderer.render(
  <fragment>
    <MyComp s={s}/>
    <input type="number" _state={s}/>
  </fragment>
).on(document.body);