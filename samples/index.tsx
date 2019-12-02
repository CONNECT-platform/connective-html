import { state, map, State, PinLike, filter } from '@connectv/core';

import { List } from '../src/components/list';
import autoId from '../src/util/auto-id';
import Renderer, { Component } from '../src/renderer';
import ref from '../src/renderer/ref';
import { toggleList } from '../src/util/toggle-list';
import { interval } from 'rxjs';
import { map as _map } from 'rxjs/operators';
import { reactiveLiteral as $ } from '../src/util/reactive-literal';


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


renderer.render(
  <fragment>
    <br/><br/><br/>
    <style>
      {`
        .odd {
          color: blue;
        }

        .even {
          color: red;
        }

        .whynot {
          background: #bdbdbd;
        }
      `}
    </style>
    <span style={$`font-size: ${interval(500)}px; transform: rotate(${interval(20)}deg); display: inline-block`}
      class={toggleList({
        odd: interval(1000).pipe(_map(x => x % 2 == 1)),
        even: interval(1000).pipe(_map(x => x % 2 == 0)),
        whynot: interval(1000).pipe(_map(x => x % 3 != 0)),
      })}>Hellow</span>
  </fragment>
).on(document.body);