import { state, map } from '@connectv/core';

import Renderer from '../src/renderer';
let renderer = new Renderer();


let a = state();

renderer.render(
<fragment>
  <select _state={a}>
    <option>--</option>
    <option _value={{msg: 'hellow'}}>Hellow!</option>
    <option _value={{msg: 'world'}}>World!</option>
  </select>
  {a.to(map((x: any) => (x&&x.msg)?x.msg:''))}
</fragment>
).on(document.body);