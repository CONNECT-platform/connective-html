import Renderer from '../src/renderer';
import { ComponentThis } from '../src/renderer/plugin/component/types';

import jss from 'jss';
import { state } from '@connectv/core';
import { styled, toggleList } from '../src/';

const { classes } = jss.createStyleSheet({ div: { color: 'red' }, blue: { background: 'blue' } }).attach();

function MyComp(_: any, renderer: Renderer) {
  renderer = renderer.plug(styled(classes));
  let s = state(false);

  return <div class={toggleList({ [classes.blue]: s })} onclick={() => s.value = !s.value}>
    Hellow!
  </div>;
}

let renderer = new Renderer();
renderer.render(<MyComp/>).on(document.body);
