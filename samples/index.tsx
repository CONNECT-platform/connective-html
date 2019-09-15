import { state, filter, map, wrap } from '@connectv/core';
import { Subject } from 'rxjs';

import Renderer from '../src/renderer';

let renderer = new Renderer();

let name = state();
let s = new Subject<Event>();
wrap(s).to(map(() => 'WELT')).to(name);

renderer.render(
  <fragment>
    <input type='text' _state={name}/> 
    <br/>
    <p>{
      name
      .to(filter((x: string) => x != 'Donald'))
      .to(map((x: string) => 'Hellow ' + x))
    }</p>
    <br/>
    <button onclick={s}>World!</button>
  </fragment>
).on(document.body);