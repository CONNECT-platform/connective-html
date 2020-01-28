<p align="center">
<img src="https://raw.githubusercontent.com/CONNECT-platform/connective-html/master/logo.svg?sanitize=true" width="320px"/>
</p>

```
npm i @connectv/html
```
<br>

**CONNECTIVE HTML** is a frontend library for creating modern reactive web applications in a simple and explicit manner.
It is _simple_ as it enables working directly with DOM APIs with JSX syntax:

```tsx
import Renderer from '@connectv/html';

let renderer = new Renderer();

renderer.render(<div>Hellow World!</div>).on(document.body);
```
([TRY IT!](https://stackblitz.com/edit/connective-html-hellowworld?file=index.tsx))

It is _explicit_ as it throws out any magical layer underneath the API (layers such as Virtual DOM, automatic change detection, domain-specific compilations, etc.) in favor of directly working with reactive values using reactive libraries
such as (**RXJS**)[https://github.com/ReactiveX/rxjs] or (**CONNECTIVE**)[https://github.com/CONNECT-platform/connective]:

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
([TRY IT!](https://stackblitz.com/edit/connective-html-timer?file=index.tsx))

