import { ObservablePlugin } from './observable';
import { ObservableObjectValuePlugin } from './object-value';
import { SubjectEventHandlerPlugin } from './subject-event-handler';
import { InputSubjectPlugin } from './input-subject';
import { ObservableInnerHTMLPlugin } from './inner-html';
import { CompInputPlugin } from './comp-input';
import { CompOutputPlugin } from './comp-output';


export function rxjsPlugins<R, T>() {
  return [
    new ObservablePlugin<R, T>(),
    new ObservableObjectValuePlugin<R, T>(),
    new ObservableInnerHTMLPlugin<R, T>(),
    new SubjectEventHandlerPlugin<R, T>(),
    new InputSubjectPlugin<R, T>(),
    new CompInputPlugin<R, T>(),
    new CompOutputPlugin<R, T>(),
  ]
}
