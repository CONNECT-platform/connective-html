<p align="center">
<img src="https://raw.githubusercontent.com/CONNECT-platform/connective-html/master/logo.svg?sanitize=true" width="320px"/>
</p>

```
npm i @connectv/html
```
<br>

**CONNECTIVE HTML** is a JSX-compliant pure DOM renderer that is highly integrated with [**CONNECTIVE**](https://connective.dev)
and [**RxJS**](https://rxjs-dev.firebaseapp.com/), enabling building modern reactive UIs with extreme explicitness
and simplicity:

```typescript
import Renderer from '@connectv/html';
import { interval } from 'rxjs';

let renderer = new Renderer();

renderer.render(<div>You have been here for {interval(1000)} seconds.</div>).on(document.body);
```

The project aims to be:

- surgical: render once, only update what needs to be updated when it needs to be updated, without it requiring anything else to be checked even.
- explicit: no hidden layer between the code and the actual thing that gets run by the browser (except typescript transpiler). when you create a DOM element and render it, that IS the element that goes on the document, etc.
- reactive: no more disguising reactive programming as imperative programming. embrace reactivity.

This essentially means:

- Directly working with DOM API
- Fixing templating (and componenting) hassle with JSX
- Fixing reactivity (state management) with **CONNECTIVE**/**RxJS**

Which means you will get about as performant as it gets (benchmarks needed), while also being a modern, intuitive framework. Naturally you would need to know a bit about either one of **CONNECTIVE** or **RxJS** (or both), and generally be able to think reactively.

# DISCLAIMER:

This project is in super-early development. IT IS NOT TO BE USED on any production environment. All APIs are subject to
extensive change or out-right deprecation without any notice.

# For Early Testers / Contributers

## How to run it:

1. clone the repo
2. `npm i`
3. `npm start`
4. open browser at `localhost:3000`

## How to play with it:

checkout (and modify) [samples/index.tsx](samples/index.tsx)
