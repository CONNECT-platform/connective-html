import { state, map, sink } from '@connectv/core';

import Renderer from '../src/renderer';
let renderer = new Renderer();


let a = state();
let m = state(true);
let h = state(false);
let v = state([{msg: 'hellow'}, {msg: 'world'}])

let marker = renderer.render(<div>*********************</div>).on(document.body);

renderer.render(
<fragment>
  <select _state={a} multiple={m} hidden={h}>
    <option _value={v.to(map((l: any[]) => l[0]))}>Hellow!</option>
    <option _value={v.to(map((l: any[]) => l[1]))}>World!</option>
  </select>
  <br/>
  <input type="checkbox" _state={m}/>Multi?
  <br/>
  <input type="checkbox" _state={h}/>Hidden?
  <button onclick={() => {v.value = [{msg: 'X'}, {msg: 'Y'}]}}>Change Values</button>
  <select _state={a}>
    <option _value={v.to(map((l: any[]) => l[0]))}>{v.to(map((l: any[]) => l[0].msg))}</option>
    <option _value={v.to(map((l: any[]) => l[1]))}>{v.to(map((l: any[]) => l[1].msg))}</option>
  </select>
</fragment>
).before(marker);

a.subscribe(console.log);