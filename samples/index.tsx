import { ExtensibleRenderer } from '../src/renderer/extensible-renderer';
import { ObservablePlugin } from '../src/renderer/plugin/observable';
import { PinPlugin } from '../src/renderer/plugin/pin';
import { LifeCyclePlugin } from '../src/renderer/plugin/life-cycle';
import { EventHandlerPlugin } from '../src/renderer/plugin/event-handler';
import { RawValue } from '../src/shared/types';

import { Observable, interval, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PinLike, wrap, map, source } from '@connectv/core';


let renderer = new ExtensibleRenderer<PinLike | Observable<RawValue>>().plug(
    new LifeCyclePlugin(),
    new ObservablePlugin(),
    new PinPlugin(),
    new EventHandlerPlugin(),
);

let x = 
<h1 style={wrap(interval(1000/60)).to(map((x: any) => `font-size: ${12 + x}px`))}>
  {interval(1000).pipe(tap(console.log))}
</h1>;
let y: HTMLElement = <div>Counter: {x}</div>;

let click = source();
click.subscribe(() => console.log('hellow'));

let dbl = new Subject<Event>();
dbl.subscribe(console.log);

renderer.render(
<button 
    onclick={click}
    ondblclick={dbl}
    onmouseover={() => console.log('Ho Ho!')}>
      Click ME!
</button>).on(document.body);

renderer.render(y).on(document.body);

setTimeout(() => y.remove(), 4000);