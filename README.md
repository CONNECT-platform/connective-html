![CONNECTIVE HTML](https://raw.githubusercontent.com/CONNECT-platform/connective-html/master/repo-banner.svg?sanitize=true)

[![License](https://badgen.net/github/license/CONNECT-platform/connective-html?icon=github)](LICENSE)
[![Minzipped Size](https://badgen.net/bundlephobia/minzip/@connectv/html@latest?icon=npm&color=green)](https://bundlephobia.com/result?p=@connectv/html@latest)
[![Chat on Gitter](https://badgen.net/badge/chat%20on/gitter?icon=gitter&color=purple)](https://gitter.im/connectv/community)

**CONNECTIVE HTML** is a simple Typescript library for creating reactive component-based HTML user interfaces. 

**It is _simple_** as it enables using JSX syntax to work directly with browser's DOM API:
```tsx
import { Renderer } from '@connectv/html';

const renderer = new Renderer();
renderer.render(<div>Hellow World!</div>).on(document.body);
```
[► TRY IT!](https://stackblitz.com/edit/connective-html-hellowworld?file=index.tsx)

**It is _reactive_** as it is by default integrated with reactive libraries [**RxJS**](https://github.com/ReactiveX/rxjs) and [**CONNECTIVE**](https://github.com/CONNECT-platform/connective), and integrates easily with similar libraries:
```tsx
import { Renderer } from '@connectv/html';
import { timer } from 'rxjs';

const renderer = new Renderer();
renderer.render(<div>You have been here for {timer(0, 1000)} second(s).</div>)
        .on(document.body);
```
[► TRY IT!](https://stackblitz.com/edit/connective-html-timer?file=index.tsx)

**It is _component based_** as it supports functional and class-based components:
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
> For giving **CONNECTIVE HTML** a quick try, you can simply
> fork [this project on StackBlitz](https://stackblitz.com/edit/connective-html-hellowworld).


### New Project
```bash
$ npx @connectv/create-html <project-name>
$ cd <project-name>
$ npm start
```

Running `npx @connectv/create-html` without any parameters will create the new project inside the current directory, using its name as the project's name.

<br>

### Add to Existing Project
```
$ npm i @connectv/html
```
Configure your transpiler to use `renderer.create` as its JSX factory. For example:

#### For Typescript:
Add this to your `tsconfig.json` file:
```json
"compilerOptions": {
    "jsx": "react",
    "jsxFactory": "renderer.create"
}
```

#### For Babel ([plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)):
Add this to your Babel config:
```json
{
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "pragma": "renderer.create"
    }]
  ]
}
```

<br>

## How to Use
> **WARNING**: DO NOT USE THIS ON PRODUCTION. This project is at an early stage and requires further testing/benchmarking to ensure its security/efficiency for use on production. Additionally, at this stage all APIs are subject to change/removal without any prior notice.

The documentation (in-code and guides) are under construction. In the meanwhile, you can checkout [these examples](https://github.com/CONNECT-platform/connective-html/wiki/Examples).

<br>

## How to Contribute
Checkout [the contribution guide](CONTRIBUTING.md). Also checkout [the code of conduct](CODE_OF_CONDUCT.md) beforehand. Note that the project is still pretty young, so many standard contribution processes are not applicable yet. As the project progresses to more stable stages, these processes, alongside these documents, will be updated accordingly.

<br>
<br>
