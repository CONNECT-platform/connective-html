import { state, map } from '@connectv/core';

import { List } from '../src/components/list';
import autoId from '../src/util/auto-id';
import Renderer from '../src/renderer';
import ref from '../src/renderer/ref';


function NotATodoList({}, renderer: Renderer) {
  let items = state([]);
  let input = ref<HTMLInputElement>();

  return <div>
      <h3>NOT TODOs</h3>
      <ul>
        <List of={items} each={item => 
            <li onclick={() => items.value = items.value.filter((i: any) => i !== item.value)}>
              {item.sub('title')}
            </li>
        }
        key={(i: any) => i.id}/>
      </ul>

      <input type='text' _ref={input} placeholder='add an item ...'/>
      <button onclick={() => { 
          items.value = items.value.concat([{ id: autoId(), title: input.el.value }]); 
          input.el.value = ''; 
        }}>
        Add #{items.to(map((l: any) => l.length + 1))}
      </button>
    </div>
}

let renderer = new Renderer();
renderer.render(<NotATodoList/>).on(document.body);
