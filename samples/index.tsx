import { state, expr } from '@connectv/core';
import { map as _map, tap } from 'rxjs/operators';

import { ComponentThis } from '../src/renderer/plugin/component/types';
import { Marker } from '../src/components/marker';
import Renderer from '../src/renderer';
import { interval } from 'rxjs';
import ref from '../src/renderer/ref';
import trackable from '../src/renderer/plugin/rxjs/trackable';


function MyComp(this: ComponentThis, _: {}, renderer: Renderer) {
  this.track(trackable(interval(1000).pipe(tap(console.log))));

  let marker = <Marker/>
  this.track.mark(marker);

  return <fragment>
    {marker}
    <div>Yo</div>
  </fragment>;
}


let renderer = new Renderer();
let r = ref();
// let s = state();
// let x = <MyComp s={s}/>;

// x.addEventListener('onSChange', console.log);
// x.addEventListener('o', console.log);

renderer.render(
  <div _ref={r} onclick={() => (r.el as HTMLElement).remove()}>
    <MyComp/>
  </div>
).on(document.body);
