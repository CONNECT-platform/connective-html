import { state, deep, map } from '@connectv/core';

import { SimpleList } from '../src/components/simple-list';
import Renderer from '../src/renderer';
import ref from '../src/renderer/ref';


function NotATodoList({}, renderer: Renderer) {
  let items = deep(state([]));
  let input = ref<HTMLInputElement>();

  const add = () => {
    items.value = items.value.concat([{ title: input.el.value }]);
    input.el.value = '';
  }

  const remove = (item: any) => items.value = items.value.filter((i: any) => i !== item);

  return <div>
      <h3>NOT TODOs</h3>
      <ul>
        <SimpleList of={items} each={item => 
            <li onclick={() => remove(item.value)}>
              {item.sub('title')}
            </li>
        }/>
      </ul>

      <input type='text' _ref={input} placeholder='add an item ...'/>
      <button onclick={add}>
        Add #{items.to(map((l: any) => l.length + 1))}
      </button>
    </div>
}

let renderer = new Renderer();
renderer.render(<NotATodoList/>).on(document.body);