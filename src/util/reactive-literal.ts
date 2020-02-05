import { PinLike, group, wrap, pack, map, isPinLike, value } from "@connectv/core";
import { Observable, combineLatest, of } from "rxjs";
import { map as _map } from "rxjs/operators";


export function reactiveLiteral(strings: TemplateStringsArray, ...values: (PinLike | Observable<any> | any)[]) {
  return group(...values.map(v => {
    if (isPinLike(v)) return v;
    else if (v instanceof Observable) return wrap(v);
    else return value(v);
  }))
  .to(pack())
  .to(map((values: any[]) =>
    strings.reduce((total, piece, index) => total + piece + (values[index] || '').toString(), '')
  ));
}


export function rxLiteral(strings: TemplateStringsArray, ...values: Observable<any>[]) {
  return combineLatest(...values.map(v => {
      if (v instanceof Observable) return v;
      else return of(v);
  })).pipe(_map(values =>
    strings.reduce((total, piece, index) => total + piece + (values[index] || '').toString(), '')
  ));
}
