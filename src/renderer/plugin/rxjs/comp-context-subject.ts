import { Subscription, Observable, Subject } from "rxjs";
import { isPinLike } from "@connectv/core";

import { RawValue } from "../../../shared/types";

import { CompContextPlugin } from "../component/basic-plugins";
import { CompType } from "../component/types";
import { PluginPriority } from "../plugin";



export class CompContextSubjectPlugin<Renderable=RawValue, Tag=CompType<Renderable | string> | string>
implements CompContextPlugin<Renderable, Tag> {
  wireContext(_: string, value: any, recipient: any, sub: Subscription) {
    if (recipient instanceof Subject) {
      if (isPinLike(value)) sub.add(value.subscribe(v => recipient.next(v)));
      else if (value instanceof Observable) sub.add(value.subscribe(v => recipient.next(v)));
      else recipient.next(value);

      return true;
    }

    return false;
  }

  priority = PluginPriority.High;
}
