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
[>> TRY IT!](https://stackblitz.com/edit/connective-html-hellowworld?file=index.tsx)

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
[>> TRY IT!](https://stackblitz.com/edit/connective-html-timer?file=index.tsx)

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

[>> TRY IT!](https://stackblitz.com/edit/connective-html-helloworld-interactive)

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
      <List of={items} each={item => 
          <li onclick={() => items.value = items.value.filter(i => i !== item.value)}>
            {item.sub('title')}
          </li>
      } key={i => i.id}/>
    </ul>
    <input placeholder='Add an item ...' type='text' _ref={input}/>
    <button onclick={() => {
      items.value = items.value.concat([{ title: input.$.value, id: autoId() }]);
      input.$.value = '';
    }}>Add #{items.to(map(l => l.length + 1))}</button>
  </fragment>
}

let renderer = new Renderer();
renderer.render(<NotATodoList/>).on(document.body);
```

[>> TRY IT!](https://stackblitz.com/edit/connective-html-todos)

## GitHub Repos

Lists all of the repositories of a given GitHub user by their username:

```tsx
import { state, map, group, pin, filter, pipe, value } from '@connectv/core';
import { Renderer, List } from '@connectv/html';

import { ajax } from 'rxjs/ajax';
import { debounceTime } from 'rxjs/operators';

// --- A LOADING COMPONENT --- \\

function Loading(_, renderer: Renderer) {
  const show = pin();
  this.expose({ inputs: { show } });

  return <div hidden={show.to(map(_ => !_))}>Loading ...</div>
}

// --- A FUNCTION TO FETCH REPOS --- \\

const fetchRepos = id => new Promise(resolve => {
  ajax.getJSON(`https://api.github.com/users/${id}/repos`).subscribe(resolve);
});

// --- A COMPONENT TO RENDER REPOS --- \\

function ReposGrid(_, renderer: Renderer) {
  const id = pin();
  this.expose({ inputs: { id }});

  const repos = id.to(map((id, done) => fetchRepos(id).then(done)));
  const loading = group(value(false), id.to(map(() => true)), repos.to(map(() => false)));

  return <fragment>
    <Loading show={loading}/>
    <ul hidden={loading}>
      <List of={repos} each={repo =>
        <li>
          <ul>
            <li><a href={repo.sub('html_url')}>{repo.sub('name')}</a></li>
            <li>{repo.sub('description')}</li>
            <li>
              {repo.sub('stargazers_count').to(map(_ => (_ || 'no') + ' star' + (_ != 1?'s':'')))}
            </li>
          </ul>
          <hr/>
        </li>
      }/>
    </ul>
  </fragment>
}

// --- THE MAIN DOCUMENT --- \\

let renderer = new Renderer();
let id = state();

renderer.render(<fragment>
  <input type="text" _state={id} placeholder="github user id ..."/>
  <hr/>
  <ReposGrid id={id.to(filter(_ => _)).to(pipe(debounceTime(1000)))}/>
</fragment>).on(document.body);
```

[>> TRY IT!](https://stackblitz.com/edit/connective-html-github-repos)
