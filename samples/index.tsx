import { state, pipe } from '@connectv/core';
import { interval } from 'rxjs';
import { startWith, map, debounceTime } from 'rxjs/operators';

import Renderer from '../src/renderer';

let renderer = new Renderer();

let s = state('hellow!');

renderer.render(
  <div>
    <input type='text' _state={s}></input>
    <textarea _state={s}></textarea>

    <br/><br/>

    typed values: {s.to(pipe(debounceTime(200)))}

    <br/><br/>

    time on site: {interval(1000).pipe(map(x => x + 1), startWith(0))} seconds
  </div>
).on(document.body);