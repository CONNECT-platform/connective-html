<p align="center">
<img src="https://raw.githubusercontent.com/CONNECT-platform/connective-html/master/logo.svg?sanitize=true" width="320px"/>
</p>

```
npm i @connectv/html
```
or even easier:
```
npx @connectv/create-html <project-name>
```
<br>

**CONNECTIVE HTML** is a frontend library for creating modern reactive web applications in a simple and explicit manner.
It is _simple_ as it enables working directly with DOM APIs with JSX syntax:

```tsx
import Renderer from '@connectv/html';

let renderer = new Renderer();

renderer.render(<div>Hellow World!</div>).on(document.body);
```
[>TRY IT!](https://stackblitz.com/edit/connective-html-hellowworld?file=index.tsx)

It is _explicit_ as it throws out any magical layer underneath the API (layers such as Virtual DOM, automatic change detection, domain-specific compilations, etc.) in favor of directly working with reactive values using reactive libraries
such as [**RxJS**](https://github.com/ReactiveX/rxjs) or [**CONNECTIVE**](https://github.com/CONNECT-platform/connective):

```tsx
import { Renderer } from '@connectv/html';
import { interval } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

let renderer = new Renderer();

renderer.render(
  <div>
    You have been here for {
      interval(1000)
      .pipe(map(x => x + 1))
      .pipe(startWith('0'))
    } second(s).
  </div>)
.on(document.body);
```
[>TRY IT!](https://stackblitz.com/edit/connective-html-timer?file=index.tsx)

# How To Setup

## Online Playground

Fork [this](https://stackblitz.com/edit/connective-html-hellowworld) project on [StackBlitz](https://stackblitz.com).

## New Typescript Project

1. make a project folder and `cd` to it.
2. `npx @connectv/create-html`

_OR_

1. `npx @connectv/create-html <project-name>`
2. `cd <project-name>`

_OR_

clone [this starter project](https://github.com/loreanvictor/connective-html-sample.git) and follow
the instructions in its readme file.


## Custom Typescript Setup

1. `npm i @connectv/html`
2. add the following to your `tsconfig.json` file:
```json
"compilerOptions": {
    "jsx": "react",
    "jsxFactory": "renderer.create"
}
```

# How To Use

The documentation (in-code and guides) are under construction. In the meanwhile, all I can offer are the following examples:

## Interactive Hellow World

Says `"Hellow"` to anyone mentioned in the input, except if their name is `"Donald"`:

```tsx
import { state, filter, map } from '@connectv/core';
import { Renderer } from '@connectv/html';

let renderer = new Renderer();

let name = state('World');

renderer.render(
  <fragment>
    <input type='text' placeholder='type a name ...' _state={name}/>
    <br/>
    <p>Hellow {name.to(filter(x => x.toLowerCase() != 'donald'))}</p>
  </fragment>
).on(document.body);
```

[>TRY IT!](https://stackblitz.com/edit/connective-html-helloworld-interactive)

## Not A TodoList

A simple (not) a todo list, also with the feature of removing any item by clicking on it:

```tsx
import { state, map } from '@connectv/core';
import { List, ref, autoId, Renderer } from '@connectv/html';

export function NotATodoList({}, renderer: Renderer) {
  let items = state([]);
  let input = ref<HTMLInputElement>();

  return <fragment>
    <ul>
      <List of={items} each={(item, index) => 
          <li onclick={() => items.value = items.value.filter(i => i !== item.value)}>
            #{index.to(map(_ => parseInt(_) + 1))} {item.sub('title')}
          </li>
      } key={i => i.id}/>
    </ul>
    <input placeholder='Add an item ...' type='text' _ref={input}/>
    <button onclick={() => {
      items.value = items.value.concat([{ title: input.$.value, id: autoId() }]);
      input.$.value = '';
    }}>Add</button>
  </fragment>
}

let renderer = new Renderer();
renderer.render(<NotATodoList/>).on(document.body);
```

[>TRY IT!](https://stackblitz.com/edit/connective-html-todos)
