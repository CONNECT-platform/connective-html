import { ExtensibleRenderer } from './extensible-renderer';
import { LifeCyclePlugin } from './plugin/life-cycle';
import { EventHandlerPlugin } from './plugin/event-handler';
import { RefPlugin } from './plugin/ref';
import { ObjectValuePlugin } from './plugin/object-value';

import { rxjsPlugins } from './plugin/rxjs';
import { connectivePlugins } from './plugin/connective';

import { RawValue } from '../shared/types';

import { Observable } from 'rxjs';
import { PinLike } from '@connectv/core';


export class ConnectiveRenderer<R = PinLike | Observable<RawValue>, T = string> 
  extends ExtensibleRenderer<R, T> {
  constructor() {
    super(
      new LifeCyclePlugin<R, T>(),
      new EventHandlerPlugin<R, T>(),
      new RefPlugin<R, T>(),
      new ObjectValuePlugin<R, T>(),
      ...rxjsPlugins<R, T>(),
      ...connectivePlugins<R, T>(),
    );
  }
}


export default ConnectiveRenderer;