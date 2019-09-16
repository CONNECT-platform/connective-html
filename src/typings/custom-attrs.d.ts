declare module HTML {
  type StateType = import('@connectv/core').State 
    | import('rxjs').BehaviorSubject<import('../shared/types').RawValue> 
    | import('rxjs').BehaviorSubject<string>;

  interface Attributes {
    _ref?: import('../renderer/ref').Ref;
  }

  interface InputAttributes {
    _state?: StateType;
  }

  interface TextAreaAttributes {
    _state?: StateType;
  }
}