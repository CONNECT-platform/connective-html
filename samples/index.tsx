import { wrap, map, sink, Bindable } from '@connectv/core';
import { interval, Subject } from 'rxjs';

import { ComponentThis } from '../src/renderer/plugin/component/types';
import Renderer from '../src/renderer';
import input from '../src/renderer/plugin/connective/comp-input';
import { clear } from '../src/shared/life-cycle';
import { Clearable } from '@connectv/core/dist/es5';


function MyComp(this: ComponentThis, props: {msg: string, i?: any}, renderer: Renderer) {
  let i = new Subject<any>();
  let s: any;
  this.track({
    bind() { s = i.subscribe(console.log); },
    clear() { s.unsubscribe(); }
  } as (Bindable & Clearable));

  this.expose({in: {i}});

  return <fragment>{props.msg}</fragment>;
}


let renderer = new Renderer();
let mark = renderer.render(<div>**********</div>).on(document.body);
let premark = false;
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
    <MyComp msg='hellow' i={wrap(interval(1000))}/>
  </div>
).on(document.body);


renderer.render(
  <div onclick={() => x.remove()}
    _innerHTML={wrap(interval(500)).to(map((x: number) => `<h1>${x}</h1>`))}></div>
).before(x);