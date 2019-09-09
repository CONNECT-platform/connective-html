import { ExtensibleRenderer } from '../src/renderer/extensible-renderer';
import { ObservablePlugin } from '../src/renderer/plugin/observable';
import { PinPlugin } from '../src/renderer/plugin/pin';
import { LifeCyclePlugin } from '../src/renderer/plugin/life-cycle';
import { RawValue } from '../src/shared/types';

import { Observable, interval } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PinLike, wrap, map } from '@connectv/core';


let renderer = new ExtensibleRenderer<PinLike, Observable<RawValue>>().plug(
    new LifeCyclePlugin(),
    new ObservablePlugin(),
    new PinPlugin(),
);

let x = 
<h1 style={wrap(interval(1000/60)).to(map((x: any) => `font-size: ${12 + x}px`))}>
  {interval(1000).pipe(tap(console.log))}
</h1>;
let y: HTMLElement = <div>Counter: {x}</div>;

renderer.render(y).on(document.body);

setTimeout(() => y.remove(), 4000);