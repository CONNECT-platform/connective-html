declare module HTML {
  export type StateType = import('@connectv/core').State 
    | import('rxjs').BehaviorSubject<any> 
    | import('rxjs').BehaviorSubject<string>;

  interface Attributes {
    _ref?: RefLike<Node>;
    _innerHTML?: HTML.Renderable;
  }

  interface InputAttributes {
    _state?: StateType;
    _value?: any;
  }

  interface TextAreaAttributes {
    _state?: StateType;
  }

  interface SelectAttributes {
    _state?: StateType;
  }

  interface OptionAttributes {
    _value?: any;
  }
}