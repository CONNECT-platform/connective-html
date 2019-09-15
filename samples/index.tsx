import { state, filter, map, value } from '@connectv/core';

import Renderer from '../src/renderer';
let renderer = new Renderer();


let name = state();

renderer.render(
  <fragment>
    <input type='text' _state={name}/> 
    <br/>
    <p>{
      name
      .to(filter((x: string) => x.toLowerCase() != 'donald'))
      .to(map((x: string) => x ? 'Hellow ' + x + '!' : ''))
    }</p>
    <button onclick={name.from(value('Welt'))}>World!</button>
  </fragment>
).on(document.body);