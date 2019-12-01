import { state, map, State, PinLike } from '@connectv/core';

import { List } from '../src/components/list';
import autoId from '../src/util/auto-id';
import Renderer, { Component } from '../src/renderer';
import ref from '../src/renderer/ref';


export class NotATodoList extends Component {
  items: State;
  next: PinLike;
  input = ref<HTMLInputElement>();

  init() {
    this.items = state([]);
    this.next = this.items.to(map((l: any[]) => l.length + 1));
  }

  signature() {
    return {
      states: {
        items: this.items
      }
    }
  }

  submit() {
    this.items.value = this.items.value.concat({
      id: autoId(), 
      title: this.input.$.value
    });

    this.input.$.value = ''; 
  }

  remove(id: string) {
    this.items.value = this.items.value.filter((i: any) => i.id !== id);
  }

  render(renderer: Renderer) {
    return (
      <div>
        <h3>NOT TODOs</h3>
        <ul>
          <List of={this.items} each={item => 
              <li onclick={() => this.remove(item.value.id)}>
                {item.sub('title')}
              </li>}
          key={(i: any) => i.id}/>
        </ul>

        <input type='text' _ref={this.input} placeholder='add an item ...'/>
        <button onclick={() => this.submit()}>Add #{this.next}</button>
      </div>
    )
  }
}

let renderer = new Renderer();
let listRef = ref<NotATodoList>();
let notTodos = state([{id: autoId(), title: 'Sample'}]);

renderer.render(
  <fragment>
    <NotATodoList _ref={listRef} items={notTodos}/>
    <br/>
    <button onclick={() => listRef.$.submit()}>###</button>
  </fragment>
).on(document.body);

notTodos.subscribe(console.log);