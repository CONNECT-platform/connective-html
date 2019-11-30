import { State, SimpleDeep, KeyedDeep, KeyFunc, ChangeMap, PinLike, sink } from '@connectv/core';

import { RendererLike } from '../renderer/renderer-like';
import { CompFunc, ComponentThis } from '../renderer/plugin/component/types';

import { Marker } from './marker';
import { scanRemove } from './util/scan';


export interface KeyedListPropsWithKey {
  of: State | SimpleDeep;
  each: (sub: SimpleDeep, index?: PinLike) => Node;
  key: KeyFunc;
}

export interface KeyedListPropsWithoutKey {
  of: KeyedDeep,
  each: (sub: SimpleDeep, index?: PinLike) => Node;
}

export type KeyedListProps = KeyedListPropsWithKey | KeyedListPropsWithoutKey;


export function KeyedList(this: ComponentThis, props: KeyedListProps, renderer: RendererLike<any, any | CompFunc>) {
  let startMark = <Marker/>;
  this.track.mark(startMark);

  let markers : Node[] = [];
  let list: KeyedDeep;

  if (props.of instanceof KeyedDeep) list = props.of;
  else {
    let _props = props as KeyedListPropsWithKey;
    if (_props.of instanceof State) list = new KeyedDeep(_props.of, _props.key);
    else list = new KeyedDeep(_props.of.state, _props.key);
  }

  this.track(list.changes.to(sink((changes: ChangeMap) => {
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