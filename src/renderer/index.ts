import { Observable } from 'rxjs';
import { PinLike } from '@connectv/core';

import { ExtensibleRenderer } from './extensible-renderer';

import { LifeCyclePlugin } from './plugin/life-cycle';
import { EventHandlerPlugin } from './plugin/event-handler';
import { RefPlugin } from './plugin/ref';
import { ObjectValuePlugin } from './plugin/object-value';
import { InnerHTMLPlugin } from './plugin/inner-html';
import { CompType } from './plugin/component/types';
import { ComponentPlugin } from './plugin/component/component';
import { TrackPlugin } from './plugin/component/track';
import { ExposePlugin } from './plugin/component/expose';
import { rxjsPlugins } from './plugin/rxjs';
import { connectivePlugins } from './plugin/connective';
import { Component as _C } from './plugin/component/types';
import { CheckCompInputsPlugin } from './plugin/component/check-inputs';
import { CompStateIOPlugin } from './plugin/component/state-io';
import { ContextPlugin } from './plugin/component/context';


export class ConnectiveRenderer<R = RawValue, T = string>
  extends ExtensibleRenderer<R | PinLike | Observable<RawValue>, T | CompType<R, string>> {
  constructor() {
    super(
      new LifeCyclePlugin<R | PinLike | Observable<RawValue>, T | CompType<R, string>>(),
      new EventHandlerPlugin<R | PinLike | Observable<RawValue>, T | CompType<R, string>>(),
      new RefPlugin<R | PinLike | Observable<RawValue>, T | CompType<R, string>>(),
      new ObjectValuePlugin<R | PinLike | Observable<RawValue>, T | CompType<R, string>>(),
      new InnerHTMLPlugin<R | PinLike | Observable<RawValue>, T | CompType<R, string>>(),
      new ComponentPlugin<R | PinLike | Observable<RawValue>, T | CompType<R, string>>(),
      new TrackPlugin<R | PinLike | Observable<RawValue>, T | CompType<R, string>>(),
      new ExposePlugin<R | PinLike | Observable<RawValue>, T | CompType<R, string>>(),
      new ContextPlugin<R | PinLike | Observable<RawValue>, T | CompType<R, string>>(),
      new CompStateIOPlugin<R | PinLike | Observable<RawValue>, T | CompType<R, string>>(),
      new CheckCompInputsPlugin<R | PinLike | Observable<RawValue>, T | CompType<R, string>>(),
      ...rxjsPlugins<R | PinLike | Observable<RawValue>, T | CompType<R, string>>(),
      ...connectivePlugins<R | PinLike | Observable<RawValue>, T | CompType<R, string>>(),
    );
  }
}


export default ConnectiveRenderer;
export abstract class Component<R = any, T = string | CompType<R, string>>
            extends _C<R, T> {}

export { Renderer as RawRenderer } from './renderer';
export { ExtensibleRenderer };
export { Ref, ref } from './ref';
export { RendererLike } from './renderer-like';

export * from './plugin';
export * from './error';