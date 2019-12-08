import { Subject } from "rxjs";

import { RawValue } from "../../../shared/types";

import { CompType } from "../component/types";
import { DefaultReactiveRecipientPlugin } from "../component/basic-plugins";


export class DefaultSubjectRecipientPlugin<Renderable=RawValue, Tag=CompType<Renderable | string> | string>
  extends DefaultReactiveRecipientPlugin<Renderable, Tag> {
  defaultContext() { return new Subject(); }
  defaultInput() { return new Subject(); }
  defaultOutput() { return new Subject(); }
  defaultState() { return new Subject(); }
}
