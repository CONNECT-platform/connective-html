import { PinPlugin } from './pin';
import { PinObjectValuePlugin } from './object-value';
import { PinEventHandlerPlugin } from './pin-event-handler';
import { InputStatePlugin } from './input-state';
import { PinInnerHTMLPlugin } from './inner-html';
import { CompInputPinPlugin } from './comp-input-pin';
import { CompOutputPinPlugin } from './comp-output-pin';
import { CompStateBindPlugin } from './comp-state-bind';
import { CompStateTrackPlugin } from './comp-state-track';


export function connectivePlugins<R, T>() {
  return [
    new PinPlugin<R, T>(),
    new PinObjectValuePlugin<R, T>(),
    new PinInnerHTMLPlugin<R, T>(),
    new PinEventHandlerPlugin<R, T>(),
    new InputStatePlugin<R, T>(),
    new CompStateTrackPlugin<R, T>(),
    new CompStateBindPlugin<R, T>(),
    new CompInputPinPlugin<R, T>(),
    new CompOutputPinPlugin<R, T>(),
  ]
}