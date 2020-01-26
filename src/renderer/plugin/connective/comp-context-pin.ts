import { Subscription, Observable } from "rxjs";
import { isPinLike, Source } from "@connectv/core";

import { CompContextPlugin } from "../component/basic-plugins";
import { CompType } from "../component/types";
import { PluginPriority } from "../plugin";



export class CompContextPinPlugin<Renderable=RawValue, Tag=CompType<Renderable | string> | string>
implements CompContextPlugin<Renderable, Tag> {
  wireContext(_: string, value: any, recipient: any, sub: Subscription) {
    if (recipient instanceof Source) {
      if (isPinLike(value)) sub.add(value.subscribe(v => recipient.send(v)));
      else if (value instanceof Observable) sub.add(value.subscribe(v => recipient.send(v)));
      else recipient.send(value);

      return true;
    }

    return false;
  }

  priority = PluginPriority.High;
}
