import { Pin, value, isPinLike, wrap } from "@connectv/core/dist/es5/index";
import { PropsType } from "../../../shared/types";
import { Observable } from "rxjs";
import { ComponentInputMissingError } from "../component/errors/input-missing.error";
import { UnnamedComponentInputError } from "../component/errors/unnamed-input.error";


interface CompInputOptionsRequired {
  required: true;
  default?: never;
}

interface CompInputOptionsNotRequired {
  required: false;
  default?: any;
}

export type CompInputOptionsSpecified = CompInputOptionsNotRequired | CompInputOptionsRequired;

interface CompInputOptionsNotSpecified {
  default?: any;
}

export type CompInputOptions = CompInputOptionsSpecified | CompInputOptionsNotSpecified;


export class CompInputPin extends Pin {
  _name: string;

  constructor(readonly options: CompInputOptions = {required: false}) {
    super();
  }

  public name(_n: string) { this._name = _n; return this; }

  read(props: PropsType<any>) {
    if (this._name) {
      if (this._name in props) {
        let _target = props[this._name];
        if (isPinLike(_target)) _target.to(this);
        else if (_target instanceof Observable) wrap(_target).to(this);
        else value(_target).to(this);
      }
      else {
        if ((<CompInputOptionsSpecified>this.options).required) {
          throw new ComponentInputMissingError(this._name, props);
        }
        else if (this.options.default) {
          value(this.options.default).to(this);
        }
      }
    }
    else {
      throw new UnnamedComponentInputError();
    }
  }
}


export function input(options: CompInputOptions = {required: false}) {
  return new CompInputPin(options);
}


export default input;