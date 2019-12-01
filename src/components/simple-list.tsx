import { State, SimpleDeep, PinLike, sink, value } from '@connectv/core';

import { RendererLike } from '../renderer/renderer-like';
import { CompType, ComponentThis } from '../renderer/plugin/component/types';

import { Marker } from './marker';
import { scanRemove } from './util/scan';


export interface SimpleListProps {
  of: State | SimpleDeep,
  each: (sub: SimpleDeep, index?: PinLike) => Node;
}


export function SimpleList(this: ComponentThis, props: SimpleListProps, renderer: RendererLike<any, any | CompType>) {
  let startMark = <Marker/>;
  this.track.mark(startMark);

  let markers: Node[] = [];
  let list = (props.of instanceof SimpleDeep)?(props.of):(new SimpleDeep(props.of));

  this.track(list.to(sink(_list => {
    if (_list.length > markers.length) {
      let prevMark = markers[markers.length - 1] || startMark;

      for (let index = markers.length; index < _list.length; index++) {
        let marker = <Marker/>;
        let sub = list.sub(index);

        renderer.render(
          <fragment>
            {props.each(sub, value(index))}
            {marker}
          </fragment>
        ).after(prevMark);

        prevMark = marker;
        markers.push(marker);
      }
    }
    else if (_list.length < markers.length) {
      let prevMark = markers[_list.length - 1] || startMark;

      for (let index = _list.length; index < markers.length; index++)
        scanRemove(prevMark, markers[index], {
          includeEnd: true
        });

      markers.length = _list.length;
    }
  })));

  return <fragment>{startMark}</fragment>;
}