import Renderer from '../src/renderer';
import { Context } from '../src/components/context';
import { ComponentThis } from '../src/renderer/plugin/component/types';
import { state, source } from '@connectv/core';
import { interval, Subject } from 'rxjs';


function MyComp(this: ComponentThis, _: {}, renderer: Renderer) {
  return <div>hellow {this.context('dude', new Subject())} -- {this.context('content', source())}</div>
}

let renderer = new Renderer();
renderer.render(<fragment>
  <Context dude={'world'}>
    <Context content={interval(1000)}>
      <MyComp/>
    </Context>
    <Context dude={'jack'}>
      <MyComp/>
    </Context>
  </Context>
</fragment>).on(document.body);

