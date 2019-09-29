import { state, map, sink, State } from '@connectv/core';

import Renderer from '../src/renderer';
let renderer = new Renderer();


let a = state();
let m = state(true);
let h = state(false);
let v = state([{msg: 'hellow'}, {msg: 'world'}])


const Marker = (_: {}, renderer: Renderer) => <div>-----------------------</div>;

let marker = renderer.render(<Marker/>).on(document.body);


const Check = ({state}: {state: State}, renderer: Renderer, [content]: [any]) =>
  <fragment>
    <br/>
    <input type="checkbox" _state={state}/>{content}
  </fragment>

renderer.render(
<fragment>
  <select _state={a} multiple={m} hidden={h}>
    <option _value={v.to(map((l: any[]) => l[0]))}>Hellow!</option>
    <option _value={v.to(map((l: any[]) => l[1]))}>World!</option>
  </select>

  <Check state={m}>Multi?</Check>
  <Check state={h}>Hidden?</Check>

  <button onclick={() => {v.value = [{msg: 'X'}, {msg: 'Y'}]}}>Change Values</button>
  <select _state={a}>
    <option _value={v.to(map((l: any[]) => l[0]))}>{v.to(map((l: any[]) => l[0].msg))}</option>
    <option _value={v.to(map((l: any[]) => l[1]))}>{v.to(map((l: any[]) => l[1].msg))}</option>
  </select>
</fragment>
).before(marker);

a.subscribe(console.log);