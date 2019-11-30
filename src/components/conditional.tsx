import { RendererLike } from '../renderer/renderer-like';
import { CompFunc, ComponentThis } from '../renderer/plugin/component/types';
import { PinLike, wrap, sink } from '@connectv/core';
import { Observable } from 'rxjs';
import { Marker } from './marker';
import { scanRemove } from './util/scan';



export interface ConditionalProps {
  if: PinLike | Observable<boolean>;
  then: () => Node;
  else?: () => Node;
}


export function Conditional(this: ComponentThis, props: ConditionalProps, renderer: RendererLike<any, any | CompFunc>) {
  let start = <Marker/>;
  let end = <Marker/>;
  this.track.mark(start);

  let cond = (props.if instanceof Observable)? wrap(props.if) : props.if;
  let latest: boolean | any = undefined;

  this.track(cond.to(sink((value: boolean) => {
    if (value !== latest) {
      latest = value;

      scanRemove(start, end);
      if (value) renderer.render(props.then()).after(start);
      else if (props.else) renderer.render(props.else()).after(start);
    }
  })));

  return <fragment>{start}{end}</fragment>
}