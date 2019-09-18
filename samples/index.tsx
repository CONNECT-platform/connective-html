import { state, map } from '@connectv/core';

import Renderer from '../src/renderer';
let renderer = new Renderer();


let a = state();
let m = state(true);
let h = state(false);

let marker = renderer.render(<div>*********************</div>).on(document.body);

renderer.render(
<fragment>
  <select _state={a} multiple={m} hidden={h}>
    <option _value={{msg: 'hellow'}}>Hellow!</option>
    <option _value={{msg: 'world'}}>World!</option>
  </select>
  <br/>
  <input type="checkbox" _state={m}/>Multi?
  <br/>
  <input type="checkbox" _state={h}/>Hidden?
</fragment>
).before(marker);

a.subscribe(console.log);