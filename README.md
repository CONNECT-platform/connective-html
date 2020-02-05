![CONNECTIVE HTML](https://raw.githubusercontent.com/CONNECT-platform/connective-html/master/repo-banner.svg?sanitize=true)

<br>

[![License](https://badgen.net/github/license/CONNECT-platform/connective-html?icon=github)](LICENSE)
[![Minzipped Size](https://badgen.net/bundlephobia/minzip/@connectv/html@latest?icon=npm&color=green)](https://bundlephobia.com/result?p=@connectv/html@latest)
[![Chat on Gitter](https://badgen.net/badge/chat%20on/gitter?icon=gitter&color=purple)](https://gitter.im/connectv/community)

**CONNECTIVE HTML** is a simple Typescript library for creating reactive component-based HTML user interfaces. It is _simple_ as it enables using JSX syntax to work directly with browser's DOM API:
```tsx
import { Renderer } from '@connectv/html';

const renderer = new Renderer();
renderer.render(<div>Hellow World!</div>).on(document.body);
```
[► TRY IT!](https://stackblitz.com/edit/connective-html-hellowworld?file=index.tsx)

<br>

It allows for _reactive_ interfaces via integration with libraries such as [**RxJS**](https://github.com/ReactiveX/rxjs) or [**CONNECTIVE**](https://github.com/CONNECT-platform/connective):

```tsx
import { Renderer } from '@connectv/html';
import { timer } from 'rxjs';

const renderer = new Renderer();
renderer.render(<div>You have been here for {timer(0, 1000)} second(s).</div>)
        .on(document.body);
```
[► TRY IT!](https://stackblitz.com/edit/connective-html-timer?file=index.tsx)

<br>

It is _component based_ as it supports functional and class-based components:

```tsx
import { Renderer } from '@connectv/html';

const MyComp = ({ name }, renderer) => <div>Hellow {name}!</div>

const renderer = new Renderer();
renderer.render(
  <fragment>
    <MyComp name='World'/>
    <MyComp name='Fellas'/>
  </fragment>
)
.on(document.body);
```
[► TRY IT!](https://stackblitz.com/edit/connective-html-basic-component?file=index.tsx)

```tsx
import { Renderer, Component } from '@connectv/html';
import { state } from '@connectv/core';

class MyComp extends Component {
  count = state(0);

  render(renderer) {
    return <div onclick={() => this.count.value += 1}>
            Hellow { this.props.name } ({this.count})
          </div>
  }
}

const renderer = new Renderer();
renderer.render(
  <fragment>
    <MyComp name='World'/>
    <MyComp name='Fellas'/>
  </fragment>
)
.on(document.body);
```
[► TRY IT!](https://stackblitz.com/edit/connective-html-basic-component-class?file=index.tsx)

<br>

## How to Install

### Online Playground

Fork [this](https://stackblitz.com/edit/connective-html-hellowworld) project on [StackBlitz](https://stackblitz.com).

<br>

### New Typescript Project

Run the following:

```bash
$ npx @connectv/create-html <project-name>
$ cd <project-name>
$ npm start
```

Running `npx @connectv/create-html` without any parameters will create the new project inside the current directory, using its name as the project's name.

Alternatively, you can clone [this starter project](https://github.com/loreanvictor/connective-html-sample.git) and follow
the instructions in its readme file.

<br>

### Custom Typescript Setup

To add to an existing project (or any frontend typescript project with your own custom setup):

```
$ npm i @connectv/html
```

And add the following to your `tsconfig.json` file:

```json
"compilerOptions": {
    "jsx": "react",
    "jsxFactory": "renderer.create"
}
```

<br>

## How to Use

> **WARNING**: DO NOT USE THIS ON PRODUCTION. This project is at an early stage and requires further testing/benchmarking to ensure its security/efficiency for use on production. Additionally, at this stage all APIs are subject to change/removal without any prior notice.

The documentation (in-code and guides) are under construction. In the meanwhile, all I can offer are the following examples:

<br>

### Example: Interactive Hellow World

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

[► TRY IT!](https://stackblitz.com/edit/connective-html-helloworld-interactive)

<br>

### Example: Not a TodoList

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

[► TRY IT!](https://stackblitz.com/edit/connective-html-todos)

<br>

### Example: Not a TodoList Using `Component` Class

Same as before, but this time with class based components instead of function based, if thats more your style:

```tsx
import { state, map } from '@connectv/core';
import { Component, List, autoId, Renderer } from '@connectv/html';


export class NotATodoList extends Component {
  items = state([]);
  next = state('');

  remove(item) {
    this.items.value = this.items.value.filter(i => i !== item);
  }

  add() {
    this.items.value = this.items.value.concat({
      title: this.next.value,
      id: autoId()
    });

    this.next.value = '';
  }

  render(renderer) {
    return <fragment>
      <ul>
        <List of={this.items} each={item => 
            <li onclick={() => this.remove(item.value)}>
              {item.sub('title')}
            </li>
        } key={i => i.id}/>
      </ul>
      <input placeholder='Add an item ...' type='text' _state={this.next}/>
      <button onclick={() => this.add()}>
        Add #{this.items.to(map(l => l.length + 1))}
      </button>
    </fragment>    
  }
}

let renderer = new Renderer();
renderer.render(<NotATodoList/>).on(document.body);
```

[► TRY IT!](https://stackblitz.com/edit/connective-html-todos-class)

<br>

### Example: GitHub Repos

Lists all of the repositories of a given GitHub user by their username:

```tsx
/** @jsx renderer.create */

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
  const loading = group(
    value(false),              // --> start with `false`.
    id.to(map(() => true)),    // --> emit `true` after `id` emits.
    repos.to(map(() => false)) // --> emit `false` after `repos` emits.
  );

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

[► TRY IT!](https://stackblitz.com/edit/connective-html-github-repos)

<br>

### Example: Styling, Styled Components, JSS

We have a boolean state and a button which toggles the value of the state and changes color based on its value.
We have another button that doesn't do anything, but changes background color based on changes in the state, with 1000ms delay.
And we have a styled custom component with a button inside a div. This button also toggles the value of the state.

```tsx
import { state, map, pipe } from '@connectv/core';
import { Renderer, styled, toggleList, rl } from '@connectv/html';
import { delay } from 'rxjs/operators';

import jss from 'jss';
import preset from 'jss-preset-default';
jss.setup(preset())

const { classes } = jss.createStyleSheet({
  '@global': {
    body: { background: '#424242', },
    '*': { 'font-size': '18px' }
  },
  button: {
    'border-radius': '3px',
    color: 'white',
    padding: '8px',
    background: 'blue',
    border: 'none',
    cursor: 'pointer',
    transition: 'background .3s'
  },
  red: { background: 'red', },
  div: {
    padding: '8px',
    margin: '8px 0px',
    'border-radius': '3px',
    'box-shadow': '0 2px 6px rgba(0, 0, 0, 75)'
  }
}).attach();

const isRed = state(false);
const renderer = new Renderer();

renderer.render(<fragment>
  <button 
    onclick={() => isRed.value = !isRed.value} // --> change the state on click
    class={rl`
      ${classes.button                         /* --> add `classes.button` class */} 
      ${toggleList({ [classes.red]: isRed })   /* --> toggle `classes.red` based on `isRed` */}
    `}>
    Switch Color
  </button>
  <button class={classes.button}              // --> add `classes.button` class 
        style={rl`
          background: ${
            isRed                             // --> change `background` based on `isRed`
            .to(map(_ => _?'yellow':'lime'))  // --> change to 'yellow' if `isRed` is true, 'lime' otherwise
            .to(pipe(delay(1000)))            // --> but delay a second before changing
          };
          color: black;
        `}>
    This Does Nothing
  </button>
</fragment>).on(document.body);


export function StyledComp(_, renderer) {
  renderer = renderer.plug(styled(classes));  // --> make a new renderer which uses `classes` by default for styling
  return <div>                               {/* --> so this div is styled automatically with `classes.div` class. */}
    <button style="background: magenta"       /* --> also this button is tyled automatically with `classes.button` class. */
            onclick={() => isRed.value = !isRed.value}>
      Switch Color of Above Buttons
    </button>
  </div>
}

renderer.render(<StyledComp/>).on(document.body);
```
[► TRY IT!](https://stackblitz.com/edit/connective-html-styling)

<br>

### Example: Theme Changer

In this example the `Context` is used to set a "theme" for the app, which is picked up by custom components:

```tsx
import { state, pin, map } from '@connectv/core';
import { Renderer, Context, rl } from '@connectv/html';

const themes = {
  black: { bg: 'black', fg: 'white', main: 'yellow', mainInv: 'black' },
  white: { bg: 'white', fg: 'black', main: 'blue', mainInv: 'white' },
  red: { bg: 'red', fg: 'white', main: 'black', mainInv: 'white' }
}

export function ThemedButton(_, renderer) {
  const label = pin();
  const action = pin();

  this.expose({
    inputs: { label },
    outputs: { action }
  });

  return <button style={rl`
        border-radius: 3px; border: none; cursor: pointer;
        background: ${this.context('theme').to(map(_ => _.main))};
        color: ${this.context('theme').to(map(_ => _.mainInv))}
      `} onclick={action}>
    {label}
  </button>
}

export function ThemedHolder(_, renderer, children) {
  return <div style={rl`
      margin: -8px; padding: 16px; height: calc(100vh - 32px);
      background: ${this.context('theme').to(map(_ => _.bg))};
      color: ${this.context('theme').to(map(_ => _.fg))}
    `}>
    Hellow There! <br/>
    {children}
  </div>
}

const renderer = new Renderer();
const theme = state(themes.black);
renderer.render(
  <Context theme={theme}>
    <ThemedHolder hint={'Use these buttons to switch the theme.'}>
      <span style='font-size: 12px'>Use these buttons to change theme:</span> <br/>
      <ThemedButton label='White Theme' action={() => theme.value = themes.white}/>
      <ThemedButton label='Black Theme' action={() => theme.value = themes.black}/>
      <ThemedButton label='Red Theme' action={() => theme.value = themes.red}/>
    </ThemedHolder>
  </Context>
).on(document.body);
```
[► TRY IT!](https://stackblitz.com/edit/connective-html-context)

<br>

### Stackblitz Code Loader

Loads a given file from a given project from stackblitz. This example uses **RxJS** instead of **CONNECTIVE** for handling reactive flows.

```tsx
import { from, BehaviorSubject, combineLatest, merge } from 'rxjs';
import { debounceTime, mergeMap, filter, mapTo } from 'rxjs/operators';
import stackblitz from '@stackblitz/sdk';
import { Renderer } from '@connectv/html';

const renderer = new Renderer();

const load = async (projectName, filename) => {
  const X = <div></div>;
  const Y = <div hidden>{X}</div>
  renderer.render(Y).on(document.body);

  try {
    const VM = await stackblitz.embedProjectId(X, projectName);
    const FS = await VM.getFsSnapshot();
    Y.remove();

    if (!(filename in FS)) return 'NO SUCH FILE';
    return FS[filename];
  } catch (err) {
    return 'COULD NOT LOAD';
  }
};

const project = new BehaviorSubject<string>('');
const filename = new BehaviorSubject<string>('');
const input = combineLatest(
  project.pipe(filter(_ => !!_), debounceTime(1000)),
  filename.pipe(filter(_ => !!_), debounceTime(1000))
);

renderer.render(<fragment>
  <input _state={project} type='text' placeholder='stackblitz project id ...'/>
  <input _state={filename} type='text' placeholder='file to open ...'/>
  <div>
    <pre>
    {
      merge(
        input.pipe(mapTo('LOADING ...')),
        input.pipe(mergeMap(([project, filename]) => from(load(project, filename))))
      )
    }
    </pre>
  </div>
</fragment>).on(document.body);
```
[► TRY IT!](https://stackblitz.com/edit/connective-html-stackblitz)

<br>

## How to Contribute

Checkout [the contribution guide](CONTRIBUTING.md). Also checkout [the code of conduct](CODE_OF_CONDUCT.md) beforehand. Note that the project is still pretty young, so many standard contribution processes are not applicable yet. As the project progresses to more stable stages, these processes, alongside these documents, will be updated accordingly.

<br>
<br>
