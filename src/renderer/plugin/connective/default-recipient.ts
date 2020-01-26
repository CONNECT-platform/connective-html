import { source, pin, state } from "@connectv/core";

import { CompType } from "../component/types";
import { DefaultReactiveRecipientPlugin } from "../component/basic-plugins";


export class DefaultPinLikeRecipientPlugin<Renderable=RawValue, Tag=CompType<Renderable | string> | string>
  extends DefaultReactiveRecipientPlugin<Renderable, Tag> {
  defaultContext() { return source(); }
  defaultInput() { return pin(); }
  defaultOutput() { return pin(); }
  defaultState() { return state(); }
}
