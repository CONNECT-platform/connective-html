import { wrap, map } from '@connectv/core';
import { interval } from 'rxjs';

export function someFunc() {
  wrap(interval(1000)).to(map((x: any) => x * 32)).subscribe(console.log);
}