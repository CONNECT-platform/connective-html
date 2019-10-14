import { wrap, map } from '@connectv/core';
import { interval, Subject } from 'rxjs';

import { ComponentThis } from '../src/renderer/plugin/component/types';
import Renderer from '../src/renderer';
import trackable from '../src/renderer/plugin/rxjs/trackable';
import { tap } from 'rxjs/operators';


function MyComp(this: ComponentThis, props: {msg: string, i?: any}, renderer: Renderer) {
  let i = new Subject<any>();
  this.track(trackable(i.pipe(tap(console.log))));

  this.expose({inputs: {i}});

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