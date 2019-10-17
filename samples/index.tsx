import { wrap, map, pin, sink } from '@connectv/core';
import { interval } from 'rxjs';
import { map as _map } from 'rxjs/operators';

import { ComponentThis } from '../src/renderer/plugin/component/types';
import Renderer from '../src/renderer';
import { CompInputSubject } from '../src/renderer/plugin/rxjs/comp-input-subject';
import { CompInputPin } from '../src/renderer/plugin/connective/comp-input-pin';


function MyComp(this: ComponentThis, props: {msg: string, i?: any, o?: any}, renderer: Renderer) {
  let i = new CompInputPin();

  this.expose({
    inputs: {i},
    outputs: {o: i.to(map((x: any) => `Got ${x}`))}
  });

  return <fragment>{props.msg}</fragment>;
}


let renderer = new Renderer();
let mark = renderer.render(<div>**********</div>).on(document.body);
let premark = false;

let p = pin();

let x = renderer.render(
  <div onclick={() => {
    if (!premark) {
      document.body.insertBefore(x, mark);
      premark = true;
    }
    else {
      document.body.append(x);
      premark = false;
    }
  }}>
    <MyComp msg='hellow' i={interval(1000)} o={p}/>
  </div>
).on(document.body);


renderer.render(
  <fragment>
  <div onclick={() => x.remove()}
    _innerHTML={wrap(interval(500)).to(map((x: number) => `<h1>${x}</h1>`))}></div>
  <p>{p}</p>
  </fragment>
).before(x);