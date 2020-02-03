import { ObservablePlugin } from './observable';
import { ObservableClassPlugin } from './observable-class';
import { ObservableObjectValuePlugin } from './object-value';
import { SubjectEventHandlerPlugin } from './subject-event-handler';
import { InputSubjectPlugin } from './input-subject';
import { ObservableInnerHTMLPlugin } from './inner-html';
import { CompInputSubjectPlugin } from './comp-input-subject';
import { CompOutputObservablePlugin } from './comp-output-observable';
import { CompOutputObservableEventsPlugin } from './comp-output-observable-events';
import { CompContextSubjectPlugin } from './comp-context-subject';
import { DefaultSubjectRecipientPlugin } from './default-recipient';


export function rxjsPlugins<R, T>() {
  return [
    new ObservablePlugin<R, T>(),
    new ObservableClassPlugin<R, T>(),
    new ObservableObjectValuePlugin<R, T>(),
    new ObservableInnerHTMLPlugin<R, T>(),
    new SubjectEventHandlerPlugin<R, T>(),
    new InputSubjectPlugin<R, T>(),
    new CompInputSubjectPlugin<R, T>(),
    new CompOutputObservablePlugin<R, T>(),
    new CompOutputObservableEventsPlugin<R, T>(),
    new CompContextSubjectPlugin<R, T>(),
    new DefaultSubjectRecipientPlugin<R, T>(),
  ]
}


export {
  ObservablePlugin, ObservableClassPlugin, ObservableObjectValuePlugin, ObservableInnerHTMLPlugin,
  SubjectEventHandlerPlugin, InputSubjectPlugin,
  CompInputSubjectPlugin, CompContextSubjectPlugin,
  CompOutputObservablePlugin, CompOutputObservableEventsPlugin,
  DefaultSubjectRecipientPlugin,
}

export { CompInputSubject } from './comp-input-subject';
export { trackable, Trackable } from './trackable';