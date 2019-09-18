import { ObservablePlugin } from './observable';
import { ObservableObjectValuePlugin } from './object-value';
import { SubjectEventHandlerPlugin } from './subject-event-handler';
import { InputSubjectPlugin } from './input-subject';



export function rxjsPlugins<R, T>() {
  return [
    new ObservablePlugin<R, T>(),
    new ObservableObjectValuePlugin<R, T>(),
    new SubjectEventHandlerPlugin<R, T>(),
    new InputSubjectPlugin<R, T>(),
  ]
}
