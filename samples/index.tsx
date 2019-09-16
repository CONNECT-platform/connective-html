import { state, filter, map, value } from '@connectv/core';

import ref from '../src/renderer/ref';
import Renderer from '../src/renderer';
let renderer = new Renderer();


let name = state();
let btn = ref();

renderer.render(
  <fragment>
    <input type='text' _state={name}/> 
    <br/>
    <p>{
      name
      .to(filter((x: string) => x.toLowerCase() != 'donald'))
      .to(map((x: string) => x ? 'Hellow ' + x + '!' : ''))
    }</p>
    <button _ref={btn} onclick={name.from(value('Welt'))}>World!</button>
  </fragment>
).on(document.body);

console.log(btn);