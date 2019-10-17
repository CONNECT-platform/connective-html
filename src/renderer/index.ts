import { ExtensibleRenderer } from './extensible-renderer';
import { LifeCyclePlugin } from './plugin/life-cycle';
import { EventHandlerPlugin } from './plugin/event-handler';
import { RefPlugin } from './plugin/ref';
import { ObjectValuePlugin } from './plugin/object-value';
import { InnerHTMLPlugin } from './plugin/inner-html';
import { CompFunc } from './plugin/component/types';
import { ComponentPlugin } from './plugin/component/component';
import { TrackPlugin } from './plugin/component/track';
import { ExposePlugin } from './plugin/component/expose';

import { rxjsPlugins } from './plugin/rxjs';
import { connectivePlugins } from './plugin/connective';

import { RawValue } from '../shared/types';

import { Observable } from 'rxjs';
import { PinLike } from '@connectv/core';
import { CheckCompInputsPlugin } from './plugin/component/check-inputs';


export class ConnectiveRenderer<R = PinLike | Observable<RawValue>, T = string | CompFunc<R, string>> 
  extends ExtensibleRenderer<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>> {
  constructor() {
    super(
      new LifeCyclePlugin<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      new EventHandlerPlugin<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      new RefPlugin<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      new ObjectValuePlugin<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      new InnerHTMLPlugin<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      new ComponentPlugin<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      new TrackPlugin<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      new ExposePlugin<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      new CheckCompInputsPlugin<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      ...rxjsPlugins<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
      ...connectivePlugins<R | PinLike | Observable<RawValue>, T | CompFunc<R, string>>(),
    );
  }
}


export default ConnectiveRenderer;