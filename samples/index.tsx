import renderer from '../src/renderer';
import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';


let x = <h1>{interval(1000).pipe(tap(console.log))}</h1>;
let y: HTMLElement = <div>Counter: {x}</div>;

renderer.render(y).on(document.body);

setTimeout(() => y.remove(), 3000);