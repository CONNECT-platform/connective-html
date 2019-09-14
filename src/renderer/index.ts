import { ExtensibleRenderer } from './extensible-renderer';
import { ObservablePlugin } from './plugin/observable';
import { PinPlugin } from './plugin/pin';
import { LifeCyclePlugin } from './plugin/life-cycle';
import { EventHandlerPlugin } from './plugin/event-handler';
import { InputStatePlugin } from './plugin/input-state';
import { RawValue } from '../shared/types';

import { Observable } from 'rxjs';
import { PinLike } from '@connectv/core';


export class ConnectiveRenderer<R = PinLike | Observable<RawValue>, T = string> 
  extends ExtensibleRenderer<R, T> {
  constructor() {
    super(
      new LifeCyclePlugin(),
      new ObservablePlugin(),
      new PinPlugin(),
      new EventHandlerPlugin(),
      new InputStatePlugin(),
    );
  }
}


export default ConnectiveRenderer;