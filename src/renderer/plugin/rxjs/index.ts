import { ObservablePlugin } from './observable';
import { SubjectEventHandlerPlugin } from './subject-event-handler';


export function rxjsPlugins<R, T>() {
  return [
    new ObservablePlugin<R, T>(),
    new SubjectEventHandlerPlugin<R, T>()
  ]
}
