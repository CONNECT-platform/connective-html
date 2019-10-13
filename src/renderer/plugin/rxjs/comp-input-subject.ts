import { Subject } from "rxjs";


export class CompInputSubject<T> extends Subject<T> {
  constructor(readonly options: any) {
    super();
  }
}