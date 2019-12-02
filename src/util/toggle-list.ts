import { Observable, combineLatest } from "rxjs";
import { map as _map } from "rxjs/operators";
import { PinLike, group, wrap, pack, map } from "@connectv/core";


export type ReactiveNameMap = {[name: string]: Observable<boolean> | PinLike};
export type RxNameMap = {[name: string]: Observable<boolean>};
export type NamesAggregatorFunc<T> = (names: string[]) => T;

const _DefaultAggregator = (names: string[]) => names.join(' ');


export function toggleList(names: ReactiveNameMap): PinLike;
export function toggleList<T>(
  names: ReactiveNameMap,
  aggregator?: NamesAggregatorFunc<T>
): PinLike {
  const _aggregator = aggregator || _DefaultAggregator as any;
  return group(...
    Object.entries(names)
      .map(
        ([name, $]) =>
          (($ instanceof Observable)?wrap($):$)
          .to(map((v: boolean) => [name, v]))
      )
    )
    .to(pack())
    .to(map((l: [string, boolean][]) => 
      _aggregator(
        l.filter(([_, v]) => v).map(([n, _]) => n)
      )
    )
  );
}


export function rxToggleList(names: RxNameMap): Observable<string>;
export function rxToggleList<T>(
  names: RxNameMap, 
  aggregator?: NamesAggregatorFunc<T>
): Observable<T> {
  const _aggregator = aggregator || _DefaultAggregator as any;
  return combineLatest(...
    Object.entries(names)
      .map(
        ([name, $]) => $.pipe(_map(v => [name, v]))
      )
  )
  .pipe(
    _map((l: [string, boolean][]) =>
      _aggregator(l.filter(([_, v]) => v).map(([n, _]) => n))
    )
  )
}
