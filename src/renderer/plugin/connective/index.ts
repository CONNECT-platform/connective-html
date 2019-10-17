import { PinPlugin } from './pin';
import { PinObjectValuePlugin } from './object-value';
import { PinEventHandlerPlugin } from './pin-event-handler';
import { InputStatePlugin } from './input-state';
import { PinInnerHTMLPlugin } from './inner-html';
import { CompInputPlugin } from './comp-input';
import { CompOutputPlugin } from './comp-output';


export function connectivePlugins<R, T>() {
  return [
    new PinPlugin<R, T>(),
    new PinObjectValuePlugin<R, T>(),
    new PinInnerHTMLPlugin<R, T>(),
    new PinEventHandlerPlugin<R, T>(),
    new InputStatePlugin<R, T>(),
    new CompInputPlugin<R, T>(),
    new CompOutputPlugin<R, T>(),
  ]
}