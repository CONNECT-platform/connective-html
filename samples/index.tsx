import { state, pipe, map } from '@connectv/core';
import { interval } from 'rxjs';
import { startWith, map as _map, debounceTime } from 'rxjs/operators';

import Renderer from '../src/renderer';

let renderer = new Renderer();

let s = state('hellow!');

renderer.render(
  <div>
    <input type='text' _state={s}></input>
    <fragment>
      <textarea _state={s}></textarea>

      <br/><br/>
    </fragment>

    typed values with a delay: {s.to(pipe(debounceTime(200)))}
    <br/>
    <button onclick={s.from(map(() => ''))}>CLEAR!</button>

    <hr/>

    time on site: {interval(1000).pipe(_map(x => x + 1), startWith(0))} seconds
  </div>
).on(document.body);