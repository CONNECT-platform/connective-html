import { PinLike, group, wrap, pack, map } from "@connectv/core";
import { Observable, combineLatest } from "rxjs";
import { map as _map } from "rxjs/operators";


export function reactiveLiteral(strings: TemplateStringsArray, ...values: (PinLike | Observable<any>)[]) {
  return group(...values.map($ => ($ instanceof Observable)?wrap($):$))
    .to(pack())
    .to(map((values: any[]) => 
      strings.reduce((total, piece, index) => total + piece + (values[index] || '').toString(), '')
    ));
}


export function rxLiteral(strings: TemplateStringsArray, ...values: Observable<any>[]) {
  return combineLatest(...values).pipe(_map(values =>
    strings.reduce((total, piece, index) => total + piece + (values[index] || '').toString(), '')
  ));
}
