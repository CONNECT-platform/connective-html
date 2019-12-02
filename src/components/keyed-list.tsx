import { State, SimpleDeep, KeyedDeep, KeyFunc, ChangeMap, PinLike, sink, isPinLike, wrap } from '@connectv/core';

import { RendererLike } from '../renderer/renderer-like';
import { CompType, ComponentThis } from '../renderer/plugin/component/types';

import { Marker } from './marker';
import { scanRemove } from './util/scan';
import { Observable } from 'rxjs';


export interface KeyedListPropsWithKey {
  of: State | SimpleDeep | PinLike | Observable<any[]>;
  each: (sub: SimpleDeep, index?: PinLike) => Node;
  key: KeyFunc;
}

export interface KeyedListPropsWithoutKey {
  of: KeyedDeep,
  each: (sub: SimpleDeep, index?: PinLike) => Node;
}

export type KeyedListProps = KeyedListPropsWithKey | KeyedListPropsWithoutKey;


export function KeyedList(this: ComponentThis, props: KeyedListProps, renderer: RendererLike<any, any | CompType>) {
  let startMark = <Marker/>;
  this.track.mark(startMark);

  let markers : Node[] = [];
  let list: KeyedDeep;

  if (props.of instanceof KeyedDeep) list = props.of;
  else {
    let _props = props as KeyedListPropsWithKey;
    if (_props.of instanceof State) list = new KeyedDeep(_props.of, _props.key);
    else if (_props.of instanceof SimpleDeep) list = new KeyedDeep(_props.of.state, _props.key);
    else {
      list = new KeyedDeep(new State(), _props.key);
      if (isPinLike(_props.of)) _props.of.to(list);
      else wrap(_props.of).to(list);

      this.track(list);
    }
  }

  this.track({
    bind() {
      (list.value || []).forEach((entry: any) => {
        const key = list.keyfunc(entry);
        const prevMarker = markers[markers.length - 1] || startMark;
        const marker = <Marker/>;
        markers.push(marker);
        renderer.render(<fragment>
          {props.each(list.key(key), list.index(key))}
          {marker}
        </fragment>).after(prevMarker);
      });
    }
  });

  this.track(list.changes.to(sink((changes: ChangeMap) => {
    if (changes.initial) return; // --> ignore the initial change
    const len = list.value.length;

    // STEP 1: create extra markers if need be
    if (len > markers.length) {
      for (let i = markers.length; i < len; i++) {
        let marker = <Marker/>;
        renderer.render(marker).after(markers[i - 1] || startMark);
        markers.push(marker);
      }
    }

    // STEP 2: remove deletions (without removing their markers)
    changes.deletions.forEach(deletion => {
      let index = parseInt(deletion.index);
      let start = markers[index - 1] || startMark;
      let end = markers[index];
      scanRemove(start, end);
    });

    // STEP 3: move moved items
    let moveTargets: {index: string, nodes: Node[]}[] = [];

    changes.moves.forEach(move => {
      let oldIndex = parseInt(move.oldIndex);
      let start = markers[oldIndex - 1] || startMark;
      let end = markers[oldIndex];
      moveTargets.push({ index: move.newIndex, nodes: scanRemove(start, end) });
    });

    moveTargets.forEach(target => {
      renderer.render(<fragment>{target.nodes}</fragment>).before(markers[target.index as any]);
    });

    // STEP 4: add additions
    changes.additions.forEach(addition => {
      let key = list.keyfunc(addition.item);
      renderer.render(props.each(list.key(key), list.index(key))).before(markers[addition.index as any]);
    });

    // STEP 5: remove extra markers if need be
    if (len < markers.length) {
      for (let i = len; i < markers.length; i++) (markers[i].parentElement as HTMLElement).removeChild(markers[i]);
      markers.length = len;
    }
  })));

  return <fragment>{startMark}</fragment>;
}