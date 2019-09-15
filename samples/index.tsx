import { state, filter, map } from '@connectv/core';

import Renderer from '../src/renderer';

let renderer = new Renderer();

let name = state();

renderer.render(
  <fragment>
    <input type='text' _state={name}/> 
    <br/>
    <p>{
      name
      .to(filter((x: string) => x != 'Donald'))
      .to(map((x: string) => 'Hellow ' + x))
    }</p>
  </fragment>
).on(document.body);