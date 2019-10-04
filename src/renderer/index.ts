import { ExtensibleRenderer } from './extensible-renderer';
import { LifeCyclePlugin } from './plugin/life-cycle';
import { EventHandlerPlugin } from './plugin/event-handler';
import { RefPlugin } from './plugin/ref';
import { ObjectValuePlugin } from './plugin/object-value';
import { CompFunc } from './plugin/component/basic-plugins';
import { ComponentPlugin } from './plugin/component/component';

import { rxjsPlugins } from './plugin/rxjs';
import { connectivePlugins } from './plugin/connective';

import { RawValue } from '../shared/types';

import { Observable } from 'rxjs';
import { PinLike } from '@connectv/core';
import { TrackPlugin } from './plugin/component/track';


export class ConnectiveRenderer<R = PinLike | Observable<RawValue>, T = string | CompFunc<R, string>> 
  extends ExtensibleRenderer<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>> {
  constructor() {
    super(
      new LifeCyclePlugin<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      new EventHandlerPlugin<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      new RefPlugin<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      new ObjectValuePlugin<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      new ComponentPlugin<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      new TrackPlugin<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      ...rxjsPlugins<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      ...connectivePlugins<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
    );
  }
}


export default ConnectiveRenderer;