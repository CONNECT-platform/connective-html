import { CompFunc } from "../types";



export class FragmentTrackingError extends Error {
  constructor(readonly comp: CompFunc<any, any>) {
    super(`Tracking component internals is not possible on components returning fragments: ${comp}`);
  }
}