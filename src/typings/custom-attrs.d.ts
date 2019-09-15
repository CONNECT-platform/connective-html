declare module HTML {
  type StateType = import('@connectv/core').State 
    | import('rxjs').BehaviorSubject<import('../shared/types').RawValue> 
    | import('rxjs').BehaviorSubject<string>;

  interface InputAttributes {
    _state?: StateType;
  }

  interface TextAreaAttributes {
    _state?: StateType;
  }
}