import { PinPlugin } from './pin';
import { PinEventHandlerPlugin } from './pin-event-handler';
import { InputStatePlugin } from './input-state';


export function connectivePlugins<R, T>() {
  return [
    new PinPlugin<R, T>(),
    new PinEventHandlerPlugin<R, T>(),
    new InputStatePlugin<R, T>(),
  ]
}