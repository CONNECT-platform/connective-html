import { state } from '@connectv/core';

import Renderer from '../src/renderer';

let renderer = new Renderer();

let s = state('yo my man');

let i = <input type='text' _state={s}></input>;
let j = <textarea _state={s}></textarea>;

renderer.render(<div>{i}{j}<br/>{s}</div>).on(document.body);